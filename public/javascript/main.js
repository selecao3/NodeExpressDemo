var before_id;

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
    $('a.clickToolTip').click(function () {
        // リンクの #note** を取得
        var targetNote = $(this).attr('href');

        // [?]の座標を取得
        var position = $(this).position();
        var newPositionTop = position.top + 25;        /* + 数値で下方向へ移動 */
        var newPositionLeft = position.left + -135;      /* + 数値で右方向へ移動 */

        // ツールチップの位置を調整
        $('p' + targetNote).css({ 'top': newPositionTop + 'px', 'left': newPositionLeft + 'px' });

        // ツールチップの class="invisible" を削除
        $('p' + targetNote).removeClass('invisible');
    });

    // 表示されたツールチップを隠す処理（マウスクリックで全て隠す）
    //   $('html').mousedown(function(){
    //     $('p.toolTip').addClass('invisible');
    //   });
});

$(function(){
    console.log("addClass");
    var result = $("ul#main-menu").find("li");
    console.log(result);
    console.log(result[0]);
	$("ul#main-menu li").addClass("fileList");
});
