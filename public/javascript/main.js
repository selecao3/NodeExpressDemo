var before_id;

//$(function(){});でjqueryを使うことができる
$(function(){
    $(".date-input").flatpickr({
        locale: "ja",
        enableTime: true,
        defaultDate: 'today',
        defaulthour: 'today',
        time_24hr:true,
        dateFormat: "Y年m月d日 H時i分",
        
    });
});

$(function () {
    $('select').niceSelect();
});


$(function () {
    $('div.folder').click(function () {
        var id = $(this).attr("id");
        if (before_id === id) {
            $('#main-menu').html("");
            id = 0;
            $("ul#main-menu").removeClass("fileList");
        } else {
            $('#main-menu').html("");
            $("div." + id).each(function () {
                str = $(this).html();
                $('#main-menu').append(str);
            })
            console.log("addClass in folder");
            $("ul#main-menu").addClass("fileList");
        }
        before_id = id;
    })
})

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
                console.log("aaa");
            })
        }

    });
});
