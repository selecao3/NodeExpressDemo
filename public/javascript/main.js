const jQuery = require('jquery')
const $ = jQuery
window.jQuery = jQuery
require('jquery-nice-select')
require('../../node_modules/jquery-nice-select/css/nice-select.css')
require('../../node_modules/flatpickr/dist/flatpickr.min.css')
require('flatpickr')
import '../css/main.css'
import '../css/form.css'
import '../css/header.css'

//$(function(){});でjqueryを使うことができる
$(function() {
  $('.date-input').flatpickr({
    locale: 'ja',
    enableTime: true,
    time_24hr: true,
    dateFormat: 'Y年m月d日 H時i分'
  })
})

$(function() {
  $('select').niceSelect()
})

$(function() {
  if ($('#checkFin').prop("checked") == true) {
    $('#checkFinFalse').hide();
  }
})
