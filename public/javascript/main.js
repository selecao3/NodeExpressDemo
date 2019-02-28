const jQuery = require('jquery');
const $ = jQuery;
window.jQuery = jQuery;
require('jquery-nice-select');
require('flatpickr');
require('../../node_modules/jquery-nice-select/css/nice-select.css');
require('../../node_modules/flatpickr/dist/flatpickr.min.css');
import '../css/main.css';
import '../css/form.css';
import '../css/header.css';
import '../css/paging.css';

//記入チェックの関数
$(function () {
  $('#triggerButton').on('click', function () {
    let errorinfo;
    let flag = true;
    $('input.require').each(function () {
      if ($(this).val() == '' || $(this).val().match(/[^\s\t]/) == false) {
        errorinfo = $(this).next('span.error-info');
        errorinfo.css('display', 'block');
        flag = false;
      } else {
        errorinfo = $(this).next('span.error-info');
        errorinfo.css('display', 'none');
      }
    });
    $('select.require').each(function () {
      const nameBySelect = $(this).attr('name');
      const target = $(`select[name=\"${nameBySelect}\"] option:selected`);
      if (target.val() == '' || target.val().match(/[^\s\t]/) == false) {
        errorinfo = $(this).nextAll('span.error-info');
        errorinfo.css('display', 'block');
        flag = false;
      } else {
        errorinfo = $(this).nextAll('span.error-info');
        errorinfo.css('display', 'none');
      }
    });
    if (flag) {
      $('#userData').submit();
    }
  });
});


//その他のスタッフを追加する関数
// MEMO: まだ未完成（2019/02/20）
$(function () {
  $('select[name=\"stuff\"]').change(function () {
    const otherStuff = $('input.otherStuff');
    const target = $('select[name=\"stuff\"] option:selected');
    if (target.val() == 'その他') {
      otherStuff.css('display', 'block');
    } else {
      otherStuff.css('display', 'none');
    }
  })
})

// 検索ボタンとCSV出力ボタンを切り替える
$(function () {
  $('#searchButton').on('click', function () {
    $('form').attr('action', '/search');
    $('form').submit();
  })
  $('#exportCSVButton').on('click', function () {
    $('form').attr('action', '/exportCSV');
    $('form').submit();
  })
})

//$(function(){});でjqueryを使うことができる
$(function () {
  $('.date-input').flatpickr({
    locale: 'ja',
    enableTime: true,
    time_24hr: true,
    dateFormat: 'Y年m月d日 H時i分'
  });
});

$(function () {
  $('.date-search').flatpickr({
    locale: 'ja',
    dateFormat: 'Y年m月d日'
  });
});

$(function () {
  $('select').niceSelect();
});

$(function () {
  const targetArea = $('#checkFinFalseArea');
  const str = targetArea.html();
  $('#checkFin').change(function () {
    const prop = $(this).prop('checked');
    if (prop) {
      targetArea.html('');
    } else {
      targetArea.html(str);
    }
  });
});