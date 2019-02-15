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

$(function() {
  $('#submit').on('click', function() {
    let errorinfo;
    // const targetInput = $('input.require').map(function() {
    //   return $(this).val();
    // });
    $('input.require').map(function() {
      if ($(this).val() == '' || $(this).val().match(/[^\s\t]/) == false) {
        errorinfo = $(this).next('span.error-info');
        errorinfo.css('display', 'block');
      } else {
        errorinfo = $(this).next('span.error-info');
        errorinfo.css('display', 'none');
      }
    });
    const targetSelect = $('select.require');
    // const valueByInput = targetInput.val();
    // const nameBySelect = targetSelect.attr('name');
    // console.log(targetInput[0].html());
    // console.log(targetSelect[0].html());
    // const errorinfo = targetInput.next('span.error-info');
    // if (value == '') {
    //   error = true;
    // } else if (!value.match(/[^\s\t]/)) {
    //   error = true;
    // }
    // if (error) {
    //   errorinfo.css('display', 'block');
    // } else {
    //   errorinfo.css('display', 'none');
    // }
    return false;
  });

  // function errorMassageSelect() {
  //   let error;
  //   const target = $('select.require');
  //   const name = target.attr('name');
  //   const value = $(`select[name=\"${name}\"] option:selected`).val();
  //   const errorinfo = target.nextAll('span.error-info');
  //   if (value == '') {
  //     error = true;
  //   } else if (!value.match(/[^\s\t]/)) {
  //     error = true;
  //   }
  //   if (error) {
  //     errorinfo.css('display', 'block');
  //   } else {
  //     errorinfo.css('display', 'none');
  //   }
  // };
});
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
