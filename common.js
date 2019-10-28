(function($){
    $.fn.scrollContent = function(options){

        var defaults = {
            nav: '.nav'
        };
        var setting = $.extend( defaults, options );

        var scrollContentBox = $(this).children('.section');//スクロールさせたい要素
        var firstBox = $(this).children('#c1');//スクロールさせたい最初の要素のid
        var navBox = $(setting.nav);//ナビゲーションのclass or id
        var navBoxLink = (setting.nav + ' a');//ナビゲーションのリンク

        //スライドの位置指定
        scrollContentBox.css({
            'display': 'none',
            'position': 'absolute',
            'top': $('#c1').height()
        });
        firstBox.css({
            'display': 'block',
            'top': 0
        });

        //スクロールバー無しの場合
        if(setting.type == 'noBar'){
            $('body').css('overflow','hidden')
        }

        //最初に表示しているコンテンツのidを取得してナビゲーションのカレントを作成
        var showC;
        function showSelect(){
            scrollContentBox.each(function() {
                if($(this).is(':visible')){
                    showC = '#' + $(this).attr('id');
                    navBox.find('a[href ~= ' + showC +']').parent().addClass('current');
                    navBox.find('a[href ~= ' + showC +']').contents().unwrap();
                }
            });
        };
        showSelect();

        var prevContent = showC;//表示してるコンテンツ
        var viewContent = showC;//スライド後に見えてるコンテンツid
        var beforeNav = 1;//スライドする前に表示されてるコンテンツid

        //ナビをクリックした時の処理
        $('body').on('click', navBoxLink, function() {

            //aタグの生成
            navBox.find('li:nth-child('+ beforeNav +')').removeClass('current').contents().wrap('<a href="#c'+ beforeNav +'">');

            //何番目のliが押されたか
            beforeNav = $(this).parent().index() + 1;
            //classの付与
            $(this).parent().addClass('current');
            //aタグの削除
            $(this).contents().unwrap();

            //コンテンツの表示
            var cId = $(this).attr('href');
            viewContent = cId;
            $(viewContent).css('display', 'block');

            //各々の高さ取得
            var wHeight = $(window).height();
            var nowContentHeight = $(prevContent).height();

            var wScroll = wHeight;
            if(wHeight < nowContentHeight){
                wScroll = nowContentHeight;
            }

            //コンテンツのスクロール
            $('html,body').delay(500).animate({
                scrollTop : $(prevContent).height()
            }, 'slow',function(){
                $(prevContent).delay(500).css({
                    'display': 'none'
                });
                scrollContentBox.css({
                    'top': $(viewContent).height()
                });
                $(viewContent).css('top', 0);
                $('html,body').animate({
                    scrollTop : 0
                },0);
            }).promise().done(function () {
                prevContent = viewContent;
            });

            return false;

        });

        //ウインドウサイズが変わった時
        $(window).resize(function() {
            scrollContentBox.css('top', $(viewContent).height());
            $(viewContent).css('top','0');
        });

    };

})(jQuery);

$(function(){

    $('#wrap').scrollContent({
        //type:'noBar',
        nav: '.nav'
    });

});




