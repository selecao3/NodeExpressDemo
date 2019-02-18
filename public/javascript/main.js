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
$(function() {
  $('#triggerButton').on('click', function() {
    let errorinfo;
    let flag = true;
    $('input.require').each(function() {
      if ($(this).val() == '' || $(this).val().match(/[^\s\t]/) == false) {
        errorinfo = $(this).next('span.error-info');
        errorinfo.css('display', 'block');
        flag = false;
      } else {
        errorinfo = $(this).next('span.error-info');
        errorinfo.css('display', 'none');
      }
    });
    $('select.require').each(function() {
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

$(function() {
  $('select[name=\"stuff\"]').change(function() {
    const otherStuff = $('input.otherStuff');
    const target = $('select[name=\"stuff\"] option:selected');
    console.log('click!');
    console.log(target.val());
    if (target.val() == 'その他') {
      console.log('if!');
      otherStuff.css('display', 'block');
      const otherStuffName = otherStuff.val();
      otherStuff.on('input', function() {
        target.val(otherStuffName);
        target.html(otherStuffName);
      })
    } else {
      console.log('else!');
      otherStuff.css('display', 'none');
    }
  })
})

//$(function(){});でjqueryを使うことができる
$(function() {
  $('.date-input').flatpickr({
    locale: 'ja',
    enableTime: true,
    time_24hr: true,
    dateFormat: 'Y年m月d日 H時i分'
  });
});

$(function() {
  $('.date-search').flatpickr({locale: 'ja', dateFormat: 'Y年m月d日'});
});

$(function() {
  $('select').niceSelect();
});

$(function() {
  const targetArea = $('#checkFinFalseArea');
  const str = targetArea.html();
  $('#checkFin').change(function() {
    const prop = $(this).prop('checked');
    if (prop) {
      targetArea.html('');
    } else {
      targetArea.html(str);
    }
  });
});