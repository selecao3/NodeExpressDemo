const $ = require('jQuery');
require('jquery-nice-select');
require('flatpickr');
import 'C:/Users/kazuha/develop/Node/node_demo01/public/css/main.css';

//$(function(){});でjqueryを使うことができる
$(function(){
    $(".date-input").flatpickr({
        locale: "ja",
        enableTime: true,
        time_24hr:true,
        dateFormat: "Y年m月d日 H時i分",
        
    });
});

$(function () {
    console.log("nice!");
    $('select').niceSelect();
});



$(function () {
    console.log("addClass");
    var result = $("ul#main-menu").find("li");
    console.log(result);
    console.log(result[0]);
    $("ul#main-menu li").addClass("fileList");
});

$(document).ready(function () {
    $('.tooltip').tooltipster({
        animation: 'fade',
        arrow: false,
        trigger: 'click',
        theme: ['tooltipster-default', 'tooltipster-default-customized'],
        position: 'bottom',
        interactive: 'true',
        functionInit: function (instance, helper) {
            var content = $(helper.origin).find('.tooltip_content').detach();
            instance.content(content);
        },
        functionReady: function () {
            $('a').click(function () {
                $('.tooltip').tooltipster('close');
            })
        }

    });
});
