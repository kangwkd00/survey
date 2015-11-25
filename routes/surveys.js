var express = require('express'),
    User = require('../models/User'),
    Survey = require('../models/Survey');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}


//기본 게시판
router.get('/', needAuth,function(req, res, next) {
  Survey.find({},function(err,surveys){
    if(err)
    {
    return next(err);
  }
  res.render('surveys/index', {surveys:surveys});
});
});

//글쓰기 클릭시 나오는 양식
router.get('/new', function(req, res, next) {
  res.render('surveys/edit',{survey:{}}); //안에들어가는게 무엇인가???ㅂ
});

//입력하면 저장함
router.post('/', function(req, res, next) {
  var survey = new Survey({
    email: req.body.email,
    password: req.body.password,
    title: req.body.title,
    content: req.body.content
  });
  survey.save(function(err, doc) {
    if (err) {
      return next(err);
    }
    res.redirect('/surveys/');
  });
});

//상세보기
router.get('/:id', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }
    if (survey) {
      survey.read = survey.read + 1;
      survey.save(function(err) { });
      res.render('surveys/show', {survey: survey});
    }
    return next(new Error('not found'));
  });
});
//한아이디를 받아서 그에대한 수정창 뛰움
router.get('/:id/edit', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }
    res.render('surveys/edit', {survey: survey});
  });
});

//수정 ,저장
router.put('/:id', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }
    if (req.body.password === survey.password) {
      survey.email = req.body.email;
      survey.title = req.body.title;
      survey.content = req.body.content;
      survey.save(function(err) {
        res.redirect('/surveys/' + req.params.id);
      });
    }
    res.redirect('back');
  });
});


//삭제-----
router.delete('/:id', function(req, res, next) {
  Survey.findOneAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/surveys/');
  });
});






module.exports = router;
