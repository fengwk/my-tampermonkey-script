// ==UserScript==
// @name         11漫画自动滚动脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  https://www.11manhua.net/
// @author       fengwk
// @match        https://www.11manhua.net/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

function AutoScroller() {
    var intervalTime = 2000;
    var intervalId = null;

    var doAutoScroll = () => {
        return setInterval(() => {
            $('html,body').animate({scrollTop: $('html,body').scrollTop() + $('html,body').height()}, 'slow');
        }, intervalTime);
    };

    var stopAutoScroll = () => {
        clearInterval(intervalId);
        intervalId = null;
        $("#autoscroll").text("自动滚动");
        $("#fast").remove();
        $("#slow").remove();
    };

    var startAutoScroll = () => {
        intervalId = doAutoScroll();
        $("#autoscroll").text("取消滚动");
        $("#autoscroll").after($("<button id=\"fast\">加速</button>").click(() => {
            intervalTime = Math.max(intervalTime - 500, 1000);
            clearInterval(intervalId);
            intervalId = doAutoScroll();
        }));
        $("#autoscroll").after($("<button id=\"slow\">减速</button>").click(() => {
            intervalTime += 500;
            clearInterval(intervalId);
            intervalId = doAutoScroll();
        }));
    };

    var toggleAutoScroll = () => {
        if (intervalId) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    };

    this.run = () => {
        setInterval(() => {
            if ($(".ui.container>.active.item").length == 0) {
                if (intervalId != null) {
                    stopAutoScroll();
                }
                if ($("#autoscroll").length != 0) {
                    $("#autoscroll").remove();
                }
            } else if ($("#autoscroll").length == 0) {
                if (intervalId != null) {
                    stopAutoScroll();
                }
                $(".ui.container>.active.item").after($("<button id=\"autoscroll\">自动滚动</button>").click(toggleAutoScroll));
            }
        }, 500);
    };
}

(function() {
    'use strict';
    $(function() {
        var autoScroller = new AutoScroller();
        autoScroller.run();
    })
})();
