var bannerSpeed = 5000;
$(function() {
    if (['ni1', 'in1', 'dev'].includes(global_acpid)) {

        if (['/in/sports/exchange/', '/sports/exchange/'].includes($(location).attr('pathname'))) {

            if (document.querySelector('link[rel="canonical"]') !== null) {
                $.get(global_baseurl + "/home/SportExchangeGetText", function(data) {
                    if (data != '') {
                        document.querySelector('link[rel="canonical"]').remove();
                        $('head').append(data);
                    }
                });
            }
        }
    }
    if (global_acpid.indexOf('in1') >= 0) {
        return;
    }
    if (global_acpid.indexOf('ni1') >= 0) {
        return;
    }

    if (!['theme_ce2', 'theme_ce3b', 'theme_x01a'].includes(global_theme)) {
        $.ajax({
            url: global_baseurl + "/home/getBannerList",
            type: "get",
            cache: false,
            dataType: "json",
            success: function(data) {
                var bannerInterval = parseInt(data.interval);
                var bannerList = data.items;
                var bannerHtml = "";
                var bannerNav = "";
                var bannerCount = 0;
                var bannerOpen = "";

                if (bannerList != undefined) {
                    for (var i in bannerList) {
                        if (bannerList.hasOwnProperty(i)) {
                            link = global_baseurl + (global_acpid == "z27" ? bannerList[i].link.replace("/promotions/index", "/promotions") : bannerList[i].link);
                            imgUrl = global_cdn + global_baseurl + bannerList[i].imgUrl;
                            imgAlt = bannerList[i].imgDesc;
                            imgExtra = "";
                            bannerOpen = "";
                            if (bannerList[i].bannerType == 2) {
                                bannerOpen = " target='_blank'";
                            } else if (bannerList[i].bannerType == 5) {
                                bannerOpen = ' onclick="window.open(\'' + link + '\', \'_blank\', \'location=yes,height=600,width=800\'); return false;"';
                            }

                            var url = window.location.href;
                            var execrs = /act=(\d+)/.exec(url);
                            if (execrs != null) {
                                var act = execrs[1];
                                if ((act == bannerList[i].actid) && bannerList[i].bannerType == 6 && bannerList[i].actypeid) {
                                    $('#atypes').find('li[atype="' + bannerList[i].actypeid + '"]').trigger('click');
                                }
                            }

                            if (global_acpid == "z27") {
                                imgExtra = "loading='lazy' width='1200' height='375'";
                            }

                            var trackingAttr = '';
                            if (['ce2', 'ce3', 'x01'].includes(global_acpid)) {
                                trackingAttr = 'trackingcode="trackingCode" trkcategory="HomeBanner" trkaction="Click" trkname="' + bannerList[i].imgId + '_' + imgAlt + '"';
                            }
                            bannerHtml += '<li' + (i == 0 ? ' style="display:block;"' : '') + ' ' + trackingAttr + '>' +
                                (bannerList[i].link != "" ? '<a href="' + link + '"' + bannerOpen + '>' : '') +
                                '<img ' + imgExtra + ' src="' + imgUrl + '" alt="' + escapeHtml(imgAlt) + '" />' +
                                (bannerList[i].link != '' ? '</a>' : '') +
                                '</li>';

                            bannerNav += "<span" + (i == 0 ? " class='current'" : "") + "></span>";
                            bannerCount++;
                        }
                    }

                    $(".mod-home .slide-wrap").html("<ul>" + bannerHtml + "</ul><div class='num'>" + bannerNav + "</div>");
                    if (bannerCount <= 1) {
                        $(".mod-home .slide-wrap .num").hide();
                    }

                    bannerSpeed = bannerInterval * 1000;
                }

                startAutoSlide();
            }
        });
    }

    var sw = 0;
    var myTime;
    var firstLoop = true;

    $("body").on("mousedown", "#slides .num span", function() {
        sw = $("#slides .num span").index(this);
        myShow(sw);
    });

    $("body").on("mousedown", ".slide-prev, .slide-next", function() {
        clearInterval(myTime);
    });
    $("body").on("mouseup", ".slide-prev, .slide-next", function() {
        startAutoSlide();
    });

    $("body").on("click", ".slide-prev", function() {
        sw = $("#slides .num span.current").index() - 1;
        if (sw == -1) {
            sw = $("#slides ul li").length - 1;
        }
        myShow(sw);
    });

    $("body").on("click", ".slide-next", function() {
        sw = $("#slides .num span.current").index() + 1;
        if (sw == $("#slides ul li").length) {
            sw = 0;
        }
        myShow(sw);
    });

    function myShow(i) {
        firstLoop = false;
        $("#slides .num span:eq(" + i + ")").addClass("current").siblings("span").removeClass("current");
        $("#slides ul li:eq(" + i + ")").stop(true, true).fadeIn(600).siblings("li").fadeOut(600);
    }

    $("#slides").mouseover(function() {
        clearInterval(myTime);
    });

    $("#slides").mouseout(function(e) {
        startAutoSlide();
    });

    $(".mod-banner").hover(function() {
        $(".mod-banner .hover-show").show();
    }, function() {
        $(".mod-banner .hover-show").hide();
    });

    function startAutoSlide() {
        myTime = setInterval(function() {
            if (firstLoop) {
                myShow(1);
                firstLoop = false;
            } else {
                sw = $("#slides .num span.current").index() + 1;
                if (sw == $("#slides ul li").length) {
                    sw = 0;
                }
                myShow(sw);
            }
        }, bannerSpeed);
    }

    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function(s) {
            return entityMap[s];
        });
    }
});

(function($) {
    $("a[data-reveal-id]").on("click", function(e) {
        e.preventDefault();
        var modalLocation = $(this).attr("data-reveal-id");
        $("#" + modalLocation).reveal($(this).data())
    });
    $.fn.reveal = function(options) {
        var defaults = {
            animation: "fadeAndPop",
            animationspeed: 300,
            closeonbackgroundclick: true,
            dismissmodalclass: "close-reveal-modal"
        };
        var options = $.extend({}, defaults, options);
        return this.each(function() {
            var modal = $(this),
                topMeasure = parseInt(modal.css("top")),
                topOffset = modal.height() + topMeasure,
                locked = false,
                modalBG = $(".reveal-modal-bg");
            if (modalBG.length == 0) {
                modalBG = $('<div class="reveal-modal-bg" />').insertAfter(modal)
            }
            modal.bind("reveal:open", function() {
                modalBG.unbind("click.modalEvent");
                $("." + options.dismissmodalclass).unbind("click.modalEvent");
                if (!locked) {
                    lockModal();
                    if (options.animation == "fadeAndPop") {
                        modal.css({
                            "top": $(document).scrollTop() - topOffset,
                            "opacity": 0,
                            "visibility": "visible"
                        });
                        modalBG.fadeIn(options.animationspeed / 2);
                        modal.delay(options.animationspeed / 2).animate({
                            "top": $(document).scrollTop() + topMeasure + "px",
                            "opacity": 1
                        }, options.animationspeed, unlockModal())
                    }
                    if (options.animation == "fade") {
                        modal.css({
                            "opacity": 0,
                            "visibility": "visible",
                            "top": $(document).scrollTop() + topMeasure
                        });
                        modalBG.fadeIn(options.animationspeed / 2);
                        modal.delay(options.animationspeed / 2).animate({
                            "opacity": 1
                        }, options.animationspeed, unlockModal())
                    }
                    if (options.animation == "none") {
                        modal.css({
                            "visibility": "visible",
                            "top": $(document).scrollTop() + topMeasure
                        });
                        modalBG.css({
                            "display": "block"
                        });
                        unlockModal()
                    }
                }
                modal.unbind("reveal:open")
            });
            modal.bind("reveal:close", function() {
                if (!locked) {
                    lockModal();
                    if (options.animation == "fadeAndPop") {
                        modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
                        modal.animate({
                            "top": $(document).scrollTop() - topOffset + "px",
                            "opacity": 0
                        }, options.animationspeed / 2, function() {
                            modal.css({
                                "top": topMeasure,
                                "opacity": 1,
                                "visibility": "hidden"
                            });
                            unlockModal()
                        })
                    }
                    if (options.animation == "fade") {
                        modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
                        modal.animate({
                            "opacity": 0
                        }, options.animationspeed, function() {
                            modal.css({
                                "opacity": 1,
                                "visibility": "hidden",
                                "top": topMeasure
                            });
                            unlockModal()
                        })
                    }
                    if (options.animation == "none") {
                        modal.css({
                            "visibility": "hidden",
                            "top": topMeasure
                        });
                        modalBG.css({
                            "display": "none"
                        })
                    }
                }
                modal.unbind("reveal:close")
            });
            modal.trigger("reveal:open");
            var closeButton = $("." + options.dismissmodalclass).bind("click.modalEvent", function() {
                modal.trigger("reveal:close")
            });
            if (options.closeonbackgroundclick) {
                modalBG.css({
                    "cursor": "pointer"
                });
                modalBG.bind("click.modalEvent", function() {
                    modal.trigger("reveal:close")
                })
            }
            $("body").keyup(function(e) {
                if (e.which === 27) {
                    modal.trigger("reveal:close")
                }
            });

            function unlockModal() {
                locked = false
            }

            function lockModal() {
                locked = true
            }
        })
    }
})(jQuery);
(function() {
    function setup($) {
        $.fn._fadeIn = $.fn.fadeIn;
        var noOp = $.noop || function() {};
        var msie = /MSIE/.test(navigator.userAgent);
        var ie6 = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent);
        var mode = document.documentMode || 0;
        var setExpr = $.isFunction(document.createElement("div").style.setExpression);
        $.blockUI = function(opts) {
            install(window, opts)
        };
        $.unblockUI = function(opts) {
            remove(window, opts)
        };
        $.growlUI = function(title, message, timeout, onClose) {
            var $m = $('<div class="growlUI"></div>');
            if (title) {
                $m.append("<h1>" + title + "</h1>")
            }
            if (message) {
                $m.append("<h2>" + message + "</h2>")
            }
            if (timeout === undefined) {
                timeout = 3000
            }
            var callBlock = function(opts) {
                opts = opts || {};
                $.blockUI({
                    message: $m,
                    fadeIn: typeof opts.fadeIn !== "undefined" ? opts.fadeIn : 700,
                    fadeOut: typeof opts.fadeOut !== "undefined" ? opts.fadeOut : 1000,
                    timeout: typeof opts.timeout !== "undefined" ? opts.timeout : timeout,
                    centerY: false,
                    showOverlay: false,
                    onUnblock: onClose,
                    css: $.blockUI.defaults.growlCSS
                })
            };
            callBlock();
            var nonmousedOpacity = $m.css("opacity");
            $m.mouseover(function() {
                callBlock({
                    fadeIn: 0,
                    timeout: 30000
                });
                var displayBlock = $(".blockMsg");
                displayBlock.stop();
                displayBlock.fadeTo(300, 1)
            }).mouseout(function() {
                $(".blockMsg").fadeOut(1000)
            })
        };
        $.fn.block = function(opts) {
            if (this[0] === window) {
                $.blockUI(opts);
                return this
            }
            var fullOpts = $.extend({}, $.blockUI.defaults, opts || {});
            this.each(function() {
                var $el = $(this);
                if (fullOpts.ignoreIfBlocked && $el.data("blockUI.isBlocked")) {
                    return
                }
                $el.unblock({
                    fadeOut: 0
                })
            });
            return this.each(function() {
                if ($.css(this, "position") == "static") {
                    this.style.position = "relative";
                    $(this).data("blockUI.static", true)
                }
                this.style.zoom = 1;
                install(this, opts)
            })
        };
        $.fn.unblock = function(opts) {
            if (this[0] === window) {
                $.unblockUI(opts);
                return this
            }
            return this.each(function() {
                remove(this, opts)
            })
        };
        $.blockUI.version = 2.7;
        $.blockUI.defaults = {
            message: "<h1>" + get_label("req_wait") + "</h1>",
            title: null,
            draggable: true,
            theme: false,
            css: {
                padding: 0,
                margin: 0,
                width: "30%",
                top: "40%",
                left: "35%",
                textAlign: "center",
                color: "#000",
                border: "3px solid #aaa",
                backgroundColor: "#fff",
                cursor: "wait"
            },
            themedCSS: {
                width: "30%",
                top: "40%",
                left: "35%"
            },
            overlayCSS: {
                backgroundColor: "#000",
                opacity: 0.6,
                cursor: "wait"
            },
            cursorReset: "default",
            growlCSS: {
                width: "350px",
                top: "10px",
                left: "",
                right: "10px",
                border: "none",
                padding: "5px",
                opacity: 0.6,
                cursor: "default",
                color: "#fff",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "border-radius": "10px"
            },
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
            forceIframe: false,
            baseZ: 1000,
            centerX: true,
            centerY: true,
            allowBodyStretch: true,
            bindEvents: true,
            constrainTabKey: true,
            fadeIn: 200,
            fadeOut: 400,
            timeout: 0,
            showOverlay: true,
            focusInput: true,
            focusableElements: ":input:enabled:visible",
            onBlock: null,
            onUnblock: null,
            onOverlayClick: null,
            quirksmodeOffsetHack: 4,
            blockMsgClass: "blockMsg",
            ignoreIfBlocked: false
        };
        var pageBlock = null;
        var pageBlockEls = [];

        function install(el, opts) {
            var css, themedCSS;
            var full = (el == window);
            var msg = (opts && opts.message !== undefined ? opts.message : undefined);
            opts = $.extend({}, $.blockUI.defaults, opts || {});
            if (opts.ignoreIfBlocked && $(el).data("blockUI.isBlocked")) {
                return
            }
            opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
            css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
            if (opts.onOverlayClick) {
                opts.overlayCSS.cursor = "pointer"
            }
            themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
            msg = msg === undefined ? opts.message : msg;
            if (full && pageBlock) {
                remove(window, {
                    fadeOut: 0
                })
            }
            if (msg && typeof msg != "string" && (msg.parentNode || msg.jquery)) {
                var node = msg.jquery ? msg[0] : msg;
                var data = {};
                $(el).data("blockUI.history", data);
                data.el = node;
                data.parent = node.parentNode;
                data.display = node.style.display;
                data.position = node.style.position;
                if (data.parent) {
                    data.parent.removeChild(node)
                }
            }
            $(el).data("blockUI.onUnblock", opts.onUnblock);
            var z = opts.baseZ;
            var lyr1, lyr2, lyr3, s;
            if (msie || opts.forceIframe) {
                lyr1 = $('<iframe class="blockUI" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + opts.iframeSrc + '"></iframe>')
            } else {
                lyr1 = $('<div class="blockUI" style="display:none"></div>')
            }
            if (opts.theme) {
                lyr2 = $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + (z++) + ';display:none"></div>')
            } else {
                lyr2 = $('<div class="blockUI blockOverlay" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>')
            }
            if (opts.theme && full) {
                s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:fixed">';
                if (opts.title) {
                    s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || "&nbsp;") + "</div>"
                }
                s += '<div class="ui-widget-content ui-dialog-content"></div>';
                s += "</div>"
            } else {
                if (opts.theme) {
                    s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:absolute">';
                    if (opts.title) {
                        s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || "&nbsp;") + "</div>"
                    }
                    s += '<div class="ui-widget-content ui-dialog-content"></div>';
                    s += "</div>"
                } else {
                    if (full) {
                        s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:' + (z + 10) + ';display:none;position:fixed"></div>'
                    } else {
                        s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:' + (z + 10) + ';display:none;position:absolute"></div>'
                    }
                }
            }
            lyr3 = $(s);
            if (msg) {
                if (opts.theme) {
                    lyr3.css(themedCSS);
                    lyr3.addClass("ui-widget-content")
                } else {
                    lyr3.css(css)
                }
            }
            if (!opts.theme) {
                lyr2.css(opts.overlayCSS)
            }
            lyr2.css("position", full ? "fixed" : "absolute");
            if (msie || opts.forceIframe) {
                lyr1.css("opacity", 0)
            }
            var layers = [lyr1, lyr2, lyr3],
                $par = full ? $("body") : $(el);
            $.each(layers, function() {
                this.appendTo($par)
            });
            if (opts.theme && opts.draggable && $.fn.draggable) {
                lyr3.draggable({
                    handle: ".ui-dialog-titlebar",
                    cancel: "li"
                })
            }
            var expr = setExpr && (!$.support.boxModel || $("object,embed", full ? null : el).length > 0);
            if (ie6 || expr) {
                if (full && opts.allowBodyStretch && $.support.boxModel) {
                    $("html,body").css("height", "100%")
                }
                if ((ie6 || !$.support.boxModel) && !full) {
                    var t = sz(el, "borderTopWidth"),
                        l = sz(el, "borderLeftWidth");
                    var fixT = t ? "(0 - " + t + ")" : 0;
                    var fixL = l ? "(0 - " + l + ")" : 0
                }
                $.each(layers, function(i, o) {
                    var s = o[0].style;
                    s.position = "absolute";
                    if (i < 2) {
                        if (full) {
                            s.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + opts.quirksmodeOffsetHack + ') + "px"')
                        } else {
                            s.setExpression("height", 'this.parentNode.offsetHeight + "px"')
                        }
                        if (full) {
                            s.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
                        } else {
                            s.setExpression("width", 'this.parentNode.offsetWidth + "px"')
                        }
                        if (fixL) {
                            s.setExpression("left", fixL)
                        }
                        if (fixT) {
                            s.setExpression("top", fixT)
                        }
                    } else {
                        if (opts.centerY) {
                            if (full) {
                                s.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')
                            }
                            s.marginTop = 0
                        } else {
                            if (!opts.centerY && full) {
                                var top = (opts.css && opts.css.top) ? parseInt(opts.css.top, 10) : 0;
                                var expression = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + top + ') + "px"';
                                s.setExpression("top", expression)
                            }
                        }
                    }
                })
            }
            if (msg) {
                if (opts.theme) {
                    lyr3.find(".ui-widget-content").append(msg)
                } else {
                    lyr3.append(msg)
                }
                if (msg.jquery || msg.nodeType) {
                    $(msg).show()
                }
            }
            if ((msie || opts.forceIframe) && opts.showOverlay) {
                lyr1.show()
            }
            if (opts.fadeIn) {
                var cb = opts.onBlock ? opts.onBlock : noOp;
                var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
                var cb2 = msg ? cb : noOp;
                if (opts.showOverlay) {
                    lyr2._fadeIn(opts.fadeIn, cb1)
                }
                if (msg) {
                    lyr3._fadeIn(opts.fadeIn, cb2)
                }
            } else {
                if (opts.showOverlay) {
                    lyr2.show()
                }
                if (msg) {
                    lyr3.show()
                }
                if (opts.onBlock) {
                    opts.onBlock.bind(lyr3)()
                }
            }
            bind(1, el, opts);
            if (full) {
                pageBlock = lyr3[0];
                pageBlockEls = $(opts.focusableElements, pageBlock);
                if (opts.focusInput) {
                    setTimeout(focus, 20)
                }
            } else {
                center(lyr3[0], opts.centerX, opts.centerY)
            }
            if (opts.timeout) {
                var to = setTimeout(function() {
                    if (full) {
                        $.unblockUI(opts)
                    } else {
                        $(el).unblock(opts)
                    }
                }, opts.timeout);
                $(el).data("blockUI.timeout", to)
            }
        }

        function remove(el, opts) {
            var count;
            var full = (el == window);
            var $el = $(el);
            var data = $el.data("blockUI.history");
            var to = $el.data("blockUI.timeout");
            if (to) {
                clearTimeout(to);
                $el.removeData("blockUI.timeout")
            }
            opts = $.extend({}, $.blockUI.defaults, opts || {});
            bind(0, el, opts);
            if (opts.onUnblock === null) {
                opts.onUnblock = $el.data("blockUI.onUnblock");
                $el.removeData("blockUI.onUnblock")
            }
            var els;
            if (full) {
                els = $("body").children().filter(".blockUI").add("body > .blockUI")
            } else {
                els = $el.find(">.blockUI")
            }
            if (opts.cursorReset) {
                if (els.length > 1) {
                    els[1].style.cursor = opts.cursorReset
                }
                if (els.length > 2) {
                    els[2].style.cursor = opts.cursorReset
                }
            }
            if (full) {
                pageBlock = pageBlockEls = null
            }
            if (opts.fadeOut) {
                count = els.length;
                els.stop().fadeOut(opts.fadeOut, function() {
                    if (--count === 0) {
                        reset(els, data, opts, el)
                    }
                })
            } else {
                reset(els, data, opts, el)
            }
        }

        function reset(els, data, opts, el) {
            var $el = $(el);
            if ($el.data("blockUI.isBlocked")) {
                return
            }
            els.each(function(i, o) {
                if (this.parentNode) {
                    this.parentNode.removeChild(this)
                }
            });
            if (data && data.el) {
                data.el.style.display = data.display;
                data.el.style.position = data.position;
                data.el.style.cursor = "default";
                if (data.parent) {
                    data.parent.appendChild(data.el)
                }
                $el.removeData("blockUI.history")
            }
            if ($el.data("blockUI.static")) {
                $el.css("position", "static")
            }
            if (typeof opts.onUnblock == "function") {
                opts.onUnblock(el, opts)
            }
            var body = $(document.body),
                w = body.width(),
                cssW = body[0].style.width;
            body.width(w - 1).width(w);
            body[0].style.width = cssW
        }

        function bind(b, el, opts) {
            var full = el == window,
                $el = $(el);
            if (!b && (full && !pageBlock || !full && !$el.data("blockUI.isBlocked"))) {
                return
            }
            $el.data("blockUI.isBlocked", b);
            if (!full || !opts.bindEvents || (b && !opts.showOverlay)) {
                return
            }
            var events = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";
            if (b) {
                $(document).bind(events, opts, handler)
            } else {
                $(document).unbind(events, handler)
            }
        }

        function handler(e) {
            if (e.type === "keydown" && e.keyCode && e.keyCode == 9) {
                if (pageBlock && e.data.constrainTabKey) {
                    var els = pageBlockEls;
                    var fwd = !e.shiftKey && e.target === els[els.length - 1];
                    var back = e.shiftKey && e.target === els[0];
                    if (fwd || back) {
                        setTimeout(function() {
                            focus(back)
                        }, 10);
                        return false
                    }
                }
            }
            var opts = e.data;
            var target = $(e.target);
            if (target.hasClass("blockOverlay") && opts.onOverlayClick) {
                opts.onOverlayClick(e)
            }
            if (target.parents("div." + opts.blockMsgClass).length > 0) {
                return true
            }
            return target.parents().children().filter("div.blockUI").length === 0
        }

        function focus(back) {
            if (!pageBlockEls) {
                return
            }
            var e = pageBlockEls[back === true ? pageBlockEls.length - 1 : 0];
            if (e) {
                e.focus()
            }
        }

        function center(el, x, y) {
            var p = el.parentNode,
                s = el.style;
            var l = ((p.offsetWidth - el.offsetWidth) / 2) - sz(p, "borderLeftWidth");
            var t = ((p.offsetHeight - el.offsetHeight) / 2) - sz(p, "borderTopWidth");
            if (x) {
                s.left = l > 0 ? (l + "px") : "0"
            }
            if (y) {
                s.top = t > 0 ? (t + "px") : "0"
            }
        }

        function sz(el, p) {
            return parseInt($.css(el, p), 10) || 0
        }
    }
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], setup)
    } else {
        setup(jQuery)
    }
})();
! function(e) {
    e.fn.marquee = function(t) {
        return this.each(function() {
            var i, a, n, r, s, o = e.extend({}, e.fn.marquee.defaults, t),
                u = e(this),
                d = 3,
                p = "animation-play-state",
                l = !1,
                c = function(e, t, i) {
                    for (var a = ["webkit", "moz", "MS", "o", ""], n = 0; n < a.length; n++) a[n] || (t = t.toLowerCase()), e.addEventListener(a[n] + t, i, !1)
                },
                f = function(e) {
                    var t = [];
                    for (var i in e) e.hasOwnProperty(i) && t.push(i + ":" + e[i]);
                    return t.push(), "{" + t.join(",") + "}"
                },
                m = function() {
                    u.timer = setTimeout(B, o.delayBeforeStart)
                },
                g = {
                    pause: function() {
                        l && o.allowCss3Support ? i.css(p, "paused") : e.fn.pause && i.pause(), u.data("runningStatus", "paused"), u.trigger("paused")
                    },
                    resume: function() {
                        l && o.allowCss3Support ? i.css(p, "running") : e.fn.resume && i.resume(), u.data("runningStatus", "resumed"), u.trigger("resumed")
                    },
                    toggle: function() {
                        g["resumed" == u.data("runningStatus") ? "pause" : "resume"]()
                    },
                    destroy: function() {
                        clearTimeout(u.timer), u.find("*").andSelf().unbind(), u.html(u.find(".js-marquee:first").html())
                    }
                };
            if ("string" == typeof t) return void(e.isFunction(g[t]) && (i || (i = u.find(".js-marquee-wrapper")), u.data("css3AnimationIsSupported") === !0 && (l = !0), g[t]()));
            var h;
            e.each(o, function(e, t) {
                if (h = u.attr("data-" + e), "undefined" != typeof h) {
                    switch (h) {
                        case "true":
                            h = !0;
                            break;
                        case "false":
                            h = !1
                    }
                    o[e] = h
                }
            }), o.duration = o.speed || o.duration, r = "up" == o.direction || "down" == o.direction, o.gap = o.duplicated ? parseInt(o.gap) : 0, u.wrapInner('<div class="js-marquee"></div>');
            var v = u.find(".js-marquee").css({
                "margin-right": o.gap,
                "float": "left"
            });
            if (o.duplicated && v.clone(!0).appendTo(u), u.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>'), i = u.find(".js-marquee-wrapper"), r) {
                var y = u.height();
                i.removeAttr("style"), u.height(y), u.find(".js-marquee").css({
                    "float": "none",
                    "margin-bottom": o.gap,
                    "margin-right": 0
                }), o.duplicated && u.find(".js-marquee:last").css({
                    "margin-bottom": 0
                });
                var x = u.find(".js-marquee:first").height() + o.gap;
                o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(x, 10) + parseInt(y, 10)) / parseInt(y, 10) * o.duration, o.duration = parseInt(x, 10) / parseInt(y, 10) * o.duration) : o.duration = (parseInt(x, 10) + parseInt(y, 10)) / parseInt(y, 10) * o.duration
            } else s = u.find(".js-marquee:first").width() + o.gap, a = u.width(), o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(s, 10) + parseInt(a, 10)) / parseInt(a, 10) * o.duration, o.duration = parseInt(s, 10) / parseInt(a, 10) * o.duration) : o.duration = (parseInt(s, 10) + parseInt(a, 10)) / parseInt(a, 10) * o.duration;
            if (o.duplicated && (o.duration = o.duration / 2), o.allowCss3Support) {
                var I = document.body || document.createElement("div"),
                    b = "marqueeAnimation-" + Math.floor(1e7 * Math.random()),
                    S = "Webkit Moz O ms Khtml".split(" "),
                    w = "animation",
                    q = "",
                    j = "";
                if (I.style.animation && (j = "@keyframes " + b + " ", l = !0), l === !1)
                    for (var C = 0; C < S.length; C++)
                        if (void 0 !== I.style[S[C] + "AnimationName"]) {
                            var V = "-" + S[C].toLowerCase() + "-";
                            w = V + w, p = V + p, j = "@" + V + "keyframes " + b + " ", l = !0;
                            break
                        } l && (q = b + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s infinite " + o.css3easing, u.data("css3AnimationIsSupported", !0))
            }
            var A = function() {
                    i.css("margin-top", "up" == o.direction ? y + "px" : "-" + x + "px")
                },
                k = function() {
                    i.css("margin-left", "left" == o.direction ? a + "px" : "-" + s + "px")
                };
            o.duplicated ? (r ? o.startVisible ? i.css("margin-top", 0) : i.css("margin-top", "up" == o.direction ? y + "px" : "-" + (2 * x - o.gap) + "px") : o.startVisible ? i.css("margin-left", 0) : i.css("margin-left", "left" == o.direction ? a + "px" : "-" + (2 * s - o.gap) + "px"), o.startVisible || (d = 1)) : o.startVisible ? d = 2 : r ? A() : k();
            var B = function() {
                if (o.duplicated && (1 === d ? (o._originalDuration = o.duration, r ? o.duration = "up" == o.direction ? o.duration + y / (x / o.duration) : 2 * o.duration : o.duration = "left" == o.direction ? o.duration + a / (s / o.duration) : 2 * o.duration, q && (q = b + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing), d++) : 2 === d && (o.duration = o._originalDuration, q && (b += "0", j = e.trim(j) + "0 ", q = b + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing), d++)), r ? o.duplicated ? (d > 2 && i.css("margin-top", "up" == o.direction ? 0 : "-" + x + "px"), n = {
                        "margin-top": "up" == o.direction ? "-" + x + "px" : 0
                    }) : o.startVisible ? 2 === d ? (q && (q = b + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing), n = {
                        "margin-top": "up" == o.direction ? "-" + x + "px" : y + "px"
                    }, d++) : 3 === d && (o.duration = o._completeDuration, q && (b += "0", j = e.trim(j) + "0 ", q = b + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing), A()) : (A(), n = {
                        "margin-top": "up" == o.direction ? "-" + i.height() + "px" : y + "px"
                    }) : o.duplicated ? (d > 2 && i.css("margin-left", "left" == o.direction ? 0 : "-" + s + "px"), n = {
                        "margin-left": "left" == o.direction ? "-" + s + "px" : 0
                    }) : o.startVisible ? 2 === d ? (q && (q = b + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing), n = {
                        "margin-left": "left" == o.direction ? "-" + s + "px" : a + "px"
                    }, d++) : 3 === d && (o.duration = o._completeDuration, q && (b += "0", j = e.trim(j) + "0 ", q = b + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing), k()) : (k(), n = {
                        "margin-left": "left" == o.direction ? "-" + s + "px" : a + "px"
                    }), u.trigger("beforeStarting"), l) {
                    i.css(w, q);
                    var t = j + " { 100%  " + f(n) + "}",
                        p = i.find("style");
                    0 !== p.length ? p.filter(":last").html(t) : i.append("<style>" + t + "</style>"), c(i[0], "AnimationIteration", function() {
                        u.trigger("finished")
                    }), c(i[0], "AnimationEnd", function() {
                        B(), u.trigger("finished")
                    })
                } else i.animate(n, o.duration, o.easing, function() {
                    u.trigger("finished"), o.pauseOnCycle ? m() : B()
                });
                u.data("runningStatus", "resumed")
            };
            u.bind("pause", g.pause), u.bind("resume", g.resume), o.pauseOnHover && u.bind("mouseenter mouseleave", g.toggle), l && o.allowCss3Support ? B() : m()
        })
    }, e.fn.marquee.defaults = {
        allowCss3Support: !0,
        css3easing: "linear",
        easing: "linear",
        delayBeforeStart: 1e3,
        direction: "left",
        duplicated: !1,
        duration: 5e3,
        gap: 20,
        pauseOnCycle: !1,
        pauseOnHover: !1,
        startVisible: !1
    }
}(jQuery);
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory)
    } else {
        factory(jQuery)
    }
}(function($) {
    $.extend($.fn, {
        validate: function(options) {
            if (!this.length) {
                if (options && options.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.")
                }
                return
            }
            var validator = $.data(this[0], "validator");
            if (validator) {
                return validator
            }
            this.attr("novalidate", "novalidate");
            validator = new $.validator(options, this[0]);
            $.data(this[0], "validator", validator);
            if (validator.settings.onsubmit) {
                this.validateDelegate(":submit", "click", function(event) {
                    if (validator.settings.submitHandler) {
                        validator.submitButton = event.target
                    }
                    if ($(event.target).hasClass("cancel")) {
                        validator.cancelSubmit = true
                    }
                    if ($(event.target).attr("formnovalidate") !== undefined) {
                        validator.cancelSubmit = true
                    }
                });
                this.submit(function(event) {
                    if (validator.settings.debug) {
                        event.preventDefault()
                    }

                    function handle() {
                        var hidden;
                        if (validator.settings.submitHandler) {
                            if (validator.submitButton) {
                                hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm)
                            }
                            validator.settings.submitHandler.call(validator, validator.currentForm, event);
                            if (validator.submitButton) {
                                hidden.remove()
                            }
                            return false
                        }
                        return true
                    }
                    if (validator.cancelSubmit) {
                        validator.cancelSubmit = false;
                        return handle()
                    }
                    if (validator.form()) {
                        if (validator.pendingRequest) {
                            validator.formSubmitted = true;
                            return false
                        }
                        return handle()
                    } else {
                        validator.focusInvalid();
                        return false
                    }
                })
            }
            return validator
        },
        valid: function() {
            var valid, validator;
            if ($(this[0]).is("form")) {
                valid = this.validate().form()
            } else {
                valid = true;
                validator = $(this[0].form).validate();
                this.each(function() {
                    valid = validator.element(this) && valid
                })
            }
            return valid
        },
        removeAttrs: function(attributes) {
            var result = {},
                $element = this;
            $.each(attributes.split(/\s/), function(index, value) {
                result[value] = $element.attr(value);
                $element.removeAttr(value)
            });
            return result
        },
        rules: function(command, argument) {
            var element = this[0],
                settings, staticRules, existingRules, data, param, filtered;
            if (command) {
                settings = $.data(element.form, "validator").settings;
                staticRules = settings.rules;
                existingRules = $.validator.staticRules(element);
                switch (command) {
                    case "add":
                        $.extend(existingRules, $.validator.normalizeRule(argument));
                        delete existingRules.messages;
                        staticRules[element.name] = existingRules;
                        if (argument.messages) {
                            settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages)
                        }
                        break;
                    case "remove":
                        if (!argument) {
                            delete staticRules[element.name];
                            return existingRules
                        }
                        filtered = {};
                        $.each(argument.split(/\s/), function(index, method) {
                            filtered[method] = existingRules[method];
                            delete existingRules[method];
                            if (method === "required") {
                                $(element).removeAttr("aria-required")
                            }
                        });
                        return filtered
                }
            }
            data = $.validator.normalizeRules($.extend({}, $.validator.classRules(element), $.validator.attributeRules(element), $.validator.dataRules(element), $.validator.staticRules(element)), element);
            if (data.required) {
                param = data.required;
                delete data.required;
                data = $.extend({
                    required: param
                }, data);
                $(element).attr("aria-required", "true")
            }
            if (data.remote) {
                param = data.remote;
                delete data.remote;
                data = $.extend(data, {
                    remote: param
                })
            }
            return data
        }
    });
    $.extend($.expr[":"], {
        blank: function(a) {
            return !$.trim("" + $(a).val())
        },
        filled: function(a) {
            return !!$.trim("" + $(a).val())
        },
        unchecked: function(a) {
            return !$(a).prop("checked")
        }
    });
    $.validator = function(options, form) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.currentForm = form;
        this.init()
    };
    $.validator.format = function(source, params) {
        if (arguments.length === 1) {
            return function() {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args)
            }
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1)
        }
        if (params.constructor !== Array) {
            params = [params]
        }
        $.each(params, function(i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
                return n
            })
        });
        return source
    };
    $.extend($.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error-tips",
            validClass: "valid-tips",
            errorElement: "span",
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            success: "valid-tips",
            onfocusin: function(element) {
                this.lastActive = element;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass)
                    }
                    this.hideThese(this.errorsFor(element))
                }
            },
            onfocusout: function(element) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element)
                }
            },
            onkeyup: function(element, event) {
                if (event.which === 9 && this.elementValue(element) === "") {
                    return
                } else {
                    if (element.name in this.submitted || element === this.lastElement) {
                        this.element(element)
                    }
                }
            },
            onclick: function(element) {
                if (element.name in this.submitted) {
                    this.element(element)
                } else {
                    if (element.parentNode.name in this.submitted) {
                        this.element(element.parentNode)
                    }
                }
            },
            highlight: function(element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass)
                } else {
                    $(element).addClass(errorClass).removeClass(validClass)
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass)
                } else {
                    $(element).removeClass(errorClass).addClass(validClass)
                }
            }
        },
        setDefaults: function(settings) {
            $.extend($.validator.defaults, settings)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function() {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var groups = (this.groups = {}),
                    rules;
                $.each(this.settings.groups, function(key, value) {
                    if (typeof value === "string") {
                        value = value.split(/\s/)
                    }
                    $.each(value, function(index, name) {
                        groups[name] = key
                    })
                });
                rules = this.settings.rules;
                $.each(rules, function(key, value) {
                    rules[key] = $.validator.normalizeRule(value)
                });

                function delegate(event) {
                    var validator = $.data(this[0].form, "validator"),
                        eventType = "on" + event.type.replace(/^validate/, ""),
                        settings = validator.settings;
                    if (settings[eventType] && !this.is(settings.ignore)) {
                        settings[eventType].call(validator, this[0], event)
                    }
                }
                $(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, " + "[type='number'], [type='search'] ,[type='tel'], [type='url'], " + "[type='email'], [type='datetime'], [type='date'], [type='month'], " + "[type='week'], [type='time'], [type='datetime-local'], " + "[type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", delegate).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate);
                if (this.settings.invalidHandler) {
                    $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                }
                $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if (!this.valid()) {
                    $(this.currentForm).triggerHandler("invalid-form", [this])
                }
                this.showErrors();
                return this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
                    this.check(elements[i])
                }
                return this.valid()
            },
            element: function(element) {
                var cleanElement = this.clean(element),
                    checkElement = this.validationTargetFor(cleanElement),
                    result = true;
                this.lastElement = checkElement;
                if (checkElement === undefined) {
                    delete this.invalid[cleanElement.name]
                } else {
                    this.prepareElement(checkElement);
                    this.currentElements = $(checkElement);
                    result = this.check(checkElement) !== false;
                    if (result) {
                        delete this.invalid[checkElement.name]
                    } else {
                        this.invalid[checkElement.name] = true
                    }
                }
                $(element).attr("aria-invalid", !result);
                if (!this.numberOfInvalids()) {
                    this.toHide = this.toHide.add(this.containers)
                }
                this.showErrors();
                return result
            },
            showErrors: function(errors) {
                if (errors) {
                    $.extend(this.errorMap, errors);
                    this.errorList = [];
                    for (var name in errors) {
                        this.errorList.push({
                            message: errors[name],
                            element: this.findByName(name)[0]
                        })
                    }
                    this.successList = $.grep(this.successList, function(element) {
                        return !(element.name in errors)
                    })
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList)
                } else {
                    this.defaultShowErrors()
                }
            },
            resetForm: function() {
                if ($.fn.resetForm) {
                    $(this.currentForm).resetForm()
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid");
                $("span." + this.settings.errorClass).remove()
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(obj) {
                var count = 0,
                    i;
                for (i in obj) {
                    count++
                }
                return count
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(errors) {
                errors.not(this.containers).text("");
                this.addWrapper(errors).hide()
            },
            valid: function() {
                return this.size() === 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (e) {}
                }
            },
            findLastActive: function() {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function(n) {
                    return n.element.name === lastActive.name
                }).length === 1 && lastActive
            },
            elements: function() {
                var validator = this,
                    rulesCache = {};
                return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    if (!this.name && validator.settings.debug && window.console) {
                        console.error("%o has no name assigned", this)
                    }
                    if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
                        return false
                    }
                    rulesCache[this.name] = true;
                    return true
                })
            },
            clean: function(selector) {
                return $(selector)[0]
            },
            errors: function() {
                var errorClass = this.settings.errorClass.split(" ").join(".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
                this.currentElements = $([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(element) {
                this.reset();
                this.toHide = this.errorsFor(element)
            },
            elementValue: function(element) {
                var val, $element = $(element),
                    type = element.type;
                if (type === "radio" || type === "checkbox") {
                    return $("input[name='" + element.name + "']:checked").val()
                } else {
                    if (type === "number" && typeof element.validity !== "undefined") {
                        return element.validity.badInput ? false : $element.val()
                    }
                }
                val = $element.val();
                if (typeof val === "string") {
                    return val.replace(/\r/g, "")
                }
                return val
            },
            check: function(element) {
                element = this.validationTargetFor(this.clean(element));
                var rules = $(element).rules(),
                    rulesCount = $.map(rules, function(n, i) {
                        return i
                    }).length,
                    dependencyMismatch = false,
                    val = this.elementValue(element),
                    result, method, rule;
                for (method in rules) {
                    rule = {
                        method: method,
                        parameters: rules[method]
                    };
                    try {
                        result = $.validator.methods[method].call(this, val, element, rule.parameters);
                        if (result === "dependency-mismatch" && rulesCount === 1) {
                            dependencyMismatch = true;
                            continue
                        }
                        dependencyMismatch = false;
                        if (result === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(element));
                            return
                        }
                        if (!result) {
                            this.formatAndAdd(element, rule);
                            return false
                        }
                    } catch (e) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e)
                        }
                        throw e
                    }
                }
                if (dependencyMismatch) {
                    return
                }
                if (this.objectLength(rules)) {
                    this.successList.push(element)
                }
                return true
            },
            customDataMessage: function(element, method) {
                return $(element).data("msg" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase()) || $(element).data("msg")
            },
            customMessage: function(name, method) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method])
            },
            findDefined: function() {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        return arguments[i]
                    }
                }
                return undefined
            },
            defaultMessage: function(element, method) {
                return this.findDefined(this.customMessage(element.name, method), this.customDataMessage(element, method), !this.settings.ignoreTitle && element.title || undefined, $.validator.messages[method], "<strong>Warning: No message defined for " + element.name + "</strong>")
            },
            formatAndAdd: function(element, rule) {
                var message = this.defaultMessage(element, rule.method),
                    theregex = /\$?\{(\d+)\}/g;
                if (typeof message === "function") {
                    message = message.call(this, rule.parameters, element)
                } else {
                    if (theregex.test(message)) {
                        message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters)
                    }
                }
                this.errorList.push({
                    message: message,
                    element: element,
                    method: rule.method
                });
                this.errorMap[element.name] = message;
                this.submitted[element.name] = message
            },
            addWrapper: function(toToggle) {
                if (this.settings.wrapper) {
                    toToggle = toToggle.add(toToggle.parent(this.settings.wrapper))
                }
                return toToggle
            },
            defaultShowErrors: function() {
                var i, elements, error;
                for (i = 0; this.errorList[i]; i++) {
                    error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass)
                    }
                    this.showLabel(error.element, error.message)
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers)
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i])
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements(); elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass)
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return $(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(element, message) {
                var place, group, errorID, error = this.errorsFor(element),
                    elementID = this.idOrName(element),
                    describedBy = $(element).attr("aria-describedby");
                if (error.length) {
                    error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    error.html(message)
                } else {
                    error = $("<" + this.settings.errorElement + ">").attr("id", elementID + "-error").addClass(this.settings.errorClass).html(message || "");
                    place = error;
                    if (this.settings.wrapper) {
                        place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()
                    }
                    if (this.labelContainer.length) {
                        this.labelContainer.append(place)
                    } else {
                        if (this.settings.errorPlacement) {
                            this.settings.errorPlacement(place, $(element))
                        } else {
                            place.insertAfter(element)
                        }
                    }
                    if (error.is("label")) {
                        error.attr("for", elementID)
                    } else {
                        if (error.parents("label[for='" + elementID + "']").length === 0) {
                            errorID = error.attr("id");
                            if (!describedBy) {
                                describedBy = errorID
                            } else {
                                if (!describedBy.match(new RegExp("\b" + errorID + "\b"))) {
                                    describedBy += " " + errorID
                                }
                            }
                            $(element).attr("aria-describedby", describedBy);
                            group = this.groups[element.name];
                            if (group) {
                                $.each(this.groups, function(name, testgroup) {
                                    if (testgroup === group) {
                                        $("[name='" + name + "']", this.currentForm).attr("aria-describedby", error.attr("id"))
                                    }
                                })
                            }
                        }
                    }
                }
                if (!message && this.settings.success) {
                    error.text("");
                    if (typeof this.settings.success === "string") {
                        error.addClass(this.settings.success)
                    } else {
                        this.settings.success(error, element)
                    }
                }
                this.toShow = this.toShow.add(error)
            },
            errorsFor: function(element) {
                var name = this.idOrName(element),
                    describer = $(element).attr("aria-describedby"),
                    selector = "label[for='" + name + "'], label[for='" + name + "'] *";
                if (describer) {
                    selector = selector + ", #" + describer.replace(/\s+/g, ", #")
                }
                return this.errors().filter(selector)
            },
            idOrName: function(element) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name)
            },
            validationTargetFor: function(element) {
                if (this.checkable(element)) {
                    element = this.findByName(element.name).not(this.settings.ignore)[0]
                }
                return element
            },
            checkable: function(element) {
                return (/radio|checkbox/i).test(element.type)
            },
            findByName: function(name) {
                return $(this.currentForm).find("[name='" + name + "']")
            },
            getLength: function(value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if (this.checkable(element)) {
                            return this.findByName(element.name).filter(":checked").length
                        }
                }
                return value.length
            },
            depend: function(param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true
            },
            dependTypes: {
                "boolean": function(param) {
                    return param
                },
                "string": function(param, element) {
                    return !!$(param, element.form).length
                },
                "function": function(param, element) {
                    return param(element)
                }
            },
            optional: function(element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch"
            },
            startRequest: function(element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    this.pending[element.name] = true
                }
            },
            stopRequest: function(element, valid) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0
                }
                delete this.pending[element.name];
                if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    $(this.currentForm).submit();
                    this.formSubmitted = false
                } else {
                    if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                        $(this.currentForm).triggerHandler("invalid-form", [this]);
                        this.formSubmitted = false
                    }
                }
            },
            previousValue: function(element) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(element, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            number: {
                number: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },
        addClassRules: function(className, rules) {
            if (className.constructor === String) {
                this.classRuleSettings[className] = rules
            } else {
                $.extend(this.classRuleSettings, className)
            }
        },
        classRules: function(element) {
            var rules = {},
                classes = $(element).attr("class");
            if (classes) {
                $.each(classes.split(" "), function() {
                    if (this in $.validator.classRuleSettings) {
                        $.extend(rules, $.validator.classRuleSettings[this])
                    }
                })
            }
            return rules
        },
        attributeRules: function(element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method, value;
            for (method in $.validator.methods) {
                if (method === "required") {
                    value = element.getAttribute(method);
                    if (value === "") {
                        value = true
                    }
                    value = !!value
                } else {
                    value = $element.attr(method)
                }
                if (/min|max/.test(method) && (type === null || /number|range|text/.test(type))) {
                    value = Number(value)
                }
                if (value || value === 0) {
                    rules[method] = value
                } else {
                    if (type === method && type !== "range") {
                        rules[method] = true
                    }
                }
            }
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength
            }
            return rules
        },
        dataRules: function(element) {
            var method, value, rules = {},
                $element = $(element);
            for (method in $.validator.methods) {
                value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
                if (value !== undefined) {
                    rules[method] = value
                }
            }
            return rules
        },
        staticRules: function(element) {
            var rules = {},
                validator = $.data(element.form, "validator");
            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {}
            }
            return rules
        },
        normalizeRules: function(rules, element) {
            $.each(rules, function(prop, val) {
                if (val === false) {
                    delete rules[prop];
                    return
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !!$(val.depends, element.form).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element);
                            break
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true
                    } else {
                        delete rules[prop]
                    }
                }
            });
            $.each(rules, function(rule, parameter) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter
            });
            $.each(["minlength", "maxlength"], function() {
                if (rules[this]) {
                    rules[this] = Number(rules[this])
                }
            });
            $.each(["rangelength", "range"], function() {
                var parts;
                if (rules[this]) {
                    if ($.isArray(rules[this])) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])]
                    } else {
                        if (typeof rules[this] === "string") {
                            parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                            rules[this] = [Number(parts[0]), Number(parts[1])]
                        }
                    }
                }
            });
            if ($.validator.autoCreateRanges) {
                if (rules.min && rules.max) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max
                }
                if (rules.minlength && rules.maxlength) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength
                }
            }
            return rules
        },
        normalizeRule: function(data) {
            if (typeof data === "string") {
                var transformed = {};
                $.each(data.split(/\s/), function() {
                    transformed[this] = true
                });
                data = transformed
            }
            return data
        },
        addMethod: function(name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name))
            }
        },
        methods: {
            required: function(value, element, param) {
                if (!this.depend(param, element)) {
                    return "dependency-mismatch"
                }
                if (element.nodeName.toLowerCase() === "select") {
                    var val = $(element).val();
                    return val && val.length > 0
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0
                }
                return $.trim(value).length > 0
            },
            email: function(value, element) {
                return this.optional(element) || /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value)
            },
            url: function(value, element) {
                return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
            },
            date: function(value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString())
            },
            dateISO: function(value, element) {
                return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
            },
            number: function(value, element) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
            },
            digits: function(value, element) {
                return this.optional(element) || /^\d+$/.test(value)
            },
            creditcard: function(value, element) {
                if (this.optional(element)) {
                    return "dependency-mismatch"
                }
                if (/[^0-9 \-]+/.test(value)) {
                    return false
                }
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false,
                    n, cDigit;
                value = value.replace(/\D/g, "");
                if (value.length < 13 || value.length > 19) {
                    return false
                }
                for (n = value.length - 1; n >= 0; n--) {
                    cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit, 10);
                    if (bEven) {
                        if ((nDigit *= 2) > 9) {
                            nDigit -= 9
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven
                }
                return (nCheck % 10) === 0
            },
            minlength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length >= param
            },
            maxlength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length <= param
            },
            rangelength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || (length >= param[0] && length <= param[1])
            },
            min: function(value, element, param) {
                return this.optional(element) || value >= param
            },
            max: function(value, element, param) {
                return this.optional(element) || value <= param
            },
            range: function(value, element, param) {
                return this.optional(element) || (value >= param[0] && value <= param[1])
            },
            equalTo: function(value, element, param) {
                var target = $(param);
                if (this.settings.onfocusout) {
                    target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        $(element).valid()
                    })
                }
                return value === target.val()
            },
            remote: function(value, element, param) {
                if (this.optional(element)) {
                    return "dependency-mismatch"
                }
                var previous = this.previousValue(element),
                    validator, data;
                if (!this.settings.messages[element.name]) {
                    this.settings.messages[element.name] = {}
                }
                previous.originalMessage = this.settings.messages[element.name].remote;
                this.settings.messages[element.name].remote = previous.message;
                param = typeof param === "string" && {
                    url: param
                } || param;
                if (previous.old === value) {
                    return previous.valid
                }
                previous.old = value;
                validator = this;
                this.startRequest(element);
                data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    url: param,
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    context: validator.currentForm,
                    success: function(response) {
                        var valid = response === true || response === "true",
                            errors, message, submitted;
                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        if (valid) {
                            submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            delete validator.invalid[element.name];
                            validator.showErrors()
                        } else {
                            errors = {};
                            message = response || validator.defaultMessage(element, "remote");
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors)
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid)
                    }
                }, param));
                return "pending"
            }
        }
    });
    $.format = function deprecated() {
        throw "$.format has been deprecated. Please use $.validator.format instead."
    };
    var pendingRequests = {},
        ajax;
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function(settings, _, xhr) {
            var port = settings.port;
            if (settings.mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort()
                }
                pendingRequests[port] = xhr
            }
        })
    } else {
        ajax = $.ajax;
        $.ajax = function(settings) {
            var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
                port = ("port" in settings ? settings : $.ajaxSettings).port;
            if (mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort()
                }
                pendingRequests[port] = ajax.apply(this, arguments);
                return pendingRequests[port]
            }
            return ajax.apply(this, arguments)
        }
    }
    $.extend($.fn, {
        validateDelegate: function(delegate, type, handler) {
            return this.bind(type, function(event) {
                var target = $(event.target);
                if (target.is(delegate)) {
                    return handler.apply(target, arguments)
                }
            })
        }
    })
}));
jQuery.validator.addMethod("phone", function(value, element) {
    var phone = /^1[3|4|5|7|8]\d{9}$/;
    return this.optional(element) || (phone.test(value))
}, "????????");
jQuery.validator.addMethod("qq", function(value, element) {
    var qq = /^[0-9]{5,13}$/;
    return this.optional(element) || (qq.test(value));
}, "QQå·æ ¼å¼æœ‰è¯¯ï¼");
jQuery.validator.addMethod("password", function(value, element) {
    var password = /^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/;
    return this.optional(element) || (password.test(value))
}, "???????");
jQuery.validator.addMethod("username", function(value, element) {
    var username = /^[0-9a-z]{4,12}$/;
    return this.optional(element) || (username.test(value))
}, "????????");
jQuery.validator.addMethod("realname", function(value, element, regexp) {
    if (regexp == null || regexp == undefined || typeof regexp !== 'function') {
        regexp = /^(?=.{2,30}$)([0-9a-zA-Z-Â·.\u4e00-\u9fa5]+ )*[0-9a-zA-Z-Â·.\u4e00-\u9fa5]+$/;
    }
    return this.optional(element) || (regexp.test(value))
}, "?????");
jQuery.validator.addMethod("card", function(value, element) {
    var card = /^[0-9]{5,100}$/;
    return this.optional(element) || (card.test(value))
}, "?????????");
jQuery.validator.addMethod("notEqual", function(value, element, param) {
    return this.optional(element) || value != $(param).val()
}, "Please specify a different (non-default) value");
jQuery.validator.addMethod("captcha", function(value, element, param) {
    var captcha = /^[0-9a-z_A-Z]{4}$/;
    return this.optional(element) || (captcha.test(value))
}, "????????");
$.fn.Float = function(obj) {
    var that = this;
    var lock = {
        topSide: 150,
        floatRight: 1,
        side: 5,
        init: function() {
            var el = that,
                ua = navigator.userAgent;
            el.css({
                "position": "absolute",
                "z-index": "1100",
                "top": this.topSide
            });
            if (ua.toLowerCase().indexOf("360se") > -1) {
                this.isBlock = true
            } else {
                if (ua.toLowerCase().indexOf("theworld") > 0) {
                    this.isBlock = true
                }
            }
            this.floatRight == 1 ? el.css("right", this.side) : el.css("left", this.side);
            var locker = this;
            setInterval(function() {
                locker.lock.call(locker)
            }, 20);
            if (this.close != undefined) {
                this.closeFloat()
            }
            if (this.floatRight == 1) {
                $(window).resize(function() {
                    $(this).scrollLeft(0);
                    el.css("right", 5)
                })
            }
        },
        lockTop: function(el, position, page, scroll, icon) {
            var top = el.css("top");
            var y = scroll.top + icon.topSide,
                offsetTop = (y - parseInt(top)) / 20;
            if (this.isBlock) {
                offsetTop = (y - parseInt(top))
            }
            var topSide = parseInt(top) + offsetTop;
            if ((topSide + position.height) < page.height) {
                el.css("top", topSide)
            }
        },
        lockLeft: function(el, scroll, icon) {
            var left = el.css("left");
            var x = scroll.left + icon.side,
                offsetLeft = (x - parseInt(left)) / 20;
            el.css("left", parseInt(left) + offsetLeft)
        },
        lockRight: function(el, scroll, icon) {
            var right = el.css("right");
            var d = document;
            if (scroll.left == 0) {
                var x = icon.side,
                    offsetRight = (Math.abs(x) - Math.abs(parseInt(right))) / 20;
                el.css("right", Math.abs(parseInt(right)) + offsetRight)
            } else {
                var x = scroll.left - icon.side,
                    offsetRight = (Math.abs(x) - Math.abs(parseInt(right))) / 20;
                right = -(Math.abs(parseInt(right)) + offsetRight) + "px";
                el.css("right", right)
            }
        },
        lock: function() {
            var el = that,
                position = this.currentPosition(el),
                win = this.windowDimension(),
                scroll = this.scrollPosition(),
                page = this.pageDimension(),
                icon = this;
            this.lockTop(el, position, page, scroll, icon);
            if (this.floatRight == 1) {
                this.lockRight(el, scroll, icon)
            } else {
                this.lockLeft(el, scroll, icon)
            }
            if (this.isBlock) {
                if (this.lastTop != el.css("top")) {
                    el.css("visibility", "hidden");
                    this.lastTop = el.css("top")
                } else {
                    el.css("visibility", "visible")
                }
            }
        },
        currentPosition: function(el) {
            var offset = el.offset();
            return {
                top: offset.top,
                left: offset.left,
                width: el.outerWidth(),
                height: el.outerHeight()
            }
        },
        windowDimension: function() {
            if ((typeof innerWidth != "undefined" && innerWidth != 0) && (typeof innerHeight != "undefined" && innerHeight != 0)) {
                return {
                    width: innerWidth,
                    height: innerHeight
                }
            }
            var d = document;
            return {
                width: Math.min(d.body.clientWidth, d.documentElement.clientWidth),
                height: Math.min(d.body.clientHeight, d.documentElement.clientHeight)
            }
        },
        scrollPosition: function() {
            var d = document;
            return {
                top: Math.max(d.body.scrollTop, d.documentElement.scrollTop),
                left: Math.max(d.body.scrollLeft, d.documentElement.scrollLeft)
            }
        },
        pageDimension: function() {
            var d = document;
            return {
                width: Math.max(d.body.scrollWidth, d.documentElement.scrollWidth),
                height: Math.max(d.body.scrollHeight, d.documentElement.scrollHeight)
            }
        },
        closeFloat: function() {
            that.find("#" + this.close).on("click", function() {
                that.hide()
            }).css("cursor", "pointer")
        }
    };
    if (obj) {
        $.extend(lock, obj)
    }
    lock.init()
};
(function(w) {
    w.matchMedia = w.matchMedia || function(doc, undefined) {
        var bool, docElem = doc.documentElement,
            refNode = docElem.firstElementChild || docElem.firstChild,
            fakeBody = doc.createElement("body"),
            div = doc.createElement("div");
        div.id = "mq-test-1";
        div.style.cssText = "position:absolute;top:-100em";
        fakeBody.style.background = "none";
        fakeBody.appendChild(div);
        return function(q) {
            div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>';
            docElem.insertBefore(fakeBody, refNode);
            bool = div.offsetWidth === 42;
            docElem.removeChild(fakeBody);
            return {
                matches: bool,
                media: q
            }
        }
    }(w.document)
})(this);
(function(w) {
    var respond = {};
    w.respond = respond;
    respond.update = function() {};
    var requestQueue = [],
        xmlHttp = function() {
            var xmlhttpmethod = false;
            try {
                xmlhttpmethod = new w.XMLHttpRequest()
            } catch (e) {
                xmlhttpmethod = new w.ActiveXObject("Microsoft.XMLHTTP")
            }
            return function() {
                return xmlhttpmethod
            }
        }(),
        ajax = function(url, callback) {
            var req = xmlHttp();
            if (!req) {
                return
            }
            req.open("GET", url, true);
            req.onreadystatechange = function() {
                if (req.readyState !== 4 || req.status !== 200 && req.status !== 304) {
                    return
                }
                callback(req.responseText)
            };
            if (req.readyState === 4) {
                return
            }
            req.send(null)
        },
        isUnsupportedMediaQuery = function(query) {
            return query.replace(respond.regex.minmaxwh, "").match(respond.regex.other)
        };
    respond.ajax = ajax;
    respond.queue = requestQueue;
    respond.unsupportedmq = isUnsupportedMediaQuery;
    respond.regex = {
        media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
        keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
        comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
        urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
        findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
        only: /(only\s+)?([a-zA-Z]+)\s?/,
        minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
        other: /\([^\)]*\)/g
    };
    respond.mediaQueriesSupported = w.matchMedia && w.matchMedia("only all") !== null && w.matchMedia("only all").matches;
    if (respond.mediaQueriesSupported) {
        return
    }
    var doc = w.document,
        docElem = doc.documentElement,
        mediastyles = [],
        rules = [],
        appendedEls = [],
        parsedSheets = {},
        resizeThrottle = 30,
        head = doc.getElementsByTagName("head")[0] || docElem,
        base = doc.getElementsByTagName("base")[0],
        links = head.getElementsByTagName("link"),
        lastCall, resizeDefer, eminpx, getEmValue = function() {
            var ret, div = doc.createElement("div"),
                body = doc.body,
                originalHTMLFontSize = docElem.style.fontSize,
                originalBodyFontSize = body && body.style.fontSize,
                fakeUsed = false;
            div.style.cssText = "position:absolute;font-size:1em;width:1em";
            if (!body) {
                body = fakeUsed = doc.createElement("body");
                body.style.background = "none"
            }
            docElem.style.fontSize = "100%";
            body.style.fontSize = "100%";
            body.appendChild(div);
            if (fakeUsed) {
                docElem.insertBefore(body, docElem.firstChild)
            }
            ret = div.offsetWidth;
            if (fakeUsed) {
                docElem.removeChild(body)
            } else {
                body.removeChild(div)
            }
            docElem.style.fontSize = originalHTMLFontSize;
            if (originalBodyFontSize) {
                body.style.fontSize = originalBodyFontSize
            }
            ret = eminpx = parseFloat(ret);
            return ret
        },
        applyMedia = function(fromResize) {
            var name = "clientWidth",
                docElemProp = docElem[name],
                currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[name] || docElemProp,
                styleBlocks = {},
                lastLink = links[links.length - 1],
                now = new Date().getTime();
            if (fromResize && lastCall && now - lastCall < resizeThrottle) {
                w.clearTimeout(resizeDefer);
                resizeDefer = w.setTimeout(applyMedia, resizeThrottle);
                return
            } else {
                lastCall = now
            }
            for (var i in mediastyles) {
                if (mediastyles.hasOwnProperty(i)) {
                    var thisstyle = mediastyles[i],
                        min = thisstyle.minw,
                        max = thisstyle.maxw,
                        minnull = min === null,
                        maxnull = max === null,
                        em = "em";
                    if (!!min) {
                        min = parseFloat(min) * (min.indexOf(em) > -1 ? eminpx || getEmValue() : 1)
                    }
                    if (!!max) {
                        max = parseFloat(max) * (max.indexOf(em) > -1 ? eminpx || getEmValue() : 1)
                    }
                    if (!thisstyle.hasquery || (!minnull || !maxnull) && (minnull || currWidth >= min) && (maxnull || currWidth <= max)) {
                        if (!styleBlocks[thisstyle.media]) {
                            styleBlocks[thisstyle.media] = []
                        }
                        styleBlocks[thisstyle.media].push(rules[thisstyle.rules])
                    }
                }
            }
            for (var j in appendedEls) {
                if (appendedEls.hasOwnProperty(j)) {
                    if (appendedEls[j] && appendedEls[j].parentNode === head) {
                        head.removeChild(appendedEls[j])
                    }
                }
            }
            appendedEls.length = 0;
            for (var k in styleBlocks) {
                if (styleBlocks.hasOwnProperty(k)) {
                    var ss = doc.createElement("style"),
                        css = styleBlocks[k].join("\n");
                    ss.type = "text/css";
                    ss.media = k;
                    head.insertBefore(ss, lastLink.nextSibling);
                    if (ss.styleSheet) {
                        ss.styleSheet.cssText = css
                    } else {
                        ss.appendChild(doc.createTextNode(css))
                    }
                    appendedEls.push(ss)
                }
            }
        },
        translate = function(styles, href, media) {
            var qs = styles.replace(respond.regex.comments, "").replace(respond.regex.keyframes, "").match(respond.regex.media),
                ql = qs && qs.length || 0;
            href = href.substring(0, href.lastIndexOf("/"));
            var repUrls = function(css) {
                    return css.replace(respond.regex.urls, "$1" + href + "$2$3")
                },
                useMedia = !ql && media;
            if (href.length) {
                href += "/"
            }
            if (useMedia) {
                ql = 1
            }
            for (var i = 0; i < ql; i++) {
                var fullq, thisq, eachq, eql;
                if (useMedia) {
                    fullq = media;
                    rules.push(repUrls(styles))
                } else {
                    fullq = qs[i].match(respond.regex.findStyles) && RegExp.$1;
                    rules.push(RegExp.$2 && repUrls(RegExp.$2))
                }
                eachq = fullq.split(",");
                eql = eachq.length;
                for (var j = 0; j < eql; j++) {
                    thisq = eachq[j];
                    if (isUnsupportedMediaQuery(thisq)) {
                        continue
                    }
                    mediastyles.push({
                        media: thisq.split("(")[0].match(respond.regex.only) && RegExp.$2 || "all",
                        rules: rules.length - 1,
                        hasquery: thisq.indexOf("(") > -1,
                        minw: thisq.match(respond.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: thisq.match(respond.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    })
                }
            }
            applyMedia()
        },
        makeRequests = function() {
            if (requestQueue.length) {
                var thisRequest = requestQueue.shift();
                ajax(thisRequest.href, function(styles) {
                    translate(styles, thisRequest.href, thisRequest.media);
                    parsedSheets[thisRequest.href] = true;
                    w.setTimeout(function() {
                        makeRequests()
                    }, 0)
                })
            }
        },
        ripCSS = function() {
            for (var i = 0; i < links.length; i++) {
                var sheet = links[i],
                    href = sheet.href,
                    media = sheet.media,
                    isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";
                if (!!href && isCSS && !parsedSheets[href]) {
                    if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
                        translate(sheet.styleSheet.rawCssText, href, media);
                        parsedSheets[href] = true
                    } else {
                        if (!/^([a-zA-Z:]*\/\/)/.test(href) && !base || href.replace(RegExp.$1, "").split("/")[0] === w.location.host) {
                            if (href.substring(0, 2) === "//") {
                                href = w.location.protocol + href
                            }
                            requestQueue.push({
                                href: href,
                                media: media
                            })
                        }
                    }
                }
            }
            makeRequests()
        };
    ripCSS();
    respond.update = ripCSS;
    respond.getEmValue = getEmValue;

    function callMedia() {
        applyMedia(true)
    }
    if (w.addEventListener) {
        w.addEventListener("resize", callMedia, false)
    } else {
        if (w.attachEvent) {
            w.attachEvent("onresize", callMedia)
        }
    }
})(this);
(function() {
    var e, t = window.Messenger;
    e = window.Messenger = function() {
        return e._call.apply(this, arguments)
    }, window.Messenger.noConflict = function() {
        return window.Messenger = t, e
    }
})(), window.Messenger._ = function() {
        if (window._) {
            return window._
        }
        var e = Array.prototype,
            t = Object.prototype,
            n = Function.prototype,
            s = (e.push, e.slice),
            r = (e.concat, t.toString);
        t.hasOwnProperty;
        var o = e.forEach,
            i = (e.map, e.reduce, e.reduceRight, e.filter),
            a = (e.every, e.some, e.indexOf, e.lastIndexOf, Array.isArray, Object.keys),
            l = n.bind,
            u = {},
            c = {},
            h = u.each = u.forEach = function(e, t, n) {
                if (null != e) {
                    if (o && e.forEach === o) {
                        e.forEach(t, n)
                    } else {
                        if (e.length === +e.length) {
                            for (var s = 0, r = e.length; r > s; s++) {
                                if (t.call(n, e[s], s, e) === c) {
                                    return
                                }
                            }
                        } else {
                            for (var i in e) {
                                if (u.has(e, i) && t.call(n, e[i], i, e) === c) {
                                    return
                                }
                            }
                        }
                    }
                }
            };
        u.result = function(e, t) {
            if (null == e) {
                return null
            }
            var n = e[t];
            return u.isFunction(n) ? n.call(e) : n
        }, u.once = function(e) {
            var t, n = !1;
            return function() {
                return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
            }
        };
        var p = 0;
        return u.uniqueId = function(e) {
            var t = ++p + "";
            return e ? e + t : t
        }, u.filter = u.select = function(e, t, n) {
            var s = [];
            return null == e ? s : i && e.filter === i ? e.filter(t, n) : (h(e, function(e, r, o) {
                t.call(n, e, r, o) && (s[s.length] = e)
            }), s)
        }, h(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
            u["is" + e] = function(t) {
                return r.call(t) == "[object " + e + "]"
            }
        }), u.defaults = function(e) {
            return h(s.call(arguments, 1), function(t) {
                if (t) {
                    for (var n in t) {
                        null == e[n] && (e[n] = t[n])
                    }
                }
            }), e
        }, u.extend = function(e) {
            return h(s.call(arguments, 1), function(t) {
                if (t) {
                    for (var n in t) {
                        e[n] = t[n]
                    }
                }
            }), e
        }, u.keys = a || function(e) {
            if (e !== Object(e)) {
                throw new TypeError("Invalid object")
            }
            var t = [];
            for (var n in e) {
                u.has(e, n) && (t[t.length] = n)
            }
            return t
        }, u.bind = function(e, t) {
            if (e.bind === l && l) {
                return l.apply(e, s.call(arguments, 1))
            }
            var n = s.call(arguments, 2);
            return function() {
                return e.apply(t, n.concat(s.call(arguments)))
            }
        }, u.isObject = function(e) {
            return e === Object(e)
        }, u
    }(), window.Messenger.Events = function() {
        if (window.Backbone && Backbone.Events) {
            return Backbone.Events
        }
        var e = function() {
            var e = /\s+/,
                t = function(t, n, s, r) {
                    if (!s) {
                        return !0
                    }
                    if ("object" == typeof s) {
                        for (var o in s) {
                            t[n].apply(t, [o, s[o]].concat(r))
                        }
                    } else {
                        if (!e.test(s)) {
                            return !0
                        }
                        for (var i = s.split(e), a = 0, l = i.length; l > a; a++) {
                            t[n].apply(t, [i[a]].concat(r))
                        }
                    }
                },
                n = function(e, t) {
                    var n, s = -1,
                        r = e.length;
                    switch (t.length) {
                        case 0:
                            for (; r > ++s;) {
                                (n = e[s]).callback.call(n.ctx)
                            }
                            return;
                        case 1:
                            for (; r > ++s;) {
                                (n = e[s]).callback.call(n.ctx, t[0])
                            }
                            return;
                        case 2:
                            for (; r > ++s;) {
                                (n = e[s]).callback.call(n.ctx, t[0], t[1])
                            }
                            return;
                        case 3:
                            for (; r > ++s;) {
                                (n = e[s]).callback.call(n.ctx, t[0], t[1], t[2])
                            }
                            return;
                        default:
                            for (; r > ++s;) {
                                (n = e[s]).callback.apply(n.ctx, t)
                            }
                    }
                },
                s = {
                    on: function(e, n, s) {
                        if (!t(this, "on", e, [n, s]) || !n) {
                            return this
                        }
                        this._events || (this._events = {});
                        var r = this._events[e] || (this._events[e] = []);
                        return r.push({
                            callback: n,
                            context: s,
                            ctx: s || this
                        }), this
                    },
                    once: function(e, n, s) {
                        if (!t(this, "once", e, [n, s]) || !n) {
                            return this
                        }
                        var r = this,
                            o = _.once(function() {
                                r.off(e, o), n.apply(this, arguments)
                            });
                        return o._callback = n, this.on(e, o, s), this
                    },
                    off: function(e, n, s) {
                        var r, o, i, a, l, u, c, h;
                        if (!this._events || !t(this, "off", e, [n, s])) {
                            return this
                        }
                        if (!e && !n && !s) {
                            return this._events = {}, this
                        }
                        for (a = e ? [e] : _.keys(this._events), l = 0, u = a.length; u > l; l++) {
                            if (e = a[l], r = this._events[e]) {
                                if (i = [], n || s) {
                                    for (c = 0, h = r.length; h > c; c++) {
                                        o = r[c], (n && n !== o.callback && n !== o.callback._callback || s && s !== o.context) && i.push(o)
                                    }
                                }
                                this._events[e] = i
                            }
                        }
                        return this
                    },
                    trigger: function(e) {
                        if (!this._events) {
                            return this
                        }
                        var s = Array.prototype.slice.call(arguments, 1);
                        if (!t(this, "trigger", e, s)) {
                            return this
                        }
                        var r = this._events[e],
                            o = this._events.all;
                        return r && n(r, s), o && n(o, arguments), this
                    },
                    listenTo: function(e, t, n) {
                        var s = this._listeners || (this._listeners = {}),
                            r = e._listenerId || (e._listenerId = _.uniqueId("l"));
                        return s[r] = e, e.on(t, "object" == typeof t ? this : n, this), this
                    },
                    stopListening: function(e, t, n) {
                        var s = this._listeners;
                        if (s) {
                            if (e) {
                                e.off(t, "object" == typeof t ? this : n, this), t || n || delete s[e._listenerId]
                            } else {
                                "object" == typeof t && (n = this);
                                for (var r in s) {
                                    s[r].off(t, n, this)
                                }
                                this._listeners = {}
                            }
                            return this
                        }
                    }
                };
            return s.bind = s.on, s.unbind = s.off, s
        };
        return e()
    }(),
    function() {
        var e, t, n, s, r, o, i, a, l, u, c, h = {}.hasOwnProperty,
            p = function(e, t) {
                function n() {
                    this.constructor = e
                }
                for (var s in t) {
                    h.call(t, s) && (e[s] = t[s])
                }
                return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
            },
            d = [].slice,
            f = [].indexOf || function(e) {
                for (var t = 0, n = this.length; n > t; t++) {
                    if (t in this && this[t] === e) {
                        return t
                    }
                }
                return -1
            };
        e = jQuery, o = null != (l = window._) ? l : window.Messenger._, s = null != (u = "undefined" != typeof Backbone && null !== Backbone ? Backbone.Events : void 0) ? u : window.Messenger.Events, n = function() {
            function t(t) {
                e.extend(this, s), o.isObject(t) && (t.el && this.setElement(t.el), this.model = t.model), this.initialize.apply(this, arguments)
            }
            return t.prototype.setElement = function(t) {
                return this.$el = e(t), this.el = this.$el[0]
            }, t.prototype.delegateEvents = function(e) {
                var t, n, s, r, i, a, l;
                if (e || (e = o.result(this, "events"))) {
                    this.undelegateEvents(), t = /^(\S+)\s*(.*)$/, l = [];
                    for (s in e) {
                        if (i = e[s], o.isFunction(i) || (i = this[e[s]]), !i) {
                            throw Error('Method "' + e[s] + '" does not exist')
                        }
                        r = s.match(t), n = r[1], a = r[2], i = o.bind(i, this), n += ".delegateEvents" + this.cid, "" === a ? l.push(this.jqon(n, i)) : l.push(this.jqon(n, a, i))
                    }
                    return l
                }
            }, t.prototype.jqon = function(e, t, n) {
                var s;
                return null != this.$el.on ? (s = this.$el).on.apply(s, arguments) : (null == n && (n = t, t = void 0), null != t ? this.$el.delegate(t, e, n) : this.$el.bind(e, n))
            }, t.prototype.jqoff = function(e) {
                var t;
                return null != this.$el.off ? (t = this.$el).off.apply(t, arguments) : (this.$el.undelegate(), this.$el.unbind(e))
            }, t.prototype.undelegateEvents = function() {
                return this.jqoff(".delegateEvents" + this.cid)
            }, t.prototype.remove = function() {
                return this.undelegateEvents(), this.$el.remove()
            }, t
        }(), i = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments)
            }
            return p(n, t), n.prototype.defaults = {
                hideAfter: 10,
                scroll: !0,
                closeButtonText: "&times;"
            }, n.prototype.initialize = function(t) {
                return null == t && (t = {}), this.shown = !1, this.rendered = !1, this.messenger = t.messenger, this.options = e.extend({}, this.options, t, this.defaults)
            }, n.prototype.show = function() {
                var e;
                return this.rendered || this.render(), this.$message.removeClass("messenger-hidden"), e = this.shown, this.shown = !0, e ? void 0 : this.trigger("show")
            }, n.prototype.hide = function() {
                var e;
                if (this.rendered) {
                    return this.$message.addClass("messenger-hidden"), e = this.shown, this.shown = !1, e ? this.trigger("hide") : void 0
                }
            }, n.prototype.cancel = function() {
                return this.hide()
            }, n.prototype.update = function(t) {
                var n, s = this;
                return o.isString(t) && (t = {
                    message: t
                }), e.extend(this.options, t), this.lastUpdate = new Date, this.rendered = !1, this.events = null != (n = this.options.events) ? n : {}, this.render(), this.actionsToEvents(), this.delegateEvents(), this.checkClickable(), this.options.hideAfter ? (this.$message.addClass("messenger-will-hide-after"), null != this._hideTimeout && clearTimeout(this._hideTimeout), this._hideTimeout = setTimeout(function() {
                    return s.hide()
                }, 1000 * this.options.hideAfter)) : this.$message.removeClass("messenger-will-hide-after"), this.options.hideOnNavigate ? (this.$message.addClass("messenger-will-hide-on-navigate"), null != ("undefined" != typeof Backbone && null !== Backbone ? Backbone.history : void 0) && Backbone.history.on("route", function() {
                    return s.hide()
                })) : this.$message.removeClass("messenger-will-hide-on-navigate"), this.trigger("update", this)
            }, n.prototype.scrollTo = function() {
                return this.options.scroll ? e.scrollTo(this.$el, {
                    duration: 400,
                    offset: {
                        left: 0,
                        top: -20
                    }
                }) : void 0
            }, n.prototype.timeSinceUpdate = function() {
                return this.lastUpdate ? new Date - this.lastUpdate : null
            }, n.prototype.actionsToEvents = function() {
                var e, t, n, s, r = this;
                n = this.options.actions, s = [];
                for (t in n) {
                    e = n[t], s.push(this.events['click [data-action="' + t + '"] a'] = function(e) {
                        return function(n) {
                            return n.preventDefault(), n.stopPropagation(), r.trigger("action:" + t, e, n), e.action.call(r, n, r)
                        }
                    }(e))
                }
                return s
            }, n.prototype.checkClickable = function() {
                var e, t, n, s;
                n = this.events, s = [];
                for (t in n) {
                    e = n[t], "click" === t ? s.push(this.$message.addClass("messenger-clickable")) : s.push(void 0)
                }
                return s
            }, n.prototype.undelegateEvents = function() {
                var e;
                return n.__super__.undelegateEvents.apply(this, arguments), null != (e = this.$message) ? e.removeClass("messenger-clickable") : void 0
            }, n.prototype.parseActions = function() {
                var t, n, s, r, o, i;
                n = [], o = this.options.actions;
                for (r in o) {
                    t = o[r], s = e.extend({}, t), s.name = r, null == (i = s.label) && (s.label = r), n.push(s)
                }
                return n
            }, n.prototype.template = function(t) {
                var n, s, r, o, i, a, l, u, c, h, p = this;
                for (i = e("<div class='messenger-message message alert " + t.type + " message-" + t.type + " alert-" + t.type + "'>"), t.showCloseButton && (r = e('<button type="button" class="messenger-close" data-dismiss="alert">'), r.html(t.closeButtonText), r.click(function() {
                        return p.cancel(), !0
                    }), i.append(r)), a = e('<div class="messenger-message-inner">' + t.message + "</div>"), i.append(a), t.actions.length && (s = e('<div class="messenger-actions">')), h = t.actions, u = 0, c = h.length; c > u; u++) {
                    l = h[u], n = e("<span>"), n.attr("data-action", "" + l.name), o = e("<a>"), o.html(l.label), n.append(e('<span class="messenger-phrase">')), n.append(o), s.append(n)
                }
                return i.append(s), i
            }, n.prototype.render = function() {
                var t;
                if (!this.rendered) {
                    return this._hasSlot || (this.setElement(this.messenger._reserveMessageSlot(this)), this._hasSlot = !0), t = e.extend({}, this.options, {
                        actions: this.parseActions()
                    }), this.$message = e(this.template(t)), this.$el.html(this.$message), this.shown = !0, this.rendered = !0, this.trigger("render")
                }
            }, n
        }(n), r = function(e) {
            function t() {
                return t.__super__.constructor.apply(this, arguments)
            }
            return p(t, e), t.prototype.initialize = function() {
                return t.__super__.initialize.apply(this, arguments), this._timers = {}
            }, t.prototype.cancel = function() {
                return this.clearTimers(), this.hide(), null != this._actionInstance && null != this._actionInstance.abort ? this._actionInstance.abort() : void 0
            }, t.prototype.clearTimers = function() {
                var e, t, n, s;
                n = this._timers;
                for (e in n) {
                    t = n[e], clearTimeout(t)
                }
                return this._timers = {}, null != (s = this.$message) ? s.removeClass("messenger-retry-soon messenger-retry-later") : void 0
            }, t.prototype.render = function() {
                var e, n, s, r;
                t.__super__.render.apply(this, arguments), this.clearTimers(), s = this.options.actions, r = [];
                for (n in s) {
                    e = s[n], e.auto ? r.push(this.startCountdown(n, e)) : r.push(void 0)
                }
                return r
            }, t.prototype.renderPhrase = function(e, t) {
                var n;
                return n = e.phrase.replace("TIME", this.formatTime(t))
            }, t.prototype.formatTime = function(e) {
                var t;
                return t = function(e, t) {
                    return e = Math.floor(e), 1 !== e && (t += "s"), "in " + e + " " + t
                }, 0 === Math.floor(e) ? "now..." : 60 > e ? t(e, "second") : (e /= 60, 60 > e ? t(e, "minute") : (e /= 60, t(e, "hour")))
            }, t.prototype.startCountdown = function(e, t) {
                var n, s, r, o, i = this;
                if (null == this._timers[e]) {
                    return n = this.$message.find("[data-action='" + e + "'] .messenger-phrase"), s = null != (o = t.delay) ? o : 3, 10 >= s ? (this.$message.removeClass("messenger-retry-later"), this.$message.addClass("messenger-retry-soon")) : (this.$message.removeClass("messenger-retry-soon"), this.$message.addClass("messenger-retry-later")), r = function() {
                        var o;
                        return n.text(i.renderPhrase(t, s)), s > 0 ? (o = Math.min(s, 1), s -= o, i._timers[e] = setTimeout(r, 1000 * o)) : (i.$message.removeClass("messenger-retry-soon messenger-retry-later"), delete i._timers[e], t.action())
                    }, r()
                }
            }, t
        }(i), a = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments)
            }
            return p(n, t), n.prototype.tagName = "ul", n.prototype.className = "messenger", n.prototype.messageDefaults = {
                type: "info"
            }, n.prototype.initialize = function(t) {
                return this.options = null != t ? t : {}, this.history = [], this.messageDefaults = e.extend({}, this.messageDefaults, this.options.messageDefaults)
            }, n.prototype.render = function() {
                return this.updateMessageSlotClasses()
            }, n.prototype.findById = function(e) {
                return o.filter(this.history, function(t) {
                    return t.msg.options.id === e
                })
            }, n.prototype._reserveMessageSlot = function(t) {
                var n, s, r = this;
                for (n = e("<li>"), n.addClass("messenger-message-slot"), this.$el.prepend(n), this.history.push({
                        msg: t,
                        $slot: n
                    }), this._enforceIdConstraint(t), t.on("update", function() {
                        return r._enforceIdConstraint(t)
                    }); this.options.maxMessages && this.history.length > this.options.maxMessages;) {
                    s = this.history.shift(), s.msg.remove(), s.$slot.remove()
                }
                return n
            }, n.prototype._enforceIdConstraint = function(e) {
                var t, n, s, r, o;
                if (null != e.options.id) {
                    for (o = this.history, n = 0, s = o.length; s > n; n++) {
                        if (t = o[n], r = t.msg, null != r.options.id && r.options.id === e.options.id && e !== r) {
                            if (e.options.singleton) {
                                return e.hide(), void 0
                            }
                            r.hide()
                        }
                    }
                }
            }, n.prototype.newMessage = function(e) {
                var t, n, s, o, a = this;
                return null == e && (e = {}), e.messenger = this, i = null != (n = null != (s = Messenger.themes[null != (o = e.theme) ? o : this.options.theme]) ? s.Message : void 0) ? n : r, t = new i(e), t.on("show", function() {
                    return e.scrollTo && "fixed" !== a.$el.css("position") ? t.scrollTo() : void 0
                }), t.on("hide show render", this.updateMessageSlotClasses, this), t
            }, n.prototype.updateMessageSlotClasses = function() {
                var e, t, n, s, r, o, i;
                for (s = !0, t = null, e = !1, i = this.history, r = 0, o = i.length; o > r; r++) {
                    n = i[r], n.$slot.removeClass("messenger-first messenger-last messenger-shown"), n.msg.shown && n.msg.rendered && (n.$slot.addClass("messenger-shown"), e = !0, t = n, s && (s = !1, n.$slot.addClass("messenger-first")))
                }
                return null != t && t.$slot.addClass("messenger-last"), this.$el["" + (e ? "remove" : "add") + "Class"]("messenger-empty")
            }, n.prototype.hideAll = function() {
                var e, t, n, s, r;
                for (s = this.history, r = [], t = 0, n = s.length; n > t; t++) {
                    e = s[t], r.push(e.msg.hide())
                }
                return r
            }, n.prototype.post = function(t) {
                var n;
                return o.isString(t) && (t = {
                    message: t
                }), t = e.extend(!0, {}, this.messageDefaults, t), n = this.newMessage(t), n.update(t), n
            }, n
        }(n), t = function(t) {
            function n() {
                return n.__super__.constructor.apply(this, arguments)
            }
            return p(n, t), n.prototype.doDefaults = {
                progressMessage: null,
                successMessage: null,
                errorMessage: "Error connecting to the server.",
                showSuccessWithoutError: !0,
                retry: {
                    auto: !0,
                    allow: !0
                },
                action: e.ajax
            }, n.prototype.hookBackboneAjax = function(t) {
                var n, s = this;
                if (null == t && (t = {}), null == window.Backbone) {
                    throw "Expected Backbone to be defined"
                }
                return t = o.defaults(t, {
                    id: "BACKBONE_ACTION",
                    errorMessage: !1,
                    successMessage: "Request completed successfully.",
                    showSuccessWithoutError: !1
                }), n = function(e) {
                    var n;
                    return n = o.extend({}, t, e.messenger), s["do"](n, e)
                }, null != Backbone.ajax ? (Backbone.ajax._withoutMessenger && (Backbone.ajax = Backbone.ajax._withoutMessenger), (null == t.action || t.action === this.doDefaults.action) && (t.action = Backbone.ajax), n._withoutMessenger = Backbone.ajax, Backbone.ajax = n) : Backbone.sync = o.wrap(Backbone.sync, function() {
                    var t, s, r;
                    return r = arguments[0], t = arguments.length >= 2 ? d.call(arguments, 1) : [], s = e.ajax, e.ajax = n, r.call.apply(r, [this].concat(d.call(t))), e.ajax = s
                })
            }, n.prototype._getHandlerResponse = function(e) {
                return e === !1 ? !1 : e === !0 || null == e ? !0 : e
            }, n.prototype._parseEvents = function(e) {
                var t, n, s, r, o, i, a;
                null == e && (e = {}), o = {};
                for (r in e) {
                    s = e[r], n = r.indexOf(" "), i = r.substring(0, n), t = r.substring(n + 1), null == (a = o[i]) && (o[i] = {}), o[i][t] = s
                }
                return o
            }, n.prototype._normalizeResponse = function() {
                var e, t, n, s, r, i, a;
                for (n = arguments.length >= 1 ? d.call(arguments, 0) : [], s = null, r = null, e = null, i = 0, a = n.length; a > i; i++) {
                    t = n[i], "success" === t || "timeout" === t || "abort" === t ? s = t : null != (null != t ? t.readyState : void 0) && null != (null != t ? t.responseText : void 0) ? r = t : o.isObject(t) && (e = t)
                }
                return [s, e, r]
            }, n.prototype.run = function() {
                var t, n, s, r, i, a, l, u, c, h, p, g = this;
                if (a = arguments[0], c = arguments[1], t = arguments.length >= 3 ? d.call(arguments, 2) : [], null == c && (c = {}), a = e.extend(!0, {}, this.messageDefaults, this.doDefaults, null != a ? a : {}), n = this._parseEvents(a.events), s = function(e, t) {
                        var n;
                        return n = a[e + "Message"], o.isFunction(n) ? n.call(g, e, t) : n
                    }, l = null != (p = a.messageInstance) ? p : this.newMessage(a), null != a.id && (l.options.id = a.id), null != a.progressMessage && l.update(e.extend({}, a, {
                        message: s("progress", null),
                        type: "info"
                    })), i = {}, o.each(["error", "success"], function(r) {
                        var u;
                        return u = c[r], i[r] = function() {
                            var i, h, p, m, y, v, _, w, b, x, M, C, k, $, E;
                            return v = arguments.length >= 1 ? d.call(arguments, 0) : [], b = g._normalizeResponse.apply(g, v), y = b[0], i = b[1], w = b[2], "success" === r && null == l.errorCount && a.showSuccessWithoutError === !1 && (a.successMessage = null), "error" === r && (null == (x = a.errorCount) && (a.errorCount = 0), a.errorCount += 1), p = a.returnsPromise ? v[0] : "function" == typeof u ? u.apply(null, v) : void 0, _ = g._getHandlerResponse(p), o.isString(_) && (_ = {
                                message: _
                            }), "error" !== r || 0 !== (null != w ? w.status : void 0) && "abort" !== y ? "error" === r && null != a.ignoredErrorCodes && (M = null != w ? w.status : void 0, f.call(a.ignoredErrorCodes, M) >= 0) ? (l.hide(), void 0) : (h = {
                                message: s(r, w),
                                type: r,
                                events: null != (C = n[r]) ? C : {},
                                hideOnNavigate: "success" === r
                            }, m = e.extend({}, a, h, _), "number" == typeof(null != (k = m.retry) ? k.allow : void 0) && m.retry.allow--, "error" === r && (null != w ? w.status : void 0) >= 500 && (null != ($ = m.retry) ? $.allow : void 0) ? (null == m.retry.delay && (m.retry.delay = 4 > m.errorCount ? 10 : 300), m.hideAfter && (null == (E = m._hideAfter) && (m._hideAfter = m.hideAfter), m.hideAfter = m._hideAfter + m.retry.delay), m._retryActions = !0, m.actions = {
                                retry: {
                                    label: "retry now",
                                    phrase: "Retrying TIME",
                                    auto: m.retry.auto,
                                    delay: m.retry.delay,
                                    action: function() {
                                        return m.messageInstance = l, setTimeout(function() {
                                            return g["do"].apply(g, [m, c].concat(d.call(t)))
                                        }, 0)
                                    }
                                },
                                cancel: {
                                    action: function() {
                                        return l.cancel()
                                    }
                                }
                            }) : m._retryActions && (delete m.actions.retry, delete m.actions.cancel, delete a._retryActions), l.update(m), _ && m.message ? (Messenger(o.extend({}, g.options, {
                                instance: g
                            })), l.show()) : l.hide()) : (l.hide(), void 0)
                        }
                    }), !a.returnsPromise) {
                    for (h in i) {
                        r = i[h], u = c[h], c[h] = r
                    }
                }
                return l._actionInstance = a.action.apply(a, [c].concat(d.call(t))), a.returnsPromise && l._actionInstance.then(i.success, i.error), l
            }, n.prototype["do"] = n.prototype.run, n.prototype.ajax = function() {
                var t, n;
                return n = arguments[0], t = arguments.length >= 2 ? d.call(arguments, 1) : [], n.action = e.ajax, this.run.apply(this, [n].concat(d.call(t)))
            }, n.prototype.expectPromise = function(e, t) {
                return t = o.extend({}, t, {
                    action: e,
                    returnsPromise: !0
                }), this.run(t)
            }, n.prototype.error = function(e) {
                return null == e && (e = {}), "string" == typeof e && (e = {
                    message: e
                }), e.type = "error", this.post(e)
            }, n.prototype.info = function(e) {
                return null == e && (e = {}), "string" == typeof e && (e = {
                    message: e
                }), e.type = "info", this.post(e)
            }, n.prototype.success = function(e) {
                return null == e && (e = {}), "string" == typeof e && (e = {
                    message: e
                }), e.type = "success", this.post(e)
            }, n
        }(a), e.fn.messenger = function() {
            var n, s, r, i, l, u, c, h;
            return r = arguments[0], s = arguments.length >= 2 ? d.call(arguments, 1) : [], null == r && (r = {}), n = this, null != r && o.isString(r) ? (h = n.data("messenger"))[r].apply(h, s) : (l = r, null == n.data("messenger") && (a = null != (u = null != (c = Messenger.themes[l.theme]) ? c.Messenger : void 0) ? u : t, n.data("messenger", i = new a(e.extend({
                el: n
            }, l))), i.render()), n.data("messenger"))
        }, window.Messenger._call = function(t) {
            var n, s, r, o, i, a, l, u, c, h, p;
            if (a = {
                    extraClasses: "messenger-fixed messenger-on-bottom messenger-on-right",
                    theme: "future",
                    maxMessages: 9,
                    parentLocations: ["body"]
                }, t = e.extend(a, e._messengerDefaults, Messenger.options, t), null != t.theme && (t.extraClasses += " messenger-theme-" + t.theme), l = t.instance || Messenger.instance, null == t.instance) {
                for (c = t.parentLocations, s = null, r = null, h = 0, p = c.length; p > h; h++) {
                    if (u = c[h], s = e(u), s.length) {
                        o = u;
                        break
                    }
                }
                l ? e(l._location).is(e(o)) || (l.$el.detach(), s.prepend(l.$el)) : (n = e("<ul>"), s.prepend(n), l = n.messenger(t), l._location = o, Messenger.instance = l)
            }
            return null != l._addedClasses && l.$el.removeClass(l._addedClasses), l.$el.addClass(i = "" + l.className + " " + t.extraClasses), l._addedClasses = i, l
        }, e.extend(Messenger, {
            Message: r,
            Messenger: t,
            themes: null != (c = Messenger.themes) ? c : {}
        }), e.globalMessenger = window.Messenger = Messenger
    }.call(this);
Messenger.options = {
    extraClasses: "messenger-fixed messenger-on-bottom messenger-on-right",
    theme: "flat"
};