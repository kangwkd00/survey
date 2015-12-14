

function initShowSurvey() {

  function AnswerItem(dom) {
    var context = this;
    this._dom = $(dom);
    this._dom.ans = this._dom.find('.answer');
    this._dom.ans.on('change keyup paste', function() {
      context.isValid();
    });
  } //unnecessary semicolon
  AnswerItem.prototype.answer = function() {
    return this._dom.ans.val().trim();
  };
  AnswerItem.prototype.isValid = function() {
    var valid = this.answer().length > 0;
    valid ? this._dom.removeClass('invalid') : this._dom.addClass('invalid');
    return valid;
  };

  var list = $('#questionList > .question');
  list.each(function(index, item) {
    list[index] = new AnswerItem(item);
  });

  function checkIsValid() {
    var valid = true;
    list.each(function(index, item) {
      valid &= item.isValid();
    });
    return valid;
  }

  function getSurveyID() {
    var t = window.location.pathname;
    return t.substr(t.lastIndexOf('/') + 1);
  }

  function saveAsJson() {
    if (checkIsValid()) {
      var answer = {
        items: []
      };
      list.each(function(index, item) {
        answer.items[index] = item.answer();
      });
      return answer;
    } else {
      return false;
    }
  }

  function submit() {
    var answer = saveAsJson();
    if (answer) {
      $.post('/surveys/' + getSurveyID() + '/submit_answer', answer, function(data, stat, xhr) {
        if (data.error) {
          // TODO: Handling Error
        } else {
          window.location.href = data.redirect || '/surveys';
        }
      });
    }
  }

  $('#submit').click(submit);
}


$(window).ready(initShowSurvey);
