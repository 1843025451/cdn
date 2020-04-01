var canShowAdsense = function () {
    return !!0
};
$(document).ready(function () {
    var footer = $("#footer");
    var text = footer.text();
    footer.empty();
    footer.prepend(
        '<div id="customFooter"><h1 class="footer-title">Contact with me</h1><ul><li><a href="#" target="_blank"><i aria-hidden="true" class="fa fa-envelope fa-fw"></i>Email</a></li><li><a href="#" target="_blank"><i aria-hidden="true" class="fa fa-weixin fa-fw"></i>Wechat</a></li><li><a href="https://github.com/mr-mihu" target="_blank"><i aria-hidden="true" class="fa fa-github fa-fw"></i>Github</a></li><li><a href="https://wpa.qq.com/msgrd?v=3&uin=1843025451&site=qq&menu=yes" target="_blank"><i aria-hidden="true" class="fa fa-qq fa-fw"></i>QQ</a></li></ul><p id="copyright">' +
        text + ' </p></div>');
});
$(document).ajaxComplete(function (event, xhr, option) {
    if (option.url.indexOf("GetComments") > -1) {
        setTimeout(function () {
            $.each($(".blog_comment_body"), function (index, ele) {
                var self = $(ele);
                var id = self.attr("id").split("_")[2];
                var imgSrc = $("#comment_" + id + "_avatar").html() ||
                    "http://pic.cnblogs.com/avatar/simple_avatar.gif";
                self.before('<img src="' + imgSrc +
                    '" style="float:left;" class="author_avatar">');
            });
        }, 200)
    };
    if (option.url.indexOf("CommentForm") > -1) {
        setTimeout(function () {
            $("#tbCommentBody").attr("placeholder", "ヾ?≧?≦)o来啊，快活啊!")
        }, 200)
    }
    if (option.url.indexOf("GetFollowStatus") > -1) {
        if ($("#sideBar #p_b_follow a").text() == "+加关注")
            $("#sideBar #p_b_follow :contains('+加关注')").html(
                "<i class=\"fa fa-heart\" aria-hidden=\"true\"></i>&nbsp;关注");
    }
    if (option.url.indexOf("sidecolumn") > -1) {
        $('.CalNextPrev a:contains("<")').empty().prepend(
            '<i class="fa fa-chevron-left" aria-hidden="true"></i>');
        $('.CalNextPrev a:contains(">")').empty().prepend(
            '<i class="fa fa-chevron-right" aria-hidden="true"></i>');
        var taglist = document.querySelectorAll('#sidebar_postcategory li a')
        for (var i = 0; i < taglist.length; i++) {
            taglist[i].className = 'color-' + Math.floor(Math.random() * 12 + 1);
        }
    }
});

function createLink(URL, lnkId, charset, media) {
    var head = document.getElementsByTagName('head')[0],
        linkTag = null;
    if (!URL) {
        return false;
    }
    linkTag = document.createElement('link');
    linkTag.setAttribute('rel', 'shortcut icon');
    linkTag.setAttribute('type', 'image/x-icon');
    linkTag.href = URL;
    head.appendChild(linkTag);
};
createLink('https://**********.gif');

var head = $("#header");
head.prepend('<canvas id="bubble-canvas" style="position: absolute; left: 0px; top: 0px;"></canvas>');
var _width, _height, largeHeader, _canvas, _ctx, _circles, _target, animateHeader = true;

function initHeader() {
    largeHeader = document.getElementById('header');
    _width = largeHeader.offsetWidth;
    // log(largeHeader.offsetWidth);
    _height = largeHeader.offsetHeight;
    // log(largeHeader.offsetHeight);
    _target = {
        x: 0,
        y: _height
    };
    _canvas = document.getElementById('bubble-canvas');
    _canvas.width = _width;
    _canvas.height = _height;
    _ctx = _canvas.getContext('2d');
    _circles = [];
    for (var x = 0; x < _width * 0.5; x++) {
        var c = new Circle();
        _circles.push(c);
    }
    animate();
};

function addListeners() {
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
};

function scrollCheck() {
    if (document.body.scrollTop > _height) animateHeader = false;
    else animateHeader = true;
};

function resize() {
    _width = largeHeader.offsetWidth;
    _height = largeHeader.offsetHeight;
    _canvas.width = _width;
    _canvas.height = _height;
};

function animate() {
    if (animateHeader) {
        _ctx.clearRect(0, 0, _width, _height);
        for (var i in _circles) {
            _circles[i].draw();
        }
    };
    requestAnimationFrame(animate);
};

function Circle() {
    var _this = this;
    (function () {
        _this.pos = {};
        init();
    })();

    function init() {
        _this.pos.x = Math.random() * _width;
        _this.pos.y = _height + Math.random() * 100;
        _this.alpha = 0.1 + Math.random() * 0.3;
        _this.scale = 0.1 + Math.random() * 0.3;
        _this.velocity = Math.random();
    };
    this.draw = function () {
        if (_this.alpha <= 0) {
            init();
        };
        _this.pos.y -= _this.velocity;
        _this.alpha -= 0.0005;
        _ctx.beginPath();
        _ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
        _ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
        _ctx.fill();
    };
};
addListeners();
initHeader();

function breakSameDayArticles(article_list) {
    var _i = 0;
    while (_i < article_list.length) {
        var dayTitle = article_list[_i].getElementsByClassName('dayTitle')[0];
        var postTitle = article_list[_i].getElementsByClassName('postTitle');
        var postCon = article_list[_i].getElementsByClassName('postCon');
        var postDesc = article_list[_i].getElementsByClassName('postDesc');
        if (postTitle.length > 1) {

            for (var _j = 0; _j < postTitle.length; _j++) {
                var day = document.createElement('div');
                day.className = 'day';
                day.appendChild(dayTitle.cloneNode(true));
                day.appendChild(postTitle[_j].cloneNode(true));
                day.appendChild(postCon[_j].cloneNode(true));
                day.appendChild(postDesc[_j].cloneNode(true));
                article_list[_i].parentNode.insertBefore(day, article_list[_i]);
                _i++;
            }
            article_list[_i].parentNode.removeChild(article_list[_i]);
            _i--;
        }
        _i++;
    }
};

function parseToDOM(str) {
    var div = document.createElement("div");
    if (typeof str == "string")
        div.innerHTML = str;
    return div.childNodes[0];
};

function beautyArticles(article_list) {
    for (var i = 0; i < article_list.length; i++) {
        var desc_img = article_list[i].getElementsByClassName('desc_img')[0];
        if (desc_img != undefined) {
            article_list[i].className += ' have-img';
            var url = desc_img.src;
            var title = article_list[i].getElementsByClassName('postTitle2');
            desc_img.parentNode.removeChild(desc_img);
            article_list[i].appendChild(parseToDOM('<a href="' + title[0].href + '" class="post-link"></a>'));
            article_list[i].appendChild(parseToDOM('<div class="img-layer"></div>'));
            article_list[i].getElementsByClassName('img-layer')[0].style.backgroundImage = 'url(' + url + ')';
        }
    }
};

function initBeauty() {
    var article_list = document.getElementsByClassName('day');
    breakSameDayArticles(article_list);
    beautyArticles(article_list);
};
if (window.location.pathname.search(/\/p\//ig) == -1) {
    initBeauty();
    //文章列表下的换页按钮
    $(".pager a:contains('上一页')").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
    $(".pager a:contains('下一页')").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

}
head.prepend(
    '<button class="get-to-top btn-hide" onclick="get_to_top();"><i class="fa fa-chevron-up" aria-hidden="true"></i></button>'
);
var button = document.getElementsByClassName('get-to-top')[0];

function getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

function getScrollHeight() {
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
window.onscroll = function () {
    var ToTopHeight = getWindowHeight() * 1.5;
    if (getScrollTop() + getWindowHeight() > ToTopHeight) {
        button.className = 'get-to-top btn-show';
    } else {
        button.className = 'get-to-top btn-hide';
    }
}

function get_to_top() {
    setTimeout(function () {
        button.className = 'get-to-top btn-hide';
    }, 300);
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 5));
        }
    })();
}
