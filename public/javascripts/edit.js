

function initEditSurvey()
{
  (function() {
    var list = $('ul#surveyList');
    var itemTpl =  list.find('> li.survey-item.tpl').removeClass('tpl');
    var addButton = list.find('> li.add');

    function reindex() {
      list.find('> li .index').each(function(index, item) {
        $(item).text(index + 1);
      });
    }


    function addNewItem() {
      addButton.remove();
      var newItem = itemTpl.clone();
      newItem.find('button.delete').click(function(){
        newItem.remove();
        reindex();
      });
      list.append(newItem, addButton);
      addButton.click(addNewItem);
      reindex();
    }

    function checkIsValid() {
      var errorMessage = false;
      var valid = true;
      valid = $('#surveyTitle').val().trim().length > 0;
      valid || (errorMessage = 'Empty Title not allowed');
      var questions = list.find('> li.survey-item');
      if (questions.length === 0) {  //if (questions.length == 0)
        valid = false;
       errorMessage = errorMessage ? errorMessage + '\nNo Question' : 'No Question';

      }
      errorMessage && alert(errorMessage);
      questions.each(function(index, item) {
        item = $(item);
        if (item.find('.question').val().trim().length > 0) {
          item.removeClass('invalid');
        } else {
          item.find('.error').text('Empty Question not allowed');
          item.addClass('invalid');
          valid = false;
        }
      });
      return valid;
    }

    function saveAsJson() {
      if (checkIsValid()) {
        var survey = {
          email: '',
          title : $('#surveyTitle').val(),
          items : []
        };
        list.find('> li .question').each(function(index, item) {
          survey.items[index] = $(item).val();
        });
        return survey;
      } else {
        return false;
      }
    }

    // initialize ui
    itemTpl.remove();
    addNewItem();
    //addButton.click(addNewItem);

    $('#saveButton').click(function(){
      var survey = saveAsJson();
      if (survey) {
        // post to server
        $.post('/surveys/save', survey, function(data, stat, xhr) {
          if (data.error) {
            // TODO: Handling Error
          } else {
            window.location.href = data.redirect || '/surveys';
          }
        });
      }
    });

  })();
}


$(window).ready(initEditSurvey);
