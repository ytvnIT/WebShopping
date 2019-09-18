/************************************************************************************
 * jquery.themepunch.essential.js - jQuery Plugin for esg Portfolio Slider
 * @version: 2.1.0 (19.08.2015)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
 ************************************************************************************/
//! ++++++++++++++++++++++++++++++++++++++
! function(jQuery, undefined) {
    function createCookie(e, t, a) {
        var o;
        if (a) {
            var i = new Date;
            i.setTime(i.getTime() + 24 * a * 60 * 60 * 1e3), o = "; expires=" + i.toGMTString()
        } else o = "";
        document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + o + "; path=/"
    }

    function readCookie(e) {
        for (var t = encodeURIComponent(e) + "=", a = document.cookie.split(";"), o = 0; o < a.length; o++) {
            for (var i = a[o];
                " " === i.charAt(0);) i = i.substring(1, i.length);
            if (0 === i.indexOf(t)) return decodeURIComponent(i.substring(t.length, i.length))
        }
        return null
    }

    function eraseCookie(e) {
        createCookie(e, "", -1)
    }

    function checkAvailableFilters() {}

    function checkMoreToLoad(e, t) {
        var a = new Array;
        fidlist = new Array, searchchanged = jQuery(t.filterGroupClass + ".esg-filter-wrapper.eg-search-wrapper .eg-justfilteredtosearch").length, forcesearch = jQuery(t.filterGroupClass + ".esg-filter-wrapper.eg-search-wrapper .eg-forcefilter").length, jQuery(t.filterGroupClass + ".esg-filter-wrapper .esg-filterbutton.selected, " + t.filterGroupClass + " .esg-filter-wrapper .esg-filterbutton.selected").each(function() {
            var e = jQuery(this).data("fid"); - 1 == jQuery.inArray(e, fidlist) && (a.push(e), fidlist.push(e))
        }), 0 == jQuery(t.filterGroupClass + ".esg-filter-wrapper .esg-filterbutton.selected, " + t.filterGroupClass + " .esg-filter-wrapper .esg-filterbutton.selected").length && a.push(-1);
        for (var o = new Array, i = 0; i < t.loadMoreItems.length; i++) jQuery.each(t.loadMoreItems[i][1], function(e, r) {
            jQuery.each(a, function(e, a) {
                a == r && -1 != t.loadMoreItems[i][0] && (0 == forcesearch || 1 == forcesearch && "cat-searchresult" === t.loadMoreItems[i][2]) && o.push(t.loadMoreItems[i])
            })
        });
        return addCountSuffix(e, t), o
    }

    function addCountSuffix(e, t) {
        var a = jQuery(t.filterGroupClass + ".esg-filter-wrapper.eg-search-wrapper .eg-justfilteredtosearch").length,
            o = jQuery(t.filterGroupClass + ".esg-filter-wrapper.eg-search-wrapper .eg-forcefilter").length;
        jQuery(t.filterGroupClass + ".esg-filter-wrapper.eg-show-amount .esg-filterbutton").each(function() {
            var i = jQuery(this);
            if (0 == i.find(".eg-el-amount").length || a > 0) {
                var r = i.data("fid"),
                    n = i.data("filter");
                o > 0 && (n += ".cat-searchresult");
                for (var s = e.find("." + n).length, l = 0; l < t.loadMoreItems.length; l++) {
                    0 == o ? jQuery.each(t.loadMoreItems[l][1], function(e, a) {
                        a === r && -1 != t.loadMoreItems[l][0] && s++
                    }) : -1 != jQuery.inArray(r, t.loadMoreItems[l][1]) && "cat-searchresult" === t.loadMoreItems[l][2] && s++
                }
                0 == i.find(".eg-el-amount").length && i.append('<span class="eg-el-amount">0</span>'), countToTop(i, s)
            }
        }), jQuery(t.filterGroupClass + ".esg-filter-wrapper.eg-search-wrapper .eg-justfilteredtosearch").removeClass("eg-justfilteredtosearch")
    }

    function countToTop(e, t) {
        function a(e, t) {
            o.html(Math.round(e.target[t]))
        }
        var o = e.find(".eg-el-amount"),
            i = {
                value: parseInt(o.text(), 0)
            };
        punchgs.TweenLite.to(i, 2, {
            value: t,
            onUpdate: a,
            onUpdateParams: ["{self}", "value"],
            ease: punchgs.Power3.easeInOut
        })
    }

    function buildLoader(e, t, a) {
        return e.find(".esg-loader").length > 0 ? !1 : (e.append('<div class="esg-loader ' + t.spinner + '"><div class="dot1"></div><div class="dot2"></div><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'), ("spinner1" == t.spinner || "spinner2" == t.spinner) && e.find(".esg-loader").css({
            backgroundColor: t.spinnerColor
        }), ("spinner3" == t.spinner || "spinner4" == t.spinner) && e.find(".bounce1, .bounce2, .bounce3, .dot1, .dot2").css({
            backgroundColor: t.spinnerColor
        }), void(a || punchgs.TweenLite.to(e, .3, {
            minHeight: "100px",
            zIndex: 0
        })))
    }

    function setKeyToNull(e, t) {
        jQuery.each(e.loadMoreItems, function(a, o) {
            o[0] == t && (e.loadMoreItems[a][0] = -1, e.loadMoreItems[a][2] = "already loaded")
        })
    }

    function loadMoreEmpty(e) {
        for (var t = !0, a = 0; a < e.loadMoreItems.length; a++) - 1 != e.loadMoreItems[a][0] && (t = !1);
        return t
    }

    function loadMoreItems(e, t) {
        var a = checkMoreToLoad(e, t),
            o = new Array;
        jQuery.each(a, function(e, a) {
            o.length < t.loadMoreAmount && (o.push(a[0]), setKeyToNull(t, a[0]))
        });
        var i = checkMoreToLoad(e, t).length;
        if (o.length > 0) {
            var r = e.find(".esg-loadmore");
            r.length > 0 && (punchgs.TweenLite.to(r, .4, {
                autoAlpha: .2
            }), r.data("loading", 1));
            var n = {
                action: t.loadMoreAjaxAction,
                client_action: "load_more_items",
                token: t.loadMoreAjaxToken,
                data: o,
                gridid: t.gridID
            };
            jQuery.ajax({
                type: "post",
                url: t.loadMoreAjaxUrl,
                dataType: "json",
                data: n
            }).success(function(a) {
                if (a.success) {
                    var o = jQuery(a.data);
                    jQuery(t.filterGroupClass + ".esg-filter-wrapper.eg-search-wrapper .eg-forcefilter").length > 0 && o.addClass("cat-searchresult"), e.find("ul").first().append(o), checkAvailableFilters(e, t), prepareItemsInGrid(t, !0), setItemsOnPages(t), setTimeout(function() {
                        if (t.animDelay = "off", organiseGrid(t), prepareSortingAndOrders(e), loadMoreEmpty(t)) e.find(".esg-loadmore").remove();
                        else {
                            var a = e.find(".esg-loadmore"),
                                o = t.loadMoreTxt + " (" + i + ")";
                            "off" == t.loadMoreNr && (o = t.loadMoreTxt), a.html(0 == i ? t.loadMoreEndTxt : o), a.length > 0 && (punchgs.TweenLite.to(a, .4, {
                                autoAlpha: 1,
                                overwrite: "all"
                            }), a.data("loading", 0))
                        }
                        setTimeout(function() {
                            t.animDelay = "on"
                        }, 500)
                    }, 10)
                }
            }).error(function(t, a) {
                e.find(".esg-loadmore").html("FAILURE: " + a)
            })
        } else loadMoreEmpty(t) ? e.find(".esg-loadmore").remove() : e.find(".esg-loadmore").html(t.loadMoreEndTxt)
    }

    function killOldCustomAjaxContent(e) {
        var t = e.data("lastposttype"),
            a = e.data("oldajaxsource"),
            o = e.data("oldajaxtype"),
            i = e.data("oldajaxvideoaspect"),
            r = e.data("oldselector");
        if (t != undefined && "" != t) try {
            jQuery.each(jQuery.fn.tpessential.defaults.ajaxTypes, function(n, s) {
                s != undefined && s.type != undefined && s.type == t && s.killfunc != undefined && setTimeout(function() {
                    s.killfunc.call(this, {
                        id: a,
                        type: o,
                        aspectratio: i,
                        selector: r
                    }) && e.empty()
                }, 250)
            })
        } catch (n) {
            console.log(n)
        }
        e.data("lastposttype", "")
    }

    function addAjaxNavigagtion(e, t) {
        function a(e) {
            var t = new Array;
            return jQuery.each(e, function(e, a) {
                jQuery(a).closest(".itemtoshow.isvisiblenow").length > 0 && t.push(a)
            }), t
        }
        var o = " eg-acp-" + e.ajaxClosePosition;
        o = o + " eg-acp-" + e.ajaxCloseStyle, o = o + " eg-acp-" + e.ajaxCloseType, loc = "eg-icon-left-open-1", roc = "eg-icon-right-open-1", xoc = '<i class="eg-icon-cancel"></i>', "type1" == e.ajaxCloseType && (loc = "eg-icon-left-open-big", roc = "eg-icon-right-open-big", e.ajaxCloseTxt = "", xoc = "X"), ("true" == e.ajaxCloseInner || 1 == e.ajaxCloseInner) && (o += " eg-acp-inner");
        var i = '<div class="eg-ajax-closer-wrapper' + o + '">';
        switch ("tr" == e.ajaxClosePosition || "br" == e.ajaxClosePosition ? ("on" == e.ajaxNavButton && (i = i + '<div class="eg-ajax-left eg-ajax-navbt"><i class="' + loc + '"></i></div><div class="eg-ajax-right eg-ajax-navbt"><i class="' + roc + '"></i></div>'), "on" == e.ajaxCloseButton && (i = i + '<div class="eg-ajax-closer eg-ajax-navbt">' + xoc + e.ajaxCloseTxt + "</div>")) : ("on" == e.ajaxCloseButton && (i = i + '<div class="eg-ajax-closer eg-ajax-navbt">' + xoc + e.ajaxCloseTxt + "</div>"), "on" == e.ajaxNavButton && (i = i + '<div class="eg-ajax-left eg-ajax-navbt"><i class="' + loc + '"></i></div><div class="eg-ajax-right eg-ajax-navbt"><i class="' + roc + '"></i></div>')), i += "</div>", e.ajaxClosePosition) {
            case "tl":
            case "tr":
            case "t":
                t.prepend(i);
                break;
            case "bl":
            case "br":
            case "b":
                t.append(i)
        }
        t.find(".eg-ajax-closer").click(function() {
            showHideAjaxContainer(t, !1, null, null, .25, !0)
        }), t.find(".eg-ajax-right").click(function() {
            var e = t.data("container").find(".lastclickedajax").closest("li"),
                o = e.nextAll().find(".eg-ajax-a-button"),
                i = e.prevAll().find(".eg-ajax-a-button");
            o = a(o), i = a(i), o.length > 0 ? o[0].click() : i[0].click()
        }), t.find(".eg-ajax-left").click(function() {
            var e = t.data("container").find(".lastclickedajax").closest("li"),
                o = e.nextAll().find(".eg-ajax-a-button"),
                i = e.prevAll().find(".eg-ajax-a-button");
            o = a(o), i = a(i), i.length > 0 ? i[i.length - 1].click() : o[o.length - 1].click()
        })
    }

    function showHideAjaxContainer(e, t, a, o, i, r) {
        i = i == undefined ? .25 : i;
        var n = e.data("container").data("opt"),
            s = e.data("lastheight") != undefined ? e.data("lastheight") : "100px";
        t ? (i += 1.2, addAjaxNavigagtion(n, e), punchgs.TweenLite.set(e, {
            height: "auto"
        }), punchgs.TweenLite.set(e.parent(), {
            minHeight: 0,
            maxHeight: "none",
            height: "auto",
            overwrite: "all"
        }), punchgs.TweenLite.from(e, i, {
            height: s,
            ease: punchgs.Power3.easeInOut,
            onStart: function() {
                punchgs.TweenLite.to(e, i, {
                    autoAlpha: 1,
                    ease: punchgs.Power3.easeOut
                })
            },
            onComplete: function() {
                e.data("lastheight", e.height()), jQuery(window).trigger("resize.essg"), 0 == e.find(".eg-ajax-closer-wrapper").length && addAjaxNavigagtion(n, e)
            }
        }), "off" != n.ajaxScrollToOnLoad && jQuery("html, body").animate({
            scrollTop: e.offset().top - o
        }, {
            queue: !1,
            speed: .5
        })) : (r && (killOldCustomAjaxContent(e), s = "0px"), punchgs.TweenLite.to(e.parent(), i, {
            height: s,
            ease: punchgs.Power2.easeInOut,
            onStart: function() {
                punchgs.TweenLite.to(e, i, {
                    autoAlpha: 0,
                    ease: punchgs.Power3.easeOut
                })
            },
            onComplete: function() {
                setTimeout(function() {
                    r && e.html("")
                }, 300)
            }
        }))
    }

    function removeLoader(e) {
        e.closest(".eg-ajaxanimwrapper").find(".esg-loader").remove()
    }

    function ajaxCallBack(opt, a) {
        if (opt.ajaxCallback == undefined || "" == opt.ajaxCallback || opt.ajaxCallback.length < 3) return !1;
        var splitter = opt.ajaxCallback.split(")"),
            splitter = splitter[0].split("("),
            callback = splitter[0],
            arguments = splitter.length > 1 && "" != splitter[1] ? splitter[1] + "," : "",
            obj = new Object;
        try {
            obj.containerid = "#" + opt.ajaxContentTarget, obj.postsource = a.data("ajaxsource"), obj.posttype = a.data("ajaxtype"), eval("on" == opt.ajaxCallbackArgument ? callback + "(" + arguments + "obj)" : callback + "(" + arguments + ")")
        } catch (e) {
            console.log("Callback Error"), console.log(e)
        }
    }

    function loadMoreContent(e, t, a) {
        e.find(".lastclickedajax").removeClass("lastclickedajax"), a.addClass("lastclickedajax");
        var o = jQuery("#" + t.ajaxContentTarget).find(".eg-ajax-target"),
            i = a.data("ajaxsource"),
            r = a.data("ajaxtype"),
            n = a.data("ajaxvideoaspect");
        if (o.data("container", e), n = "16:9" == n ? "widevideo" : "normalvideo", showHideAjaxContainer(o, !1), o.length > 0) switch (t.ajaxJsUrl != undefined && "" != t.ajaxJsUrl && t.ajaxJsUrl.length > 3 && jQuery.getScript(t.ajaxJsUrl).done(function() {
            t.ajaxJsUrl = ""
        }).fail(function() {
            console.log("Loading Error on Ajax jQuery File. Please doublecheck if JS File and Path exist:" + t.ajaxJSUrl), t.ajaxJsUrl = ""
        }), t.ajaxCssUrl != undefined && "" != t.ajaxCssUrl && t.ajaxCssUrl.length > 3 && (jQuery("<link>").appendTo("head").attr({
            type: "text/css",
            rel: "stylesheet"
        }).attr("href", t.ajaxCssUrl), "" == t.ajaxCssUrl), buildLoader(o.closest(".eg-ajaxanimwrapper"), t), o.data("ajaxload") != undefined && o.data("ajaxload").abort(), killOldCustomAjaxContent(o), r) {
            case "postid":
                var s = {
                    action: t.loadMoreAjaxAction,
                    client_action: "load_more_content",
                    token: t.loadMoreAjaxToken,
                    postid: i
                };
                setTimeout(function() {
                    o.data("ajaxload", jQuery.ajax({
                        type: "post",
                        url: t.loadMoreAjaxUrl,
                        dataType: "json",
                        data: s
                    })), o.data("ajaxload").success(function(e) {
                        e.success && (jQuery(o).html(e.data), showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset), removeLoader(o), ajaxCallBack(t, a))
                    }), o.data("ajaxload").error(function(e, t) {
                        "abort" != t && (jQuery(o).append("<p>FAILURE: <strong>" + t + "</strong></p>"), removeLoader(o))
                    })
                }, 300);
                break;
            case "youtubeid":
                setTimeout(function() {
                    o.html('<div class="eg-ajax-video-container ' + n + '"><iframe width="560" height="315" src="//www.youtube.com/embed/' + i + '?autoplay=1&vq=hd1080" frameborder="0" allowfullscreen></iframe></div>'), removeLoader(o), showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset), ajaxCallBack(t, a)
                }, 300);
                break;
            case "vimeoid":
                setTimeout(function() {
                    o.html('<div class="eg-ajax-video-container ' + n + '"><iframe src="//player.vimeo.com/video/' + i + '?portrait=0&autoplay=1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>'), removeLoader(o), showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset), ajaxCallBack(t, a)
                }, 300);
                break;
            case "wistiaid":
                setTimeout(function() {
                    o.html('<div class="eg-ajax-video-container ' + n + '"><iframe src="//fast.wistia.net/embed/iframe/' + i + '"allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="640" height="388"></iframe></div>'), removeLoader(o), showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset), ajaxCallBack(t, a)
                }, 300);
                break;
            case "html5vid":
                i = i.split("|"), setTimeout(function() {
                    o.html('<video autoplay="true" loop="" class="rowbgimage" poster="" width="100%" height="auto"><source src="' + i[0] + '" type="video/mp4"><source src="' + i[1] + '" type="video/webm"><source src="' + i[2] + '" type="video/ogg"></video>'), removeLoader(o), showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset), ajaxCallBack(t, a)
                }, 300);
                break;
            case "soundcloud":
            case "soundcloudid":
                setTimeout(function() {
                    o.html('<iframe width="100%" height="250" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + i + '&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true"></iframe>'), removeLoader(o), showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset), ajaxCallBack(t, a)
                }, 300);
                break;
            case "imageurl":
                setTimeout(function() {
                    var e = new Image;
                    e.onload = function() {
                        var e = jQuery(this);
                        o.html(""), e.css({
                            width: "100%",
                            height: "auto"
                        }), o.append(jQuery(this)), removeLoader(o), showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset), ajaxCallBack(t, a)
                    }, e.onerror = function() {
                        o.html("Error"), removeLoader(o), showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset)
                    }, e.src = i
                }, 300);
                break;
            default:
                jQuery.each(jQuery.fn.tpessential.defaults.ajaxTypes, function(e, a) {
                    a.openAnimationSpeed == undefined && (a.openAnimationSpeed = 0), a != undefined && a.type != undefined && a.type == r && setTimeout(function() {
                        o.data("lastposttype", r), o.data("oldajaxsource", i), o.data("oldajaxtype", r), o.data("oldajaxvideoaspect", n), o.data("oldselector", "#" + t.ajaxContentTarget + " .eg-ajax-target"), showHideAjaxContainer(o, !0, t.ajaxScrollToOnLoad, t.ajaxScrollToOffset, 0), o.html(a.func.call(this, {
                            id: i,
                            type: r,
                            aspectratio: n
                        })), removeLoader(o)
                    }, 300)
                })
        }
    }

    function resetFiltersFromCookies(e, t, a) {
        if ("on" == e.cookies.filter) {
            var o = a !== undefined ? a : readCookie("grid_" + e.girdID + "_filters");
            if (o !== undefined && null !== o && o.length > 0) {
                var i = 0;
                jQuery.each(o.split(","), function(a, o) {
                    o !== undefined && -1 !== o && "-1" !== o && jQuery(e.filterGroupClass + ".esg-filterbutton," + e.filterGroupClass + " .esg-filterbutton").each(function() {
                        jQuery(this).data("fid") != o && parseInt(jQuery(this).data("fid"), 0) !== parseInt(o, 0) || jQuery(this).hasClass("esg-pagination-button") || (t ? jQuery(this).click() : jQuery(this).addClass("selected"), i++)
                    })
                }), i > 0 && jQuery(e.filterGroupClass + ".esg-filterbutton.esg-allfilter," + e.filterGroupClass + " .esg-filterbutton.esg-allfilter").removeClass("selected")
            }
        }
    }

    function resetPaginationFromCookies(e, t) {
        if ("on" === e.cookies.pagination) {
            var a = t !== undefined ? t : readCookie("grid_" + e.girdID + "_pagination");
            a !== undefined && null !== a && a.length > 0 && jQuery(e.filterGroupClass + ".esg-filterbutton.esg-pagination-button," + e.filterGroupClass + " .esg-filterbutton.esg-pagination-button").each(function() {
                parseInt(jQuery(this).data("page"), 0) !== parseInt(a, 0) || jQuery(this).hasClass("selected") || jQuery(this).click()
            })
        }
    }

    function resetSearchFromCookies(e) {
        if ("on" === e.cookies.search) {
            var t = readCookie("grid_" + e.gridID + "_search");
            t !== undefined && null != t && t.length > 0 && (jQuery(e.filterGroupClass + ".eg-search-wrapper .eg-search-input").val(t).trigger("change"), e.cookies.searchjusttriggered = !0)
        }
    }

    function mainPreparing(e, t) {
        function a() {
            if (1 == t.lastsearchtimer) return !1;
            t.lastsearchtimer = 1, buildLoader(jQuery(t.filterGroupClass + ".eg-search-wrapper"), {
                spinner: "spinner3",
                spinnerColor: "#fff"
            }, !0), punchgs.TweenLite.fromTo(jQuery(t.filterGroupClass + ".eg-search-wrapper").find(".esg-loader"), .3, {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
                ease: punchgs.Power3.easeInOut
            });
            var a = jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input"),
                o = a.val(),
                i = jQuery(t.filterGroupClass + ".eg-search-wrapper.esg-filter-wrapper .hiddensearchfield");
            if (a.attr("disabled", "true"), o.length > 0) {
                a.trigger("searchstarting");
                var r = {
                        search: o,
                        id: t.gridID
                    },
                    n = {
                        action: t.loadMoreAjaxAction,
                        client_action: "get_grid_search_ids",
                        token: t.loadMoreAjaxToken,
                        data: r
                    };
                jQuery.ajax({
                    type: "post",
                    url: t.loadMoreAjaxUrl,
                    dataType: "json",
                    data: n
                }).success(function(a) {
                    if ("on" === t.cookies.search && createCookie("grid_" + t.gridID + "_search", o, t.cookies.timetosave * (1 / 60 / 60)), t.cookies.searchjusttriggered === !0) {
                        var r = readCookie("grid_" + t.girdID + "_pagination"),
                            n = readCookie("grid_" + t.girdID + "_filters");
                        setTimeout(function() {
                            resetFiltersFromCookies(t, !0, n), resetPaginationFromCookies(t, r)
                        }, 200), t.cookies.searchjusttriggered = !1
                    }
                    setTimeout(function() {
                        t.lastsearchtimer = 0, jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input").attr("disabled", !1), punchgs.TweenLite.to(jQuery(t.filterGroupClass + ".eg-search-wrapper").find(".esg-loader"), .5, {
                            autoAlpha: 1,
                            ease: punchgs.Power3.easeInOut,
                            onComplete: function() {
                                jQuery(t.filterGroupClass + ".eg-search-wrapper").find(".esg-loader").remove()
                            }
                        }), jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input").trigger("searchended")
                    }, 1e3);
                    var s = new Array;
                    a && jQuery.each(a, function(e, t) {
                        t != undefined && jQuery.isNumeric(t) && s.push(t)
                    }), e.find(".cat-searchresult").removeClass("cat-searchresult");
                    var l = 0;
                    jQuery.each(t.loadMoreItems, function(e, t) {
                        t[2] = "notsearched", jQuery.each(s, function(e, a) {
                            return parseInt(t[0], 0) === parseInt(a, 0) && -1 != parseInt(t[0], 0) ? (t[2] = "cat-searchresult", l++, !1) : void 0
                        })
                    }), jQuery.each(s, function(t, a) {
                        e.find(".eg-post-id-" + a).addClass("cat-searchresult")
                    }), i.addClass("eg-forcefilter").addClass("eg-justfilteredtosearch"), jQuery(t.filterGroupClass + ".esg-filter-wrapper .esg-allfilter").trigger("click")
                }).error(function(e, a) {
                    console.log("FAILURE: " + a), setTimeout(function() {
                        t.lastsearchtimer = 0, jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input").attr("disabled", !1), punchgs.TweenLite.to(jQuery(t.filterGroupClass + ".eg-search-wrapper").find(".esg-loader"), .5, {
                            autoAlpha: 1,
                            ease: punchgs.Power3.easeInOut,
                            onComplete: function() {
                                jQuery(t.filterGroupClass + ".eg-search-wrapper").find(".esg-loader").remove()
                            }
                        }), jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input").trigger("searchended")
                    }, 1e3)
                })
            } else {
                jQuery.each(t.loadMoreItems, function(e, t) {
                    t[2] = "notsearched"
                }), e.find(".cat-searchresult").removeClass("cat-searchresult");
                var i = jQuery(t.filterGroupClass + ".eg-search-wrapper.esg-filter-wrapper .hiddensearchfield");
                i.removeClass("eg-forcefilter").addClass("eg-justfilteredtosearch"), "on" === t.cookies.search && createCookie("grid_" + t.gridID + "_search", "", -1), jQuery(t.filterGroupClass + ".esg-filter-wrapper .esg-allfilter").trigger("click"), setTimeout(function() {
                    t.lastsearchtimer = 0, jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input").attr("disabled", !1), punchgs.TweenLite.to(jQuery(t.filterGroupClass + ".eg-search-wrapper").find(".esg-loader"), .5, {
                        autoAlpha: 1,
                        ease: punchgs.Power3.easeInOut,
                        onComplete: function() {
                            jQuery(t.filterGroupClass + ".eg-search-wrapper").find(".esg-loader").remove()
                        }
                    }), jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input").trigger("searchended")
                }, 1e3)
            }
        }
        resetFiltersFromCookies(t);
        var o = e.find(".eg-leftright-container"),
            i = getBestFitColumn(t, jQuery(window).width(), "id");
        if (t.column = i.column, t.columnindex = i.index, prepareItemsInGrid(t), organiseGrid(t), jQuery(t.filterGroupClass + ".eg-search-wrapper").length > 0) {
            var r = t.filterGroupClass.replace(".", ""),
                n = "Search Result",
                s = jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-submit"),
                l = jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-clean");
            jQuery(t.filterGroupClass + ".esg-filter-wrapper.eg-search-wrapper").append('<div style="display:none !important" class="esg-filterbutton hiddensearchfield ' + r + '" data-filter="cat-searchresult"><span>' + n + "</span></div>"), t.lastsearchtimer = 0, s.click(a), jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input").on("change", a), l.click(function() {
                "on" === t.cookies.search && createCookie("grid_" + t.gridID + "_search", "", -1), jQuery.each(t.loadMoreItems, function(e, t) {
                    t[2] = "notsearched"
                }), e.find(".cat-searchresult").removeClass("cat-searchresult");
                var a = jQuery(t.filterGroupClass + ".eg-search-wrapper.esg-filter-wrapper .hiddensearchfield");
                jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input").val(""), a.removeClass("eg-forcefilter").addClass("eg-justfilteredtosearch"), jQuery(t.filterGroupClass + ".esg-filter-wrapper .esg-allfilter").trigger("click"), setTimeout(function() {
                    t.lastsearchtimer = 0, jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input").attr("disabled", !1), punchgs.TweenLite.to(jQuery(t.filterGroupClass + ".eg-search-wrapper").find(".esg-loader"), .5, {
                        autoAlpha: 1,
                        ease: punchgs.Power3.easeInOut,
                        onComplete: function() {
                            jQuery(t.filterGroupClass + ".eg-search-wrapper").find(".esg-loader").remove()
                        }
                    }), jQuery(t.filterGroupClass + ".eg-search-wrapper .eg-search-input").trigger("searchended")
                }, 1e3)
            })
        }
        addCountSuffix(e, t), jQuery(t.filterGroupClass + ".esg-filter-wrapper," + t.filterGroupClass + " .esg-filter-wrapper").each(function() {
            var e = jQuery(this);
            e.hasClass("dropdownstyle") && (e.find(".esg-filter-checked").each(function() {
                jQuery(this).prependTo(jQuery(this).parent())
            }), is_mobile() ? e.find(".esg-selected-filterbutton").click(function() {
                var t = e.find(".esg-selected-filterbutton");
                t.hasClass("hoveredfilter") ? (setTimeout(function() {
                    t.removeClass("hoveredfilter")
                }, 200), e.find(".esg-dropdown-wrapper").stop().hide()) : (setTimeout(function() {
                    t.addClass("hoveredfilter")
                }, 200), e.find(".esg-dropdown-wrapper").stop().show())
            }) : "click" == t.showDropFilter ? (e.click(function() {
                var e = jQuery(this).closest(".esg-filter-wrapper");
                e.find(".esg-selected-filterbutton").addClass("hoveredfilter"), e.find(".esg-dropdown-wrapper").stop().show()
            }), e.on("mouseleave", function() {
                var e = jQuery(this).closest(".esg-filter-wrapper");
                e.find(".esg-selected-filterbutton").removeClass("hoveredfilter"), e.find(".esg-dropdown-wrapper").stop().hide()
            })) : e.hover(function() {
                var e = jQuery(this).closest(".esg-filter-wrapper");
                e.find(".esg-selected-filterbutton").addClass("hoveredfilter"), e.find(".esg-dropdown-wrapper").stop().show()
            }, function() {
                var e = jQuery(this).closest(".esg-filter-wrapper");
                e.find(".esg-selected-filterbutton").removeClass("hoveredfilter"), e.find(".esg-dropdown-wrapper").stop().hide()
            }))
        }), jQuery("body").on("click", t.filterGroupClass + ".esg-left," + t.filterGroupClass + " .esg-left", function() {
            t = getOptions(e), t.oldpage = t.currentpage, t.currentpage--, t.currentpage < 0 && (t.currentpage = t.realmaxpage - 1);
            var a = getBestFitColumn(t, jQuery(window).width(), "id");
            t.column = a.column, t.columnindex = a.index, setItemsOnPages(t), organiseGrid(t, "right"), setOptions(e, t), stopAllVideos(!0)
        }), jQuery("body").on("click", t.filterGroupClass + ".esg-right," + t.filterGroupClass + " .esg-right", function() {
            t = getOptions(e), t.oldpage = t.currentpage, t.currentpage++, t.currentpage >= t.realmaxpage && (t.currentpage = 0);
            var a = getBestFitColumn(t, jQuery(window).width(), "id");
            t.column = a.column, t.columnindex = a.index, setItemsOnPages(t), organiseGrid(t, "right"), setOptions(e, t), stopAllVideos(!0)
        }), jQuery(t.filterGroupClass + ".esg-filterbutton, " + t.filterGroupClass + " .esg-filterbutton").each(function() {
            jQuery(this).hasClass("esg-pagination-button") || jQuery(this).click(function() {
                var t = getOptions(e);
                stopAllVideos(!0);
                var a = jQuery(this);
                a.hasClass("esg-pagination-button") || (jQuery(t.filterGroupClass + ".esg-allfilter, " + t.filterGroupClass + " .esg-allfilter").removeClass("selected"), a.hasClass("esg-allfilter") && jQuery(t.filterGroupClass + ".esg-filterbutton, " + t.filterGroupClass + " .esg-filterbutton").each(function() {
                    jQuery(this).removeClass("selected")
                })), a.closest(".esg-filters").hasClass("esg-singlefilters") || "single" == t.filterType ? (jQuery(t.filterGroupClass + ".esg-filterbutton, " + t.filterGroupClass + " .esg-filterbutton").each(function() {
                    jQuery(this).removeClass("selected")
                }), a.addClass("selected")) : a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                var o = jQuery(t.filterGroupClass + ".esg-filter-wrapper .hiddensearchfield");
                o.hasClass("eg-forcefilter") && o.addClass("selected");
                var i = 0,
                    r = "";
                jQuery(t.filterGroupClass + ".esg-filterbutton.selected," + t.filterGroupClass + " .esg-filterbutton.selected").each(function() {
                    jQuery(this).hasClass("selected") && !jQuery(this).hasClass("esg-pagination-button") && (i++, r = 0 === i ? jQuery(this).data("fid") : r + "," + jQuery(this).data("fid"))
                }), "on" === t.cookies.filter && t.cookies.searchjusttriggered !== !0 && createCookie("grid_" + t.girdID + "_filters", r, t.cookies.timetosave * (1 / 60 / 60)), 0 == i && jQuery(t.filterGroupClass + ".esg-allfilter," + t.filterGroupClass + " .esg-allfilter").addClass("selected"), t.filterchanged = !0, t.currentpage = 0, 1 == t.maxpage ? (jQuery(t.filterGroupClass + ".navigationbuttons," + t.filterGroupClass + " .navigationbuttons").css({
                    display: "none"
                }), jQuery(t.filterGroupClass + ".esg-pagination," + t.filterGroupClass + " .esg-pagination").css({
                    display: "none"
                })) : (jQuery(t.filterGroupClass + ".navigationbuttons," + t.filterGroupClass + " .navigationbuttons").css({
                    display: "inline-block"
                }), jQuery(t.filterGroupClass + ".esg-pagination," + t.filterGroupClass + " .esg-pagination").css({
                    display: "inline-block"
                }));
                var n = e.find(".esg-loadmore");
                if (n.length > 0) {
                    var s = checkMoreToLoad(e, t).length;
                    n.html(s > 0 ? "off" == t.loadMoreNr ? t.loadMoreTxt : t.loadMoreTxt + " (" + s + ")" : t.loadMoreEndTxt)
                }
                setItemsOnPages(t), organiseGrid(t), setOptions(e, t)
            })
        });
        var u;
        jQuery(window).on("resize.essg", function() {
            if (clearTimeout(u), "on" == t.forceFullWidth || "on" == t.forceFullScreen) {
                var a = e.parent().parent().find(".esg-relative-placeholder").offset().left;
                e.closest(".esg-container-fullscreen-forcer").css({
                    left: 0 - a,
                    width: jQuery(window).width()
                })
            } else e.closest(".esg-container-fullscreen-forcer").css({
                left: 0,
                width: "auto"
            });
            if (o.length > 0) {
                var i = o.outerWidth(!0);
                punchgs.TweenLite.set(e.find(".esg-overflowtrick"), {
                    width: e.width() - i,
                    overwrite: "all"
                })
            }
            var r = getBestFitColumn(t, jQuery(window).width(), "id");
            t.column = r.column, t.columnindex = r.index, setOptions(e, t), u = setTimeout(function() {
                t = getOptions(e), setItemsOnPages(t), organiseGrid(t), setOptions(e, t)
            }, 200)
        }), e.on("itemsinposition", function() {
            var e = jQuery(this),
                t = getOptions(e),
                a = e.find(".eg-leftright-container");
            if (clearTimeout(e.data("callednow")), t.maxheight > 0 && t.maxheight < 9999999999) {
                t.inanimation = !1;
                var o = e.find(".esg-overflowtrick").first(),
                    i = e.find("ul").first(),
                    a = e.find(".eg-leftright-container"),
                    r = parseInt(o.css("paddingTop"), 0);
                r = r == undefined ? 0 : r, r = null == r ? 0 : r;
                var n = parseInt(o.css("paddingBottom"), 0);
                n = n == undefined ? 0 : n, n = null == n ? 0 : n;
                var s = t.maxheight + t.overflowoffset + r + n;
                if ("on" == t.forceFullScreen) {
                    var l = jQuery(window).height();
                    if (t.fullScreenOffsetContainer != undefined) try {
                        var u = t.fullScreenOffsetContainer.split(",");
                        jQuery.each(u, function(e, a) {
                            l -= jQuery(a).outerHeight(!0), l < t.minFullScreenHeight && (l = t.minFullScreenHeight)
                        })
                    } catch (d) {}
                    s = l
                }
                var c = .3;
                i.height() < 200 && (c = 1), punchgs.TweenLite.to(i, c, {
                    force3D: "auto",
                    height: s,
                    ease: punchgs.Power3.easeInOut,
                    clearProps: "transform"
                }), punchgs.TweenLite.to(o, c, {
                    force3D: !0,
                    height: s,
                    ease: punchgs.Power3.easeInOut,
                    clearProps: "transform",
                    onComplete: function() {
                        e.closest(".eg-grid-wrapper, .myportfolio-container").css({
                            height: "auto"
                        }).removeClass("eg-startheight")
                    }
                }), a.length > 0 && punchgs.TweenLite.set(a, {
                    minHeight: s,
                    ease: punchgs.Power3.easeInOut
                });
                var p = jQuery(t.filterGroupClass + ".esg-navbutton-solo-left," + t.filterGroupClass + " .esg-navbutton-solo-left"),
                    h = jQuery(t.filterGroupClass + ".esg-navbutton-solo-right," + t.filterGroupClass + " .esg-navbutton-solo-right");
                p.length > 0 && p.css({
                    marginTop: 0 - p.height() / 2
                }), h.length > 0 && h.css({
                    marginTop: 0 - h.height() / 2
                })
            } else if (0 == t.maxheight) {
                var o = e.find(".esg-overflowtrick").first(),
                    i = e.find("ul").first();
                punchgs.TweenLite.to(i, 1, {
                    force3D: "auto",
                    height: 0,
                    ease: punchgs.Power3.easeInOut,
                    clearProps: "transform"
                }), punchgs.TweenLite.to(o, 1, {
                    force3D: !0,
                    height: 0,
                    ease: punchgs.Power3.easeInOut,
                    clearProps: "transform"
                })
            }
            e.data("callednow", setTimeout(function() {
                e.find(".itemtoshow.isvisiblenow").each(function() {
                    hideUnderElems(jQuery(this))
                })
            }, 250)), t.firstLoadFinnished === undefined && (e.trigger("essential_grid_ready_to_use"), resetSearchFromCookies(t), resetPaginationFromCookies(t), t.firstLoadFinnished = !0)
        }), prepareSortingAndOrders(e), prepareSortingClicks(e)
    }

    function prepareSortingAndOrders(e) {
        var t = getOptions(e);
        e.find(".tp-esg-item").each(function() {
            var e = new Date(jQuery(this).data("date"));
            jQuery(this).data("date", e.getTime() / 1e3)
        }), jQuery(t.filterGroupClass + ".esg-sortbutton-order," + t.filterGroupClass + " .esg-sortbutton-order").each(function() {
            var e = jQuery(this);
            e.removeClass("tp-desc").addClass("tp-asc"), e.data("dir", "asc")
        })
    }

    function prepareSortingClicks(e) {
        opt = getOptions(e);
        var t;
        jQuery(opt.filterGroupClass + ".esg-sortbutton-wrapper .esg-sortbutton-order," + opt.filterGroupClass + " .esg-sortbutton-wrapper .esg-sortbutton-order").click(function() {
            var a = jQuery(this);
            a.hasClass("tp-desc") ? (a.removeClass("tp-desc").addClass("tp-asc"), a.data("dir", "asc")) : (a.removeClass("tp-asc").addClass("tp-desc"), a.data("dir", "desc"));
            var o = a.data("dir");
            stopAllVideos(!0, !0), jQuery(opt.filterGroupClass + ".esg-sorting-select," + opt.filterGroupClass + " .esg-sorting-select").each(function() {
                var a = jQuery(this).val();
                clearTimeout(t), e.find(".tp-esg-item").tsort({
                    data: a,
                    forceStrings: "false",
                    order: o
                }), t = setTimeout(function() {
                    opt = getOptions(e), setItemsOnPages(opt), organiseGrid(opt), setOptions(e, opt)
                }, 200)
            })
        }), jQuery(opt.filterGroupClass + ".esg-sorting-select," + opt.filterGroupClass + " .esg-sorting-select").each(function() {
            var a = jQuery(this);
            a.change(function() {
                e.find("iframe").css({
                    visibility: "hidden"
                }), e.find(".video-eg").css({
                    visibility: "hidden"
                });
                var o = jQuery(this).closest(".esg-sortbutton-wrapper").find(".esg-sortbutton-order"),
                    i = a.val(),
                    r = a.find("option:selected").text(),
                    n = o.data("dir");
                stopAllVideos(!0, !0), clearTimeout(t), a.parent().parent().find(".sortby_data").text(r), e.find(".tp-esg-item").tsort({
                    data: i,
                    forceStrings: "false",
                    order: n
                }), t = setTimeout(function() {
                    opt = getOptions(e), setItemsOnPages(opt), organiseGrid(opt), setOptions(e, opt)
                }, 500)
            })
        })
    }

    function fixCenteredCoverElement(e, t, a) {
        if (t == undefined && (t = e.find(".esg-entry-cover")), a == undefined && (a = e.find(".esg-entry-media")), t && a) {
            var o = a.height();
            punchgs.TweenLite.set(t, {
                height: o
            });
            var i = e.find(".esg-cc");
            punchgs.TweenLite.set(i, {
                top: (o - i.height()) / 2
            })
        }
    }

    function getBestFitColumn(e, t, a) {
        var o = t,
            i = 0,
            r = 9999,
            n = 0,
            s = e.column,
            l = (e.column, e.column),
            u = 0,
            d = 0;
        e.responsiveEntries != undefined && e.responsiveEntries.length > 0 && jQuery.each(e.responsiveEntries, function(e, t) {
            var a = t.width != undefined ? t.width : 0,
                c = t.amount != undefined ? t.amount : 0;
            r > a && (r = a, s = c, d = e), a > n && (n = a, lamount = c), a > i && o >= a && (i = a, l = c, u = e)
        }), r > t && (l = s, u = d);
        var c = new Object;
        return c.index = u, c.column = l, "id" == a ? c : l
    }

    function getOptions(e) {
        return e.data("opt")
    }

    function setOptions(e, t) {
        e.data("opt", t)
    }

    function checkMediaListeners(e) {
        e.find("iframe").each(function() {
            var e = jQuery(this);
            e.attr("src").toLowerCase().indexOf("youtube") > 0 ? prepareYT(e) : e.attr("src").toLowerCase().indexOf("vimeo") > 0 ? prepareVimeo(e) : e.attr("src").toLowerCase().indexOf("wistia") > 0 ? prepareWs(e) : e.attr("src").toLowerCase().indexOf("soundcloud") > 0 && prepareSoundCloud(e)
        }), e.find("video").each(function() {
            prepareVideo(jQuery(this))
        })
    }

    function waitMediaListeners(e) {
        var t = setInterval(function() {
            e.find("iframe").each(function() {
                var e = jQuery(this);
                e.attr("src").toLowerCase().indexOf("youtube") > 0 ? prepareYT(e) && clearInterval(t) : e.attr("src").toLowerCase().indexOf("vimeo") > 0 ? prepareVimeo(e) && clearInterval(t) : e.attr("src").toLowerCase().indexOf("wistia") > 0 ? prepareWs(e) && clearInterval(t) : e.attr("src").toLowerCase().indexOf("soundcloud") > 0 ? prepareSoundCloud(e) && clearInterval(t) : clearInterval(t)
            }), e.find("video").each(function() {
                prepareVideo(jQuery(this)) && clearInterval(t)
            })
        }, 50)
    }

    function directionPrepare(e, t, a, o, i) {
        var r = new Object;
        switch (e) {
            case 0:
                r.x = 0, r.y = "in" == t ? 0 - o : 10 + o, r.y = i && "in" == t ? r.y - 5 : r.y;
                break;
            case 1:
                r.y = 0, r.x = "in" == t ? a : -10 - a, r.x = i && "in" == t ? r.x + 5 : r.x;
                break;
            case 2:
                r.y = "in" == t ? o : -10 - o, r.x = 0, r.y = i && "in" == t ? r.y + 5 : r.y;
                break;
            case 3:
                r.y = 0, r.x = "in" == t ? 0 - a : 10 + a, r.x = i && "in" == t ? r.x - 5 : r.x
        }
        return r
    }

    function getDir(e, t) {
        var a = e.width(),
            o = e.height(),
            i = (t.x - e.offset().left - a / 2) * (a > o ? o / a : 1),
            r = (t.y - e.offset().top - o / 2) * (o > a ? a / o : 1),
            n = Math.round((Math.atan2(r, i) * (180 / Math.PI) + 180) / 90 + 3) % 4;
        return n
    }

    function hideUnderElems(e) {
        e.find(".eg-handlehideunder").each(function() {
            var t = jQuery(this),
                a = t.data("hideunder"),
                o = t.data("hideunderheight"),
                i = t.data("hidetype");
            t.data("knowndisplay") == undefined && t.data("knowndisplay", t.css("display")), e.width() < a && a != undefined || e.height() < o && o != undefined ? "visibility" == i ? t.addClass("forcenotvisible") : "display" == i && t.addClass("forcenotdisplay") : "visibility" == i ? t.removeClass("forcenotvisible") : "display" == i && t.removeClass("forcenotdisplay")
        })
    }

    function offsetParrents(e, t) {
        var a = t.closest(".mainul"),
            o = a.parent();
        if (t.position().top + t.height() > a.height() + 40 || 0 == e || 0 != a.data("bh") && a.data("bh") != undefined && t.position().top + t.height() > parseInt(a.data("bh"), 0) + 40) {
            (a.data("bh") == undefined || 0 == a.data("bh")) && a.data("bh", a.height()), (o.data("bh") == undefined || 0 == o.data("bh")) && o.data("bh", o.height());
            var i = a.data("bh"),
                r = o.data("bh");
            0 != e ? (a.data("alreadyinoff", !1), punchgs.TweenLite.to(a, .2, {
                height: i + e
            }), punchgs.TweenLite.to(o, .2, {
                height: r + e
            })) : a.data("alreadyinoff") || (a.data("alreadyinoff", !0), punchgs.TweenLite.to(a, .3, {
                height: i,
                ease: punchgs.Power3.easeIn,
                onComplete: function() {
                    a.data("bh", 0), o.data("bh", 0), a.data("alreadyinoff", !1)
                }
            }), punchgs.TweenLite.to(o, .3, {
                height: r,
                ease: punchgs.Power3.easeIn,
                onComplete: function() {
                    a.data("bh", 0), o.data("bh", 0), a.data("alreadyinoff", !1)
                }
            }))
        }
    }

    function itemHoverAnim(e, t, a, o) {
        1 != e.data("simplevideo") && checkMediaListeners(e);
        var i = !1,
            r = e.find(".esg-media-poster");
        if (r.length > 0 && 0 == r.css("opacity") && (i = !0), e.find(".isplaying, .isinpause").length > 0 || i) return !1;
        clearTimeout(e.data("hovertimer"));
        var n = a.mainhoverdelay;
        "set" == t && (n = 0), e.data("hovertimer", setTimeout(function() {
            e.data("animstarted", 1), punchgs.TweenLite.set(e, {
                z: .01,
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0
            }), e.addClass("esg-hovered");
            var i = e.find(".esg-entry-cover");
            if (punchgs.TweenLite.set(i, {
                    transformStyle: "flat"
                }), "set" != t && fixCenteredCoverElement(e, i), e.find(".esg-entry-content").length > 0 && "set" != t && "even" == a.layout) {
                var r = e.data("pt"),
                    n = e.data("pb"),
                    s = e.data("pl"),
                    l = e.data("pr"),
                    u = e.data("bt"),
                    d = e.data("bb"),
                    c = e.data("bl"),
                    p = e.data("br");
                if (e.data("hhh", e.outerHeight()), e.data("www", e.outerWidth()), punchgs.TweenLite.set(e.find(".esg-entry-content"), {
                        display: "block"
                    }), punchgs.TweenLite.set(e.find(".esg-entry-media"), {
                        height: e.data("hhh")
                    }), punchgs.TweenLite.set(e, {
                        z: .1,
                        zIndex: 50,
                        x: 0 - (s + l + p + c) / 2,
                        y: 0 - (r + n + u + d) / 2,
                        height: "auto",
                        width: e.data("www") + s + l + c + p
                    }), "on" == a.evenGridMasonrySkinPusher) {
                    var h = e.height() - e.data("hhh");
                    offsetParrents(h, e)
                }
                e.css({
                    paddingTop: r + "px",
                    paddingLeft: s + "px",
                    paddingRight: l + "px",
                    paddingBottom: l + "px"
                }), e.css({
                    borderTopWidth: u + "px",
                    borderBottomWidth: d + "px",
                    borderLeftWidth: c + "px",
                    borderRightWidth: p + "px"
                }), 1 != a.inanimation && punchgs.TweenLite.set(e.closest(".esg-overflowtrick"), {
                    overflow: "visible",
                    overwrite: "all"
                })
            }
            jQuery.each(esgAnimmatrix, function(a, i) {
                e.find(i[0]).each(function() {
                    var a = jQuery(this),
                        r = a.data("delay") != undefined ? a.data("delay") : 0;
                    animfrom = i[2], animto = i[3], animto.delay = r, animto.overwrite = "all", animfrom.overwrite = "all", animto.transformStyle = "flat", animto.force3D = !0;
                    var n = 0,
                        s = i[0].indexOf("out") > -1;
                    a.hasClass("esg-entry-media") || s || (animto.clearProps = "transform"), s && (animfrom.clearProps = "transform"), animto.z = .001, animfrom.transformPerspective == undefined && (animfrom.transformPerspective = 1e3), a.hasClass("esg-overlay") && (animfrom.z == undefined && (animfrom.z = -.002), animto.z = -1e-4);
                    var l = a;
                    if (a.hasClass("esg-entry-media") && a.find(".esg-media-video").length > 0) return !0;
                    var u = punchgs.TweenLite.killTweensOf(l, !1);
                    if ("set" == t) {
                        var u = punchgs.TweenLite.set(l, animfrom);
                        s && u.eventCallback("onComplete", resetTransforms, [l])
                    } else switch (i[0]) {
                        case ".esg-shifttotop":
                            animto.y = 0 - e.find(".esg-bc.eec").last().height();
                            var u = punchgs.TweenLite.fromTo(a, .5, {
                                y: 0
                            }, {
                                y: animto.y
                            });
                            break;
                        case ".esg-slide":
                            var d = directionPrepare(o, "in", e.width(), e.height()),
                                c = new Object,
                                p = new Object;
                            jQuery.extend(c, animfrom), jQuery.extend(p, animto), c.css.x = d.x, c.css.y = d.y;
                            var u = punchgs.TweenLite.fromTo(l, i[1], c, p, n);
                            break;
                        case ".esg-slideout":
                            var d = directionPrepare(o, "out", e.width(), e.height()),
                                c = new Object,
                                p = new Object;
                            jQuery.extend(c, animfrom), jQuery.extend(p, animto), p.x = d.x, p.y = d.y, p.clearProps = "";
                            var u = punchgs.TweenLite.fromTo(l, i[1], c, p, n);
                            break;
                        default:
                            var u = punchgs.TweenLite.fromTo(l, i[1], animfrom, animto, n)
                    }
                })
            })
        }, n))
    }

    function videoClickEvent(e, t, a, o) {
        e.css({
            transform: "none",
            "-moz-transform": "none",
            "-webkit-transform": "none"
        }), e.closest(".esg-overflowtrick").css({
            transform: "none",
            "-moz-transform": "none",
            "-webkit-transform": "none"
        }), e.closest("ul").css({
            transform: "none",
            "-moz-transform": "none",
            "-webkit-transform": "none"
        }), o || e.find(".esg-media-video").each(function() {
            var t = jQuery(this);
            if (t.data("youtube") != undefined && 0 == e.find(".esg-youtube-frame").length) {
                var a = e.find(".esg-entry-media"),
                    o = "https://www.youtube.com/embed/" + t.data("youtube") + "?version=3&enablejsapi=1&html5=1&controls=1&autohide=1&rel=0&showinfo=0";
                a.append('<iframe class="esg-youtube-frame" wmode="Opaque" style="position:absolute;top:0px;left:0px;display:none" width="' + t.attr("width") + '" height="' + t.attr("height") + '" data-src="' + o + '" src="about:blank"></iframe>')
            }
            if (t.data("vimeo") != undefined && 0 == e.find(".esg-vimeo-frame").length) {
                var a = e.find(".esg-entry-media"),
                    i = "http://player.vimeo.com/video/" + t.data("youtube") + "?title=0&byline=0&html5=1&portrait=0&api=1;";
                a.append('<iframe class="esg-vimeo-frame"  allowfullscreen="false" style="position:absolute;top:0px;left:0px;display:none" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" width="' + t.attr("width") + '" height="' + t.attr("height") + '" data-src="' + i + '" src="about:blank"></iframe>')
            }
            if (t.data("wistia") != undefined && 0 == e.find(".esg-wistia-frame").length) {
                var a = e.find(".esg-entry-media"),
                    r = "https://fast.wistia.net/embed/iframe/" + t.data("wistia") + "?version=3&enablejsapi=1&html5=1&controls=1&autohide=1&rel=0&showinfo=0";
                a.append('<iframe class="esg-wistia-frame" wmode="Opaque" style="position:absolute;top:0px;left:0px;display:none" width="' + t.attr("width") + '" height="' + t.attr("height") + '" data-src="' + r + '" src="about:blank"></iframe>')
            }
            if (t.data("soundcloud") != undefined && 0 == e.find(".esg-soundcloud-frame").length) {
                var a = e.find(".esg-entry-media"),
                    n = "https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/" + t.data("soundcloud") + "&auto_play=false&hide_related=false&visual=true&show_artwork=true";
                a.append('<iframe class="esg-soundcloud-frame" allowfullscreen="false" style="position:absolute;top:0px;left:0px;display:none" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" width="' + t.attr("width") + '" height="' + t.attr("height") + '" scrolling="no" frameborder="no" data-src="' + n + '" src="about:blank"></iframe>')
            }
            if ((t.data("mp4") != undefined || t.data("webm") != undefined || t.data("ogv") != undefined) && 0 == e.find(".esg-video-frame").length) {
                var a = e.find(".esg-entry-media");
                a.append('<video class="esg-video-frame" style="position:absolute;top:0px;left:0px;display:none" width="' + t.attr("width") + '" height="' + t.attr("height") + '" data-origw="' + t.attr("width") + '" data-origh="' + t.attr("height") + '" ></video'), t.data("mp4") != undefined && a.find("video").append('<source src="' + t.data("mp4") + '" type="video/mp4" />'), t.data("webm") != undefined && a.find("video").append('<source src="' + t.data("webm") + '" type="video/webm" />'), t.data("ogv") != undefined && a.find("video").append('<source src="' + t.data("ogv") + '" type="video/ogg" />')
            }
        }), adjustMediaSize(e, !0, null, a);
        var i = e.find(".esg-youtube-frame");
        0 == i.length && (i = e.find(".esg-vimeo-frame")), 0 == i.length && (i = e.find(".esg-wistia-frame")), 0 == i.length && (i = e.find(".esg-soundcloud-frame")), 0 == i.length && (i = e.find(".esg-video-frame"));
        var r = e.find(".esg-entry-cover"),
            n = e.find(".esg-media-poster");
        if ("about:blank" == i.attr("src")) {
            i.attr("src", i.data("src")), loadVideoApis(t, a), o || punchgs.TweenLite.set(i, {
                opacity: 0,
                display: "block"
            });
            var s = setInterval(function() {
                i.attr("src").toLowerCase().indexOf("youtube") > 0 ? 1 == prepareYT(i) && (clearInterval(s), o || (is_mobile() ? (punchgs.TweenLite.set(i, {
                    autoAlpha: 1
                }), punchgs.TweenLite.set(n, {
                    autoAlpha: 0
                }), punchgs.TweenLite.set(r, {
                    autoAlpha: 0
                })) : (punchgs.TweenLite.to(i, .5, {
                    autoAlpha: 1
                }), punchgs.TweenLite.to(n, .5, {
                    autoAlpha: 0
                }), punchgs.TweenLite.to(r, .5, {
                    autoAlpha: 0
                }), playYT(i, o)))) : i.attr("src").toLowerCase().indexOf("vimeo") > 0 ? 1 == prepareVimeo(i) && (clearInterval(s), o || (is_mobile() ? (punchgs.TweenLite.set(i, {
                    autoAlpha: 1
                }), punchgs.TweenLite.set(n, {
                    autoAlpha: 0
                }), punchgs.TweenLite.set(r, {
                    autoAlpha: 0
                })) : (punchgs.TweenLite.to(i, .5, {
                    autoAlpha: 1
                }), punchgs.TweenLite.to(n, .5, {
                    autoAlpha: 0
                }), punchgs.TweenLite.to(r, .5, {
                    autoAlpha: 0
                })), playVimeo(i, o))) : i.attr("src").toLowerCase().indexOf("wistia") > 0 ? 1 == prepareWs(i) && (clearInterval(s), o || (is_mobile() ? (punchgs.TweenLite.set(i, {
                    autoAlpha: 1
                }), punchgs.TweenLite.set(n, {
                    autoAlpha: 0
                }), punchgs.TweenLite.set(r, {
                    autoAlpha: 0
                })) : (punchgs.TweenLite.to(i, .5, {
                    autoAlpha: 1
                }), punchgs.TweenLite.to(n, .5, {
                    autoAlpha: 0
                }), punchgs.TweenLite.to(r, .5, {
                    autoAlpha: 0
                }), playYT(i, o)))) : i.attr("src").toLowerCase().indexOf("soundcloud") > 0 && 1 == prepareSoundCloud(i) && (clearInterval(s), o || (is_mobile() ? (punchgs.TweenLite.set(i, {
                    autoAlpha: 1
                }), punchgs.TweenLite.set(n, {
                    autoAlpha: 0
                }), punchgs.TweenLite.set(r, {
                    autoAlpha: 0
                })) : (punchgs.TweenLite.to(i, .5, {
                    autoAlpha: 1
                }), punchgs.TweenLite.to(n, .5, {
                    autoAlpha: 0
                }), punchgs.TweenLite.to(r, .5, {
                    autoAlpha: 0
                })), playSC(i, o)))
            }, 100)
        } else if (i.hasClass("esg-video-frame")) {
            loadVideoApis(t, a), punchgs.TweenLite.set(i, {
                opacity: 0,
                display: "block"
            });
            var s = setInterval(function() {
                1 == prepareVideo(i) && (clearInterval(s), o || (is_mobile() ? (punchgs.TweenLite.set(i, {
                    autoAlpha: 1
                }), punchgs.TweenLite.set(n, {
                    autoAlpha: 0
                }), punchgs.TweenLite.set(r, {
                    autoAlpha: 0
                })) : (punchgs.TweenLite.to(i, .5, {
                    autoAlpha: 1
                }), punchgs.TweenLite.to(n, .5, {
                    autoAlpha: 0
                }), punchgs.TweenLite.to(r, .5, {
                    autoAlpha: 0
                })), playVideo(i, o)))
            }, 100)
        } else o || (is_mobile() ? (punchgs.TweenLite.set(i, {
            autoAlpha: 1
        }), punchgs.TweenLite.set(n, {
            autoAlpha: 0
        }), punchgs.TweenLite.set(r, {
            autoAlpha: 0
        })) : (punchgs.TweenLite.set(i, {
            opacity: 0,
            display: "block"
        }), punchgs.TweenLite.to(i, .5, {
            autoAlpha: 1
        }), punchgs.TweenLite.to(n, .5, {
            autoAlpha: 0
        }), punchgs.TweenLite.to(r, .5, {
            autoAlpha: 0
        }))), i.attr("src") != undefined && (i.attr("src").toLowerCase().indexOf("youtube") > 0 && playYT(i, o), i.attr("src").toLowerCase().indexOf("vimeo") > 0 && playVimeo(i, o), i.attr("src").toLowerCase().indexOf("wistia") > 0 && playWs(i, o), i.attr("src").toLowerCase().indexOf("soundcloud") > 0 && playSC(i, o))
    }

    function prepareItemsInGrid(e, t) {
        var a = e.container;
        a.addClass("esg-container"), t || a.find(".mainul>li").each(function() {
            jQuery(this).addClass("eg-newli")
        });
        var o = a.find(".mainul>.eg-newli"),
            i = (100 / e.column, e.aspectratio),
            r = a.find(".esg-overflowtrick").parent().width(),
            n = (a.find("ul").first(), a.find(".esg-overflowtrick").first(), 0);
        i = i.split(":"), aratio = parseInt(i[0], 0) / parseInt(i[1], 0), n = r / e.column / aratio, jQuery.each(o, function(t, o) {
            var i = jQuery(o),
                r = i.find(".esg-entry-media"),
                n = r.find("img").attr("src");
            i.removeClass("eg-newli"), punchgs.TweenLite.set(i, {
                force3D: "auto",
                autoAlpha: 0,
                opacity: 0
            }), i.addClass("tp-esg-item"), "even" == e.layout ? n != undefined && (i.find(".esg-entry-media").wrap('<div class="esg-entry-media-wrapper" style="width:100%;height:100%; overflow:hidden;position:relative;"></div>'), r.find("img").css({
                top: "0px",
                left: "0px",
                width: "100%",
                height: "auto",
                visibility: "visible",
                display: "block"
            })) : i.find(".esg-entry-media").wrap('<div class="esg-entry-media-wrapper" style="overflow:hidden;position:relative;"></div>'), i.find(".esg-media-video").each(function() {
                var t = jQuery(this),
                    o = i.find(".esg-entry-media"),
                    r = "display:none;",
                    n = "data-src=",
                    s = "src=";
                if (t.data("poster") != undefined && t.data("poster").length > 3 ? "even" != e.layout ? (o.append('<img class="esg-media-poster" src="' + t.data("poster") + '" width="' + t.attr("width") + '" height="' + t.attr("height") + '">'), o.find("img").css({
                        top: "0px",
                        left: "0px",
                        width: "100%",
                        height: "auto",
                        visibility: "visible",
                        display: "block"
                    })) : (o.append('<div class="esg-media-poster" style="background:url(' + t.data("poster") + '); background-size:cover; background-position:center center">'), o.find(".esg-media-poster").css({
                        width: "100%",
                        height: "100%",
                        visibility: "visible",
                        position: "relative",
                        display: "block"
                    })) : (i.find(".esg-entry-cover").remove(), r = "display:block;", n = "src=", s = "data-src=", i.data("simplevideo", 1)), 0 == i.find(".esg-click-to-play-video").length && (i.find(".esg-entry-cover").find("*").each(function() {
                        0 == jQuery(this).closest("a").length && 0 == jQuery(this).find("a").length && jQuery(this).addClass("esg-click-to-play-video")
                    }), i.find(".esg-overlay").addClass("esg-click-to-play-video")), t.data("youtube") != undefined) {
                    var l = "https://www.youtube.com/embed/" + t.data("youtube") + "?version=3&enablejsapi=1&html5=1&controls=1&autohide=1&rel=0&showinfo=0";
                    o.append('<iframe class="esg-youtube-frame" wmode="Opaque" style="position:absolute;top:0px;left:0px;' + r + '" width="' + t.attr("width") + '" height="' + t.attr("height") + '" ' + n + '"' + l + '" ' + s + '"about:blank"></iframe>')
                }
                if (t.data("vimeo") != undefined) {
                    var u = "http://player.vimeo.com/video/" + t.data("vimeo") + "?title=0&byline=0&html5=1&portrait=0&api=1";
                    o.append('<iframe class="esg-vimeo-frame" style="position:absolute;top:0px;left:0px;' + r + '" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""  width="' + t.attr("width") + '" height="' + t.attr("height") + '" ' + n + '"' + u + '" ' + s + '"about:blank"></iframe>')
                }
                if (t.data("wistia") != undefined) {
                    var d = "https://fast.wistia.net/embed/iframe/" + t.data("wistia") + "?version=3&enablejsapi=1&html5=1&controls=1&autohide=1&rel=0&showinfo=0";
                    o.append('<iframe class="esg-wistia-frame" wmode="Opaque" style="position:absolute;top:0px;left:0px;' + r + '" width="' + t.attr("width") + '" height="' + t.attr("height") + '" ' + n + '"' + d + '" ' + s + '"about:blank"></iframe>')
                }
                if (t.data("soundcloud") != undefined) {
                    var c = "https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/" + t.data("soundcloud") + "&auto_play=false&hide_related=false&visual=true&show_artwork=true";
                    o.append('<iframe class="esg-soundcloud-frame" style="position:absolute;top:0px;left:0px;' + r + '" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" width="' + t.attr("width") + '" height="' + t.attr("height") + '" ' + n + '"' + c + '" ' + s + '"about:blank"></iframe>')
                }(t.data("mp4") != undefined || t.data("webm") != undefined || t.data("ogv") != undefined) && (o.append('<video class="esg-video-frame" controls style="position:absolute;top:0px;left:0px;' + r + '" width="' + t.attr("width") + '" height="' + t.attr("height") + '" data-origw="' + t.attr("width") + '" data-origh="' + t.attr("height") + '"></video'), t.data("mp4") != undefined && o.find("video").append('<source src="' + t.data("mp4") + '" type="video/mp4" />'), t.data("webm") != undefined && o.find("video").append('<source src="' + t.data("webm") + '" type="video/webm" />'), t.data("ogv") != undefined && o.find("video").append('<source src="' + t.data("ogv") + '" type="video/ogg" />')), i.find(".esg-click-to-play-video").click(function() {
                    var t = jQuery(this).closest(".tp-esg-item");
                    videoClickEvent(t, a, e)
                }), 1 == i.data("simplevideo") && waitMediaListeners(i)
            }), 0 == i.find(".esg-media-video").length && i.find(".esg-click-to-play-video").remove(), adjustMediaSize(i, !0, null, e), i.find(".esg-entry-content").length > 0 && i.find(".esg-media-cover-wrapper").length > 0 && (i.find(".esg-entry-content").index() < i.find(".esg-media-cover-wrapper").index() || i.find(".esg-entry-content").addClass("esg-notalone")), i.find(".esg-entry-cover").each(function() {
                var e = jQuery(this),
                    t = e.data("clickable");
                e.find(".esg-top").wrapAll('<div class="esg-tc eec"></div>'), e.find(".esg-left").wrapAll('<div class="esg-lc eec"></div>'), e.find(".esg-right").wrapAll('<div class="esg-rc eec"></div>'), e.find(".esg-center").wrapAll('<div class="esg-cc eec"></div>'), e.find(".esg-bottom").wrapAll('<div class="esg-bc eec"></div>'), e.find(".eec").append("<div></div>"), "on" == t && e.find(".esg-overlay").length >= 1 && e.click(function(e) {
                    0 == jQuery(e.target).closest("a").length && jQuery(this).find(".eg-invisiblebutton")[0].click()
                }).css({
                    cursor: "pointer"
                })
            }), i.data("pt", parseInt(i.css("paddingTop"), 0)), i.data("pb", parseInt(i.css("paddingBottom"), 0)), i.data("pl", parseInt(i.css("paddingLeft"), 0)), i.data("pr", parseInt(i.css("paddingRight"), 0)), i.data("bt", parseInt(i.css("borderTopWidth"), 0)), i.data("bb", parseInt(i.css("borderBottomWidth"), 0)), i.data("bl", parseInt(i.css("borderLeftWidth"), 0)), i.data("br", parseInt(i.css("borderRightWidth"), 0)), i.find(".esg-entry-content").length > 0 && "even" == e.layout && (i.css({
                paddingTop: "0px",
                paddingLeft: "0px",
                paddingRight: "0px",
                paddingBottom: "0px"
            }), i.css({
                borderTopWidth: "0px",
                borderBottomWidth: "0px",
                borderLeftWidth: "0px",
                borderRightWidth: "0px"
            })), i.find(".eg-handlehideunder").each(function() {}), e.ajaxContentTarget != undefined && jQuery("#" + e.ajaxContentTarget).length > 0 && i.find(".eg-ajaxclicklistener, a").each(function() {
                var t = jQuery(this),
                    o = jQuery("#" + e.ajaxContentTarget).find(".eg-ajax-target");
                o.parent().hasClass("eg-ajaxanimwrapper") || o.wrap('<div class="eg-ajaxanimwrapper" style="position:relative;overflow:hidden;"></div>'), t.data("ajaxsource") != undefined && t.data("ajaxtype") != undefined && (t.addClass("eg-ajax-a-button"), t.click(function() {
                    return loadMoreContent(a, e, t), o.length > 0 ? !1 : !0
                }))
            }), i.find(".eg-triggerfilter").click(function() {
                var t = jQuery(this).data("filter");
                return jQuery(e.filterGroupClass + ".esg-filterbutton," + e.filterGroupClass + " .esg-filterbutton").each(function() {
                    jQuery(this).data("filter") == t && jQuery(this).trigger("click")
                }), !1
            }).css({
                cursor: "pointer"
            }), i.on("mouseenter.hoverdir, mouseleave.hoverdir", function(t) {
                var a = jQuery(this),
                    o = getDir(a, {
                        x: t.pageX,
                        y: t.pageY
                    });
                if ("mouseenter" === t.type) itemHoverAnim(jQuery(this), "nope", e, o);
                else {
                    if (clearTimeout(a.data("hovertimer")), 1 == a.data("animstarted")) {
                        a.data("animstarted", 0), a.removeClass("esg-hovered");
                        var i = (a.find(".esg-entry-cover"), 0);
                        a.find(".esg-entry-content").length > 0 && "even" == e.layout && (punchgs.TweenLite.set(a.find(".esg-entry-content"), {
                            display: "none"
                        }), punchgs.TweenLite.set(a, {
                            zIndex: 5
                        }), punchgs.TweenLite.set(a.closest(".esg-overflowtrick"), {
                            overflow: "hidden",
                            overwrite: "all"
                        }), a.css({
                            paddingTop: "0px",
                            paddingLeft: "0px",
                            paddingRight: "0px",
                            paddingBottom: "0px"
                        }), a.css({
                            borderTopWidth: "0px",
                            borderBottomWidth: "0px",
                            borderLeftWidth: "0px",
                            borderRightWidth: "0px"
                        }), a.find(".esg-entry-media").css({
                            height: "100%"
                        }), punchgs.TweenLite.set(a, {
                            z: 0,
                            height: a.data("hhh"),
                            width: a.data("www"),
                            x: 0,
                            y: 0
                        }), "on" == e.evenGridMasonrySkinPusher && offsetParrents(0, a)), jQuery.each(esgAnimmatrix, function(e, t) {
                            a.find(t[0]).each(function() {
                                var e = jQuery(this),
                                    r = e.data("delay") != undefined ? e.data("delay") : 0,
                                    n = t[5],
                                    s = 0;
                                switch (animobject = e, splitted = !1, isOut = t[0].indexOf("out") > -1, r > i && (i = r), n.z == undefined && (n.z = 1), t[0]) {
                                    case ".esg-slide":
                                        var l = directionPrepare(o, "in", a.width(), a.height(), !0);
                                        n.x = l.x, n.y = l.y;
                                        var u = punchgs.TweenLite.to(animobject, .5, {
                                            y: n.y,
                                            x: n.x,
                                            overwrite: "all",
                                            onCompleteParams: [animobject],
                                            onComplete: function(e) {
                                                punchgs.TweenLite.set(e, {
                                                    autoAlpha: 0
                                                })
                                            }
                                        });
                                        break;
                                    case ".esg-slideout":
                                        var l = directionPrepare(o, "out", a.width(), a.height());
                                        n.x = 0, n.y = 0, n.overwrite = "all";
                                        var u = punchgs.TweenLite.fromTo(animobject, .5, {
                                            autoAlpha: 1,
                                            x: l.x,
                                            y: l.y
                                        }, {
                                            x: 0,
                                            y: 0,
                                            autoAlpha: 1,
                                            overwrite: "all"
                                        });
                                        break;
                                    default:
                                        n.force3D = "auto";
                                        var u = punchgs.TweenLite.to(animobject, t[4], n, s)
                                }
                                isOut && u.eventCallback("onComplete", resetTransforms, [animobject])
                            })
                        })
                    }
                    a.hasClass("esg-demo") && setTimeout(function() {
                        itemHoverAnim(a)
                    }, 800)
                }
            }), itemHoverAnim(i, "set", e), i.hasClass("esg-demo") && itemHoverAnim(i)
        }), loadVideoApis(a, e), setItemsOnPages(e)
    }

    function resetTransforms(e) {
        punchgs.TweenLite.set(e, {
            clearProps: "transform",
            css: {
                clearProps: "transform"
            }
        })
    }

    function adjustMediaSize(e, t, a, o) {
        e.find("iframe").length > 0 && e.find("iframe").each(function() {
            var i = jQuery(this);
            i.data("origw", i.attr("width")), i.data("origh", i.attr("height"));
            var r = i.data("origw"),
                n = i.data("origh");
            if (a != undefined) var s = a.itemw;
            else var s = e.width();
            ifh = s / r * n, s = Math.round(s), ifh = Math.round(ifh), i.data("neww", s), i.data("newh", ifh), t && "even" != o.layout ? (punchgs.TweenLite.set(i, {
                width: s,
                height: ifh
            }), punchgs.TweenLite.set(e.find(".esg-media-poster"), {
                width: s,
                height: ifh
            }), punchgs.TweenLite.set(e.find(".esg-entry-media"), {
                width: s,
                height: ifh
            })) : (punchgs.TweenLite.set(i, {
                width: "100%",
                height: "100%"
            }), punchgs.TweenLite.set(e.find(".esg-media-poster"), {
                width: "100%",
                height: "100%"
            }), punchgs.TweenLite.set(e.find(".esg-entry-media"), {
                width: "100%",
                height: "100%"
            }))
        }), e.find(".esg-video-frame").length > 0 && e.find(".esg-video-frame").each(function() {
            var i = jQuery(this);
            i.parent().data("origw", i.data("origw")), i.parent().data("origh", i.data("origh"));
            var r = i.data("origw"),
                n = i.data("origh");
            if (a != undefined) var s = a.itemw;
            else var s = e.width();
            ifh = s / r * n, s = Math.round(s), ifh = Math.round(ifh), i.data("neww", s), i.data("newh", ifh), t && "even" != o.layout ? (punchgs.TweenLite.set(i, {
                width: s,
                height: ifh
            }), punchgs.TweenLite.set(e.find(".esg-media-poster"), {
                width: s,
                height: ifh
            }), punchgs.TweenLite.set(e.find(".esg-entry-media"), {
                width: s,
                height: ifh
            })) : (punchgs.TweenLite.set(i, {
                width: "100%",
                height: "100%"
            }), punchgs.TweenLite.set(e.find(".esg-media-poster"), {
                width: "100%",
                height: "100%"
            }), punchgs.TweenLite.set(e.find(".esg-entry-media"), {
                width: "100%",
                height: "100%"
            }))
        })
    }

    function setItemsOnPages(e) {
        var t = e.container,
            a = t.find(".mainul>li"),
            o = e.column * e.row,
            i = e.rowItemMultiplier,
            r = i.length;
        if (r > 0 && "even" == e.layout) {
            o = 0;
            for (var n = 0; n < e.row; n++) {
                var s = n - r * Math.floor(n / r);
                o += i[s][e.columnindex]
            }
        }
        if ("on" == e.evenCobbles && e.cobblesPattern != undefined) {
            var l = 0,
                o = 0;
            jQuery.each(a, function(t) {
                var a = jQuery(a),
                    i = a.data("cobblesw"),
                    r = a.data("cobblesh");
                if (e.cobblesPattern != undefined && e.cobblesPattern.length > 2) {
                    var n = getCobblePat(e.cobblesPattern, t);
                    i = parseInt(n.w, 0), r = parseInt(n.h, 0)
                }
                i = i == undefined ? 1 : i, r = r == undefined ? 1 : r, e.column < i && (i = e.column), l += i * r, e.column * e.row >= l && o++
            })
        }
        var u = o * e.currentpage,
            d = (t.find(".esg-overflowtrick").parent().width(), u + o),
            c = jQuery(e.filterGroupClass + ".esg-filterbutton.selected:not(.esg-navigationbutton)," + e.filterGroupClass + " .esg-filterbutton.selected:not(.esg-navigationbutton)"),
            p = 0;
        if (jQuery(e.filterGroupClass + ".esg-filter-wrapper, " + e.filterGroupClass + " .esg-filter-wrapper").length > 0 ? jQuery.each(a, function(t, a) {
                var o = jQuery(a);
                o.find(".esgbox").each(function() {
                    "all" == e.lightBoxMode ? jQuery(this).attr("rel", "group") : "contentgroup" != e.lightBoxMode && jQuery(this).attr("rel", "")
                });
                var i = !0,
                    r = 0;
                jQuery.each(c, function(e, t) {
                    o.hasClass(jQuery(t).data("filter")) && (i = !1, r++)
                }), "and" == e.filterLogic && r < c.length && (i = !0), hidsbutton = jQuery(e.filterGroupClass + ".esg-filter-wrapper .hiddensearchfield"), hidsbutton.hasClass("eg-forcefilter") && r < c.length && (i = !0), p >= u && d > p && !i ? (o.addClass("itemtoshow").removeClass("itemishidden").removeClass("itemonotherpage"), ("filterpage" == e.lightBoxMode || "filterall" == e.lightBoxMode) && o.find(".esgbox").attr("rel", "group"), p++) : ("filterall" == e.lightBoxMode && o.find(".esgbox").attr("rel", "group"), i ? o.addClass("itemishidden").removeClass("itemtoshow").removeClass("fitsinfilter") : (u > p || p >= d ? (o.addClass("itemonotherpage"), o.removeClass("itemtoshow"), p++) : (o.addClass("itemtoshow").removeClass("itemishidden").removeClass("itemonotherpage"), p++), o.addClass("fitsinfilter")))
            }) : jQuery.each(a, function(t, a) {
                var o = jQuery(a);
                o.find(".esgbox").each(function() {
                    "all" == e.lightBoxMode ? jQuery(this).attr("rel", "group") : "contentgroup" != e.lightBoxMode && jQuery(this).attr("rel", "")
                }), p >= u && d > p ? (o.addClass("itemtoshow").removeClass("itemishidden").removeClass("itemonotherpage"), p++) : (u > p || p >= d ? (o.addClass("itemonotherpage"), o.removeClass("itemtoshow"), p++) : (o.addClass("itemtoshow").removeClass("itemishidden").removeClass("itemonotherpage"), p++), o.addClass("fitsinfilter"))
            }), e.nonefiltereditems = t.find(".itemtoshow, .fitsinfilter").length, "none" != e.loadMoreType) {
            var h = 0,
                f = !1;
            c.each(function() {
                var e = jQuery(this).data("filter");
                if (e != undefined) {
                    var a = t.find("." + e).length;
                    h += a, 0 == a && (f = !0)
                }
            }), (0 == c.length || 1 == c.length) && (h = 1), (0 == h || f) && loadMoreItems(t, e)
        }
        var g = jQuery(e.filterGroupClass + ".esg-pagination," + e.filterGroupClass + " .esg-pagination");
        g.find(".esg-pagination").remove(), g.html(""), e.maxpage = 0;
        var w, m = Math.ceil(e.nonefiltereditems / o);
        if (e.realmaxpage = m, m > 7 && "on" == e.smartPagination)
            if (e.currentpage < 3) {
                for (var n = 0; 4 > n; n++) w = n == e.currentpage ? "selected" : "", e.maxpage++, g.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + w + '" data-page="' + n + '">' + (n + 1) + "</div>");
                g.append('<div class="esg-navigationbutton">...</div>'), g.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + w + '" data-page="' + (m - 1) + '">' + m + "</div>")
            } else if (m - e.currentpage < 4) {
            g.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + w + '" data-page="0">1</div>'), g.append('<div class="esg-navigationbutton">...</div>');
            for (var n = m - 4; m > n; n++) w = n == e.currentpage ? "selected" : "", e.maxpage++, g.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + w + '" data-page="' + n + '">' + (n + 1) + "</div>")
        } else {
            g.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + w + '" data-page="0">1</div>'), g.append('<div class="esg-navigationbutton">...</div>');
            for (var n = e.currentpage - 1; n < e.currentpage + 2; n++) w = n == e.currentpage ? "selected" : "", e.maxpage++, g.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + w + '" data-page="' + n + '">' + (n + 1) + "</div>");
            g.append('<div class="esg-navigationbutton">...</div>'), g.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + w + '" data-page="' + (m - 1) + '">' + m + "</div>")
        } else
            for (var n = 0; m > n; n++) w = n == e.currentpage ? "selected" : "", e.maxpage++, g.append('<div class="esg-navigationbutton esg-filterbutton esg-pagination-button ' + w + '" data-page="' + n + '">' + (n + 1) + "</div>");
        if (1 == e.maxpage ? (jQuery(e.filterGroupClass + ".esg-navigationbutton," + e.filterGroupClass + " .esg-navigationbutton").not(".esg-loadmore").css({
                display: "none"
            }), g.css({
                display: "none"
            })) : (jQuery(e.filterGroupClass + ".esg-navigationbutton," + e.filterGroupClass + " .esg-navigationbutton").css({
                display: "inline-block"
            }), g.css({
                display: "inline-block"
            })), e.currentpage >= Math.ceil(e.nonefiltereditems / o)) {
            e.oldpage = e.currentpage, e.currentpage = 0;
            var v = 0;
            t.find(".itemtoshow, .fitsinfilter").each(function() {
                v++, d > v && jQuery(this).removeClass("itemonotherpage")
            }), g.find(".esg-pagination-button").first().addClass("selected")
        }
        e.currentpage < 0 && (e.currentpage = 0), g.find(".esg-pagination-button").on("click", function() {
            e.oldpage = e.currentpage, e.currentpage = jQuery(this).data("page"), e = getOptions(t);
            var a = getBestFitColumn(e, jQuery(window).width(), "id");
            e.column = a.column, e.columnindex = a.index, "on" === e.cookies.pagination && e.cookies.searchjusttriggered !== !0 && createCookie("grid_" + e.girdID + "_pagination", e.currentpage, e.cookies.timetosave * (1 / 60 / 60)), setItemsOnPages(e), organiseGrid(e), setOptions(t, e), stopAllVideos(!0), "on" == e.paginationScrollToTop && jQuery("html, body").animate({
                scrollTop: t.offset().top - e.paginationScrollToTopOffset
            }, {
                queue: !1,
                speed: .5
            })
        }), e.firstshowever == undefined && jQuery(e.filterGroupClass + ".esg-navigationbutton," + e.filterGroupClass + " .esg-navigationbutton").css({
            visibility: "hidden"
        })
    }

    function waittorungGrid(e, t, a) {
        var o = e.closest(".mainul");
        clearTimeout(o.data("intreorganisier")), o.hasClass("gridorganising") ? o.data("intreorganisier", setTimeout(function() {
            waittorungGrid(e, t, a)
        }, 10)) : runGrid(t, a)
    }

    function loadAllPrepared(e, t) {
        if (1 == e.data("preloading")) return !1;
        var a = t.aspectratio,
            o = (parseInt(a[0], 0) / parseInt(a[1], 0), new Image);
        e.data("lazysrc") != e.attr("src") && e.data("lazysrc") != undefined && "undefined" != e.data("lazysrc") && e.data("lazysrc") != undefined && "undefined" != e.data("lazysrc") && e.attr("src", e.data("lazysrc")), e.data("preloading", 1), o.onload = function() {
            e.data("lazydone", 1), e.data("ww", o.width), e.data("hh", o.height), e.closest(".showmeonload").addClass("itemtoshow").removeClass("showmeonload").addClass("loadedmedia"), evenImageRatio(e, t), "on" == t.lazyLoad && waittorungGrid(e, t, !0)
        }, o.onerror = function() {
            e.data("lazydone", 1), e.closest(".showmeonload").addClass("itemtoshow").removeClass("showmeonload").addClass("loadedmedia"), "on" == t.lazyLoad && waittorungGrid(e, t, !0)
        }, o.src = e.attr("src") != undefined && "undefined" != e.attr("src") ? e.attr("src") : e.data("src"), o.complete && (e.data("lazydone", 1), e.data("ww", o.width), e.data("hh", o.height), e.closest(".showmeonload").addClass("itemtoshow").removeClass("showmeonload").addClass("loadedmedia"), evenImageRatio(e, t), "on" == t.lazyLoad && waittorungGrid(e, t, !0))
    }

    function organiseGrid(e) {
        var t = e.container;
        e.listneractivated == undefined && (t.on("visibleimagesloaded", function() {
            runGrid(e)
        }), e.listneractivated = !0, setOptions(t, e)), waitForLoads(t.find(".itemtoshow"), e)
    }

    function evenImageRatio(e, t, a) {
        if ("even" == t.layout && e.is(":visible")) {
            var o = t.aspectratio;
            o = o.split(":");
            var i = parseInt(o[0], 0) / parseInt(o[1], 0),
                r = e.data("ww"),
                n = e.data("lazydone");
            if (r == undefined && 1 == n || "on" == t.forceFullScreen && 1 == n || a && r != undefined) {
                var s = e.data("hh"),
                    l = r / s;
                if (l >= i) {
                    var u = s / o[1],
                        d = s / u,
                        c = r / u,
                        p = (c - o[0]) / 2;
                    p = 100 / o[0] * p, e.css({
                        position: "absolute",
                        width: "auto",
                        height: "101%",
                        top: "0%",
                        left: 0 - p + "%"
                    })
                } else {
                    var u = r / o[0],
                        d = s / u,
                        c = r / u,
                        p = (d - o[1]) / 2;
                    p = 100 / o[1] * p, e.css({
                        position: "absolute",
                        width: "101%",
                        height: "auto",
                        left: "0%",
                        top: 0 - p + "%"
                    })
                }
                removeLLCover(e)
            }
        } else removeLLCover(e)
    }

    function removeLLCover(e) {
        !e.hasClass("coverremoved") && e.parent().find(".lazyloadcover").length > 0 && (e.addClass("coverremoved"), punchgs.TweenLite.to(e.parent().find(".lazyloadcover"), .5, {
            autoAlpha: 0,
            ease: punchgs.Power3.easeInOut,
            onComplete: function() {
                e.parent().find(".lazyloadcover").remove()
            }
        }))
    }

    function runGrid(e, t) {
        var a = e.container;
        e.firstshowever == undefined ? (a.is(":hidden") ? (punchgs.TweenLite.set(a, {
            autoAlpha: 1,
            display: "block"
        }), setTimeout(function() {
            runGridMain(e, t), jQuery(e.filterGroupClass + ".esg-navigationbutton, " + e.filterGroupClass + " .esg-navigationbutton").css({
                visibility: "visible"
            })
        }, 300)) : (runGridMain(e, t), jQuery(e.filterGroupClass + ".esg-navigationbutton, " + e.filterGroupClass + " .esg-navigationbutton").css({
            visibility: "visible"
        })), e.firstshowever = 1) : (runGridMain(e, t), jQuery(e.filterGroupClass + ".esg-navigationbutton, " + e.filterGroupClass + " .esg-navigationbutton").css({
            visibility: "visible"
        }))
    }

    function getCobblePat(e, t) {
        var a = new Object;
        return a.w = 1, a.h = 1, e = e.split(","), e != undefined && (e = e[t - Math.floor(t / e.length) * e.length].split("x"), a.w = e[0], a.h = e[1]), a
    }

    function runGridMain(e, t) {
        var a, o = e.container,
            i = o.find(".itemtoshow, .isvisiblenow").not(".ui-sortable-helper"),
            r = new Object,
            n = o.find("ul").first(),
            s = (o.find(".esg-overflowtrick").first(), e.aspectratio),
            l = 0;
        e.aspectratioOrig = e.aspectratio, o.find(".mainul").addClass("gridorganising"), s = s.split(":"), a = parseInt(s[0], 0) / parseInt(s[1], 0), r.item = 0, r.pagetoanimate = 0 - e.currentpage, r.col = 0, r.row = 0, r.pagecounter = 0, r.itemcounter = 0, r.fakecol = 0, r.fakerow = 0, r.maxheight = 0, r.allcol = 0, r.allrow = 0, r.ulcurheight = 0, r.ulwidth = n.width(), r.verticalsteps = 1, r.currentcolumnheight = new Array;
        for (var u = 0; u < e.column; u++) r.currentcolumnheight[u] = 0;
        r.pageitemcounterfake = 0, r.pageitemcounter = 0, r.delaybasic = e.delayBasic != undefined ? e.delayBasic : .08, r.anim = e.pageAnimation, r.itemtowait = 0, r.itemouttowait = 0, r.ease = "punchgs.Power1.easeInOut", r.easeout = r.ease, r.row = 0, r.col = 0; {
            var d = e.rowItemMultiplier,
                c = d.length;
            e.column
        }
        if (r.y = 0, r.fakey = 0, o.find(".esg-overflowtrick").css({
                width: "100%"
            }), 100 == o.find(".esg-overflowtrick").width() && o.find(".esg-overflowtrick").css({
                width: o.find(".esg-overflowtrick").parent().width()
            }), r.cwidth = o.find(".esg-overflowtrick").width() - 2 * e.overflowoffset, e.inanimation = !0, r.cwidth_n_spaces = r.cwidth - (e.column - 1) * e.space, r.itemw = Math.round(r.cwidth_n_spaces / e.column), r.originalitemw = r.itemw, "on" == e.forceFullScreen && (l = jQuery(window).height(), e.fullScreenOffsetContainer != undefined)) try {
            var p = e.fullScreenOffsetContainer.split(",");
            jQuery.each(p, function(t, a) {
                l -= jQuery(a).outerHeight(!0), l < e.minFullScreenHeight && (l = e.minFullScreenHeight)
            })
        } catch (h) {}
        "even" == e.layout ? (r.itemh = Math.round(0 == Math.round(l) ? r.cwidth_n_spaces / e.column / a : l / e.row), e.aspectratio = 0 == l ? e.aspectratio : r.itemw + ":" + r.itemh, c > 0 ? punchgs.TweenLite.set(i, {
            display: "block",
            visibility: "visible",
            overwrite: "auto"
        }) : punchgs.TweenLite.set(i, {
            display: "block",
            width: r.itemw,
            height: r.itemh,
            visibility: "visible",
            overwrite: "auto"
        })) : punchgs.TweenLite.set(i, {
            display: "block",
            width: r.itemw,
            height: "auto",
            visibility: "visible",
            overwrite: "auto"
        }), t || punchgs.TweenLite.killTweensOf(i), r.originalitemh = r.itemh;
        for (var f = new Array, g = e.row * e.column * 2, w = 0; g > w; w++) {
            for (var m = new Array, v = 0; v < e.column; v++) m.push(0);
            f.push(m)
        }
        var y = 0;
        0 == i.length && o.trigger("itemsinposition"), jQuery.each(i, function(t, i) {
            var s = jQuery(i);
            if (r.itemw = r.originalitemw, "on" != e.evenCobbles || s.hasClass("itemonotherpage") || s.hasClass("itemishidden")) {
                var u = r.row - c * Math.floor(r.row / c);
                "even" == e.layout && c > 0 && (e.column = d[u][e.columnindex], r.cwidth = o.find(".esg-overflowtrick").width() - 2 * e.overflowoffset, r.cwidth_n_spaces = r.cwidth - (e.column - 1) * e.space, r.itemw = Math.round(r.cwidth_n_spaces / e.column), r.itemh = 0 == l ? r.cwidth_n_spaces / e.column / a : l / e.row, e.aspectratio = 0 == l ? e.aspectratio : r.itemw + ":" + r.itemh, punchgs.TweenLite.set(s, {
                    width: r.itemw,
                    height: r.itemh,
                    overwrite: "auto"
                }))
            } else {
                var p = s.data("cobblesw"),
                    h = s.data("cobblesh");
                if (e.cobblesPattern != undefined && e.cobblesPattern.length > 2) {
                    var w = getCobblePat(e.cobblesPattern, y);
                    p = parseInt(w.w, 0), h = parseInt(w.h, 0), y++
                }
                p = p == undefined ? 1 : p, h = h == undefined ? 1 : h, e.column < p && (p = e.column), r.cobblesorigw = r.originalitemw, r.cobblesorigh = r.originalitemh, r.itemw = r.itemw * p + (p - 1) * e.space, r.itemh = r.originalitemh, r.itemh = r.itemh * h + (h - 1) * e.space;
                var m = p + ":" + h,
                    v = !1,
                    b = 0,
                    x = 0;
                switch (m) {
                    case "1:1":
                        do 0 == f[b][x] && (f[b][x] = "1:1", v = !0, r.cobblesx = x, r.cobblesy = b), x++, x == e.column && (x = 0, b++), b >= g && (v = !0); while (!v);
                        break;
                    case "1:2":
                        do 0 == f[b][x] && g - 1 > b && 0 == f[b + 1][x] && (f[b][x] = "1:2", f[b + 1][x] = "1:2", r.cobblesx = x, r.cobblesy = b, v = !0), x++, x == e.column && (x = 0, b++), b >= g && (v = !0); while (!v);
                        break;
                    case "1:3":
                        do 0 == f[b][x] && g - 2 > b && 0 == f[b + 1][x] && 0 == f[b + 2][x] && (f[b][x] = "1:3", f[b + 1][x] = "1:3", f[b + 2][x] = "1:3", r.cobblesx = x, r.cobblesy = b, v = !0), x++, x == e.column && (x = 0, b++), b >= g && (v = !0); while (!v);
                        break;
                    case "2:1":
                        do 0 == f[b][x] && x < e.column - 1 && 0 == f[b][x + 1] && (f[b][x] = "2:1", f[b][x + 1] = "2:1", r.cobblesx = x, r.cobblesy = b, v = !0), x++, x == e.column && (x = 0, b++), b >= g && (v = !0); while (!v);
                        break;
                    case "3:1":
                        do 0 == f[b][x] && x < e.column - 2 && 0 == f[b][x + 1] && 0 == f[b][x + 2] && (f[b][x] = "3:1", f[b][x + 1] = "3:1", f[b][x + 2] = "3:1", r.cobblesx = x, r.cobblesy = b, v = !0), x++, x == e.column && (x = 0, b++), b >= g && (v = !0); while (!v);
                        break;
                    case "2:2":
                        do x < e.column - 1 && g - 1 > b && 0 == f[b][x] && 0 == f[b][x + 1] && 0 == f[b + 1][x] && 0 == f[b + 1][x + 1] && (f[b][x] = "2:2", f[b + 1][x] = "2:2", f[b][x + 1] = "2:2", f[b + 1][x + 1] = "2:2", r.cobblesx = x, r.cobblesy = b, v = !0), x++, x == e.column && (x = 0, b++), b >= g && (v = !0); while (!v);
                        break;
                    case "3:2":
                        do x < e.column - 2 && g - 1 > b && 0 == f[b][x] && 0 == f[b][x + 1] && 0 == f[b][x + 2] && 0 == f[b + 1][x] && 0 == f[b + 1][x + 1] && 0 == f[b + 1][x + 2] && (f[b][x] = "3:2", f[b][x + 1] = "3:2", f[b][x + 2] = "3:2", f[b + 1][x] = "3:2", f[b + 1][x + 1] = "3:2", f[b + 1][x + 2] = "3:2", r.cobblesx = x, r.cobblesy = b, v = !0), x++, x == e.column && (x = 0, b++), b >= g && (v = !0); while (!v);
                        break;
                    case "2:3":
                        do x < e.column - 1 && g - 2 > b && 0 == f[b][x] && 0 == f[b][x + 1] && 0 == f[b + 1][x] && 0 == f[b + 1][x + 1] && 0 == f[b + 2][x + 1] && 0 == f[b + 2][x + 1] && (f[b][x] = "2:3", f[b][x + 1] = "2:3", f[b + 1][x] = "2:3", f[b + 1][x + 1] = "2:3", f[b + 2][x] = "2:3", f[b + 2][x + 1] = "2:3", r.cobblesx = x, r.cobblesy = b, v = !0), x++, x == e.column && (x = 0, b++), b >= g && (v = !0); while (!v);
                        break;
                    case "3:3":
                        do x < e.column - 2 && g - 2 > b && 0 == f[b][x] && 0 == f[b][x + 1] && 0 == f[b][x + 2] && 0 == f[b + 1][x] && 0 == f[b + 1][x + 1] && 0 == f[b + 1][x + 2] && 0 == f[b + 2][x] && 0 == f[b + 2][x + 1] && 0 == f[b + 2][x + 2] && (f[b][x] = "3:3", f[b][x + 1] = "3:3", f[b][x + 2] = "3:3", f[b + 1][x] = "3:3", f[b + 1][x + 1] = "3:3", f[b + 1][x + 2] = "3:3", f[b + 2][x] = "3:3", f[b + 2][x + 1] = "3:3", f[b + 2][x + 2] = "3:3", r.cobblesx = x, r.cobblesy = b, v = !0), x++, x == e.column && (x = 0, b++), b >= g && (v = !0); while (!v)
                }
                e.aspectratio = r.itemw + ":" + r.itemh, punchgs.TweenLite.set(s, {
                    width: r.itemw,
                    height: r.itemh,
                    overwrite: "auto"
                });
                var j = s.find(".esg-entry-media").find("img");
                j.length > 0 && evenImageRatio(j, e, !0)
            }
            if ("even" == e.layout) {
                var j = s.find(".esg-entry-media").find("img");
                j.length > 0 && evenImageRatio(j, e, !0)
            } else s.hasClass("itemtoshow") && (s.width() != r.itemw || 0 == s.css("opacity") || "hidden" == s.css("visibility")) ? r = prepareItemToMessure(s, r, o) : (adjustMediaSize(s, !0, r, e), r.itemh = s.height());
            r = animateGrid(i, e, r), r.itemcounter++, n.height() < r.maxheight && o.trigger("itemsinposition")
        }), e.aspectratio = e.aspectratioOrig, 0 == r.itemtowait && (e.container.trigger("itemsinposition"), o.find(".mainul").removeClass("gridorganising"));
        var b = getBestFitColumn(e, jQuery(window).width(), "id");
        e.column = b.column, e.columnindex = b.index, e.maxheight = r.maxheight, e.container.trigger("itemsinposition"), e.inanimation = !0, e.started = !1, e.filterchanged = !1, e.silent = !1, e.silentout = !1, e.changedAnim = "", setOptions(o, e);
        var x = o.parent().parent().find(".esg-loader");
        x.length > 0 && punchgs.TweenLite.to(x, .2, {
            autoAlpha: 0
        })
    }

    function prepareItemToMessure(e, t, a) {
        return adjustMediaSize(e, !0, t, a.data("opt")), t.itemh = e.outerHeight(!0), t
    }

    function animateGrid(e, t, a) {
        var o = jQuery(e);
        if (a.skipanim = !1, a.x = Math.round(a.col * a.itemw), "even" == t.layout);
        else {
            a.idealcol = 0, a.backupcol = a.col;
            for (var i = 0; i < t.column; i++) a.currentcolumnheight[a.idealcol] > a.currentcolumnheight[i] && (a.idealcol = i);
            a.y = a.currentcolumnheight[a.idealcol], a.x = Math.round(a.idealcol * a.itemw) + a.idealcol * t.space, a.col = a.idealcol, a.itemh == undefined && (a.itemh = 0)
        }
        if (a.cobblesx != undefined && (a.x = a.cobblesx * a.cobblesorigw, a.y = a.cobblesy * a.cobblesorigh), a.waits = a.col * a.delaybasic + a.row * a.delaybasic * t.column, a.speed = t.animSpeed, a.inxrot = 0, a.inyrot = 0, a.outxrot = 0, a.outyrot = 0, a.inorigin = "center center", a.outorigin = "center center", a.itemh = Math.round(a.itemh), a.scale = 1, a.outfade = 0, a.infade = 0, o.hasClass("itemonotherpage") && (a.skipanim = !0), "horizontal-slide" == a.anim ? (a.waits = 0, a.hsoffset = 0 - a.cwidth - parseInt(t.space), a.hsoffsetout = 0 - a.cwidth - parseInt(t.space), t.oldpage != undefined && t.oldpage > t.currentpage && (a.hsoffset = a.cwidth + parseInt(t.space), a.hsoffsetout = a.cwidth + parseInt(t.space))) : "vertical-slide" == a.anim && (a.waits = 0, a.maxcalcheight = t.row * t.space + t.row * a.itemh, a.vsoffset = a.maxcalcheight + parseInt(t.space), a.vsoffsetout = a.maxcalcheight + parseInt(t.space), t.oldpage != undefined && t.oldpage > t.currentpage && (a.vsoffset = 0 - a.maxcalcheight - parseInt(t.space), a.vsoffsetout = 0 - a.maxcalcheight - parseInt(t.space))), a.outwaits = a.waits, "even" == t.layout && a.cobblesx == undefined && (a.x = a.x + a.col * t.space), a.cobblesx != undefined && (a.x = a.x + a.cobblesx * t.space, a.y = a.y + a.cobblesy * t.space), ("vertical-flip" == a.anim || "horizontal-flip" == a.anim || "vertical-flipbook" == a.anim || "horizontal-flipbook" == a.anim) && (a = fakePositions(o, a, t)), "vertical-flip" == a.anim ? (a.inxrot = -180, a.outxrot = 180) : "horizontal-flip" == a.anim && (a.inyrot = -180, a.outyrot = 180), a.outspeed = a.speed, "off" == t.animDelay && (a.waits = 0, a.outwaits = 0), "scale" == a.anim ? a.scale = 0 : "vertical-flipbook" == a.anim ? (a.inxrot = -90, a.outxrot = 90, a.inorigin = "center top", a.outorigin = "center bottom", a.waits = a.waits + a.speed / 3, a.outfade = 1, a.infade = 1, a.outspeed = a.speed / 1.2, a.ease = "Sine.easeOut", a.easeout = "Sine.easeIn", "off" == t.animDelay && (a.waits = a.speed / 3, a.outwaits = 0)) : "horizontal-flipbook" == a.anim ? (a.inyrot = -90, a.outyrot = -90, a.inorigin = "left center", a.outorigin = "right center", a.waits = a.waits + a.speed / 2.4, a.outfade = 1, a.infade = 1, a.outspeed = a.speed / 1.2, a.ease = "Sine.easeOut", a.easeout = "Sine.easeIn", "off" == t.animDelay && (a.waits = a.speed / 3, a.outwaits = 0)) : ("fall" == a.anim || "rotatefall" == a.anim) && (a.outoffsety = 100, a = fakePositions(o, a, t), a.outfade = 0), "rotatefall" == a.anim ? (a.rotatez = 20, a.outorigin = "left top", a.outfade = 1, a.outoffsety = 600) : "rotatescale" == a.anim ? (a.scale = 0, a.inorigin = "left bottom", a.outorigin = "center center", a.faeout = 1, a.outoffsety = 100, a = fakePositions(o, a, t)) : "stack" == a.anim && (a.scale = 0, a.inorigin = "center center", a.faeout = 1, a.ease = "punchgs.Power3.easeOut", a = fakePositions(o, a, t), a.ease = "Back.easeOut"), t.silent && (a.waits = 0, a.outwaits = 0, a.speed = 0, a.outspeed = 0), t.silentout && (a.outwaits = 0, a.outspeed = .4, a.speed = .4, a.ease = "punchgs.Power3.easeOut", a.easeout = a.ease), a.hooffset = t.overflowoffset, a.vooffset = t.overflowoffset, a.itemw + a.x - a.cwidth < 20 && a.itemw + a.x - a.cwidth > -20) {
            var r = a.itemw + a.x - a.cwidth;
            a.itemw = a.itemw - r
        }
        if (!o.hasClass("itemtoshow") && !o.hasClass("fitsinfilter") || a.skipanim) a.itemouttowait++, punchgs.TweenLite.set(o, {
            zIndex: 5
        }), o.removeClass("isvisiblenow"), o.css("opacity") > 0 ? "stack" == a.anim ? (punchgs.TweenLite.set(o, {
            zIndex: a.pageitemcounterfake + 100
        }), punchgs.TweenLite.to(o, a.outspeed / 2, {
            force3D: "auto",
            x: -20 - a.itemw,
            rotationY: 30,
            rotationX: 10,
            ease: Sine.easeInOut,
            delay: a.outwaits
        }), punchgs.TweenLite.to(o, .01, {
            force3D: "auto",
            zIndex: a.pageitemcounterfake,
            delay: a.outwaits + a.outspeed / 3
        }), punchgs.TweenLite.to(o, .2 * a.outspeed, {
            force3D: "auto",
            delay: a.outwaits + .9 * a.outspeed,
            autoAlpha: 0,
            ease: Sine.easeInOut
        }), punchgs.TweenLite.to(o, a.outspeed / 3, {
            zIndex: 2,
            force3D: "auto",
            x: 0,
            scale: .9,
            rotationY: 0,
            rotationX: 0,
            ease: Sine.easeInOut,
            delay: a.outwaits + a.outspeed / 1.4,
            onComplete: function() {
                o.hasClass("itemtoshow") || punchgs.TweenLite.set(o, {
                    autoAlpha: 0,
                    overwrite: "all",
                    display: "none"
                }), a.itemouttowait--, 0 == a.itemouttowait && t.container.trigger("itemsinposition")
            }
        })) : "horizontal-flipbook" == a.anim || "vertical-flipbook" == a.anim ? punchgs.TweenLite.to(o, a.outspeed, {
            force3D: "auto",
            zIndex: 2,
            scale: a.scale,
            autoAlpha: a.outfade,
            transformOrigin: a.outorigin,
            rotationX: a.outxrot,
            rotationY: a.outyrot,
            ease: a.easeout,
            delay: a.outwaits,
            onComplete: function() {
                o.hasClass("itemtoshow") || punchgs.TweenLite.set(o, {
                    autoAlpha: 0,
                    overwrite: "all",
                    display: "none"
                }), a.itemouttowait--, 0 == a.itemouttowait && t.container.trigger("itemsinposition")
            }
        }) : "fall" == a.anim ? punchgs.TweenLite.to(o, a.outspeed, {
            zIndex: 2,
            force3D: "auto",
            y: a.outoffsety,
            autoAlpha: 0,
            ease: a.easeout,
            delay: a.outwaits,
            onComplete: function() {
                o.hasClass("itemtoshow") || punchgs.TweenLite.set(o, {
                    autoAlpha: 0,
                    overwrite: "all",
                    display: "none"
                }), a.itemouttowait--, 0 == a.itemouttowait && t.container.trigger("itemsinposition")
            }
        }) : "horizontal-slide" == a.anim ? punchgs.TweenLite.to(o, a.outspeed, {
            zIndex: 2,
            force3D: "auto",
            autoAlpha: 1,
            left: a.hooffset + o.position().left + a.hsoffsetout,
            top: a.vooffset + o.position().top,
            ease: a.easeout,
            delay: a.outwaits,
            onComplete: function() {
                punchgs.TweenLite.set(o, {
                    autoAlpha: 0,
                    overwrite: "all",
                    display: "none"
                }), a.itemouttowait--, 0 == a.itemouttowait && t.container.trigger("itemsinposition")
            }
        }) : "vertical-slide" == a.anim ? punchgs.TweenLite.to(o, a.outspeed, {
            zIndex: 2,
            force3D: "auto",
            autoAlpha: 1,
            left: a.hooffset + o.position().left,
            top: a.vooffset + o.position().top + a.vsoffsetout,
            ease: a.easeout,
            delay: a.outwaits,
            onComplete: function() {
                punchgs.TweenLite.set(o, {
                    autoAlpha: 0,
                    overwrite: "all",
                    display: "none"
                }), a.itemouttowait--, 0 == a.itemouttowait && t.container.trigger("itemsinposition")
            }
        }) : "rotatefall" == a.anim && o.css("opacity") > 0 ? (punchgs.TweenLite.set(o, {
            zIndex: 300 - a.item
        }), punchgs.TweenLite.to(o, a.outspeed / 2, {
            force3D: "auto",
            transformOrigin: a.outorigin,
            ease: "punchgs.Bounce.easeOut",
            rotationZ: a.rotatez,
            delay: a.outwaits
        }), punchgs.TweenLite.to(o, a.outspeed / 2, {
            zIndex: 2,
            force3D: "auto",
            autoAlpha: 0,
            y: a.outoffsety,
            ease: punchgs.Power3.easeIn,
            delay: a.outwaits + a.outspeed / 3
        })) : punchgs.TweenLite.to(o, a.outspeed, {
            force3D: "auto",
            zIndex: 2,
            scale: a.scale,
            autoAlpha: a.outfade,
            transformOrigin: a.outorigin,
            rotationX: a.outxrot,
            rotationY: a.outyrot,
            ease: a.easeout,
            delay: a.outwaits,
            onComplete: function() {
                o.hasClass("itemtoshow") || punchgs.TweenLite.set(o, {
                    autoAlpha: 0,
                    overwrite: "all",
                    display: "none"
                }), a.itemouttowait--, 0 == a.itemouttowait && t.container.trigger("itemsinposition")
            }
        }) : punchgs.TweenLite.set(o, {
            zIndex: 2,
            scale: a.scale,
            autoAlpha: 0,
            transformOrigin: a.outorigin,
            rotationX: a.outxrot,
            rotationY: a.outyrot,
            onComplete: function() {
                o.hasClass("itemtoshow") || punchgs.TweenLite.set(o, {
                    autoAlpha: 0,
                    overwrite: "all",
                    display: "none"
                }), a.itemouttowait--, 0 == a.itemouttowait && t.container.trigger("itemsinposition")
            }
        }), a = shiftGridFake(a, t);
        else {
            o.addClass("isvisiblenow"), "even" != t.layout ? (a.currentcolumnheight[a.idealcol] = a.currentcolumnheight[a.idealcol] + a.itemh + parseInt(t.space), a.ulcurheight < a.currentcolumnheight[a.idealcol] && (a.ulcurheight = a.currentcolumnheight[a.idealcol])) : a.ulcurheight = a.y + a.itemh, a.maxheight < a.ulcurheight && (a.maxheight = a.ulcurheight), a.itemtowait++;
            var n = Math.round(a.hooffset + a.x),
                s = Math.round(a.vooffset + a.y);
            "on" == t.rtl && (n = a.ulwidth - n - a.itemw), 0 == o.css("opacity") && "fade" == a.anim ? punchgs.TweenLite.set(o, {
                opacity: 0,
                autoAlpha: 0,
                width: a.itemw,
                height: a.itemh,
                scale: 1,
                left: n,
                y: 0,
                top: s,
                overwrite: "all"
            }) : 0 == o.css("opacity") && "scale" == a.anim ? punchgs.TweenLite.set(o, {
                width: a.itemw,
                height: a.itemh,
                scale: 0,
                left: n,
                y: 0,
                top: s,
                overwrite: "all"
            }) : 0 == o.css("opacity") && "rotatescale" == a.anim ? punchgs.TweenLite.set(o, {
                width: a.itemw,
                height: a.itemh,
                scale: 1,
                left: n,
                top: s,
                xPercent: 150,
                yPercent: 150,
                rotationZ: 20,
                overwrite: "all"
            }) : 0 == o.css("opacity") && "fall" == a.anim ? punchgs.TweenLite.set(o, {
                width: a.itemw,
                height: a.itemh,
                scale: .5,
                left: n,
                top: s,
                y: 0,
                overwrite: "all"
            }) : 0 == o.css("opacity") && "rotatefall" == a.anim && punchgs.TweenLite.set(o, {
                autoAlpha: 0,
                width: a.itemw,
                height: a.itemh,
                left: n,
                rotationZ: 0,
                top: s,
                y: 0,
                overwrite: "all"
            }), 0 != o.css("opacity") || "vertical-flip" != a.anim && "horizontal-flip" != a.anim && "vertical-flipbook" != a.anim && "horizontal-flipbook" != a.anim || punchgs.TweenLite.set(o, {
                autoAlpha: a.infade,
                zIndex: 10,
                scale: 1,
                y: 0,
                transformOrigin: a.inorigin,
                rotationX: a.inxrot,
                rotationY: a.inyrot,
                width: a.itemw,
                height: a.itemh,
                left: n,
                top: s,
                overwrite: "all"
            }), "stack" == a.anim && punchgs.TweenLite.set(o, {
                zIndex: a.pageitemcounter,
                scale: .5,
                autoAlpha: 1,
                left: n,
                top: s
            }), "horizontal-slide" == a.anim && 0 == o.css("opacity") && punchgs.TweenLite.set(o, {
                autoAlpha: 1,
                left: Math.round(a.hooffset + (a.x - a.hsoffset)),
                top: s,
                width: a.itemw,
                height: a.itemh
            }), "vertical-slide" == a.anim && 0 == o.css("opacity") && punchgs.TweenLite.set(o, {
                autoAlpha: 1,
                left: n,
                top: Math.round(a.vooffset + a.y - a.vsoffset),
                width: a.itemw,
                height: a.itemh
            });
            var l = o.find(".esg-entry-cover"),
                u = o.find(".esg-entry-media");
            if (l && u) {
                var d = u.height(),
                    c = o.find(".esg-cc");
                punchgs.TweenLite.to(l, .01, {
                    height: d,
                    ease: a.ease,
                    delay: a.waits
                }), punchgs.TweenLite.to(c, .01, {
                    top: (d - c.height()) / 2,
                    ease: a.ease,
                    delay: a.waits
                })
            }
            punchgs.TweenLite.to(o, a.speed, {
                force3D: "auto",
                autoAlpha: 1,
                scale: 1,
                transformOrigin: a.inorigin,
                rotationX: 0,
                rotationY: 0,
                y: 0,
                x: 0,
                xPercent: 0,
                yPercent: 0,
                z: .1,
                rotationZ: 0,
                left: n,
                top: s,
                ease: a.ease,
                delay: a.waits,
                onComplete: function() {
                    o.hasClass("itemtoshow") && punchgs.TweenLite.set(o, {
                        autoAlpha: 1,
                        overwrite: "all"
                    }), a.itemtowait--, 0 == a.itemtowait && (t.container.trigger("itemsinposition"), o.closest(".mainul").removeClass("gridorganising"))
                }
            }), o.find("iframe").length > 0 && o.find("iframe").each(function() {
                var e = jQuery(this),
                    a = Math.round(e.data("neww")),
                    i = Math.round(e.data("newh"));
                "even" != t.layout ? (punchgs.TweenLite.set(o.find(".esg-media-poster"), {
                    width: a,
                    height: i
                }), punchgs.TweenLite.set(o.find("iframe"), {
                    width: a,
                    height: i
                })) : (punchgs.TweenLite.set(o.find(".esg-media-poster"), {
                    width: "100%",
                    height: "100%"
                }), punchgs.TweenLite.set(o.find("iframe"), {
                    width: "100%",
                    height: "100%"
                }))
            }), o.find(".video-eg").length > 0 && o.find(".video-eg").each(function() {
                var e = jQuery(this),
                    a = e.data("neww"),
                    i = e.data("newh");
                "even" != t.layout ? (punchgs.TweenLite.set(o.find(".esg-media-poster"), {
                    width: a,
                    height: i
                }), punchgs.TweenLite.set(o.find(".esg-entry-media"), {
                    width: a,
                    height: i
                }), punchgs.TweenLite.set(o.find(".video-eg"), {
                    width: a,
                    height: i
                })) : (punchgs.TweenLite.set(o.find(".esg-media-poster"), {
                    width: "100%",
                    height: "100%"
                }), punchgs.TweenLite.set(o.find(".esg-entry-media"), {
                    width: "100%",
                    height: "100%"
                }), punchgs.TweenLite.set(o.find(".video-eg"), {
                    width: "100%",
                    height: "100%"
                }))
            }), "masonry" == t.layout && (a.col = a.backupcol), a = shiftGrid(a, t, o)
        }
        return a
    }

    function fakePositions(e, t, a) {
        if (!e.hasClass("itemtoshow") && !e.hasClass("fitsinfilter") || t.skipanim) {
            var o = e.data("col"),
                i = e.data("row");
            (o == undefined || i == undefined) && 0 != t.x && 0 != t.y && (t.x = Math.round(t.fakecol * t.itemw), t.y = t.fakey, o = t.fakecol, i = t.fakerow, e.data("col", t.fakecol), e.data("row", t.fakerow)), t.outwaits = "rotatefall" == t.anim ? (a.column - o) * t.delaybasic + i * t.delaybasic * a.column : o * t.delaybasic + i * t.delaybasic * a.column
        } else;
        return t
    }

    function shiftGrid(e, t, a) {
        if (a.data("col", e.col), a.data("row", e.row), e.pageitemcounter++, e.col = e.col + e.verticalsteps, e.allcol++, e.col == t.column && (e.col = 0, e.row++, e.allrow++, e.y = parseFloat(e.y) + parseFloat(e.itemh) + parseFloat(t.space), e.row == t.row && (e.row = 0, e.pageitemcounter >= t.column * t.row && (e.pageitemcounter = 0), e.pagetoanimate = e.pagetoanimate + 1, e.pagecounter++, 0 == e.pageitemcounter)))
            for (var o = 0; o < t.column; o++) e.currentcolumnheight[o] = 0;
        return e
    }

    function shiftGridFake(e, t) {
        return e.fakecol = e.fakecol + 1, e.pageitemcounterfake++, e.fakecol == t.column && (e.fakecol = 0, e.fakerow++, e.fakey = e.fakey + e.itemh + t.space, e.fakerow == t.row && (e.fakerow = 0, e.pageitemcounterfake = 0)), e
    }

    function loadVideoApis(e) {
        var t = 0,
            a = 0,
            o = 0,
            i = 0,
            r = 0,
            n = "http";
        "https:" === location.protocol && (n = "https"), e.find("iframe").each(function() {
            try {
                if (jQuery(this).attr("src").indexOf("you") > 0 && 0 == t) {
                    t = 1;
                    var e = document.createElement("script"),
                        a = "https";
                    e.src = a + "://www.youtube.com/iframe_api";
                    var o = document.getElementsByTagName("script")[0],
                        i = !0;
                    jQuery("head").find("*").each(function() {
                        jQuery(this).attr("src") == a + "://www.youtube.com/iframe_api" && (i = !1)
                    }), i && o.parentNode.insertBefore(e, o)
                }
            } catch (r) {}
        }), e.find("iframe").each(function() {
            try {
                if (jQuery(this).attr("src").indexOf("ws") > 0 && 0 == o) {
                    o = 1;
                    var e = document.createElement("script");
                    e.src = n + "://fast.wistia.com/assets/external/E-v1.js";
                    var t = document.getElementsByTagName("script")[0],
                        a = !0;
                    jQuery("head").find("*").each(function() {
                        jQuery(this).attr("src") == n + "://fast.wistia.com/assets/external/E-v1.js" && (a = !1)
                    }), a && t.parentNode.insertBefore(e, t)
                }
            } catch (i) {}
        }), e.find("iframe").each(function() {
            try {
                if (jQuery(this).attr("src").indexOf("vim") > 0 && 0 == a) {
                    a = 1;
                    var e = document.createElement("script");
                    e.src = n + "://a.vimeocdn.com/js/froogaloop2.min.js";
                    var t = document.getElementsByTagName("script")[0],
                        o = !0;
                    jQuery("head").find("*").each(function() {
                        jQuery(this).attr("src") == n + "://a.vimeocdn.com/js/froogaloop2.min.js" && (o = !1)
                    }), o && t.parentNode.insertBefore(e, t)
                }
            } catch (i) {}
        }), e.find("iframe").each(function() {
            try {
                if (jQuery(this).attr("src").indexOf("soundcloud") > 0 && 0 == r) {
                    r = 1;
                    var e = document.createElement("script");
                    e.src = n + "://w.soundcloud.com/player/api.js";
                    var t = document.getElementsByTagName("script")[0],
                        a = !0;
                    jQuery("head").find("*").each(function() {
                        jQuery(this).attr("src") == n + "://w.soundcloud.com/player/api.js" && (a = !1)
                    }), a && t.parentNode.insertBefore(e, t)
                }
            } catch (o) {}
        });
        var s = {
            youtube: t,
            vimeo: a,
            wistia: o,
            soundcloud: r,
            htmlvid: i
        };
        return s
    }

    function toHHMMSS() {
        var e = new Date,
            t = Math.floor(e) / 1e3,
            a = Math.floor(t / 60),
            o = Math.floor(a / 60),
            i = Math.floor(o / 24),
            o = o - 24 * i,
            a = a - 24 * i * 60 - 60 * o,
            t = t - 24 * i * 60 * 60 - 60 * o * 60 - 60 * a;
        return o + ":" + a + ":" + t
    }

    function stopAllVideos(e, t, a) {
        var o = ".isplaying";
        e && (o = ""), jQuery(".esg-youtubevideo.haslistener" + o).each(function() {
            var t = jQuery(this),
                o = t.data("player");
            a != t.attr("id") && (o.pauseVideo(), e && forceVideoInPause(t, !0, o, "youtube"))
        }), jQuery(".esg-vimeovideo.haslistener" + o).each(function() {
            var t = jQuery(this),
                o = t.attr("id"),
                i = $f(o);
            a != o && (i.api("pause"), a === undefined && e && forceVideoInPause(t, !0, i, "vimeo"))
        }), jQuery(".esg-wistiavideo.haslistener" + o).each(function() {
            var t = jQuery(this),
                o = t.data("player");
            a != t.attr("id") && (t.wistiaApi.pause(), e && forceVideoInPause(t, !0, o, "wistia"))
        }), jQuery(".esg-htmlvideo.haslistener" + o).each(function() {
            var t = jQuery(this),
                o = t.attr("id"),
                i = document.getElementById(o);
            a != o && (i.pause(), e && forceVideoInPause(t, !0, i, "html5vid"))
        }), jQuery(".esg-soundcloud" + o).each(function() {
            var t = jQuery(this),
                o = t.data("player");
            a != t.attr("id") && (o.pause(), e && forceVideoInPause(t, !0, o, "soundcloud"))
        })
    }

    function forceVideoInPause(e, t, a, o) {
        e.removeClass("isplaying");
        var i = e.closest(".tp-esg-item");
        if (i.find(".esg-media-video").length > 0 && !jQuery("body").data("fullScreenMode")) {
            var r = i.find(".esg-entry-cover"),
                n = i.find(".esg-media-poster");
            if (n.length > 0)
                if (is_mobile() ? (punchgs.TweenLite.set(r, {
                        autoAlpha: 1
                    }), punchgs.TweenLite.set(n, {
                        autoAlpha: 1
                    }), punchgs.TweenLite.set(e, {
                        autoAlpha: 0
                    })) : (punchgs.TweenLite.to(r, .5, {
                        autoAlpha: 1
                    }), punchgs.TweenLite.to(n, .5, {
                        autoAlpha: 1
                    }), punchgs.TweenLite.to(e, .5, {
                        autoAlpha: 0
                    })), t)
                    if ("youtube" == o) try {
                        a.destroy()
                    } catch (s) {} else if ("vimeo" == o) try {
                            a.api("unload")
                        } catch (s) {} else if ("wistia" == o) try {
                            a.end()
                        } catch (s) {} else "html5vid" != o && (e.removeClass("haslistener"), e.removeClass("readytoplay"));
                        else setTimeout(function() {
                            is_mobile() || e.css({
                                display: "none"
                            })
                        }, 500)
        }
    }

    function onPlayerStateChange(e) {
        var t = e.target.getVideoEmbedCode(),
            a = jQuery("#" + t.split('id="')[1].split('"')[0]),
            o = a.data("player");
        e.data == YT.PlayerState.PLAYING && (o.setPlaybackQuality("hd1080"), stopAllVideos(!0, !1, a.attr("id")), a.addClass("isplaying"), a.removeClass("isinpause")), 2 == e.data && forceVideoInPause(a), 0 == e.data && forceVideoInPause(a)
    }

    function vimeoready_auto(e) {
        var t = $f(e),
            a = jQuery("#" + e);
        t.addEvent("ready", function() {
            a.addClass("readytoplay"), t.addEvent("play", function() {
                stopAllVideos(!0, !1, e), a.addClass("isplaying"), a.removeClass("isinpause")
            }), t.addEvent("finish", function() {
                forceVideoInPause(a), a.removeClass("isplaying")
            }), t.addEvent("pause", function() {
                forceVideoInPause(a), a.removeClass("isplaying")
            })
        })
    }

    function addEvent(e, t, a) {
        e.addEventListener ? e.addEventListener(t, a, !1) : e.attachEvent(t, a, !1)
    }

    function html5vidready(e, t, a) {
        t.addClass("readytoplay"), t.on("play", function() {
            stopAllVideos(!0, !1, a), t.addClass("isplaying"), t.removeClass("isinpause")
        }), t.on("pause", function() {
            forceVideoInPause(t), t.removeClass("isplaying")
        }), t.on("ended", function() {
            forceVideoInPause(t), t.removeClass("isplaying")
        })
    }

    function prepareYT(e) {
        var t = "ytiframe" + Math.round(1e5 * Math.random() + 1);
        if (e.hasClass("haslistener") || "undefined" == typeof YT) {
            var a = e.data("player");
            return a != undefined && "function" == typeof a.playVideo ? !0 : !1
        }
        try {
            e.attr("id", t);
            var a = new YT.Player(t, {
                events: {
                    onStateChange: onPlayerStateChange
                }
            });
            e.data("player", a), e.addClass("haslistener").addClass("esg-youtubevideo")
        } catch (o) {
            return !1
        }
    }

    function playYT(e) {
        var t = e.data("player");
        t != undefined && "function" == typeof t.playVideo && t.playVideo()
    }

    function prepareVimeo(e) {
        if (e.hasClass("haslistener") || "undefined" == typeof $f) {
            if (typeof $f != undefined && "undefined" != typeof $f) {
                var t = $f(e.attr("id"));
                return "function" == typeof t.api && e.hasClass("readytoplay") ? !0 : !1
            }
            return !1
        }
        try {
            var a = "vimeoiframe" + Math.round(1e5 * Math.random() + 1);
            e.attr("id", a);
            for (var o, i = e.attr("src"), r = {}, n = i, s = /([^&=]+)=([^&]*)/g; o = s.exec(n);) r[decodeURIComponent(o[1])] = decodeURIComponent(o[2]);
            i = r.player_id != undefined ? i.replace(r.player_id, a) : i + "&player_id=" + a;
            try {
                i = i.replace("api=0", "api=1")
            } catch (l) {}
            i += "&api=1", e.attr("src", i);
            var u = e[0];
            $f(u).addEvent("ready", function() {
                vimeoready_auto(a)
            }), e.addClass("haslistener").addClass("esg-vimeovideo")
        } catch (l) {
            return !1
        }
    }

    function playVimeo(e) {
        var t = $f(e.attr("id"));
        t.api("play")
    }

    function prepareWs(e) {
        var t = "wsiframe" + Math.round(1e5 * Math.random() + 1);
        if (e.hasClass("haslistener") || "undefined" == typeof Ws) {
            var a = e.data("player");
            return a != undefined && "function" == typeof a.playVideo ? !0 : !1
        }
        try {
            e.attr("id", t);
            var a = new Ws.Player(t, {
                events: {
                    onStateChange: onPlayerStateChange
                }
            });
            e.data("player", a), e.addClass("haslistener").addClass("esg-wistiavideo")
        } catch (o) {
            return !1
        }
    }

    function playWs(e) {
        var t = e.data("player");
        t != undefined && "function" == typeof t.playVideo && t.wistiaApi.Plau()
    }

    function prepareSoundCloud(e) {
        if (e.data("player") != undefined || "undefined" == typeof SC) {
            var t = e.data("player");
            return t != undefined && "function" == typeof t.getVolume ? !0 : !1
        }
        var a = "sciframe" + Math.round(1e5 * Math.random() + 1);
        try {
            e.attr("id", a);
            var t = SC.Widget(a);
            t.bind(SC.Widget.Events.PLAY, function() {
                stopAllVideos(!0, !1, e.attr("id")), e.addClass("isplaying"), e.removeClass("isinpause")
            }), t.bind(SC.Widget.Events.PAUSE, function() {
                forceVideoInPause(e), e.removeClass("isplaying")
            }), t.bind(SC.Widget.Events.FINISH, function() {
                forceVideoInPause(e), e.removeClass("isplaying")
            }), e.data("player", t), e.addClass("haslistener").addClass("esg-soundcloud")
        } catch (o) {
            return !1
        }
    }

    function playSC(e) {
        var t = e.data("player");
        t != undefined && "function" == typeof t.getVolume && setTimeout(function() {
            t.play()
        }, 500)
    }

    function prepareVideo(e) {
        if (e.hasClass("haslistener")) try {
            var t = e.attr("id"),
                a = document.getElementById(t);
            return "function" == typeof a.play && e.hasClass("readytoplay") ? !0 : !1
        } catch (o) {
            return !1
        } else {
            var i = "videoid_" + Math.round(1e5 * Math.random() + 1);
            e.attr("id", i);
            var a = document.getElementById(i);
            a.oncanplay = html5vidready(a, e, i), e.addClass("haslistener").addClass("esg-htmlvideo")
        }
    }

    function playVideo(e) {
        var t = e.attr("id"),
            a = document.getElementById(t);
        a.play()
    }
    var esgAnimmatrix = [
        [".esg-none", 0, {
            autoAlpha: 1,
            rotationZ: 0,
            x: 0,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        }, {
            autoAlpha: 1,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, 0, {
            autoAlpha: 1,
            overwrite: "all"
        }],
        [".esg-fade", .3, {
            autoAlpha: 0,
            rotationZ: 0,
            x: 0,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        }, {
            autoAlpha: 1,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-fadeout", .3, {
            autoAlpha: 1,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, {
            autoAlpha: 0,
            rotationZ: 0,
            x: 0,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        }, .3, {
            autoAlpha: 1,
            rotationZ: 0,
            x: 0,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-covergrowup", .3, {
            autoAlpha: 1,
            top: "100%",
            marginTop: -10,
            rotationZ: 0,
            x: 0,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        }, {
            autoAlpha: 1,
            top: "0%",
            marginTop: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 1,
            top: "100%",
            marginTop: -10,
            bottom: 0,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, !0],
        [".esg-flipvertical", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            rotationX: 180,
            autoAlpha: 0,
            z: -.001,
            transformOrigin: "50% 50%"
        }, {
            rotationX: 0,
            autoAlpha: 1,
            scale: 1,
            z: .001,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, .5, {
            rotationX: 180,
            autoAlpha: 0,
            scale: 1,
            z: -.001,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, !0],
        [".esg-flipverticalout", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            rotationX: 0,
            autoAlpha: 1,
            z: .001,
            transformOrigin: "50% 50%"
        }, {
            rotationX: -180,
            scale: 1,
            autoAlpha: 0,
            z: -150,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, .5, {
            rotationX: 0,
            autoAlpha: 1,
            scale: 1,
            z: 0,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }],
        [".esg-fliphorizontal", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            rotationY: 180,
            autoAlpha: 0,
            z: -.001,
            transformOrigin: "50% 50%"
        }, {
            rotationY: 0,
            autoAlpha: 1,
            scale: 1,
            z: .001,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, .5, {
            rotationY: 180,
            autoAlpha: 0,
            scale: 1,
            z: -.001,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, !0],
        [".esg-fliphorizontalout", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            z: .001,
            transformOrigin: "50% 50%"
        }, {
            rotationY: -180,
            scale: 1,
            autoAlpha: 0,
            z: -150,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, .5, {
            rotationY: 0,
            autoAlpha: 1,
            scale: 1,
            z: .001,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }],
        [".esg-flipup", .5, {
            x: 0,
            y: 0,
            scale: .8,
            rotationZ: 0,
            rotationX: 90,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            z: .001,
            transformOrigin: "50% 100%"
        }, {
            scale: 1,
            rotationX: 0,
            autoAlpha: 1,
            z: .001,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, .3, {
            scale: .8,
            rotationX: 90,
            autoAlpha: 0,
            z: .001,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, !0],
        [".esg-flipupout", .5, {
            rotationX: 0,
            autoAlpha: 1,
            y: 0,
            ease: punchgs.Bounce.easeOut,
            overwrite: "all"
        }, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: -90,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            z: .001,
            transformOrigin: "50% 0%"
        }, .3, {
            rotationX: 0,
            autoAlpha: 1,
            y: 0,
            ease: punchgs.Bounce.easeOut,
            overwrite: "all"
        }],
        [".esg-flipdown", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: -90,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            z: .001,
            transformOrigin: "50% 0%"
        }, {
            rotationX: 0,
            autoAlpha: 1,
            y: 0,
            ease: punchgs.Bounce.easeOut,
            overwrite: "all"
        }, .3, {
            rotationX: -90,
            z: 0,
            ease: punchgs.Power2.easeOut,
            autoAlpha: 0,
            overwrite: "all"
        }, !0],
        [".esg-flipdownout", .5, {
            scale: 1,
            rotationX: 0,
            autoAlpha: 1,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, {
            x: 0,
            y: 0,
            scale: .8,
            rotationZ: 0,
            rotationX: 90,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            z: .001,
            transformOrigin: "50% 100%"
        }, .3, {
            scale: 1,
            rotationX: 0,
            autoAlpha: 1,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-flipright", .5, {
            x: 0,
            y: 0,
            scale: .8,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 90,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "0% 50%"
        }, {
            scale: 1,
            rotationY: 0,
            autoAlpha: 1,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            scale: .8,
            rotationY: 90,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, !0],
        [".esg-fliprightout", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            rotationY: 0,
            autoAlpha: 1,
            transformOrigin: "100% 50%"
        }, {
            scale: 1,
            rotationY: -90,
            autoAlpha: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, .3, {
            scale: 1,
            z: 0,
            rotationY: 0,
            autoAlpha: 1,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-flipleft", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: -90,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "100% 50%"
        }, {
            rotationY: 0,
            autoAlpha: 1,
            z: .001,
            scale: 1,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            rotationY: -90,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, !0],
        [".esg-flipleftout", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            rotationY: 0,
            autoAlpha: 1,
            transformOrigin: "0% 50%"
        }, {
            scale: 1,
            rotationY: 90,
            autoAlpha: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, .3, {
            scale: 1,
            z: 0,
            rotationY: 0,
            autoAlpha: 1,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-turn", .5, {
            x: 50,
            y: 0,
            scale: 0,
            rotationZ: 0,
            rotationX: 0,
            rotationY: -40,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "50% 50%"
        }, {
            scale: 1,
            x: 0,
            rotationY: 0,
            autoAlpha: 1,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, .3, {
            scale: 0,
            rotationY: -40,
            autoAlpha: 1,
            z: 0,
            x: 50,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, !0],
        [".esg-turnout", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "50% 50%"
        }, {
            scale: 1,
            rotationY: 40,
            scale: .6,
            autoAlpha: 0,
            x: -50,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, .3, {
            scale: 1,
            rotationY: 0,
            z: 0,
            autoAlpha: 1,
            x: 0,
            rotationX: 0,
            rotationZ: 0,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }],
        [".esg-slide", .5, {
            x: -1e4,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 1,
            x: -1e4,
            y: 0,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-slideout", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-slideright", .5, {
            xPercent: -50,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            xPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            xPercent: -50,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-sliderightout", .5, {
            autoAlpha: 1,
            xPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            xPercent: 50,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            xPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-scaleleft", .5, {
            x: 0,
            y: 0,
            scaleX: 0,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "100% 50%"
        }, {
            autoAlpha: 1,
            x: 0,
            scaleX: 1,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 1,
            x: 0,
            z: 0,
            scaleX: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-scaleright", .5, {
            x: 0,
            y: 0,
            scaleX: 0,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "0% 50%"
        }, {
            autoAlpha: 1,
            x: 0,
            scaleX: 1,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 1,
            x: 0,
            z: 0,
            scaleX: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-slideleft", .5, {
            xPercent: 50,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            xPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            xPercent: 50,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-slideleftout", .5, {
            autoAlpha: 1,
            xPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            xPercent: -50,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            xPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-slideup", .5, {
            x: 0,
            yPercent: 50,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            yPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            yPercent: 50,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-slideupout", .5, {
            autoAlpha: 1,
            yPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            x: 0,
            yPercent: -50,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            yPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-slidedown", .5, {
            x: 0,
            yPercent: -50,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            yPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            yPercent: -50,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-slidedownout", .5, {
            autoAlpha: 1,
            yPercent: 0,
            z: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            x: 0,
            yPercent: 50,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            z: 10,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            yPercent: 0,
            z: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-slideshortright", .5, {
            x: -30,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            x: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            x: -30,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-slideshortrightout", .5, {
            autoAlpha: 1,
            x: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            x: 30,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            x: 30,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-slideshortleft", .5, {
            x: 30,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            x: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            x: 30,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-slideshortleftout", .5, {
            autoAlpha: 1,
            x: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            x: -30,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            x: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-slideshortup", .5, {
            x: 0,
            y: 30,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            y: 30,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-slideshortupout", .5, {
            autoAlpha: 1,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            x: 0,
            y: -30,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-slideshortdown", .5, {
            x: 0,
            y: -30,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            y: -30,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-slideshortdownout", .5, {
            autoAlpha: 1,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            x: 0,
            y: 30,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-skewright", .5, {
            xPercent: -100,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 60,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            xPercent: 0,
            skewX: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            skewX: -60,
            xPercent: -100,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-skewrightout", .5, {
            autoAlpha: 1,
            xPercent: 0,
            skewX: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            xPercent: 100,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: -60,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            xPercent: 0,
            skewX: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-skewleft", .5, {
            xPercent: 100,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: -60,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            xPercent: 0,
            skewX: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            xPercent: 100,
            z: 0,
            skewX: 60,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-skewleftout", .5, {
            autoAlpha: 1,
            xPercent: 0,
            skewX: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            xPercent: -100,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 60,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            xPercent: 0,
            skewX: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-shifttotop", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 1,
            y: 0,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-rollleft", .5, {
            xPercent: 50,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            rotationZ: 90,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            xPercent: 0,
            rotationZ: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            xPercent: 50,
            z: 0,
            rotationZ: 90,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-rollleftout", .5, {
            autoAlpha: 1,
            xPercent: 0,
            rotationZ: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            xPercent: 50,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            rotationZ: 90,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            xPercent: 0,
            rotationZ: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-rollright", .5, {
            xPercent: -50,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            rotationZ: -90,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            xPercent: 0,
            rotationZ: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            xPercent: -50,
            rotationZ: -90,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-rollrightout", .5, {
            autoAlpha: 1,
            xPercent: 0,
            rotationZ: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, {
            xPercent: -50,
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            rotationZ: -90,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            xPercent: 0,
            rotationZ: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-falldown", .4, {
            x: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            yPercent: -100
        }, {
            autoAlpha: 1,
            yPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .4, {
            yPercent: -100,
            autoAlpha: 0,
            z: 0,
            ease: punchgs.Power2.easeOut,
            delay: .2,
            overwrite: "all"
        }],
        [".esg-falldownout", .4, {
            autoAlpha: 1,
            yPercent: 0,
            ease: punchgs.Back.easeOut,
            overwrite: "all"
        }, {
            x: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            yPercent: 100
        }, .4, {
            autoAlpha: 1,
            yPercent: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }],
        [".esg-rotatescale", .3, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            rotationZ: 80,
            scale: .6,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            scale: 1,
            rotationZ: 0,
            ease: punchgs.Back.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            scale: .6,
            z: 0,
            rotationZ: 80,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-rotatescaleout", .3, {
            autoAlpha: 1,
            scale: 1,
            rotationZ: 0,
            ease: punchgs.Back.easeOut,
            overwrite: "all"
        }, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            rotationZ: 80,
            scale: .6,
            transformOrigin: "50% 50%"
        }, .3, {
            autoAlpha: 1,
            scale: 1,
            rotationZ: 0,
            ease: punchgs.Back.easeOut,
            overwrite: "all"
        }],
        [".esg-zoomintocorner", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "20% 50%"
        }, {
            autoAlpha: 1,
            scale: 1.2,
            x: 0,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .5, {
            autoAlpha: 0,
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-zoomouttocorner", .5, {
            x: 0,
            y: 0,
            scale: 1.2,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "80% 50%"
        }, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .5, {
            autoAlpha: 0,
            x: 0,
            y: 0,
            scale: 1.2,
            autoAlpha: 1,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-zoomtodefault", .5, {
            x: 0,
            y: 0,
            scale: 1.2,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .5, {
            autoAlpha: 0,
            x: 0,
            y: 0,
            scale: 1.2,
            autoAlpha: 1,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-zoomback", .5, {
            x: 0,
            y: 0,
            scale: .2,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            ease: punchgs.Back.easeOut,
            overwrite: "all"
        }, .5, {
            autoAlpha: 0,
            x: 0,
            y: 0,
            scale: .2,
            autoAlpha: 0,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-zoombackout", .5, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            ease: punchgs.Back.easeOut,
            overwrite: "all"
        }, {
            x: 0,
            y: 0,
            scale: .2,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .5, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            ease: punchgs.Back.easeOut,
            overwrite: "all"
        }],
        [".esg-zoomfront", .5, {
            x: 0,
            y: 0,
            scale: 1.5,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .5, {
            autoAlpha: 0,
            x: 0,
            y: 0,
            scale: 1.5,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-zoomfrontout", .5, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            ease: punchgs.Back.easeOut,
            overwrite: "all"
        }, {
            x: 0,
            y: 0,
            scale: 1.5,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            transformOrigin: "50% 50%"
        }, .5, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            ease: punchgs.Back.easeOut,
            overwrite: "all"
        }],
        [".esg-flyleft", .8, {
            x: -80,
            y: 0,
            z: 0,
            scale: .3,
            rotationZ: 0,
            rotationY: 75,
            rotationX: 10,
            skewX: 0,
            skewY: 0,
            autoAlpha: .01,
            transformOrigin: "30% 10%"
        }, {
            x: 0,
            y: 0,
            rotationY: 0,
            z: .001,
            rotationX: 0,
            rotationZ: 0,
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            z: 0,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, .8, {
            autoAlpha: .01,
            x: -40,
            y: 0,
            z: 300,
            rotationY: 60,
            rotationX: 20,
            overwrite: "all"
        }],
        [".esg-flyleftout", .8, {
            x: 0,
            y: 0,
            rotationY: 0,
            z: .001,
            rotationX: 0,
            rotationZ: 0,
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            z: 0,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, {
            x: -80,
            y: 0,
            z: 0,
            scale: .3,
            rotationZ: 0,
            rotationY: 75,
            rotationX: 10,
            skewX: 0,
            skewY: 0,
            autoAlpha: .01,
            transformOrigin: "30% 10%"
        }, .8, {
            x: 0,
            y: 0,
            rotationY: 0,
            z: .001,
            rotationX: 0,
            rotationZ: 0,
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            z: 0,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }],
        [".esg-flyright", .8, {
            scale: 1,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            x: 80,
            y: 0,
            z: 0,
            scale: .3,
            rotationZ: 0,
            rotationY: -75,
            rotationX: 10,
            transformOrigin: "70% 20%"
        }, {
            x: 0,
            y: 0,
            rotationY: 0,
            z: .001,
            rotationX: 0,
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            z: 0,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, .8, {
            autoAlpha: 0,
            x: 40,
            y: -40,
            z: 300,
            rotationY: -60,
            rotationX: -40,
            overwrite: "all"
        }],
        [".esg-flyrightout", .8, {
            x: 0,
            y: 0,
            rotationY: 0,
            z: .001,
            rotationX: 0,
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            z: 0,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }, {
            scale: 1,
            skewX: 0,
            skewY: 0,
            autoAlpha: 0,
            x: 80,
            y: 0,
            z: 0,
            scale: .3,
            rotationZ: 0,
            rotationY: -75,
            rotationX: 10,
            transformOrigin: "70% 20%"
        }, .8, {
            x: 0,
            y: 0,
            rotationY: 0,
            z: .001,
            rotationX: 0,
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            z: 0,
            ease: punchgs.Power3.easeInOut,
            overwrite: "all"
        }],
        [".esg-mediazoom", .3, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            scale: 1.4,
            x: 0,
            y: 0,
            ease: punchgs.Back.easeOut,
            overwrite: "all"
        }, .3, {
            autoAlpha: 0,
            x: 0,
            y: 0,
            scale: 1,
            z: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-zoomandrotate", .6, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "50% 50%"
        }, {
            autoAlpha: 1,
            scale: 1.4,
            x: 0,
            y: 0,
            rotationZ: 30,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, .4, {
            x: 0,
            y: 0,
            scale: 1,
            z: 0,
            rotationZ: 0,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-pressback", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "50% 50%"
        }, {
            rotationY: 0,
            autoAlpha: 1,
            scale: .8,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            rotationY: 0,
            autoAlpha: 1,
            z: 0,
            scale: 1,
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }],
        [".esg-3dturnright", .5, {
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformPerspective: 600
        }, {
            x: -40,
            y: 0,
            scale: .8,
            rotationZ: 2,
            rotationX: 5,
            rotationY: -28,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            transformOrigin: "100% 50% 40%",
            transformPerspective: 600,
            ease: punchgs.Power3.easeOut,
            overwrite: "all"
        }, .3, {
            z: 0,
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0,
            autoAlpha: 1,
            force3D: "auto",
            ease: punchgs.Power2.easeOut,
            overwrite: "all"
        }, !0]
    ];
    jQuery.fn.extend({
        tpessential: function(e) {
            return jQuery.fn.tpessential.defaults = {
                forceFullWidth: "off",
                forceFullScreen: "off",
                fullScreenOffsetContainer: "",
                row: 3,
                column: 4,
                space: 10,
                pageAnimation: "fade",
                animSpeed: 600,
                delayBasic: .08,
                smartPagination: "on",
                paginationScrollToTop: "off",
                paginationScrollToTopOffset: 200,
                layout: "even",
                rtl: "off",
                aspectratio: "16:9",
                bgPosition: "center center",
                bgSize: "cover",
                videoJsPath: "",
                overflowoffset: 0,
                mainhoverdelay: 0,
                rowItemMultiplier: [],
                filterGroupClass: "",
                filterType: "",
                filterLogic: "or",
                showDropFilter: "hover",
                evenGridMasonrySkinPusher: "on",
                loadMoreType: "none",
                loadMoreItems: [],
                loadMoreAmount: 5,
                loadMoreTxt: "Load More",
                loadMoreNr: "on",
                loadMoreEndTxt: "No More Items for the Selected Filter",
                loadMoreAjaxUrl: "",
                loadMoreAjaxToken: "",
                loadMoreAjaxAction: "",
                lazyLoad: "off",
                lazyLoadColor: "#ff0000",
                gridID: 0,
                spinner: "",
                spinnerColor: "",
                lightBoxMode: "single",
                cobblesPattern: "",
                searchInput: ".faqsearch",
                googleFonts: "",
                googleFontJS: "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js",
                ajaxContentTarget: "",
                ajaxScrollToOnLoad: "off",
                ajaxScrollToOffset: 100,
                ajaxCallback: "",
                ajaxCallbackArgument: "on",
                ajaxCssUrl: "",
                ajaxJsUrl: "",
                ajaxCloseButton: "on",
                ajaxNavButton: "on",
                ajaxCloseTxt: "Close",
                ajaxCloseType: "type1",
                ajaxClosePosition: "tr",
                ajaxCloseInner: "true",
                ajaxCloseStyle: "light",
                ajaxTypes: [],
                cookies: {
                    search: "off",
                    filter: "off",
                    pagination: "off",
                    loadmore: "off",
                    timetosave: "30"
                }
            }, e = jQuery.extend({}, jQuery.fn.tpessential.defaults, e), "undefined" == typeof WebFontConfig && (WebFontConfig = new Object), this.each(function() {
                function t(e, t) {
                    mainPreparing(e, t), t.initialised = "ready", jQuery("body").trigger("essentialready", e.attr("id"))
                }

                function a(e, t) {
                    var a = e.offset().top + e.height() - jQuery(document).scrollTop();
                    jQuery(window).height() > a && 1 != t.data("loading") && (t.data("loading", 1), loadMoreItems(e, o))
                }
                var o = e,
                    i = jQuery(this);
                if (i == undefined) return !1;
                if (i.parent().css({
                        position: "relative"
                    }), "cobbles" == o.layout ? (o.layout = "even", o.evenCobbles = "on") : o.evenCobbles = "off", "true" != o.get && 1 != o.get) {
                    if (o.get = !0, o.filterGroupClass = o.filterGroupClass == undefined || 0 == o.filterGroupClass.length ? "#" + i.attr("id") : "." + o.filterGroupClass, 1 == window.tplogs) try {
                        console.groupCollapsed("Essential Grid  2.0.5 Initialisation on " + i.attr("id")), console.groupCollapsed("Used Options:"), console.info(e), console.groupEnd(), console.groupCollapsed("Tween Engine:")
                    } catch (r) {}
                    if (punchgs.TweenLite == undefined) {
                        if (1 == window.tplogs) try {
                            console.error("GreenSock Engine Does not Exist!")
                        } catch (r) {}
                        return !1
                    }
                    if (punchgs.force3D = !0, 1 == window.tplogs) try {
                        console.info("GreenSock Engine Version in Essential Grid:" + punchgs.TweenLite.version)
                    } catch (r) {}
                    if (punchgs.TweenLite.lagSmoothing(2e3, 16), punchgs.force3D = "auto", 1 == window.tplogs) try {
                        console.groupEnd(), console.groupEnd()
                    } catch (r) {}
                    jQuery("body").data("fullScreenMode", !1), jQuery(window).on("mozfullscreenchange webkitfullscreenchange fullscreenchange", function() {
                        jQuery("body").data("fullScreenMode", !jQuery("body").data("fullScreenMode"))
                    }), buildLoader(i.parent(), o), o.firstshowever == undefined && jQuery(o.filterGroupClass + ".esg-navigationbutton," + o.filterGroupClass + " .esg-navigationbutton").css({
                        visibility: "hidden"
                    }), i.parent().append('<div class="esg-relative-placeholder" style="width:100%;height:auto"></div>'), i.wrap('<div class="esg-container-fullscreen-forcer" style="position:relative;left:0px;top:0px;width:100%;height:auto;"></div>');
                    var n = i.parent().parent().find(".esg-relative-placeholder").offset().left;
                    ("on" == o.forceFullWidth || "on" == o.forceFullScreen) && i.closest(".esg-container-fullscreen-forcer").css({
                        left: 0 - n,
                        width: jQuery(window).width()
                    }), o.animDelay = 0 == o.delayBasic ? "off" : "on", o.container = i, i.find("ul").first().addClass("mainul").wrap('<div class="esg-overflowtrick"></div>');
                    var s = jQuery(o.filterGroupClass + ".esg-navbutton-solo-left," + o.filterGroupClass + " .esg-navbutton-solo-left"),
                        l = jQuery(o.filterGroupClass + ".esg-navbutton-solo-right," + o.filterGroupClass + " .esg-navbutton-solo-right");
                    s.length > 0 && (s.css({
                        marginTop: 0 - s.height() / 2
                    }), s.appendTo(i.find(".esg-overflowtrick"))), l.length > 0 && (l.css({
                        marginTop: 0 - l.height() / 2
                    }), l.appendTo(i.find(".esg-overflowtrick"))), punchgs.CSSPlugin.defaultTransformPerspective = 1200, o.animSpeed = o.animSpeed / 1e3, o.delayBasic = o.delayBasic / 100, setOptions(i, o), o.filter = o.statfilter, o.origcolumn = o.column, o.currentpage = 0, i.addClass("esg-layout-" + o.layout); {
                        loadVideoApis(i, o)
                    }
                    if ("even" == o.layout && "on" == o.forceFullScreen) {
                        var u = jQuery(window).height();
                        if (o.fullScreenOffsetContainer != undefined) try {
                            var d = o.fullScreenOffsetContainer.split(",");
                            d && jQuery.each(d, function(e, t) {
                                u -= jQuery(t).outerHeight(!0), u < o.minFullScreenHeight && (u = o.minFullScreenHeight)
                            })
                        } catch (r) {}
                        var c = i.find(".esg-overflowtrick").first(),
                            p = i.find("ul").first();
                        c.css({
                            display: "block",
                            height: u + "px"
                        }), p.css({
                            display: "block",
                            height: u + "px"
                        }), i.closest(".eg-grid-wrapper, .myportfolio-container").css({
                            height: "auto"
                        }).removeClass("eg-startheight")
                    }
                    if (0 != o.googleFonts.length && "masonry" == o.layout) {
                        var h = (o.googleFonts.length, !0);
                        if (jQuery("head").find("*").each(function() {
                                jQuery(this).attr("src") != undefined && jQuery(this).attr("src").indexOf("webfont.js") > 0 && (h = !1)
                            }), WebFontConfig.active == undefined && h) {
                            WebFontConfig = {
                                google: {
                                    families: o.googleFonts
                                },
                                active: function() {
                                    t(i, o)
                                },
                                inactive: function() {
                                    t(i, o)
                                },
                                timeout: 1500
                            };
                            var f = document.createElement("script");
                            f.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js", f.type = "text/javascript", f.async = "true";
                            var g = document.getElementsByTagName("script")[0];
                            g.parentNode.insertBefore(f, g)
                        } else t(i, o)
                    } else t(i, o);
                    if ("button" == o.loadMoreType) {
                        i.append('<div class="esg-loadmore-wrapper" style="text-align:center"><div class="esg-navigationbutton esg-loadmore">LOAD MORE</div></div>');
                        var w = i.find(".esg-loadmore"),
                            m = o.loadMoreTxt + " (" + checkMoreToLoad(i, o).length + ")";
                        "off" == o.loadMoreNr && (m = o.loadMoreTxt), w.html(m), w.click(function() {
                            1 != w.data("loading") && loadMoreItems(i, o)
                        }), 0 == checkMoreToLoad(i, o).length && w.remove()
                    } else if ("scroll" == o.loadMoreType) {
                        i.append('<div style="display:inline-block" class="esg-navigationbutton esg-loadmore">LOAD MORE</div>');
                        var w = i.find(".esg-loadmore"),
                            m = o.loadMoreTxt + " (" + checkMoreToLoad(i, o).length + ")";
                        "off" == o.loadMoreNr && (m = o.loadMoreTxt), w.html(m), jQuery(document, window).scroll(function() {
                            a(i, w)
                        }), a(i, w), 0 == checkMoreToLoad(i, o).length && w.remove()
                    }
                    checkAvailableFilters(i, o), tabBlurringCheck(i, o)
                }
            })
        },
        esappend: function() {
            var e = jQuery(this);
            return prepareItemsInGrid(opt, !0), organiseGrid(opt), prepareSortingAndOrders(e), opt.lastslide
        },
        esskill: function() {
            var e = jQuery(this);
            e.find("*").each(function() {
                jQuery(this).off("click, focus, focusin, hover, play, ended, stop, pause, essentialready"), jQuery(this).remove()
            }), e.remove(), e.html(), e = null
        },
        esreadsettings: function(e) {
            e = e == undefined ? new Object : e;
            var t = jQuery(this),
                a = getOptions(t);
            return a
        },
        esredraw: function(e) {
            e = e == undefined ? new Object : e;
            var t = jQuery(this),
                a = getOptions(t);
            if (e.space != undefined && (a.space = parseInt(e.space, 0)), e.row != undefined && (a.row = parseInt(e.row, 0)), e.rtl != undefined && (a.rtl = e.rtl), e.aspectratio != undefined && (a.aspectratio = e.aspectratio), e.forceFullWidth != undefined)
                if (a.forceFullWidth = e.forceFullWidth, "on" == a.forceFullWidth) {
                    var o = t.parent().parent().find(".esg-relative-placeholder").offset().left;
                    t.closest(".esg-container-fullscreen-forcer").css({
                        left: 0 - o,
                        width: jQuery(window).width()
                    })
                } else t.closest(".esg-container-fullscreen-forcer").css({
                    left: 0,
                    width: "auto"
                });
            if (e.rowItemMultiplier != undefined && (a.rowItemMultiplier = e.rowItemMultiplier), e.responsiveEntries != undefined && (a.responsiveEntries = e.responsiveEntries), e.column != undefined) {
                if (e.column <= 0 || e.column >= 20) {
                    var i = getBestFitColumn(a, jQuery(window).width(), "id");
                    a.column = i.column, a.columnindex = i.index
                } else a.column = parseInt(e.column, 0);
                a.origcolumn = a.column
            }
            e.animSpeed != undefined && (a.animSpeed = e.animSpeed / 1e3), e.delayBasic != undefined && (a.delayBasic = e.delayBasic / 100), e.pageAnimation != undefined && (a.pageAnimation = e.pageAnimation), e.changedAnim != undefined && (a.changedAnim = e.changedAnim), a.started = !0, 1 == e.silent && (a.silent = !0), setOptions(t, a), setItemsOnPages(a), organiseGrid(a)
        },
        esquickdraw: function() {
            var e = jQuery(this),
                t = getOptions(e);
            t.silent = !0, setOptions(e, t), setItemsOnPages(t), organiseGrid(t)
        },
        esreinit: function() {
            var e = jQuery(this);
            return prepareItemsInGrid(opt, !0), organiseGrid(opt), prepareSortingAndOrders(e), opt.lastslide
        },
        somemethodb: function() {
            return this.each(function() {
                jQuery(this)
            })
        }
    });
    var vis = function() {
            var e, t, a = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange"
            };
            for (e in a)
                if (e in document) {
                    t = a[e];
                    break
                }
            return function(a) {
                return a && document.addEventListener(t, a), !document[e]
            }
        }(),
        tabBlurringCheck = function() {
            var e = document.documentMode === undefined,
                t = window.chrome;
            jQuery("body").hasClass("esg-blurlistenerexists") || (jQuery("body").addClass("esg-blurlistenerexists"), e && !t ? jQuery(window).on("focusin", function() {
                setTimeout(function() {
                    jQuery("body").find(".esg-grid.esg-container").each(function() {
                        jQuery(this).esquickdraw()
                    })
                }, 300)
            }).on("focusout", function() {}) : window.addEventListener ? window.addEventListener("focus", function() {
                setTimeout(function() {
                    jQuery("body").find(".esg-grid.esg-container").each(function() {
                        jQuery(this).esquickdraw()
                    })
                }, 300)
            }, !1) : window.attachEvent("focus", function() {
                setTimeout(function() {
                    jQuery("body").find(".esg-grid.esg-container").each(function() {
                        jQuery(this).esquickdraw()
                    })
                }, 300)
            }))
        },
        is_mobile = function() {
            var e = ["android", "webos", "iphone", "ipad", "blackberry", "Android", "webos", , "iPod", "iPhone", "iPad", "Blackberry", "BlackBerry"],
                t = !1;
            for (i in e) navigator.userAgent.split(e[i]).length > 1 && (t = !0);
            return t
        },
        waitForLoads = function(e, t) {
            var a = e.closest(".esg-grid").parent().parent().find(".esg-loader");
            jQuery.each(e, function(e, o) {
                o = jQuery(o), a.length > 0 && punchgs.TweenLite.to(a, .2, {
                    autoAlpha: 1,
                    delay: .5
                }), !o.hasClass("loadedmedia") && "even" != t.layout && o.find("img").length > 0 && o.hasClass("itemtoshow") && o.removeClass("itemtoshow").addClass("showmeonload"), o.hasClass("loadedmedia") || "even" == t.layout || 0 != o.find("img").length || (evenImageRatio(o.find("img"), t), waittorungGrid(o, t, !0))
            });
            var o = setInterval(function() {
                t.bannertimeronpause = !0, t.cd = 0;
                var i = 0;
                e.find("img").each(function() {
                    var e = jQuery(this);
                    1 != e.data("lazydone") && "on" == t.lazyLoad && e.parent().find(".lazyloadcover").length < 1 && e.parent().append('<div class="lazyloadcover" style="position:absolute;top:0px;left:0px;z-index:10;width:100%;height:100%;background:' + t.lazyLoadColor + '"></div>'), 1 != e.data("lazydone") && 3 > i && (i++, loadAllPrepared(jQuery(this), t))
                }), 0 == i && a.length > 0 && (punchgs.TweenLite.killTweensOf(a, !1), punchgs.TweenLite.to(a, .2, {
                    autoAlpha: 0
                })), 0 != i || e.closest(".mainul").hasClass("gridorganising") || (clearInterval(o), runGrid(t))
            }, 50)
        }
}(jQuery),
function(e, t) {
    "use strict";

    function a(e) {
        return e && e.toLowerCase ? e.toLowerCase() : e
    }

    function o(e, t) {
        for (var a = 0, o = e.length; o > a; a++)
            if (e[a] == t) return !i;
        return i
    }
    var i = !1,
        r = null,
        n = parseFloat,
        s = Math.min,
        l = /(-?\d+\.?\d*)$/g,
        u = /(\d+\.?\d*)$/g,
        d = [],
        c = [],
        p = function(e) {
            return "string" == typeof e
        },
        h = function(e, t) {
            for (var a, o = e.length, i = o; i--;) a = o - i - 1, t(e[a], a)
        },
        f = Array.prototype.indexOf || function(e) {
            var t = this.length,
                a = Number(arguments[1]) || 0;
            for (a = 0 > a ? Math.ceil(a) : Math.floor(a), 0 > a && (a += t); t > a; a++)
                if (a in this && this[a] === e) return a;
            return -1
        };
    e.tinysort = {
        id: "TinySort",
        version: "1.5.6",
        copyright: "Copyright (c) 2008-2013 Ron Valstar",
        uri: "http://tinysort.sjeiti.com/",
        licensed: {
            MIT: "http://www.opensource.org/licenses/mit-license.php",
            GPL: "http://www.gnu.org/licenses/gpl.html"
        },
        plugin: function() {
            var e = function(e, t) {
                d.push(e), c.push(t)
            };
            return e.indexOf = f, e
        }(),
        defaults: {
            order: "asc",
            attr: r,
            data: r,
            useVal: i,
            place: "start",
            returns: i,
            cases: i,
            forceStrings: i,
            ignoreDashes: i,
            sortFunction: r
        }
    }, e.fn.extend({
        tinysort: function() {
            var g, w, m, v, y = this,
                b = [],
                x = [],
                j = [],
                C = [],
                k = 0,
                A = [],
                T = [],
                O = function(e) {
                    h(d, function(t) {
                        t.call(t, e)
                    })
                },
                P = function(e, t) {
                    return "string" == typeof t && (e.cases || (t = a(t)), t = t.replace(/^\s*(.*?)\s*$/i, "$1")), t
                },
                Q = function(e, t) {
                    var a = 0;
                    for (0 !== k && (k = 0); 0 === a && v > k;) {
                        var o = C[k],
                            r = o.oSettings,
                            s = r.ignoreDashes ? u : l;
                        if (O(r), r.sortFunction) a = r.sortFunction(e, t);
                        else if ("rand" == r.order) a = Math.random() < .5 ? 1 : -1;
                        else {
                            var d = i,
                                f = P(r, e.s[k]),
                                g = P(r, t.s[k]);
                            if (!r.forceStrings) {
                                var w = p(f) ? f && f.match(s) : i,
                                    m = p(g) ? g && g.match(s) : i;
                                if (w && m) {
                                    var y = f.substr(0, f.length - w[0].length),
                                        b = g.substr(0, g.length - m[0].length);
                                    y == b && (d = !i, f = n(w[0]), g = n(m[0]))
                                }
                            }
                            a = o.iAsc * (g > f ? -1 : f > g ? 1 : 0)
                        }
                        h(c, function(e) {
                            a = e.call(e, d, f, g, a)
                        }), 0 === a && k++
                    }
                    return a
                };
            for (g = 0, m = arguments.length; m > g; g++) {
                var L = arguments[g];
                p(L) ? A.push(L) - 1 > T.length && (T.length = A.length - 1) : T.push(L) > A.length && (A.length = T.length)
            }
            for (A.length > T.length && (T.length = A.length), v = A.length, 0 === v && (v = A.length = 1, T.push({})), g = 0, m = v; m > g; g++) {
                var I = A[g],
                    Y = e.extend({}, e.tinysort.defaults, T[g]),
                    X = !(!I || "" === I),
                    z = X && ":" === I[0];
                C.push({
                    sFind: I,
                    oSettings: Y,
                    bFind: X,
                    bAttr: !(Y.attr === r || "" === Y.attr),
                    bData: Y.data !== r,
                    bFilter: z,
                    $Filter: z ? y.filter(I) : y,
                    fnSort: Y.sortFunction,
                    iAsc: "asc" == Y.order ? 1 : -1
                })
            }
            return y.each(function(a, o) {
                var i, r = e(o),
                    n = r.parent().get(0),
                    s = [];
                for (w = 0; v > w; w++) {
                    var l = C[w],
                        u = l.bFind ? l.bFilter ? l.$Filter.filter(o) : r.find(l.sFind) : r;
                    s.push(l.bData ? u.data(l.oSettings.data) : l.bAttr ? u.attr(l.oSettings.attr) : l.oSettings.useVal ? u.val() : u.text()), i === t && (i = u)
                }
                var d = f.call(j, n);
                0 > d && (d = j.push(n) - 1, x[d] = {
                    s: [],
                    n: []
                }), i.length > 0 ? x[d].s.push({
                    s: s,
                    e: r,
                    n: a
                }) : x[d].n.push({
                    e: r,
                    n: a
                })
            }), h(x, function(e) {
                e.s.sort(Q)
            }), h(x, function(e) {
                var t = e.s,
                    a = e.n,
                    r = t.length,
                    n = a.length,
                    l = r + n,
                    u = [],
                    d = l,
                    c = [0, 0];
                switch (Y.place) {
                    case "first":
                        h(t, function(e) {
                            d = s(d, e.n)
                        });
                        break;
                    case "org":
                        h(t, function(e) {
                            u.push(e.n)
                        });
                        break;
                    case "end":
                        d = n;
                        break;
                    default:
                        d = 0
                }
                for (g = 0; l > g; g++) {
                    var p = o(u, g) ? !i : g >= d && d + r > g,
                        f = p ? 0 : 1,
                        w = (p ? t : a)[c[f]].e;
                    w.parent().append(w), (p || !Y.returns) && b.push(w.get(0)), c[f]++
                }
            }), y.length = 0, Array.prototype.push.apply(y, b), y
        }
    }), e.fn.TinySort = e.fn.Tinysort = e.fn.tsort = e.fn.tinysort
}(jQuery);