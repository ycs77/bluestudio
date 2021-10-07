var isMobile = navigator.userAgent.match(/[A|a]ndroid|[M|m]obile|[P|p]ad/g);

// 貓咪(頭)
var cats_head = ['#cat_top', '#cat_left', '#cat_lefttop', '#cat_right', '#cat_righttop'];
function cats_hide() {
  for (var f in cats_head) {
    $(cats_head[f]).css('visibility', 'hidden');
  }
}
function cats_show(n) {
  $(cats_head[n]).css('visibility', 'initial');
}
cats_hide();
cats_show(2);

// 三隻貓咪
var cats = ['#cat_cerulean', '#cat_blue', '#cat_deep_blue'];
function detect_cat(cat_id, x) {
  var catplace = $(cat_id).offset().left + $(cat_id).width() / 2;
  if (Math.abs(x - catplace) < 80)
    $(cat_id).css('bottom', '0px');
  else
    $(cat_id).css('bottom', '-50px');
}

// 判斷頂端
$(window).scroll(function (e) {
  if ($(window).scrollTop() > 0) {
    $('.explore').removeClass('at_top');
    $('.navbar').removeClass('at_top');
  } else {
    $('.explore').addClass('at_top');
    $('.navbar').addClass('at_top');
  }
});

// 滑鼠移動特效
if (!isMobile) {
  $(window).mousemove(function (e) {
    var x = e.pageX, y = e.pageY;
    var pagex = x - $('#section_about').offset().left,
      pagey = y - $('#section_about').offset().top;

    $('.mountain').css('transform', 'translateX(' + (x / -20 + 50) + 'px)');
    $('.r1text').css('transform', 'translateX(' + (x / -5 + 50) + 'px)');
    $('.r2text').css('transform', 'translateX(' + (x / -10 + 50) + 'px)');
    $('.r3text').css('transform', 'translateX(' + (x / -12 + 50) + 'px)');
    $('.tri1').css('transform', 'translateX(' + (x / -7 + 50) + 'px)');
    $('.tri2').css('transform', 'translateX(' + (x / -9 + 50) + 'px)');
    $('.tri3').css('transform', 'translateX(' + (x / -11 + 50) + 'px)');
    $('.tri4').css('transform', 'translateX(' + (x / -13 + 50) + 'px)');
    $('.tri5').css('transform', 'translateX(' + (x / -15 + 50) + 'px)');

    if (pagey < 0 || pagey > $('#section_about').outerHeight())
      $('#cross').css('visibility', 'hidden');
    else
      $('#cross').css('visibility', 'visible');

    $('#cross').css({
      'top': pagey + 'px',
      'left': pagex + 'px'
    });

    var catplace = $('#cat_top').offset().left + $('#cat_top').width() / 2,
      cattop = $('#cat_top').offset().top,
      catrange = 50;
    cats_hide();
    if (x < catplace - catrange) {
      if (y > cattop)
        cats_show(1);
      else
        cats_show(2);
    } else if (x > catplace + catrange) {
      if (y > cattop)
        cats_show(3);
      else
        cats_show(4);
    } else {
      cats_show(0);
    }

    for (var f in cats) {
      detect_cat(cats[f], x);
    }
  });
}

// 點擊連結滾動頁面動畫
$('a').click(function (e) {
  var href = $(this).attr('href');
  if (href && href.match('#') && href !== '#') {
    var parts = href.split('#'), url = parts[0], target = parts[1];
    if ((!url || url == window.location.href) && target) {
      var el = $('#' + target);
      if (typeof (el.offset()) !== 'undefined') {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: el.offset().top
        }, 500, 'swing');
      }
    }
  }
});

// Vue 監看
var vm = new Vue({
  el: '#app',
  data: {
    works: []
  },
  mounted: function () {
    var self = this;
    $.ajax({
      url: 'https://ycs.otarc.net/bluestudio/resource.php?file=Blue_Studio_my_projects_API.json',
      success: function (res) {
        self.works = res;
      }
    });
  }
});
