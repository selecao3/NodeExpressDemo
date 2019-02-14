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
  $('#btn_id').click(function() {
    const flag = $('input[name="date"]');
    console.log(flag);
  });
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
  $('.date-search').flatpickr({
    locale: 'ja',
    enableTime: true,
    time_24hr: true,
    dateFormat: 'Y年m月d日'
  });
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
