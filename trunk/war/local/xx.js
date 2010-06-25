if (typeof Sina == "undefined") {
    Sina = {}
}
Sina.pkg = function(c) {
    if (!c || !c.length) {
        return null
    }
    var d = c.split(".");
    var b = Sina;
    for (var a = (d[0] == "Sina") ? 1 : 0; a < d.length; ++a) {
        b[d[a]] = b[d[a]] || {};
        b = b[d[a]]
    }
    return b
};
function $E(b) {
    var a = typeof b == "string" ? document.getElementById(b) : b;
    if (a != null) {
        return a
    } else {}
    return null
}
function $C(a) {
    return document.createElement(a)
}
function $N(a) {
    return document.getElementsByName(a)
}
function $T(b, a) {
    return b.getElementsByTagName(a)
}
try {
    document.execCommand("BackgroundImageCache", false, true)
} catch(e) {} (function() {
    var b = function(f, d) {
        var c = f;
        return function() {
            return c.apply(d, arguments)
        }
    };
    var a = "Debug";
    if (window[a] == null || typeof window[a].log == "undefined") {
        window[a] = {
            cacheData: [],
            base_url: "http://sjs.sinajs.cn/bind2/",
            product: scope.$PRODUCT_NAME,
            baseColor: {
                1 : {
                    color: "#FFF",
                    bgcolor: "#E00"
                },
                2 : {
                    color: "#F00"
                },
                3 : {
                    color: "#FFF000"
                },
                4 : {
                    color: "#0F0"
                },
                5 : {
                    color: "#FFF"
                }
            },
            fatal: function(c) {
                this.addData(c, 1)
            },
            error: function(c) {
                this.addData(c, 2)
            },
            warning: function(c) {
                this.addData(c, 3)
            },
            info: function(c) {
                this.addData(c, 4)
            },
            log: function(c) {
                this.addData(c, 5)
            },
            dir: function(c) {
                this.addData(c, 5)
            },
            addData: function(d, c, f, g) {
                if (d == null) {
                    return
                }
                if (typeof d != "object") {
                    d = d.toString()
                }
                var i = {
                    type: c || "5",
                    color: f || this.baseColor[c].color,
                    bgcolor: g || this.baseColor[c].bgcolor
                };
                this.cacheData.push([d, i]);
                if (this.initFinished == true) {
                    this.showCurrentData([d, i])
                }
            }
        };
        window.trace = b(window[a].log, window[a]);
        window.traceError = b(window[a].error, window[a])
    }
})();
Sina.pkg("Core");
if (typeof Core == "undefined") {
    Core = Sina.Core
}
Sina.pkg("Core.Array");
Core.Array.foreach = function(d, c) {
    if (d == null && d.constructor != Array) {
        return []
    }
    var f = 0,
    b = d.length,
    g = [];
    while (f < b) {
        var a = c(d[f], f);
        if (a !== null) {
            g[g.length] = a
        }
        f++
    }
    return g
};
Sina.pkg("Core.Events");
Core.Events.addEvent = function(g, d, c, a) {
    var f = typeof g == "string" ? $E(g) : g;
    if (f == null) {
        trace("addEvent 找不到对象：" + g);
        return
    }
    if (typeof a == "undefined") {
        a = false
    }
    if (typeof c == "undefined") {
        c = "click"
    }
    if (f.addEventListener) {
        f.addEventListener(c, d, a);
        return true
    } else {
        if (f.attachEvent) {
            var b = f.attachEvent("on" + c, d);
            return true
        } else {
            f["on" + c] = d
        }
    }
};
Core.Events.removeEvent = function(a, b, c) {
    var d = $E(a);
    if (d == null) {
        trace("removeEvent 找不到对象：" + a);
        return
    }
    if (typeof b != "function") {
        return
    }
    if (typeof c == "undefined") {
        c = "click"
    }
    if (d.addEventListener) {
        d.removeEventListener(c, b, false)
    } else {
        if (d.attachEvent) {
            d.detachEvent("on" + c, b)
        }
    }
    b[c] = null
};
Sina.pkg("Core.Function");
Core.Function.bind3 = function(d, c, b) {
    b = b == null ? [] : b;
    var a = d;
    return function() {
        return a.apply(c, b)
    }
};
Core.Array.findit = function(a, c) {
    var b = -1;
    Core.Array.foreach(a,
    function(f, d) {
        if (c == f) {
            b = d
        }
    });
    return b
};
window.onerror = function(c, b, a) {
    trace("Error occured:" + c + "<br/>file:" + b + "<br/>line:" + a + "<br/>");
    return true
};
function Jobs() {
    this._jobTable = [[], [], [], []]
}
Jobs.prototype = {
    _registedJobTable: {},
    initialize: function() {},
    _registJob: function(b, a) {
        this._registedJobTable[b] = a
    },
    add: function(b, a) {
        var a = a || 1;
        if (Core.Array.findit(this._jobTable[a], b) == -1) {
            this._jobTable[a].push(b)
        } else {
            Debug.error("Error: Job <b>" + b + "</b> is existed now.")
        }
    },
    start: function(j) {
        var c = this._registedJobTable;
        var g = 0;
        this._jobTable[1] = this._jobTable[1].concat(this._jobTable[2]);
        var f = this._jobTable[1].length;
        var a = this._jobTable[1];
        var b = function() {
            return new Date().valueOf()
        };
        var l = this;
        this.fe = Core.Function.bind3(l.focus, l, []);
        var d = window.setInterval(function() {
            if (g >= f) {
                clearInterval(d);
                Core.Events.addEvent(document.body, l.fe, "focus");
                Core.Events.addEvent(window, l.fe, "scroll");
                Core.Events.addEvent(document.body, l.fe, "mousemove");
                Core.Events.addEvent(document.body, l.fe, "mouseover");
                return
            }
            var q = a[g];
            var o = c[q];
            g++;
            if (typeof o == "undefined") {
                Debug.fatal("<b>Job[" + q + "] is undefiend!!!</b>");
                return
            }
            var n = true;
            var m = b();
            try {
                o.call()
            } catch(p) {
                Debug.fatal("<b>Job[" + q + "] failed!!!</b>");
                traceError(p);
                n = false;
                throw p
            } finally {
                if (n) {
                    var i = b();
                    Debug.info("<b>Job[" + q + "] done in " + (i - m) + "ms.</b>")
                }
            }
        },
        10)
    },
    focus: function() {
        if (this.focusdown) {
            var j = this;
            Core.Events.removeEvent(document.body, j.fe, "focus");
            Core.Events.removeEvent(window, j.fe, "scroll");
            Core.Events.removeEvent(document.body, j.fe, "mousemove");
            Core.Events.removeEvent(document.body, j.fe, "mouseover");
            j.fe = null;
            return
        }
        this.focusdown = true;
        var c = this._registedJobTable;
        var g = 0;
        var f = this._jobTable[3].length;
        var a = this._jobTable[3];
        var b = function() {
            return new Date().valueOf()
        };
        var d = window.setInterval(function() {
            if (a.length == 0) {
                clearInterval(d);
                return
            }
            var p = a[0];
            a.shift();
            var n = c[p];
            g++;
            if (typeof n == "undefined") {
                Debug.fatal("<b>Job[" + p + "] is undefiend!!!</b>");
                return
            }
            var m = true;
            var l = b();
            try {
                n.call()
            } catch(o) {
                Debug.fatal("<b>Job[" + p + "] failed!!!</b>");
                traceError(o);
                m = false;
                throw o
            } finally {
                if (m) {
                    var i = b();
                    Debug.info("<b>Job[" + p + "] done in " + (i - l) + "ms.</b>")
                }
            }
        },
        10)
    },
    call: function(b, a) {
        if (typeof this._registedJobTable[b] != "undefined") {
            this._registedJobTable[b].apply(this, a)
        } else {
            trace("<b>Job[" + b + "] is undefined!!!</b>", {
                color: "#900",
                bgColor: "#FFF;"
            })
        }
    }
};
$registJob = function(b, a) {
    Jobs.prototype._registJob(b, a)
};
$callJob = function(b) {
    var a = [];
    if (arguments.length > 1) {
        Core.Array.foreach(arguments,
        function(c, d) {
            a[d] = c
        });
        a.shift()
    }
    Jobs.prototype.call(b, a)
};
Sina.pkg("Core.Dom");
Core.Dom.insertHTML = function(d, c, b) {
    d = $E(d) || document.body;
    b = b.toLowerCase() || "beforeend";
    if (d.insertAdjacentHTML) {
        switch (b) {
        case "beforebegin":
            d.insertAdjacentHTML("BeforeBegin", c);
            return d.previousSibling;
        case "afterbegin":
            d.insertAdjacentHTML("AfterBegin", c);
            return d.firstChild;
        case "beforeend":
            d.insertAdjacentHTML("BeforeEnd", c);
            return d.lastChild;
        case "afterend":
            d.insertAdjacentHTML("AfterEnd", c);
            return d.nextSibling
        }
        throw 'Illegal insertion point -> "' + b + '"'
    }
    var a = d.ownerDocument.createRange();
    var f;
    switch (b) {
    case "beforebegin":
        a.setStartBefore(d);
        f = a.createContextualFragment(c);
        d.parentNode.insertBefore(f, d);
        return d.previousSibling;
    case "afterbegin":
        if (d.firstChild) {
            a.setStartBefore(d.firstChild);
            f = a.createContextualFragment(c);
            d.insertBefore(f, d.firstChild);
            return d.firstChild
        } else {
            d.innerHTML = c;
            return d.firstChild
        }
        break;
    case "beforeend":
        if (d.lastChild) {
            a.setStartAfter(d.lastChild);
            f = a.createContextualFragment(c);
            d.appendChild(f);
            return d.lastChild
        } else {
            d.innerHTML = c;
            return d.lastChild
        }
        break;
    case "afterend":
        a.setStartAfter(d);
        f = a.createContextualFragment(c);
        d.parentNode.insertBefore(f, d.nextSibling);
        return d.nextSibling
    }
    throw 'Illegal insertion point -> "' + b + '"'
}; (function(c) {
    var d = navigator.userAgent.toLowerCase();
    c.$IE = /msie/.test(d);
    c.$OPERA = /opera/.test(d);
    c.$MOZ = /gecko/.test(d);
    c.$IE5 = /msie 5 /.test(d);
    c.$IE55 = /msie 5.5/.test(d);
    c.$IE6 = /msie 6/.test(d);
    c.$IE7 = /msie 7/.test(d);
    c.$IE8 = /msie 8/.test(d);
    c.$SAFARI = /safari/.test(d);
    c.$winXP = /windows nt 5.1/.test(d);
    c.$winVista = /windows nt 6.0/.test(d);
    c.$FF2 = /Firefox\/2/i.test(d);
    c.$FF = /firefox/i.test(d);
    c.$CHROME = /chrome/i.test(d);
    c.$TT = /tencenttraveler/.test(d);
    c.$360 = /360se/.test(d);
    c.$Maxthon = false;
    try {
        var a = window.external;
        c.$Maxthon = a.max_version ? true: false
    } catch(b) {}
})(window);
Core.Dom.setStyle = function(a, b, c) {
    switch (b) {
    case "opacity":
        a.style.filter = "alpha(opacity=" + (c * 100) + ")";
        if (!a.currentStyle || !a.currentStyle.hasLayout) {
            a.style.zoom = 1
        }
        break;
    case "float":
        b = "styleFloat";
    default:
        a.style[b] = c
    }
};
if (!$IE) {
    Core.Dom.setStyle = function(a, b, c) {
        if (b == "float") {
            b = "cssFloat"
        }
        a.style[b] = c
    }
}
Sina.pkg("Core.String");
Core.String.formatNumber = function(a) {
    a = a + "";
    return a.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
};
Core.String.encodeHTML = function(a) {
    var b = document.createElement("div");
    b.appendChild(document.createTextNode(a));
    return b.innerHTML.replace(/\s/g, "&nbsp;")
};
Sina.pkg("Utils");
if (typeof Utils == "undefined") {
    Utils = Sina.Utils
}
Sina.pkg("Utils.Io");
Sina.pkg("Core.System"); (function() {
    var a = function(c, b) {
        var d;
        try {
            if (typeof b != "undefined") {
                for (d in c) {
                    if (b[d] != null) {
                        c[d] = b[d]
                    }
                }
            }
        } finally {
            d = null;
            return c
        }
    };
    Core.System.parseParam = a
})();
Utils.Url = function(a) {
    a = a || "";
    this.url = a;
    this.query = {};
    this.parse()
};
Utils.Url.prototype = {
    parse: function(a) {
        if (a) {
            this.url = a
        }
        this.parseAnchor();
        this.parseParam()
    },
    parseAnchor: function() {
        var a = this.url.match(/\#(.*)/);
        a = a ? a[1] : null;
        this._anchor = a;
        if (a != null) {
            this.anchor = this.getNameValuePair(a);
            this.url = this.url.replace(/\#.*/, "")
        }
    },
    parseParam: function() {
        var a = this.url.match(/\?([^\?]*)/);
        a = a ? a[1] : null;
        if (a != null) {
            this.url = this.url.replace(/\?([^\?]*)/, "");
            this.query = this.getNameValuePair(a)
        }
    },
    getNameValuePair: function(b) {
        var a = {};
        b.replace(/([^&=]*)(?:\=([^&]*))?/gim,
        function(c, f, d) {
            if (f == "") {
                return
            }
            a[f] = d || ""
        });
        return a
    },
    getParam: function(a) {
        return this.query[a] || ""
    },
    clearParam: function() {
        this.query = {}
    },
    setParam: function(a, b) {
        if (a == null || a == "" || typeof(a) != "string") {
            throw new Error("no param name set")
        }
        this.query = this.query || {};
        this.query[a] = b
    },
    setParams: function(a) {
        this.query = a
    },
    serialize: function(c) {
        var a = [];
        for (var b in c) {
            if (c[b] == null || c[b] == "") {
                a.push(b + "=")
            } else {
                a.push(b + "=" + c[b])
            }
        }
        return a.join("&")
    },
    toString: function() {
        var a = this.serialize(this.query);
        return this.url + (a.length > 0 ? "?" + a: "") + (this.anchor ? "#" + this.serialize(this.anchor) : "")
    },
    getHashStr: function(a) {
        return this.anchor ? "#" + this.serialize(this.anchor) : (a ? "#": "")
    }
};
Core.String.encodeDoubleByte = function(a) {
    if (typeof a != "string") {
        return a
    }
    return encodeURIComponent(a)
};
Utils.Io.JsLoad = {}; (function() {
    function a(m, g) {
        b(m, g);
        var l = m.urls;
        var f, d = l.length;
        for (f = 0; f < d; f++) {
            var j = $C("script");
            j.src = l[f].url;
            j.charset = l[f].charset;
            j.onload = j.onerror = j.onreadystatechange = function() {
                if (j && j.readyState && j.readyState != "loaded" && j.readyState != "complete") {
                    return
                }
                g.script_loaded_num++;
                j.onload = j.onreadystatechange = j.onerror = null;
                j.src = "";
                j.parentNode.removeChild(j);
                j = null
            };
            document.getElementsByTagName("head")[0].appendChild(j)
        }
    }
    function b(o, j) {
        var n = o.urls;
        var q = o.GET;
        var l, m = n.length;
        var p, f, d, g;
        for (l = 0; l < m; l++) {
            g = window.parseInt(Math.random() * 100000000);
            f = new Utils.Url(n[l].url);
            for (p in q) {
                if (o.noencode == true) {
                    f.setParam(p, q[p])
                } else {
                    f.setParam(p, Core.String.encodeDoubleByte(q[p]))
                }
            }
            d = f.getParam("varname") || "requestId_" + g;
            if (o.noreturn != true) {
                f.setParam("varname", d)
            }
            j.script_var_arr.push(d);
            n[l].url = f.toString();
            n[l].charset = n[l].charset || o.charset
        }
    }
    function c(g, i) {
        var f = {
            urls: [],
            charset: "utf-8",
            noreturn: false,
            noencode: false,
            timeout: -1,
            POST: {},
            GET: {},
            onComplete: null,
            onException: null
        };
        var d = {
            script_loaded_num: 0,
            is_timeout: false,
            is_loadcomplete: false,
            script_var_arr: []
        };
        f.urls = typeof g == "string" ? [{
            url: g
        }] : g;
        Core.System.parseParam(f, i);
        a(f, d); (function() {
            if (f.noreturn == true && f.onComplete == null) {
                return
            }
            var j, l = [];
            if (d.script_loaded_num == f.urls.length) {
                d.is_loadcomplete = true;
                if (f.onComplete != null) {
                    for (j = 0; j < d.script_var_arr.length; j++) {
                        l.push(window[d.script_var_arr[j]])
                    }
                    if (d.script_var_arr.length < 2) {
                        f.onComplete(l[0])
                    } else {
                        f.onComplete(l)
                    }
                }
                return
            }
            if (d.is_timeout == true) {
                return
            }
            setTimeout(arguments.callee, 50)
        })();
        if (f.timeout > 0) {
            setTimeout(function() {
                if (d.is_loadcomplete != true) {
                    if (f.onException != null) {
                        f.onException()
                    }
                    d.is_timeout = true
                }
            },
            f.timeout)
        }
    }
    Utils.Io.JsLoad.request = function(d, f) {
        new c(d, f)
    }
})();
Sina.pkg("Core.Class");
Core.Class.AsPrototype = {};
Core.Class.create = function() {
    return function(a) {
        if (a != Core.Class.AsPrototype) {
            this.initialize.apply(this, arguments)
        }
    }
};
if (typeof Lib == "undefined") {
    Lib = {}
}
Lib.pkg = function(c) {
    if (!c || !c.length) {
        return null
    }
    var d = c.split(".");
    var b = Lib;
    for (var a = (d[0] == "Lib") ? 1 : 0; a < d.length; ++a) {
        b[d[a]] = b[d[a]] || {};
        b = b[d[a]]
    }
    return b
};
Lib.pkg("Lib.Component");
Lib.Component = Core.Class.create();
Lib.Component.instances = Lib.Component.instances || {};
Lib.Component.compSize = {};
Lib.Component.getInitCompSize = function() {
    if (scope.component_lists != null) {
        var b = scope.component_lists;
        for (var a in b) {
            if (b[a].list.length > 0) {
                Core.Array.foreach(b[a].list,
                function(c) {
                    Lib.Component.compSize[c] = b[a].size
                })
            }
        }
        return true
    } else {
        return null
    }
};
Lib.Component.refresh = function(c, b) {
    b = b || {};
    try {
        if (Lib.Component.instances[c] == null) {
            if (typeof Lib.Component["Comp_" + c] == "undefined") {
                $registComp(c, {},
                "static")
            }
            Lib.Component.instances[c] = new Lib.Component["Comp_" + c](c)
        }
    } catch(a) {}
    Debug.log("刷新组件 " + c + " ，新宽度是 " + b.width);
    Debug.log("组件 " + c + " 增加管理链接：" + b.addManage);
    Lib.Component.instances[c].reload(b.width, b.addManage, b.forceRefresh)
};
Lib.Component.set = function(a) {
    Debug.log("展开组件 " + a + " 的设置功能");
    if (Lib.Component.instances[a] == null) {
        Lib.Component.instances[a] = new Lib.Component["Comp_" + a](a)
    }
    Lib.Component.instances[a].getUserSet()
};
Core.Class.extend = function(a, d, b) {
    for (var c in d) {
        if (b != null) {
            if (!a[c]) {
                a[c] = d[c]
            }
        } else {
            a[c] = d[c]
        }
    }
    return a
};
Core.Class.define = function(f, b, a) {
    if (f && f.__isClass && f.__isClass()) {
        throw new Error("class cnt be used as another class' constructor : " + f)
    }
    b = b || Object;
    a = a || {};
    a.initialize = f || a.initialize || b.prototype.initialize || (function() {});
    if (typeof(a.initialize) != "function") {
        throw new Error("only function can be used as constructor")
    }
    a.__isClass = function() {
        return true
    };
    var c = Core.Class.create();
    c.__isClass = a.__isClass;
    var d = b == Object ? {}: new b(Core.Class.AsPrototype);
    c.prototype = Core.Class.extend(d, a);
    return c
};
$registComp = Lib.Component.registComp = function(c, a, b) {
    b = (b == null) ? Lib.Component.Comp: Lib.Component["Comp_" + b];
    b = b || Lib.Component.Comp;
    a.compId = c;
    Lib.Component["Comp_" + c] = Core.Class.define(null, b, a)
};
Core.Function.bind2 = function(c, b) {
    var a = c;
    return function() {
        return a.apply(b, arguments)
    }
};
Function.prototype.bind2 = function(b) {
    var a = this;
    return function() {
        return a.apply(b, arguments)
    }
};
Core.Dom.getElementsByClass = function(c, b, j) {
    c = c || document;
    var d = [];
    j = " " + j + " ";
    var m = c.getElementsByTagName(b),
    g = m.length;
    for (var f = 0; f < g; ++f) {
        var a = m[f];
        if (a.nodeType == 1) {
            var l = " " + a.className + " ";
            if (l.indexOf(j) != -1) {
                d[d.length] = a
            }
        }
    }
    return d
};
Core.Dom.byClz = Core.Dom.getElementsByClass;
Core.Dom.removeNode = function(a) {
    a = $E(a) || a;
    try {
        a.parentNode.removeChild(a)
    } catch(b) {}
};
Lib.Component.Comp = Core.Class.create();
Lib.Component.Comp.prototype = {
    initialize: function(a) {
        if (this.isInit == true || a == null || Lib.Component.compSize[a] == null) {
            return
        } else {
            this.isInit = true;
            this.compId = a;
            this.size = Lib.Component.compSize[a];
            Lib.Component.instances[a] = this;
            return this
        }
    },
    compId: null,
    getContainer: function() {
        return $E("module_" + this.compId)
    },
    getTitle: function() {
        return Core.Dom.getElementsByClass($E("module_" + this.compId), "span", "title")[0]
    },
    getManage: function() {
        var a = Core.Dom.getElementsByClass($E("module_" + this.compId), "span", "edit");
        if (a.length != 0) {
            return a[0]
        } else {
            Debug.error("组件添加管理链接失败，检查组件" + this.compId + "标题栏 SPAN[class=edit] 是否存在");
            return null
        }
    },
    getContent: function() {
        var a = Core.Dom.getElementsByClass($E("module_" + this.compId), "div", "SG_connBody");
        if (a.length != 0) {
            return a[0]
        } else {
            Debug.error("组件内容节点获取失败，检查组件" + this.compId + "内 DIV[class=SG_connBody] 是否存在");
            return null
        }
    },
    load: function() {
        trace("load compId=" + this.compId);
        this.setContent("")
    },
    reload: function(a) {
        this.clearContent();
        this.load()
    },
    setTitle: function(a) {
        var b = this.getTitle();
        if (b) {
            b.innerHTML = a || ""
        }
    },
    setManage: function() {
        var a = this.getManage();
        if ($isAdmin && a) {
            a.innerHTML = '<span class="move"><a href="#" onclick="funcMoveUpDown.up(' + this.compId + ');return false;">↑</a><a href="#" onclick="funcMoveUpDown.down(' + this.compId + ');return false;">↓</a></span><a href="#" onclick="hiddenComponents(\'' + this.compId + '\');return false;" class="CP_a_fuc">[<cite>隐藏</cite>]</a>'
        }
    },
    setContent: function(a) {
        a = typeof a == "string" ? a: a + "";
        this.getContent().innerHTML = a || ""
    },
    clearContent: function() {
        this.getContent().innerHTML = ""
    },
    remove: function() {
        Core.Dom.removeNode(this.getContainer());
        this.finalize()
    },
    finalize: function() {
        this.isInit = null;
        Lib.Component.instances[this.compId] = null
    }
};
var $SYSMSG = {};
$SYSMSG.extend = function(c, b) {
    for (var a in c) {
        $SYSMSG[a] = !!b == false ? c[a] : $SYSMSG[a]
    }
};
$SYSMSG.extend({
    A80001: "暂无内容。",
    A80002: "暂无内容。",
    A80101: "组件加载失败，请刷新。",
    A80201: "你要删除留下的访问记录吗？",
    A80202: '<div class="CP_w_cnt SG_txtb">删除后一小时内不会在此留下访问记录。</div>',
    A80203: "确实要删除此访问记录吗？",
    A80204: ['<ul class="CP_w_part SG_txtb"><li><input type="checkbox" id="comp_12_deleteToBlack" class="CP_w_fm1" /><label for="comp_12_deleteToBlack" >将此人加入黑名单</label></li></ul><div class="CP_w_cnt SG_txtb">加入黑名单的用户无法和你沟通。</div>'].join(""),
    A02003: "已添加过此模块，不能重复添加。",
    A02004: "抱歉，该模块不能被克隆。",
    A02005: "抱歉，您的博客尚未升级，请<a href='http://blog.sina.com.cn/u/#UID' target='_blank'>升级</a>后再“添加到您的博客”。",
    A02006: "模块已成功添加到你的博客。",
    A02007: "确实要隐藏此模块吗？隐藏后可在“页面设置”中恢复。",
    A02008: "确实要隐藏此模块吗？此模块活动时间已结束，隐藏后不可恢复。"
});
$registComp("dynamic", {
    render_210: function() {},
    render_510: function() {},
    render_730: function() {},
    show: function(a) {
        this.setContent(a)
    },
    showEmpty: function(a) {
        this.setContent('<div class="SG_nodata2">' + (a || $SYSMSG.A80001) + "</div>")
    },
    showError: function(a) {
        this.setContent(a)
    },
    setManage: function() {
        if ($isAdmin && this.getManage()) {
            this.getManage().innerHTML = '<span class="move"><a href="#" onclick="funcMoveUpDown.up(' + this.compId + ');return false;">↑</a><a href="#" onclick="funcMoveUpDown.down(' + this.compId + ');return false;">↓</a></span><a href="#" onclick="hiddenComponents(\'' + this.compId + '\');return false;" class="CP_a_fuc">[<cite>隐藏</cite>]</a>'
        }
    },
    reload: function(c, b, d) {
        var a = c == null || (c && (c == 210 || c == 510 || c == 730));
        if (!a) {
            Debug.error("请检查传入的组件尺寸是否正确。" + c);
            return
        }
        this.size = c || this.size;
        this.getContent().innerHTML = '<div class="wdtLoading"><img src="http://simg.sinajs.cn/blog7style/images/common/loading.gif" />加载中…</div>';
        this.isSetOn = null;
        Debug.log("this.isSetOn : " + this.isSetOn);
        if (d == true || this.cacheData == null) {
            Debug.log("强制刷新：" + this.compId);
            this.load()
        } else {
            Debug.log("缓存刷新：" + this.compId);
            this["render_" + this.size]()
        }
        if (b) {
            this.setManage()
        }
    }
});
Sina.pkg("Utils.Cookie");
Utils.Cookie.getCookie = function(a) {
    a = a.replace(/([\.\[\]\$])/g, "\\$1");
    var c = new RegExp(a + "=([^;]*)?;", "i");
    var d = document.cookie + ";";
    var b = d.match(c);
    if (b) {
        return b[1] || ""
    } else {
        return ""
    }
};
Core.System.keyValue = function(b, c) {
    var a = b.match(new RegExp("(\\?|&)" + c + "=([^&]*)(&|$)"));
    if (a != null) {
        return a[2]
    }
    return null
};
Lib.checkAuthor = function() {
    var a = unescape(Utils.Cookie.getCookie("SUP"));
    if (a && a != "") {
        $UID = Core.System.keyValue(a, "uid");
        $nick = decodeURIComponent(Core.System.keyValue(a, "nick"));
        $isLogin = !!($UID);
        if (typeof scope.$uid == "undefined") {
            $isAdmin = false
        } else {
            $isAdmin = (scope.$uid == $UID)
        }
    } else {
        a = Utils.Cookie.getCookie("SU");
        if (a && a != "") {
            $UID = a.match(/^([^:]*:){2}(\d{5,11})/)[2] || null;
            window.$isLogin = !!($UID);
            if (typeof scope.$uid == "undefined") {
                window.$isAdmin = false
            } else {
                window.$isAdmin = (scope.$uid == $UID)
            }
        } else {
            $UID = null;
            $isLogin = false;
            $isAdmin = false
        }
    }
};
Core.Array.uniq = function(c) {
    var b = [];
    for (var d = 0; d < c.length; d++) {
        var a = c[d];
        if (Core.Array.findit(b, a) == -1) {
            b.push(a)
        }
    }
    return b
};
Lib.Uic = {
    _interface: "http://uic.sinajs.cn/uic?type=nick",
    cacheNickName: {},
    getNickName: function(m, f, n) {
        m = Core.Array.uniq(m) || [];
        n = n || 10;
        var b = this.cacheNickName,
        d = [];
        var a = {};
        for (var g = 0,
        j = m.length; g < j; g++) {
            if (typeof b[m[g]] == "undefined" && b[m[g]] == null) {
                d.push(m[g])
            } else {
                a[m[g]] = b[m[g]] || m[g]
            }
        }
        if (d.length == 0) {
            f(a);
            a = null
        } else {
            var l = [];
            while (d.length > 0) {
                l.push({
                    url: this._interface + "&uids=" + d.splice(0, n).join(",")
                })
            }
            var c = function(i) {
                Utils.Io.JsLoad.request(i[0].url, {
                    onComplete: function(r) {
                        if (typeof r.length == "undefined") {
                            for (var q in r) {
                                a[q] = (r[q] || q);
                                Lib.Uic.cacheNickName[q] = a[q]
                            }
                            f(a)
                        } else {
                            for (var o = 0; o < r.length; o++) {
                                for (var p in r[o]) {
                                    a[p] = (r[o][p] || p);
                                    Lib.Uic.cacheNickName[q] = a[p]
                                }
                            }
                            f(a)
                        }
                    }
                });
                if (l.length > 0) {
                    setTimeout(function() {
                        c(l.splice(0, 1))
                    },
                    10)
                }
            };
            if (l.length > 0) {
                setTimeout(function() {
                    c(l.splice(0, 1))
                },
                10)
            }
        }
    }
};
$registComp("901", {
    load: function() {
        Lib.checkAuthor();
        if ($isAdmin == false && $isLogin) {
            this.loadIsFriend()
        } else {
            if ($isAdmin == false && !$isLogin) {
                this.isFriend = false;
                this.loadOnline()
            } else {
                this.isOnline = true;
                this.showOnlineInfo()
            }
        }
        this.loadNickname();
        this.loadOtherInfo()
    },
    loadIsFriend: function() {
        if ($_GLOBAL.mashAddFriend) {
            this.mashAddFriend = true;
            return
        }
        var a = new Interface("http://control.blog.sina.com.cn/riaapi/profile/IsFriend.php", "jsload");
        a.request({
            GET: {
                friend_uids: scope.$uid,
                version: 7
            },
            onSuccess: (function(b) {
                this.friendSuccessCallback(b)
            }).bind2(this),
            onError: (function(b) {
                this.friendErrorCallback()
            }).bind2(this),
            onFail: (function() {
                this.friendErrorCallback()
            }).bind2(this)
        })
    },
    friendSuccessCallback: function(b) {
        for (var c = 0,
        a = b.length; c < a; c++) {
            if (b[c].uid == scope.$uid) {
                this.isFriend = (b[c].status == 1) ? true: false
            }
        }
        this.isFriend = (this.isFriend != null) ? this.isFriend: false;
        this.loadOnline()
    },
    friendErrorCallback: function() {
        this.isFriend = false;
        this.loadOnline()
    },
    loadOnline: function() {
        if ($isAdmin) {
            this.isOnline = true;
            this.showOnlineInfo()
        } else {
            var a = Utils.Io.JsLoad.request("http://online.sso.sina.com.cn/status/MutiqueryVProduct.php", {
                GET: {
                    UIDS: "[" + scope.$uid + "]",
                    Check: scope.$key,
                    ProductType: "1000",
                    Verbose: "0",
                    noencode: true
                },
                onComplete: Core.Function.bind2(function(b) {
                    try {
                        var c = b.Status;
                        this.isOnline = (c[0] == 1) ? true: false
                    } catch(d) {
                        this.isOnline = $isAdmin ? true: false
                    }
                    this.showVisitButton();
                    this.showOnlineInfo()
                },
                this),
                onException: Core.Function.bind2(function() {
                    this.isOnline = false;
                    this.showVisitButton();
                    this.showOnlineInfo()
                },
                this)
            })
        }
    },
    loadNickname: function() {
        Lib.Uic.getNickName([scope.$uid], Core.Function.bind2(function(a) {
            this.showNickName(a)
        },
        this))
    },
    showOnlineInfo: function() {},
    showNickName: function() {},
    showVisitButton: function() {},
    loadOtherInfo: function() {},
    mashAddFriend: false,
    reload: function(c, b, d) {
        var a = c == null || (c && (c == 210 || c == 510 || c == 730));
        if (!a) {
            Debug.error("请检查传入的组件尺寸是否正确。" + c);
            return
        }
        this.size = c || this.size;
        if (d == true || this.cacheData == null) {
            this.load()
        } else {
            this["render_" + this.size]()
        }
        if (b) {
            this.setManage()
        }
    }
},
"dynamic");
Core.String.j2o = function(str) {
    if (!str || str == "") {
        return null
    }
    try {
        var o = window.eval("(" + str + ")");
        return o
    } catch(e) {
        trace("j2o : 数据分析出错");
        traceError(e);
        return null
    }
};
Utils.Io.Ijax = {
    arrTaskLists: [],
    createLoadingIframe: function() {
        if (this.loadFrames != null) {
            return false
        }
        var d = "loadingIframe_thread" + Math.ceil(Math.random() * 10000);
        var c = "loadingIframe_thread" + Math.ceil((Math.random() + 1) * 10000);
        this.loadFrames = [d, c];
        var b = '<iframe id="' + d + '" name="' + d + '" class="invisible"	              scrolling="no" src=""	              allowTransparency="true" style="display:none;" frameborder="0"	              ></iframe>				  <iframe id="' + c + '" name="' + c + '" class="invisible"	              scrolling="no" src=""	              allowTransparency="true" style="display:none;" frameborder="0"	              ></iframe>';
        var a = $C("div");
        a.id = "ijax_iframes";
        a.innerHTML = b;
        trace("创建 Ijax 需要的 iframe");
        document.body.appendChild(a);
        var f = setInterval(Core.Function.bind2(function() {
            if ($E(this.loadFrames[0]) != null && $E(this.loadFrames[1]) != null) {
                clearInterval(f);
                f = null;
                this.loadingIframe = {
                    thread1: {
                        container: $E(this.loadFrames[0]),
                        isBusy: false
                    },
                    thread2: {
                        container: $E(this.loadFrames[1]),
                        isBusy: false
                    }
                };
                this.loadByList()
            }
        },
        this), 10)
    },
    isIjaxReady: function() {
        if (typeof this.loadingIframe == "undefined") {
            return false
        }
        for (var a in this.loadingIframe) {
            if (this.loadingIframe[a].isBusy == false) {
                this.loadingIframe[a].isBusy = true;
                return this.loadingIframe[a]
            }
        }
        return false
    },
    request: function(a, c) {
        var b = {};
        b.url = a;
        b.option = c || {};
        this.arrTaskLists.push(b);
        if (this.loadFrames == null) {
            this.createLoadingIframe()
        } else {
            this.loadByList()
        }
    },
    loadByList: function() {
        if (this.arrTaskLists.length == 0) {
            return false
        }
        var a = this.isIjaxReady();
        if (a == false) {
            return false
        }
        var b = this.arrTaskLists[0];
        this.loadData(b.url, b.option, a);
        this.arrTaskLists.shift()
    },
    loadData: function(b, d, l) {
        var c = new Utils.Url(b);
        if (d.GET) {
            for (var m in d.GET) {
                c.setParam(m, Core.String.encodeDoubleByte(d.GET[m]))
            }
        }
        c.setParam("domain", "1");
        c = c.toString();
        var i = l.container;
        i.listener = Core.Function.bind2(function() {
            try {
                var n = i.contentWindow.document,
                o;
                var p = Core.Dom.byClz(n, "textarea", "")[0];
                if (typeof p != "undefined") {
                    o = p.value
                } else {
                    o = n.body.innerHTML
                }
                if (d.onComplete) {
                    d.onComplete(o)
                } else {
                    d.onException()
                }
            } catch(q) {
                traceError(q);
                if (d.onException) {
                    d.onException(q.message, c.toString())
                }
            }
            l.isBusy = false;
            Core.Events.removeEvent(i, i.listener, "load");
            this.loadByList()
        },
        this);
        Core.Events.addEvent(i, i.listener, "load");
        if (d.POST) {
            var a = $C("form");
            a.id = "IjaxForm";
            a.action = c;
            a.method = "post";
            a.target = i.id;
            for (var j in d.POST) {
                var g = $C("input");
                g.type = "hidden";
                g.name = j;
                g.value = Core.String.encodeDoubleByte(d.POST[j]);
                a.appendChild(g)
            }
            document.body.appendChild(a);
            a.submit()
        } else {
            try {
                window.frames(i.id).location.href = c
            } catch(f) {
                i.src = c
            }
        }
    }
};
Utils.Io.Ajax = {
    createRequest: function() {
        var c = null;
        try {
            c = new XMLHttpRequest()
        } catch(b) {
            try {
                c = new ActiveXObject("Msxml2.XMLHTTP")
            } catch(d) {
                try {
                    c = ActiveXObject("Microsoft.XMLHTTP")
                } catch(a) {}
            }
        }
        if (c == null) {
            trace("create request failed")
        } else {
            return c
        }
    },
    request: function(a, b) {
        b = b || {};
        b.onComplete = b.onComplete ||
        function() {};
        b.onException = b.onException ||
        function() {};
        b.returnType = b.returnType || "txt";
        b.method = b.method || "get";
        b.data = b.data || {};
        if (typeof b.GET != "undefined" && typeof b.GET.url_random != "undefined" && b.GET.url_random == 0) {
            this.rand = false;
            b.GET.url_random = null
        }
        this.loadData(a, b)
    },
    loadData: function(url, option) {
        var request = this.createRequest(),
        tmpArr = [];
        var _url = new Utils.Url(url);
        if (option.POST) {
            for (var postkey in option.POST) {
                var postvalue = option.POST[postkey];
                if (postvalue != null) {
                    tmpArr.push(postkey + "=" + Core.String.encodeDoubleByte(postvalue))
                }
            }
        }
        var sParameter = tmpArr.join("&") || "";
        if (option.GET) {
            for (var key in option.GET) {
                if (key != "url_random") {
                    _url.setParam(key, Core.String.encodeDoubleByte(option.GET[key]))
                }
            }
        }
        if (this.rand != false) {}
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                var response, type = option.returnType;
                try {
                    switch (type) {
                    case "txt":
                        response = request.responseText;
                        break;
                    case "xml":
                        if ($IE) {
                            response = request.responseXML
                        } else {
                            var Dparser = new DOMParser();
                            response = Dparser.parseFromString(request.responseText, "text/xml")
                        }
                        break;
                    case "json":
                        response = eval("(" + request.responseText + ")");
                        break
                    }
                    option.onComplete(response)
                } catch(e) {
                    option.onException(e.message, _url);
                    return false
                }
            }
        };
        try {
            if (option.POST) {
                request.open("POST", _url, true);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                trace(sParameter);
                request.send(sParameter)
            } else {
                request.open("GET", _url, true);
                request.send(null)
            }
        } catch(e) {
            option.onException(e.message, _url);
            return false
        }
    }
};
var Interface = function(a, b) {
    this.url = new Utils.Url(a);
    this.type = b.toLowerCase()
};
Interface.prototype = {
    url: null,
    type: "",
    request: function(b) {
        var d = b.onError;
        var a = b.onSuccess;
        b.onComplete = b.onSuccess = function(f) {
            try {
                if (typeof f == "string") {
                    f = f.replace(/;$/, "")
                }
                f = (typeof f == "string" && (/\s*{/.test(f))) ? Core.String.j2o(f) : f;
                if (f != null && typeof f.code == "undefined") {
                    trace("\u63a5\u53e3\u6570\u636e\u5f02\u5e38：" + this.url, "#F00");
                    return
                }
                if (f != null) {
                    if (f.code == "A00006") {
                        a(f.data)
                    } else {
                        d(f)
                    }
                } else {
                    d(f)
                }
            } catch(g) {
                traceError(g)
            }
        }.bind2(this);
        b.onException = b.onError = b.onFail ||
        function() {
            trace("\u63a5\u53e3\u5931\u8d25：" + this.url, "#F00");
            if (arguments.length > 0) {
                for (var g = 0,
                f = arguments.length; g < f; g++) {
                    if (arguments[g] && typeof arguments[g] != "undefined") {
                        trace("\u9519\u8bef\u4fe1\u606f：" + arguments[g].toString())
                    }
                }
            }
        }.bind2(this);
        var c = this.url.toString();
        switch (this.type) {
        case "ijax":
            Utils.Io.Ijax.request(c, b);
            break;
        case "ajax":
            Utils.Io.Ajax.request(c, b);
            break;
        case "script":
        case "jsload":
            Utils.Io.JsLoad.request(c, b);
            break;
        default:
            throw new Error("\u672a\u6307\u5b9a\u6709\u6548\u7684\u6570\u636e\u4f20\u8f93\u7c7b\u578b")
        }
    }
};
Core.System.winSize = function(b) {
    var a, c;
    if (b) {
        target = b.document
    } else {
        target = document
    }
    if (self.innerHeight) {
        if (b) {
            target = b.self
        } else {
            target = self
        }
        a = target.innerWidth;
        c = target.innerHeight
    } else {
        if (target.documentElement && target.documentElement.clientHeight) {
            a = target.documentElement.clientWidth;
            c = target.documentElement.clientHeight
        } else {
            if (target.body) {
                a = target.body.clientWidth;
                c = target.body.clientHeight
            }
        }
    }
    return {
        width: a,
        height: c
    }
};
Core.Events.getEvent = function() {
    return window.event
};
if (!$IE) {
    Core.Events.getEvent = function() {
        if (window.event) {
            return window.event
        }
        var b = arguments.callee.caller;
        var a;
        var c = 0;
        while (b != null && c < 40) {
            a = b.arguments[0];
            if (a && (a.constructor == Event || a.constructor == MouseEvent)) {
                return a
            }
            c++;
            b = b.caller
        }
        return a
    }
}
Core.Events.stopEvent = function(a) {
    var b = a ? a: Core.Events.getEvent();
    if (b != null) {
        b.cancelBubble = true;
        b.returnValue = false
    }
};
if (!$IE) {
    Core.Events.stopEvent = function(a) {
        var b = a ? a: Core.Events.getEvent();
        if (b != null) {
            b.preventDefault();
            b.stopPropagation()
        }
    }
}
Sina.pkg("Ui");
if (typeof Ui == "undefined") {
    Ui = Sina.Ui
}
Ui.Template = function(a) {
    this.tmpl = a;
    this.pattern = /(#\{(.*?)\})/g
};
Ui.Template.prototype = {
    evaluate: function(a) {
        return this.tmpl.replace(this.pattern,
        function() {
            return a[arguments[2]] || ""
        })
    },
    evaluateMulti: function(c, a) {
        var b = [];
        Core.Array.foreach(c, Core.Function.bind2(function(d, f) {
            f = a ? c.length - f: f;
            b[f] = this.evaluate(d)
        },
        this));
        return b.join("")
    }
};
var Layer = function(b) {
    this.entity = null;
    this.ifm = null;
    var d = this;
    var c = {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        isFixed: false,
        uniqueID: "",
        entityID: "",
        contentID: "",
        template: b,
        templateString: "",
        nodes: {}
    };
    this.getProperty = function() {
        return c
    }; (function a() {
        var f = d.getProperty();
        f.uniqueID = "_" + d.getUniqueID();
        f.entityID = f.uniqueID + "_entity";
        f.contentID = f.uniqueID + "_content";
        d.setTemplate(f.template);
        f.width = parseInt(d.entity.style.width);
        if ($IE6) {
            d.addIframe()
        }
        document.body.appendChild(d.entity);
        d.hidden()
    })();
    this._ie6Fixed = function() {
        d.entity.style.left = document.documentElement.scrollLeft + d.getProperty().x + "px";
        d.entity.style.top = document.documentElement.scrollTop + d.getProperty().y + "px";
        if (d.ifm) {
            d.ifm.style.left = document.documentElement.scrollLeft + d.getProperty().x + "px";
            d.ifm.style.top = document.documentElement.scrollTop + d.getProperty().y + "px"
        }
    }
};
Layer.prototype = {
    setTemplate: function(c) {
        var f = this.getProperty();
        var d = /[^\{\}]+(?=\})/g;
        f.template = c;
        f.templateString = f.template.match(d);
        if (this.entity) {
            this.entity.parentNode.removeChild(this.entity);
            this.entity = null
        }
        this.entity = $C("div");
        var b = $C("div");
        var a = new Ui.Template(f.template);
        b.innerHTML = a.evaluate(this.getNodes("i"));
        document.body.appendChild(b);
        if (!$E(f.entityID) || !$E(f.contentID)) {
            throw new Error("[Error from layer.js] there missing #{entityID} or #{contentID} in layer template")
        } else {
            this.entity = $E(f.entityID);
            this.entity.style.position = "absolute";
            this.entity.style.zIndex = "1024";
            this.entity.style.left = f.x + "px";
            this.entity.style.top = f.y + "px";
            document.body.replaceChild(this.entity, b);
            b = null
        }
        f.nodes = this.getNodes()
    },
    setSize: function(a) {
        var b = this.getProperty();
        Core.System.parseParam(b, a);
        if (a.width) {
            b.nodes.content.style.width = b.width + "px"
        }
        if (a.height) {
            b.nodes.content.style.height = b.height + "px"
        }
        this.updateIfmSize()
    },
    setPosition: function(a) {
        var b = this.getProperty();
        Core.System.parseParam(b, a);
        this.entity.style.left = b.x + "px";
        this.entity.style.top = b.y + "px";
        if ($IE6 && b.isFixed) {
            this.entity.style.left = b.x + document.documentElement.scrollLeft + "px";
            this.entity.style.top = b.y + document.documentElement.scrollTop + "px"
        }
        if (this.ifm) {
            this.ifm.style.left = this.entity.style.left;
            this.ifm.style.top = this.entity.style.top
        }
    },
    getWidth: function() {
        var a = this.entity.style.display;
        var b = this.entity.style.visibility;
        this.entity.style.visibility = "hidden";
        this.entity.style.display = "";
        w = this.entity.offsetWidth;
        this.entity.style.display = a;
        this.entity.style.visibility = b;
        return w
    },
    getHeight: function() {
        var a = this.entity.style.display;
        var b = this.entity.style.visibility;
        this.entity.style.visibility = "hidden";
        this.entity.style.display = "";
        h = this.entity.offsetHeight;
        this.entity.style.display = a;
        this.entity.style.visibility = b;
        return h
    },
    getX: function() {
        return parseInt(this.entity.style.left)
    },
    getY: function() {
        return parseInt(this.entity.style.top)
    },
    updateIfmSize: function() {
        if (this.ifm) {
            var a = this;
            a.ifm.style.width = a.entity.offsetWidth + "px";
            a.ifm.style.height = a.entity.offsetHeight + "px"
        }
    },
    setFixed: function(b) {
        var a = this.getProperty();
        a.isFixed = b;
        var c = this;
        if ($IE6) {
            c.entity.style.position = "absolute";
            if (a.isFixed) {
                c._ie6Fixed();
                Core.Events.addEvent(window, c._ie6Fixed, "scroll")
            } else {
                Core.Events.removeEvent(window, c._ie6Fixed, "scroll")
            }
            return
        }
        if (a.isFixed && $FF2) {
            c.updateFixed();
            return
        }
        this.entity.style.position = a.isFixed ? "fixed": "absolute"
    },
    updateFixed: function() {
        var c = this.getProperty();
        if (c.isFixed && $FF2) {
            var d = this;
            var b = c.x,
            a = c.y;
            d.entity.style.position = "absolute";
            d.setPosition({
                x: c.x + document.documentElement.scrollLeft,
                y: c.y + document.documentElement.scrollTop
            });
            d.entity.style.position = "fixed";
            d.setPosition({
                x: b,
                y: a
            })
        }
    },
    show: function() {
        this.entity.style.display = "";
        if (this.ifm) {
            this.ifm.style.display = "";
            this.updateIfmSize()
        }
    },
    hidden: function() {
        this.entity.style.display = "none";
        if (this.ifm) {
            this.ifm.style.display = "none"
        }
    },
    addIframe: function() {
        this.ifm = $C("iframe");
        this.ifm.style.position = "absolute";
        this.ifm.style.zIndex = "1024";
        this.ifm.style.left = this.entity.style.left;
        this.ifm.style.top = this.entity.style.top;
        document.body.appendChild(this.ifm);
        Core.Dom.setStyle(this.ifm, "opacity", 0)
    },
    getNodes: function(j) {
        var g = this.getProperty();
        var b = j || "o";
        var d;
        var c = {};
        var a = g.templateString;
        if (a) {
            for (d = 0; d < a.length; d++) {
                var f = a[d];
                switch (b) {
                case "o":
                    c[f] = $E(g.uniqueID + "_" + f);
                    break;
                case "i":
                    c[f] = g.uniqueID + "_" + f;
                    break
                }
            }
        }
        return c
    },
    getUniqueID: function() {
        return parseInt(Math.random() * 10000).toString() + (new Date).getTime().toString()
    },
    setContent: function(a) {
        var b = this.getProperty();
        if (a) {
            b.nodes.content.innerHTML = a
        }
    }
};
Core.Dom.getStyle = function(a, c) {
    switch (c) {
    case "opacity":
        var f = 100;
        try {
            f = a.filters["DXImageTransform.Microsoft.Alpha"].opacity
        } catch(d) {
            try {
                f = a.filters("alpha").opacity
            } catch(d) {}
        }
        return f / 100;
    case "float":
        c = "styleFloat";
    default:
        var b = a.currentStyle ? a.currentStyle[c] : null;
        return (a.style[c] || b)
    }
};
if (!$IE) {
    Core.Dom.getStyle = function(a, c) {
        if (c == "float") {
            c = "cssFloat"
        }
        try {
            var b = document.defaultView.getComputedStyle(a, "")
        } catch(d) {
            traceError(d)
        }
        return a.style[c] || b ? b[c] : null
    }
} (function() {
    var n = {
        simple: function(s, p, q, r) {
            return q * s / r + p
        },
        backEaseIn: function(q, p, v, u) {
            var r = 1.70158;
            return v * (q /= u) * q * ((r + 1) * q - r) + p
        },
        backEaseOut: function(u, q, A, z, r, y) {
            var v = 1.70158;
            return A * ((u = u / z - 1) * u * ((v + 1) * u + v) + 1) + q
        },
        backEaseInOut: function(u, q, A, z, r, y) {
            var v = 1.70158;
            if ((u /= z / 2) < 1) {
                return A / 2 * (u * u * (((v *= (1.525)) + 1) * u - v)) + q
            }
            return A / 2 * ((u -= 2) * u * (((v *= (1.525)) + 1) * u + v) + 2) + q
        },
        bounceEaseOut: function(q, p, s, r) {
            if ((q /= r) < (1 / 2.75)) {
                return s * (7.5625 * q * q) + p
            } else {
                if (q < (2 / 2.75)) {
                    return s * (7.5625 * (q -= (1.5 / 2.75)) * q + 0.75) + p
                } else {
                    if (q < (2.5 / 2.75)) {
                        return s * (7.5625 * (q -= (2.25 / 2.75)) * q + 0.9375) + p
                    } else {
                        return s * (7.5625 * (q -= (2.625 / 2.75)) * q + 0.984375) + p
                    }
                }
            }
        },
        bounceEaseIn: function(q, p, s, r) {
            return s - n.bounceEaseOut(r - q, 0, s, r) + p
        },
        bounceEaseInOut: function(q, p, s, r) {
            if (q < r / 2) {
                return n.bounceEaseIn(q * 2, 0, s, r) * 0.5 + p
            } else {
                return n.bounceEaseOut(q * 2 - r, 0, s, r) * 0.5 + s * 0.5 + p
            }
        },
        strongEaseInOut: function(q, p, s, r) {
            return s * (q /= r) * q * q * q * q + p
        },
        regularEaseIn: function(q, p, s, r) {
            return s * (q /= r) * q + p
        },
        regularEaseOut: function(q, p, s, r) {
            return - s * (q /= r) * (q - 2) + p
        },
        regularEaseInOut: function(q, p, s, r) {
            if ((q /= r / 2) < 1) {
                return s / 2 * q * q + p
            }
            return - s / 2 * ((--q) * (q - 2) - 1) + p
        },
        strongEaseIn: function(q, p, s, r) {
            return s * (q /= r) * q * q * q * q + p
        },
        strongEaseOut: function(q, p, s, r) {
            return s * ((q = q / r - 1) * q * q * q * q + 1) + p
        },
        strongEaseInOut: function(q, p, s, r) {
            if ((q /= r / 2) < 1) {
                return s / 2 * q * q * q * q * q + p
            }
            return s / 2 * ((q -= 2) * q * q * q * q + 2) + p
        },
        elasticEaseIn: function(u, q, A, z, r, y) {
            if (u == 0) {
                return q
            }
            if ((u /= z) == 1) {
                return q + A
            }
            if (!y) {
                y = z * 0.3
            }
            if (!r || r < Math.abs(A)) {
                r = A;
                var v = y / 4
            } else {
                var v = y / (2 * Math.PI) * Math.asin(A / r)
            }
            return - (r * Math.pow(2, 10 * (u -= 1)) * Math.sin((u * z - v) * (2 * Math.PI) / y)) + q
        },
        elasticEaseOut: function(u, q, A, z, r, y) {
            if (u == 0) {
                return q
            }
            if ((u /= z) == 1) {
                return q + A
            }
            if (!y) {
                y = z * 0.3
            }
            if (!r || r < Math.abs(A)) {
                r = A;
                var v = y / 4
            } else {
                var v = y / (2 * Math.PI) * Math.asin(A / r)
            }
            return (r * Math.pow(2, -10 * u) * Math.sin((u * z - v) * (2 * Math.PI) / y) + A + q)
        },
        elasticEaseInOut: function(u, q, A, z, r, y) {
            if (u == 0) {
                return q
            }
            if ((u /= z / 2) == 2) {
                return q + A
            }
            if (!y) {
                var y = z * (0.3 * 1.5)
            }
            if (!r || r < Math.abs(A)) {
                var r = A;
                var v = y / 4
            } else {
                var v = y / (2 * Math.PI) * Math.asin(A / r)
            }
            if (u < 1) {
                return - 0.5 * (r * Math.pow(2, 10 * (u -= 1)) * Math.sin((u * z - v) * (2 * Math.PI) / y)) + q
            }
            return r * Math.pow(2, -10 * (u -= 1)) * Math.sin((u * z - v) * (2 * Math.PI) / y) * 0.5 + A + q
        }
    };
    var i = function(p) {
        return p.uniqueID
    };
    if (!$IE) {
        i = function(q) {
            try {
                var p;
                if (q.getAttribute("uniqueID") == null) {
                    p = "moz__id" + parseInt(Math.random() * 100) + "_" + new Date().getTime();
                    q.setAttribute("uniqueID", p);
                    return p
                }
                return q.getAttribute("uniqueID")
            } finally {
                p = null
            }
        }
    }
    function l(q) {
        try {
            var p = q.constructor.toString().toLowerCase();
            return p.slice(p.indexOf("function") + 9, p.indexOf("()"))
        } finally {
            p = null
        }
    }
    function j(t, s) {
        var r, q, p = [];
        q = s.length;
        for (r = 0; r < q; r++) {
            p[p.length] = parseFloat(Core.Dom.getStyle(t, s[r]))
        }
        return p
    }
    function m(p) {
        return l(p) != "array" ? [p] : p
    }
    function c(p, v) {
        try {
            var s = l(p);
            var y = [],
            u = [],
            t,
            r,
            q;
            if (s != "array") {
                q = g(p);
                q[1] = v == "opacity" ? "": q[1];
                y = [q[0]];
                u = [q[1]]
            } else {
                r = p.length;
                for (t = 0; t < r; t++) {
                    q = g(p[t]);
                    q[1] = v[t] == "opacity" ? "": q[1];
                    y[y.length] = q[0];
                    u[u.length] = q[1]
                }
            }
            return [y, u]
        } finally {
            s = y = u = t = r = q = null
        }
    }
    function g(q) {
        try {
            var p = /(-?\d.?\d*)([a-z%]*)/i.exec(q);
            return [p[1], p[2] ? p[2] : "px"]
        } finally {
            p = null
        }
    }
    var a = {};
    var f = {};
    function b(r) {
        try {
            var q = i(r);
            var p;
            if (a[q] != true) {
                p = new d();
                f[q] = {
                    node: r,
                    func: p
                };
                a[q] = true;
                return p
            } else {
                return f[q].func
            }
        } finally {
            q = p = null
        }
    }
    function d() {
        this._timer = null
    }
    d.prototype.start = function(y, v, s, u, t, z) {
        this.reset();
        z = z || {};
        if (z.end) {
            this._func.end = z.end
        }
        if (z.tween) {
            this._func.tween = z.tween
        }
        var q = m(v);
        var p = j(y, q);
        var r = c(s, q);
        this._node = y;
        this._property = q;
        this._endingvalue = r[0];
        this._suffixvalue = r[1];
        this._startvalue = p;
        this._end = false;
        this._fps = 0;
        if (u != null) {
            this._seconds = u
        }
        if (n[t] != null) {
            this._animation = n[t]
        }
        this._starttime = new Date().getTime();
        this._timer = setInterval(Core.Function.bind3(this.play, this), 10)
    };
    d.prototype.play = function() {
        var s = (new Date().getTime() - this._starttime) / 1000;
        var r, q, p = this._property.length;
        if (s > this._seconds) {
            s = this._seconds
        }
        for (r = 0; r < p; r++) {
            q = this._animation(s, this._startvalue[r], this._endingvalue[r] - this._startvalue[r], this._seconds);
            Core.Dom.setStyle(this._node, this._property[r], q + this._suffixvalue[r])
        }
        this._fps++;
        this._func.tween();
        if (s == this._seconds) {
            this.stop()
        }
    };
    d.prototype.stop = function() {
        clearInterval(this._timer);
        this._end = true;
        this._func.end()
    };
    d.prototype.reset = function() {
        clearInterval(this._timer);
        this._end = false;
        this._node = null;
        this._property = [];
        this._startvalue = [];
        this._endingvalue = [];
        this._suffixvalue = [];
        this._fps = 0;
        this._seconds = 0.5;
        this._animation = n.simple;
        this._func = {
            end: function() {},
            tween: function() {}
        }
    };
    function o(u, v, q, t, r, s) {
        var p = b(u);
        p.start.apply(p, arguments)
    }
    o.stop = function(p) {
        b(p).stop()
    };
    o.isTween = function(p) {
        return ! b(p)._end
    };
    Ui.tween = o
})();
var DialogDisplaySet = {
    alpha1: {
        show: function(g, i, d) {
            var c = 0,
            b = 0,
            a = parseInt(g.style.top) - i;
            g.style.top = a;
            Core.Dom.setStyle(g, "opacity", c);
            g.style.display = "";
            var f = window.setInterval(function() {
                if (c <= 1) {
                    Core.Dom.setStyle(g, "opacity", c)
                }
                if (b <= a + i) {
                    g.style.top = a + b + "px"
                }
                b += 1.5;
                c += 0.05;
                if (c > 0.9 && parseInt(g.style.top) >= a + i) {
                    window.clearInterval(f);
                    if (d) {
                        d()
                    }
                }
            },
            10)
        },
        hidden: function(i, j, f) {
            var c = 1;
            var a = parseInt(i.style.top);
            var d = a - j;
            var b = a;
            var g = window.setInterval(function() {
                if (c >= 0) {
                    Core.Dom.setStyle(i, "opacity", c)
                }
                if (b >= d) {
                    i.style.top = b + "px"
                }
                b -= 1.5;
                c -= 0.05;
                if (c <= 0 && b < d) {
                    window.clearInterval(g);
                    if (f) {
                        f()
                    }
                }
            },
            10)
        }
    },
    alpha: {
        show: function(c, d, b) {
            Core.Dom.setStyle(c, "opacity", 0.3);
            c.style.display = "";
            c.style.top = parseInt(c.style.top) - d + "px";
            var a = parseInt(c.style.top) + d;
            Ui.tween(c, ["top", "opacity"], [a, 0.9], 0.4, "simple", {
                end: b
            })
        },
        hidden: function(c, d, b) {
            var a = parseInt(c.style.top) - d;
            Ui.tween(c, ["top", "opacity"], [a, 0], 0.2, "simple", {
                end: b
            })
        }
    },
    fallDown: {
        show: function(d, b, a, c) {
            d.style.display = "";
            d.style.top = b + "px";
            Ui.tween(d, "top", a, 0.6, "bounceEaseOut", {
                end: c
            })
        },
        hidden: function(d, b, a, c) {
            d.style.display = "";
            d.style.top = b + "px";
            Ui.tween(d, "top", a, 0.6, "strongEaseIn", {
                end: c
            })
        }
    }
};
Core.Events.fixEvent = function(a) {
    if (typeof a == "undefined") {
        a = window.event
    }
    if (!a.target) {
        a.target = a.srcElement;
        a.pageX = a.x;
        a.pageY = a.y
    }
    if (typeof a.layerX == "undefined") {
        a.layerX = a.offsetX
    }
    if (typeof a.layerY == "undefined") {
        a.layerY = a.offsetY
    }
    return a
};
var Drag3 = function(b, c, f) {
    var d = this;
    this.beDragObj = b;
    this.movedObjs = c || this.beDragObj;
    this.dragMode = f || "normal";
    this.canDrag = true;
    this.isLock = false;
    this.lockArea = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    this.dragSet = {
        normal: function() {
            d.normalDrag()
        },
        border: function() {
            d.borderDrag()
        },
        opacity: function() {
            d.opacityDrag()
        }
    };
    this.dragObjsFunc = function() {
        d.onDrag();
        d.dragObjs()
    }; (function a() {
        d.beDragObj.style.MozUserSelect = "none";
        Core.Events.addEvent(d.beDragObj,
        function() {
            return false
        },
        "selectstart");
        Core.Events.addEvent(d.beDragObj,
        function() {
            return false
        },
        "drag");
        for (var g = 0; g < d.movedObjs.length; g++) {
            if (d.movedObjs[g] != d.beDragObj) {
                d.movedObjs[g].style.position = "absolute";
                if (!d.movedObjs[g].style.left) {
                    d.movedObjs[g].style.left = d.movedObjs[g].offsetLeft + "px"
                }
                if (!d.movedObjs[g].style.top) {
                    d.movedObjs[g].style.top = d.movedObjs[g].offsetTop + "px"
                }
            }
        }
        Core.Events.addEvent(d.beDragObj, d.dragSet[d.dragMode], "mousedown");
        if ($IE) {
            Core.Events.addEvent(d.beDragObj,
            function() {
                Core.Events.removeEvent(d.beDragObj, d.dragObjsFunc, "mousemove");
                d.beDragObj.releaseCapture();
                d.onDragEnd()
            },
            "mouseup")
        } else {
            Core.Events.addEvent(document,
            function() {
                Core.Events.removeEvent(document, d.dragObjsFunc, "mousemove");
                d.onDragEnd()
            },
            "mouseup")
        }
    })()
};
Drag3.prototype = {
    capture: function() {
        this.canDrag = true
    },
    release: function() {
        this.canDrag = false
    },
    onDragStart: function() {},
    onDrag: function() {},
    onDragEnd: function() {},
    dragObjs: function() {
        e = Core.Events.getEvent();
        for (var a = 0; a < this.movedObjs.length; a++) {
            if (this.isLock) {
                if (e.clientX - this.movedObjs[a].deltaX < this.lockArea.left) {
                    this.movedObjs[a].style.left = this.lockArea.left + "px"
                } else {
                    if (e.clientX - this.movedObjs[a].deltaX > this.lockArea.right - this.movedObjs[a].offsetWidth) {
                        this.movedObjs[a].style.left = this.lockArea.right - this.movedObjs[a].offsetWidth + "px"
                    } else {
                        this.movedObjs[a].style.left = e.clientX - this.movedObjs[a].deltaX + "px"
                    }
                }
                if (e.clientY - this.movedObjs[a].deltaY < this.lockArea.top) {
                    this.movedObjs[a].style.top = this.lockArea.top + "px"
                } else {
                    if (e.clientY - this.movedObjs[a].deltaY > this.lockArea.bottom - this.movedObjs[a].offsetHeight) {
                        this.movedObjs[a].style.top = this.lockArea.bottom - this.movedObjs[a].offsetHeight + "px"
                    } else {
                        this.movedObjs[a].style.top = e.clientY - this.movedObjs[a].deltaY + "px"
                    }
                }
            } else {
                this.movedObjs[a].style.left = e.clientX - this.movedObjs[a].deltaX + "px";
                this.movedObjs[a].style.top = e.clientY - this.movedObjs[a].deltaY + "px"
            }
        }
    },
    normalDrag: function() {
        var b = this;
        e = Core.Events.getEvent();
        for (var a = 0; a < b.movedObjs.length; a++) {
            b.movedObjs[a].deltaX = e.clientX - parseInt(b.movedObjs[a].style.left);
            b.movedObjs[a].deltaY = e.clientY - parseInt(b.movedObjs[a].style.top)
        }
        if (b.canDrag) {
            if ($IE) {
                b.beDragObj.setCapture();
                Core.Events.addEvent(b.beDragObj, b.dragObjsFunc, "mousemove")
            } else {
                Core.Events.addEvent(document, b.dragObjsFunc, "mousemove")
            }
        }
        b.onDragStart()
    },
    borderDrag: function(b, a) {},
    opacityDrag: function(b, a) {}
};
Ui.Drag3 = Drag3;
var Dialog = function(b) {
    var d = this;
    d.entity = null;
    d.ifm = null;
    var c = {
        id: "",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        isFixed: false,
        layer: new Layer(b),
        template: b,
        canDrag: false,
        dragEntity: null,
        name: "",
        uniqueID: "",
        isShow: false,
        nodes: {},
        focusNode: null,
        displayMode: "normal",
        _modeDisplayRuning: false,
        enabled: true
    };
    this.getProperty = function() {
        return c
    }; (function a() {
        var g = d.getProperty();
        var f;
        g.uniqueID = g.layer.getProperty().uniqueID;
        g.id = g.uniqueID + "_dialog";
        g.nodes = d.getNodes();
        d.entity = g.layer.entity;
        d.ifm = g.layer.ifm;
        g.width = parseInt(d.entity.style.width);
        if (g.nodes.titleBar) {
            g.dragEntity = new Ui.Drag3(g.nodes.titleBar, d.ifm ? [d.ifm, d.entity] : [d.entity]);
            g.nodes.titleBar.style.cursor = "move";
            Core.Events.addEvent(g.nodes.titleBar,
            function() {
                return false
            },
            "selectstart");
            g.dragEntity.onDrag = function() {
                d.onDrag()
            }
        }
        Core.Events.addEvent(window,
        function() {
            if (g.isShow && g.isFixed) {
                var l = Core.System.winSize();
                var j = l.width / 2 - d.getWidth() / 2;
                var i = l.height / 2 - d.getHeight() / 2;
                j = j < 0 ? 0 : j;
                i = i < 0 ? 0 : i;
                d.setPosition({
                    x: j,
                    y: i
                })
            }
        },
        "resize")
    })()
};
Dialog.prototype = {
    setPosition: function(a) {
        var b = this.getProperty();
        Core.System.parseParam(b, a);
        this.getProperty().layer.setPosition(a)
    },
    setSize: function(a) {
        var b = this.getProperty();
        Core.System.parseParam(b, a);
        b.layer.setSize(a)
    },
    setFixed: function(b) {
        var a = this.getProperty();
        a.isFixed = b;
        this.getProperty().layer.setFixed(a.isFixed)
    },
    setContent: function(a) {
        var b = this.getProperty();
        this.getProperty().layer.setContent(a)
    },
    setTemplate: function(a) {
        var b = this.getProperty();
        b.template = a;
        b.layer.setTemplate(b.template)
    },
    setDrag: function(a) {
        var b = this.getProperty();
        b.canDrag = a;
        if (b.canDrag) {
            b.dragEntity.capture()
        } else {
            b.dragEntity.release()
        }
    },
    getWidth: function() {
        return this.getProperty().layer.getWidth()
    },
    getHeight: function() {
        return this.getProperty().layer.getHeight()
    },
    getX: function() {
        return this.getProperty().layer.getX()
    },
    getY: function() {
        return this.getProperty().layer.getY()
    },
    show: function(b) {
        var a = this.getProperty();
        var c = this;
        a.isShow = true;
        if (this.ifm) {
            this.ifm.style.display = ""
        }
        this.onShow();
        if (a.displayMode == "normal" || b == "normal") {
            this.entity.style.display = ""
        } else {
            a._modeDisplayRuning = true;
            a.enabled = false;
            this._showWithMode(function() {
                a._modeDisplayRuning = false;
                a.enabled = true;
                if (c.onDisplaied) {
                    c.onDisplaied()
                }
            })
        }
    },
    close: function(b) {
        var c = this;
        var a = this.getProperty();
        if (a.displayMode == "normal" || b == "normal") {
            a.isShow = false;
            a.layer.hidden();
            this.destroy();
            this.onClose();
            if (c.onDisplayFinished) {
                c.onDisplayFinished()
            }
        } else {
            if (!a._modeDisplayRuning) {
                a._modeDisplayRuning = true;
                a.enabled = false;
                this._hiddenWithMode(function() {
                    a.isShow = false;
                    a.layer.hidden();
                    a._modeDisplayRuning = false;
                    a.enabled = true;
                    c.destroy();
                    c.onClose();
                    if (c.onDisplayFinished) {
                        c.onDisplayFinished()
                    }
                })
            }
        }
    },
    hidden: function(b) {
        var c = this;
        var a = this.getProperty();
        if (a.displayMode == "normal" || b == "normal") {
            a.isShow = false;
            a.layer.hidden();
            this.onHidden();
            if (c.onDisplayFinished) {
                c.onDisplayFinished()
            }
        } else {
            if (!a._modeDisplayRuning) {
                a._modeDisplayRuning = true;
                a.enabled = false;
                this._hiddenWithMode(function() {
                    a.isShow = false;
                    a.layer.hidden();
                    c.onHidden();
                    a._modeDisplayRuning = false;
                    a.enabled = true;
                    if (c.onDisplayFinished) {
                        c.onDisplayFinished()
                    }
                })
            }
        }
    },
    _showWithMode: function(a) {
        var c = this.getProperty();
        var b = Core.System.winSize();
        var d = this;
        switch (c.displayMode) {
        case "alpha":
            DialogDisplaySet.alpha.show(this.entity, 20, a);
            break
        }
    },
    _hiddenWithMode: function(a) {
        var c = this.getProperty();
        var d = this;
        var b = Core.System.winSize();
        switch (c.displayMode) {
        case "alpha":
            DialogDisplaySet.alpha.hidden(this.entity, 20, a);
            break
        }
    },
    destroy: function() {
        try {
            if (this.getProperty().nodes.iframe) {
                this.getProperty().nodes.iframe.src = ""
            }
        } catch(a) {}
        this.entity && this.entity.parentNode.removeChild(this.entity);
        this.entity = null;
        if (this.ifm) {
            this.ifm.parentNode.removeChild(this.ifm);
            this.ifm = null
        }
    },
    onShow: function() {},
    onClose: function() {},
    onHidden: function() {},
    onDrag: function() {},
    onDisplaied: function() {},
    onDisplayFinished: function() {},
    setAreaLocked: function(a) {
        var b = this.getProperty();
        b.dragEntity.isLock = a;
        var c = this;
        if (a) {
            c._updateLockArea();
            Core.Events.addEvent(window,
            function() {
                c._updateLockArea()
            },
            "resize")
        }
    },
    _updateLockArea: function() {
        var b = this.getProperty();
        var a = Core.System.winSize();
        if (b.isFixed) {
            if ($IE6) {
                b.dragEntity.lockArea = {
                    left: document.documentElement.scrollLeft,
                    right: document.documentElement.scrollLeft + a.width,
                    top: document.documentElement.scrollTop,
                    bottom: document.documentElement.scrollTop + a.height
                };
                Core.Events.addEvent(window,
                function() {
                    b.dragEntity.lockArea = {
                        left: document.documentElement.scrollLeft,
                        right: document.documentElement.scrollLeft + a.width,
                        top: document.documentElement.scrollTop,
                        bottom: document.documentElement.scrollTop + a.height
                    }
                },
                "scroll");
                Core.Events.addEvent(window,
                function() {
                    b.dragEntity.lockArea = {
                        left: document.documentElement.scrollLeft,
                        right: document.documentElement.scrollLeft + a.width,
                        top: document.documentElement.scrollTop,
                        bottom: document.documentElement.scrollTop + a.height
                    }
                },
                "resize")
            } else {
                b.dragEntity.lockArea = {
                    left: 0,
                    right: a.width,
                    top: 0,
                    bottom: a.height
                }
            }
        } else {
            b.dragEntity.lockArea = {
                left: 0,
                right: document.documentElement.scrollWidth,
                top: 0,
                bottom: document.documentElement.scrollHeight
            }
        }
    },
    updateFixed: function() {
        this.getProperty().layer.updateFixed()
    },
    getNodes: function(a) {
        return this.getProperty().layer.getNodes(a)
    },
    setFocus: function() {
        var b = this.getProperty();
        if (b.focusNode && b.focusNode.style.display != "none") {
            try {
                b.focusNode.focus()
            } catch(a) {}
        } else {
            if (this.entity.style.display != "none") {
                this.entity.focus()
            }
        }
    },
    getUniqueID: function() {
        return this.getProperty().layer.getUniqueID()
    }
};
var DialogManager = {
    dialogs: [],
    activeDialog: {},
    backShadow: null,
    create: function(b, a) {
        var d = this;
        var c = new Dialog(b);
        this.dialogs.push(c);
        this.activeDialog = c;
        c.name = a || c.getUniqueID();
        c.entity.style.zIndex = 1024;
        c.onDrag = function() {
            if ($IE6) {
                if (this.getProperty().isFixed) {
                    this.setPosition({
                        x: (parseInt(this.entity.style.left) - document.documentElement.scrollLeft),
                        y: (parseInt(this.entity.style.top) - document.documentElement.scrollTop)
                    })
                }
            } else {
                if (this.getProperty().isFixed) {
                    this.setPosition({
                        x: parseInt(this.entity.style.left),
                        y: parseInt(this.entity.style.top)
                    })
                }
            }
        };
        c.onClose = function() {
            d.removeDialog(this.name);
            d.updateActiveDialog();
            d.updateShadow();
            if (d.activeDialog) {
                d.activeDialog.setFocus()
            }
        };
        c.onHidden = function() {
            this.isHidden = true;
            if (this == d.activeDialog) {
                d.activeDialog = null
            }
            d.updateActiveDialog();
            d.updateShadow();
            if (d.activeDialog) {
                d.activeDialog.setFocus()
            }
        };
        c.onShow = function() {
            if (this.isHidden) {
                this.isHidden = false;
                var g, f = d.dialogs.length;
                for (g = 0; g < f; g++) {
                    if (d.dialogs[g] == this) {
                        document.body.appendChild(d.dialogs[g].entity);
                        d.dialogs.push(d.dialogs[g]);
                        d.dialogs.splice(g, 1)
                    }
                }
                d.activeDialog = this;
                d.backShadow.show();
                d.updateShadow()
            }
        };
        if (this.backShadow.isShow) {
            this.updateShadow()
        } else {
            this.backShadow.show()
        }
        c.hidden();
        return c
    },
    getDialog: function(b) {
        var c = 0,
        a = this.dialogs.length;
        for (c = 0; c < a; c++) {
            if (this.dialogs[c].name == b) {
                return this.dialogs[c]
            }
        }
    },
    removeDialog: function(b) {
        var c = 0,
        a = this.dialogs.length;
        for (c = a - 1; c >= 0; c--) {
            if (this.dialogs[c].name == b) {
                this.dialogs.splice(c, 1);
                this.activeDialog = this.dialogs[this.dialogs.length - 1];
                break
            }
        }
    },
    updateActiveDialog: function() {
        var b, a = this.dialogs.length;
        for (b = a - 1; b >= 0; b--) {
            if (!this.dialogs[b].isHidden) {
                this.activeDialog = this.dialogs[b];
                break
            }
        }
    },
    updateShadow: function() {
        if (this.activeDialog && !this.activeDialog.isHidden) {
            this.backShadow.insertBefore(this.activeDialog.entity);
            this.activeDialog.updateFixed()
        } else {
            this.backShadow.hidden()
        }
    },
    close: function(b) {
        if (!b) {
            if (this.activeDialog) {
                this.activeDialog.close()
            }
            return
        }
        var c, a = this.dialogs.length;
        for (c = a - 1; c >= 0; c--) {
            if (this.dialogs[c].name == b) {
                this.dialogs[c].close();
                break
            }
        }
    }
};
var BackShadow = function(b) {
    this.entity = null;
    this.isShow = false;
    this._ie6Fixed = function() {
        if (c.entity) {
            c.entity.style.top = document.documentElement.scrollTop + "px";
            c.entity.style.left = document.documentElement.scrollLeft + "px";
            if (c.ifm) {
                c.ifm.style.top = c.entity.style.top;
                c.ifm.style.left = c.entity.style.left
            }
            c.updateSize()
        }
    };
    var c = this; (function a() {
        c.entity = $C("div");
        c.entity.style.position = "absolute";
        c.entity.style.width = c.getAreaWidth() + "px";
        c.entity.style.height = c.getAreaHeight() + "px";
        c.entity.style.left = "0px";
        c.entity.style.top = "0px";
        c.entity.style.zIndex = 1024;
        c.entity.style.backgroundColor = "black";
        document.body.appendChild(c.entity);
        c._setOpacity(c.entity, isNaN(b) ? 0.5 : b);
        if ($IE6) {
            c.entity.style.top = document.documentElement.scrollTop + "px";
            c.addIframe()
        }
        Core.Events.addEvent(window,
        function() {
            if (c.entity) {
                if ($IE6 && c.isShow) {
                    document.documentElement.scrollLeft = 0;
                    c._ie6Fixed()
                }
                setTimeout(function() {
                    c.updateSize()
                },
                1)
            }
        },
        "resize");
        c.setFixed(true);
        c.hidden()
    })()
};
BackShadow.prototype = {
    show: function() {
        this.entity.style.display = "";
        if (this.ifm) {
            this.ifm.style.display = ""
        }
        this.isShow = true;
        this.onShow()
    },
    hidden: function() {
        this.entity.style.display = "none";
        if (this.ifm) {
            this.ifm.style.display = "none"
        }
        this.isShow = false;
        this.onHidden()
    },
    close: function() {
        this.hidden();
        this.destroy()
    },
    destroy: function() {
        Core.Events.removeEvent(window, this._ie6Fixed, "scroll");
        this.entity.parentNode.removeChild(this.entity);
        this.entity = null;
        if (this.ifm) {
            this.ifm.parentNode.removeChild(this.ifm);
            this.ifm = null
        }
    },
    addIframe: function() {
        this.ifm = $C("iframe");
        this._setOpacity(this.ifm, 0);
        this.ifm.style.position = "absolute";
        this.ifm.style.zIndex = this.entity.style.zIndex;
        this.ifm.style.left = this.entity.style.left;
        this.ifm.style.top = this.entity.style.top;
        this.ifm.style.width = this.entity.style.width;
        this.ifm.style.height = this.entity.style.height;
        document.body.insertBefore(this.ifm, this.entity)
    },
    insertBefore: function(a) {
        document.body.insertBefore(this.entity, a);
        if (this.ifm) {
            document.body.insertBefore(this.ifm, this.entity)
        }
    },
    updateSize: function() {
        this.entity.style.width = this.getAreaWidth() + "px";
        this.entity.style.height = this.getAreaHeight() + "px";
        if (this.ifm) {
            this.ifm.style.width = this.getAreaWidth() + "px";
            this.ifm.style.height = this.getAreaHeight() + "px"
        }
    },
    getAreaHeight: function() {
        return document.documentElement.clientHeight
    },
    getAreaWidth: function() {
        return document.documentElement.clientWidth
    },
    setFixed: function(a) {
        if ($IE6) {
            var b = this;
            if (a) {
                b._ie6Fixed();
                Core.Events.addEvent(window, b._ie6Fixed, "scroll")
            } else {
                Core.Events.removeEvent(window, b._ie6Fixed, "scroll")
            }
        } else {
            this.entity.style.position = a ? "fixed": "absolute"
        }
    },
    _setOpacity: function(b, a) {
        if ($IE) {
            b.style.filter = "alpha(opacity=" + a * 100 + ")"
        } else {
            b.style.opacity = a
        }
    },
    onShow: function() {},
    onHidden: function() {}
};
function CustomsDialog(c, b) {
    this.nodesPattern = /[^\{\}]+(?=\})/g;
    this._dialog = DialogManager.create(c, b);
    this.entity = this._dialog.entity;
    this.templateString = "";
    this.nodes = {};
    var d = this; (function a() {
        d._dialog.onDrag = function() {
            if ($IE6) {
                if (this.getProperty().isFixed) {
                    this.setPosition({
                        x: (parseInt(this.entity.style.left) - document.documentElement.scrollLeft),
                        y: (parseInt(this.entity.style.top) - document.documentElement.scrollTop)
                    })
                }
            } else {
                if (this.getProperty().isFixed) {
                    this.setPosition({
                        x: parseInt(this.entity.style.left),
                        y: parseInt(this.entity.style.top)
                    })
                }
            }
            d.onDrag()
        };
        d.updateNodes();
        if (d.nodes.btnClose) {
            Core.Events.addEvent(d.nodes.btnClose,
            function() {
                var f = Core.Events.getEvent();
                if (f) {
                    f.cancelBubble = true
                }
            },
            "mousedown")
        }
    })();
    this._hiddenDialog = function() {
        d.hidden()
    };
    this._closeDialog = function() {
        d.close()
    }
}
CustomsDialog.prototype = {
    isSetMiddle: false,
    setContent: function(a) {
        var c = a;
        this.templateString = c.match(this.nodesPattern);
        var b = new Ui.Template(c);
        this.nodes.content.innerHTML = b.evaluate(this.getContentNodes("i"));
        this.updateNodes()
    },
    setTitle: function(a) {
        if (this.nodes.titleName) {
            this.nodes.titleName.innerHTML = a
        }
    },
    setHelp: function(a) {
        if (this.nodes.btnHelp) {
            if (a) {
                this.nodes.btnHelp.href = a
            } else {
                this.nodes.btnHelp.innerHTML = ""
            }
        }
    },
    setClose: function(a) {
        var b = this;
        if (b.nodes.btnClose) {
            a = a || "hidden";
            switch (a) {
            case "hidden":
                Core.Events.addEvent(b.nodes.btnClose, b._hiddenDialog, "click");
                break;
            case "close":
                Core.Events.addEvent(b.nodes.btnClose, b._closeDialog, "click");
                break
            }
        }
    },
    setPosition: function(a, b) {
        this._dialog.setPosition({
            x: a,
            y: b
        })
    },
    setMiddle: function() {
        var d = Core.System.winSize();
        var g, f;
        var l = this._dialog.entity.style.display;
        this._dialog.setPosition({
            x: -10000
        });
        this._dialog.entity.style.display = "";
        var a = this.nodes.titleBar ? this.nodes.titleBar.offsetHeight: 0;
        var i = d.height - this.nodes.content.offsetHeight - a;
        var b = (Math.sqrt(5) - 1) / 2;
        var c = 1;
        var j = i * b / (b + c);
        g = d.width / 2 - this.nodes.content.offsetWidth / 2;
        g = g < 0 ? 0 : g;
        f = j < 0 ? 0 : j;
        if (!this._dialog.getProperty().isFixed) {
            g = g + document.documentElement.scrollLeft;
            f = f + document.documentElement.scrollTop
        }
        this._dialog.entity.style.display = l;
        this._dialog.setPosition({
            x: g,
            y: f
        });
        this.isSetMiddle = true
    },
    setSize: function(b, a) {
        this._dialog.setSize({
            width: b,
            height: a
        })
    },
    setFixed: function(a) {
        this._dialog.setFixed(a)
    },
    setAreaLocked: function(a) {
        this._dialog.setAreaLocked(a)
    },
    setFocusNode: function(a) {
        this._dialog.getProperty().focusNode = a
    },
    setDisplayMode: function(a) {
        this._dialog.getProperty().displayMode = a || "normal"
    },
    getWidth: function() {
        return this._dialog.getProperty().width
    },
    getHeight: function() {
        return this._dialog.getProperty().height
    },
    getX: function() {
        return this._dialog.getProperty().x
    },
    getY: function() {
        return this._dialog.getProperty().y
    },
    show: function() {
        if (this.isSetMiddle) {
            this.setMiddle()
        }
        this._dialog.show();
        this.onShow()
    },
    hidden: function() {
        this._dialog.hidden();
        this.onHidden()
    },
    close: function() {
        var a = this;
        a._dialog.close();
        a.onClose();
        if (a.nodes.btnClose) {
            Core.Events.removeEvent(a.nodes.btnClose, a._hiddenDialog, "click");
            Core.Events.removeEvent(a.nodes.btnClose, a._CloseDialog, "click")
        }
    },
    updateNodes: function() {
        this.nodes = this._dialog.getNodes();
        var a = this.getContentNodes();
        for (k in a) {
            this.nodes[k] = a[k]
        }
    },
    getContentNodes: function(g) {
        var b = g || "o";
        var d;
        var c = {};
        var a = this.templateString;
        if (a) {
            for (d = 0; d < a.length; d++) {
                var f = a[d];
                switch (b) {
                case "o":
                    c[f] = $E(this.nodes.content.id + "_" + f);
                    break;
                case "i":
                    c[f] = this.nodes.content.id + "_" + f;
                    break
                }
            }
        }
        return c
    },
    setOnDisplaied: function(a) {
        this._dialog.onDisplaied = a
    },
    setOnDisplayFinished: function(a) {
        this._dialog.onDisplayFinished = a
    },
    onDrag: function() {},
    onShow: function() {},
    onHidden: function() {},
    onClose: function() {}
};
var LayerTemplate = {
    alert: '<table id="#{entity}"  class="gModLy"><thead id="#{titleBar}"><tr><td class="tbgleft"><div></div></td><td class="tdmain"><div class="gModLyHeader"><div class="gFl"><div class="gML_tit"><strong id="#{titleName}"></strong></div></div><div class="gFr"><ul><li><a href="javascript:;" id="#{btnClose}" class="iconClose"></a></li><li><a href="#" class="help" >帮助</a></li></ul></div></div></td><td class="tbgright"><div></div></td></tr></thead><tfoot><tr><td class="tbgleft"><div></div></td><td class="tdmain"></td><td class="tbgright"><div></div></td></tr></tfoot><tbody><tr><td class="tbgleft"><div></div></td><td class="tdmain" id="layer_2"><div id="#{content}" class="gModLyCont"><!-- 内容区域 --><div class="gDialogDoc"><div class="diaBd"><div class="gDiaC1"><img id="#{icon}" width="50" height="50" class="" src="http://simg.sinajs.cn/tiezi/images/icon/icon.gif" alt=""/></div><div class="gDiaC2"><h5 id="#{text}"></h5><div id="#{subText}"></div><p/></div></div><div class="btnRow"><a class="gBtnb gBtnbClr" id="#{linkOk}" href="javascript:;"><cite id="#{btnOk}"><em id="#{ok}"></em></cite></a></div></div><!-- 内容区域 --></div></td><td class="tbgright"><div></div></td></tr></tbody></table>',
    confirm: '<table id="#{entity}"  class="gModLy"><thead id="#{titleBar}"><tr><td class="tbgleft"><div></div></td><td class="tdmain"><div class="gModLyHeader"><div class="gFl"><div class="gML_tit"><strong id="#{titleName}"></strong></div></div><div class="gFr"><ul><li><a href="javascript:;" id="#{btnClose}" class="iconClose"></a></li><li><a href="#" class="help" >帮助</a></li></ul></div></div></td><td class="tbgright"><div></div></td></tr></thead><tfoot><tr><td class="tbgleft"><div></div></td><td class="tdmain"></td><td class="tbgright"><div></div></td></tr></tfoot><tbody><tr><td class="tbgleft"><div></div></td><td class="tdmain" id="layer_2"><div id="#{content}" class="gModLyCont"><!-- 内容开始 --><div class="gDialogDoc"><div class="diaBd"><div class="gDiaC1"><img id="#{icon}" width="50" height="50" class="" src="http://simg.sinajs.cn/tiezi/images/icon/icon.gif" alt=""/></div><div class="gDiaC2"><h5 id="#{text}"></h5><div id="#{subText}"></div><p/></div></div><div class="btnRow"><a class="gBtnb gBtnbClr" id="#{linkOk}" href="javascript:;"><cite id="#{btnOk}"><em id="#{ok}"></em></cite></a><a class="gBtnb gBtnbClr" id="#{linkCancel}" href="javascript:;"><cite id="#{btnCancel}"><em id="#{cancel}"></em></cite></a></div></div><!-- 内容结束 --></div></td><td class="tbgright"><div></div></td></tr></tbody></table>',
    iframe: '<table id="#{entity}"  class="gModLy"><thead id="#{titleBar}"><tr><td class="tbgleft"><div></div></td><td class="tdmain"><div class="gModLyHeader"><div class="gFl"><div class="gML_tit"><strong id="#{titleName}"></strong></div></div><div class="gFr"><ul><li><a href="javascript:;" id="#{btnClose}" class="iconClose"></a></li><li><a href="#" class="help" >帮助</a></li></ul></div></div></td><td class="tbgright"><div></div></td></tr></thead><tfoot><tr><td class="tbgleft"><div></div></td><td class="tdmain"></td><td class="tbgright"><div></div></td></tr></tfoot><tbody><tr><td class="tbgleft"><div></div></td><td class="tdmain" id="layer_2"><div id="#{content}" class="gModLyCont"><div id="#{loadState}">Loading...</div><iframe style="width:100%;height:500px;" id="#{iframe}" src="#{iframeURL}"></iframe></div></td><td class="tbgright"><div></div></td></tr></tbody></table>',
    customs: '<table id="#{entity}"  class="gModLy"><thead id="#{titleBar}"><tr><td class="tbgleft"><div></div></td><td class="tdmain"><div class="gModLyHeader"><div class="gFl"><div class="gML_tit"><strong id="#{titleName}"></strong></div></div><div class="gFr"><ul><li><a href="javascript:;" id="#{btnClose}" class="iconClose"></a></li><li><a href="#" class="help" >帮助</a></li></ul></div></div></td><td class="tbgright"><div></div></td></tr></thead><tfoot><tr><td class="tbgleft"><div></div></td><td class="tdmain"></td><td class="tbgright"><div></div></td></tr></tfoot><tbody><tr><td class="tbgleft"><div></div></td><td class="tdmain" id="layer_2"><div id="#{content}" class="gModLyCont"><!-- 内容区域 --><!-- 内容区域 --></div></td><td class="tbgright"><div></div></td></tr></tbody></table>'
}; (function() {
    var a = function(b, c) {
        this.template = c || {};
        DialogManager.backShadow = b
    };
    a.prototype = {
        iconSet: {
            "01": {
                "class": "SG_icon SG_icon201",
                alt: "警告"
            },
            "02": {
                "class": "SG_icon SG_icon202",
                alt: "失败"
            },
            "03": {
                "class": "SG_icon SG_icon203",
                alt: "成功"
            },
            "04": {
                "class": "SG_icon SG_icon204",
                alt: "询问"
            }
        },
        alert: function(i, b, d) {
            b = b || {};
            var f = DialogManager.create(this.template.alert || LayerTemplate.alert, d);
            var g = Core.System.winSize();
            var c = f.getNodes();
            f.onDisplaied = b.funcDisplaied;
            f.onDisplayFinished = b.funcDisplayFinished;
            f.setSize({
                width: b.width,
                height: b.height
            });
            f.setFixed(true);
            this._setDialogMiddle(f);
            f.show();
            f.setAreaLocked(true);
            c.linkOk.focus();
            c.text.innerHTML = i;
            if (c.titleName) {
                c.titleName.innerHTML = b.title || "提示"
            }
            if (c.icon) {
                c.icon.className = b.icon ? this.iconSet[b.icon]["class"] : this.iconSet["01"]["class"];
                c.icon.alt = b.icon ? this.iconSet[b.icon]["alt"] : this.iconSet["01"]["alt"]
            }
            c.ok.innerHTML = b.textOk || "确定";
            if (c.subText) {
                c.subText.innerHTML = b.subText || ""
            }
            f.getProperty().focusNode = c.linkOk;
            Core.Events.addEvent(c.btnOk,
            function() {
                if (b.funcOk && f.getProperty().enabled) {
                    b.funcOk();
                    Core.Events.stopEvent()
                }
                f.close();
                return false
            },
            "click");
            Core.Events.addEvent(c.linkOk,
            function() {
                var j = Core.Events.getEvent();
                if (j.keyCode == "13") {
                    if (b.funcOk && f.getProperty().enabled) {
                        b.funcOk()
                    }
                    f.close()
                }
            },
            "keydown");
            Core.Events.addEvent(c.btnClose,
            function() {
                if (b.funcClose && f.getProperty().enabled) {
                    b.funcClose()
                }
                f.close()
            },
            "click");
            Core.Events.addEvent(c.btnClose,
            function() {
                var j = Core.Events.getEvent();
                j.cancelBubble = true
            },
            "mousedown")
        },
        confirm: function(i, b, d) {
            b = b || {};
            var f = DialogManager.create(this.template.confirm || LayerTemplate.confirm, d);
            var g = Core.System.winSize();
            var c = f.getNodes();
            f.onDisplaied = b.funcDisplaied;
            f.onDisplayFinished = b.funcDisplayFinished;
            f.setSize({
                width: b.width,
                height: b.height
            });
            f.setFixed(true);
            this._setDialogMiddle(f);
            f.show();
            f.setAreaLocked(true);
            if (b.defaultButton == 0) {
                c.linkCancel.focus();
                f.getProperty().focusNode = c.linkCancel
            } else {
                c.linkOk.focus();
                f.getProperty().focusNode = c.linkOk
            }
            c.text.innerHTML = i;
            if (c.titleName) {
                c.titleName.innerHTML = b.title || "提示"
            }
            if (c.icon) {
                c.icon.className = b.icon ? this.iconSet[b.icon]["class"] : this.iconSet["04"]["class"];
                c.icon.alt = b.icon ? this.iconSet[b.icon]["alt"] : this.iconSet["04"]["alt"]
            }
            c.ok.innerHTML = b.textOk || "确定";
            c.cancel.innerHTML = b.textCancel || "取消";
            if (c.subText) {
                c.subText.innerHTML = b.subText || ""
            }
            Core.Events.addEvent(c.btnOk,
            function() {
                if (b.funcOk && f.getProperty().enabled) {
                    b.funcOk();
                    Core.Events.stopEvent()
                }
                f.close();
                return false
            },
            "click");
            Core.Events.addEvent(c.linkOk,
            function() {
                var j = Core.Events.getEvent();
                if (j.keyCode == "13") {
                    if (b.funcOk && f.getProperty().enabled) {
                        b.funcOk()
                    }
                    f.close()
                }
            },
            "keydown");
            Core.Events.addEvent(c.btnCancel,
            function() {
                if (b.funcCancel && f.getProperty().enabled) {
                    b.funcCancel();
                    Core.Events.stopEvent()
                }
                f.close();
                return false
            },
            "click");
            Core.Events.addEvent(c.linkCancel,
            function() {
                var j = Core.Events.getEvent();
                if (j.keyCode == "13") {
                    if (b.funcCancel && f.getProperty().enabled) {
                        b.funcCancel()
                    }
                    f.close()
                }
            },
            "keydown");
            Core.Events.addEvent(c.btnClose,
            function() {
                if (b.funcClose && f.getProperty().enabled) {
                    b.funcClose();
                    Core.Events.stopEvent()
                }
                f.close();
                return false
            },
            "click");
            Core.Events.addEvent(c.btnClose,
            function() {
                var j = Core.Events.getEvent();
                j.cancelBubble = true
            },
            "mousedown")
        },
        showIframe: function(b, g) {
            b = b || {};
            var i = DialogManager.create(this.template.iframe || LayerTemplate.iframe, g);
            var j = Core.System.winSize();
            var d = i.getNodes();
            i.setSize({
                width: b.width || 320,
                height: b.height || 150
            });
            var f = j.width / 2 - i.getProperty().width / 2 < 0 ? 0 : j.width / 2 - i.getProperty().width / 2;
            var c = j.height / 2 - i.getProperty().height / 2 < 0 ? 0 : j.height / 2 - i.getProperty().height / 2;
            if (b.fixed) {
                i.setPosition({
                    x: f,
                    y: c
                })
            } else {
                i.setPosition({
                    x: f + document.documentElement.scrollLeft,
                    y: c + document.documentElement.scrollTop
                })
            }
            if (!$IE6) {
                i.getProperty().displayMode = "alpha"
            }
            i.setFixed( !! b.fixed);
            i.show();
            i.setAreaLocked(true);
            d.titleName.innerHTML = b.title || "";
            d.iframe.src = b.url || "about:blank";
            Core.Events.addEvent(d.iframe,
            function() {
                d.iframe.style.display = "";
                d.loadState.style.display = "none"
            },
            "load");
            Core.Events.addEvent(d.btnClose,
            function() {
                i.close()
            },
            "click");
            Core.Events.addEvent(d.btnClose,
            function() {
                var l = Core.Events.getEvent();
                l.cancelBubble = true
            },
            "mousedown")
        },
        createCustomsDialog: function(b, c) {
            b = b || {};
            var d = new CustomsDialog(b.tpl || this.template.customs || LayerTemplate.customs, c);
            b.content && d.setContent(b.content);
            d.setTitle(b.title || "提示");
            d.setHelp(b.help || "");
            d.setClose("hidden");
            d.setOnDisplaied(b.funcDisplaied);
            d.setOnDisplayFinished(b.funcDisplayFinished);
            return d
        },
        getDialog: function(b) {
            return DialogManager.getDialog(b)
        },
        close: function(b) {
            DialogManager.close(b)
        },
        _setDialogMiddle: function(i) {
            var g = Core.System.winSize();
            var b = i.getNodes();
            var l, j;
            var o = i.entity.style.display;
            i.setPosition({
                x: -10000
            });
            i.entity.style.display = "";
            var c = b.titleBar ? b.titleBar.offsetHeight: 0;
            var m = g.height - b.content.offsetHeight - c;
            var d = (Math.sqrt(5) - 1) / 2;
            var f = 1;
            var n = m * d / (d + f);
            l = g.width / 2 - b.content.offsetWidth / 2;
            l = l < 0 ? 0 : l;
            j = n < 0 ? 0 : n;
            if (!i.getProperty().isFixed) {
                l = l + document.documentElement.scrollLeft;
                j = j + document.documentElement.scrollTop
            }
            i.entity.style.display = o;
            i.setPosition({
                x: l,
                y: j
            })
        }
    };
    Sina.Ui.WindowDialog = a
})();
var DialogTemplate = {};
DialogTemplate.alert = ['<table id="#{entity}" class="CP_w">', '<thead id="#{titleBar}">', "<tr>", '<th class="tLeft"><span></span></th>', '<th class="tMid"><div class="bLyTop"><strong id="#{titleName}">提示标题</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite></div></th>', '<th class="tRight"><span></span></th>', "</tr>", "</thead>", "<tfoot>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td>', "</tr>", "</tfoot>", "<tbody>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid">', '<div id="#{content}" class="CP_layercon1">', '<div class="CP_prompt">', '<img id="#{icon}" class="SG_icon SG_icon201" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="50" height="50" align="absmiddle"/>', '<table class="CP_w_ttl"><tr><td id="#{text}"></td></tr></table>', '<div id="#{subText}" class="CP_w_cnt SG_txtb"></div>', '<p class="CP_w_btns_Mid"><a id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnOk}"> <span id="#{ok}"></span> </cite></a></p>', "</div>", "</div>", "</td>", '<td class="tRight"><span></span></td>', "</tr>", "</tbody>", "</table>"].join("");
DialogTemplate.confirm = ['<table id="#{entity}" class="CP_w">', '<thead id="#{titleBar}">', "<tr>", '<th class="tLeft"><span></span></th>', '<th class="tMid"><div class="bLyTop"><strong id="#{titleName}">提示标题</strong><cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite></div></th>', '<th class="tRight"><span></span></th>', "</tr>", "</thead>", "<tfoot>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td>', "</tr>", "</tfoot>", "<tbody>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid">', '<div id="#{content}" class="CP_layercon1">', '<div class="CP_prompt">', '<img id="#{icon}" class="SG_icon SG_icon201" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="50" height="50" align="absmiddle"/>', '<table class="CP_w_ttl"><tr><td id="#{text}"></td></tr></table>', '<div id="#{subText}" class="CP_w_cnt SG_txtb"></div>', '<p class="CP_w_btns">', '<a  id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnOk}"> <span id="#{ok}"></span> </cite></a>', '<a style="margin-left:5px;" id="#{linkCancel}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnCancel}"> <span id="#{cancel}"></span> </cite></a></p>', "</div>", "</div>", "</td>", '<td class="tRight"><span></span></td>', "</tr>", "</tbody>", "</table>"].join("");
DialogTemplate.iframe = ['<table id="#{entity}" class="CP_w">', '<thead id="#{titleBar}">', "<tr>", '<th class="tLeft"><span></span></th>', '<th class="tMid">', '<div class="bLyTop">', '<strong id="#{titleName}">提示标题</strong>', '<cite><a id="#{btnClose}" href="javascript:;" class="CP_w_shut" title="关闭">关闭</a></cite>', "</div>", "</th>", '<th class="tRight"><span></span></th>', "</tr>", "</thead>", "<tfoot>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td>', "</tr>", "</tfoot>", "<tbody>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid">', '<div id="#{content}" style="vertical-align: top;" class="CP_layercon1">', '<div id="#{loadState}">Loading...</div>', '<iframe frameborder="0" scrolling="no" style="width:100%;height:100%;display:none;" id="#{iframe}"></iframe>', "</div>", "</td>", '<td class="tRight"><span></span></td>', "</tr>", "</tbody>", "</table>"].join("");
DialogTemplate.customs = ['<table id="#{entity}" class="CP_w">', '<thead id="#{titleBar}">', "<tr>", '<th class="tLeft"><span></span></th>', '<th class="tMid">', '<div class="bLyTop">', '<strong id="#{titleName}">提示标题</strong>', '<cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite>', "</div>", "</th>", '<th class="tRight"><span></span></th>', "</tr>", "</thead>", "<tfoot>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td>', "</tr>", "</tfoot>", "<tbody>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid" id="#{content}">', "</td>", '<td class="tRight"><span></span></td>', "</tr>", "</tbody>", "</table>"].join("");
var iconSet = {
    "01": {
        "class": "SG_icon SG_icon201",
        alt: "警告"
    },
    "02": {
        "class": "SG_icon SG_icon202",
        alt: "失败"
    },
    "03": {
        "class": "SG_icon SG_icon203",
        alt: "成功"
    },
    "04": {
        "class": "SG_icon SG_icon204",
        alt: "询问"
    }
};
var dialogBackShadow;
var winDialog = {},
_winDialog;
winDialog.alert = function(c, a, b) {
    if (!_winDialog) {
        initDialog();
        _winDialog.alert(c, a, b)
    } else {
        _winDialog.alert(c, a, b)
    }
};
winDialog.confirm = function(c, a, b) {
    if (!_winDialog) {
        initDialog();
        _winDialog.confirm(c, a, b)
    } else {
        _winDialog.confirm(c, a, b)
    }
};
winDialog.showIframe = function(a, b) {
    if (!_winDialog) {
        initDialog();
        _winDialog.showIframe(a, b)
    } else {
        _winDialog.showIframe(a, b)
    }
};
winDialog.createCustomsDialog = function(a, b) {
    if (!_winDialog) {
        initDialog();
        return _winDialog.createCustomsDialog(a, b)
    } else {
        return _winDialog.createCustomsDialog(a, b)
    }
};
winDialog.getDialog = function(a) {
    if (!_winDialog) {
        initDialog();
        return _winDialog.getDialog(a)
    } else {
        return _winDialog.getDialog(a)
    }
};
winDialog.close = function(a) {
    if (!_winDialog) {
        initDialog();
        _winDialog.close(a)
    } else {
        _winDialog.close(a)
    }
};
function initDialog() {
    dialogBackShadow = new BackShadow(0.4);
    _winDialog = new Sina.Ui.WindowDialog(dialogBackShadow, {
        alert: DialogTemplate.alert,
        confirm: DialogTemplate.confirm,
        iframe: DialogTemplate.iframe,
        customs: DialogTemplate.customs
    });
    _winDialog.iconSet = iconSet
}
$SYSMSG.extend({
    A00001: "操作失败，可能系统繁忙或系统遇到未知错误，请稍后再试。也可联系新浪客服：致电95105670。",
    A00002: "此帐号暂时被封，如有疑问也可联系新浪客服：致电95105670。",
    A00003: "无权限进行此操作，请重新登录。",
    A00004: "无权限进行此操作，请重新登录。",
    A00005: "操作失败，可能系统繁忙或系统遇到未知错误，请稍后再试。也可联系新浪客服：致电95105670。",
    A00006: "操作成功",
    A00007: "无权限进行此操作，请重新登录。",
    A00010: "无升级权限"
});
function showError(a, b) {
    var c = $SYSMSG[a] || a;
    winDialog.alert(c, {
        icon: b || "01"
    })
}
$SYSMSG.extend({
    A33001: "对方已经被你加为关注了！<br/>请不要重复添加。",
    A33002: "对方拒绝了你的关注请求！",
    A33003: "关注已达上限，不能再添加新的关注了！<br/>可以到<a href='http://control.blog.sina.com.cn/blogprofile/attention.php' target='_blank'>关注的人</a>去取消关注一些人，再回来关注吧。",
    A33004: "关注成功！",
    A33005: "你不能添加自己为关注！",
    A33008: "取消关注失败",
    A33009: "移除关注成功，加黑名单失败",
    A33010: "对不起，您短时间添加关注过多，请多休息，注意身体！感谢您对新浪博客的支持和关注！"
});
Core.String.trimHead = function(a) {
    return a.replace(/^(\u3000|\s|\t)*/gi, "")
};
Core.String.trimTail = function(a) {
    return a.replace(/(\u3000|\s|\t)*$/gi, "")
};
Core.String.trim = function(a) {
    return Core.String.trimHead(Core.String.trimTail(a))
};
Utils.Cookie.setCookie = function(b, g, c, l, f, a) {
    var i = [];
    i.push(b + "=" + escape(g));
    if (c) {
        var j = new Date();
        var d = j.getTime() + c * 3600000;
        j.setTime(d);
        i.push("expires=" + j.toGMTString())
    }
    if (l) {
        i.push("path=" + l)
    }
    if (f) {
        i.push("domain=" + f)
    }
    if (a) {
        i.push(a)
    }
    document.cookie = i.join(";")
};
Lib.pkg("Login");
Lib.Login.LoginPost = Core.Class.create();
Lib.Login.LoginPost.prototype = {
    url: "http://i.sso.sina.com.cn/js/ssologin.js",
    callback: null,
    initialize: function(c, a, b) {
        window.sinaSSOConfig = new
        function() {
            if (b) {
                this.from = b
            }
            this.pageCharset = "utf-8";
            this.noActiveTime = 14400;
            this.setDomain = true;
            this.entry = "blog";
            this.customInit = function() {};
            this.customLoginCallBack = c;
            this.customLogoutCallBack = function(d) {};
            this.useIframe = true
        }
    },
    login: function(d, a, b) {
        var c = this;
        Utils.Io.JsLoad.request(this.url, {
            onComplete: function() {
                if (typeof b == "undefined") {
                    sinaSSOController.login(d, a)
                } else {
                    sinaSSOController.login(d, a, b)
                }
            },
            onException: function() {},
            timeout: 30000
        })
    },
    parse: function(a) {
        this.callback.call(a)
    }
};
Core.System.getScrollPos = function(c) {
    c = c || document;
    var a = c.documentElement;
    var b = c.body;
    return [Math.max(a.scrollTop, b.scrollTop), Math.max(a.scrollLeft, b.scrollLeft), Math.max(a.scrollWidth, b.scrollWidth), Math.max(a.scrollHeight, b.scrollHeight)]
};
Core.Dom.getXY = function(b) {
    if ((b.parentNode == null || b.offsetParent == null || Core.Dom.getStyle(b, "display") == "none") && b != document.body) {
        return false
    }
    var a = null;
    var g = [];
    var c;
    var d = b.ownerDocument;
    c = b.getBoundingClientRect();
    var f = Core.System.getScrollPos(b.ownerDocument);
    return [c.left + f[1], c.top + f[0]];
    a = b.parentNode;
    while (a.tagName && !/^body|html$/i.test(a.tagName)) {
        if (Core.Dom.getStyle(a, "display").search(/^inline|table-row.*$/i)) {
            g[0] -= a.scrollLeft;
            g[1] -= a.scrollTop
        }
        a = a.parentNode
    }
    return g
};
if (!$IE) {
    Core.Dom.getXY = function(b) {
        if ((b.parentNode == null || b.offsetParent == null || Core.Dom.getStyle(b, "display") == "none") && b != document.body) {
            return false
        }
        var a = null;
        var g = [];
        var c;
        var d = b.ownerDocument;
        g = [b.offsetLeft, b.offsetTop];
        a = b.offsetParent;
        var f = Core.Dom.getStyle(b, "position") == "absolute";
        if (a != b) {
            while (a) {
                g[0] += a.offsetLeft;
                g[1] += a.offsetTop;
                if ($SAFARI && !f && Core.Dom.getStyle(a, "position") == "absolute") {
                    f = true
                }
                a = a.offsetParent
            }
        }
        if ($SAFARI && f) {
            g[0] -= b.ownerDocument.body.offsetLeft;
            g[1] -= b.ownerDocument.body.offsetTop
        }
        a = b.parentNode;
        while (a.tagName && !/^body|html$/i.test(a.tagName)) {
            if (Core.Dom.getStyle(a, "display").search(/^inline|table-row.*$/i)) {
                g[0] -= a.scrollLeft;
                g[1] -= a.scrollTop
            }
            a = a.parentNode
        }
        return g
    }
} (function() {
    var i;
    var c = parseInt(Math.random() * 100);
    var j = [];
    var b = -1;
    var g = "";
    var f = "#userPosition {padding: 0;margin: 0;border: 0;position: absolute;z-index: 999;}				#sinaNote {position: absolute;z-index: 999999;width: auto;overflow: hidden;padding: 0;margin: 0;				border: 1px solid #CCCCCC;background: #ffffff;text-align:left;}				#sinaNote li {font-size: 12px;list-style: none;margin: 0 1px;height: 20px;padding: 0 5px;clear: both;				line-height: 20px;cursor: pointer;color: #999999;}				#sinaNote li.note {text-align: left;color: #999999;}";
    var d = window;
    var a = {
        overfcolor: "#999",
        overbgcolor: "#e8f4fc",
        outfcolor: "#000000",
        outbgcolor: "",
        menuStatus: {
            "sina.com": true,
            "vip.sina.com": true,
            "sina.cn": true,
            "非新浪邮箱": true
        }
    };
    a.createNode = function() {
        var o = d.document;
        var p = o.createElement("div");
        p.innerHTML = '<ul id="sinaNote" style="display:none;"></ul>';
        var n = o.createElement("style");
        n.setAttribute("type", "text/css");
        try {
            if ($IE) {
                n.styleSheet.cssText = f
            } else {
                n.innerHTML = f
            }
        } catch(m) {
            trace(m.message)
        }
        var l = o.createElement("div");
        l.appendChild(p);
        l.appendChild(n);
        o.body.appendChild(l)
    };
    a.arrowKey = function(l) {
        if (l == 38) {
            if (b <= 0) {
                b = j.length
            }
            b--;
            a.selectLi(b)
        }
        if (l == 40) {
            if (b >= j.length - 1) {
                b = -1
            }
            b++;
            a.selectLi(b)
        }
    };
    a.showList = function(z) {
        g = "";
        var D = Core.Events.getEvent().keyCode;
        if (D == 38 || D == 40) {
            a.arrowKey(D);
            return false
        }
        if (!$E("sinaNote")) {
            a.createNode()
        }
        var o = $E(z).value;
        var n = {};
        var t = o.indexOf("@");
        var B = "";
        var s = "";
        if (t > -1) {
            B = o.substr(t + 1);
            s = o.substr(0, t)
        }
        j = [];
        b = 0;
        j[j.length] = "sinaNote_MenuItem_Title_" + c;
        for (var F in this.menuStatus) {
            this.menuStatus[F] = true;
            if (B != "" && B != F.substr(0, B.length)) {
                this.menuStatus[F] = false
            } else {
                j[j.length] = "sinaNote_MenuItem_" + F + "_" + c
            }
        }
        var v = '<li class="note">请选择登录类型</li>';
        v += '<li id="sinaNote_MenuItem_Title_' + c + '">' + o + "</li>";
        var C;
        for (var p in this.menuStatus) {
            if (this.menuStatus[p] == true) {
                if (s == "") {
                    C = o + "@" + p
                } else {
                    C = s + "@" + p
                }
                v += '<li id="sinaNote_MenuItem_' + p + "_" + c + '" title="' + C + '">' + C + "</li>"
            }
        }
        $E("sinaNote").innerHTML = v;
        for (var y = 0; y < o.length; y++) {
            if (o.charCodeAt(y) < 160) {
                $E("sinaNote").style.display = "";
                this.selectList(z)
            } else {
                this.hideList()
            }
        }
        var l = $E(z);
        var m = $E("sinaNote");
        var r = 0;
        var u = 0;
        var q;
        if (d != window) {
            q = Core.Dom.getXY(window.frameElement);
            r = q[0];
            u = q[1]
        }
        var A = l.offsetWidth;
        if (A < 200) {
            A = 200
        }
        m.style.width = A - 2 + "px";
        var E = Core.Dom.getXY(l);
        m.style.left = (E[0] - ($IE ? 2 : -1) + r) + "px";
        m.style.top = (E[1] + l.offsetHeight - ($IE ? 2 : -1) + u) + "px"
    };
    a.selectList = function(n) {
        var l = $E("sinaNote").getElementsByTagName("li");
        for (var m = 1; m < l.length; m++) {
            l[1].style.backgroundColor = a.overbgcolor;
            l[1].style.color = a.outfcolor;
            l[m].onmousedown = function() {
                var o = this.innerHTML;
                if (o.indexOf("非新浪邮箱") > -1) {
                    var p = o.split("@");
                    $E(n).value = p[0]
                } else {
                    $E(n).value = this.innerHTML
                }
                if (Core.Events.getEvent() != null) {
                    Core.Events.stopEvent()
                }
            };
            l[m].onmouseover = function() {
                if (m != 1) {
                    l[1].style.backgroundColor = a.outbgcolor;
                    l[1].style.color = a.overfcolor
                }
                this.style.backgroundColor = a.overbgcolor;
                this.style.color = a.outfcolor
            };
            l[m].onmouseout = function() {
                this.style.backgroundColor = a.outbgcolor;
                this.style.color = a.overfcolor;
                l[1].style.backgroundColor = a.overbgcolor;
                l[1].style.color = a.outfcolor
            }
        }
    };
    a.selectLi = function(l) {
        var n;
        $E("sinaNote_MenuItem_Title_" + c).style.backgroundColor = a.outbgcolor;
        $E("sinaNote_MenuItem_Title_" + c).style.color = a.overfcolor;
        for (var m = 0; m < j.length; m++) {
            n = $E(j[m]);
            n.style.backgroundColor = a.outbgcolor;
            n.style.color = a.overfcolor
        }
        $E(j[l]).style.backgroundColor = a.overbgcolor;
        $E(j[l]).style.color = a.outfcolor;
        g = $E(j[l]).innerHTML
    };
    a.hideList = function() {
        if (!$E("sinaNote")) {
            a.createNode()
        }
        $E("sinaNote").style.display = "none"
    };
    a.init = function(p, n, l, o) {
        o = o || window;
        if (o.document.body == null) {
            setTimeout(Core.Function.bind3(function() {
                this.init(p, n, l, o)
            },
            this), 100)
        }
        for (var m in n) {
            this[m] = n[m]
        }
        Core.Events.addEvent(document, a.hideList, "click");
        Core.Events.addEvent(p, a.hideList, "blur");
        Core.Events.addEvent(p, Core.Function.bind3(a.showList, this, [p]), "keyup");
        Core.Events.addEvent(p,
        function(t) {
            var s = Core.Events.getEvent().keyCode;
            var r;
            if (s == 13 || s == 9) {
                if (g != "") {
                    var q = g;
                    if (q.indexOf("非新浪邮箱") > -1) {
                        var u = q.split("@");
                        p.value = u[0] + "@";
                        r = false
                    } else {
                        p.value = g;
                        r = true
                    }
                }
                if (r) {
                    if (l != null) {
                        l.focus()
                    }
                } else {
                    if (p) {
                        p.focus()
                    }
                }
            }
        },
        "keydown");
        if (o) {
            d = o
        }
    };
    Lib.passcardOBJ = a
})();
Lib.Login.Ui = Core.Class.create();
Lib.Login.Ui.prototype = {
    dialog: null,
    isInit: false,
    request: null,
    callback: null,
    initialize: function() {},
    login: function(c, a, b) {
        this.callback = c || null;
        this.clearDomain = a || false;
        this.from = b || null;
        this.initDom();
        this.initEvent();
        this.dialog.show();
        this.dialog.setAreaLocked(true);
        this.reloadName();
        this.onShow();
        this.focus();
        if ($IE6) {
            this.initAD()
        }
        Lib.passcardOBJ.init($E("login_name_d"), {
            overfcolor: "#999",
            overbgcolor: "#e8f4fc",
            outfcolor: "#000000",
            outbgcolor: ""
        },
        $E("login_pass_d"))
    },
    reloadName: function() {
        var b = Utils.Cookie.getCookie("remberloginname");
        if (b != null && b != "") {
            $E("login_name_d").value = unescape(unescape(b))
        }
        var a = Utils.Cookie.getCookie("ALF");
        if (a != "" && $E("login_save")) {
            $E("login_save").checked = true;
            $E("login_save_tips").style.display = "none"
        }
    },
    initDom: function() {
        var a = this;
        this.dialog = winDialog.createCustomsDialog({
            tpl: a.tpl
        });
        this.dialog.setClose("close");
        this.dialog.setContent(this.struc);
        this.dialog.setTitle("登录新浪博客");
        this.dialog.setMiddle()
    },
    initEvent: function() {
        var a = this.parse.bind2(this);
        this.request = new Lib.Login.LoginPost(a, this.clearDomain, this.from);
        Core.Events.addEvent("login_button", this.doLogin.bind2(this));
        Core.Events.addEvent("login_name_d",
        function(c) {
            var b = c.keyCode;
            if (b == 13) {
                this.doLogin()
            }
        }.bind2(this), "keydown");
        Core.Events.addEvent("login_pass_d",
        function(c) {
            var b = c.keyCode;
            if (b == 13) {
                this.doLogin()
            }
        }.bind2(this), "keydown");
        Core.Events.addEvent("login_save",
        function() {
            if ($E("login_save").checked) {
                $E("login_save_tips").style.display = ""
            } else {
                $E("login_save_tips").style.display = "none"
            }
        })
    },
    doLogin: function() {
        Core.Events.stopEvent();
        var b = $E("login_name_d").value;
        var a = $E("login_pass_d").value;
        b = Core.String.trim(b);
        a = a;
        if (b == "") {
            this.error("请输入登录名");
            return false
        }
        if (a == "") {
            this.error("请输入密码");
            return false
        }
        if ($E("login_save").checked) {
            this.request.login(b, a, 15)
        } else {
            this.request.login(b, a)
        }
        return false
    },
    parse: function(a) {
        if (a.result) {
            Lib.checkAuthor();
            Utils.Cookie.setCookie("remberloginname", escape($E("login_name_d").value), 2400, "/", ".blog.sina.com.cn");
            this.dialog.close();
            if (this.callback) {
                try {
                    $tray.renderLogin()
                } catch(b) {}
                this.callback.call()
            } else {
                window.location = window.location.toString().replace(/#.*/, "")
            }
        } else {
            this.error("登录名或密码错误");
            trace("登陆失败 ：" + a.reason)
        }
    },
    friendlyTip: function(f) {
        var g = f;
        var c = $E("login_name_d");
        var b = c.value;
        var j = this;
        if (!/[\u0391-\uFFE5]+/.test(b) && !/^\d+$/.test(b) && !/^@/.test(b)) {
            var i = "你的登录名可能是 ";
            var a = '<a href="#" class="underline" onclick="$_RENAME(/@.*/, \'{1}\');return false">{0}{1}</a>';
            var l = ["@sina.com", "@sina.cn"];
            var d = "";
            if (/@sina\.cn$/.test(b)) {
                d = a.format("{0}", l[0])
            } else {
                if (/@sina\.com$/.test(b)) {
                    d = a.format("{0}", l[1])
                } else {
                    d = a.format("{0}", l[0]) + " 或 " + a.format("{0}", l[1])
                }
            }
            g = (i + d).format(b.replace(/@.*/, ""))
        }
        return g
    },
    rename: (function() {
        return window.$_RENAME = function(b, a) {
            var c = $E("login_name_d");
            c.value = c.value.replace(b, "") + a;
            $E("login_pass_d").focus();
            $E("login_div_error").innerHTML = ""
        }
    })(),
    focus: function() {
        if ($E("login_name_d").value == "") {
            $E("login_name_d").focus()
        } else {
            $E("login_pass_d").focus()
        }
    },
    initAD: function() {
        $E("login_ad").src = "http://blog.sina.com.cn/lm/iframe/71/2008/0731/21.html"
    },
    onShow: function() {},
    error: function(a) {
        $E("login_div_error").innerHTML = a;
        $E("login_pass_d").value = "";
        this.focus()
    },
    tpl: ['<table id="#{entity}" class="CP_w">', '<thead id="#{titleBar}">', "<tr>", '<th class="tLeft"><span></span></th>', '<th class="tMid">', '<div class="bLyTop">', '<strong id="#{titleName}">提示标题</strong>', '<cite><a id="#{btnClose}" href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite>', "</div>", "</th>", '<th class="tRight"><span></span></th>', "</tr>", "</thead>", "<tfoot>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td>', "</tr>", "</tfoot>", "<tbody>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid" id="#{content}">', "</td>", '<td class="tRight"><span></span></td>', "</tr>", "</tbody>", "</table>"].join(""),
    struc: '		<div class="CP_layercon2 passLoginItem">			<div>	            <div class="boxA">登录名：	              <input tabIndex="201" type="text" class="fm1" style="width:215px;" name="login_name" id="login_name_d" tabIndex=1/>  <a style="font-size: 12px;" href="http://login.sina.com.cn/signup/signup.php?entry=blog&srcuid=' + scope.$uid + '&src=blogicp" target="_blank">立即注册</a>	            </div>	            <div class="boxA">密　码：	              <input tabIndex="202" type="password" class="fm1" style="width:215px;" name="login_pass" maxlength="16" id="login_pass_d" tabIndex=2/>  <a style="font-size: 12px;" href="http://login.sina.com.cn/getpass.html" target="_blank">找回密码</a>	            </div>	        	<div class="ErrTips" id="login_div_error"></div>				<div class="boxB"><p><input tabIndex="203" type="checkbox" value="" id="login_save"/><label for="login_save"> 记住登录状态</label></p><p id="login_save_tips" style="color:#999;display:none;">建议在网吧/公用电脑上取消该选项</p><p style="margin-top: 8px;"><a id="login_button" class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="javascript:;" tabIndex=204><cite>登录<input type="text"/></cite></a> </p></div>	        </div>	       <div class="CP_lg_ad SG_j_linedot1">		   	<iframe id="login_ad" src="http://blog.sina.com.cn/lm/iframe/71/2008/0731/21.html" frameborder="0" scrolling="no" height="25" width="auto"></iframe>		   </div>		</div>	'
}; (function() {
    var a = function(b, c) {
        Lib.checkAuthor();
        var d = new Interface("http://control.blog.sina.com.cn/riaapi/profile/attention_add.php", "jsload");
        d.request({
            GET: {
                uid: b || $UID,
                aid: c || scope.$uid
            },
            onSuccess: function() {},
            onError: function(j) {
                var i = "";
                switch (j.code) {
                case "A33003":
                    i = $SYSMSG.A33003.replace("#{UID}", $UID);
                    winDialog.alert(i);
                    break;
                case "A33004":
                    var g = {
                        subText: ['<div class="CP_w_cnt SG_txtb">以后对方的动态（发博文，图片，投票等），都可以在<span style="color:red">个人中心</span>查看啦！</div>', '<ul class="CP_w_part CP_w_aLine">', '<li><a href="http://control.blog.sina.com.cn/blogprofile/index.php?type=3&from=attention" onclick="winDialog.getDialog(\'attention\').close();" target="_blank">到个人中心查看关注动态&gt;&gt;</a></li>', "</ul>"].join(""),
                        icon: "03",
                        width: 300
                    };
                    var f = $E("module_901_attention");
                    f.className = "SG_aBtn SG_aBtn_dis";
                    f.innerHTML = "<cite onclick=\"Lib.Component.isAttentioned('" + $UID + "', '" + scope.$uid + "');\">已关注</cite>";
                    i = $SYSMSG.A33004;
                    g.subText = g.subText.replace(/#{UID}/g, $UID);
                    winDialog.alert(i, g, "attention");
                    break;
                default:
                    showError(j.code)
                }
            },
            onFail: function() {
                showError($SYSMSG.A00001)
            }
        })
    };
    Lib.Component.Attention = function(b, c) {
        Lib.checkAuthor();
        if (!$isLogin) {
            var d = new Lib.Login.Ui();
            d.login(Core.Function.bind3(a, null, [b, c]), false, "referer:" + location.hostname + location.pathname + ",func:0004")
        } else {
            a(b, c)
        }
    };
    Lib.Component.deleteAttention = function(b, c) {
        winDialog.getDialog("attention").close();
        winDialog.confirm("是否要取消关注？", {
            funcOk: function() {
                new Interface("http://control.blog.sina.com.cn/riaapi/profile/attention_del.php", "jsload").request({
                    GET: {
                        uid: $UID,
                        aid: scope.$uid
                    },
                    onSuccess: function() {
                        var d = $E("module_901_attention");
                        d.className = "SG_aBtn";
                        d.innerHTML = "<cite onclick=\"Lib.Component.Attention('" + $UID + "', '" + scope.$uid + "');\">加关注</cite>"
                    },
                    onError: function() {
                        winDialog.alert("取消失败！请重试。")
                    },
                    onFail: function() {
                        winDialog.alert("取消失败！请重试。")
                    }
                })
            },
            funcCancel: function() {
                Lib.Component.isAttentioned()
            },
            textOk: "是",
            textCancel: "否"
        })
    };
    Lib.Component.isAttentioned = function() {
        winDialog.alert("已关注此人！", {
            subText: ['<ul class="CP_w_part CP_w_aLine">', '<li><a href="http://control.blog.sina.com.cn/blogprofile/index.php?type=3&from=attention2" onclick="winDialog.getDialog(\'attention\').close();" target="_blank">到个人中心查看关注动态&gt;&gt;</a></li>', "</ul>"].join(""),
            icon: "03"
        },
        "attention")
    }
})();
$SetPV = function(b) {
    b = window.parseInt(b);
    $E("comp_901_pv").innerHTML = "<strong>" + Core.String.formatNumber(b) + "</strong>";
    var a = 0;
    var c = [0, 50, 100, 150, 200, 300, 500, 800, 1500, 3000, 5000, 10000, 15000, 25000, 40000, 70000, 100000, 150000, 200000, 500000, 1000000, 2000000, 5000000, 10000000, 20000000, 50000000, 100000000, 150000000, 200000000, 250000000, 300000000, 350000000, 400000000, 450000000, 500000000, 550000000];
    if (b >= 50000000) {
        a = Math.floor(b / 50000000) + 24
    } else {
        a = -1;
        c = c.join(",").replace(/(\d+)/g,
        function(f, d) {
            if (window.parseInt(d) <= b) {
                a++
            }
        })
    }
    a = a.toString().replace(/(\d)/g,
    function(f, d) {
        return '<img src="http://simg.sinajs.cn/blog7style/images/common/number/' + d + '.gif"/>'
    });
    $E("comp_901_grade").innerHTML = a
};
Core.String.byteLength = function(b) {
    if (typeof b == "undefined") {
        return 0
    }
    var a = b.match(/[^\x00-\x80]/g);
    return (b.length + (!a ? 0 : a.length))
};
Sina.pkg("Utils.Form");
Core.String.leftB = function(c, a) {
    var b = c.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
    c = c.slice(0, b.slice(0, a).replace(/\*\*/g, " ").replace(/\*/g, "").length);
    if (Core.String.byteLength(c) > a) {
        c = c.slice(0, c.length - 1)
    }
    return c
};
Utils.Form.limitMaxLen = function(a, b) {
    var c;
    var d = function() {
        c = a.value;
        var f = Core.String.byteLength(c);
        if (f > b) {
            a.value = Core.String.leftB(c, b)
        }
    };
    Core.Events.addEvent(a, Core.Function.bind3(d, a), "keyup");
    Core.Events.addEvent(a, Core.Function.bind3(d, a), "blur");
    Core.Events.addEvent(a, Core.Function.bind3(d, a), "focus")
};
Lib.invite_tpl = ['<table id="#{entity}" class="CP_w">', '<thead id="#{titleBar}">', "<tr>", '<th class="tLeft"><span></span></th>', '<th class="tMid">', '<div class="bLyTop">', '<strong id="#{titleName}">提示标题</strong>', '<cite><a id="#{btnClose}" href="#" class="CP_w_shut" title="关闭">关闭</a></cite>', "</div>", "</th>", '<th class="tRight"><span></span></th>', "</tr>", "</thead>", "<tfoot>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td>', "</tr>", "</tfoot>", "<tbody>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid" id="#{content}">', "</td>", '<td class="tRight"><span></span></td>', "</tr>", "</tbody>", "</table>"].join("");
$SYSMSG.extend({
    A00001: "系统繁忙，请稍候再试。",
    A00007: "请先登录。",
    A20101: "内容超长。",
    A20102: "请输入正确的登录名或密码。",
    A20103: "请输入正确的验证码。",
    A20104: "请把对方在黑名单中解除，再加为好友。",
    A20105: "你的好友数量达到上限，不能添加新好友。",
    A20106: "对方设置不接受好友邀请，不能加为好友。",
    A20107: "不能加自己为好友。",
    A20108: "你们已经是好友。",
    A20109: "不能包含sina等特殊含义字符。",
    A20121: "参数格式不正确。",
    A20000: "参数格式不正确。",
    A20001: "内容超长。",
    A20002: "请输入正确的登录名或密码。",
    A20003: "请输入正确的验证码。",
    A20004: "不能包含sina等特殊含义字符。",
    A20005: "纸条内容不能为空。",
    A20006: "不能自己给自己发纸条",
    A20007: "请把对方在黑名单中解除，再发送纸条。",
    A20020: "给#{nick}的纸条发送失败！",
    A20008: "对不起，您短时间发表的纸条过多，请多休息会，注意身体！感谢您对新浪博客的支持和关注!",
    A20999: "对不起，您短时间发送的好友请求过多，请多休息会，注意身体！感谢您对新浪博客的支持和关注!"
});
Lib.Invite_Base = Core.Class.create();
Lib.Invite_Base.prototype = {
    html: ['<div class="CP_layercon2 addFriendItem">', '<div class="toWho">#{head_image}<span>#{nickname}</span></div>', '<div class="formTowho">', '<div class="row1" style="display:#{login};">登录名：', '<input id="invite_loginname" type="text" class="fm1" style="width:80px;"/>&nbsp;&nbsp;&nbsp;', '密码：<input id="invite_password" type="password" class="fm1" style="width:73px;" maxlength="16"/>', '&nbsp;&nbsp;<a target="_blank" href="http://login.sina.com.cn/getpass.html">找回密码</a><em class="SG_txtc">', '|</em><a target="_blank" href="http://login.sina.com.cn/signup/signup.php?entry=blog&srcuid=' + scope.$uid + '&src=blogicp">注册</a>', '<input id="saveOnline_invite" type="checkbox" value="" style="display:inline-block;margin-top:3px;"/><label for="saveOnline_invite" style="margin-top:10px; display:inline-block;">记住登录状态</label>', '<span id="saveCaution_invite" style="color:#999; margin-left:10px; display:none;">建议在网吧/公用电脑上取消该选项</span>', '</div><p id="invite_user_error" class="ErrTips" style="display:none;">请输入正确的登录名或密码</p>', '<div class="row2"><textarea id="invite_content"></textarea></div>', '<div class="row1"><span id="invite_limit" class="SG_floatR SG_txtc">您还可以输入#{content_length}个汉字</span>', '验证码：<input type="text" id="invite_checkcode" maxlength="4"', ' style="width:60px" class="fm1" name="input"/>&nbsp;', '<img height="16" width="51" id="invite_checkimage" src="#{checkImage}" align="absmiddle" />&nbsp;', '<a id="invite_checklink" href="#" onclick="return false;">换一下</a>', '<p id="invite_code_error" class="ErrTips" style="display:none;"></p></div>', '<div class="btn">', '<a id="invite_submit" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite>', "#{dialogTitle}</cite></a>&nbsp;&nbsp;", '<a id="invite_cancel" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite>取消</cite></a>', "</div>", "</div>", "</div>"].join(""),
    dialogName: "invite",
    initialize: function(f, b) {
        this.uid = f;
        this.onlineTime = b || 15;
        Lib.checkAuthor();
        var d = {
            head_image: this.headImage != null ? this.headImage: '<img src="' + ("http://portrait" + (this.uid % 8 + 1) + ".sinaimg.cn/" + this.uid + "/blog/50") + '" align="absmiddle" alt="' + scope.owenerNickName + '" title="' + scope.owenerNickName + '" />',
            nickname: this.title(),
            login: $isLogin ? "none": "",
            checkImage: "http://vlogin.blog.sina.com.cn/myblog/checkwd_image.php?" + Math.random(),
            content_length: this.contentLength / 2,
            dialogTitle: this.dialogTitle
        };
        var c = new Ui.Template(this.html).evaluate(d);
        if (this.dialog == null) {
            this.dialog = winDialog.createCustomsDialog({
                content: "",
                title: this.dialogTitle,
                tpl: Lib.invite_tpl
            },
            this.dialogName);
            this.dialog.setClose("close")
        } else {}
        this.dialog.setContent(c);
        this.dialog.setMiddle();
        this.dialog.show();
        this.dialog.setAreaLocked(true);
        Utils.Form.limitMaxLen($E("invite_content"), this.contentLength);
        Core.Events.addEvent("invite_submit", Core.Function.bind2(this.checkData, this));
        Core.Events.addEvent("invite_cancel", Core.Function.bind2(this.closeDailog, this));
        var a = function() {
            $E("invite_checkimage").src = "http://vlogin.blog.sina.com.cn/myblog/checkwd_image.php?" + Math.random()
        };
        Core.Events.addEvent("invite_checkimage", a);
        Core.Events.addEvent("invite_checklink", a);
        Core.Events.addEvent("invite_content", Core.Function.bind2(function() {
            clearInterval(this.check);
            this.check = setInterval(Core.Function.bind2(function() {
                var g = Core.String.byteLength($E("invite_content").value);
                var i = Math.max(0, Math.floor((this.contentLength - g) / 2));
                $E("invite_limit").innerHTML = "您还可以输入" + i + "个汉字"
            },
            this), 500)
        },
        this), "focus");
        Core.Events.addEvent("invite_content", Core.Function.bind2(function() {
            clearInterval(this.check);
            this.check = null
        },
        this), "blur");
        this.initSaveCaution();
        this.reloadName()
    },
    initSaveCaution: function() {
        var b = $E("saveOnline_invite");
        var a = $E("saveCaution_invite");
        if (!$isLogin) {
            b[$IE ? "onclick": "onchange"] = c
        }
        c();
        function c() {
            if (b.checked) {
                a.style.display = "inline-block"
            } else {
                a.style.display = "none"
            }
        }
    },
    reloadName: function() {
        var a = Utils.Cookie.getCookie("remberloginname");
        if (a != "") {
            $E("invite_loginname").value = unescape(unescape(a))
        }
    },
    checkData: function() {
        if (!$isLogin) {
            this.username = Core.String.trim($E("invite_loginname").value);
            this.password = Core.String.trim($E("invite_password").value);
            if (this.username == "" || this.password == "") {
                $E("invite_user_error").style.display = "";
                return
            } else {
                $E("invite_user_error").style.display = "none"
            }
        }
        this.checkcode = Core.String.trim($E("invite_checkcode").value);
        if (this.checkcode == "" || this.checkcode.length < 4) {
            $E("invite_code_error").innerHTML = "请输入正确的验证码";
            $E("invite_code_error").style.display = "";
            return
        } else {
            $E("invite_code_error").style.display = "none"
        }
        if (!$isLogin) {
            this.login()
        } else {
            this.postContent()
        }
    },
    login: function() {
        this.request = new Lib.Login.LoginPost(Core.Function.bind2(function(a) {
            if (a.result) {
                Utils.Cookie.setCookie("remberloginname", escape($E("invite_loginname").value), 2400, "/", ".blog.sina.com.cn");
                if (this.postContent) {
                    Lib.checkAuthor();
                    this.postContent()
                }
            } else {
                trace("登陆失败 ：" + a.reason);
                $E("invite_user_error").style.display = ""
            }
        },
        this), false, "referer:" + location.hostname + location.pathname + ",func:000" + (/messagesend/.test(this.Interface.url.url) ? "2": "3"));
        this.request.login(this.username, this.password, ($E("saveOnline_invite").checked ? this.onlineTime: null))
    },
    resultHTML: new Ui.Template(['<div class="CP_layercon1">', '<div class="CP_prompt">', '<img class="SG_icon #{icon}" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif"', ' width="50" height="50" align="absmiddle" />', '<table class="CP_w_ttl"><tr><td>#{content}</td></tr></table>', '<p class="CP_w_btns_Mid"><a class="SG_aBtn SG_aBtnB" href="#" ', "onclick=\"winDialog.close('invite');return false;\"><cite> 确定 </cite></a></p>", "</div>", "</div>"].join("")),
    postContent: function() {
        $tray.renderLogin();
        var a = this.Interface;
        var b = {
            tuid: this.uid,
            fuid: $UID,
            authcode: Core.String.trim($E("invite_checkcode").value),
            content: $E("invite_content").value,
            varname: "addFriendRequest",
            version: 7,
            rnd: new Date().valueOf()
        };
        a.request({
            GET: b,
            onSuccess: Core.Function.bind2(function() {
                var c = {
                    icon: "SG_icon203",
                    content: this.successMSG()
                };
                this.dialog.setContent(this.resultHTML.evaluate(c));
                if (this.afterSubmit != null) {
                    this.afterSubmit()
                }
            },
            this),
            onError: Core.Function.bind2(function(d) {
                if (d.code == "A20109" || d.code == "A20004") {
                    $E("invite_user_error").innerHTML = $SYSMSG[d.code];
                    $E("invite_user_error").style.display = ""
                } else {
                    if (d.code == "A20003" || d.code == "A20103") {
                        $E("invite_code_error").innerHTML = $SYSMSG[d.code];
                        $E("invite_code_error").style.display = "";
                        $E("invite_checkimage").src = "http://vlogin.blog.sina.com.cn/myblog/checkwd_image.php?" + Math.random();
                        $E("invite_checkcode").value = ""
                    } else {
                        var c = {
                            icon: "SG_icon202",
                            content: $SYSMSG[d.code].replace(/#{nick}/, scope.owenerNickName)
                        };
                        this.dialog.setContent(this.resultHTML.evaluate(c))
                    }
                }
                if (this.afterSubmit != null) {
                    this.afterSubmit()
                }
            },
            this),
            onFail: Core.Function.bind2(function() {
                var c = {
                    icon: "SG_icon202",
                    content: $SYSMSG.A00001
                };
                this.dialog.setContent(this.resultHTML.evaluate(c))
            },
            this)
        })
    },
    closeDailog: function() {
        this.dialog.close()
    }
};
Lib.Invite = Core.Class.define(Lib.Invite_Base.prototype.initialize, Lib.Invite_Base, {
    dialogTitle: "加好友",
    contentLength: 200,
    title: function() {
        return '加"' + scope.owenerNickName + '"为好友'
    },
    successMSG: function() {
        return ["邀请发送成功，请等待对方确认。", '<div class="CP_w_cnt SG_txtb" style="font-size:12px;font-weight:normal;">以后对方的动态（发博文，图片，投票等），都可以在<span style="color: red;">个人中心</span>查看啦！</div>', '<ul class="CP_w_part CP_w_aLine">', '<li><a style="font-weight:normal;font-size:12px;" href="http://control.blog.sina.com.cn/blogprofile/index.php?type=3&from=addfiend" target="_blank">到个人中心查看其他好友动态&gt;&gt;</a></li>', "</ul>"].join("")
    },
    Interface: new Interface("http://control.blog.sina.com.cn/riaapi/profile/invitesend.php", "jsload")
});
Lib.invite = function(a) {
    new Lib.Invite(a)
};
Lib.Scrip = Core.Class.define(Lib.Invite_Base.prototype.initialize, Lib.Invite_Base, {
    dialogTitle: "发纸条",
    headImage: "",
    contentLength: 300,
    title: function() {
        return "发纸条给：" + scope.owenerNickName
    },
    successMSG: function() {
        return "给" + scope.owenerNickName + "的纸条发送成功！"
    },
    Interface: new Interface("http://control.blog.sina.com.cn/riaapi/profile/messagesend.php", "jsload"),
    afterSubmit: function() {}
});
Lib.scrip = function(a) {
    new Lib.Scrip(a)
};
$registComp(901, {
    baseHTML: ['<div class="info"><div class="info_img" id="comp_901_head"><img src="http://portrait' + (scope.$uid * 1 % 8 + 1) + ".sinaimg.cn/" + scope.$uid + '/blog/180" id="comp_901_head_image" width="180" height="180" alt="" /></div><div class="info_txt"><div class="info_nm"><img id="comp_901_online_icon" style="display:none;" class="SG_icon SG_icon1" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" align="absmiddle" /><span class="SG_txtb"><strong id="comp_901_nickname">&nbsp;</strong></span><span class="info_into"><a class="SG_linka" href="http://space.sina.com.cn/u/1406758883"><img class="SG_icon SG_icon41" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" title="空间" align="absmiddle" />进入我的空间</a></span><div class="clearit"></div></div><div class="info_btn1"><a href="http://photo.blog.sina.com.cn/bencalie" class="SG_aBtn SG_aBtn_ico"><cite><img class="SG_icon SG_icon18" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" align="absmiddle" />相册</cite></a><a href="http://you.video.sina.com.cn/bencalie" class="SG_aBtn SG_aBtnD SG_aBtn_ico"><cite><img class="SG_icon SG_icon16" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" align="absmiddle" />播客</cite></a><div class="clearit"></div></div><div class="SG_j_linedot"></div><div class="info_list"><ul class="info_list1"><li><span class="SG_txtc">博客等级：</span><span id="comp_901_grade">读取中…</span></li><li><span class="SG_txtc">博客积分：</span><span id="comp_901_score">读取中…</span></li></ul><ul class="info_list2"><li><span class="SG_txtc">博客访问：</span><span id="comp_901_pv">读取中…</span></li><li><span class="SG_txtc">关注人气：</span><span id="comp_901_attention">读取中…</span></li></ul></div><div class="clearit"></div></div><div class="clearit"></div></div>'].join(""),
    load: function() {
        Lib.checkAuthor();
        if ($E("comp_901_head") == null) {
            this.setContent(this.baseHTML)
        }
        if ($isAdmin == false && $isLogin) {
            this.loadIsFriend()
        } else {
            if ($isAdmin == false && !$isLogin) {
                this.isFriend = false;
                this.loadOnline()
            } else {
                this.isOnline = true
            }
        }
        if ($E("comp_901_nickname")) {
            this.loadNickname()
        } else {
            this.renderHead();
            if ($E("ownernick")) {
                scope.owenerNickName = $E("ownernick").innerHTML
            }
        }
        this.loadOtherInfo();
        if (scope.$pageid == "pageSetM" && this.setManage && scope.$private.ad == 0 && scope.$private.adver == 0 && scope.$private.p4p == 0) {
            this.setManage()
        }
    },
    showOnlineInfo: function() {
        if (!$isAdmin && this.isOnline) {
            Core.Dom.setStyle($E("comp_901_online_icon"), "display", "");
            $E("comp_901_online_icon").alt = "在线";
            $E("comp_901_online_icon").title = "在线"
        }
    },
    showNickName: function(b) {
        var a = b[scope.$uid] || "";
        a = Core.String.encodeHTML(a);
        scope.owenerNickName = a;
        $E("comp_901_nickname").innerHTML = a;
        this.renderHead(a)
    },
    renderHead: function(a) {
        if (!$isAdmin) {
            if (a) {
                $E("comp_901_head_image").title = a
            }
        } else {
            $E("comp_901_head").innerHTML = '<a href="http://control.blog.sina.com.cn/blogprofile/nick.php" title="点击上传头像" target="_blank"><img id="comp_901_head_image" width="180" height="180" alt="点击上传头像" src="' + $E("comp_901_head_image").src + '" /></a>'
        }
    },
    loadOtherInfo: function() {
        this.loadPv();
        this.loadAttention();
        if (scope.$pageid == "index" || scope.$pageid == "indexM" || scope.$pageid == "pageSetM") {
            this.loadAdManage()
        }
    },
    loadPv: function() {
        var c = document.referrer == "0" ? "": encodeURIComponent(document.referrer);
        if (scope.totalPv && !isNaN(scope.totalPv)) {
            $SetPV(scope.totalPv)
        } else {
            var a = "";
            if (scope.$articleid) {
                a = "http://hits.blog.sina.com.cn/hits?act=4&aid=" + scope.$articleid + "&ref=" + c
            } else {
                var b = "00000000" + (scope.$uid * 1).toString(16);
                b = b.substr(b.length - 8, 8);
                a = "http://hits.blog.sina.com.cn/hits?act=3&uid=" + b + "&ref=" + c
            }
            Utils.Io.JsLoad.request(a, {
                onComplete: function(d) {
                    if (d && typeof d.pv != "undefined") {
                        scope.totalPv = d.pv;
                        $SetPV(d.pv)
                    }
                },
                onException: function() {
                    $SetPV(0)
                }
            })
        }
    },
    loadScore: function() {
        setTimeout(function() {
            Utils.Io.JsLoad.request("http://blogcnfv5.sinajs.cn/blogscr?uid=" + scope.$uid + "&varname=blogScore&.js", {
                onComplete: function() {
                    if (typeof blogScore != "undefined" || $E("comp_901_score") == null) {
                        var j = blogScore.coefficient.a;
                        var i = blogScore.coefficient.b;
                        var g = blogScore.coefficient.c;
                        var f = blogScore.coefficient.d;
                        var l = blogScore.x;
                        var d = blogScore.y;
                        var a = blogScore.z;
                        var b = blogScore.w;
                        var c = l * j + d * i + a * g + b * f;
                        $E("comp_901_score").innerHTML = "<strong>" + Core.String.formatNumber(c) + "</strong>"
                    }
                },
                noreturn: true
            })
        },
        1)
    },
    loadAttention: function() {
        var d = this;
        var b = new Interface("http://blogtj.sinajs.cn/api/get_attention_num.php", "jsload");
        var f = {
            uid: scope.$uid,
            suid: $isLogin ? $UID: "0",
            attention: "suid",
            s: "1"
        };
        if (scope.$pageid && scope.$pageid == "pageSetM") {
            f.userpointuid = scope.$uid
        }
        if (!$isAdmin) {
            f.userpointuid = scope.$uid
        }
        if (this.mashAddFriend) {
            var c = scope.$uid;
            var a = $UID;
            if (c && a) {
                f.friendattuid = c;
                f.friendattsuid = a
            } else {
                this.mashAddFriend = false
            }
        }
        b.request({
            GET: f,
            onSuccess: Core.Function.bind2(function(j) {
                if ($E("comp_901_attention")) {
                    var g = Core.String.formatNumber(j.num[scope.$uid]);
                    $E("comp_901_attention").innerHTML = "<strong>" + (g < 0 ? 0 : g) + "</strong>"
                }
                if (j.is_attention && j.is_attention[scope.$uid] == 1) {
                    this.isAttentioned = true;
                    if ($E("module_901_attention")) {
                        $E("module_901_attention").innerHTML = "已关注"
                    }
                }
                if (j.userpoint) {
                    if ($E("comp_901_score")) {
                        $E("comp_901_score").innerHTML = "<strong>" + j.userpoint + "</strong>"
                    }
                }
                if (this.mashAddFriend) {
                    var i = [{
                        uid: scope.$uid,
                        status: j.friendattr
                    }];
                    this.friendSuccessCallback(i)
                }
            },
            this),
            onError: function() {
                if ($E("comp_901_attention")) {
                    $E("comp_901_attention").innerHTML = "<strong>0</strong>"
                }
                if (d.mashAddFriend) {
                    d.friendErrorCallback()
                }
            },
            onFail: function() {
                if ($E("comp_901_attention")) {
                    $E("comp_901_attention").innerHTML = "<strong>0</strong>"
                }
                if (d.mashAddFriend) {
                    d.friendErrorCallback()
                }
            }
        })
    },
    loadArticleCount: function() {},
    loadPhotoCount: function() {},
    loadVideoCount: function() {},
    loadAdManage: function() {
        if ($isAdmin && scope.$private != null && scope.$private.ad != null && scope.$private.ad != 0 && $E("comp_901_adlink") == null) {
            Debug.info("添加广告共享计划管理链接");
            var b = ['<div class="info_locate2"><div class="SG_j_linedot"/></div><div id="comp_901_adlink" class="info_AD"><a href="http://share.sass.sina.com.cn/widget_ad/widget_ad_index.php" target="_blank">管理广告共享计划</a></div>'].join("");
            var a = Core.Dom.getElementsByClass(this.getContent(), "div", "info_txt");
            if (a) {
                a = a[0].lastChild;
                Core.Dom.insertHTML(a, b, "BeforeBegin")
            }
        }
    },
    showVisitButton: function() {
        var b;
        var c = "";
        if (this.isFriend == false) {
            c = "Lib.invite(" + scope.$uid + ');return false;" class="SG_aBtn"><cite>加好友'
        } else {
            if (this.isOnline) {
                c = "ucClient.chatWith(" + scope.$uid + ');;return false;" class="SG_aBtn"'
            } else {
                c = "winDialog.alert('该用户不在线，暂不能聊天。', {icon : '02'});return false;\" class=\"SG_aBtn SG_aBtn_dis\""
            }
            c += "><cite>在线聊天"
        }
        var a = ['<div class="info_locate"><div class="SG_j_linedot"></div>', '<div class="info_btn2">', '<p><a href="#" onclick="' + c, "</cite></a>", '<a href="#" onclick="Lib.scrip(' + scope.$uid + ');return false;" class="SG_aBtn">', "<cite>发纸条</cite></a></p>", '<p><a href="http://blog.sina.com.cn/s/profile_' + scope.$uid + '.html#write" class="SG_aBtn" target="_blank">', "<cite>写留言</cite></a>", '<a id="module_901_attention" href="#" onclick="return false;" class="SG_aBtn' + (this.isAttentioned ? " SG_aBtn_dis": "") + '">', '<cite onclick="Lib.Component.' + (this.isAttentioned ? " isAttentioned": "Attention") + '();">' + (this.isAttentioned ? "已": "加") + "关注</cite></a></p>", '<div class="clearit"></div>', "</div></div>"].join("");
        if (this.size == 210) {
            b = Core.Dom.getElementsByClass(this.getContent(), "div", "info_btn1");
            if (b) {
                b = b[0];
                Core.Dom.insertHTML(b, a, "AfterEnd")
            }
        } else {
            b = Core.Dom.getElementsByClass(this.getContent(), "div", "info_txt");
            if (b) {
                b = b[0];
                Core.Dom.insertHTML(b, a, "BeforeEnd")
            }
        }
    }
},
901);
$registComp(903, {
    load: function() {
        if ($E("atcPicList")) {
            this.loadPicture_new()
        } else {
            this.loadArticle()
        }
    },
    loadArticle: function() {
        var a = (typeof $tag_code != "undefined") ? $tag_code: "";
        Utils.Io.Ijax.request("http://tag.blog.sina.com.cn/tag/tag_walist_v7.php", {
            GET: {
                blog_id: scope.$articleid,
                tag: encodeURI($tag),
                tag_code: a
            },
            onComplete: function(b) {
                this.loadPicture('<div class="atcTitList relaList">' + b + "</div>")
            }.bind2(this),
            onException: function() {}
        })
    },
    loadPicture: function(a) {
        var b = "http://blog.sina.com.cn/lm/iframe/article/sort_" + this.articleCate[scope.$sort_id] + "_" + Math.ceil(Math.random() * 3) + "_v7.html";
        Utils.Io.Ajax.request(b, {
            onComplete: function(c) {
                var d = /<ul>\s+<\/ul>/i.test(c);
                this.getContent().innerHTML = a.replace(/<!-- relative_pic_blog-->/, d ? "": c)
            }.bind2(this),
            onException: function() {}
        })
    },
    loadPicture_new: function(a) {
        var b = "http://blog.sina.com.cn/lm/iframe/article/sort_" + this.articleCate[scope.$sort_id] + "_" + Math.ceil(Math.random() * 3) + "_v7.html";
        Utils.Io.Ajax.request(b, {
            onComplete: function(c) {
                var d = $E("atcPicList");
                d.innerHTML = c
            }.bind2(this),
            onException: function() {}
        })
    },
    articleCate: {
        "105": "105",
        "102": "117",
        "104": "104",
        "149": "149",
        "113": "113",
        "153": "117",
        "111": "117",
        "152": "122",
        "122": "122",
        "131": "131",
        "127": "108",
        "134": "149",
        "145": "108",
        "108": "108",
        "130": "130",
        "116": "116",
        "129": "129",
        "136": "129",
        "125": "125",
        "141": "108",
        "118": "118",
        "117": "117"
    }
},
"dymanic");
$registComp(904, {
    load: function() {
        if (Core.Dom.byClz(this.getContent(), "div", "wdtLoading").length > 0) {
            var a = "http://blog.sina.com.cn/main/top_new/article_sort/" + scope.$sort_id + "_day.v7.html";
            Utils.Io.Ajax.request(a, {
                onComplete: function(b) {
                    b = '<div class="atcTitList relaList">' + b + "</div>";
                    this.setContent(b)
                }.bind2(this),
                onException: function() {
                    this.showError()
                }.bind2(this)
            })
        } else {}
    }
},
"dymanic");
Core.String.shorten = function(c, a, b) {
    if (Core.String.byteLength(c) <= a) {
        return c
    }
    if (b != "") {
        b = b || "..."
    } else {
        b = ""
    }
    return Core.String.leftB(c, a) + b
};
$registComp(909, {
    load: function() {
        if ($E("tj_id")) {
            this.showTJList($E("tj_id"))
        }
    },
    showTJList: function(a) {
        Utils.Io.JsLoad.request("http://blogtj.sinajs.cn/api/tj/get_tj_article_info.php", {
            GET: {
                uid: scope.$uid
            },
            onComplete: (function(c) {
                var m = '<li><p><span class="SG_dot"></span><a href="#{href}" target="_blank">#{content}</a></p><div class="w_list SG_txtc"><a href="#{srcHref}" target="_blank">#{src}</a></div></li>';
                var g = "";
                var j = c.data;
                var b = c.data.length > 5 ? 5 : c.data.length;
                if (b === 0) {
                    a.innerHTML = '<li class="no_text">暂无被推荐博文</li>';
                    return
                }
                for (var f = 0; f < b; f++) {
                    var l = {};
                    l.href = "http://blog.sina.com.cn/s/blog_" + j[f].blog_id + ".html?tj=1";
                    l.content = Core.String.byteLength(j[f].blog_title) > 26 ? Core.String.shorten(j[f].blog_title, 26, "…") : j[f].blog_title;
                    l.content = Core.String.encodeHTML(l.content);
                    l.srcHref = j[f].tj_chanel_id_url;
                    l.src = j[f].tj_chanel_id_str;
                    var d = new Ui.Template(m).evaluate(l);
                    g += d
                }
                a.innerHTML = g
            }).bind2(this),
            onException: (function() {
                this.showError()
            }).bind2(this)
        })
    }
},
"dymanic");
Core.String.toInt = function(b, a) {
    return parseInt(b, a)
};
Core.String.a2u = function(a) {
    return a.replace(/\\u[\da-fA-F]{4}/gi,
    function(b) {
        b = Core.String.toInt(b.substr(2), 16);
        return String.fromCharCode(b)
    })
};
$registComp("12", {
    Interface: new Interface("http://footprint.cws.api.sina.com.cn/list.php", "jsload"),
    isDisabled: function() {
        var a = $_GLOBAL.disableVisitor;
        if (a && a.indexOf("|" + this.requestParam.uid + "|") > -1) {
            this["showDisabled"]();
            return true
        }
        return false
    },
    load: function() {
        if (this.requestParam == null) {
            this.show("请提供访客组件的接口参数")
        } else {
            Lib.checkAuthor();
            if (!$isLogin) {
                this.requestParam.varname = "requestId_visitor_list"
            }
            if (scope.unreadMsg && scope.unreadMsg.foot == 0) {
                this.requestParam.add = 1
            }
            if (this.isDisabled()) {
                return
            }
            this.Interface.request({
                GET: this.requestParam,
                onSuccess: Core.Function.bind2(function(a) {
                    Core.Array.foreach(a.record, Core.Function.bind2(function(c) {
                        c.vString = this.formatTime(c.vtime, a.stime);
                        var b = Core.String.a2u(c.name);
                        c.shortName = Core.String.byteLength(b) > 8 ? Core.String.leftB(b, 6) + "…": Core.String.leftB(b, 8);
                        c.shortName = Core.String.encodeHTML(c.shortName)
                    },
                    this));
                    this.cacheData = a.record;
                    this.total = a.total;
                    this["render_" + this.size](this.cacheData)
                },
                this),
                onError: Core.Function.bind2(function(a) {
                    this.showError($SYSMSG[a.code])
                },
                this),
                onFail: Core.Function.bind2(function() {
                    this.showError($SYSMSG.A80101)
                },
                this)
            })
        }
    },
    formatTime: function(b, i) {
        var a = "";
        var c = new Date(i * 1000);
        var g = new Date(b * 1000);
        if (c.getFullYear() == g.getFullYear() && c.getMonth() == g.getMonth() && c.getDate() == g.getDate()) {
            var f = Math.max(0, i - b);
            Debug.warning("diffTime : " + f);
            if (f < 60 * 60) {
                a = Math.ceil(f / 60) + "分钟前"
            } else {
                var j = new Date(b * 1000);
                a = ("今天0" + j.getHours() + ":0" + j.getMinutes()).replace(/(\d{3,3})/g,
                function(m, l) {
                    return l.substr(1)
                })
            }
        } else {
            var d = new Date(b * 1000);
            a = (d.getMonth() + 1) + "月" + d.getDate() + "日"
        }
        return a
    },
    reload: function(c, b, d) {
        var a = c == null || (c && (c == 210 || c == 510 || c == 730));
        if (!a) {
            Debug.error("请检查传入的组件尺寸是否正确。" + c);
            return
        }
        this.size = c || this.size;
        this.getContent().innerHTML = '<div class="wdtLoading"><img src="http://simg.sinajs.cn/blog7style/images/common/loading.gif" />加载中…</div>';
        if (d == true || this.cacheData == null) {
            this.load()
        } else {
            this["render_" + this.size]()
        }
    }
},
"dynamic");
Lib.deleteVisitByUid = function(d, g, c, b) {
    Lib.checkAuthor();
    if (!$isLogin) {
        var f = new Lib.Login.Ui();
        f.login(Core.Function.bind3(Lib.deleteWallByMsgid, null, arguments));
        return
    }
    Debug.log("删除访客：" + d);
    var a = "";
    if ($isAdmin) {
        a = $SYSMSG.A80203
    } else {
        if ($isLogin) {
            a = $SYSMSG.A80201
        } else {
            return true
        }
    }
    winDialog.confirm(a, {
        funcOk: function() {
            var i = new Interface("http://footprint.cws.api.sina.com.cn/del.php", "jsload");
            var j = {
                pid: g,
                uid: scope.$uid,
                deleteuid: d
            };
            if (b != null) {
                j.subid = b
            }
            if ($E("comp_12_deleteToBlack") && $E("comp_12_deleteToBlack").checked == true) {
                j.inblack = 1
            }
            i.request({
                GET: j,
                onSuccess: function() {
                    if (c) {
                        c(null, null, true)
                    } else {
                        Debug.log("Reload page");
                        window.location.reload()
                    }
                }
            })
        },
        subText: $isAdmin ? $SYSMSG.A80204: $SYSMSG.A80202,
        textOk: "是",
        textCancel: "否",
        icon: "04"
    })
};
$SYSMSG.extend({
    B80001: "暂无访客",
    B80002: "暂无留言",
    B80003: "暂无博客评论",
    B80004: "暂无好友",
    B80005: "暂无图片专辑",
    B80006: "暂无视频",
    B80007: "暂无归档博文",
    B80101: "你确定删除此评论吗？删除后不可恢复",
    B80102: "你确定删除此留言吗？删除后不可恢复",
    B80103: ['<ul class="CP_w_part SG_txtb"><li><input type="checkbox" id="comp_2_deleteToBlack" class="CP_w_fm1" /><label for="comp_2_deleteToBlack" >将此人加入黑名单</label></li></ul><div class="CP_w_cnt SG_txtb">加入黑名单的用户无法和你沟通。</div>'].join(""),
    A00101: '<div class="SG_nodata">留言板非公开</div>'
});
$registComp(12, {
    requestParam: {
        uid: scope.$uid,
        pagesize: "18",
        pid: 1
    },
    html: ['<div class="ptCell">', '<p class="pt_img"><a href="http://blog.sina.com.cn/u/#{uid}" target="_blank" ', "onmouseover=\"if(this.parentNode.lastChild.className=='del'){this.parentNode.lastChild.style.display='';}\" ", "onmouseout=\"if(this.parentNode.lastChild.className=='del'){this.parentNode.lastChild.style.display='none';}\" ><img", ' src="#{icon}" width="50" height="50" alt="#{name}" title="#{name}" /></a>', "#{update}#{manage}</p>", '<p class="pt_nm"><a href="http://blog.sina.com.cn/u/#{uid}"" target="_blank" title="#{name}">#{shortName}</a></p>', '<p class="pt_tm SG_txtc">#{vString}</p>', "</div>"].join(""),
    render_210: function(a) {
        a = a || this.cacheData;
        a = a.slice(0, 12);
        this.parseToHTML(a)
    },
    render_510: function(a) {
        a = a || this.cacheData;
        a = a.slice(0, 12);
        this.parseToHTML(a)
    },
    render_730: function(a) {
        a = a || this.cacheData;
        this.parseToHTML(a)
    },
    parseToHTML: function(c) {
        if (c.length == 0) {
            this.showEmpty()
        } else {
            Lib.checkAuthor();
            Core.Array.foreach(c, Core.Function.bind2(function(d) {
                d.manage = ($isAdmin || ($isLogin && d.uid == $UID)) ? '<span class="del" style="display: none;" onmouseover="this.style.display = \'\';" onmouseout="this.style.display = \'none\';"><img class="SG_icon SG_icon6" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" title="删除访问记录" onclick="Lib.deleteVisitByUid(\'' + d.uid + "', 1, Core.Function.bind2(Lib.Component.instances[" + this.compId + "].reload, Lib.Component.instances[" + this.compId + "])" + (scope.$articleid == null ? "": ",'" + scope.$articleid + "'") + ');return false;" align="absmiddle" /></span>': "";
                d.update = (d.utime == 1) ? '<span class="new"><img class="SG_icon SG_icon7" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" title="有内容更新，赶快去看一下" align="absmiddle" /></span>': ""
            },
            this));
            var b = new Ui.Template(this.html);
            var a = '<div class="ptList visitorList">' + b.evaluateMulti(c) + "</div>";
            if ((scope.$pageid == "indexM" || scope.$pageid == "pageSetM") && $isAdmin == true && ((this.size < 730 && this.total > 12) || (this.size == 730 && this.total > 18))) {
                a += '<div class="moreLink SG_j_linedot1"><span class="SG_more"><a href="http://control.blog.sina.com.cn/blogprofile/visitor.php?showtype=1" target="_blank">更多</a>&gt;&gt;</span></div>'
            } else {
                a += '<div class="moreLink" style="padding-top:0;"></div>'
            }
            this.show(a)
        }
        if (scope.$pageid == "pageSetM" && this.setManage) {
            this.setManage()
        }
    },
    showEmpty: function() {
        this.setContent('<div class="SG_nodata">' + $SYSMSG.B80001 + "</div>")
    },
    showDisabled: function() {
        var a = "尊敬的用户您好，为了给大家提供更好的服务，近期访客组件进行升级维护，维护过程中将影响部分用户无法正常浏览，给您带来不便敬请谅解！感谢您对新浪博客一直以来的支持！";
        this.setContent('<div class="SG_nodata" style="padding-left:1.5em; padding-right:1.5em; text-indent:2em; text-align:left">' + a + "</div>")
    },
    setManage: function() {
        if ($isAdmin && this.getManage()) {
            this.getManage().innerHTML = '<span class="move"><a href="#" onclick="funcMoveUpDown.up(' + this.compId + ');return false;">↑</a><a href="#" onclick="funcMoveUpDown.down(' + this.compId + ');return false;">↓</a></span><a href="#" onclick="hiddenComponents(\'' + this.compId + '\');return false;" class="CP_a_fuc">[<cite>隐藏</cite>]</a>'
        }
    }
},
12);
$registComp(47, {
    requestParam: {
        uid: scope.$uid,
        pagesize: "12",
        pid: 1,
        subid: scope.$articleid
    }
},
12);
$registComp(102, {
    load: function() {
        trace("comp_1023");
        this.loadArticle()
    },
    loadArticle: function() {
        Utils.Io.JsLoad.request("http://control.blog.sina.com.cn/riaapi/photoblog/get_hotblog_list.php", {
            GET: {
                uid: scope.$uid,
                version: 7
            },
            onComplete: function(f) {
                var g = '<div class="photoBlog">';
                var c = f;
                var d = c.data;
                for (var i = 0,
                a = d.length; i < a; i++) {
                    var b = d[i].tj ? d[i].tj: "";
                    g += this.tpl.format(d[i].blogurl, d[i].title, d[i].picnum, d[i].hitsnum, d[i].commentnum, d[i].picurl, b, d[i].title)
                }
                g += "</div>";
                this.getContent().innerHTML = g
            }.bind2(this),
            onException: function() {
                trace("connect error")
            }
        })
    },
    tpl: '<div class="photoBlog_cell"><div class="photoBlog_view"><table><tr><td><a href="{0}" target="_blank"><img class="borderc" src="{5}" alt="{7}" title="{7}"/></a></td></tr></table></div><p class="photoBlog_nm">{6}<a href="{0}" target="_blank">{1}</a> <span class="count">({2}张)</span></p><p>阅读({3}) 评论({4})</p></div>'
},
"dymanic");
Core.System.pageSize = function(c) {
    if (c) {
        target = c.document
    } else {
        target = document
    }
    var f = (target.compatMode == "CSS1Compat" ? target.documentElement: target.body);
    var d, b;
    if (window.innerHeight && window.scrollMaxY) {
        d = f.scrollWidth;
        b = window.innerHeight + window.scrollMaxY
    } else {
        if (f.scrollHeight > f.offsetHeight) {
            d = f.scrollWidth;
            b = f.scrollHeight
        } else {
            d = f.offsetWidth;
            b = f.offsetHeight
        }
    }
    var a = Core.System.winSize(c);
    if (b < a.height) {
        pageHeight = a.height
    } else {
        pageHeight = b
    }
    if (d < a.width) {
        pageWidth = a.width
    } else {
        pageWidth = d
    }
    return [pageWidth, pageHeight, a.width, a.height]
}; (function() {
    function b(f, c) {
        this.node = f;
        this.config = c;
        for (var d in this.defaultConfig) {
            this.config[d] = this.defaultConfig[d]
        }
        this.initialize();
        return this
    }
    b.prototype = {
        defaultConfig: {
            preloadPixel: 500
        },
        initialize: function() {
            this.viewableHeight = a.getViewableHeight();
            a.enrol(this)
        },
        callback: function(d) {
            if (this.node.length == 0) {
                return
            }
            this.viewableHeight = d || this.viewableHeight;
            var g = [];
            for (var f = 0,
            c = this.node.length; f < c; f++) {
                if (this.node[f] && this.node[f].dom == null && Core.Dom.getXY(this.node[f])[1] < this.viewableHeight + this.config.preloadPixel) {
                    this.config.callback(this.node[f]);
                    this.node[f] = null
                } else {
                    if (this.node[f] && this.node[f].dom && Core.Dom.getXY(this.node[f].dom)[1] < this.viewableHeight + this.config.preloadPixel) {
                        this.node[f].callback(this.node[f].dom);
                        this.node[f] = null
                    } else {
                        g.push(this.node[f])
                    }
                }
            }
            this.node = g
        }
    };
    var a = {
        _isInit: null,
        _binder: null,
        _isWindow: null,
        _member: [],
        initialize: function() {
            var c = window,
            d = c == window || c == document || !c.tagName || (/^(?:body|html)$/i).test(c.tagName);
            if (d) {
                var f = c.document;
                c = (f.compatMode == "CSS1Compat" && ($IE || $FF || $OPERA)) ? f.documentElement: f.body
            }
            this._container = c;
            this._binder = d ? window: c;
            this._isWindow = d;
            this._isInit = true;
            this.delayResize();
            this.bindEvent()
        },
        getViewableHeight: function() {
            var c = a._container.scrollTop + Core.System.winSize().height;
            this.eyeableHeight = c;
            return c
        },
        bindEvent: function() {
            if (!this._isInit) {
                this.initialize();
                return
            }
            Core.Events.addEvent(this._binder, a.delayLoad, "scroll");
            if (this._isWindow) {
                Core.Events.addEvent(this._binder, a.delayResize, "resize")
            }
            this.binded = true
        },
        unbindEvent: function() {
            Core.Events.removeEvent(a._binder, a.delayLoad, "scroll");
            if (this._isWindow) {
                Core.Events.removeEvent(a._binder, a.delayResize, "resize")
            }
            this.binded = false
        },
        delayLoad: function() {
            if (a.scrollWatch) {
                clearTimeout(a.scrollWatch)
            }
            a.scrollWatch = setTimeout(function() {
                a.callback();
                clearTimeout(a.scrollWatch);
                a.scrollWatch = null
            },
            100)
        },
        delayResize: function() {
            if (a.resizeWatch) {
                clearTimeout(a.resizeWatch)
            }
            a.resizeWatch = setTimeout(function() {
                a.callback();
                clearTimeout(a.resizeWatch);
                a.resizeWatch = null
            },
            100)
        },
        enrol: function(c) {
            a._member.push(c)
        },
        callback: function() {
            a.getViewableHeight();
            if (a._member.length > 0) {
                for (var d = 0,
                c = a._member.length; d < c; d++) {
                    a._member[d].callback(a.eyeableHeight)
                }
            }
            if (a.eyeableHeight == Core.System.pageSize()[1]) {
                a.unbindEvent()
            }
        }
    };
    Lib.LazyLoad = function(d, c) {
        if (a.binded != true) {
            a.bindEvent(d, c)
        }
        new b(d, c)
    }
})();
Lib.Component.renderByList = function(a) {
    Core.Array.foreach(a,
    function(d) {
        try {
            if ($E("module_" + d) != null) {
                var b = Lib.Component.instances[d] || new Lib.Component["Comp_" + d](d);
                if (b.size != null && b.load != null) {
                    b.size = Lib.Component.compSize[d];
                    try {
                        b.load()
                    } catch(c) {}
                    Debug.log("组件：" + d + " 初始化成功")
                } else {
                    Debug.error("组件：" + d + " 初始化失败，组件尺寸信息不存在")
                }
            } else {
                Debug.error("组件：" + d + " 初始化失败，页面内缺少组件的HTML节点")
            }
        } catch(c) {
            Debug.error(c.message || "组件：" + d + " 初始化失败，请确认该组件类是否定义过")
        } finally {}
    })
};
Lib.Component.lazyRenderByList = function(b) {
    var a = [];
    Core.Array.foreach(b,
    function(f) {
        try {
            if ($E("module_" + f) != null) {
                var c = Lib.Component.instances[f] || new Lib.Component["Comp_" + f](f);
                if (c.size != null && c.load != null) {
                    c.size = Lib.Component.compSize[f];
                    try {
                        a.push({
                            dom: $E("module_" + f),
                            callback: Lib.Component.instances[f].load.bind2(Lib.Component.instances[f])
                        })
                    } catch(d) {}
                    Debug.log("组件：" + f + " 初始化成功")
                } else {
                    Debug.error("组件：" + f + " 初始化失败，组件尺寸信息不存在")
                }
            } else {
                Debug.error("组件：" + f + " 初始化失败，页面内缺少组件的HTML节点")
            }
        } catch(d) {
            Debug.error(d.message || "组件：" + f + " 初始化失败，请确认该组件类是否定义过")
        } finally {}
    });
    Lib.LazyLoad(a, {})
};
$registJob("articleComp1",
function() {
    var a = [901, 102];
    if (Lib.Component.getInitCompSize() == null) {
        Debug.error("无法获得页面内组件的尺寸，请检查页面内输出的组件配置信息是否存在。。。");
        return
    }
    trace("文章页组件渲染列表: " + a.toString());
    Lib.Component.renderByList(a)
});
$registJob("articleComp2",
function() {
    var a = [903, 904, 909, 47];
    if (Lib.Component.getInitCompSize() == null) {
        Debug.error("无法获得页面内组件的尺寸，请检查页面内输出的组件配置信息是否存在。。。");
        return
    }
    trace("文章页组件渲染列表: " + a.toString());
    Lib.Component.lazyRenderByList(a)
});
var Comment = {};
Comment.List = Core.Class.create();
Comment.List.prototype = {
    articleid: 0,
    page: 0,
    totle: 0,
    defaultAnchor: "#comment",
    initialize: function() {
        this.articleid = scope.$articleid
    },
    load: function(c) {
        this.page = c;
        var b = "http://blog.sina.com.cn/s/comment_" + this.articleid + "_" + this.page + ".html";
        var a = new Interface(b, "ajax");
        var d = this;
        a.request({
            GET: {
                url_random: 0
            },
            returnType: "json",
            onSuccess: d.list.bind2(d),
            onError: function(f) {
                switch (f.code) {
                case "B36020":
                case "B36021":
                case "A00001":
                    this.error(f.code);
                    break;
                default:
                    showError(f.code);
                    this.error("B36110");
                    break
                }
            }.bind2(this),
            onFail: function() {
                this.error("B36110")
            }.bind2(this)
        })
    },
    list: function(a) {
        trace("显示列表");
        if (a == "") {
            this.error($isAdmin ? "B36021": "B36020")
        } else {
            $E("article_comment_list").innerHTML = '<span name="' + this.defaultAnchor + this.page + '" id="' + this.defaultAnchor + this.page + '"></a>' + a
        }
        this.anchor();
        this.paging()
    },
    anchor: function() {
        var b = window.location.href;
        var a = "#comment";
        var c = new RegExp("(" + a + ")\\d*");
        if (b.indexOf(a) != -1) {
            window.location.href = b.replace(c, "$1" + this.page)
        } else {
            if (this.page > 1) {
                window.location.href = a + this.page
            }
        }
    },
    paging: function(a) {},
    error: function(a) {
        $E("article_comment_list").innerHTML = '<li class="CP_litem"><div class="CP_cmt_none">' + $SYSMSG[a] + "</div></li>"
    }
};
$registJob("articleComment",
function() {
    Lib.LazyLoad([$E("article_comment_list")], {
        callback: function() {
            if (scope.$private.cms != 1 && scope.$isCommentAllow != 1) {
                var a = new Comment.List();
                a.load(1)
            }
        }
    })
});
if (typeof App == "undefined") {
    var App = {}
}
$ScriptLoader = {
    callback: {},
    response: function(c, f) {
        var b = "00000000" + (scope.$uid * 1).toString(16);
        b = b.substr(b.length - 8, 8);
        var a = {};
        for (var d in f) {
            a[b + "01" + d] = f[d]
        }
        this.callback[c].func(a)
    }
};
App.getArticlesDetailNumber = function(g, c, f) {
    if (c == null || c.length == 0) {
        return {}
    }
    g = g || scope.$uid;
    var b = "00000000" + (scope.$uid * 1).toString(16);
    b = b.substr(b.length - 8, 8);
    var a = [];
    Core.Array.foreach(c,
    function(l) {
        a.push(l.replace(b + "01", ""))
    });
    var j = $C("script");
    var d = Math.ceil(Math.random() * 10000);
    while ($ScriptLoader.callback[d] != null) {
        d = Math.ceil(Math.random() * 10000)
    }
    var i = "aritlces_number_" + d;
    $ScriptLoader.callback[i] = {
        func: f,
        uid: g
    };
    j.src = "http://blogcnf.sinajs.cn/num?uid=" + b + "&aids=" + a.join(",") + "&requestId=" + i;
    j.charset = "utf-8";
    j.onload = j.onerror = j.onreadystatechange = Core.Function.bind2(function() {
        if (j && j.readyState && j.readyState != "loaded" && j.readyState != "complete") {
            return
        }
        j.onload = j.onreadystatechange = j.onerror = null;
        j.src = "";
        j.parentNode.removeChild(j);
        j = null
    },
    this);
    document.getElementsByTagName("head")[0].appendChild(j)
};
Lib.getUidhex = function() {
    if (!scope.$uidhex) {
        scope.$uidhex = window.parseInt(scope.$uid).toString(16);
        scope.$uidhex = (scope.$uidhex.length < 8) ? ("00000000" + scope.$uidhex).match(/(\w{8})$/i)[1] : scope.$uidhex
    }
};
App.getArticlesFavoriteNumber = function(b, f) {
    if (b == null || b.length == 0) {
        f({})
    }
    var g = "http://collect.sinajs.cn/collect?key=";
    var a = [];
    for (var d in b) {
        a.push("1_url_" + b[d])
    }
    var c = "rs" + Math.ceil(Math.random() * 19999);
    g += a.join(",") + "&var=" + c;
    Utils.Io.JsLoad.request(g, {
        onComplete: function() {
            f(window[c])
        },
        onException: function() {
            f({})
        }
    })
};
Ui.Pagination = {
    config: {
        pageNode: null,
        nodeClassNamePrefix: "CP",
        curPage: 1,
        maxPage: 1,
        minPage: 1,
        pageTpl: "@page@.html",
        type: 1,
        showPrevNext: true,
        viewSize: 5,
        dotIsPage: false,
        dotRate: 5,
        showGoto: false,
        countTpl: "",
        language: "zh-cn",
        theme: 1,
        showLastPage: true,
        showTotal: false
    },
    _list: {},
    _resource: {
        "en-us": ["Pages (@data@): ", "Go to First Page", "Go to Previous Page (@data@)", "Go to Page @data@", "Go to Next Page (@data@)", "Go to Last Page", "Current Page in View"],
        "zh-cn": ["共 @data@ 页", "跳转至第一页", "跳转至前 @data@ 页", "跳转至第 @data@ 页", "跳转至后 @data@ 页", "跳转至最后一页", "当前所在页"]
    },
    _template: '<li class="#{class}" title="#{title}">#{link}</li>',
    init: function(d) {
        var b = $E(d.pageNode);
        if (b == null) {
            trace("分页指定的父容器不存在");
            return
        }
        Ui.Pagination._list[b.id] = {};
        var c = Ui.Pagination._list[b.id];
        for (var a in this.config) {
            c[a] = (d[a] === undefined) ? this.config[a] : d[a]
        }
        if (c.type == 2) {
            c.viewSize = 4
        }
        c.minPage = Math.min(c.minPage, c.maxPage) * 1;
        c.maxPage = Math.max(c.minPage, c.maxPage) * 1;
        c.curPage = (c.curPage > c.maxPage) ? c.minPage: c.curPage;
        c.curPage = c.curPage * 1;
        if (c.curPage + c.viewSize >= 100) {
            c.viewSize = 3
        }
        this._cache_node = c;
        return this
    },
    show: function(j, c) {
        c = c * 1;
        var a = this._cache_node;
        if (j != null) {
            this._cache_node = a = Ui.Pagination._list[j.id];
            a.curPage = c
        }
        var g = [];
        if (a.viewSize * 2 + 1 >= a.maxPage) {
            g[1] = a.minPage;
            g[2] = a.maxPage
        } else {
            if (a.curPage <= a.minPage + a.viewSize) {
                g[1] = a.minPage;
                g[2] = a.minPage + (a.viewSize * 2 - 1);
                g[3] = a.maxPage
            } else {
                if (a.curPage >= a.maxPage - a.viewSize) {
                    g[0] = a.minPage;
                    g[1] = a.maxPage - (a.viewSize * 2 - 1);
                    g[2] = a.maxPage
                } else {
                    g[0] = a.minPage;
                    g[1] = a.curPage - (a.viewSize - 1);
                    g[2] = a.curPage + (a.viewSize - 1);
                    g[3] = a.maxPage
                }
            }
        }
        var m = [];
        if (a.countTpl != null) {
            m.push(this._createPage("", "", "", "", a.countTpl))
        }
        if (a.type != 2 && a.curPage != a.minPage) {
            if (a.type == 3) {
                m.push(this._createPage(a.nodeClassNamePrefix + "_s_pgprev", a.curPage - 1, 3, a.curPage - 1, "上页"))
            } else {
                m.push(this._createPage(a.nodeClassNamePrefix + "_pgprev", a.curPage - 1, 3, a.curPage - 1, "< 上一页"))
            }
        }
        if (a.type != 3) {
            if (g[0] != null) {
                var d = (g[0] == a.curPage) ? this._createPage(a.nodeClassNamePrefix + "_pgon", 1, 6, "", g[0]) : this._createPage("", 1, 1, g[0], g[0]);
                m.push(d)
            }
            if (a.type == 1 && g[0] != null) {
                m.push(this._createPage(a.nodeClassNamePrefix + "_pgelip", "", "", "", "..."))
            }
            for (var b = g[1]; b <= g[2]; b++) {
                if (b == g[1] && b != a.minPage && a.type == 2) {
                    var l = a.curPage - a.dotRate;
                    l = l < a.minPage ? a.minPage: l;
                    m.push(this._createPage(a.nodeClassNamePrefix + "_pgelip", a.viewSize + 1, 2, a.curPage - a.viewSize - 1, "..."))
                } else {
                    if (b == g[2] && b != a.maxPage && a.type == 2) {
                        var f = a.curPage + a.dotRate;
                        f = f > a.maxPage ? a.maxPage: f;
                        m.push(this._createPage(a.nodeClassNamePrefix + "_pgelip", a.viewSize + 1, 4, a.curPage + a.viewSize + 1, "..."))
                    } else {
                        d = (b == a.curPage) ? this._createPage(a.nodeClassNamePrefix + "_pgon", 1, 6, "", b) : this._createPage("", b, 3, b, b);
                        m.push(d)
                    }
                }
            }
            if (a.type == 1 && g[3] != null) {
                m.push(this._createPage(a.nodeClassNamePrefix + "_pgelip", "", "", "", "..."))
            }
            if (g[3] != null && a.showLastPage) {
                d = (g[3] == a.curPage) ? this._createPage(a.nodeClassNamePrefix + "_pgon", a.curPage - 1, 3, "", g[3]) : this._createPage("", 1, 5, g[3], g[3]);
                m.push(d)
            }
        } else {
            m.push(this._createPage(a.nodeClassNamePrefix + "_s_pgnum", "", "", "", "<strong>" + a.curPage + "</strong>/" + a.maxPage))
        }
        if (a.type != 2 && a.curPage != a.maxPage) {
            if (a.type == 3) {
                m.push(this._createPage(a.nodeClassNamePrefix + "_s_pgnext", a.curPage + 1, 3, a.curPage + 1, "下页"))
            } else {
                m.push(this._createPage(a.nodeClassNamePrefix + "_pgnext", a.curPage + 1, 3, a.curPage + 1, "下一页 >"))
            }
        }
        if (a.showTotal == true) {
            m.push(this._createPage(a.nodeClassNamePrefix + "_pgttl", "", "", "", "共" + a.maxPage + "页"))
        }
        $E(a.pageNode).innerHTML = '<ul class="' + a.nodeClassNamePrefix + '_pages">' + m.join("") + "</ul>"
    },
    _createPage: function(i, f, d, b, g) {
        if (g == "") {
            return ""
        }
        var c = (f === "" || d == "") ? "": this._getTips(f, d);
        var a = (b !== "") ? ("<a " + this._getUrl(b) + ">" + g + "</a>") : g;
        return this._template.replace(/(#\{\w+\})/g,
        function(l, j) {
            switch (j) {
            case "#{class}":
                return i;
            case "#{title}":
                return c;
            case "#{link}":
                return a
            }
        })
    },
    showPage: function(a, b) {
        this._cache_node = Ui.Pagination._list[a];
        var c = this._cache_node.pageTpl(b);
        if (c != false) {
            Ui.Pagination.show($E(a), b)
        }
    },
    _getUrl: function(a) {
        if (typeof this._cache_node.pageTpl == "string") {
            return 'href="' + this._cache_node.pageTpl.replace(/@page@/, a) + '"'
        } else {
            return "href=\"javascript:Ui.Pagination.showPage('" + this._cache_node.pageNode + "'," + a + ');"'
        }
    },
    _getTips: function(b, a) {
        return (this._resource[this._cache_node.language][a]).replace(/@data@/g, b)
    }
};
Comment.count = function(b) {
    var c = 50;
    var a = 0;
    if (b % c == 0) {
        a = Math.ceil(b / c)
    } else {
        a = Math.floor(b / c) + 1
    }
    return a
};
Comment.paging = function(d, g) {
    var b = $E("commentPaging");
    if (b) {
        var f = new Comment.List();
        var c = 50;
        var a = Comment.count(d);
        scope.$comment_page = g;
        if (d > c) {
            b.parentNode.style.display = "block";
            $E("commentPaging").style.display = "block";
            Ui.Pagination.init({
                pageNode: "commentPaging",
                nodeClassNamePrefix: "SG",
                curPage: g,
                maxPage: a,
                pageTpl: function(i) {
                    scope.$comment_page = i;
                    f.load(i)
                }
            }).show()
        } else {
            b.parentNode.style.display = "none"
        }
    }
};
$registJob("articleNumber",
function() {
    Lib.checkAuthor();
    if (scope.$pn_x_rank == "1" && !$isAdmin) {
        return false
    }
    var uid = scope.$uid;
    var articleid = scope.$articleid;
    App.getArticlesDetailNumber(uid, [articleid],
    function(x) {
        var data = x[articleid];
        delete data.f;
        for (var i in data) {
            if ($E(i + "_" + articleid)) {
                $E(i + "_" + articleid).innerHTML = "(" + data[i] + ")"
            }
        }
        scope.$totle_comment = window.parseInt(data.c);
        Comment.paging(scope.$totle_comment, 1)
    });
    var favmd5 = eval("(" + $E("articlebody").getAttribute("favMD5") + ")");
    App.getArticlesFavoriteNumber(favmd5,
    function(data) {
        for (var k in favmd5) {
            if (data["1_url_" + favmd5[k]] != null) {
                $E("f_" + scope.$articleid).innerHTML = "(" + data["1_url_" + favmd5[k]] + ")"
            } else {
                $E("f_" + scope.$articleid).innerHTML = "(0)"
            }
        }
    })
});
Core.Events.fireEvent = function(b, c) {
    b = $E(b);
    if ($IE) {
        b.fireEvent("on" + c)
    } else {
        var a = document.createEvent("HTMLEvents");
        a.initEvent(c, true, true);
        b.dispatchEvent(a)
    }
};
Core.Dom.getTop = function(a) {
    var c = 0;
    var b = $E(a);
    if (b.offsetParent) {
        while (b.offsetParent) {
            c += b.offsetTop;
            b = b.offsetParent
        }
    } else {
        if (b.y) {
            c += b.y
        }
    }
    return c
};
Core.Dom.getLeft = function(a) {
    var c = 0;
    var b = $E(a);
    if (b.offsetParent) {
        while (b.offsetParent) {
            c += b.offsetLeft;
            b = b.offsetParent
        }
    } else {
        if (b.x) {
            c += b.x
        }
    }
    return c
};
Sina.pkg("Core.Math");
Core.Math.getUniqueId = function(b, a) {
    return parseInt(Math.random() * 10000).toString() + (new Date).getTime().toString()
};
var Tabs = Core.Class.create();
Tabs.prototype = {
    initialize: function(a, c) {
        c = c || {};
        var b = c.className || "";
        this.tabsArr = [];
        this.htmlEle = $C("ul");
        this.htmlEle.className = b;
        a.appendChild(this.htmlEle)
    },
    add: function(a) {
        this.tabsArr.push(a);
        this.htmlEle.appendChild(a.element);
        Core.Events.addEvent(a.element, Core.Function.bind3(this.swapTags, this, [a]))
    },
    swapTags: function(b) {
        if (b.isFocus == false) {
            for (var a = 0; a < this.tabsArr.length; a++) {
                this.tabsArr[a].setAbort()
            }
            b.setFocus()
        } else {
            return
        }
    }
};
var Tab = Core.Class.create();
Tab.prototype = {
    isShow: true,
    initialize: function(c, b) {
        this.id = Core.Math.getUniqueId();
        this.option = b || {};
        var a = b.isFocus || false;
        this.className = b.className || "";
        this.focus = b.onfocus ? [b.onfocus] : [];
        this.abotrts = b.onabort ? [b.onabort] : [];
        this.element = $C("li");
        if (b.cls) {
            this.element.className = b.cls
        }
        a ? this.setFocus() : this.setAbort();
        this.element.innerHTML = c
    },
    setAbort: function() {
        if (this.isFocus == false) {
            return
        }
        if (this.option.cls) {
            this.element.className = this.option.cls
        } else {
            this.element.className = ""
        }
        this.isFocus = false;
        this.onabort()
    },
    setFocus: function() {
        this.element.className = this.className;
        this.isFocus = true;
        this.onfocus()
    },
    onabort: function() {
        for (var a = 0; a < this.abotrts.length; a++) {
            this.abotrts[a]()
        }
    },
    onfocus: function() {
        for (var a = 0; a < this.focus.length; a++) {
            this.focus[a]()
        }
    },
    addOnAbort: function(a) {
        this.abotrts.push(a)
    },
    addOnFocus: function(a) {
        this.focus.push(a)
    },
    hidden: function() {
        this.element.style.display = "none"
    },
    hidden: function() {
        this.element.style.display = "none";
        this.isShow = false
    },
    show: function() {
        this.element.style.display = "block";
        this.isShow = true
    }
};
scope.faceTemplate = ['<table id="#{entity}" class="CP_w">', '<thead id="#{titleBar}">', "<tr>", '<th class="tLeft"><span></span></th>', '<th class="tMid">', '<div class="bLyTop">', '<strong id="#{titleName}">插入表情</strong>', '<cite><a id="#{btnClose}" href="javascript:;" class="CP_w_shut" title="关闭">关闭</a></cite>', "</div>", "</th>", '<th class="tRight"><span></span></th>', "</tr>", "</thead>", "<tfoot>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td>', "</tr>", "</tfoot>", "<tbody>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid" id="#{content}">', '<div class="faceItemContent">', '<div class="bigface">', '<div id="#{faceTab}" class="faceSidebar">', "</div>", '<div id="#{faceContent}" class="faceShowAll">', "</div>", "</div>", "</div>", "</td>", '<td class="tRight"><span></span></td>', "</tr>", "</tbody>", "</table>"].join("");
Lib.Face = Core.Class.create();
Lib.Face.prototype = {
    dialog: null,
    dialogNodes: null,
    tabs: null,
    faceConfig: null,
    template: null,
    txtContentArea: null,
    x: 0,
    y: 0,
    isShowed: false,
    _isInitDialog: false,
    insertImageFile: "",
    initialize: function(a, b) {
        var c = this;
        this.txtContentArea = a;
        this.template = b;
        window.$insertFace = function(f, d) {
            c.insertFace(f, d)
        }
    },
    load: function() {
        var a = this;
        this.dialog = new Dialog(this.template || scope.faceTemplate);
        this.dialogNodes = this.dialog.getNodes();
        this.tabs = new Tabs(this.dialogNodes.faceTab);
        Core.Events.addEvent(this.dialog.entity,
        function() {
            Core.Events.stopEvent()
        },
        "mousedown");
        Core.Events.addEvent(document.body,
        function() {
            a.hidden()
        },
        "mousedown");
        this.initFaceConfig(function() {
            if (a.tabs.tabsArr[0]) {
                a.tabs.tabsArr[0].setFocus()
            }
            Core.Events.addEvent(a.dialogNodes.btnClose,
            function() {
                a.hidden()
            },
            "mousedown");
            a.onInitialized()
        });
        this._isInitDialog = true
    },
    initFaceConfig: function(a) {
        var b = this;
        Utils.Io.JsLoad.request("http://www.sinaimg.cn/uc/myshow/blog/misc/gif/smileConfig.js?varname=smileConfig&" + (new Date()).getTime(), {
            onComplete: function(c) {
                b.faceConfig = c;
                b.initFaceData();
                if (a) {
                    a()
                }
            },
            charset: "gb2312"
        })
    },
    initFaceData: function() {
        var a, b = this;
        for (a in this.faceConfig) {
            this.addTab(a, this.faceConfig[a]["name"], this.faceConfig[a]["data"])
        }
    },
    onInitialized: function() {},
    textWatchOn: function() {
        var a = this.txtContentArea;
        var b = function() {
            if (a.createTextRange) {
                a.caretPos = document.selection.createRange().duplicate()
            }
        };
        Core.Events.addEvent(a, b, "keyup");
        Core.Events.addEvent(a, b, "focus");
        Core.Events.addEvent(a, b, "select");
        Core.Events.addEvent(a, b, "click")
    },
    addTab: function(b, d, a) {
        var f = this;
        var c = new Tab('<img src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + b + '.gif" height="20" width="20" align="absmiddle"><span><a href="#" onclick="return false;">' + d + "</a></span><em>(" + a.length + ")</em>", {
            isFocus: false,
            className: "cur"
        });
        c.addOnAbort(function() {
            c.content.style.display = "none"
        });
        c.addOnFocus(function() {
            if (!c.isShowed) {
                c.isShowed = true;
                c.content = $C("ul");
                c.content.innerHTML = f._getTabContent(b, a);
                f.dialogNodes.faceContent.appendChild(c.content)
            }
            c.content.style.display = ""
        });
        this.tabs.add(c)
    },
    _getTabContent: function(d, b) {
        var g = [],
        f;
        var c, a = b.length;
        for (c = 0; c < a; c++) {
            f = b[c]["name"];
            f = Core.String.byteLength(f) > 8 ? Core.String.leftB(f, 6) + "...": f;
            g.push("<li><a onclick=\"$insertFace('" + b[c]["code"] + "','" + b[c]["name"] + '\');return false;" href="#"><img style="width:50px;height:50px;" title="' + b[c]["name"] + '" src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + b[c]["code"] + 'T.gif"/></a><span>' + f + "</span></li>")
        }
        return g.join("")
    },
    insertFace: function(d, c) {
        this.insertImageFile = d + "T.gif";
        this.onInsert();
        if (!this.txtContentArea) {
            return
        }
        var a = "[emoticons=" + d + "]" + c + "[/emoticons]";
        if ($IE) {
            if (this.txtContentArea.createTextRange && this.txtContentArea.caretPos) {
                var b = this.txtContentArea.caretPos;
                b.text = b.text.charAt(b.text.length - 1) == " " ? a + " ": a;
                this.txtContentArea.focus()
            } else {
                this.txtContentArea.value += a;
                this.txtContentArea.focus()
            }
        } else {
            if (this.txtContentArea.setSelectionRange) {
                var i = this.txtContentArea.selectionStart;
                var g = this.txtContentArea.selectionEnd;
                var j = this.txtContentArea.value.substring(0, i);
                var f = this.txtContentArea.value.substring(g);
                this.txtContentArea.value = j + a + f
            } else {
                this.txtContentArea.value += a
            }
        }
        this.hidden();
        return false
    },
    onInsert: function() {},
    setPosition: function(a, b) {
        this.x = a;
        this.y = b;
        this.dialog.setPosition({
            x: a,
            y: b
        })
    },
    show: function() { ! this._isInitDialog && this.load();
        this.dialog.show();
        this.isShowed = true
    },
    hidden: function() {
        this.isShowed = false;
        this.dialog.hidden()
    }
};
function v6SendLog(b, a) {}
function v7sendLog(b, a, c) {
    Utils.Io.JsLoad.request("http://hits.sinajs.cn/A2/b.html?type=" + b + "&pageid=" + a + "&msg=" + c, {
        onComplete: function() {}
    })
}
Core.Dom.addHTML = function(a, b) {
    a.insertAdjacentHTML("BeforeEnd", b)
};
if (!$IE) {
    Core.Dom.addHTML = function(b, c) {
        var d = b.ownerDocument.createRange();
        d.setStartBefore(b);
        var a = d.createContextualFragment(c);
        b.appendChild(a)
    }
}
Core.Dom.contains = function(a, b) {
    return a.contains(b)
};
if (!$IE) {
    Core.Dom.contains = function(a, b) {
        do {
            if (a == b) {
                return true
            }
        } while ( b = b . parentNode );
        return false
    }
}
App.smilesTemplate = ['<table id="#{entity}" class="CP_w faceItemContent" style="visibility: visible;">', '<thead id="#{titleBar}"><tr><th class="tLeft"><span></span></th>', '<th class="tMid"><div class="bLyTop"><strong id="#{titleName}">插入表情</strong><cite><a id="#{btnClose}"', ' href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite></div></th>', '<th class="tRight"><span></span></th></tr></thead>', '<tfoot><tr><td class="tLeft"><span></span></td><td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td></tr></tfoot>', "<tbody><tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid" id="#{content}">', '<div class="insertface">', '<div class="insertface_top">', '<h3>热门动漫表情</h3><div class="insertface_search">', '<input id="#{searchText}" type="text" class="SG_input" value="输入关键字、动漫形象"', ' style="color:#9b9b9a;" maxlength="20" /><a id="#{searchBtn}" href="#" onclick="return false;" ', 'hidefocue="true" class="SG_aBtn SG_aBtnB"><cite>查找表情</cite></a></div>', '<div class="clearit"></div>', "</div>", '<div class="insertface_hot">', '<span class="insertface_keyword">热门关键字：<span id="#{hotKeyword}"></span></span>', '<span class="insertface_hotslider"></span>', "</div>", '<div class="bigface">', '<div class="faceSidebar">', '<div id="#{keyCtrl}" class="facekeyword" style="display:none;">', '<p><< <a id="#{keyCtrlBack}" href="#" onclick="return false;">返回全部关键字</a></p>', '<p>关键字：<span id="#{keyWord}"></span></p></div>', '<h3 id="#{allSort}" class="facetitle" style="font-weight:600;"><a href="#"', ' onclick="return false;">全部</a></h3>', '<div id="#{sortList}" class="facelist"></div>', '<div id="#{sortCtrl}" class="facearrow"></div>', "</div>", '<div class="faceShowAll">', '<div id="#{smileEmpty}" class="faceShownone" style="display:none;"><p>找不到和关键字相符的表情。', '<br /><br /><a id="#{smileEmptyBack}" href="#" onclick="return false;">&lt;&lt;返回首页</a></p></div>', '<ul class="faceShowAll_list" id="#{smileList}"></ul>', '<div class="SG_page"><ul class="SG_pages">', '<li id="#{smilePagePrev}" class="SG_s_pgprev"></li>', '<li id="#{smilePageShow}" class="SG_s_pgnum"></li>', '<li id="#{smilePageNext}" class="SG_s_pgnext"></li>', "</ul></div>", "</div>", "</div>", "</div>", '</td><td class="tRight"><span></span></td>', "</tr></tbody></table>"].join("");
App.smilesDialog2 = Core.Class.create();
App.smilesDialog2.prototype = {
    pageSize: 24,
    defaultConfig: {
        sortId: "0",
        htmlTpl: App.smilesTemplate,
        callback: function() {}
    },
    initialize: function(c) {
        this.option = c || {};
        for (var a in this.defaultConfig) {
            if (this.option[a] == null) {
                this.option[a] = this.defaultConfig[a]
            }
        }
        this.dialog = new Dialog(this.option.htmlTpl);
        this.dialog.setAreaLocked(true);
        this.dialogNodes = this.dialog.getNodes();
        this.getKeyWord();
        if (scope.smilesData != null) {
            this.data = scope.smilesData;
            this.dataSettle();
            this.eventListen()
        } else {
            var b = this;
            var d = Utils.Io.JsLoad.request([{
                url: "http://www.sinaimg.cn/uc/myshow/blog/misc/gif/smileConfig.js?varname=smileConfig&rnd=" + Math.random(),
                charset: "GBK"
            }], {
                onComplete: function(f) {
                    scope.smilesData = f;
                    b.data = f;
                    b.dataSettle();
                    b.eventListen()
                },
                onException: function() {}
            })
        }
        return this
    },
    dataSettle: function(g, b) {
        g = g || this.data;
        b = b || 9;
        this.tabsData = [];
        this.allData = [];
        for (var f in g) {
            var d = g[f];
            d.sortId = f;
            this.tabsData.push(d);
            for (var c = 0,
            a = d.data.length; c < a; c++) {
                d.data[c].sid = f;
                d.data[c].sname = d.name
            }
            this.allData = this.allData.concat(d.data)
        }
        if (this.allDataBack == null) {
            this.allDataBack = this.allData.slice(0)
        }
        this.showTab(1, b);
        if (this.dialogNodes.smileList.childNodes.length == 0) {
            this.showAll()
        }
    },
    children: function(b) {
        var c = [];
        for (var a = 0; b[a]; a++) {
            if (b[a].nodeType == 1) {
                c.push(b[a])
            }
        }
        return c
    },
    showTab: function(f, b) {
        f = f || 1;
        b = b || 9;
        this.dialogNodes.sortList.innerHTML = "";
        this.dialogNodes.smileList.innerHTML = "";
        Core.Dom.setStyle(this.dialogNodes.sortList, "height", b == 9 ? "279px": "217px");
        this.tabs = new Tabs(this.dialogNodes.sortList);
        this.tabsObject = {};
        var j = this;
        for (var g = 0; g < b; g++) {
            var n = (f - 1) * b;
            if (this.tabsData[n + g] == null) {
                break
            }
            var l = this.tabsData[n + g].sortId;
            var m = this.tabsData[n + g].name;
            var c = this.tabsData[n + g].data;
            var d = new Tab('<img src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + l + '.gif" height="20" width="20" align="absmiddle"><span><a href="#" onclick="return false;">' + m + "</a></span><em>(" + c.length + ")</em>", {
                isFocus: false,
                className: "cur"
            });
            d.addOnAbort(Core.Function.bind3(function(i) {},
            null, [d]));
            d.addOnFocus(Core.Function.bind3(function(q, p, s, i) {
                j.showSmile(s, 1, j.pageSize);
                j.currentTab = q;
                j.dialogNodes.allSort.style.fontWeight = 400;
                if (!j.isFromUp) {
                    var o = scope.$pageid;
                    if (o) {
                        var r = scope.isFromtheCommonhzh;
                        if (r) {
                            v7sendLog($_GLOBAL.faceChooseTable[o][r] + "_16_020_" + i, o, "")
                        }
                    }
                }
                j.isFromUp = null
            },
            null, [d, n + g, c, l]));
            this.tabsObject[l] = d;
            this.tabs.add(d)
        }
        var a = Math.ceil(this.tabsData.length / b);
        if (a > 0) {
            this.showTabPage(f || 1, a, b)
        } else {
            this.dialogNodes.sortCtrl.innerHTML = ""
        }
    },
    showSmile: function(b, f, a) {
        var n = this;
        a = a || this.pageSize;
        var p = this;
        var c = b;
        var q = c.length;
        var r = Math.ceil(q / a);
        var s = document.createDocumentFragment();
        var j;
        this.dialogNodes.smileList.innerHTML = "";
        for (var d = 0; d < a; d++) {
            var m = c[(f - 1) * a + d];
            if (m == null) {
                break
            }
            var g = $C("li");
            var o = $C("a");
            o.href = "#";
            o.onclick = function() {
                return false
            };
            o.onmousedown = Core.Function.bind3(function(i, t) {
                p.hide();
                p.option.callback(i, t)
            },
            null, [m.code, m.name]);
            o.innerHTML = '<img style="width:50px;height:50px;" src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + m.code + 'T.gif" alt="' + m.name + '" title="' + m.name + '" />';
            g.appendChild(o);
            o.setAttribute("key", m.code);
            var l = $C("span");
            l.title = m.name;
            l.innerHTML = Core.String.byteLength(m.name) > 8 ? Core.String.leftB(m.name, 6) + "…": m.name;
            g.appendChild(l);
            s.appendChild(g);
            Core.Events.addEvent(o, (function(i) {
                return function() {
                    var t = scope.$pageid;
                    if (t) {
                        var u = scope.isFromtheCommonhzh;
                        if (u) {
                            v7sendLog($_GLOBAL.faceChooseTable[t][u] + "_16_010_" + i.getAttribute("key"), t, "")
                        }
                    }
                }
            })(o), "mousedown")
        }
        this.dialogNodes.smileList.appendChild(s);
        if (q > a) {
            if (f == 1) {
                this.dialogNodes.smilePagePrev.innerHTML = "上一页"
            } else {
                this.dialogNodes.smilePagePrev.innerHTML = "";
                j = $C("a");
                j.href = "#";
                j.onclick = function() {
                    return false
                };
                j.onmousedown = function() {
                    p.showSmile(c, f - 1, a)
                };
                j.innerHTML = "上一页";
                this.dialogNodes.smilePagePrev.appendChild(j)
            }
            this.dialogNodes.smilePageShow.innerHTML = f + "/" + r;
            if (f >= r) {
                this.dialogNodes.smilePageNext.innerHTML = "下一页"
            } else {
                this.dialogNodes.smilePageNext.innerHTML = "";
                j = $C("a");
                j.href = "#";
                j.onclick = function() {
                    return false
                };
                j.onmouseup = function() {
                    p.showSmile(c, f + 1, a)
                };
                j.innerHTML = "下一页";
                this.dialogNodes.smilePageNext.appendChild(j)
            }
        } else {
            this.dialogNodes.smilePagePrev.innerHTML = "";
            this.dialogNodes.smilePageShow.innerHTML = "";
            this.dialogNodes.smilePageNext.innerHTML = ""
        }
    },
    showTabPage: function(d, c, f) {
        this.dialogNodes.sortCtrl.innerHTML = "";
        this.dialogNodes.smilePagePrev.innerHTML = "";
        this.dialogNodes.smilePageShow.innerHTML = "";
        this.dialogNodes.smilePageNext.innerHTML = "";
        var b = this;
        var a;
        if (d == 1) {
            if (d != c) {
                this.dialogNodes.sortCtrl.innerHTML = '<a href="#" onclick="return false;" title="向上" class="up_off"></a>';
                a = $C("a");
                a.href = "#";
                a.onclick = function() {
                    return false
                };
                a.title = "向下";
                a.className = "down";
                a.onmousedown = function() {
                    b.showTab(d + 1, f);
                    b.showAll()
                };
                this.dialogNodes.sortCtrl.appendChild(a)
            } else {}
        } else {
            if (d < c) {
                a = $C("a");
                a.href = "#";
                a.onclick = function() {
                    return false
                };
                a.title = "向上";
                a.className = "up";
                a.onmousedown = function() {
                    b.showTab(d - 1, f);
                    b.showAll()
                };
                this.dialogNodes.sortCtrl.appendChild(a);
                a = $C("a");
                a.href = "#";
                a.onclick = function() {
                    return false
                };
                a.title = "向下";
                a.className = "down";
                a.onmousedown = function() {
                    b.showTab(d + 1, f);
                    b.showAll()
                };
                this.dialogNodes.sortCtrl.appendChild(a)
            } else {
                a = $C("a");
                a.href = "#";
                a.onclick = function() {
                    return false
                };
                a.title = "向上";
                a.className = "up";
                a.onmousedown = function() {
                    b.showTab(d - 1, f);
                    b.showAll()
                };
                this.dialogNodes.sortCtrl.appendChild(a);
                Core.Dom.addHTML(this.dialogNodes.sortCtrl, '<a href="#" onclick="return false;" title="向下" class="down_off"></a>')
            }
        }
    },
    eventListen: function() {
        var d = this;
        var c = d.dialogNodes.searchText;
        var i = d.dialogNodes.searchBtn;
        var f = d.dialogNodes.keyCtrlBack;
        var a = d.dialogNodes.allSort;
        var b = d.dialogNodes.smileEmptyBack;
        Core.Events.addEvent(document.body,
        function(l) {
            var j = Core.Events.getEvent(),
            m = ($IE) ? j.srcElement: j.target;
            if (d.dialogNodes.entity != null && (Core.Dom.contains(d.dialogNodes.entity, m) == false || l == true)) {
                d.hide()
            }
        });
        Core.Events.addEvent(this.dialogNodes.btnClose,
        function() {
            d.hide()
        });
        Core.Events.addEvent(c,
        function() {
            if (Core.String.trim(c.value) == "输入关键字、动漫形象") {
                c.value = "";
                c.style.color = "#000"
            }
            c.select()
        },
        "focus");
        Core.Events.addEvent(c,
        function() {
            if (Core.String.trim(c.value) == "") {
                c.value = "输入关键字、动漫形象";
                c.style.color = "#9b9b9a"
            }
        },
        "blur");
        Core.Events.addEvent(c,
        function(m) {
            var j = Core.Events.getEvent();
            var l = j.which || j.keyCode;
            var n = Core.String.trim(c.value);
            if (l == 13 && n != "") {
                d.searchKey(n)
            }
        },
        "keydown");
        Utils.Form.limitMaxLen(c, 20);
        Core.Events.addEvent(i,
        function() {
            if (c.value == "输入关键字、动漫形象" || c.value == "") {} else {
                d.searchKey(c.value);
                c.focus()
            }
        });
        var g = function() {
            d.dataSettle(d.data, 9);
            d.dialogNodes.keyCtrl.style.display = "none";
            d.dialogNodes.smileEmpty.style.display = "none";
            d.dialogNodes.smileList.style.display = "";
            d.dialogNodes.searchText.value = "输入关键字、动漫形象";
            d.dialogNodes.searchText.style.color = "#9b9b9a"
        };
        Core.Events.addEvent(f, g);
        Core.Events.addEvent(b, g);
        Core.Events.addEvent(a,
        function() {
            d.showAll()
        })
    },
    showAll: function() {
        this.showSmile(this.allData, 1, this.pageSize);
        this.dialogNodes.allSort.style.fontWeight = 600;
        if (this.currentTab != null) {
            this.currentTab.setAbort()
        }
    },
    setSort: function(a, b) {
        this.isFromUp = a;
        this.option.sortId = a;
        this.option.callback = b;
        if (a == 0) {
            this.dialogNodes.allSort.style.fontWeight = 600;
            this.dataSettle()
        } else {
            this.dataSettle();
            this.tabs.swapTags(this.tabsObject[a])
        }
    },
    getKeyWord: function() {
        if (this.keywordData != null) {
            return
        }
        var a = this;
        var b = Utils.Io.JsLoad.request("http://www.sinaimg.cn/uc/myshow/blog/misc/gif/smileKeywordConfig.js?varname=smileKeywordConfig&rnd=" + Math.random(), {
            onComplete: function(n) {
                a.keywordData = n;
                var l = n.E___00000000000 || "顶|路过|哭|啦啦|美女";
                var m = document.createDocumentFragment();
                l = l.split("|");
                for (var j = 0,
                d = l.length; j < d; j++) {
                    var g = $C("a");
                    g.href = "#";
                    g.onclick = function() {
                        return false
                    };
                    g.onmousedown = Core.Function.bind3(function(i) {
                        a.searchKey(i)
                    },
                    null, [l[j]]);
                    g.innerHTML = l[j];
                    m.appendChild(g)
                }
                if (a.dialogNodes.hotKeyword.innerHTML == "") {
                    a.dialogNodes.hotKeyword.appendChild(m)
                }
                var c = "";
                for (var f in n) {
                    if (f != "E___00000000000") {
                        c += "∑" + f + "§" + n[f]
                    }
                }
                a.keywordStr = c
            },
            onException: function() {}
        })
    },
    searchKey: function(f) {
        var d = f.replace(/([\\^$*+?{}.|])/gi, "\\$1");
        var m = new RegExp("∑([^§]+)§[^∑]*" + d + "[^∑]*", "gi");
        var b = [];
        this.keywordStr.replace(m,
        function(p, i) {
            b.push(i)
        });
        b = b.join(",");
        var l = {};
        var a = this.allDataBack;
        var o = a.length;
        var n = 0;
        for (var g = 0; g < o; g++) {
            if (b.indexOf(a[g].code) != -1 || a[g].sname.indexOf(f) != -1 || a[g].name.indexOf(f) != -1) {
                if (l[a[g].sid] == null) {
                    l[a[g].sid] = {
                        name: a[g].sname,
                        data: []
                    }
                }
                l[a[g].sid].data.push(a[g]);
                n++
            }
        }
        var j = scope.$pageid;
        if (n == 0) {
            this.dialogNodes.smileEmpty.style.display = "";
            this.dialogNodes.smileList.style.display = "none";
            if (j) {
                var c = scope.isFromtheCommonhzh;
                if (c) {
                    v7sendLog($_GLOBAL.faceChooseTable[j][c] + "_16_030_" + encodeURIComponent(f), j, "")
                }
            }
        } else {
            this.dialogNodes.smileList.style.display = "";
            this.dialogNodes.smileEmpty.style.display = "none";
            if (j) {
                var c = scope.isFromtheCommonhzh;
                if (c) {
                    v7sendLog($_GLOBAL.faceChooseTable[j][c] + "_16_031_" + encodeURIComponent(f), j, "")
                }
            }
        }
        this.dataSettle(l, 7);
        this.dialogNodes.keyCtrl.style.display = "";
        this.dialogNodes.keyWord.innerHTML = f.split("").join("<wbr/>");
        Core.Dom.setStyle(this.dialogNodes.sortList, "height", "217px")
    },
    setPosition: function(a, b) {
        this.x = a;
        this.y = b;
        this.dialog.setPosition({
            x: a,
            y: b
        })
    },
    show: function() {
        this.dialogNodes.searchText.value = "输入关键字、动漫形象";
        this.dialogNodes.searchText.style.color = "#9b9b9a";
        this.dialog.show()
    },
    hide: function() {
        this.dialog.hidden();
        this.dialogNodes.keyCtrl.style.display = "none"
    }
};
App.insertSmilesForm2 = Core.Class.create();
App.insertSmilesForm2.prototype = {
    defalutConfig: {
        sortCount: 6,
        clickCallback: function() {},
        recommCount: 8
    },
    initialize: function(b) {
        this.option = b || {};
        if (this.option.sortNode == null) {
            return
        }
        for (var a in this.defalutConfig) {
            if (this.option[a] == null) {
                this.option[a] = this.defalutConfig[a]
            }
        }
        if (scope.smilesData == null) {
            this.getSmilesData()
        } else {
            this.data = scope.smilesData;
            this.renderUI()
        }
    },
    getSmilesData: function() {
        var a = this;
        var b = Utils.Io.JsLoad.request([{
            url: "http://www.sinaimg.cn/uc/myshow/blog/misc/gif/smileConfig.js?varname=smileConfig&rnd=" + Math.random(),
            charset: "GBK"
        }], {
            onComplete: function(c) {
                scope.smilesData = c;
                a.data = c;
                a.renderUI()
            },
            onException: function() {}
        })
    },
    renderUI: function() {
        var p = this;
        var m = 1;
        var j = [];
        var c = [];
        var a;
        var d = document.createDocumentFragment();
        var n = $C("div");
        var f = $C("span");
        var t = $C("div");
        n.className = "facestyle";
        for (var s in this.data) {
            if (m == 1) {
                a = this.data[s] || {
                    data: {}
                };
                a = a.data
            }
            if (m <= this.option.sortCount) {
                var u = this.data[s].name;
                var b = $C("a");
                b.href = "#";
                b.setAttribute("key", s);
                b.onclick = function() {
                    Core.Events.stopEvent();
                    return false
                };
                b.onmousedown = Core.Function.bind3(function(i) {
                    App.insertSmilesDialog2(i, p.option.clickCallback, p.option.positionNode, p.option.arrPosPix)
                },
                null, [s]);
                b.hideFocus = true;
                b.innerHTML = '<img src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + s + '-25.gif" alt="' + u + '" title="' + u + '" />';
                n.appendChild(b);
                m++
            } else {
                break
            }
        }
        var o = new Date().getTime();
        n.id = "recomm_" + o;
        d.appendChild(n);
        f.className = "SG_more";
        var l = $C("a");
        l.href = "#";
        l.onclick = function() {
            Core.Events.stopEvent();
            return false
        };
        l.onmousedown = (function(i) {
            return function() {
                App.insertSmilesDialog2(0, p.option.clickCallback, p.option.positionNode, p.option.arrPosPix);
                var v = scope.$pageid;
                if (v) {
                    var y = i.parentNode.parentNode.id.split("_")[0];
                    if (y) {
                        scope.isFromtheCommonhzh = $_GLOBAL.faceCountMoreLinkTable[v][y][1];
                        v7sendLog($_GLOBAL.faceCountMoreLinkTable[v][y][0] + "_07_000_000", v, "")
                    }
                }
            }
        })(l);
        l.innerHTML = "更多>>";
        f.appendChild(l);
        d.appendChild(f);
        t.className = "clearit";
        d.appendChild(t);
        $E(this.option.sortNode).appendChild(d);
        if ($E(this.option.recommNode) != null) {
            d = document.createDocumentFragment();
            for (var g = 0; g < this.option.recommCount; g++) {
                u = a[g].name;
                var r = a[g].code;
                b = $C("a");
                b.href = "#"; (function(i) {
                    b.onclick = Core.Function.bind3(function(y, z) {
                        p.option.clickCallback(y, z);
                        var v = scope.$pageid;
                        if (v) {
                            i += "";
                            i = i.length == 1 ? "0" + i: i;
                            v7sendLog($_GLOBAL.faceCountRecommLinkTable[v] + "_" + i + "_010_" + y, v, "")
                        }
                        Core.Events.stopEvent();
                        return false
                    },
                    null, [r, u])
                })(g + 8);
                b.hideFocus = true;
                b.innerHTML = '<img src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + r + 'T.gif" alt="' + u + '" title="' + u + '" />';
                d.appendChild(b)
            }
            $E(this.option.recommNode).appendChild(d)
        }
        var q = Lib.children($E("recomm_" + o).childNodes);
        for (var g = 0; q[g]; g++) {
            Core.Events.addEvent(q[g], (function(i, v) {
                return function() {
                    var y = scope.$pageid;
                    if (y) {
                        var z = i.parentNode.parentNode.id.split("_")[0];
                        if (z) {
                            scope.isFromtheCommonhzh = $_GLOBAL.faceCountMoreLinkTable[y][z][1];
                            v7sendLog($_GLOBAL.faceCountMoreLinkTable[y][z][0] + "_0" + v + "_020_" + i.getAttribute("key"), y, "")
                        }
                    }
                }
            })(q[g], (g + 1)), "mousedown")
        }
        m = j = c = a = d = n = f = l = t = r = s = u = b = null
    }
};
Lib.children = function(b) {
    var c = [];
    for (var a = 0; b[a]; a++) {
        if (b[a].nodeType == 1) {
            c.push(b[a])
        }
    }
    return c
};
App.insertSmilesDialog2 = function(d, g, c, b) {
    App.insertSmilesDialog2.callback = g;
    if (scope.smileDialog == null) {
        scope.smileDialog = new App.smilesDialog2()
    }
    scope.smileDialog.setSort(d, g);
    var f = Core.Dom.getXY($E(c));
    var a = f[0] + b[0];
    var i = f[1] + b[1];
    scope.smileDialog.setPosition(a, i);
    scope.smileDialog.show()
};
App.formInsertSmile2 = function(d, l, b, g, j, m, c, i) {
    var a = $E(d);
    var f = function() {
        if (a.createTextRange) {
            a.caretPos = document.selection.createRange().duplicate()
        }
    };
    if (!scope.commEditor) {
        scope.commEditor = new commEditor()
    }
    scope.commEditor.append(c, d, i);
    Core.Events.addEvent(a, f, "keyup");
    Core.Events.addEvent(a, f, "focus");
    Core.Events.addEvent(a, f, "select");
    Core.Events.addEvent(a, f, "click");
    new App.insertSmilesForm2({
        sortNode: l,
        clickCallback: function(n, o) {
            setTimeout(function() {
                scope.commEditor.insertHTML(c, '<img src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + n + 'T.gif" alt="' + o + '" title="' + o + '" />')
            },
            20);
            if (g) {
                g()
            }
        },
        recommNode: b,
        positionNode: j || l,
        arrPosPix: m || [0, 0]
    })
};
var commEditor = function(b, a) {
    this.fids = [];
    this.areas = {};
    this.wins = {};
    this.docs = {};
    this.intervals = {};
    this.actions = {}
};
commEditor.prototype = {
    init: function(a) {
        var c = this.docs[a];
        try {
            c.body.designMode = "on"
        } catch(b) {}
        c.open();
        c.writeln(this.getEditorHTML(""));
        c.body.contentEditable = true;
        c.close()
    },
    lazyInit: function(a) {
        var b = this;
        return function() {
            var c = b.docs[a];
            if (c.body.getAttribute("inited")) {
                return
            }
            trace("执行一次:" + a);
            b.init(a);
            b.bindListener(a);
            c.body.setAttribute("inited", "yes")
        }
    },
    append: function(b, a, g) {
        g = g || {};
        if (!g.interval) {
            g.interval = {}
        }
        if (!g.interval.before) {
            g.interval.before = function() {}
        }
        if (!g.interval.after) {
            g.interval.after = function() {}
        }
        var f = $E(b);
        this.wins[b] = f.contentWindow;
        this.actions[b] = g;
        var c = this;
        function d() {
            try {
                c.docs[b] = f.contentWindow.document;
                c.areas[b] = $E(a);
                if ($IE) {
                    c.docs[b].body.onclick = c.lazyInit(b)
                } else { (c.lazyInit(b))()
                }
            } catch(i) {
                setTimeout(d, 150)
            }
        }
        d()
    },
    frameFilter: function(a) {
        var c = false;
        var b = a.innerHTML;
        b = b.replace(/<script[\s\S]*<\/script>/ig, "");
        b = b.replace(/<style[\s\S]*<\/style>/ig, "");
        b = b.replace(/<!-{2,}[\s\S]*?-{2,}>/g, "");
        b = b.replace(/<([^>]+).*?>/ig,
        function(f, g) {
            var d = g.split(" ")[0].toLowerCase();
            switch (d) {
            case "/p":
                return "<br>";
            case "br":
                return f;
            case "img":
                if (f.toLowerCase().indexOf("http://www.sinaimg.cn/uc/myshow/blog") > 0) {
                    if (f.toLowerCase().indexOf("t.gif") == -1) {
                        return ""
                    }
                    return f
                } else {
                    return ""
                }
            default:
                return ""
            }
        });
        b = b.replace(/\n/g, "");
        a.innerHTML = b
    },
    bindListener: function(a) {
        var g = this.docs[a];
        var d = this.areas[a];
        var f = this.wins[a];
        var i = this.actions[a];
        var c = this;
        if ($IE) {
            g.onkeydown = function() {
                var j = f.event;
                if (j.keyCode == 8) {
                    var l = c.getFocusElement(a);
                    if (l && l.tagName.toUpperCase() == "IMG") {
                        l.parentNode.removeChild(l);
                        j.keyCode = 0;
                        j.returnValue = false
                    }
                }
            }
        }
        Core.Events.addEvent(g.body, (function(j) {
            return function(l) {
                c.intervals[a] = setInterval(function() {
                    i.interval.before(a, d);
                    c.clearFrameHTML(j);
                    var n = j.getElementsByTagName("img");
                    for (var m = 0; n[m]; m++) {
                        n[m].removeAttribute("style");
                        n[m].removeAttribute("height");
                        n[m].removeAttribute("width")
                    }
                    i.interval.after(a, d)
                },
                400)
            }
        })(g.body), "focus");
        Core.Events.addEvent(g.body, (function(j) {
            return function(l) {
                clearInterval(c.intervals[a])
            }
        })(g.body), "blur");
        if (i.normal) {
            for (var b in i.normal) {
                Core.Events.addEvent(g.body, i.normal[b], b)
            }
        }
    },
    clearFrameHTML: function(j) {
        var f = this;
        var b = ["a", "input"];
        var a = false;
        for (var d = 0; b[d]; d++) {
            if (j.getElementsByTagName(b[d]).length > 0) {
                a = true;
                break
            }
        }
        if (a) {
            f.frameFilter(j)
        } else {
            var l = j.getElementsByTagName("img");
            for (var d = 0; l[d]; d++) {
                var c = l[d].src.indexOf("http://www.sinaimg.cn/uc/myshow/blog");
                var g = l[d].src.toLowerCase().indexOf("t.g");
                if (c == -1 || g == -1) {
                    f.frameFilter(j);
                    break
                }
            }
        }
    },
    getFocusElement: function(c) {
        if ($MOZ) {
            var a = this.win.getSelection();
            var b = a.getRangeAt(0);
            var d = b.commonAncestorContainer;
            if (d.tagName) {
                if (d.tagName.toLowerCase() == "body") {
                    return d
                }
            }
            if (!b.collapsed) {
                if (b.startContainer == b.endContainer || (1 && b.startContainer == b.endContainer.parentNode)) {
                    if (b.startOffset - b.endOffset < 2 || 1) {
                        if (b.startContainer.hasChildNodes()) {
                            return b.startContainer.childNodes[b.startOffset]
                        }
                    }
                }
                return d.parentNode
            } else {
                return d.parentNode
            }
        } else {
            var b = this.docs[c].selection.createRange();
            return b.item ? b.item(0) : b.parentElement()
        }
    },
    clearHTML: function(a) {
        var b = this.docs[a];
        b.body.innerHTML = ""
    },
    insertHTML: function(b, i) {
        if ($IE) { (this.lazyInit(b))()
        }
        var g = this.wins[b];
        var f = this.docs[b];
        if ($IE) {
            try {
                g.focus();
                var c = f.selection.createRange();
                if (f.selection.type.toLowerCase() == "control") {
                    var a = f.body.createTextRange();
                    a.moveToElementText(c.item(0));
                    c = a
                }
                c.pasteHTML(i);
                c.collapse(false);
                c.select()
            } catch(d) {}
        } else {
            if (($CHROME || $SAFARI) && (encodeURIComponent(f.body.innerHTML) == "%0A" || f.body.innerHTML == "")) {
                f.body.focus()
            }
            this.execCommand("insertHTML", i, b);
            if (!$CHROME && !$SAFARI) {
                f.body.focus()
            }
        }
    },
    execCommand: function(c, b, a) {
        var f = this.wins[a];
        var d = this.docs[a];
        f.focus();
        d.execCommand(c, "", b);
        f.focus()
    },
    handleChange: function(b) {
        var a = this.docs[b].body;
        this.areas[b].value = this.getHandledStr(a)
    },
    getHandledStr: function(a) {
        var c = [];
        if (a.hasChildNodes()) {
            a = a.childNodes;
            for (var b = 0; a[b]; b++) {
                c.push(this.handleDom(a[b]))
            }
        } else {
            c.push(this.handleDom(a))
        }
        return c.join("").replace(/\u00A0/ig, " ")
    },
    handleDom: function(d) {
        if (d.nodeType == 3) {
            var g = d.nodeValue;
            if (!Core.String.trim(g)) {
                return ""
            }
            return this.reEscapeHTML(g)
        } else {
            if (d.nodeType == 1) {
                if (d.hasChildNodes() && ((d.childNodes.length != 1) || (d.childNodes.length == 1 && d.childNodes[0].tagName))) {
                    var c = [];
                    if (d.tagName) {
                        var j = d.tagName.toUpperCase();
                        if (j == "DIV" || j == "P") {
                            c.push("\n")
                        }
                    }
                    d = d.childNodes;
                    for (var b = 0; d[b]; b++) {
                        c.push(this.handleDom(d[b]))
                    }
                    return c.join("")
                } else {
                    var j = d.tagName.toUpperCase();
                    if (j == "IMG") {
                        if (d.src.indexOf("http://www.sinaimg.cn/uc/myshow/blog") != -1) {
                            if (d.src.indexOf("T.g") == -1) {
                                return ""
                            }
                            var a = d.src.split("T.g")[0];
                            a = a.substring(a.lastIndexOf("/") + 1, a.length);
                            var f = d.getAttribute("title");
                            if (f) {
                                return "[emoticons=" + a + "]" + f + "[/emoticons]"
                            }
                        } else {
                            return ""
                        }
                    } else {
                        if (j == "BR") {
                            return "\n"
                        } else {
                            if (j == "DIV" || j == "P") {
                                var g = d.innerHTML || "";
                                return "\n" + this.reEscapeHTML(g)
                            } else {
                                if (j == "SCRIPT" || j == "STYLE") {
                                    return ""
                                } else {
                                    g = d.innerHTML || d.value || "";
                                    return this.reEscapeHTML(g)
                                }
                            }
                        }
                    }
                }
            }
        }
        return ""
    },
    reEscapeHTML: function(a) {
        a = a.replace(/\n/g, "");
        a = a.replace(/&nbsp;/g, " ");
        a = a.replace(/&quot;/g, '"');
        a = a.replace(/&lt;/g, "<");
        a = a.replace(/&gt;/g, ">");
        a = a.replace(/&amp;/g, "&");
        return a
    },
    getEditorHTML: function(b) {
        var a = "";
        a += "<html>";
        a += "<head>";
        a += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
        a += "<style>		p {			*margin:0.2em auto;		}		body {			margin: 0;			scrollbar-face-color: #ffffff;			scrollbar-highlight-color: #ffffff;			scrollbar-shadow-color: #c0c1bb;			scrollbar-3dlight-color: #c0c1bb;			scrollbar-arrow-color: #c9cbb6;			scrollbar-track-color: #f4f5f0;			scrollbar-darkshadow-color: #ffffff;			scrollbar-base-color: #ffffff;			padding: 10px;			word-wrap: break-word;			overflow: scroll;			overflow-x: auto;			height: 90%;			font-size: 14px;		}		body, td, textarea, input, br, div, span{			font-family: '', Verdana,Arial, Helvetica, sans-serif;			line-height:1.5;		}		img{			border: 0;		}		html{			height: 100%;			cursor: text;		}		pre{			white-space:normal;		}		form{margin: 0;}		body table{font-size: 14px;}		.border{ border:1px dashed #cfcfcf;}		</style>		<script>document.domain='sina.com.cn';<\/script>		";
        a += "</head>";
        a += "<body>";
        a += b;
        a += "</body>";
        a += "</html>";
        return a
    }
};
App.smilesTemplate = ['<table id="#{entity}" class="CP_w faceItemContent" style="visibility: visible;">', '<thead id="#{titleBar}"><tr><th class="tLeft"><span></span></th>', '<th class="tMid"><div class="bLyTop"><strong id="#{titleName}">插入表情</strong><cite><a id="#{btnClose}"', ' href="#" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite></div></th>', '<th class="tRight"><span></span></th></tr></thead>', '<tfoot><tr><td class="tLeft"><span></span></td><td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td></tr></tfoot>', "<tbody><tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid" id="#{content}">', '<div class="insertface">', '<div class="insertface_top">', '<h3>热门动漫表情</h3><div class="insertface_search">', '<input id="#{searchText}" type="text" class="SG_input" value="输入关键字、动漫形象"', ' style="color:#9b9b9a;" maxlength="20" /><a id="#{searchBtn}" href="#" onclick="return false;" ', 'hidefocue="true" class="SG_aBtn SG_aBtnB"><cite>查找表情</cite></a></div>', '<div class="clearit"></div>', "</div>", '<div class="insertface_hot">', '<span class="insertface_keyword">热门关键字：<span id="#{hotKeyword}"></span></span>', '<span class="insertface_hotslider"></span>', "</div>", '<div class="bigface">', '<div class="faceSidebar">', '<div id="#{keyCtrl}" class="facekeyword" style="display:none;">', '<p><< <a id="#{keyCtrlBack}" href="#" onclick="return false;">返回全部关键字</a></p>', '<p>关键字：<span id="#{keyWord}"></span></p></div>', '<h3 id="#{allSort}" class="facetitle" style="font-weight:600;"><a href="#"', ' onclick="return false;">全部</a></h3>', '<div id="#{sortList}" class="facelist"></div>', '<div id="#{sortCtrl}" class="facearrow"></div>', "</div>", '<div class="faceShowAll">', '<div id="#{smileEmpty}" class="faceShownone" style="display:none;"><p>找不到和关键字相符的表情。', '<br /><br /><a id="#{smileEmptyBack}" href="#" onclick="return false;">&lt;&lt;返回首页</a></p></div>', '<ul class="faceShowAll_list" id="#{smileList}"></ul>', '<div class="SG_page"><ul class="SG_pages">', '<li id="#{smilePagePrev}" class="SG_s_pgprev"></li>', '<li id="#{smilePageShow}" class="SG_s_pgnum"></li>', '<li id="#{smilePageNext}" class="SG_s_pgnext"></li>', "</ul></div>", "</div>", "</div>", "</div>", '</td><td class="tRight"><span></span></td>', "</tr></tbody></table>"].join("");
App.smilesDialog = Core.Class.create();
App.smilesDialog.prototype = {
    pageSize: 24,
    defaultConfig: {
        sortId: "0",
        htmlTpl: App.smilesTemplate,
        callback: function() {}
    },
    initialize: function(c) {
        this.option = c || {};
        for (var a in this.defaultConfig) {
            if (this.option[a] == null) {
                this.option[a] = this.defaultConfig[a]
            }
        }
        this.dialog = new Dialog(this.option.htmlTpl);
        this.dialogNodes = this.dialog.getNodes();
        this.getKeyWord();
        if (scope.smilesData != null) {
            this.data = scope.smilesData;
            this.dataSettle();
            this.eventListen()
        } else {
            var b = this;
            var d = Utils.Io.JsLoad.request([{
                url: "http://www.sinaimg.cn/uc/myshow/blog/misc/gif/smileConfig.js?varname=smileConfig&rnd=" + Math.random(),
                charset: "GBK"
            }], {
                onComplete: function(f) {
                    scope.smilesData = f;
                    b.data = f;
                    b.dataSettle();
                    b.eventListen()
                },
                onException: function() {}
            })
        }
        return this
    },
    dataSettle: function(g, b) {
        g = g || this.data;
        b = b || 9;
        this.tabsData = [];
        this.allData = [];
        for (var f in g) {
            var d = g[f];
            d.sortId = f;
            this.tabsData.push(d);
            for (var c = 0,
            a = d.data.length; c < a; c++) {
                d.data[c].sid = f;
                d.data[c].sname = d.name
            }
            this.allData = this.allData.concat(d.data)
        }
        if (this.allDataBack == null) {
            this.allDataBack = this.allData.slice(0)
        }
        this.showTab(1, b);
        if (this.dialogNodes.smileList.childNodes.length == 0) {
            this.showAll()
        }
    },
    children: function(b) {
        var c = [];
        for (var a = 0; b[a]; a++) {
            if (b[a].nodeType == 1) {
                c.push(b[a])
            }
        }
        return c
    },
    showTab: function(f, b) {
        f = f || 1;
        b = b || 9;
        this.dialogNodes.sortList.innerHTML = "";
        this.dialogNodes.smileList.innerHTML = "";
        Core.Dom.setStyle(this.dialogNodes.sortList, "height", b == 9 ? "279px": "217px");
        this.tabs = new Tabs(this.dialogNodes.sortList);
        this.tabsObject = {};
        var j = this;
        for (var g = 0; g < b; g++) {
            var n = (f - 1) * b;
            if (this.tabsData[n + g] == null) {
                break
            }
            var l = this.tabsData[n + g].sortId;
            var m = this.tabsData[n + g].name;
            var c = this.tabsData[n + g].data;
            var d = new Tab('<img src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + l + '.gif" height="20" width="20" align="absmiddle"><span><a href="#" onclick="return false;">' + m + "</a></span><em>(" + c.length + ")</em>", {
                isFocus: false,
                className: "cur"
            });
            d.addOnAbort(Core.Function.bind3(function(i) {},
            null, [d]));
            d.addOnFocus(Core.Function.bind3(function(q, p, s, i) {
                j.showSmile(s, 1, j.pageSize);
                j.currentTab = q;
                j.dialogNodes.allSort.style.fontWeight = 400;
                if (!j.isFromUp) {
                    var o = scope.$pageid;
                    if (o) {
                        var r = scope.isFromtheCommonhzh;
                        if (r) {
                            v7sendLog($_GLOBAL.faceChooseTable[o][r] + "_16_020_" + i, o, "")
                        }
                    }
                }
                j.isFromUp = null
            },
            null, [d, n + g, c, l]));
            this.tabsObject[l] = d;
            this.tabs.add(d)
        }
        var a = Math.ceil(this.tabsData.length / b);
        if (a > 0) {
            this.showTabPage(f || 1, a, b)
        } else {
            this.dialogNodes.sortCtrl.innerHTML = ""
        }
    },
    showSmile: function(b, f, a) {
        var n = this;
        a = a || this.pageSize;
        var p = this;
        var c = b;
        var q = c.length;
        var r = Math.ceil(q / a);
        var s = document.createDocumentFragment();
        var j;
        this.dialogNodes.smileList.innerHTML = "";
        for (var d = 0; d < a; d++) {
            var m = c[(f - 1) * a + d];
            if (m == null) {
                break
            }
            var g = $C("li");
            var o = $C("a");
            o.href = "#";
            o.onclick = function() {
                return false
            };
            o.onmousedown = Core.Function.bind3(function(i, t) {
                p.option.callback(i, t);
                p.hide()
            },
            null, [m.code, m.name]);
            o.innerHTML = '<img style="width:50px;height:50px;" src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + m.code + 'T.gif" alt="' + m.name + '" title="' + m.name + '" />';
            g.appendChild(o);
            o.setAttribute("key", m.code);
            var l = $C("span");
            l.title = m.name;
            l.innerHTML = Core.String.byteLength(m.name) > 8 ? Core.String.leftB(m.name, 6) + "…": m.name;
            g.appendChild(l);
            s.appendChild(g);
            Core.Events.addEvent(o, (function(i) {
                return function() {
                    var t = scope.$pageid;
                    if (t) {
                        var u = scope.isFromtheCommonhzh;
                        if (u) {
                            v7sendLog($_GLOBAL.faceChooseTable[t][u] + "_16_010_" + i.getAttribute("key"), t, "")
                        }
                    }
                }
            })(o), "mousedown")
        }
        this.dialogNodes.smileList.appendChild(s);
        if (q > a) {
            if (f == 1) {
                this.dialogNodes.smilePagePrev.innerHTML = "上一页"
            } else {
                this.dialogNodes.smilePagePrev.innerHTML = "";
                j = $C("a");
                j.href = "#";
                j.onclick = function() {
                    return false
                };
                j.onmousedown = function() {
                    p.showSmile(c, f - 1, a)
                };
                j.innerHTML = "上一页";
                this.dialogNodes.smilePagePrev.appendChild(j)
            }
            this.dialogNodes.smilePageShow.innerHTML = f + "/" + r;
            if (f >= r) {
                this.dialogNodes.smilePageNext.innerHTML = "下一页"
            } else {
                this.dialogNodes.smilePageNext.innerHTML = "";
                j = $C("a");
                j.href = "#";
                j.onclick = function() {
                    return false
                };
                j.onmouseup = function() {
                    p.showSmile(c, f + 1, a)
                };
                j.innerHTML = "下一页";
                this.dialogNodes.smilePageNext.appendChild(j)
            }
        } else {
            this.dialogNodes.smilePagePrev.innerHTML = "";
            this.dialogNodes.smilePageShow.innerHTML = "";
            this.dialogNodes.smilePageNext.innerHTML = ""
        }
    },
    showTabPage: function(d, c, f) {
        this.dialogNodes.sortCtrl.innerHTML = "";
        this.dialogNodes.smilePagePrev.innerHTML = "";
        this.dialogNodes.smilePageShow.innerHTML = "";
        this.dialogNodes.smilePageNext.innerHTML = "";
        var b = this;
        var a;
        if (d == 1) {
            if (d != c) {
                this.dialogNodes.sortCtrl.innerHTML = '<a href="#" onclick="return false;" title="向上" class="up_off"></a>';
                a = $C("a");
                a.href = "#";
                a.onclick = function() {
                    return false
                };
                a.title = "向下";
                a.className = "down";
                a.onmousedown = function() {
                    b.showTab(d + 1, f);
                    b.showAll()
                };
                this.dialogNodes.sortCtrl.appendChild(a)
            } else {}
        } else {
            if (d < c) {
                a = $C("a");
                a.href = "#";
                a.onclick = function() {
                    return false
                };
                a.title = "向上";
                a.className = "up";
                a.onmousedown = function() {
                    b.showTab(d - 1, f);
                    b.showAll()
                };
                this.dialogNodes.sortCtrl.appendChild(a);
                a = $C("a");
                a.href = "#";
                a.onclick = function() {
                    return false
                };
                a.title = "向下";
                a.className = "down";
                a.onmousedown = function() {
                    b.showTab(d + 1, f);
                    b.showAll()
                };
                this.dialogNodes.sortCtrl.appendChild(a)
            } else {
                a = $C("a");
                a.href = "#";
                a.onclick = function() {
                    return false
                };
                a.title = "向上";
                a.className = "up";
                a.onmousedown = function() {
                    b.showTab(d - 1, f);
                    b.showAll()
                };
                this.dialogNodes.sortCtrl.appendChild(a);
                Core.Dom.addHTML(this.dialogNodes.sortCtrl, '<a href="#" onclick="return false;" title="向下" class="down_off"></a>')
            }
        }
    },
    eventListen: function() {
        var d = this;
        var c = d.dialogNodes.searchText;
        var i = d.dialogNodes.searchBtn;
        var f = d.dialogNodes.keyCtrlBack;
        var a = d.dialogNodes.allSort;
        var b = d.dialogNodes.smileEmptyBack;
        Core.Events.addEvent(document.body,
        function(l) {
            var j = Core.Events.getEvent(),
            m = ($IE) ? j.srcElement: j.target;
            if (d.dialogNodes.entity != null && (Core.Dom.contains(d.dialogNodes.entity, m) == false || l == true)) {
                d.hide()
            }
        });
        Core.Events.addEvent(this.dialogNodes.btnClose,
        function() {
            d.hide()
        });
        Core.Events.addEvent(c,
        function() {
            if (Core.String.trim(c.value) == "输入关键字、动漫形象") {
                c.value = "";
                c.style.color = "#000"
            }
            c.select()
        },
        "focus");
        Core.Events.addEvent(c,
        function() {
            if (Core.String.trim(c.value) == "") {
                c.value = "输入关键字、动漫形象";
                c.style.color = "#9b9b9a"
            }
        },
        "blur");
        Core.Events.addEvent(c,
        function(m) {
            var j = Core.Events.getEvent();
            var l = j.which || j.keyCode;
            var n = Core.String.trim(c.value);
            if (l == 13 && n != "") {
                d.searchKey(n)
            }
        },
        "keydown");
        Utils.Form.limitMaxLen(c, 20);
        Core.Events.addEvent(i,
        function() {
            if (c.value == "输入关键字、动漫形象" || c.value == "") {} else {
                d.searchKey(c.value);
                c.focus()
            }
        });
        var g = function() {
            d.dataSettle(d.data, 9);
            d.dialogNodes.keyCtrl.style.display = "none";
            d.dialogNodes.smileEmpty.style.display = "none";
            d.dialogNodes.smileList.style.display = "";
            d.dialogNodes.searchText.value = "输入关键字、动漫形象";
            d.dialogNodes.searchText.style.color = "#9b9b9a"
        };
        Core.Events.addEvent(f, g);
        Core.Events.addEvent(b, g);
        Core.Events.addEvent(a,
        function() {
            d.showAll()
        })
    },
    showAll: function() {
        this.showSmile(this.allData, 1, this.pageSize);
        this.dialogNodes.allSort.style.fontWeight = 600;
        if (this.currentTab != null) {
            this.currentTab.setAbort()
        }
    },
    setSort: function(a, b) {
        this.isFromUp = a;
        this.option.sortId = a;
        this.option.callback = b;
        if (a == 0) {
            this.dialogNodes.allSort.style.fontWeight = 600;
            this.dataSettle()
        } else {
            this.dataSettle();
            this.tabs.swapTags(this.tabsObject[a])
        }
    },
    getKeyWord: function() {
        if (this.keywordData != null) {
            return
        }
        var a = this;
        var b = Utils.Io.JsLoad.request("http://www.sinaimg.cn/uc/myshow/blog/misc/gif/smileKeywordConfig.js?varname=smileKeywordConfig&rnd=" + Math.random(), {
            onComplete: function(n) {
                a.keywordData = n;
                var l = n.E___00000000000 || "顶|路过|哭|啦啦|美女";
                var m = document.createDocumentFragment();
                l = l.split("|");
                for (var j = 0,
                d = l.length; j < d; j++) {
                    var g = $C("a");
                    g.href = "#";
                    g.onclick = function() {
                        return false
                    };
                    g.onmousedown = Core.Function.bind3(function(i) {
                        a.searchKey(i)
                    },
                    null, [l[j]]);
                    g.innerHTML = l[j];
                    m.appendChild(g)
                }
                if (a.dialogNodes.hotKeyword.innerHTML == "") {
                    a.dialogNodes.hotKeyword.appendChild(m)
                }
                var c = "";
                for (var f in n) {
                    if (f != "E___00000000000") {
                        c += "∑" + f + "§" + n[f]
                    }
                }
                a.keywordStr = c
            },
            onException: function() {}
        })
    },
    searchKey: function(f) {
        var d = f.replace(/([\\^$*+?{}.|])/gi, "\\$1");
        var m = new RegExp("∑([^§]+)§[^∑]*" + d + "[^∑]*", "gi");
        var b = [];
        this.keywordStr.replace(m,
        function(p, i) {
            b.push(i)
        });
        b = b.join(",");
        var l = {};
        var a = this.allDataBack;
        var o = a.length;
        var n = 0;
        for (var g = 0; g < o; g++) {
            if (b.indexOf(a[g].code) != -1 || a[g].sname.indexOf(f) != -1 || a[g].name.indexOf(f) != -1) {
                if (l[a[g].sid] == null) {
                    l[a[g].sid] = {
                        name: a[g].sname,
                        data: []
                    }
                }
                l[a[g].sid].data.push(a[g]);
                n++
            }
        }
        var j = scope.$pageid;
        if (n == 0) {
            this.dialogNodes.smileEmpty.style.display = "";
            this.dialogNodes.smileList.style.display = "none";
            if (j) {
                var c = scope.isFromtheCommonhzh;
                if (c) {
                    v7sendLog($_GLOBAL.faceChooseTable[j][c] + "_16_030_" + encodeURIComponent(f), j, "")
                }
            }
        } else {
            this.dialogNodes.smileList.style.display = "";
            this.dialogNodes.smileEmpty.style.display = "none";
            if (j) {
                var c = scope.isFromtheCommonhzh;
                if (c) {
                    v7sendLog($_GLOBAL.faceChooseTable[j][c] + "_16_031_" + encodeURIComponent(f), j, "")
                }
            }
        }
        this.dataSettle(l, 7);
        this.dialogNodes.keyCtrl.style.display = "";
        this.dialogNodes.keyWord.innerHTML = f.split("").join("<wbr/>");
        Core.Dom.setStyle(this.dialogNodes.sortList, "height", "217px")
    },
    setPosition: function(a, b) {
        this.x = a;
        this.y = b;
        this.dialog.setPosition({
            x: a,
            y: b
        })
    },
    show: function() {
        this.dialogNodes.searchText.value = "输入关键字、动漫形象";
        this.dialogNodes.searchText.style.color = "#9b9b9a";
        this.dialog.show()
    },
    hide: function() {
        this.dialog.hidden();
        this.dialogNodes.keyCtrl.style.display = "none"
    }
};
App.insertSmilesForm = Core.Class.create();
App.insertSmilesForm.prototype = {
    defalutConfig: {
        sortCount: 6,
        clickCallback: function() {},
        recommCount: 8
    },
    initialize: function(b) {
        this.option = b || {};
        if (this.option.sortNode == null) {
            return
        }
        for (var a in this.defalutConfig) {
            if (this.option[a] == null) {
                this.option[a] = this.defalutConfig[a]
            }
        }
        if (scope.smilesData == null) {
            this.getSmilesData()
        } else {
            this.data = scope.smilesData;
            this.renderUI()
        }
    },
    getSmilesData: function() {
        var a = this;
        var b = Utils.Io.JsLoad.request([{
            url: "http://www.sinaimg.cn/uc/myshow/blog/misc/gif/smileConfig.js?varname=smileConfig&rnd=" + Math.random(),
            charset: "GBK"
        }], {
            onComplete: function(c) {
                scope.smilesData = c;
                a.data = c;
                a.renderUI()
            },
            onException: function() {}
        })
    },
    renderUI: function() {
        var p = this;
        var m = 1;
        var j = [];
        var c = [];
        var a;
        var d = document.createDocumentFragment();
        var n = $C("div");
        var f = $C("span");
        var t = $C("div");
        n.className = "facestyle";
        for (var s in this.data) {
            if (m == 1) {
                a = this.data[s] || {
                    data: {}
                };
                a = a.data
            }
            if (m <= this.option.sortCount) {
                var u = this.data[s].name;
                var b = $C("a");
                b.href = "#";
                b.setAttribute("key", s);
                b.onclick = function() {
                    Core.Events.stopEvent();
                    return false
                };
                b.onmousedown = Core.Function.bind3(function(i) {
                    App.insertSmilesDialog(i, p.option.clickCallback, p.option.positionNode, p.option.arrPosPix)
                },
                null, [s]);
                b.hideFocus = true;
                b.innerHTML = '<img src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + s + '-25.gif" alt="' + u + '" title="' + u + '" />';
                n.appendChild(b);
                m++
            } else {
                break
            }
        }
        var o = new Date().getTime();
        n.id = "recomm_" + o;
        d.appendChild(n);
        f.className = "SG_more";
        var l = $C("a");
        l.href = "#";
        l.onclick = function() {
            Core.Events.stopEvent();
            return false
        };
        l.onmousedown = (function(i) {
            return function() {
                App.insertSmilesDialog(0, p.option.clickCallback, p.option.positionNode, p.option.arrPosPix);
                var v = scope.$pageid;
                if (v) {
                    var y = i.parentNode.parentNode.id.split("_")[0];
                    if (y) {
                        scope.isFromtheCommonhzh = $_GLOBAL.faceCountMoreLinkTable[v][y][1];
                        v7sendLog($_GLOBAL.faceCountMoreLinkTable[v][y][0] + "_07_000_000", v, "")
                    }
                }
            }
        })(l);
        l.innerHTML = "更多>>";
        f.appendChild(l);
        d.appendChild(f);
        t.className = "clearit";
        d.appendChild(t);
        $E(this.option.sortNode).appendChild(d);
        if ($E(this.option.recommNode) != null) {
            d = document.createDocumentFragment();
            for (var g = 0; g < this.option.recommCount; g++) {
                u = a[g].name;
                var r = a[g].code;
                b = $C("a");
                b.href = "#"; (function(i) {
                    b.onclick = Core.Function.bind3(function(y, z) {
                        p.option.clickCallback(y, z);
                        var v = scope.$pageid;
                        if (v) {
                            i += "";
                            i = i.length == 1 ? "0" + i: i;
                            v7sendLog($_GLOBAL.faceCountRecommLinkTable[v] + "_" + i + "_010_" + y, v, "")
                        }
                        Core.Events.stopEvent();
                        return false
                    },
                    null, [r, u])
                })(g + 8);
                b.hideFocus = true;
                b.innerHTML = '<img src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/' + r + 'T.gif" alt="' + u + '" title="' + u + '" />';
                d.appendChild(b)
            }
            $E(this.option.recommNode).appendChild(d)
        }
        var q = Lib.children($E("recomm_" + o).childNodes);
        for (var g = 0; q[g]; g++) {
            Core.Events.addEvent(q[g], (function(i, v) {
                return function() {
                    var y = scope.$pageid;
                    if (y) {
                        var z = i.parentNode.parentNode.id.split("_")[0];
                        if (z) {
                            scope.isFromtheCommonhzh = $_GLOBAL.faceCountMoreLinkTable[y][z][1];
                            v7sendLog($_GLOBAL.faceCountMoreLinkTable[y][z][0] + "_0" + v + "_020_" + i.getAttribute("key"), y, "")
                        }
                    }
                }
            })(q[g], (g + 1)), "mousedown")
        }
        m = j = c = a = d = n = f = l = t = r = s = u = b = null
    }
};
Lib.children = function(b) {
    var c = [];
    for (var a = 0; b[a]; a++) {
        if (b[a].nodeType == 1) {
            c.push(b[a])
        }
    }
    return c
};
App.insertSmilesDialog = function(d, g, c, b) {
    App.insertSmilesDialog.callback = g;
    if (scope.smileDialog == null) {
        scope.smileDialog = new App.smilesDialog()
    }
    scope.smileDialog.setSort(d, g);
    var f = Core.Dom.getXY($E(c));
    var a = f[0] + b[0];
    var i = f[1] + b[1];
    scope.smileDialog.setPosition(a, i);
    scope.smileDialog.show()
};
App.formInsertSmile = function(b, a, i, g, d, f) {
    var c = $E(b);
    var j = function() {
        if (c.createTextRange) {
            c.caretPos = document.selection.createRange().duplicate()
        }
    };
    Core.Events.addEvent(c, j, "keyup");
    Core.Events.addEvent(c, j, "focus");
    Core.Events.addEvent(c, j, "select");
    Core.Events.addEvent(c, j, "click");
    new App.insertSmilesForm({
        sortNode: a,
        clickCallback: function(n, s) {
            var l = "[emoticons=" + n + "]" + s + "[/emoticons]";
            if ($IE) {
                if (c.createTextRange && c.caretPos) {
                    var m = c.caretPos;
                    m.text = m.text.charAt(m.text.length - 1) == " " ? l + " ": l;
                    c.focus()
                } else {
                    c.value += l;
                    c.focus()
                }
            } else {
                if (c.setSelectionRange) {
                    var q = c.selectionStart;
                    var p = c.selectionEnd;
                    var r = c.value.substring(0, q);
                    var o = c.value.substring(p);
                    c.value = r + l + o
                } else {
                    c.value += l
                }
            }
            if (g) {
                g()
            }
        },
        recommNode: i,
        positionNode: d || a,
        arrPosPix: f || [0, 0]
    })
};
Core.Dom.opacity = function(b, a) {
    b = typeof b == "string" ? $E(b) : b;
    b.style.filter = "alpha(opacity=" + a + ")";
    b.style.opacity = a / 100
};
Core.Dom.insertAfter = function(c, a) {
    var b = a.parentNode;
    if (b.lastChild == a) {
        b.appendChild(c)
    } else {
        b.insertBefore(c, a.nextSibling)
    }
    return c
};
Core.Dom.wrap = function(c, a) {
    var b = $C(a);
    Core.Dom.insertAfter(b, c);
    b.appendChild(c);
    return b
};
Ui.Slide = Core.Class.create();
Ui.Slide.prototype = {
    node: null,
    container: null,
    status: "show",
    offset: 0,
    onSlideIn: new Function(),
    onSlideOut: new Function(),
    initialize: function(b, a) {
        var a = a || {};
        this.node = $E(b);
        this.container = Core.Dom.wrap(this.node, "div");
        this.container.style.overflow = "hidden";
        this.offset = this.node.offsetHeight;
        this.opacity = true;
        this.animation = a.animation || "strongEaseOut";
        this.duration = a.duration || 1;
        this.container.style.height = this.offset + "px";
        this.node.style.marginTop = "0px"
    },
    slideIn: function() {
        if (this.opacity) {
            new Ui.tween(this.node, "opacity", 1, this.duration, this.animation, {})
        }
        new Ui.tween(this.container, "height", this.offset, this.duration, this.animation, {});
        new Ui.tween(this.node, "marginTop", 0, this.duration, this.animation, {
            tween: function(a) {}.bind2(this),
            end: this.onSlideIn
        })
    },
    slideOut: function() {
        if (this.opacity) {
            new Ui.tween(this.node, "opacity", 0, this.duration, this.animation, {})
        }
        new Ui.tween(this.container, "height", 0, this.duration, this.animation, {});
        new Ui.tween(this.node, "marginTop", -this.offset, this.duration, this.animation, {
            end: this.onSlideOut
        })
    },
    show: function() {
        if (this.opacity) {}
        this.container.style.height = this.offset + "px";
        this.node.style.marginTop = 0 + "px"
    },
    hide: function() {
        if (this.opacity) {}
        this.container.style.height = 0 + "px";
        this.node.style.marginTop = -this.offset + "px"
    }
};
Core.Dom.removeParentNode = function(b) {
    b = $E(b);
    var a = b.parentNode;
    Core.Dom.insertAfter(b, a);
    a.parentNode.removeChild(a)
};
$SYSMSG.extend({
    B36001: "操作失败，此博文不存在或被删除。",
    B36002: "验证码错误，请重新输入。",
    B36003: "请输入昵称。",
    B36004: "登录名或密码错误。",
    B36005: "呢称不能使用此类特殊词汇，请重新输入。",
    B36006: "昵称必须是8个中文或16个字符以内，且不能为纯数字，请重新输入。",
    B36007: "呢称不能使用此类特殊词汇，请重新输入。",
    B36008: "不能3秒内连续发评论，请梢后再试。",
    B36009: "不能发内容重复的评论。",
    B36020: "暂无评论。",
    B36021: "暂无评论。",
    B36022: "评论内容必须是1000中文或2000字符以内，请重新输入。",
    B36031: "操作失败，此评论不存在或被删除。",
    B36032: "操作失败，此评论不存在或被删除。",
    B36033: "操作失败，此评论不存在或被删除。",
    B36041: "请输入回复内容。",
    B36042: "回复内容必须是1000中文或2000字符以内，请重新输入。",
    B36043: "操作失败，自己不能回复自己的评论。",
    B36101: "操作失败，此博文不存在或被删除。",
    B36102: "评论发布失败，此博文设置不允许评论。",
    B36103: "操作失败，此评论不存在或被删除。",
    B36104: "评论已发布，需要审核后才能显示，请稍候…",
    B36113: "博主已关闭匿名评论，请登录后再评论",
    B36105: "请输入评论内容。",
    B36106: "请输入验证码。",
    B36107: "请输入登录名。",
    B36108: "请输入密码。",
    B36109: "读取中，请稍候…",
    B36110: "读取失败，请刷新。",
    B36111: "确定要删除此评论吗？删除后不可恢复。",
    B36112: "确定要删除此回复吗？删除后不可恢复。",
    B36201: "确定要删除此评论吗？删除后不可恢复。",
    B36202: "确定要删除此回复吗？删除后不可恢复。",
    B36203: "请选择要删除的内容。",
    B36204: "已回复该评论，请勿重复提交。",
    B36999: "对不起，您短时间发表的评论过多，请多休息会，注意身体！感谢您对新浪博客的支持和关注！",
    "36999": "对不起，您短时间发表的评论过多，请多休息会，注意身体！感谢您对新浪博客的支持和关注！"
});
var checkUserProduct = {
    isinit: false,
    func: null,
    product: "",
    flag: true,
    getReturn: function(a) {
        switch (a) {
        case "blog":
            var b = ("0x" + scope.userProducts[$UID]) & 1;
            if (b != 0) {
                this.flag = true
            } else {
                this.flag = false
            }
            break;
        case "photo":
            var b = ("0x" + scope.userProducts[$UID]) & 8;
            if (b != 0) {
                this.flag = true
            } else {
                this.flag = false
            }
            break;
        default:
            this.flag = true
        }
        this.func()
    },
    check: function(b, c) {
        this.product = b;
        this.func = c ||
        function() {};
        if (scope.userProducts) {
            this.getReturn(b)
        } else {
            var a = "http://uic.sinajs.cn/uic?type=service&uids=" + $UID;
            Utils.Io.JsLoad.request(a, {
                onComplete: function(d) {
                    if (typeof d == "object") {
                        scope.userProducts = d;
                        this.getReturn(this.product);
                        this.isinit = true
                    } else {
                        this.flag = false;
                        this.isinit = true
                    }
                }.bind2(this),
                charset: "UTF-8"
            })
        }
    }
};
Comment.formatTime = function() {
    var c = new Date();
    var f = (c.getMonth() + 1) >= 10 ? (c.getMonth() + 1) : "0" + (c.getMonth() + 1);
    var a = c.getDate() > 10 ? c.getDate() : "0" + c.getDate();
    var d = new Date().toTimeString().split(" ")[0];
    var b = c.getFullYear() + "-" + f + "-" + a + " " + d;
    return b
};
Comment.add = Core.Class.create();
Comment.add.prototype = {
    initialize: function() {},
    render: function(a) {
        a.time = Comment.formatTime();
        if ($isLogin) {
            a.uid = $UID;
            a.photo_server = $UID % 8 + 1
        } else {}
        if ($isAdmin) {
            a.show_delete = "inline"
        } else {
            a.show_delete = "none"
        }
        a.show_reply = "none";
        if ($isLogin) {
            a.show_head = new Ui.Template(this.show_head).evaluate(a);
            a.show_name = new Ui.Template(this.show_name).evaluate(a)
        } else {
            a.show_head = '<img src="http://blogimg.sinajs.cn/v5images/default.gif" />';
            a.show_name = Core.String.encodeHTML(a.nick);
            a.nick = Core.String.encodeHTML(a.nick)
        }
        trace("****************");
        return new Ui.Template(this.struc).evaluate(a)
    },
    show_head: '		<a href="http://blog.sina.com.cn/u/#{uid}">			<img alt="#{nick}" src="http://portrait#{photo_server}.sinaimg.cn/#{uid}/blog/50" />		</a>	',
    show_name: '		<a href="http://blog.sina.com.cn/u/#{uid}">#{nick}</a>	',
    struc: '		<li id="cmt_#{cid}" class="SG_j_linedot1">			<table class="SG_revert_Left">				<tr>					<td>						#{show_head}						<!--<a href="http://blog.sina.com.cn/u/#{uid}">							<img alt="#{nick}" src="http://portrait#{photo_server}.sinaimg.cn/#{uid}/blog/50" />						</a>-->					</td>				</tr>			</table>			<div class="SG_revert_Cont">				<p>					<span class="SG_revert_Tit">						#{show_name}						<!--<a href="http://blog.sina.com.cn/u/#{uid}">#{nick}</a>-->					</span>					<span class="SG_revert_Time">						<em class="SG_txtc"><!-- 2009-08-30 18:29:12-->#{time}</em>						<a style="display:#{show_reply};" onclick="return false;" href="#" class="CP_a_fuc">							[<cite onclick="reply_comment(#{cid})">回复</cite>]						</a> 						<a style="display:#{show_delete};" onclick="return false;" href="#" class="CP_a_fuc">							[<cite onclick="del_comment(#{cid})">删除</cite>]						</a>					</span>				</p>				<div class="SG_revert_Inner SG_txtb">#{comment}</div>			</div>		</li>	'
};
Comment.Post = Core.Class.create();
Comment.Post.prototype = {
    articleid: 0,
    totle: 0,
    anonyous: false,
    onSuccess: new Function(),
    onError: new Function(),
    initialize: function() {},
    post: function(a) {
        try {
            this.data = a;
            this.data.article_id = this.articleid;
            this.data.uid = $isLogin ? $UID: "";
            this.data.fromtype = "commentadd";
            this.data.anonymity = this.anonyous;
            if (this.data.anonymity) {
                this.data.login_name = this.data.comment_anonyous
            }
            Lib.checkAuthor();
            if ($isLogin) {
                this.data.login_name = $nick;
                this.postComment(this.data)
            } else {
                if (this.anonyous) {
                    this.postComment(this.data)
                } else {
                    new Lib.Login.LoginPost(function() {
                        Lib.checkAuthor();
                        if ($isLogin) {
                            this.data.login_name = $nick;
                            this.postComment(this.data);
                            this.renderLogin()
                        } else {
                            this.refreshCKIMG();
                            winDialog.alert("登录名或密码错误！", {
                                icon: "02"
                            });
                            this.refreshCKIMG();
                            $E("commentloginM").style.display = "none";
                            $E("commentlogin").style.display = "block";
                            $E("anonymity_cont").style.display = "block";
                            $E("commentNick").style.display = "";
                            $E("commentNick").innerHTML = ""
                        }
                    }.bind2(this), false, "referer:" + location.hostname + location.pathname + ",func:0001").login(a.login_name, a.login_pass, a.login_remember == true ? 15 : 0)
                }
            }
        } catch(b) {
            trace(b)
        }
    },
    renderLogin: function() {
        $tray.renderLogin();
        $E("commentlogin").style.display = "none";
        var a = function() {
            if (checkUserProduct.flag == true) {
                scope.setNickTime = setInterval(function() {
                    if (typeof scope.$loginNick == "undefined") {
                        Lib.Uic.getNickName([$UID],
                        function(c) {
                            for (var b in c) {
                                scope.$loginNick = c[b];
                                $E("commentNick").innerHTML = scope.$loginNick + ":"
                            }
                        });
                        clearInterval(scope.setNickTime)
                    } else {
                        $E("commentNick").innerHTML = scope.$loginNick + ":"
                    }
                },
                500)
            } else {
                $E("commentNick").innerHTML = '您还未<a href="http://login.sina.com.cn/hd/reg.php?entry=blog">开通</a>博客，只能匿名发表评论。</li>'
            }
        };
        if ($E("commentNick").innerHTML == "") {
            if (checkUserProduct.isinit == false) {
                window.checkuserinterval = setInterval(function() {
                    if (checkUserProduct.isinit == false) {
                        checkUserProduct.check("blog", a)
                    } else {
                        clearInterval(window.checkuserinterval)
                    }
                },
                500)
            } else {
                a()
            }
        }
        if ($E("anonymity_cont")) {
            $E("anonymity_cont").style.display = "none"
        }
    },
    postComment: function(b) {
        var a = new Interface("http://control.blog.sina.com.cn/admin/comment/comment_post.php?version=7", "ijax");
        a.request({
            POST: b,
            onSuccess: function(c) {
                Lib.checkAuthor();
                scope.$totle_comment++;
                $E("c_" + this.articleid).innerHTML = "(" + scope.$totle_comment + ")";
                if ($isLogin) {
                    this.renderLogin()
                }
                this.addNewComment(b);
                this.onSuccess();
                if ($E("comment_get_vcode")) {
                    Lib.AudioCheck.render($E("comment_get_vcode").parentNode, Lib.AudioCheck.soundUrl + "?" + new Date().getTime())
                } else {}
            }.bind2(this),
            onError: function(c) {
                this.refreshCKIMG();
                if (c.code == "B36113") {
                    winDialog.alert("博主已关闭匿名评论，请登录后再评论", {
                        funcOk: function() {
                            if ($E("anonymity_cont")) {
                                $E("anonymity_cont").style.display = "none"
                            }
                            $E("commentlogin").style.display = "";
                            $E("commentloginM").style.display = "none"
                        }
                    })
                } else {
                    if (c.code == "B36002") {
                        winDialog.alert($SYSMSG.B36002, {
                            funcOk: function() {
                                $E("login_check").value = "";
                                $E("login_check").focus()
                            }
                        })
                    } else {
                        showError(c.code)
                    }
                }
                if (c.code != null) {
                    Lib.checkAuthor();
                    if ($isLogin) {
                        return
                    }
                    if ($E("anonymity").checked == true) {
                        $E("commentloginM").style.display = "block";
                        $E("anonymity").checked = "checked"
                    } else {
                        $E("commentloginM").style.display = "none";
                        $E("commentlogin").style.display = "block"
                    }
                    $E("anonymity_cont").style.display = "block";
                    $E("commentNick").innerHTML = "";
                    $isLogin = false;
                    this.anonyous = true
                }
                this.onError(c)
            }.bind2(this),
            onFail: function() {
                winDialog.alert("发评论失败！请重试。", {
                    icon: "02"
                })
            }.bind2(this)
        })
    },
    refreshCKIMG: function() {
        if ($E("comment_check_img")) {
            $E("comment_check_img").src = "http://vlogin.blog.sina.com.cn/myblog/checkwd_image.php?" + new Date().valueOf()
        }
        if ($E("comment_get_vcode")) {
            Lib.AudioCheck.render($E("comment_get_vcode").parentNode, Lib.AudioCheck.soundUrl + "?" + new Date().getTime())
        }
    },
    addNewComment: function(b) {
        var a = Comment.count(scope.$totle_comment);
        new Comment.List().load(a);
        if (a > scope.$comment_page) {
            scope.$comment_page++;
            Comment.paging(scope.$totle_comment, scope.$comment_page)
        }
    }
};
Comment.commentFaceTemplate = ['<table id="#{entity}" class="CP_w">', '<thead id="#{titleBar}">', "<tr>", '<th class="tLeft"><span></span></th>', '<th class="tMid">', '<div class="bLyTop">', '<strong id="#{titleName}">插入表情</strong>', '<cite><a id="#{btnClose}" href="javascript:;" onclick="return false;" class="CP_w_shut" title="关闭">关闭</a></cite>', "</div>", "</th>", '<th class="tRight"><span></span></th>', "</tr>", "</thead>", "<tfoot>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td>', "</tr>", "</tfoot>", "<tbody>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid" id="#{content}">', '<div class="faceItemContent">', '<div class="bigface">', '<div id="#{faceTab}" class="faceSidebar">', "</div>", '<div id="#{faceContent}" class="faceShowAll">', "</div>", "</div>", "</div>", "</td>", '<td class="tRight"><span></span></td>', "</tr>", "</tbody>", "</table>"].join("");
Comment.insertSmile = Core.Class.create();
Comment.insertSmile.prototype = {
    initialize: function() {},
    show: function() {
        this.btnShowFaceEditor = $E("article_comment_insertSmile");
        this.txtComment = $E("commentArea");
        this.faceEditor = new Lib.Face(this.txtComment);
        var a = this;
        a.bindFace()
    },
    bindFace: function() {
        var a = this;
        Core.Events.addEvent(this.btnShowFaceEditor,
        function() {
            if (a.faceEditor.isShowed) {
                a.faceEditor.hidden()
            } else {
                if (!a.faceEditor.isLoad) {
                    a.faceEditor.load();
                    a.initFace();
                    a.faceEditor.isLoad = true
                }
                var b = Core.Dom.getLeft(a.btnShowFaceEditor) - 450;
                var c = Core.Dom.getTop(a.btnShowFaceEditor) + a.btnShowFaceEditor.offsetHeight;
                a.faceEditor.setPosition(b, c);
                a.faceEditor.show()
            }
            Core.Events.stopEvent()
        },
        "mousedown")
    },
    initFace: function() {
        var a = this;
        Core.Events.addEvent(this.faceEditor.dialogNodes.btnClose,
        function() {
            a.faceEditor.hidden()
        },
        "mousedown");
        Core.Events.addEvent(document.body,
        function() {
            a.faceEditor.hidden()
        },
        "mousedown");
        Core.Events.addEvent(this.faceEditor.dialog.entity,
        function() {
            Core.Events.stopEvent()
        },
        "mousedown")
    }
};
$registJob("articleCommentPost",
function() {
    if (scope.$private.cms != 1 && scope.$isCommentAllow != 1) {
        var g = false;
        $E("comment_check_img").style.display = "none";
        var c = new Comment.Post();
        var d = function() {
            $E("commentNick").style.display = "";
            if (checkUserProduct.flag == true) {
                scope.setNickTime = setInterval(function() {
                    if (typeof scope.$loginNick == "undefined") {
                        Lib.Uic.getNickName([$UID],
                        function(q) {
                            for (var p in q) {
                                scope.$loginNick = q[p];
                                $E("commentNick").innerHTML = scope.$loginNick + ":"
                            }
                        });
                        clearInterval(scope.setNickTime)
                    } else {
                        $E("commentNick").innerHTML = scope.$loginNick + ":"
                    }
                },
                500)
            } else {
                $E("commentNick").innerHTML = '您还未<a href="http://login.sina.com.cn/hd/reg.php?entry=blog">开通</a>博客，只能匿名发表评论。</li>'
            }
        };
        if ($isLogin) {
            if (checkUserProduct.isinit == false) {
                window.checkuserinterval = setInterval(function() {
                    if (checkUserProduct.isinit == false) {
                        checkUserProduct.check("blog", d)
                    } else {
                        clearInterval(window.checkuserinterval)
                    }
                },
                500)
            } else {
                d()
            }
            if ($E("anonymity_cont")) {
                $E("anonymity_cont").style.display = "none"
            }
        } else {
            $E("commentlogin").style.display = "block";
            var n = Utils.Cookie.getCookie("remberloginname");
            if (n != "" && n != "") {
                $E("login_name").value = unescape(unescape(n))
            }
            var b = Utils.Cookie.getCookie("ALF");
            if (b != "" && $E("login_remember")) {
                $E("login_remember").checked = true
            }
        }
        var a = function() {
            Lib.checkAuthor();
            var q = $E("login_remember");
            var p = $E("login_remember_caution");
            if (!q) {
                return
            }
            if (!$isLogin) {
                q[$IE ? "onclick": "onchange"] = r
            }
            r();
            function r() {
                if (q.checked) {
                    p.style.display = "inline-block"
                } else {
                    p.style.display = "none"
                }
            }
        };
        a();
        if ($E("anonymity") && $E("anonymity").checked) {
            c.anonyous = true;
            $E("commentlogin").style.display = "none";
            $E("commentloginM").style.display = ""
        }
        Core.Events.addEvent($E("comment_anonyous"),
        function() {
            if ($E("anonymity") && $E("anonymity").checked && Core.String.trim($E("comment_anonyous").value) == "新浪网友") {
                $E("comment_anonyous").value = ""
            }
        },
        "focus");
        Core.Events.addEvent($E("comment_anonyous"),
        function() {
            if ($E("anonymity") && $E("anonymity").checked && Core.String.trim($E("comment_anonyous").value) == "") {
                $E("comment_anonyous").value = "新浪网友"
            }
        },
        "blur");
        var l = function() {
            if ($IE8) {
                $E("comment_check_img").src = "http://vlogin.blog.sina.com.cn/myblog/checkwd_image_ie8.php?" + new Date().valueOf()
            } else {
                $E("comment_check_img").src = "http://vlogin.blog.sina.com.cn/myblog/checkwd_image.php?" + new Date().valueOf()
            }
            m("img")
        };
        function m(q) {
            var p = q || "check";
            if (p == "img") {
                $E("comment_check_img").style.display = "inline";
                $E("check_show").style.display = "none"
            } else {
                $E("comment_check_img").style.display = "none";
                $E("check_show").style.display = ""
            }
        }
        c.articleid = scope.$articleid;
        c.onSuccess = function() {
            if (scope.commEditor) {
                scope.commEditor.clearHTML("postCommentIframe")
            }
            $E("commentArea").value = "";
            $E("login_check").value = "";
            m()
        };
        c.onError = function() {
            l()
        };
        if ($E("anonymity")) {
            Core.Events.addEvent("anonymity",
            function() {
                if ($E("anonymity").checked) {
                    c.anonyous = true;
                    $E("commentlogin").style.display = "none";
                    $E("commentloginM").style.display = "block"
                } else {
                    c.anonyous = false;
                    $E("commentlogin").style.display = $isLogin ? "none": "block";
                    $E("commentloginM").style.display = "none"
                }
            })
        }
        if (!$E("postCommentIframe")) {
            Core.Events.addEvent("commentArea",
            function() {
                if (g) {
                    return
                }
                $E("check_show").style.display = "none";
                l();
                g = true
            },
            "focus")
        }
        Core.Events.addEvent("login_check",
        function() {
            if (g) {
                return
            }
            $E("check_show").style.display = "none";
            l();
            g = true
        },
        "focus");
        Core.Events.addEvent("check_show",
        function() {
            if (g) {
                return
            }
            $E("check_show").style.display = "none";
            l();
            g = true
        },
        "click");
        Core.Events.addEvent("comment_check_img",
        function() {
            l()
        },
        "mousedown");
        var j = function() {
            if (Core.Events.getEvent()) {
                var q = Core.Events.getEvent();
                if (q.type == "keydown" && q.keyCode != 13) {
                    return
                } else {
                    if (q.type == "keydown" && q.keyCode == 13) {
                        if (scope.commEditor) {
                            scope.commEditor.handleChange("postCommentIframe")
                        }
                    }
                }
                Core.Events.stopEvent()
            }
            if (!$isLogin && $E("anonymity") && $E("anonymity").checked == false) {
                if (Core.String.trim($E("login_name").value) == "") {
                    Core.Events.fireEvent("anonymity", "click");
                    showError($SYSMSG.B36107);
                    return
                } else {
                    if (Core.String.trim($E("login_pass").value) == "") {
                        showError($SYSMSG.B36108);
                        return
                    }
                }
            }
            if ($E("anonymity") && $E("anonymity").checked == true && Core.String.trim($E("comment_anonyous").value) == "") {
                showError($SYSMSG.B36003)
            } else {
                if (Core.String.trim($E("commentArea").value) == "") {
                    showError($SYSMSG.B36105)
                } else {
                    if (Core.String.trim($E("login_check").value) == "") {
                        winDialog.alert($SYSMSG.B36106, {
                            funcOk: function() {
                                $E("login_check").value = "";
                                $E("login_check").focus()
                            }
                        })
                    } else {
                        var p = {
                            comment: $E("commentArea").value,
                            login_name: $E("login_name").value,
                            login_pass: $E("login_pass").value,
                            check: $E("login_check").value,
                            comment_anonyous: $E("comment_anonyous").value
                        };
                        if ($E("login_remember")) {
                            p.login_remember = $E("login_remember").checked
                        }
                        Utils.Cookie.setCookie("remberloginname", escape($E("login_name").value), 2400, "/", ".blog.sina.com.cn");
                        c.post(p);
                        g = false
                    }
                }
            }
        };
        Core.Events.addEvent("postcommentid",
        function() {
            if (scope.commEditor) {
                scope.commEditor.handleChange("postCommentIframe")
            }
            j()
        });
        Core.Events.addEvent($E("postcommentid").parentNode,
        function() {
            if (scope.commEditor) {
                scope.commEditor.handleChange("postCommentIframe")
            }
            j()
        },
        "keydown");
        Core.Events.addEvent($E("login_check"), j, "keydown");
        if ($E("smilesSortShow") == null) {
            $E("commentArea").style.width = "680px";
            var f = new Comment.insertSmile();
            f.show()
        } else {
            var i = [ - 325, 40 + ($IE ? -2 : 0)];
            if ($E("postCommentIframe")) {
                var o = {
                    normal: {
                        focus: function() {
                            if (g) {
                                return
                            }
                            $E("check_show").style.display = "none";
                            l();
                            g = true
                        }
                    }
                };
                App.formInsertSmile2("commentArea", "smilesSortShow", "smilesRecommended", null, "smilesSortShow", i, "postCommentIframe", o)
            } else {
                App.formInsertSmile("commentArea", "smilesSortShow", "smilesRecommended", null, "smilesSortShow", i)
            }
        }
    }
});
Core.System.htmlFilter = function(b) {
    var c = {
        "&": "&#038;",
        "<": "&#060;",
        ">": "&#062;"
    };
    var a;
    for (a in c) {
        b = b.replace(new RegExp(a, "g"), c[a])
    }
    return b
};
Lib.Panel = Core.Class.create();
Lib.Panel.prototype = {
    entity: null,
    backIframe: null,
    uniqueID: null,
    isFixed: false,
    x: 0,
    y: 0,
    template: "",
    initialize: function() {
        var a = this;
        this.uniqueID = this._getUniqueID();
        this._ie6Fixed = function() {
            if (a.entity) {
                a.entity.style.left = document.documentElement.scrollLeft + a.x + "px";
                a.entity.style.top = document.documentElement.scrollTop + a.y + "px"
            }
            if (a.backIframe) {
                a.backIframe.style.left = a.entity.style.left;
                a.backIframe.style.top = a.entity.style.top
            }
        }
    },
    setTemplate: function(c) {
        this.template = c;
        if (this.entity && this.entity.parentNode) {
            this.entity.parentNode.removeChild(this.entity);
            this.backIframe.parentNode.removeChild(this.backIframe)
        }
        this.entity = $C("div");
        var b = $C("div");
        var a = new Ui.Template(this.template);
        b.innerHTML = a.evaluate(this.getNodes("i"));
        b.style.display = "none";
        document.body.appendChild(b);
        this.entity = $E("_" + this.uniqueID + "_panel");
        this.entity.style.position = "absolute";
        this.entity.style.display = "none";
        document.body.replaceChild(this.entity, b);
        b = null;
        this.backIframe = $C("iframe");
        this.backIframe.style.display = "none";
        this.backIframe.style.border = "none";
        this.backIframe.style.zIndex = this.entity.style.zIndex;
        document.body.appendChild(this.backIframe);
        document.body.appendChild(this.entity);
        this._updateBackIframe()
    },
    setPosition: function(a, b) {
        this.x = a;
        this.y = b;
        this.entity.style.left = a + "px";
        this.entity.style.top = b + "px";
        if ($IE6 && this.isFixed) {
            this.entity.style.left = a + document.documentElement.scrollLeft + "px";
            this.entity.style.top = b + document.documentElement.scrollTop + "px"
        }
        this.backIframe.style.left = this.entity.style.left;
        this.backIframe.style.top = this.entity.style.top
    },
    setFixed: function(a) {
        this.isFixed = a;
        if ($IE6) {
            var b = this;
            this.entity.style.position = "absolute";
            if (this.isFixed) {
                b._ie6Fixed();
                Core.Events.addEvent(window, b._ie6Fixed, "scroll")
            } else {
                Core.Events.removeEvent(window, b._ie6Fixed, "scroll")
            }
            return
        }
        this.entity.style.position = this.isFixed ? "fixed": "absolute";
        this.backIframe.style.position = this.entity.style.position
    },
    show: function() {
        this.entity.style.display = "";
        this.backIframe.style.display = ""
    },
    hidden: function() {
        this.entity.style.display = "none";
        this.backIframe.style.display = "none"
    },
    close: function() {
        this.hidden();
        this.destroy()
    },
    destroy: function() {
        Core.Events.removeEvent(window, this._ie6Fixed, "scroll");
        this.entity.parentNode.removeChild(this.entity);
        this.entity = null;
        if (this.backIframe) {
            this.backIframe.parentNode.removeChild(this.backIframe);
            this.backIframe = null
        }
    },
    showWithDom: function(d, c, b) {
        var a = Core.Dom.getLeft(d) + d.offsetWidth + c;
        var f = Core.Dom.getTop(d) + d.offsetHeight + b;
        if ($IE6 && this.isFixed) {
            a = a - document.documentElement.scrollLeft;
            f = f - document.documentElement.scrollTop
        }
        this.setPosition(a, f);
        this.show()
    },
    getWidth: function() {
        var a = this.entity.style.display;
        var b = this.entity.style.visibility;
        this.entity.style.visibility = "hidden";
        this.entity.style.display = "";
        w = this.entity.offsetWidth;
        this.entity.style.display = a;
        this.entity.style.visibility = b;
        return w
    },
    getHeight: function() {
        var a = this.entity.style.display;
        var b = this.entity.style.visibility;
        this.entity.style.visibility = "hidden";
        this.entity.style.display = "";
        h = this.entity.offsetHeight;
        this.entity.style.display = a;
        this.entity.style.visibility = b;
        return h
    },
    getX: function() {
        return parseInt(this.entity.style.left)
    },
    getY: function() {
        return parseInt(this.entity.style.top)
    },
    getNodes: function(j) {
        var b = j || "o";
        var g = /[^\{\}]+(?=\})/g;
        var d;
        var c = {};
        var a = this.template.match(g);
        if (a) {
            for (d = 0; d < a.length; d++) {
                var f = a[d];
                switch (b) {
                case "o":
                    c[f] = $E("_" + this.uniqueID + "_" + f);
                    break;
                case "i":
                    c[f] = "_" + this.uniqueID + "_" + f;
                    break
                }
            }
        }
        return c
    },
    _updateBackIframe: function() {
        Core.Dom.setStyle(this.backIframe, "opacity", 0);
        this.backIframe.style.display = "";
        this.backIframe.style.position = this.entity.style.position;
        this.backIframe.style.width = this.entity.offsetWidth + "px";
        this.backIframe.style.height = this.entity.offsetHeight + "px";
        this.backIframe.style.left = this.entity.style.left;
        this.backIframe.style.top = this.entity.style.top
    },
    _getUniqueID: function() {
        return parseInt(Math.random() * 1000).toString() + (new Date).getTime().toString()
    }
};
scope.trayPlusTemplayLogout = ['<div class="topbar_menu">', '<span class="link"><a target="_blank" href="http://blog.sina.com.cn">博客首页</a></span>', '<span class="line_s"></span>', "</div>", '<div id="divPopularize" class="topbar_ad"></div>', '<div class="topbar_login"><a id="linkTrayLogin" class="login" href="javascript:;">登录</a><a id="linkReg" target="_blank" class="register" href="">注册</a></div>'].join("");
scope.trayPlusTemplayLogin = ['<div class="topbar_menu">', '<span id="loginBarOptApp" class="link"><a id="loginBarAppMenuLabel" href="javascript:;">读取中...</a><a href="javascript:;" class="link_arrow" title=""></a></span>', '<span class="line_s"></span>', '<span id="loginBarCenter" class="link"><a target="_self" href="http://control.blog.sina.com.cn/blogprofile/index.php">个人中心</a></span>', '<span class="line_s"></span>', '<span id="loginBarFriend" class="link"><a target="_blank" href="http://control.blog.sina.com.cn/blogprofile/profilefriendlist.php">好友</a></span>', '<span class="line_s"></span>', '<span id="loginBarInbox" class="link"><img id="imgNewMessage" style="display:none;" class="topbar_msg" src="http://simg.sinajs.cn/blog7style/images/common/topbar/topbar_msg.gif"/><a href="#" onclick="return false;">消息</a><a href="#" onclick="return false;" class="link_arrow" title=""></a></span>', '<span class="line_l"></span>', '<span class="link"><a href="http://login.sina.com.cn/cgi/login/logout.php">退出</a></span>', "</div>"].join("");
scope.newStatusTipTemplay = ['<div class="tb_layer_arrow"></div>', '<div class="tb_layer_Y_main tip_ps" style="width:130px;text-align:left;padding:5px 0 2px 5px;color:#000000">', '<a onclick="$E(\'newStatusTip\').style.display=\'none\';return false" href="#" class="tb_friend_inputDel" title="关闭" style="margin-top: 5px;"></a>', '<a href="http://control.blog.sina.com.cn/blogprofile/index.php?type=3&from=newstatus"><span id="nstFeed" style="padding:2px 2px;display:none;">你有<span style="color:red">新动态</span>可查看</span></a>', '<a href="http://control.blog.sina.com.cn/blogprofile/index.php?type=3&from=newreprint"><span id="nstFavorite" style="padding:3px 2px;display:none;">你有博文被<span style="color:red">转载/收藏</span></span></a>', "</div>"].join("");
scope.nicknamePanelTemplate = ['<div id="#{panel}" class="tb_layer_Y tb_layer_w2" style="z-index:512;">', '<div class="tb_layer_arrow"></div>', '<div class="tb_layer_Y_main">', '<div class="tb_ps">', '<div class="tb_ps_list">', "<ul>", "<li>", '<span class="tb_ps_nm"><a id="#{linkBlog}" href="javascript:;"><img class="SG_icon SG_icon15" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" title="博客" align="absmiddle" /><strong>博客</strong></a></span>', '<span class="tb_ps_set">[<a target="_blank" id="#{linkPostBlog}" href="http://control.blog.sina.com.cn/admin/article/article_add.php">发博文</a>]</span>', "</li>", "<li>", '<span class="tb_ps_nm"><a id="#{linkPhoto}" href="javascript:;"><img class="SG_icon SG_icon18" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" title="相册" align="absmiddle" /><strong>相册</strong></a></span>', '<span class="tb_ps_set">[<a target="_blank" id="#{linkPostPhoto}" href="http://photo.blog.sina.com.cn/upload/upload.php">发图片</a>]</span>', "</li>", "<li>", '<span class="tb_ps_nm"><a target="_blank" id="#{linkVBlog}" href="javascript:;"><img class="SG_icon SG_icon16" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" title="播客" align="absmiddle" /><strong>播客</strong></a></span>', '<span class="tb_ps_set">[<a target="_blank" id="#{linkUpload}" href="http://vupload.you.video.sina.com.cn/u.php?m=1">发视频</a>][<a id="#{linkRecord}" href="http://vupload.you.video.sina.com.cn/r.php" target="_blank">录视频</a>]</span>', "</li>", "<li>", '<span class="tb_ps_nm"><a id="#{miniblog}" href="javascript:;" target="_blank"><img class="SG_icon SG_icon51" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" title="微博" align="absmiddle" /><strong>微博</strong></a></span>', "</li>", "<li>", '<span class="tb_ps_nm"><a id="#{mySpace}" href="javascript:;"><img class="SG_icon SG_icon41" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" title="关于我" align="absmiddle" /><strong>关于我</strong></a></span>', "</li>", "</ul>", '<div class="clearit"></div>', "</div>", '<div class="tb_ps_manage">', '<p><a target="_blank" id="#{linkChangeFace}" href="javascript:;">修改头像昵称</a></p>', '<p><a target="_blank" id="#{linkChangePassword}" href="javascript:;">修改登录密码</a></p>', "</div>", "</div>", "</div>", "</div>"].join("");
scope.NicknamePanel = Core.Class.define(function() {
    Lib.Panel.prototype.initialize();
    this.setTemplate(scope.nicknamePanelTemplate)
},
Lib.Panel, {
    initUserInfo: function(b) {
        var a = this.getNodes();
        a.linkBlog.href = "http://blog.sina.com.cn/u/" + b;
        a.linkPhoto.href = "http://photo.blog.sina.com.cn/u/" + b;
        a.linkVBlog.href = "http://you.video.sina.com.cn/m/" + b;
        a.miniblog.href = "http://t.sina.com.cn/" + b + "?source=blog";
        a.mySpace.href = "http://blog.sina.com.cn/s/profile_" + b + ".html";
        a.linkChangeFace.href = "http://control.blog.sina.com.cn/blogprofile/nick.php";
        a.linkChangePassword.href = "http://control.blog.sina.com.cn/blogprofile/password.php"
    }
});
var st = ['<div id="#{panel}" style="z-index:512;" class="tb_layerBox">', "<ul>", '<li id="#{all}" class="bottomline"><a href="javascript:;">综合</a></li>', '<li id="#{blog}"><a href="javascript:;">博文</a></li>', '<li id="#{bauthor}"><a href="javascript:;">博主</a></li>', '<li id="#{album}"><a href="javascript:;">图片</a></li>', '<li id="#{song}"><a href="javascript:;">音乐</a></li>', '<li id="#{video}"><a href="javascript:;">视频</a></li>', '<li id="#{vauthor}" class="bottomline"><a href="javascript:;">播主 </a></li>', '<li id="#{group}"><a href="javascript:;">群组</a></li>', "</ul>", "</div>"];
scope.searchPanelTemplate = st.join("");
scope.SearchPanel = Core.Class.define(function() {
    Lib.Panel.prototype.initialize();
    this.setTemplate(scope.searchPanelTemplate)
},
Lib.Panel, {
    config: {
        all: {
            text: "综合",
            url: "http://uni.sina.com.cn/c.php",
            keyName: "k",
            t: "all",
            s: "",
            ts: "",
            type: "",
            stype: ""
        },
        blog: {
            text: "博文",
            url: "http://uni.sina.com.cn/c.php",
            keyName: "k",
            t: "blog",
            s: "",
            ts: "",
            type: "",
            stype: ""
        },
        bauthor: {
            text: "博主",
            url: "http://uni.sina.com.cn/c.php",
            keyName: "k",
            t: "blog",
            s: "",
            ts: "bauthor",
            type: "",
            stype: ""
        },
        album: {
            text: "图片",
            url: "http://uni.sina.com.cn/c.php",
            keyName: "k",
            t: "album",
            s: "",
            ts: "",
            type: "",
            stype: ""
        },
        song: {
            text: "音乐",
            url: "http://music.sina.com.cn/yueku/search/s.php",
            keyName: "k",
            t: "song",
            s: "",
            ts: "",
            type: "",
            stype: ""
        },
        video: {
            text: "视频",
            url: "http://search.video.sina.com.cn/search.php",
            keyName: "k",
            t: "",
            s: "sup",
            ts: "",
            type: "boke",
            stype: "1"
        },
        vauthor: {
            text: "播主",
            url: "http://search.video.sina.com.cn/search.php",
            keyName: "k",
            t: "",
            s: "sup",
            ts: "",
            type: "boke",
            stype: "3"
        },
        group: {
            text: "群组",
            url: "http://uni.sina.com.cn/c.php",
            keyName: "k",
            t: "group",
            s: "",
            ts: "",
            type: "",
            stype: ""
        }
    }
});
Sina.pkg("Utils.Flash");
if (typeof deconcept == "undefined") {
    var deconcept = new Object()
}
if (typeof deconcept.util == "undefined") {
    deconcept.util = new Object()
}
if (typeof deconcept.SWFObjectUtil == "undefined") {
    deconcept.SWFObjectUtil = new Object()
}
deconcept.SWFObject = function(g, d, o, i, l, n, p, j, a, f) {
    if (!document.getElementById) {
        return
    }
    this.DETECT_KEY = f ? f: "detectflash";
    this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
    this.params = new Object();
    this.variables = new Object();
    this.attributes = new Array();
    if (g) {
        this.setAttribute("swf", g)
    }
    if (d) {
        this.setAttribute("id", d)
    }
    if (o) {
        this.setAttribute("width", o)
    }
    if (i) {
        this.setAttribute("height", i)
    }
    if (l) {
        this.setAttribute("version", new deconcept.PlayerVersion(l.toString().split(".")))
    }
    this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
    if (!window.opera && document.all && this.installedVer.major > 7) {
        deconcept.SWFObject.doPrepUnload = true
    }
    if (n) {
        this.addParam("bgcolor", n)
    }
    var b = p ? p: "high";
    this.addParam("quality", b);
    this.setAttribute("useExpressInstall", false);
    this.setAttribute("doExpressInstall", false);
    var m = (j) ? j: window.location;
    this.setAttribute("xiRedirectUrl", m);
    this.setAttribute("redirectUrl", "");
    if (a) {
        this.setAttribute("redirectUrl", a)
    }
};
deconcept.SWFObject.prototype = {
    useExpressInstall: function(a) {
        this.xiSWFPath = !a ? "expressinstall.swf": a;
        this.setAttribute("useExpressInstall", true)
    },
    setAttribute: function(a, b) {
        this.attributes[a] = b
    },
    getAttribute: function(a) {
        return this.attributes[a]
    },
    addParam: function(a, b) {
        this.params[a] = b
    },
    getParams: function() {
        return this.params
    },
    addVariable: function(a, b) {
        this.variables[a] = b
    },
    getVariable: function(a) {
        return this.variables[a]
    },
    getVariables: function() {
        return this.variables
    },
    getVariablePairs: function() {
        var a = new Array();
        var b;
        var c = this.getVariables();
        for (b in c) {
            a[a.length] = b + "=" + c[b]
        }
        return a
    },
    getSWFHTML: function() {
        var d = "";
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            if (this.getAttribute("doExpressInstall")) {
                this.addVariable("MMplayerType", "PlugIn");
                this.setAttribute("swf", this.xiSWFPath)
            }
            d = '<embed pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" src="' + this.getAttribute("swf") + '" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '"';
            d += ' id="' + this.getAttribute("id") + '" name="' + this.getAttribute("id") + '" ';
            var c = this.getParams();
            for (var a in c) {
                d += [a] + '="' + c[a] + '" '
            }
            var b = this.getVariablePairs().join("&");
            if (b.length > 0) {
                d += "flashvars=" + b + '&realfull=1&moz=1"'
            }
            d += "/>"
        } else {
            if (this.getAttribute("doExpressInstall")) {
                this.addVariable("MMplayerType", "ActiveX");
                this.setAttribute("swf", this.xiSWFPath)
            }
            d = '<object id="' + this.getAttribute("id") + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '" style="' + this.getAttribute("style") + '">';
            d += '<param name="movie" value="' + this.getAttribute("swf") + '" />';
            var c = this.getParams();
            for (var a in c) {
                d += '<param name="' + a + '" value="' + c[a] + '" />'
            }
            var b = this.getVariablePairs().join("&");
            if (b.length > 0) {
                d += '<param name="flashvars" value="' + b + '" />'
            }
            d += "</object>"
        }
        return d
    },
    write: function(a) {
        if (this.getAttribute("useExpressInstall")) {
            var b = new deconcept.PlayerVersion([6, 0, 65]);
            if (this.installedVer.versionIsValid(b) && !this.installedVer.versionIsValid(this.getAttribute("version"))) {
                this.setAttribute("doExpressInstall", true);
                this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl")));
                document.title = document.title.slice(0, 47) + " - Flash Player Installation";
                this.addVariable("MMdoctitle", document.title)
            }
        }
        if (this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version"))) {} else {
            if (this.getAttribute("redirectUrl") != "") {
                document.location.replace(this.getAttribute("redirectUrl"))
            }
        }
        var c = (typeof a == "string") ? document.getElementById(a) : a;
        c.innerHTML = this.getSWFHTML();
        return true
    }
};
deconcept.SWFObjectUtil.getPlayerVersion = function() {
    var c = new deconcept.PlayerVersion([0, 0, 0]);
    if (navigator.plugins && navigator.mimeTypes.length) {
        var a = navigator.plugins["Shockwave Flash"];
        if (a && a.description) {
            c = new deconcept.PlayerVersion(a.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."))
        }
    } else {
        if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) {
            var d = 1;
            var b = 3;
            while (d) {
                try {
                    b++;
                    d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + b);
                    c = new deconcept.PlayerVersion([b, 0, 0])
                } catch(f) {
                    d = null
                }
            }
        } else {
            try {
                var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
            } catch(f) {
                try {
                    var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    c = new deconcept.PlayerVersion([6, 0, 21]);
                    d.AllowScriptAccess = "always"
                } catch(f) {
                    if (c.major == 6) {
                        return c
                    }
                }
                try {
                    d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                } catch(f) {}
            }
            if (d != null) {
                c = new deconcept.PlayerVersion(d.GetVariable("$version").split(" ")[1].split(","))
            }
        }
    }
    return c
};
deconcept.PlayerVersion = function(a) {
    this.major = a[0] != null ? parseInt(a[0]) : 0;
    this.minor = a[1] != null ? parseInt(a[1]) : 0;
    this.rev = a[2] != null ? parseInt(a[2]) : 0
};
deconcept.PlayerVersion.prototype.versionIsValid = function(a) {
    if (this.major < a.major) {
        return false
    }
    if (this.major > a.major) {
        return true
    }
    if (this.minor < a.minor) {
        return false
    }
    if (this.minor > a.minor) {
        return true
    }
    if (this.rev < a.rev) {
        return false
    }
    return true
};
deconcept.util = {
    getRequestParameter: function(d) {
        var c = document.location.search || document.location.hash;
        if (d == null) {
            return c
        }
        if (c) {
            var b = c.substring(1).split("&");
            for (var a = 0; a < b.length; a++) {
                if (b[a].substring(0, b[a].indexOf("=")) == d) {
                    return b[a].substring((b[a].indexOf("=") + 1))
                }
            }
        }
        return ""
    }
};
deconcept.SWFObjectUtil.cleanupSWFs = function() {
    var c = document.getElementsByTagName("OBJECT");
    for (var b = c.length - 1; b >= 0; b--) {
        c[b].style.display = "none";
        for (var a in c[b]) {
            if (typeof c[b][a] == "function") {
                c[b][a] = function() {}
            }
        }
    }
};
if (deconcept.SWFObject.doPrepUnload) {
    if (!deconcept.unloadSet) {
        deconcept.SWFObjectUtil.prepUnload = function() {
            __flash_unloadHandler = function() {};
            __flash_savedUnloadHandler = function() {};
            window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs)
        };
        window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload);
        deconcept.unloadSet = true
    }
}
if (!document.getElementById && document.all) {
    document.getElementById = function(a) {
        return document.all[a]
    }
}
var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject;
Utils.Flash.swfObject = deconcept.SWFObject;
Utils.Flash.swfView = {
    swfList: [],
    Add: function(f, g, b, i, j, d, l, a, c) {
        if (f && b) {
            this.swfList[this.swfList.length] = {
                sURL: f,
                sID: g,
                sPID: b,
                nWidth: i,
                nHeight: j,
                nVersion: d,
                sBGColor: l,
                oVar: a,
                oParam: c
            };
            this.Init();
            return
        }
    },
    Init: function() {
        var j;
        var g = this.swfList;
        for (var d = 0,
        b = g.length; d < b; d++) {
            var f = g[d];
            j = new Utils.Flash.swfObject(f.sURL, f.sPID, f.nWidth, f.nHeight, f.nVersion, f.sBGColor);
            if (f.oVar) {
                for (var c in f.oVar) {
                    j.addVariable(c, f.oVar[c])
                }
            }
            if (f.oParam) {
                for (var a in f.oParam) {
                    j.addParam(a, f.oParam[a])
                }
            }
            j.write(f.sID)
        }
        g = [];
        f = null;
        j = null
    }
};
var st = ['<div style="z-index:512;" class="tb_layer_Y tb_layer_w3" id="#{panel}">', '<div class="tb_layer_arrow"></div>', '<div class="tb_layer_Y_main">', '<div class="tb_msg">', '<div id="#{inboxLoding}" class="tb_loading">', '<img src="http://simg.sinajs.cn/blog7style/images/common/loading.gif"/>', "<p>加载中…</p>", "</div>", '<div id="#{inboxList}" style="display:none;" class="tb_msg_list">', "<ul>", '<li><a id="#{notice}" target="_blank" href="http://control.blog.sina.com.cn/blogprofile/profilenoticelist.php">通知</a><em id="#{noticeCount}"></em></li>', '<li><a id="#{message}" target="_blank" href="http://control.blog.sina.com.cn/blogprofile/profilepaperlist.php?type=1">纸条</a><em id="#{messageCount}"></em></li>', '<li><a id="#{invite}" target="_blank" href="http://control.blog.sina.com.cn/blogprofile/profileinvitelist.php">好友邀请</a><em id="#{inviteCount}"></em></li>', '<li id="#{liBlogComment}"><a target="_blank" id="#{blogComment}" href="http://control.blog.sina.com.cn/blogprofile/profilecommlist.php?type=1">博客评论</a><em id="#{blogCommentCount}"></em></li>', '<li id="#{liPhotoComment}"><a target="_blank" id="#{photoComment}" href="http://control.blog.sina.com.cn/blogprofile/profilecommlist.php?type=2">图片评论</a><em id="#{photoCommentCount}"></em></li>', '<li id="#{liVblogComment}"><a target="_blank" id="#{vblogComment}" href="http://icp.api.sina.com.cn/pubcontrol/index.php?ptype=10">播客评论</a><em id="#{vblogCommentCount}"></em></li>', '<li id="#{liCommentRelapse}"><a target="_blank" id="#{commentRelapse}" href="http://control.blog.sina.com.cn/blogprofile/profilereplylist.php">评论回复</a><em id="#{commentRelapseCount}"></em></li>', '<li><a id="#{guestBook}" target="_blank" href="http://control.blog.sina.com.cn/blogprofile/wall.php">留言</a><em id="#{guestBookCount}"></em></li>', '<li id="#{liGarbageBox}"><a target="_blank" href="http://control.blog.sina.com.cn/blogprofile/profilecommtrash.php" id="#{garbageBox}" href="javascript:;">垃圾箱</a><em id="#{garbageBoxCount}"></em></li>', '<li style="display:none;" id="#{liMail}"><a target="_blank" id="#{mail}" href="javascript:;">邮件提醒</a><em id="#{mailCount}"></em></li>', "</ul>", '<div class="clearit"></div>', "</div>", "</div>", "</div>", "</div>"];
scope.inboxPanelTemplate = st.join("");
Lib.LocalDB = {
    _this: null,
    isFlashReady: false,
    FlaDom: null,
    updataFun: null,
    loadedFun: null,
    scacheReady: function() {
        Lib.LocalDB.isFlashReady = true;
        if (Lib.LocalDB.loadedFun) {
            Lib.LocalDB.loadedFun(Lib.LocalDB._this)
        }
    },
    set: function(a, b) {
        if (this.isFlashReady) {
            try {
                this.FlaDom.setLazyInterface(a, b);
                return true
            } catch(c) {
                trace("set函数出错")
            }
        }
        return false
    },
    get: function(a, b, d) {
        if (this.isFlashReady) {
            try {
                return this.FlaDom.getLazyInterface(a, b, d)
            } catch(c) {
                trace("get函数出错")
            }
        }
        return false
    },
    clearCache: function(b, a) {
        if (this.isFlashReady) {
            try {
                $E("scache").clearCache(b, a)
            } catch(c) {
                trace("gclearCache函数出错")
            }
        }
        return false
    },
    loadFlash: function(b) {
        if (!this.FlaDom) {
            var a = new Utils.Flash.swfObject($_GLOBAL.flashBasicURL + "scache.swf?" + Core.Math.getUniqueId(), "scache", "1", "1", "9", "#00ff00");
            a.addParam("quality", "high");
            a.addParam("wmode", "transparent");
            a.addParam("allowScriptAccess", "always");
            a.write(b);
            this.FlaDom = $E("scache")
        }
    },
    getServer: function() {
        try {
            return this.FlaDom.isServer()
        } catch(a) {
            trace("判断是否是通信主机发生错误");
            return false
        }
    },
    login: function(a) {
        try {
            this.FlaDom.login(a)
        } catch(b) {
            trace("login函数出错");
            trace(a)
        }
    },
    sendToClient: function(a) {
        try {
            if (this.getServer()) {
                this.FlaDom.sendToClient(a)
            } else {}
        } catch(b) {
            trace("sendToClient函数出错")
        }
    },
    setClientJsFun: function(a) {
        try {
            if (this.getServer()) {
                this.FlaDom.setClientJsFun(a)
            } else {
                trace("非主机不可以设置接收函数")
            }
        } catch(b) {
            trace("setClientJsFun函数出错")
        }
    },
    receive: function(a) {
        this.updataFun(a)
    }
};
scope.InboxPanel = Core.Class.define(function() {
    Lib.Panel.prototype.initialize();
    this.setTemplate(scope.inboxPanelTemplate);
    this.nodes = this.getNodes();
    var a = this;
    setTimeout(function() {
        var b = Lib.LocalDB;
        if (!b.FlaDom) {
            b._this = a;
            b.loadedFun = a.FlashLoaded;
            b.loadFlash("trayFlashConnetion")
        } else {
            trace("Flash在托盘前面加载好了哦，谁干的？");
            a.FlashLoaded(a)
        }
    },
    5000);
    this.interfaceMessages = new Interface("http://control.blog.sina.com.cn/riaapi/profile/unread.php", "jsload")
},
Lib.Panel, {
    nodes: null,
    _connectSWF: null,
    _SWFChannelName: "inboxConnection",
    interfaceMessges: null,
    isMailLoaded: false,
    isMessageLoaded: false,
    isUICServiceLoaded: false,
    isHaveNewMessage: false,
    _listData: null,
    _mailData: null,
    _uicService: null,
    _productIDs: {
        blog: 1,
        vblog: 2,
        group: 4,
        photo: 8,
        cube: 16
    },
    interfaceMailURL: "http://hint.sinamail.sina.com.cn/mailproxy/mail.php",
    interfaceUICServiceURL: "http://uic.sinajs.cn/uic?type=service&uids=#{uids}&varname=service",
    createConnectSWF: function() {
        var c = this;
        try {
            Utils.Flash.swfView.Add($_GLOBAL.flashBasicURL + "share_connect.swf", "trayFlashConnetion", "connectSWF", "1", "1", "8", "#ffffff", {},
            {
                allowScriptAccess: "always",
                wmode: "transparent"
            });
            Utils.Flash.swfView.Init();
            this._connectSWF = $E("connectSWF")
        } catch(a) {}
        var b = 0; (function() {
            try {
                if (!c._connectSWF.register && b++<5) {
                    setTimeout(arguments.callee, 1000)
                } else {
                    window.$registSWFInfo = function() {
                        try {
                            window.$updateData = function(i) {
                                c.updateData(i)
                            };
                            var f = c._connectSWF.getServer(c._SWFChannelName);
                            c._connectSWF.send(c._SWFChannelName, f, "$updateData")
                        } catch(g) {}
                    };
                    c._connectSWF.register({
                        channel_name: c._SWFChannelName,
                        callback_function: "$registSWFInfo"
                    })
                }
            } catch(d) {}
        })()
    },
    FlashLoaded: function(b) {
        trace("Flash加载好了哦");
        var a = Lib.LocalDB;
        var c = b;
        window.$updateData = function(d) {
            c.updateData(d)
        };
        Lib.checkAuthor();
        a.login($UID);
        a.setClientJsFun("$updateData")
    },
    requestDataInterface: function() {
        var a = this;
        this.updateView("loading");
        Lib.checkAuthor();
        this.interfaceMessages.request({
            GET: {
                uid: $UID,
                product: "blog"
            },
            onSuccess: function(c) {
                a.isMessageLoaded = true;
                a.onMessageLoad(c.nickname);
                a._listData = c;
                scope.unreadMsg = c;
                scope.nickname = c.nickname;
                trace("tipremind:加载到这里" + c.remind);
                if (c.nfn == 1 || c.remind == 1) {
                    a.initNewStatusTip(c)
                } else {
                    var b = $E("newStatusTip");
                    if (b) {
                        b.style.display = "none"
                    }
                }
                a.updateListData(c);
                if (a.isMailLoaded && a.isMessageLoaded && a.isUICServiceLoaded) {
                    a.updateData({
                        data: a._listData,
                        sinamailinfo: a._mailData
                    });
                    a.onLoaded()
                }
            },
            onError: function(b) {},
            onFail: function() {}
        })
    },
    initNewStatusTip: function(f) {
        if (scope.$pageid == "profile_index" || scope.$pageid == "pageSetM") {
            return
        }
        var d = $E("newStatusTip");
        if (d) {
            return
        }
        d = $C("div");
        d.id = "newStatusTip";
        d.className = "tb_layer_Y tb_layer_w3";
        d.style.width = "138px";
        d.innerHTML = scope.newStatusTipTemplay;
        var b = $T($E("loginBarCenter"), "a")[0];
        var g = Core.Dom.getXY(b);
        d.style.left = (g[0] - (138 / 2 - b.offsetWidth / 2)) + "px";
        d.style.top = (g[1] + b.offsetHeight) + "px";
        d.style.zIndex = "511";
        if (b.href.indexOf("?") == -1) {
            b.href += "?type=2&from=" + scope.$pageid
        }
        Core.Dom.opacity(d, 0);
        document.body.appendChild(d);
        if (f.nfn == 1) {
            $E("nstFeed").style.display = "block"
        }
        if (f.remind == 1) {
            $E("nstFavorite").style.display = "block"
        }
        for (var c = 1; c <= 500; c++) { (function(a) {
                setTimeout(function() {
                    Core.Dom.opacity(d, a * 2 / 10)
                },
                a * 2)
            })(c)
        }
        if (scope.$pageid == "editor") {
            b.target = "_blank";
            $E("nstFeed").parentNode.target = "_blank";
            $E("nstFavorite").parentNode.target = "_blank";
            Core.Events.addEvent(b, this.closeTip(b), "click")
        }
    },
    closeTip: function(a) {
        return function() {
            $E("newStatusTip").style.display = "none";
            a.href = a.href.split("?")[0]
        }
    },
    requestMail: function() {
        var a = this;
        Utils.Io.JsLoad.request(this.interfaceMailURL + "?" + (new Date()).getTime(), {
            onComplete: function() {
                a.isMailLoaded = true;
                if (typeof(sinamailinfo) != "undefined") {
                    a._mailData = sinamailinfo;
                    a.updateMailData(sinamailinfo)
                }
                if (a.isMailLoaded && a.isMessageLoaded && a.isUICServiceLoaded) {
                    a.updateData({
                        data: a._listData,
                        sinamailinfo: a._mailData
                    });
                    a.onLoaded()
                }
            }
        })
    },
    updateData: function(a) {
        var c = Lib.LocalDB;
        var f = this;
        f.updateView("loaded");
        Lib.checkAuthor();
        try {
            if (($UID && $UID == a.uid) || c.getServer() == true) {
                f.isHaveNewMessage = false;
                f.isMailLoaded = false;
                f.isMessageLoaded = false;
                f.isUICServiceLoaded = false;
                trace("获取数据啦，更新");
                f.updateListData(a.data);
                f.updateMailData(a.sinamailinfo);
                if (a.data.nfn == 1) {
                    f.initNewStatusTip()
                } else {
                    var d = $E("newStatusTip");
                    if (d) {
                        d.style.display = "none"
                    }
                }
            }
        } catch(b) {}
        if (c.getServer() == true) {
            trace("向client发送数据ing……");
            Lib.checkAuthor();
            c.sendToClient({
                data: a.data,
                sinamailinfo: a.sinamailinfo,
                uid: $UID
            });
            setTimeout(function() {
                trace("轮询中ing………………");
                f.requestUICService();
                f.requestDataInterface();
                f.requestMail()
            },
            60000 * 4)
        } else {
            trace("client 随时准备成为 server 调用接口");
            setTimeout(function() {
                if (c.getServer()) {
                    trace("本页面已从client--》sever啦");
                    c.setClientJsFun("$updateData");
                    f.requestUICService();
                    f.requestDataInterface();
                    f.requestMail()
                }
            },
            60000 * 4)
        }
    },
    updateMailData: function(a) {
        var b = a.email.replace(/\s/g, "") != "";
        this.nodes.liMail.style.display = b ? "": "none";
        if (b) {
            this.nodes.mailCount.innerHTML = this._getFormatCountString(a.unreadmail);
            this.nodes.mail.href = a.url
        }
        if (parseInt(a.unreadmail) > 0) {
            this.isHaveNewMessage = true
        }
    },
    initializeList: function() {
        this.requestUICService();
        this.requestDataInterface();
        this.requestMail()
    },
    updateListData: function(c) {
        this.nodes.noticeCount.innerHTML = this._getFormatCountString(c.notice);
        this.nodes.inviteCount.innerHTML = this._getFormatCountString(c.invite);
        this.nodes.messageCount.innerHTML = this._getFormatCountString(c.message);
        Lib.checkAuthor();
        this.nodes.guestBookCount.innerHTML = this._getFormatCountString(c.gbook);
        if (parseInt(c.trashcomment) > 0) {
            this.nodes.garbageBoxCount.innerHTML = "*"
        } else {
            this.nodes.garbageBoxCount.innerHTML = ""
        }
        var g = this._uicService[$UID];
        if (parseInt(this._productIDs.blog & parseInt(g, 16)) == parseInt(this._productIDs.blog)) {
            this.nodes.liBlogComment.style.display = "";
            this.nodes.blogCommentCount.innerHTML = this._getFormatCountString(c.blogcomment)
        } else {
            this.nodes.liBlogComment.style.display = "none"
        }
        if (parseInt(this._productIDs.photo & parseInt(g, 16)) == parseInt(this._productIDs.photo)) {
            this.nodes.liPhotoComment.style.display = "";
            this.nodes.photoCommentCount.innerHTML = this._getFormatCountString(c.photocomment)
        } else {
            this.nodes.liPhotoComment.style.display = "none"
        }
        if (parseInt(this._productIDs.vblog & parseInt(g, 16)) == parseInt(this._productIDs.vblog)) {
            this.nodes.liVblogComment.style.display = "";
            this.nodes.vblogCommentCount.innerHTML = this._getFormatCountString(c.vblogcomment)
        } else {
            this.nodes.liVblogComment.style.display = "none"
        }
        if (parseInt(this._productIDs.blog & parseInt(g, 16)) == parseInt(this._productIDs.blog)) {
            this.nodes.liCommentRelapse.style.display = "";
            this.nodes.commentRelapseCount.innerHTML = this._getFormatCountString(c.blogrecomment)
        } else {
            this.nodes.liCommentRelapse.style.display = "none"
        }
        var d, f = ["notice", "invite", "message", "blogcomment", "blogrecomment", "photocomment", "trashcomment", "vblogcomment", "gbook"],
        a = f.length;
        for (d = 0; d < a; d++) {
            if (parseInt(c[f[d]]) > 0) {
                this.isHaveNewMessage = true
            }
        }
        var b;
        for (b in c) {
            if (b != "version" && window.parseInt(c[b]) > 0) {
                if ($E("left_" + b)) {
                    $E("left_" + b).innerHTML = "(" + c[b] + ")"
                }
            }
        }
    },
    requestUICService: function() {
        var a = this;
        Lib.checkAuthor();
        Utils.Io.JsLoad.request(this.interfaceUICServiceURL.replace(/#\{uids\}/, $UID), {
            onComplete: function(b) {
                a.isUICServiceLoaded = true;
                a._uicService = b || service;
                if (a.isMailLoaded && a.isMessageLoaded && a.isUICServiceLoaded) {
                    a.updateData({
                        data: a._listData,
                        sinamailinfo: a._mailData
                    });
                    a.onLoaded()
                }
            }
        })
    },
    _getFormatCountString: function(b) {
        var a = "";
        if (!isNaN(parseInt(b)) && parseInt(b) != 0) {
            if (parseInt(b) > 500) {
                a = "(<strong>500+</strong>)"
            } else {
                a = "(<strong>" + b + "</strong>)"
            }
        }
        return a
    },
    updateView: function(a) {
        this.nodes.inboxLoding.style.display = a == "loaded" ? "none": "";
        this.nodes.inboxList.style.display = a == "loaded" ? "": "none"
    },
    onLoaded: function() {},
    onMessageLoad: function() {}
});
scope.addArticleTemplate = ['<div id="#{panel}" class="wrtBlog_sub" style="z-index:512;">', '<div class="wrtBlog_sub2">', '<p><img class="SG_icon SG_icon18" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" title="发照片" align="absmiddle" /><a target="_blank" href="http://photo.blog.sina.com.cn/upload/upload.php">发照片</a></p>', '<div class="SG_j_linedot"></div>', '<p><img class="SG_icon SG_icon16" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" title="发视频" align="absmiddle" /><a target="_blank" href="http://vupload.you.video.sina.com.cn/u.php?m=1">发视频</a></p>', "</div>", "</div>"].join("");
scope.addArticlePanel = Core.Class.define(function() {
    Lib.Panel.prototype.initialize();
    this.setTemplate(scope.addArticleTemplate);
    this.hidden()
},
Lib.Panel, {});
Lib.PlatformTrayPlus = Core.Class.create();
Lib.PlatformTrayPlus.prototype = {
    tray: null,
    subPanels: [],
    trayLogin: null,
    initialize: function() {},
    load: function(a) {
        switch (a) {
        case "login":
            this.render(scope.trayPlusTemplayLogin);
            this.setNodesMouseHoverStyle(["loginBarOptApp", "loginBarCenter", "loginBarFriend", "loginBarInbox"]);
            this.initNicknamePanel();
            this.initInboxPanel();
            break;
        case "logout":
            this.trayLogin = new Lib.Login.Ui();
            this.render(scope.trayPlusTemplayLogout);
            this.initLogin();
            this.initPopularize();
            break
        }
        this.initAddArticlePanel();
        this.initSearchPanel()
    },
    render: function(a) {
        $E("trayContainer").innerHTML = a
    },
    initLogin: function() {
        var a = this;
        Core.Events.addEvent($E("linkTrayLogin"),
        function() {
            a.trayLogin.login(null, false, "referer:" + location.hostname + location.pathname + ",func:0007")
        },
        "click");
        $E("linkReg").href = "http://login.sina.com.cn/signup/signup.php?entry=blog&srcuid=" + scope.$uid + "&src=blogicp"
    },
    initPopularize: function() {
        $E("divPopularize").innerHTML = $_GLOBAL.popularizeConfig.content
    },
    setNodesMouseHoverStyle: function(c) {
        var b, a = c.length;
        for (b = 0; b < a; b++) {
            Core.Events.addEvent($E(c[b]), (function(d) {
                return function() {
                    $E(c[d]).className = "link current"
                }
            })(b), "mouseover");
            Core.Events.addEvent($E(c[b]), (function(d) {
                return function() {
                    $E(c[d]).className = "link"
                }
            })(b), "mouseout")
        }
    },
    initNicknamePanel: function() {
        var a = new scope.NicknamePanel();
        Lib.checkAuthor();
        a.initUserInfo($UID);
        this.addSubPanel(a, $E("loginBarOptApp"), -98, -9)
    },
    initInboxPanel: function() {
        var a = new scope.InboxPanel();
        this.addSubPanel(a, $E("loginBarInbox"), -68, -9);
        a.initializeList();
        a.onLoaded = function() {
            $E("imgNewMessage").style.display = this.isHaveNewMessage ? "": "none"
        };
        a.onMessageLoad = function(b) {
            $E("loginBarAppMenuLabel").innerHTML = Core.System.htmlFilter(b)
        }
    },
    initAddArticlePanel: function() {
        var a = new scope.addArticlePanel();
        this.addSubPanel(a, $E("arrowAddArticle"), -81, 0)
    },
    initSearchPanel: function() {
        var b = new scope.SearchPanel();
        this.addSubPanel(b, $E("searchSelect"), -69, -3);
        Utils.Form.limitMaxLen($E("loginBarSearchInput"), 50);
        var c = b.getNodes();
        var a;
        for (a in b.config) { (function(f) {
                Core.Events.addEvent(c[f],
                function() {
                    d(f)
                },
                "click")
            })(a)
        }
        d("blog");
        function d(f) {
            $E("loginBarSearchForm").action = b.config[f]["url"];
            $E("loginBarSearchMenuLabel").innerHTML = c[f].getElementsByTagName("a")[0].innerHTML;
            $E("loginBarSearchT").value = b.config[f]["t"];
            $E("loginBarSearchS").value = b.config[f]["s"];
            $E("loginBarSearchTS").value = b.config[f]["ts"];
            $E("loginBarSearchType").value = b.config[f]["type"];
            $E("loginBarSearchSType").value = b.config[f]["stype"];
            $E("loginBarSearchInput").name = b.config[f]["keyName"]
        }
    },
    addSubPanel: function(a, d, c, b) {
        var g = this;
        this.subPanels.push(a);
        function f() {
            Core.Events.stopEvent();
            var l, j = g.subPanels.length;
            for (l = 0; l < j; l++) {
                g.subPanels[l].hidden()
            }
            a.showWithDom(d, c, b)
        }
        Core.Events.addEvent(d,
        function() {
            f()
        },
        "click");
        Core.Events.addEvent(document.body,
        function() {
            a.hidden()
        },
        "click");
        Core.Events.addEvent(a.entity,
        function() {
            Core.Events.stopEvent()
        },
        "mousedown")
    }
};
$registJob("tray",
function() {
    Lib.checkAuthor();
    var a = new Lib.PlatformTrayPlus();
    if ($isLogin) {
        a.load("login")
    } else {
        a.load("logout")
    }
    window.$tray = {};
    window.$tray.renderLogin = function() {
        Lib.checkAuthor();
        if ($isLogin) {
            a.load("login")
        }
    };
    window.$tray.renderLogout = function() {
        a.load("logout")
    }
});
Lib.include = function(jsfile, handle, _charset) {
    var ja = new Array();
    var jsHash = {};
    if (typeof jsfile == "string") {
        ja.push(jsfile)
    } else {
        ja = jsfile.slice(0)
    }
    var ua = navigator.userAgent.toLowerCase();
    var isIE = /msie/.test(ua);
    var isOpera = /opera/.test(ua);
    var isMoz = /firefox/.test(ua);
    for (var i = 0; i < ja.length; i++) {
        jsHash["j" + i] = false;
        jsHash["count_" + i] = 0;
        var js = $C("script");
        js.type = "text/javascript";
        if (_charset != null && _charset == "gb2312") {
            js.charset = _charset
        }
        js.src = ja[i];
        js.id = "j" + i;
        if (isIE) {
            js.onreadystatechange = function() {
                if (this.readyState.toLowerCase() == "complete" || this.readyState.toLowerCase() == "loaded") {
                    jsHash[this.id] = true
                }
            }
        }
        if (isMoz) {
            js.onload = function() {
                jsHash[this.id] = true
            }
        }
        if (isOpera) {
            jsHash["j" + i] = true
        }
        document.body.appendChild(js)
    }
    var loadTimer = setInterval(function() {
        for (var i = 0; i < ja.length; i++) {
            if (jsHash["count_" + i] < 5) {
                if (jsHash["j" + i] == false) {
                    jsHash["count_" + i]++;
                    return
                }
            } else {
                continue
            }
        }
        clearInterval(loadTimer);
        eval(handle)()
    },
    100)
};
Lib.insertMoban = function() {
    if (scope.tpl && scope.tpl != "" && (scope.tpl.split("_")[0] == "13" || $_GLOBAL.flashtemplate[scope.tpl])) {
        Lib.insertMobanFunc(scope.tpl)
    }
};
Lib.insertMobanFunc = function(f) {
    var d = $E("headflash");
    if (d) {
        d.innerHTML = "";
        d.style.display = "";
        var c = "http://simg.sinajs.cn/blog7newtpl/css/" + f.split("_")[0] + "/" + f + "/top.swf";
        var b = 266;
        if ($_GLOBAL.flashtemplate[f].height) {
            b = $_GLOBAL.flashtemplate[f].height
        }
        trace("flash height=" + b);
        var a = Utils.Flash.swfView.Add(c, "headflash", "headflash_f", "950", b, "9.0.0.0", "#000", {},
        {
            allowScriptAccess: "false",
            wmode: "transparent",
            allowFullScreen: "false"
        })
    }
};
Lib.tplFuncArr = {};
Lib.tplFuncCount = 0;
Lib.getTplNum = function(l) {
    Lib.tplFuncArr[Lib.tplFuncCount++] = l ||
    function() {};
    if ($isAdmin && scope.tpl && scope.tpl != "") {
        for (var a in Lib.tplFuncArr) {
            Lib.tplFuncArr[a]();
            Lib.tplFuncArr[a] = null;
            delete Lib.tplFuncArr[a]
        }
        return
    } else {
        if ($IE) {
            var f = document.styleSheets;
            var j = /\S*(blog7tpl([^t]*))\S*/gi;
            var b = /\S*(blog7newtpl\/css([^t]*))\S*/gim;
            for (var d = 0; d < f.length; d++) {
                if (f[d].id == "uid_link_css") {
                    var c = j.exec(f[d].cssText);
                    var g = b.exec(f[d].cssText);
                    if (c != null || g != null) {
                        if (c != null) {
                            scope.tpl = c[2].split("/")[2]
                        } else {
                            if (g != null) {
                                scope.tpl = g[2].split("/")[2]
                            }
                        }
                        for (var a in Lib.tplFuncArr) {
                            Lib.tplFuncArr[a]();
                            Lib.tplFuncArr[a] = null;
                            delete Lib.tplFuncArr[a]
                        }
                    }
                    break
                }
            }
        } else {
            if (!$IE && scope.$PRODUCT_NAME == "blog7") {
                Utils.Io.Ajax.request("http://blog.sina.com.cn/s/" + scope.$uid + ".css?", {
                    onComplete: function(q) {
                        q = q.replace("\n", "");
                        var p = /\S*(blog7tpl([^t]*))\S*/gim;
                        var m = /\S*(blog7newtpl\/css([^t]*))\S*/gim;
                        var n = p.exec(q);
                        var o = m.exec(q);
                        if (n != null || o != null) {
                            if (n != null) {
                                scope.tpl = n[2].split("/")[2]
                            } else {
                                if (o != null) {
                                    scope.tpl = o[2].split("/")[2]
                                }
                            }
                            for (var i in Lib.tplFuncArr) {
                                Lib.tplFuncArr[i]();
                                Lib.tplFuncArr[i] = null;
                                delete Lib.tplFuncArr[i]
                            }
                        }
                    }.bind2(this),
                    returnType: "txt"
                })
            } else {
                if (!$IE && scope.$PRODUCT_NANM != "blog7") {
                    Lib.include("http://blog.sina.com.cn/s/" + scope.$uid + ".js?" + new Date().getTime(),
                    function() {
                        for (var i in Lib.tplFuncArr) {
                            Lib.tplFuncArr[i]();
                            Lib.tplFuncArr[i] = null;
                            delete Lib.tplFuncArr[i]
                        }
                    }.bind2(this))
                }
            }
        }
    }
};
$registJob("timePad",
function() {
    Lib.checkAuthor();
    if ($isAdmin) {
        a()
    } else {
        Lib.getTplNum(a)
    }
    function a() {
        var m = $E("auto_time");
        var n = $E("auto_time2");
        if (m && n) {
            var p = $T(m, "span")[0];
            var o = $T(m, "span")[1];
            var q = $T(n, "span")[0];
            var f = $T(n, "span")[1];
            var c;
            var d = $_GLOBAL.timePad_conf[scope.tpl] ? $_GLOBAL.timePad_conf[scope.tpl].timePoint: "";
            var b = scope.$pageid == "pageSetM" ? true: false;
            if (!d && !b) {
                return
            }
            function r() {
                if (b) {
                    p.innerHTML = o.innerHTML = q.innerHTML = f.innerHTML = "？";
                    return
                }
                var t = g();
                if (t >= 0) {
                    var u = j(t);
                    var s = i(t - j(t) * 3600000 * 24);
                    p.innerHTML = u > 9 ? u: "0" + u;
                    o.innerHTML = s > 9 ? s: "0" + s
                } else {
                    var u = j( - t);
                    var s = i( - t - j( - t) * 3600000 * 24);
                    q.innerHTML = u > 9 ? u: "0" + u;
                    f.innerHTML = s > 9 ? s: "0" + s
                }
            }
            function j(s) {
                return Math.floor(s / 3600 / 24 / 1000)
            }
            function i(s) {
                return Math.floor(s / 3600 / 1000)
            }
            function g() {
                return new Date(d) - new Date()
            }
            function l() {
                r();
                clearInterval(c);
                c = setInterval(function() {
                    r()
                },
                60 * 1000)
            }
            if (g() < 0) {
                m.style.display = "none";
                n.style.display = "block"
            } else {
                m.style.display = "";
                n.style.display = "none"
            }
            scope.$startAutoTime = l;
            scope.$stopAutoTime = function() {
                clearInterval(c)
            };
            scope.$startAutoTime()
        }
    }
});
$registJob("login",
function() {
    var a = new Lib.Login.Ui();
    Core.Events.addEvent("loginbtn",
    function() {
        a.login(function() {
            alert("做一些，登陆之后，做的事情，呵呵！")
        })
    })
});
$registJob("getTplNum",
function() {});
Utils.limitLength = function(a, b) {
    var c;
    var d = function() {
        c = a.value;
        var f = Core.String.byteLength(c);
        if (f > b) {
            a.value = Core.String.leftB(c, b)
        }
    };
    Core.Events.addEvent(a, Core.Function.bind3(d, a), "keyup");
    Core.Events.addEvent(a, Core.Function.bind3(d, a), "blur");
    Core.Events.addEvent(a, Core.Function.bind3(d, a), "focus")
};
Comment.Delete = Core.Class.create();
Comment.Delete.prototype = {
    articleid: 0,
    commentid: 0,
    initialize: function() {},
    del: function(a) {
        this.commentid = a;
        this.del_url = new Interface("http://control.blog.sina.com.cn/admin/comment/comment_del_post.php", $IE6 ? "ijax": "jsload");
        this.del_url.request({
            GET: {
                comment_id: this.articleid + "|" + this.commentid,
                page_id: scope.$comment_page || 1,
                uid: $UID
            },
            onSuccess: function(d) {
                scope.$totle_comment--;
                trace("删除评论成功");
                $E("c_" + scope.$articleid).innerHTML = "(" + scope.$totle_comment + ")";
                var f = $E("cmt_" + this.commentid);
                var c = new Ui.Slide(f);
                c.onSlideOut = function() {
                    Core.Dom.removeNode(f.parentNode)
                };
                c.slideOut();
                if (scope.$totle_comment == 0) {
                    var b = $C("li");
                    b.className = "CP_litem";
                    b.innerHTML = '<div class="CP_cmt_none">暂无评论。</div>';
                    $E("article_comment_list").appendChild(b)
                } else {
                    trace(">>>>" + $T($E("article_comment_list"), "li").length);
                    if ($T($E("article_comment_list"), "li").length == 1) {
                        scope.$comment_page--;
                        new Comment.List().load(scope.$comment_page)
                    }
                }
                trace("删除后的当前页：scope.$comment_page=" + scope.$comment_page);
                trace("删除后的总数：scope.$totle_comment=" + scope.$totle_comment);
                Comment.paging(scope.$totle_comment, scope.$comment_page)
            }.bind2(this),
            onError: function(b) {
                trace("删除评论返回状态码：" + b.code);
                showError(b.code)
            }.bind2(this),
            onFail: function() {
                trace("删除失败！请重试。");
                winDialog.alert("删除失败！请重试。", {
                    icon: "02"
                })
            }.bind2(this)
        })
    }
};
Core.Dom.getChildrenByClass = function(j, g) {
    var b = [];
    var f = j.childNodes || j.children;
    var g = " " + g + " ";
    var a = f.length;
    for (var d = 0; d < a; ++d) {
        var l = f[d];
        var c = " " + l.className + " ";
        if (c.indexOf(g) != -1) {
            b[b.length] = l
        }
    }
    return b
};
Core.String.decodeHTML = function(a) {
    var b = document.createElement("div");
    b.innerHTML = a;
    return b.innerText == undefined ? b.textContent: b.innerText
};
Comment.Reply = Core.Class.create();
Comment.Reply.prototype = {
    articleid: 0,
    comment_id: 0,
    initialize: function() {
        this.articleid = scope.$articleid
    },
    reply: function(a) {
        if ($E("reply_form")) {
            return
        }
        var g = this;
        this.comment_id = a;
        var d = $C("div");
        d.className = "SG_revert_Answer";
        d.id = "reply_form";
        d.innerHTML = this.reply_struc;
        var f = $E("cmt_" + this.comment_id);
        this.cont = Core.Dom.getChildrenByClass(f, "SG_revert_Cont")[0];
        this.cont.appendChild(d);
        this.reply_slide = new Ui.Slide("reply_form", {
            opacity: true
        });
        this.reply_slide.onSlideOut = function() {
            Core.Events.removeEvent("reply_btn", c);
            Core.Events.removeEvent("reply_cancel", j);
            Core.Dom.removeNode("reply_form")
        };
        var b = function() {
            var n = $E("reply_txt").value;
            var m = 2000;
            if (Core.String.byteLength(n) > m) {
                $E("words_num").innerHTML = "0"
            } else {
                $E("words_num").innerHTML = Math.floor((m - Core.String.byteLength(n)) / 2)
            }
        };
        var i = [($IE ? -321 : -319), 38 + ($IE ? -1 : 3)];
        var l = {
            interval: {
                after: function(p, o) {
                    scope.commEditor.handleChange(p);
                    var n = 2000;
                    var q = o.value;
                    var m = 1000;
                    if (q != "\n" && q != "\u000D\u000A") {
                        m = Math.floor((n - Core.String.byteLength(q)) / 2)
                    }
                    if (m >= 0) {
                        $E("words_num").innerHTML = m;
                        $E("words_num2").parentNode.style.display = "none";
                        $E("words_num").parentNode.style.display = ""
                    } else {
                        $E("words_num2").innerHTML = ( - 1) * m;
                        $E("words_num2").parentNode.style.display = "";
                        $E("words_num").parentNode.style.display = "none"
                    }
                }
            }
        };
        App.formInsertSmile2("reply_txt", "reply_smile", null, b, "reply_smile", i, "replayIframe", l);
        this.reply_slide.hide();
        this.reply_slide.slideIn();
        Core.Events.addEvent("reply_btn", c);
        Core.Events.addEvent("reply_cancel", j);
        this.reply_btn = this.getReplyButton(a);
        this.reply_btn.style.display = "none";
        function c() {
            g.post.bind2(g)()
        }
        function j() {
            g.reply_slide.slideOut();
            g.reply_btn.style.display = ""
        }
        if ($IE) {
            Core.Events.addEvent($E("reply_txt"),
            function() {
                var m = $E("reply_txt").value;
                var n = Core.String.byteLength(m);
                if (n > 2000) {
                    $E("reply_txt").value = Core.String.leftB(m, 2000)
                }
            },
            "blur")
        } else {
            Utils.limitLength($E("reply_txt"), 2000)
        }
    },
    post: function() {
        var a = new Interface("http://control.blog.sina.com.cn/admin/comment/comment_reply_post.php", "ijax");
        var b = {};
        b.comment_id = this.comment_id;
        scope.commEditor.handleChange("replayIframe");
        b.reply_content = $E("reply_txt").value;
        if (Core.String.trim(b.reply_content) == "") {
            showError("B36041");
            return
        }
        b.article_id = this.articleid;
        a.request({
            POST: b,
            onSuccess: function(d) {
                this.reply_slide.slideOut();
                var m = {
                    reply_time: Comment.formatTime(),
                    reply_id: this.comment_id,
                    reply_txt: Core.String.encodeHTML(b.reply_content)
                };
                var i = b.reply_content.replace(/\r\n|\n/gi, "###line-return###");
                i = Core.String.encodeHTML(i);
                var l = /\[emoticons=(E___\w*)\]([^[]*)\[\/emoticons\]/gi;
                var f = '<img src="http://www.sinaimg.cn/uc/myshow/blog/misc/gif/$1T.gif" style="margin:1px;cursor:pointer;" onclick="window.open(\'http://control.blog.sina.com.cn/admin/myshow/myshow.php?code=$1\')" border="0" title="$2" />';
                i = i.replace(l, f);
                i = i.replace(/###line-return###/gi, "<br/>");
                m.reply_txt = i;
                var g = new Ui.Template(this.reply_display_struc);
                var j = $C("div");
                j.innerHTML = g.evaluate(m);
                this.cont.appendChild(j)
            }.bind2(this),
            onError: function(c) {
                showError(c.code)
            }.bind2(this),
            onFail: function() {
                windowDialog.alert("发评论失败！请重试。", {
                    icon: "02"
                })
            }.bind2(this)
        })
    },
    del: function(a) {
        var c = new Interface("http://control.blog.sina.com.cn/admin/comment/comment_del_reply_post.php", $IE6 ? "ijax": "jsload");
        var b = {
            comment_id: this.articleid + "|" + a,
            page_id: scope.$comment_page,
            uid: $UID
        };
        c.request({
            GET: b,
            onSuccess: function(g) {
                var f = this.getReplyButton(a);
                f.style.display = "";
                var i = $E("reply_" + a);
                var d = new Ui.Slide(i);
                d.onSlideOut = function() {
                    Core.Dom.removeNode(i.parentNode)
                };
                d.slideOut()
            }.bind2(this),
            onError: function(d) {
                showError(d.code)
            }.bind2(this),
            onFail: function() {
                windowDialog.alert("删除失败！请重试。", {
                    icon: "02"
                })
            }
        })
    },
    getReplyButton: function(b) {
        var a = Core.Dom.getElementsByClass($E("cmt_" + b), "a", "CP_a_fuc");
        return Core.Array.foreach(a,
        function(c) {
            if (/回复/.test(c.innerHTML)) {
                return c
            }
        })[0]
    },
    getTime: function() {},
    reply_struc: '		<!--<div class="SG_revert_Answer" id="reply_form">-->			<div class="SG_revert_Answer_Top">				<span class="SG_floatL">回复：</span>				<div class="faceblk SG_floatR"><div id="reply_smile" class="faceline1"></div><div class="clearit"></div></div>			</div>			<div class="SG_revert_Answer_right">				<textarea style="display:none" class="SG_textarea" id="reply_txt"></textarea>				<iframe frameBorder="0" style="height: 74px; background-color: #FFFFFF; border: 1px solid #C7C7C7; width: 517px;*width: 519px;" src="http://blog.sina.com.cn/main_v5/ria/blank.html" id="replayIframe"></iframe>				<div class="SG_revert_Btn">				<div class="SG_revert_Btn_left">					<span><a href="#" onclick="return false;" id="reply_btn" class="SG_aBtn"><cite>回复</cite></a></span>					<span><a href="#" onclick="return false;" id="reply_cancel" class="SG_aBtn"><cite>取消</cite></a></span>					<span class="SG_txtb">还可以输入<b id="words_num" style="font-weight:400;">1000</b>个汉字</span>					<span style="display:none;color:red" class="SG_txtb">已超过<b id="words_num2" style="font-weight:400;">0</b>个汉字</span>				</div>				</div>			</div>		<!--</div>-->	',
    reply_display_struc: '		<div class="SG_revert_Re SG_j_linedot1" id="reply_#{reply_id}">			<p>				<span class="SG_floatL"><a href="#"class="SG_linka" >博主回复：</a></span>				<span class="SG_floatR">					<em class="SG_txtc">#{reply_time}</em>					<a class="CP_a_fuc" href="#" onclick="del_reply(#{reply_id});return false;">[<cite>删除</cite>]</a>				</span>			</p>			<p class="myReInfo wordwrap">#{reply_txt}</p>		</div>	'
};
$registJob("articleCommentManager",
function() {
    var b = new Comment.Delete();
    b.articleid = scope.$articleid;
    window.del_comment = function(c) {
        b.del.bind2(b)(c)
    };
    var a = new Comment.Reply();
    a.articleid = scope.$articleid;
    window.reply_comment = a.reply.bind2(a);
    window.del_reply = function(c) {
        a.del.bind2(a)(c)
    }
}); (function() {
    var getImgStaticPath = function(pid, type) {
        if (!pid) {
            return ""
        }
        var type = type || "orignal";
        var num = (eval("0X" + pid.substring(pid.length - 2)) % 16) + 1;
        return "http://static" + num + ".photo.sina.com.cn/" + type + "/" + pid
    };
    window.getImgStaticPath = getImgStaticPath
})();
$registJob("articleShare",
function() {
    if ($E("shareminiblogfromblogatarticlepage")) {
        Lib.Uic.getNickName([scope.$uid],
        function(c) {
            var b = c[scope.$uid] || "";
            b = Core.String.encodeHTML(b);
            scope.owenerNickName = b;
            var a = "javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?',u=z||d.location,p=['url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'新浪-博客','http://blog.sina.com.cn','" + (scope.$album_pic ? getImgStaticPath(scope.$album_pic, "bmiddle") : "") + "','分享" + scope.owenerNickName + "的博文：" + $E("t_" + scope.$articleid).innerHTML + "','http://blog.sina.com.cn/s/blog_" + scope.$articleid + ".html','utf-8'));";
            $E("shareminiblogfromblogatarticlepage").href = a
        })
    }
    if ($E("moreshares")) {
        Core.Events.addEvent($E("moreshares"),
        function() {
            if ($E("sharelayer")) {
                if ($E("sharelayer").style.display == "none") {
                    var c = Core.Events.fixEvent(Core.Events.getEvent());
                    var b = Core.Dom.getXY($E("moreshares"));
                    $E("sharelayer").style.left = (b[0] - 45) + "px";
                    $E("sharelayer").style.top = (b[1] + 15) + "px";
                    $E("sharelayer").style.display = ""
                } else {}
            } else {
                var a = '<div id="sharelayer" style="z-index:100;width:120px;" class="tb_layer_Y tb_layer_w2"><div class="tb_layer_arrow"></div><div class="tb_layer_Y_main" ><div class="tb_ps_share" style="width:96px;"><span class="share"><a id="sharewb" href="#" title="分享到新浪微博"><img height="16" align="absmiddle" width="16" title="微博" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" class="SG_icon SG_icon51"></a></span><span class="share"><a id="sharexn" href="#" title="分享到人人"><img height="16" align="absmiddle" width="16" title="人人" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" class="SG_icon SG_icon113"></a></span><span class="share"><a id="sharedb" target="_blank" href="#" title="分享到豆瓣"><img height="16" align="absmiddle" width="16" title="豆瓣" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" class="SG_icon SG_icon116"></a></span><span class="share"><a id="sharekx" href="#" title="分享到开心001"><img height="16" align="absmiddle" width="16" title="开心001" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" class="SG_icon SG_icon117"></a></span><div class="clearit"></div></div></div></div>';
                Core.Dom.insertHTML(document.body, a, "beforeend");
                var c = Core.Events.fixEvent(Core.Events.getEvent());
                var b = Core.Dom.getXY($E("moreshares"));
                $E("sharelayer").style.left = (b[0] - 45) + "px";
                $E("sharelayer").style.top = (b[1] + 15) + "px";
                $E("sharewb").href = "javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?',u=z||d.location,p=['url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'新浪-博客','http://blog.sina.com.cn','" + (scope.$album_pic ? getImgStaticPath(scope.$album_pic, "bmiddle") : "") + "','分享" + $E("ownernick").innerHTML + "的博文：" + $E("t_" + scope.$articleid).innerHTML + "','http://blog.sina.com.cn/s/blog_" + scope.$articleid + ".html','utf-8'));";
                $E("sharexn").href = "javascript:u='http://share.xiaonei.com/share/buttonshare.do?link='+location.href+'&title='+encodeURIComponent(document.title);window.open(u,'xiaonei','toolbar=0,resizable=1,scrollbars=yes,status=1,width=626,height=436');void(0)";
                $E("sharedb").href = "http://www.douban.com/recommend/?url=" + window.location.href + "&title=" + encodeURIComponent(document.title) + ";window.open(u,'douban','toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330');void(0)";
                $E("sharekx").href = "javascript:d=document;t=d.selection?(d.selection.type!='None'?d.selection.createRange().text:''):(d.getSelection?d.getSelection():'');void(kaixin=window.open('http://www.kaixin001.com/~repaste/repaste.php?&rurl='+escape(d.location.href)+'&rtitle='+escape('" + document.title + "')+'&rcontent='+escape('" + document.title + "'),'kaixin'));kaixin.focus();";
                Core.Events.addEvent($E("sharelayer"),
                function() {
                    var l = Core.Events.fixEvent(Core.Events.getEvent());
                    var j = Core.Dom.getXY($E("sharelayer"));
                    var m = Core.System.getScrollPos(document);
                    var i = j[0];
                    var g = j[1];
                    var f = m[1] + l.clientX;
                    var d = m[0] + l.clientY;
                    if (f >= (i + 116) || f <= i || d >= (g + 42) || d <= g) {
                        $E("sharelayer").style.display = "none"
                    }
                },
                "mouseout")
            }
        },
        "mouseover")
    }
});
$registJob("recordVisitor",
function() {
    Lib.checkAuthor();
    if ($isLogin && !$isAdmin) { (function() {
            if (scope.unreadMsg) {
                if (!scope.unreadMsg.foot) {
                    scope.unreadMsg.foot = 0
                }
                if (! (scope.unreadMsg.foot * 1)) {
                    var a = {
                        pid: 1,
                        uid: scope.$uid
                    };
                    if (typeof scope.$articleid != "undefined") {
                        a.subid = scope.$articleid
                    }
                    Utils.Io.JsLoad.request("http://footprint.cws.api.sina.com.cn/add.php", {
                        GET: a
                    })
                }
            } else {
                setTimeout(arguments.callee, 200)
            }
        })()
    }
});
Utils.text2Copy = function(g) {
    var j = function() {
        var r = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin: 0;
        if (r) {
            var t = navigator.plugins["Shockwave Flash"].description.split(" ");
            for (var q = 0; q < t.length; ++q) {
                if (isNaN(parseInt(t[q], 10))) {
                    continue
                }
                var p = t[q]
            }
            return p >= 10
        } else {
            if ($IE) {
                try {
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10");
                    return true
                } catch(s) {
                    return false
                }
            }
        }
    };
    if (window.clipboardData && $IE6) {
        window.clipboardData.clearData();
        return window.clipboardData.setData("Text", g)
    } else {
        if (j()) {
            if ($IE) {
                try {
                    window.clipboardData.clearData();
                    return window.clipboardData.setData("Text", g)
                } catch(m) {
                    return false
                }
            }
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                var d = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
                if (!d) {
                    return
                }
                var o = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
                if (!o) {
                    return
                }
                o.addDataFlavor("text/unicode");
                var n = {};
                var l = {};
                n = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
                var b = g;
                n.data = b;
                o.setTransferData("text/unicode", n, b.length * 2);
                var a = Components.interfaces.nsIClipboard;
                if (!d) {
                    return false
                }
                d.setData(o, null, a.kGlobalClipboard);
                return true
            } catch(m) {
                return false
            }
        } else {
            var i = "flashcopier";
            if (!$E(i)) {
                var c = $C("div");
                c.id = i;
                document.body.appendChild(c)
            }
            g = g.replace(/%/g, escape("%")).replace(/&/g, escape("&"));
            var f = '<embed src="http://simg.sinajs.cn/blog7common/clipboard.swf" FlashVars="clipboard=' + g + '" width="0" height="0" type="application/x-shockwave-flash"></embed>';
            $E(i).innerHTML = f;
            return true
        }
    }
};
Lib.subscribe = Core.Class.create();
Lib.subscribe.prototype = {
    initialize: function() {
        this.createDlg()
    },
    createDlg: function() {
        var c = scope.$uid;
        if ($_GLOBAL.rssMethod) {
            c = scope[$_GLOBAL.rssMethod]
        }
        var g = "http://blog.sina.com.cn/rss/" + c + ".xml";
        var f = [];
        if ($_GLOBAL.rssIcons) {
            f.push('<div class="rss_title"><strong>在线阅读器直接订阅：</strong></div><div class="rss_list">');
            for (var d = 0; $_GLOBAL.rssIcons[d]; d++) {
                var a = $_GLOBAL.rssIcons[d];
                f.push('<span><a target="_blank" href="');
                f.push(a.href);
                if (a.encode) {
                    f.push(encodeURIComponent(g))
                } else {
                    f.push(g)
                }
                f.push('" class="');
                f.push(a.cls);
                f.push('" title="');
                f.push(a.title);
                f.push('"></a></span>')
            }
        }
        f.push('<div class="clearit"></div></div><table><tr><th scope="row">订阅地址：</th><td><input type="text" id="subscribeText" class="SG_input" value="" /><a class="SG_aBtn SG_aBtnB" href="javascript:;" onclick="return false;"><cite id="subscribeCopy">复制</cite></a></td></tr><tr><th scope="row"></th><td>如果还没有RSS阅读器，请<strong><a href="http://down.tech.sina.com.cn/content/3034.html" target="_blank">立即下载</a></strong>。 </td></tr></table>');
        f = f.join("");
        var b = ['<table id="#{entity}" class="CP_w">', '<thead id="#{titleBar}">', "<tr>", '<th class="tLeft"><span></span></th>', '<th class="tMid">', '<div class="bLyTop">', '<strong id="#{titleName}"></strong>', '<cite style="width:100px;"><a href="http://www.sina.com.cn/ddt/rsshelp.html" target="_blank">什么是RSS?</a><a title="关闭" class="CP_w_shut" id="#{btnClose}" href="javascript:;">关闭</a></cite>', "</div>", "</th>", '<th class="tRight"><span></span></th>', "</tr>", "</thead>", "<tfoot>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid"><span></span></td>', '<td class="tRight"><span></span></td>', "</tr>", "</tfoot>", "<tbody>", "<tr>", '<td class="tLeft"><span></span></td>', '<td class="tMid">', '<div class="CP_layercon2 rssLayer" id="#{content}">', "</div>", "</td>", '<td class="tRight"><span></span></td>', "</tr>", "</tbody>", "</table>"].join("");
        this._dialog = winDialog.createCustomsDialog({
            tpl: b,
            title: "RSS订阅",
            content: f,
            width: 415,
            height: 104
        },
        "tips");
        $E("subscribeText").value = g;
        this.bindEvent()
    },
    bindEvent: function() {
        var a = this;
        Core.Events.addEvent($E("subscribeCopy"),
        function() {
            var b = Utils.text2Copy($E("subscribeText").value);
            if (b == true) {
                winDialog.alert("复制成功", {
                    funcOk: function() {
                        a._dialog.hidden()
                    },
                    icon: "01"
                })
            }
        })
    },
    show: function() {
        this._dialog.show();
        this._dialog.setAreaLocked(true);
        this._dialog.setMiddle()
    },
    hidden: function() {
        this._dialog.hidden()
    }
};
$registJob("subscribe",
function() {
    Core.Events.addEvent($E("SubscribeNewRss"),
    function() {
        if (!window.mySubscribe) {
            window.mySubscribe = new Lib.subscribe()
        }
        window.mySubscribe.show()
    })
});
$registJob("updownurl",
function() {
    var c = $E("new_nextprev_" + scope.$articleid);
    if (!c) {
        Lib.checkAuthor();
        if (scope.$pn_x_rank == "1" && !$isAdmin) {
            return false
        }
        var b = $E("nextprev_" + scope.$articleid);
        var a = new Interface("http://blogtj.sinajs.cn/api/get_prevnext_article.php", "jsload");
        var d = $E("t_" + scope.$articleid).parentNode;
        var f = Core.Dom.getChildrenByClass(d, "time")[0].innerHTML;
        f = f.replace("(", "").replace(")", "");
        a.request({
            GET: {
                uid: scope.$uid,
                blog_id: scope.$articleid,
                varname: "prevnext",
                blog_pubdate: f,
                pn_x_rank: scope.$pn_x_rank
            },
            onSuccess: function(g) {
                var i = "";
                if (g.prev != null) {
                    i += '<div><span class="SG_txtb">前一篇：</span><a href="' + g.prev.blog_url + '">' + g.prev.blog_title + "</a></div>"
                }
                if (g.next != null) {
                    i += '<div><span class="SG_txtb">后一篇：</span><a href="' + g.next.blog_url + '">' + g.next.blog_title + "</a></div>"
                }
                b.innerHTML = i
            },
            onError: function() {}
        })
    }
});
Lib.AudioCheck = {};
Lib.AudioCheck.swfUrl = $_GLOBAL.flashBasicURL + "mp3.swf?" + new Date().getTime();
Lib.AudioCheck.soundUrl = "http://icp.cws.api.sina.com.cn/login/login_audio.php";
Lib.AudioCheck.render = function(b, a) {
    $E(b).innerHTML = '		<a style="margin-left:3px;" id="comment_get_vcode" href="javascript:;" onclick="Lib.AudioCheck.callAudioCheck();return false;">收听验证码</a>		<img id="play_img" name="play_img" src="http://image2.sina.com.cn/blog/tmpl/v3/images/blank.gif" align="absmiddle" style="margin-right:2px;" height="15">		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="0" height="0" id="mp3_player" align="middle">		<param name="allowScriptAccess" value="always" />		<param name="movie" value="' + this.swfUrl + '" />		<param name="quality" value="high" />		<param name="bgcolor" value="#ffffff" />		<param name="FlashVars" value="mp3URL=' + a + '" />		<embed src="' + this.swfUrl + '" FlashVars="mp3URL=' + a + '" quality="high" bgcolor="#ffffff" width="0" height="0" name="mp3_player" swLiveConnect="true" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"/>		</object>	'
};
Lib.AudioCheck.callAudioCheck = function() {
    setTimeout(function() {
        $E("play_img").src = "http://blogimg.sinajs.cn/v5images/play_img.gif";
        window.document.mp3_player.SetVariable("isPlay", "1");
        $E("login_check").value = "";
        $E("login_check").focus()
    },
    500);
    Utils.Io.JsLoad.request("http://hits.blog.sina.com.cn/hits?act=3&uid=00000203", {
        onComplete: function() {}
    })
};
$registJob("audioCheck",
function() {
    if (scope.$private.cms != 1 && scope.$isCommentAllow != 1) {
        var b = $E("comment_get_vcode");
        var a = Core.Dom.wrap(b, "span");
        if (a) {
            Lib.AudioCheck.render(a, Lib.AudioCheck.soundUrl + "?" + new Date().getTime())
        }
    }
});
Lib.RandomStroll = Core.Class.create();
Lib.RandomStroll.prototype = {
    swf_url: $_GLOBAL.flashBasicURL + "rndView.swf",
    initialize: function() {
        var a = $C("div");
        a.id = "ramdomVisitDiv";
        a.style.position = "absolute";
        a.style.top = "30px";
        a.style.width = "100px";
        a.style.zIndex = "101";
        document.body.appendChild(a);
        this.div = a;
        this.lock();
        Core.Events.addEvent(window,
        function() {
            this.lock()
        }.bind2(this), "resize");
        Core.Events.addEvent(window,
        function() {
            this.lock()
        }.bind2(this), "scroll")
    },
    load: function(a) {
        Utils.Flash.swfView.Add(this.swf_url, "ramdomVisitDiv", "map", "100", "120", "8.0.0.0", "#000", a, {
            scale: "noscale",
            allowScriptAccess: "always",
            wmode: "transparent"
        })
    },
    lock: function() {
        var b = Core.System.getScrollPos();
        var a = Core.System.pageSize();
        var c = b[1] + a[2] - 100;
        if ($MOZ) {
            c -= 17
        }
        this.div.style.left = c + "px"
    },
    show: function() {
        $E("ramdomVisitDiv").style.display = ""
    },
    hide: function() {
        $E("ramdomVisitDiv").style.display = "none"
    }
};
Lib.RandomStroll.getRandomURL = function(b, a, c, d) {
    var f = Math.floor(Math.random() * 992);
    Utils.Io.JsLoad.request(b, {
        onComplete: function() {
            var g = Math.floor(Math.random() * uidlist.length);
            var i = uidlist[g];
            window.location.href = a + "/u/" + i
        },
        noreturn: true
    })
};
Lib.RandomStroll.GoUrlByConfig = {
    go: function(c) {
        if (c && c.length) {
            var b = c.length;
            for (var a = 0; a < b; a++) {
                this.randomByProbability(c[a].probability, c[a].url)
            }
        }
    },
    randomByProbability: function(c, b) {
        var a = Boot.getRandomNum(1, c);
        if (a == 1) {
            window.location.href = b
        }
    }
};
$registJob("randomScroll",
function() {
    var d = new Date().getTime();
    var b = "http://blog.sina.com.cn";
    var a = "http://blog.sina.com.cn/myblog/rankuidview.php?time=" + d;
    var c = new Lib.RandomStroll();
    c.load({
        target: "_self",
        URL: ""
    });
    Core.Events.addEvent("ramdomVisitDiv",
    function() {
        trace("点击了随便逛逛的div");
        e = Core.Events.fixEvent(Core.Events.getEvent());
        trace("事件是：" + e.type + ";");
        trace("点击的按钮是：" + e.button);
        if (e.button == 1 && $IE) {
            Lib.RandomStroll.GoUrlByConfig.go(scope.blog_randomstroll_config);
            Lib.RandomStroll.getRandomURL(a, b, c, true)
        } else {
            if (e.button == 0 && ($MOZ || $FF2)) {
                Lib.RandomStroll.GoUrlByConfig.go(scope.blog_randomstroll_config);
                Lib.RandomStroll.getRandomURL(a, b, c, true)
            } else {
                if ($OPERA || $SAFARI) {
                    Lib.RandomStroll.GoUrlByConfig.go(scope.blog_randomstroll_config);
                    Lib.RandomStroll.getRandomURL(a, b, c, true)
                } else {
                    Core.Events.stopEvent()
                }
            }
        }
    },
    "mousedown")
});
addAdvertise = function() {
    if (scope.$pageid.indexOf("index") > -1) {
        var b = $E("blogads");
        if (!b) {
            return;
            b = $C("div");
            b.id = "blogads";
            b.className = "blogads";
            $E("sinablogbody").appendChild(b)
        }
    } else {
        if (scope.$pageid.indexOf("article") > -1) {
            var b = $E("blogads");
            if (!b) {
                return;
                b = $C("div");
                b.id = "blogads";
                b.className = "blogads";
                $E("sinablogbody").appendChild(b)
            }
            b.innerHTML = '<div class="ad_head"></div><div class="ad_body"><div class="adsle" id="adversite_top">广告内容</div><div class="adsrig">新浪广告共享计划' + ($isAdmin ? '<a href="http://share.sass.sina.com.cn/widget_ad/index_out.php?done" class="SinaAd_linkcolor SinaAd_link" target="_blank">[管理]</a>': "") + '</div><div class="clearit"></div></div><div class="ad_foot"></div>';
            var a = $C("div");
            a.id = "blogads2";
            a.className = "blogads2 borderc";
            a.innerHTML = '<p><a href="javascript:;" id="adversite_bottom"></a></p><p class="SG_txtc">新浪广告共享计划</p>' + ($isAdmin ? '<div class="manage SinaAd_mg2"><a href="http://share.sass.sina.com.cn/widget_ad/index_out.php?done" class="SinaAd_linkcolor SinaAd_link" target="_blank">[管理]</a></div>': "");
            a.style.display = "none";
            if (scope.$pn_x_rank && parseInt(scope.$pn_x_rank) == 0) {
                if ($E("nextprev_" + scope.$articleid)) {
                    Core.Dom.insertAfter(a, $E("nextprev_" + scope.$articleid))
                } else {
                    if ($E("new_nextprev_" + scope.$articleid)) {
                        Core.Dom.insertAfter(a, $E("new_nextprev_" + scope.$articleid))
                    }
                }
            }
        }
    }
    if ($E("blogads")) {
        Lib.include(["http://sjs.sinajs.cn/blog7/adwidget.js"],
        function() {
            setTimeout(function() {
                if (typeof adShare != "undefined") {
                    adShare.init(scope.$uid, "sinablog", "SINABLOG")
                }
            },
            2000)
        })
    }
};
addAdvertise2 = function() {
    if ($E("adps_person")) {
        Lib.include(["http://i3.sinaimg.cn/home/sinaflash.js", "http://ba.sass.sina.com.cn/front/blog/deliver?p1=" + scope.$uid + ",adps000001|adps000002"],
        function() {
            if ($E("adps000001")) {
                var b = $T($E("adps000001"), "div");
                for (var a = 0; a < b.length; a++) {
                    if (b[a].className == "widgetconn") {
                        $E("adps000001").innerHTML = b[a].innerHTML;
                        $E("adps000001").style.paddingTop = "10px";
                        $E("adps_person").style.display = "";
                        break
                    }
                }
            }
        })
    }
};
$registJob("renderAd",
function() {
    scope.$private.ad = scope.$private.ad || 0;
    if (scope.$private.ad > 0) {
        trace("该用户有广告 类型1，开始载入数据。。。");
        addAdvertise();
        addAdvertise2()
    }
});
$TEMPLATECLONE_MSG = {
    A00001: "操作失败，可能系统繁忙或系统遇到未知错误，请稍后再试。也可联系新浪客服：致电95105670。",
    A00002: "操作失败，可能系统繁忙或系统遇到未知错误，请稍后再试。也可联系新浪客服：致电95105670。",
    A00003: "操作失败，可能系统繁忙或系统遇到未知错误，请稍后再试。也可联系新浪客服：致电95105670。",
    A00004: "未登录",
    A00005: "抱歉，你暂时不能复制该模板",
    A00006: "操作成功",
    A11007: '你还未开通新浪博客，请先 <a href="#{linkNewBlog}" target="_blank" id="cloneTemplateButNoReg">开通博客</a>'
};
Lib.TemplateClone = Core.Class.create();
Lib.TemplateClone.prototype = {
    type: "1",
    version: "7",
    interfaceClone: null,
    btnClone: null,
    initialize: function(a, b) {
        var c = this;
        this.interfaceClone = new Interface("http://control.blog.sina.com.cn/riaapi/conf/template_clone.php", "jsload");
        this.btnClone = a;
        if (this.btnClone) {
            Core.Events.addEvent(this.btnClone,
            function() {
                c.clone(b)
            },
            "click")
        }
    },
    clone: function(f, c) {
        var g = this;
        var a = "<a style='color:red' href='http://finance.sina.com.cn/333/2010-02-05/guest920.shtml' target='_blank'>315十大行业满意度调查</a>";
        var b = c ? a: "";
        Lib.checkAuthor();
        if ($isLogin) {
            winDialog.confirm("确定使用此模板吗?", {
                subText: b,
                funcOk: function() {
                    g.request(f)
                }
            })
        } else {
            var d = new Lib.Login.Ui();
            d.login(function() {
                winDialog.confirm("确定使用此模板吗?", {
                    subText: b,
                    funcOk: function() {
                        g.request(f)
                    },
                    funcCancel: function() {
                        location.reload()
                    }
                })
            })
        }
    },
    request: function(a) {
        var b = this;
        this.interfaceClone.request({
            GET: {
                uid_cloned: scope.$uid,
                type: b.type,
                version: b.version
            },
            onSuccess: function(c) {
                if (a) {
                    a()
                }
            },
            onError: function(c) {
                if (c.code == "A11007") {
                    Lib.checkAuthor();
                    winDialog.alert($TEMPLATECLONE_MSG[c.code].replace(/#\{linkNewBlog\}/g, "http://control.blog.sina.com.cn/reg/reg_blog.php?version=7"), {
                        icon: "01"
                    },
                    "cloneTemplateButNoRegTip");
                    $E("cloneTemplateButNoReg").onclick = function() {
                        winDialog.close("cloneTemplateButNoRegTip")
                    }
                } else {
                    winDialog.alert($TEMPLATECLONE_MSG[c.code], {
                        icon: "02"
                    })
                }
            },
            onFail: function() {}
        })
    }
};
$registJob("templateClone",
function() {
    Lib.getTplNum(function() {
        if (scope.tpl) {
            var a, b = $_GLOBAL.cloneTemplateConfig[scope.tpl];
            if (b && b.template_clone_pic.replace(/\s/g, "") != "") {
                $E("template_clone_pic").innerHTML = b.template_clone_pic;
                $E("template_clone_link").innerHTML = b.template_clone_link;
                $E("template_clone_other").innerHTML = b.template_clone_other;
                if (b.count_id) {
                    Utils.Io.JsLoad.request("http://hits.blog.sina.com.cn/hits?act=3&uid=" + b.count_id + "&varname=templatecc", {
                        onComplete: function() {
                            var f = new Ui.Template($_GLOBAL.cloneTemplateConfig[scope.tpl].count_text);
                            var g = {};
                            g.template_pv = templatecc.pv;
                            $E("template_clone_link").innerHTML = f.evaluate(g)
                        }
                    })
                }
                a = new Lib.TemplateClone($E("template_clone_pic"),
                function() {
                    winDialog.alert("克隆模板成功!", {
                        funcOk: function() {
                            Lib.checkAuthor();
                            window.location.href = "http://blog.sina.com.cn/u/" + $UID
                        }
                    })
                })
            }
            var c = $_GLOBAL.GUANWANG[scope.tpl];
            if (c && c.template_clone_pic.replace(/\s/g, "") != "") {
                $E("template_clone_pic").innerHTML = c.template_clone_pic;
                $E("template_clone_other").innerHTML = c.template_clone_other;
                if ($E("template_clone_pic")) {
                    if ($E("template_clone_pic").parentNode.tagName.toLowerCase() == "a") {
                        $E("template_clone_pic").parentNode.href = c.template_clone_link;
                        $E("template_clone_pic").parentNode.target = "_blank"
                    }
                }
            }
            var d = $_GLOBAL.famous_conf[scope.tpl];
            if (d && d.template_clone_pic.replace(/\s/g, "") != "") {
                $E("template_clone_pic").innerHTML = d.template_clone_pic;
                $E("template_clone_link").innerHTML = d.template_clone_link;
                $E("template_clone_other").innerHTML = d.template_clone_other;
                if ($E("template_clone_pic")) {
                    if ($E("template_clone_pic").parentNode.tagName.toLowerCase() == "a") {
                        $E("template_clone_pic").parentNode.href = "http://ba.sass.sina.com.cn/front/tp/deliver?blogId=" + scope.$uid + "&tp=" + scope.tpl
                    }
                }
            }
        }
    })
});
$registJob("autoBlog",
function() {
    Lib.checkAuthor();
    if ($isAdmin) {
        a()
    } else {
        Lib.getTplNum(a)
    }
    function a() {
        if (scope.tpl == "10_71") {
            var g = $E("auto_news");
            var l = $E("auto_focus");
            if (g && l) {
                var f;
                var d;
                var j = "http://auto.sina.com.cn/338/20100408/16.js";
                var b = {
                    items: [{
                        title: "2010北京车展30万元以上可购新车推荐",
                        link: "http://auto.sina.com.cn/news/2010-04-13/0134588586.shtml"
                    },
                    {
                        title: "奔腾抽奖签售日优惠",
                        link: "http://auto.sina.com.cn/news/2010-04-13/0953588819.shtml"
                    },
                    {
                        title: "凯美瑞混合动力上市",
                        link: "&nbsp;http://bbs.auto.sina.com.cn/24/190/thread-1588420-1-1.html"
                    },
                    {
                        title: "奔驰将携旗下四大品牌38款车型现身北京车展",
                        link: "http://auto.sina.com.cn/car/2010-04-12/1048588366.shtml"
                    },
                    {
                        title: "雷诺七款车将亮相北京车展新风景亚洲首发",
                        link: "http://auto.sina.com.cn/car/2010-04-12/0913588266.shtml"
                    },
                    {
                        title: "江淮概念车愿景IV实车将亮相",
                        link: "http://auto.sina.com.cn/car/2010-04-12/2126588549.shtml"
                    },
                    {
                        title: "江淮悦悦参数曝光",
                        link: "http://auto.sina.com.cn/car/2010-04-12/1043588364.shtml"
                    },
                    {
                        title: "上海大众新POLO谍拍曝光",
                        link: "http://auto.sina.com.cn/news/2010-04-06/2315586104.shtml"
                    },
                    {
                        title: "吉利北京车展揭秘",
                        link: "http://auto.sina.com.cn/news/2010-04-09/1537587705.shtml"
                    },
                    {
                        title: "奥迪A3推1.8T和1.4T引擎",
                        link: "http://auto.sina.com.cn/news/2010-04-06/2224586101.shtml"
                    },
                    {
                        title: "Honda携最新环保车参展",
                        link: "http://auto.sina.com.cn/news/2010-04-12/1346588430.shtml"
                    },
                    {
                        title: "华晨参展车模大揭秘美女如云",
                        link: "http://bbs.auto.sina.com.cn/61/69/thread-1588658-1-1.html"
                    },
                    {
                        title: "丰田将携多款主力车型亮相4月北京车展",
                        link: "http://auto.sina.com.cn/news/2010-04-12/1116588386.shtml"
                    },
                    {
                        title: "贴身实拍三厢英朗GT车型参数配置抢先曝光",
                        link: "http://auto.sina.com.cn/news/2010-04-06/2335586109.shtml"
                    },
                    {
                        title: "2010款新花冠终于出炉售价或将维持不变",
                        link: "http://auto.sina.com.cn/car/2010-04-06/2303586103.shtml"
                    },
                    {
                        title: "北京车展十大猜想车市拐点还是兴奋点？",
                        link: "http://auto.sina.com.cn/news/2010-04-06/0902585747.shtml"
                    },
                    {
                        title: "全新宾利旗舰车型Mulsanne即将亮相北京车展",
                        link: "http://auto.sina.com.cn/news/2010-03-31/1023584042.shtml"
                    },
                    {
                        title: "法拉利599GTO",
                        link: "http://auto.sina.com.cn/news/2010-04-12/0820588198.shtml"
                    },
                    {
                        title: "法拉利458Italia北京车展发布",
                        link: "http://auto.sina.com.cn/car/2010-04-07/1822586714.shtml"
                    },
                    {
                        title: "比亚迪SUV无伪实拍谍照曝光北京车展将推出",
                        link: "http://auto.sina.com.cn/news/2010-04-01/0845584463.shtml"
                    },
                    {
                        title: "布嘉迪威航16.4GrandSport将亮相车展",
                        link: "http://auto.sina.com.cn/car/2010-03-19/0958579422.shtml"
                    }],
                    focus: [{
                        title: "凯迪拉克XTS、Converj将首映北京车展",
                        link: "http://auto.sina.com.cn/photo/highpix/jlqczppdh.shtml",
                        img: "http://i3.sinaimg.cn/qc/buy/U2050P33T133D14368F2028DT20100413103911.jpg"
                    },
                    {
                        title: "奔驰将携旗下四大品牌38款车现身北京车展",
                        link: "http://auto.sina.com.cn/car/2010-04-12/1048588366.shtml",
                        img: "http://i1.sinaimg.cn/qc/buy/U2050P33T133D14345F2023DT20100412113003.jpg"
                    },
                    {
                        title: "丰田将携多款主力车型亮相4月北京车展",
                        link: "http://auto.sina.com.cn/news/2010-04-12/1116588386.shtml",
                        img: "http://i0.sinaimg.cn/qc/buy/U2050P33T133D14345F2022DT20100412113003.jpg"
                    },
                    {
                        title: "江淮概念车愿景IV草图曝光实车将亮相北京",
                        link: "http://auto.sina.com.cn/car/2010-04-12/2126588549.shtml",
                        img: "http://i0.sinaimg.cn/qc/buy/U2050P33T133D14368F2029DT20100413103911.jpg"
                    },
                    {
                        title: "专业看展团正在招募",
                        link: "http://bbs.auto.sina.com.cn/63/126/thread-1555452-1-1.html",
                        img: "http://i0.sinaimg.cn/qc/2010/0318/201031812152.jpg"
                    }]
                };
                l.style.width = "144px";
                l.style.height = "95px";
                l.style.overflow = "hidden";
                function c(m) {
                    Utils.Io.JsLoad.request(j, {
                        onComplete: function() {
                            if (typeof m == "function") {
                                if (window._DATA_SINA_CARS) {
                                    b = window._DATA_SINA_CARS
                                }
                                m()
                            }
                        },
                        onException: function() {},
                        timeout: 15000
                    })
                }
                function i() {
                    var p = "";
                    var r = 0;
                    p += '<ul id="auto_newslist" style="height:100px;overflow:hidden">';
                    for (var q = 0,
                    o = (b.items.length); q < o; q++) {
                        p += '<li><a href="' + b.items[q].link + '" target="_blank" title="' + b.items[q].title + '">' + b.items[q].title + "</a></li>"
                    }
                    p += "</ul>";
                    g.innerHTML = p;
                    clearInterval(f);
                    clearTimeout(f); (function() {
                        var m = 2;
                        var s = 5;
                        var u = 10;
                        var t = false;
                        var n = $E("auto_newslist");
                        setTimeout(function() {
                            f = setInterval(function v() {
                                if (t) {
                                    return
                                }
                                n.scrollTop += m;
                                if (n.scrollTop >= 20 * s) {
                                    clearInterval(f);
                                    for (var y = 0; y < s; y++) {
                                        n.appendChild($T(n, "li")[0])
                                    }
                                    n.scrollTop = 0;
                                    f = setTimeout(function() {
                                        f = setInterval(v, 13)
                                    },
                                    u * 1000)
                                }
                            },
                            13)
                        },
                        u * 1000);
                        n.onmouseover = function() {
                            t = true
                        };
                        n.onmouseout = function() {
                            t = false
                        }
                    })();
                    clearTimeout(d); (function() {
                        var m = 10;
                        l.innerHTML = '<a href="' + b.focus[r]["link"] + '" target="_blank" title="' + b.focus[r]["title"] + '"><img style="width:144px;height:95px" src="' + b.focus[r]["img"] + '"/></a>';
                        r++;
                        if (r >= b.focus.length) {
                            r = 0
                        }
                        d = setTimeout(arguments.callee, m * 1000)
                    })()
                }
                scope.$startAutoNews = function() {
                    c(function() {
                        i()
                    })
                };
                scope.$stopAutoNews = function() {
                    clearInterval(f);
                    clearTimeout(f)
                };
                scope.$startAutoNews()
            }
        }
    }
});
$SYSMSG.extend({
    B24001: "未同意服务条款",
    B24002: "你输入的手机号有误，请重新输入。",
    B24003: "你输入的验证码有误，请重新输入。<br/>若忘记验证码，可重新获取。",
    B24004: "此博客已绑定手机号",
    B24005: "此手机号已绑定博客",
    B24006: "你输入的手机号或验证码有误，请重新输入。<br/>若忘记验证码，可重新获取。",
    B24007: "此博客未开通手机订阅",
    B24008: "被访问者uid错误",
    B24009: "自己不能订阅自己",
    B24010: "你已手机订阅此用户。",
    B24011: "抱歉！你的手机订阅用户数已达上限，手机订阅失败。",
    B24012: "自己不能取消自己",
    B24013: "此用户未被订阅",
    B24014: "手机关注订阅失败！",
    B24015: "确定要取消对他的手机订阅吗？"
});
Core.Events.getEventTarget = function(a) {
    a = a || Core.Events.getEvent();
    Core.Events.fixEvent(a);
    return a.target
};
scope.PhoneAttentionAdd = Core.Class.create();
scope.PhoneAttentionAdd.prototype = {
    initialize: function() {},
    add: function(a) {
        try {
            Core.Events.stopEvent()
        } catch(b) {}
        a = a || scope.$uid;
        if (!this.addInterface) {
            this.addInterface = new Interface("http://control.blog.sina.com.cn/admin/iphoneattention/attention.php", "jsload")
        }
        Lib.checkAuthor();
        if (!$isLogin) {
            new Lib.Login.Ui().login(Core.Function.bind3(this.request, this, [a]), false, "referer:" + location.hostname + location.pathname + ",func:0005")
        } else {
            this.request(a)
        }
    },
    request: function(a) {
        this.addInterface.request({
            GET: {
                fuid: a
            },
            onSuccess: function(b) {
                var c = '手机订阅成功！若此人有新博文发布，我们会短信提醒你。" <br/><span style="font-weight: 100; font-size: 12px;"><a target="_blank" href="http://control.blog.sina.com.cn/blogprofile/profilephone.php">管理我的手机订阅</a>>></span>';
                winDialog.alert(c, {
                    icon: "03",
                    funcOk: function() {
                        if (scope.$pageid == "profile_phone" || scope.$pageid == "profile_attention") {
                            window.location.reload()
                        }
                    }
                })
            },
            onError: function(b) {
                if (b.code == "B24007") {
                    window.location.href = "http://control.blog.sina.com.cn/blogprofile/profilephone.php"
                } else {
                    if (b.code == "B24016") {
                        var c = "你还没有开通博客，现在立即开通？";
                        winDialog.confirm(c, {
                            icon: "04",
                            textOk: "是",
                            textCancel: "否",
                            funcOk: function() {
                                window.open("http://control.blog.sina.com.cn/reg/reg_blog.php?version=7");
                                winDialog.close("phoneRssNoReg")
                            }
                        },
                        "phoneRssNoReg")
                    } else {
                        showError(b.code)
                    }
                }
            },
            onFail: function() {}
        })
    }
};
$registJob("phone_attention_add",
function() {
    scope.pa_add = new scope.PhoneAttentionAdd()
});
$SYSMSG.extend({
    B119001: "不能转载自己的文章!",
    B119002: "转帖功能为新版博客专属功能，点击确认立即升级你的博客吧！<br/><span style='font-weight: 100; font-size: 12px;'><a target='_blank' href='http://blog.sina.com.cn/lm/iframe/xhtml/2010/blogspread.html'>了解新版博客详情</a></span>",
    B119003: "被转载文章不存在!",
    B119004: "请访问原文进行转载！",
    B119005: "该文章不允许被转载！",
    B119006: "该博客不允许被转载！"
});
App.getArticlesSort = function(b, a) {
    a = a || scope.$uid;
    var c = $C("script");
    Lib.checkAuthor();
    c.src = "http://blogcnf.sinajs.cn/acate?jv=x&" + a;
    c.charset = "utf-8";
    c.onload = c.onerror = c.onreadystatechange = Core.Function.bind2(function() {
        if (c && c.readyState && c.readyState != "loaded" && c.readyState != "complete") {
            return
        }
        App.ArticlesSort = x;
        if (b != null) {
            b(App.ArticlesSort)
        }
        c.onload = c.onreadystatechange = c.onerror = null;
        c.src = "";
        c.parentNode.removeChild(c);
        c = null
    },
    this);
    document.getElementsByTagName("head")[0].appendChild(c)
};
var cateDialog = Core.Class.create();
cateDialog.prototype = {
    uid: "",
    initialize: function(a) {
        this.action = a || false
    },
    show: function(a) {
        if (typeof editor != "undefined") {
            editor.blur()
        }
        this.uid = a || scope.$uid;
        this.initDialog();
        this.dialog.show();
        this.dialog.setFixed(true);
        this.dialog.setAreaLocked(true);
        this.dialog.setMiddle()
    },
    initDialog: function() {
        var d = this;
        var f = {
            width: 492,
            height: 0,
            url: "http://control.blog.sina.com.cn/admin/article/article_class_list.php?" + (this.action ? "action=editor": "")
        };
        Lib.checkAuthor();
        this.url = "http://control.blog.sina.com.cn/admin/article/article_class_save2.php?uid=" + $UID + (this.action ? "&action=editor": "");
        this.id = Core.Math.getUniqueId();
        this.manage = null;
        this.manage = new cateMng(this.id, this.itemTpl, this.uid);
        this.manage.onSuccess = function(j) {
            d.onSuccess(j)
        };
        var a = new Ui.Template("<div style='width: #{width}px; height: #{height}px;' id='category_" + this.id + "'></div>");
        var g = {
            ad: false,
            drag: true,
            title: "分类管理",
            content: a.evaluate(f),
            shadow: 1,
            width: f.width,
            height: f.height
        };
        var c = {};
        var b = winDialog.createCustomsDialog(g, c);
        b.setClose("hidden");
        this.dialog = b;
        $E("category_" + this.id).innerHTML = this.tpl.join("");
        var i = this;
        this.dialog.nodes.btnClose.href = "javascript:;";
        this.dialog.nodes.btnClose.onclick = function() {
            if (i.manage.getEdit()) {
                winDialog.confirm("是否保存此更改？", {
                    funcOk: function() {
                        i.manage.saveHandler(i.url)
                    },
                    funcCancel: function() {
                        i.close()
                    },
                    funcClose: function() {
                        i.dialog.show()
                    },
                    textOk: "是",
                    textCancel: "否"
                })
            } else {
                i.close()
            }
        };
        this.initEvent()
    },
    initEvent: function() {
        this.manage.nameEvent();
        this.manage.createEvent();
        this.manage.dataProvider();
        this.manage.saveEvent(this.url)
    },
    hidden: function() {
        this.dialog.setClose("hidden");
        this.dialog.hidden()
    },
    close: function() {
        this.dialog.setClose("close");
        this.dialog.close()
    },
    showOld: function() {
        this.dialog.show()
    },
    reset: function() {
        window.CateDialog.dialog.setCloseEvent(true);
        window.CateDialog.dialog.hidden();
        window.CateDialog.dialog = null;
        window.CateDialog.init = false
    },
    setSize: function(b, a) {
        var c = this.dialog.nodes.content.firstChild;
        this.dialog.setSize(b, a);
        c.style.width = b + "px";
        c.style.height = a + "px"
    },
    setCloseEvent: function(a) {
        trace("123123123")
    },
    getDialog: function() {
        return this.dialog
    },
    getId: function() {
        return this.id
    },
    getDataList: function() {
        return this.manage.list
    },
    onSuccess: function(a) {},
    init: false,
    dialog: null,
    tpl: ['<div id="categoryBody">', '<div id="categoryTitle">', "</div>", '<div id="categoryHead">', "<table>", "<tr>", '<td><input type="text" maxlength="28" value="最多可输入14个中文字符" id="categoryName"/></td>', '<td width="80"><a id="categoryCreate" href="javascript:void(0);" class="SG_aBtn SG_aBtnB SG_aBtn_sub"><cite>创建分类</cite></a></td>', '<td><span class="SG_txtc">请用中文、英文或数字。</span></td>', "</tr>", "</table>", '<div id="errTips"></div>', "</div>", '<form method="post" id="categoryForm" name="form">', '<div id="categoryList">', '<ul class="clearfix" id="datalist">&nbsp;</ul>', '<div class="SG_j_linedot"></div>', "</div>", '<div id="categoryBottom" style="text-align:center">', '<a id="categorySave" href="javascript:void(0);" class="SG_aBtn SG_aBtnB SG_aBtn_sub"><cite>保存设置<input type="button" value="保存设置"/></cite></a>', "</div>", "</form>", "</div>"],
    itemTpl: ['<li class="{class}">', '<span class="htit" style="color:#000000" id="cate_{index}">{cate}</span>', '<input type="hidden" value="{cate}" name="typename[]" class="catName"/>', '<input type="hidden" value="{id}" name="number[]"/>', '<span id="ctrl_{index}" class="control">', '<div class="manage">', '<a class="CP_a_fuc" id="edit_{index}" href="javascript:;" onclick="javascript:window.CateDialog.manage.editCate(this);">[<cite>编辑</cite>]</a>', '<a class="CP_a_fuc" id="del_{index}" index="{index}" href="javascript:;" onclick="javascript:window.CateDialog.manage.delCate(this);">[<cite>删除</cite>]</a>', "</div>", '<div class="arrow">', '<a id="up_{index}" class="{up_class}" href="javascript:;" onclick="javascript:window.CateDialog.manage.upHandler(this);"/>', '<a id="down_{index}" class="{down_class}" href="javascript:;" onclick="javascript:window.CateDialog.manage.downHandler(this);"/>', "</div>", "</span>", '<div id="editctrl_{index}" class="writeinfo" style="display:none">', '<input id="new_{index}" type="text" value="" /><a class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="javascript:;"><cite>确定</cite></a><a class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="javascript:;"><cite>取消</cite></a></div>', "<div/>", "</li>"]
};
var cateMng = Core.Class.create();
cateMng.prototype = {
    list: null,
    edit: false,
    uid: null,
    initialize: function(c, b, a) {
        this.uid = a || scope.$uid;
        this.id = c;
        this.itemTpl = b;
        Array.prototype.remove = function(d) {
            if (isNaN(d) || d > this.length) {
                return false
            }
            this.splice(d, 1)
        }
    },
    nameEvent: function() {
        var a = this;
        $E("categoryName").onfocus = function() {
            if (this.value == "最多可输入14个中文字符") {
                this.value = ""
            }
        };
        $E("categoryName").onblur = function() {
            var b = /[ ><\\\'\;\"`\|\t\r\n|\u3000]/ig;
            this.value = this.value.replace(b, "");
            if (Core.String.trim($E("categoryName").value) == "") {
                this.value = "最多可输入14个中文字符";
                this.edit = false
            } else {
                this.edit = true
            }
            a.showTips("")
        };
        $E("categoryName").onkeyup = function() {
            var b = Core.String.trim(this.value);
            if (Core.String.byteLength(b) > 28) {
                this.value = Core.String.leftB(b, 28)
            } else {
                if (b != this.value) {
                    this.value = b
                }
            }
        };
        a.showTips("")
    },
    createEvent: function() {
        var c = this;
        var b = "";
        $E("categoryCreate").onclick = function() {
            if (a() && $E("categoryName").edit) {
                var d = {
                    id: -1,
                    name: $E("categoryName").value
                };
                $E("categoryName").value = "最多可输入14个中文字符";
                $E("categoryName").edit = false;
                c.list.push(d);
                c.update()
            }
            c.showTips(b)
        };
        function a() {
            var f = Core.String.trim($E("categoryName").value);
            b = "";
            if (f == "" || f == "最多可输入14个中文字符") {
                b = "分类名称不能为空"
            } else {
                if (f.indexOf("&") != -1 || f.indexOf("＆") != -1) {
                    b = "分类名称不能包含&符号"
                } else {
                    if (c.list.length >= 15) {
                        b = "抱歉！最多可创建15条分类"
                    } else {
                        if (Core.String.byteLength(f) > 28) {
                            b = "最多可输入14个中文字符"
                        }
                    }
                }
            }
            for (var d = 0; d < c.list.length; d++) {
                if (c.list[d].name == f) {
                    b = "您已经添加过此分类";
                    break
                }
            }
            if (b != "") {
                return false
            } else {
                return true
            }
        }
    },
    saveEvent: function(a) {
        Core.Events.stopEvent();
        var b = this;
        $E("categorySave").onclick = function() {
            b.saveHandler(a)
        }
    },
    saveHandler: function(url) {
        var _this = this;
        var length = _this.list.length;
        var cateName = [];
        var cateId = [];
        for (var i = 0; i < length; i++) {
            var item = _this.list[i];
            cateName.push(item.name);
            cateId.push(item.id)
        }
        Utils.Io.Ijax.request(url + "&r=" + Math.random(), {
            POST: {
                typename: cateName.join("|"),
                number: cateId.join("|")
            },
            onComplete: function(res) {
                eval("var result = " + res);
                try {
                    try {
                        if ($E("module_3")) {
                            Lib.Component.refresh(3, {
                                width: scope.catedialogwidth || 210
                            })
                        }
                        if ($E("module_7")) {
                            location.reload()
                        }
                    } catch(error) {
                        trace(error)
                    }
                    try {
                        window.ArticleCateFuncs.reloadCate(result.msg)
                    } catch(error) {}
                    window.CateDialog.close()
                } catch(e) {}
                var r;
                eval("r=" + res);
                _this.onSuccess(r.msg)
            },
            onException: function(res) {}
        })
    },
    editCate: function(g) {
        var i = this;
        var d = g.id.split("_")[1];
        var b = $E("cate_" + d).innerHTML;
        var a = $E("cate_" + d).parentNode;
        $E("ctrl_" + d).className = "control hide";
        a.className = d % 2 == 0 ? "editName": "cline editName";
        var c = '<div id="editctrl_' + d + '" class="writeinfo"><input id="new_' + d + '" type="text" value="' + b + '"><a class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="javascript:;"><cite>确定</cite></a><a class="SG_aBtn SG_aBtnB SG_aBtn_sub" href="javascript:;"><cite>取消</cite></a></div>';
        a.innerHTML = c;
        $E("new_" + d).onkeyup = function() {
            var j = /[ >&<\\\'\,\;\"`\|\t\r\n|\u3000]/ig;
            var l = Core.String.trim(this.value.replace(j, ""));
            if (l != this.value) {
                this.value = l
            }
            if (l == "") {
                $E("editctrl_" + d).childNodes[1].disabled = true
            } else {
                $E("editctrl_" + d).childNodes[1].disabled = false
            }
        };
        $E("new_" + d).onblur = function() {
            if (Core.String.byteLength(this.value) >= 28) {
                this.value = Core.String.leftB(this.value, 28)
            }
        };
        $E("editctrl_" + d).childNodes[1].onclick = function() {
            if ($E("new_" + d).value == b) {
                f(b, 2)
            } else {
                f($E("new_" + d).value, 1)
            }
        };
        $E("editctrl_" + d).childNodes[2].onclick = function() {
            f(b, 2)
        };
        function f(p, m) {
            var q = p;
            var o = "";
            if (Core.String.byteLength(q) > 28) {
                q = Core.String.leftB(q, 28)
            }
            if (m == 1) {
                for (var l = 0; l < i.list.length; l++) {
                    if (i.list[l].name == q) {
                        o = "您已经添加过此分类";
                        break
                    }
                }
            }
            if (o != "") {
                if (!$E("err_" + d)) {
                    Core.Dom.addHTML($E("editctrl_" + d), '<div id="err_' + d + '" class="errTips">' + o + "</div>");
                    a.style.height = "60px"
                } else {
                    $E("err_" + d).value = o
                }
            } else {
                i.list[d].name = q;
                var j = i.itemTpl.join("");
                j = j.replace('<li class="{class}">', "");
                j = j.replace("</li>");
                var n = i.list[d];
                j = j.replace(/\{cate\}/ig, n.name);
                j = j.replace(/\{id\}/ig, n.id);
                j = j.replace(/\{index\}/ig, d);
                j = j.replace(/\{up_class\}/, d == 0 ? "up_disabled": "up");
                j = j.replace(/\{down_class\}/, d == i.list.length - 1 ? "down_disabled": "down");
                a.innerHTML = j;
                a.className = d % 2 == 0 ? "": "cline";
                a.style.height = "30px";
                if (m == 1) {
                    i.edit = true
                }
            }
            o = ""
        }
    },
    delCate: function(b) {
        var c = this;
        var a = b.id.split("_")[1];
        winDialog.confirm("确实要删除此分类吗？删除后不可恢复。", {
            funcOk: function() {
                c.list.remove(a);
                c.update()
            }
        })
    },
    upHandler: function(c) {
        var b = c.id.split("_")[1];
        if (b > 0) {
            var a = this.list[b];
            this.list[b] = this.list[b - 1];
            this.list[b - 1] = a;
            this.update()
        }
    },
    downHandler: function(d) {
        var b = d.id.split("_")[1];
        if (b < this.list.length - 1) {
            var c = b * 1 + 1;
            var a = this.list[c];
            this.list[c] = this.list[b];
            this.list[b] = a;
            this.update()
        }
    },
    showTips: function(a) {
        $E("errTips").innerHTML = a
    },
    dataProvider: function() {
        var a = this;
        App.getArticlesSort(function(g) {
            var b = g;
            a.list = b.c.cates;
            $E("datalist").innerHTML = "";
            for (var d = 0; d < a.list.length; d++) {
                var c = a.itemTpl.join("");
                var f = a.list[d];
                c = c.replace(/\{cate\}/ig, f.name);
                c = c.replace(/\{class\}/ig, d % 2 == 0 ? "": "cline");
                c = c.replace(/\{id\}/ig, f.id);
                c = c.replace(/\{index\}/ig, d);
                c = c.replace(/\{up_class\}/, d == 0 ? "up_disabled": "up");
                c = c.replace(/\{down_class\}/, d == a.list.length - 1 ? "down_disabled": "down");
                Core.Dom.addHTML($E("datalist"), c)
            }
        },
        this.uid)
    },
    update: function() {
        $E("datalist").innerHTML = "";
        for (var b = 0; b < this.list.length; b++) {
            var a = this.itemTpl.join("");
            var c = this.list[b];
            a = a.replace(/\{cate\}/ig, c.name);
            a = a.replace(/\{class\}/ig, b % 2 == 0 ? "": "cline");
            a = a.replace(/\{id\}/ig, c.id);
            a = a.replace(/\{index\}/ig, b);
            a = a.replace(/\{up_class\}/, b == 0 ? "up_disabled": "up");
            a = a.replace(/\{down_class\}/, b == this.list.length - 1 ? "down_disabled": "down");
            Core.Dom.addHTML($E("datalist"), a)
        }
        if (!this.edit) {
            this.edit = true
        }
    },
    getEdit: function() {
        return this.edit
    },
    onSuccess: function(a) {}
};
var QuoteSuccess = Core.Class.create();
QuoteSuccess.prototype = {
    interfaceSave: null,
    _isDialogInit: false,
    _dialog: null,
    memoNullText: "说点什么...",
    articleID: "",
    _cateList: [],
    initialize: function() {
        Lib.checkAuthor();
        this.interfaceSave = new Interface("http://control.blog.sina.com.cn/riaapi/article/edit_cat.php", "ijax"); ! window.CateDialog && (window.CateDialog = new cateDialog())
    },
    show: function(a) { ! this._isDialogInit && this._initDialog();
        this.articleID = a || "";
        this._dialog.show();
        this._dialog.setFixed(true);
        this._dialog.setMiddle();
        this._dialog.setAreaLocked(true)
    },
    save: function() {
        var b = this,
        a = this._dialog.nodes;
        this.interfaceSave.request({
            POST: {
                new_cat: a.selCate.value,
                blog_id: b.articleID,
                reship: a.txtMemo.value === b.memoNullText ? "": a.txtMemo.value
            },
            onSuccess: function(c) {
                b.onSuccess(c);
                b.close()
            },
            onError: function(c) {
                b.onError(c)
            },
            onFail: function() {}
        })
    },
    close: function() {
        this._dialog.hidden();
        this.clear()
    },
    _initDialog: function() {
        var a = this;
        this._dialog = winDialog.createCustomsDialog({
            content: ['<div class="CP_layercon6">', '<div class="turnBox">', '<p class="turnTxt">', '<img class="SG_icon SG_icon203" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="50" height="50" align="absmiddle"/>', '<span class="txt1">转载成功！</span>你还可以写评论...', "</p>", "<ul>", '<li><span class="a">评论：</span><span class="b"><textarea id="#{txtMemo}" style="color:#c8c8c8;" cols="" rows="3" class="SG_textarea">' + this.memoNullText + "</textarea></span></li>", "<li>", '<span class="a">分类：</span>', '<span class="b"><select id="#{selCate}" name=""><option value="00">默认文章分类</option></select>&nbsp;&nbsp;<a id="#{btnShowCate}" href="#" onclick="return false;">创建分类</a></span>', "</li>", "</ul>", '<div class="clearit"></div>', '<div class="butt">', '<a href="#" id="#{btnSave}" onclick="return false;" class="SG_aBtn SG_aBtnB"><cite>保存</cite></a>&nbsp;&nbsp;<a id="#{btnCancel}" onclick="return false;" href="#" class="SG_aBtn SG_aBtnB "><cite>关闭</cite></a>', '<a target="_blank" href="http://blog.sina.com.cn/admin/advice/advice_list.php" class="link">改进建议</a>', "</div>", "</div>", '<div class="clearit"></div>', "</div>"].join("")
        });
        Core.Events.addEvent(this._dialog.nodes.btnSave,
        function() {
            if (a._dialog.nodes.txtMemo.value === a.memoNullText && a._dialog.nodes.selCate.selectedIndex === 0) {
                a.close()
            } else {
                a.verified() && a.save()
            }
        },
        "click");
        Core.Events.addEvent(this._dialog.nodes.btnCancel,
        function() {
            a.close()
        },
        "click");
        Core.Events.addEvent(this._dialog.nodes.btnShowCate,
        function() {
            window.CateDialog.onSuccess = function(d) {
                a._dialog.nodes.selCate.length = 1;
                var f = d || [],
                c,
                b = f.length;
                for (c = 0; c < b; c++) {
                    a.addCate(f[c].value, f[c].label)
                }
                a.addCate("0", "私密博文")
            };
            Lib.checkAuthor();
            window.CateDialog.show($UID)
        },
        "click");
        this._dialog.onHidden = function() {
            a.clear();
            a.onClose()
        };
        this._dialog.nodes.txtMemo.onblur = function() {
            if (this.value.replace(/\s/g, "") === "") {
                this.style.color = "#c8c8c8";
                this.value = a.memoNullText
            }
        };
        this._dialog.nodes.txtMemo.onfocus = function() {
            if (this.value === a.memoNullText) {
                this.style.color = "#000000";
                this.value = ""
            }
        };
        this._initCateList();
        this._isDialogInit = true
    },
    verified: function() {
        var a = this._dialog.nodes;
        if (Core.String.byteLength(a.txtMemo.value) > 2000) {
            winDialog.alert("评论内容必须是1000中文或2000字符以内，请重新输入。");
            return false
        }
        return true
    },
    _initCateList: function() {
        var a = this._dialog.nodes,
        b = this;
        a.selCate.length = 1;
        Lib.checkAuthor();
        App.getArticlesSort(function() {
            var f = x.c.cates,
            d, c = f.length;
            for (d = 0; d < c; d++) {
                b.addCate(f[d].id, f[d].name)
            }
            b.addCate("0", "私密博文")
        },
        $UID)
    },
    _getFaceURL: function(a) {
        var b = parseInt(a) % 8 + 1;
        return "http://portrait" + b + ".sinaimg.cn/" + a + "/blog/50"
    },
    addCate: function(d, a) {
        var b = this._dialog.nodes.selCate;
        var c = $C("option");
        c.value = d;
        c.innerHTML = a;
        b.appendChild(c)
    },
    clear: function() {
        var a = this._dialog.nodes;
        a.txtMemo.style.color = "#c8c8c8";
        a.txtMemo.value = this.memoNullText
    },
    onSuccess: function(a) {},
    onError: function(a) {},
    onClose: function() {}
};
var Quote = Core.Class.create();
Quote.prototype = {
    quoteSuccess: null,
    saving: false,
    articleID: "",
    initialize: function(a) {
        this.quoteSuccess = new QuoteSuccess();
        this.initInterface();
        this.bindEvent(a);
        this.articleID = scope.$articleid
    },
    bindEvent: function(b) {
        var a = this;
        if (b) {
            Core.Events.addEvent($E(b),
            function() {
                a.check()
            })
        }
    },
    initInterface: function() {
        this._interface = new Interface("http://control.blog.sina.com.cn/admin/article/article_quote.php", "jsload")
    },
    check: function(a) {
        this.articleID = a || scope.$articleid;
        Lib.checkAuthor();
        if (!$isLogin) {
            new Lib.Login.Ui().login(this.save.bind2(this))
        } else {
            this.save()
        }
    },
    save: function() {
        var a = this;
        if (this.saving) {
            return
        }
        this.saving = true;
        var b = {
            version: 7,
            blog_id: a.articleID
        };
        this._interface.request({
            GET: b,
            onSuccess: function(c) {
                this.numAdd();
                this.saving = false;
                var d = c.url.split("/").pop().split("_")[1].split(".")[0];
                this.quoteSuccess.onSuccess = function() {
                    winDialog.alert("博文已成功转载！<br/><span style='font-weight: 100; font-size: 12px;'><a target='_blank' href='" + c.url + "'>查看转载博文>></a></span>", {
                        icon: "03"
                    })
                };
                this.quoteSuccess.show(d)
            }.bind2(this),
            onError: function(c) {
                this.saving = false;
                if (c.code == "B119002") {
                    winDialog.alert($SYSMSG[c.code], {
                        icon: "01",
                        funcOk: function() {
                            window.location.href = "http://control.blog.sina.com.cn/upgrade/upgrade_show.php?version=7"
                        }
                    })
                } else {
                    winDialog.alert($SYSMSG[c.code], {
                        icon: "02",
                        funcOk: function() {
                            window.location.reload()
                        }
                    },
                    "alert1");
                    Core.Events.addEvent(winDialog.getDialog("alert1").getNodes().btnClose,
                    function() {
                        window.location.reload()
                    },
                    "click")
                }
            }.bind2(this),
            onFail: function() {
                this.saving = false
            }.bind2(this)
        })
    },
    numAdd: function() {
        var b = $E("quote_sign") || $E("quote_sign_" + this.articleID);
        if (!b) {
            return
        }
        var c = b.innerHTML;
        var a;
        c.replace(/(\d+)/,
        function(f, d) {
            a = d
        });
        b.innerHTML = "(" + (parseInt(a) + 1) + ")"
    }
};
$registJob("quote",
function() {
    $E("quote_set_sign") && (scope.article_quote = new Quote("quote_set_sign"));
    $E("quote_set_sign2") && (scope.article_quote = new Quote("quote_set_sign2"));
    if (!$E("quote_set_sign") && !$E("quote_set_sign2")) { ! scope.article_quote && (scope.article_quote = new Quote());
        scope.articel_quote_alert = function(a) {
            scope.article_quote.check(a)
        }
    }
});
var QuoteList = Core.Class.create();
QuoteList.prototype = {
    saving: false,
    articleID: "",
    pageCount: 0,
    initialize: function(a, b) {
        this.container_id = b;
        this.articleID = scope.$articleid || "";
        this.initInterface();
        this.bindEvent(a);
        $E(this.container_id) && this.initHtml()
    },
    bindEvent: function(b) {
        var a = this;
        if ($E(b)) {
            Core.Events.addEvent($E(b),
            function() {
                a.show()
            })
        }
    },
    initInterface: function() {
        this.addInterface = new Interface("http://control.blog.sina.com.cn/myblog/htmlsource/quotelist.php", "jsload");
        this.delInterface = new Interface("http://control.blog.sina.com.cn/admin/article/article_quote_del.php", "jsload")
    },
    show: function(b, c, a) {
        this.pageCount = a || scope.$x_quote_c || 0;
        c && (this.container_id = c);
        if (!this.container_id) {
            return
        }
        this.articleID = b || scope.$articleid;
        c && (this.container_id = c);
        if ($E(this.container_id) && $E(this.container_id).innerHTML.replace(/\s/g, "") === "") {
            this.initHtml()
        }
        if (this.isShow) {
            this.hidden();
            return
        }
        $E(this.container_id).style.display = "block";
        this.loadData();
        this.isShow = true
    },
    hidden: function() {
        $E(this.container_id).style.display = "none";
        this.isShow = false
    },
    initHtml: function() {
        var b = $E(this.container_id);
        if (b) {
            var c = this.articleID || "";
            var a = '<h3><a href="#" onclick="return false" title="关闭" id="ql_close' + c + '" class="blogzz_closepic SG_floatR"></a>转载列表：</h3>                <ul class="ul_zzlist" id="ql_content' + c + '">                </ul>				<ul style="display:none"><li id="ql_tip' + c + '"></li></ul>                <div class="SG_clearB"></div>                <div class="blogzz_btn">					<a id="btnArticleQuote' + c + '" href="#" onclick="scope.article_quote && scope.article_quote.check(\'' + c + '\');return false;" class="SG_aBtn SG_aBtn_ico SG_turn"><cite><img class="SG_icon SG_icon111" id="quoteList_quote' + c + '" src="http://simg.sinajs.cn/blog7style/images/common/sg_trans.gif" width="15" height="15" align="absmiddle" />转载</cite></a>					<p id="quoteDescription' + c + '" class="SG_turntxt">转载是分享博文的一种常用方式...</p>				</div>				<div id="ql_page' + c + '" class="blogzz_paged"></div>				<div class="clearit"></div>';
            b.innerHTML = a;
            Lib.checkAuthor();
            $E("btnArticleQuote" + c) && ($E("btnArticleQuote" + c).style.display = $isAdmin ? "none": "");
            $E("quoteDescription" + c) && ($E("quoteDescription" + c).style.display = $isAdmin ? "": "none");
            Core.Events.addEvent($E("ql_close" + c), this.hidden.bind2(this))
        }
    },
    setTip: function(a) {
        var d = this.articleID || "";
        var c = $E("ql_tip" + d);
        var b = $E("ql_content" + d);
        if (a != "ok") {
            c.innerHTML = "暂无转载。";
            b.style.display = "none";
            c.parentNode.style.display = "block"
        } else {
            c.parentNode.style.display = "none";
            b.style.display = "block"
        }
    },
    loadData: function(b) {
        var a = this;
        var b = b || 1;
        var c = {
            blogid: a.articleID,
            version: 7,
            page: b
        };
        this.addInterface.request({
            GET: c,
            onSuccess: function(d) {
                if (d.length > 0) {
                    this.setTip("ok");
                    this.parseData(d);
                    this.page(b)
                } else {
                    this.setTip()
                }
            }.bind2(this),
            onError: function(d) {
                showError(d.code)
            },
            onFail: function() {}
        })
    },
    parseData: function(d) {
        var f = this.articleID || "";
        var c = "";
        var a = d.length;
        for (var b = 0; b < a; b++) {
            c += this.buildListHtml(d[b])
        }
        $E("ql_content" + f).innerHTML = c;
        scope.quoteList_quote = new Quote("quoteList_quote" + f)
    },
    page: function(c) {
        var d = this.articleID || "";
        var b = this.pageCount;
        var a = Math.ceil(b / 10, 10);
        if (a > 1) {
            Ui.Pagination.init({
                pageNode: "ql_page" + d,
                nodeClassNamePrefix: "SG",
                curPage: c,
                maxPage: a,
                pageTpl: this.loadData.bind2(this),
                type: 3
            }).show()
        } else {
            $E("ql_page" + d).innerHTML = ""
        }
    },
    buildListHtml: function(b) {
        if ($isAdmin) {
            b.isShow = ""
        } else {
            b.isShow = "none"
        }
        var a = ['<li id="pl_#{rp_blogid}">', '<p class="blogzz_pinfo SG_txtb SG_floatL">', '<a target="_blank" href="http://blog.sina.com.cn/u/#{rp_bloguid}">#{rp_bloguname}</a>', '<span class="zzlist_mleft zzlist_mright">等级<em class="SG_txtc">(#{rp_ugrade})</em></span>', '<span class="zzlist_mleft">转载了此文：</span><a target="_blank" href="http://blog.sina.com.cn/s/blog_#{rp_blogid}.html">#{rp_blogtitle}</a>', "</p>", '<p class="SG_floatR">', '<em class="SG_txtc">#{rp_blogpubdate}</em>', '<a href="#" style="display:#{isShow}" class="CP_a_fuc" onclick="scope.article_quoteList.del(\'#{rp_blogid}\',\'' + this.articleID + '\');return false;">[<cite id="pl_del_#{rp_bloguid}">删除</cite>]</a>', "</p>", "</li>"].join("");
        b.rp_ugrade = b.rp_ugrade.toString();
        return new Ui.Template(a).evaluate(b)
    },
    del: function(b, a) {
        var c = this;
        var f = {
            sblog_id: scope.$articleid || a,
            version: 7,
            blog_id: b
        },
        c = this;
        $E("quote_sign_count") && ($E("quote_sign_count").innerHTML = +$E("quote_sign_count").innerHTML - 1);
        Core.Dom.removeNode($E("pl_" + b));
        var d = c.articleID || "";
        if ($E("ql_content" + d) && $E("ql_content" + d).getElementsByTagName("li").length == 0) {
            c.setTip()
        }
        this.delInterface.request({
            GET: f,
            onSuccess: function(g) {
                c.onDeleted()
            }.bind2(this),
            onError: function(g) {
                showError(g.code)
            },
            onFail: function() {}
        })
    },
    onDeleted: function() {}
};
$registJob("quote_list",
function() {
    trace("quote_list！");
    scope.article_quoteList = new QuoteList("quote_sign", "blog_quote")
});
Core.String.StringBuffer = function() {
    this.buffer = []
};
Core.String.StringBuffer.prototype.append = function(a) {
    this.buffer.push(a);
    return this
};
Core.String.StringBuffer.prototype.toString = function() {
    return this.buffer.join("")
};
$SYSMSG.extend({
    B00901: "投票不存在。",
    B00902: "投票已截止。",
    B00903: "超出允许投票个数。",
    B00904: "你已投过票了!<br/>重复投票是没有意义的。",
    B00905: "投票主题过短<br/>至少要5个汉字或10个字符！",
    B00906: "投票选项至少要填写2项",
    B00907: "投票的截止时间不能小于当前时间，请重新选择 ",
    B00908: "投票选项最多可填写7项",
    B00909: "投票主题不能为空"
});
Core.Dom.getElementsByAttr = function(f, b, g) {
    var c = [];
    for (var d = 0,
    a = f.childNodes.length; d < a; d++) {
        if (f.childNodes[d].nodeType == 1) {
            if (f.childNodes[d].getAttribute(b) == g) {
                c.push(f.childNodes[d])
            }
            if (f.childNodes[d].childNodes.length > 0) {
                c = c.concat(arguments.callee.call(null, f.childNodes[d], b, g))
            }
        }
    }
    return c
};
if (typeof infosoftglobal == "undefined") {
    var infosoftglobal = new Object()
}
if (typeof infosoftglobal.FusionChartsUtil == "undefined") {
    infosoftglobal.FusionChartsUtil = new Object()
}
infosoftglobal.FusionCharts = function(d, a, m, i, o, f, j, n, b, g, l) {
    if (!document.getElementById) {
        return
    }
    this.initialDataSet = false;
    this.params = new Object();
    this.variables = new Object();
    this.attributes = new Array();
    if (d) {
        this.setAttribute("swf", d)
    }
    if (a) {
        this.setAttribute("id", a)
    }
    o = o ? o: 0;
    this.addVariable("debugMode", o);
    m = m.toString().replace(/\%$/, "%25");
    if (m) {
        this.setAttribute("width", m)
    }
    i = i.toString().replace(/\%$/, "%25");
    if (i) {
        this.setAttribute("height", i)
    }
    if (j) {
        this.addParam("bgcolor", j)
    }
    this.addParam("quality", "high");
    this.addParam("allowScriptAccess", "always");
    this.addVariable("chartWidth", m);
    this.addVariable("chartHeight", i);
    this.addVariable("DOMId", a);
    f = f ? f: 0;
    this.addVariable("registerWithJS", f);
    n = n ? n: "noScale";
    this.addVariable("scaleMode", n);
    b = b ? b: "EN";
    this.addVariable("lang", b);
    this.detectFlashVersion = g ? g: 1;
    this.autoInstallRedirect = l ? l: 1;
    this.installedVer = infosoftglobal.FusionChartsUtil.getPlayerVersion();
    if (!window.opera && document.all && this.installedVer.major > 7) {
        infosoftglobal.FusionCharts.doPrepUnload = true
    }
};
infosoftglobal.FusionCharts.prototype = {
    setAttribute: function(a, b) {
        this.attributes[a] = b
    },
    getAttribute: function(a) {
        return this.attributes[a]
    },
    addParam: function(a, b) {
        this.params[a] = b
    },
    getParams: function() {
        return this.params
    },
    addVariable: function(a, b) {
        this.variables[a] = b
    },
    getVariable: function(a) {
        return this.variables[a]
    },
    getVariables: function() {
        return this.variables
    },
    getVariablePairs: function() {
        var a = new Array();
        var b;
        var c = this.getVariables();
        for (b in c) {
            a.push(b + "=" + c[b])
        }
        return a
    },
    getSWFHTML: function() {
        var d = "";
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            d = '<embed type="application/x-shockwave-flash" src="' + this.getAttribute("swf") + '" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '"  ';
            d += ' id="' + this.getAttribute("id") + '" name="' + this.getAttribute("id") + '" ';
            var c = this.getParams();
            for (var a in c) {
                d += [a] + '="' + c[a] + '" '
            }
            var b = this.getVariablePairs().join("&");
            if (b.length > 0) {
                d += 'flashvars="' + b + '"'
            }
            d += "/>"
        } else {
            d = '<object id="' + this.getAttribute("id") + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '">';
            d += '<param name="movie" value="' + this.getAttribute("swf") + '" />';
            var c = this.getParams();
            for (var a in c) {
                d += '<param name="' + a + '" value="' + c[a] + '" />'
            }
            var b = this.getVariablePairs().join("&");
            if (b.length > 0) {
                d += '<param name="flashvars" value="' + b + '" />'
            }
            d += "</object>"
        }
        return d
    },
    setDataURL: function(a) {
        if (this.initialDataSet == false) {
            this.addVariable("dataURL", a);
            this.initialDataSet = true
        } else {
            var b = infosoftglobal.FusionChartsUtil.getChartObject(this.getAttribute("id"));
            if (!b.setDataURL) {
                __flash__addCallback(b, "setDataURL")
            }
            b.setDataURL(a)
        }
    },
    encodeDataXML: function(d) {
        var j = ["\\$", "\\+"];
        var c = d.match(/=\s*\".*?\"/g);
        if (c) {
            for (var f = 0; f < c.length; f++) {
                var l = c[f].replace(/^=\s*\"|\"$/g, "");
                l = l.replace(/\'/g, "%26apos;");
                var g = d.indexOf(c[f]);
                var a = "='" + l + "'";
                var b = d.substring(0, g);
                var m = d.substring(g + c[f].length);
                var d = b + a + m
            }
        }
        d = d.replace(/\"/g, "%26quot;");
        d = d.replace(/%(?![\da-f]{2}|[\da-f]{4})/ig, "%25");
        d = d.replace(/\&/g, "%26");
        return d
    },
    setDataXML: function(a) {
        if (this.initialDataSet == false) {
            this.addVariable("dataXML", this.encodeDataXML(a));
            this.initialDataSet = true
        } else {
            var b = infosoftglobal.FusionChartsUtil.getChartObject(this.getAttribute("id"));
            b.setDataXML(a)
        }
    },
    setTransparent: function(a) {
        if (typeof a == "undefined") {
            a = true
        }
        if (a) {
            this.addParam("WMode", "transparent")
        } else {
            this.addParam("WMode", "Opaque")
        }
    },
    render: function(a) {
        if ((this.detectFlashVersion == 1) && (this.installedVer.major < 8)) {
            if (this.autoInstallRedirect == 1) {
                var b = window.confirm("You need Adobe Flash Player 8 (or above) to view the charts. It is a free and lightweight installation from Adobe.com. Please click on Ok to install the same.");
                if (b) {
                    window.location = "http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            var d = (typeof a == "string") ? document.getElementById(a) : a;
            if (this.getVariable("scaleMode").search(/noscale/i) >= 0 && (this.getAttribute("width").search("%") > 0 || this.getAttribute("height").search("%") > 0)) {
                var c = this;
                if (window.addEventListener) {
                    window.addEventListener("load",
                    function() {
                        d.innerHTML = c.getSWFHTML()
                    },
                    false)
                } else {
                    if (window.attachEvent) {
                        window.attachEvent("onload",
                        function() {
                            d.innerHTML = c.getSWFHTML()
                        })
                    } else {
                        d.innerHTML = this.getSWFHTML()
                    }
                }
            } else {
                d.innerHTML = this.getSWFHTML()
            }
            if (!document.embeds[this.getAttribute("id")] && !window[this.getAttribute("id")]) {
                window[this.getAttribute("id")] = document.getElementById(this.getAttribute("id"))
            }
            return true
        }
    }
};
infosoftglobal.FusionChartsUtil.getPlayerVersion = function() {
    var c = new infosoftglobal.PlayerVersion([0, 0, 0]);
    if (navigator.plugins && navigator.mimeTypes.length) {
        var a = navigator.plugins["Shockwave Flash"];
        if (a && a.description) {
            c = new infosoftglobal.PlayerVersion(a.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."))
        }
    } else {
        if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) {
            var d = 1;
            var b = 3;
            while (d) {
                try {
                    b++;
                    d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + b);
                    c = new infosoftglobal.PlayerVersion([b, 0, 0])
                } catch(f) {
                    d = null
                }
            }
        } else {
            try {
                var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
            } catch(f) {
                try {
                    var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    c = new infosoftglobal.PlayerVersion([6, 0, 21]);
                    d.AllowScriptAccess = "always"
                } catch(f) {
                    if (c.major == 6) {
                        return c
                    }
                }
                try {
                    d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                } catch(f) {}
            }
            if (d != null) {
                c = new infosoftglobal.PlayerVersion(d.GetVariable("$version").split(" ")[1].split(","))
            }
        }
    }
    return c
};
infosoftglobal.PlayerVersion = function(a) {
    this.major = a[0] != null ? parseInt(a[0]) : 0;
    this.minor = a[1] != null ? parseInt(a[1]) : 0;
    this.rev = a[2] != null ? parseInt(a[2]) : 0
};
infosoftglobal.FusionChartsUtil.cleanupSWFs = function() {
    var c = document.getElementsByTagName("OBJECT");
    for (var b = c.length - 1; b >= 0; b--) {
        c[b].style.display = "none";
        for (var a in c[b]) {
            if (typeof c[b][a] == "function") {
                c[b][a] = function() {}
            }
        }
    }
};
if (infosoftglobal.FusionCharts.doPrepUnload) {
    if (!infosoftglobal.unloadSet) {
        infosoftglobal.FusionChartsUtil.prepUnload = function() {
            __flash_unloadHandler = function() {};
            __flash_savedUnloadHandler = function() {};
            window.attachEvent("onunload", infosoftglobal.FusionChartsUtil.cleanupSWFs)
        };
        window.attachEvent("onbeforeunload", infosoftglobal.FusionChartsUtil.prepUnload);
        infosoftglobal.unloadSet = true
    }
}
if (!document.getElementById && document.all) {
    document.getElementById = function(a) {
        return document.all[a]
    }
}
if (Array.prototype.push == null) {
    Array.prototype.push = function(a) {
        this[this.length] = a;
        return this.length
    }
}
infosoftglobal.FusionChartsUtil.getChartObject = function(b) {
    var a = null;
    if (navigator.appName.indexOf("Microsoft Internet") == -1) {
        if (document.embeds && document.embeds[b]) {
            a = document.embeds[b]
        } else {
            a = window.document[b]
        }
    } else {
        a = window[b]
    }
    if (!a) {
        a = document.getElementById(b)
    }
    return a
};
var getChartFromId = infosoftglobal.FusionChartsUtil.getChartObject;
var FusionCharts = infosoftglobal.FusionCharts;
var cache_vote_data = null;
var data_for_flash = {};
var vote_total = 0;
RenderFlash = Core.Class.create();
RenderFlash.prototype = {
    flashId: null,
    data: null,
    current: null,
    eventDom: null,
    _labels: null,
    selected: [],
    initialize: function() {
        this.eventDom = {
            tab: $E("tabDiv") ? $E("tabDiv") : null,
            line: $E("lineView") ? $E("lineView") : null,
            pie: $E("pieView") ? $E("pieView") : null,
            column: $E("columnView") ? $E("columnView") : null,
            content: $E("voteViewContent") ? $E("voteViewContent") : null
        };
        this._refreshFlashId();
        this._addClickEvent(this.eventDom.line);
        this._addClickEvent(this.eventDom.pie);
        this._addClickEvent(this.eventDom.column);
        this.combineData()
    },
    showTab: function(l, A, t) {
        if (this.current == l) {
            return
        }
        var z = Core.Dom.getElementsByClass($E("voter"), "div", "vShape")[0];
        if (z) {
            z.style.display = ""
        }
        window.clearAllInterval();
        var f = [];
        var a = cache_vote_data;
        for (var r = 0; r < this._labels.length; r++) {
            var d = a[prefix + (r + 1)] == null ? 0 : a[prefix + (r + 1)];
            if (vote_total == 0) {
                var c = "0%"
            } else {
                var c = Math.round(d / vote_total * 100) + "%"
            }
            f.push(c)
        }
        if (l == "line") {
            this.current = "line";
            $E("voteViewContent").innerHTML = window.vote_cache_content_html;
            window.renderVoteNum(cache_vote_data);
            var p = document.getElementsByName("chb1");
            for (var s = 0; s < p.length; s++) {
                p[s].disabled = "true";
                try {
                    p[s].parentNode.childNodes[3].style.cursor = "default"
                } catch(q) {}
            }
        } else {
            if (l == "Pie3D.swf") {
                this.current = "Pie3D.swf";
                var m = this._tabTemplate.chooses.join("");
                var b = "";
                for (var u = 0; u < this._labels.length; u++) {
                    var v = this._tabTemplate.item.join("");
                    v = v.replace("#{type}", window.vote_rc_type + "");
                    v = v.replace(/([#][{]index[}])/ig, u + 1);
                    v = v.replace("#{text}", this._labels[u]);
                    b += v
                }
                m = m.replace("#{uls}", b);
                m += this._tabTemplate.flash.join("");
                this.eventDom.content.innerHTML = m;
                var o = this._labels.length * 30;
                if (o < 150) {
                    o = 150
                }
                var g = "<chart baseFontSize='12' baseFontColor='888888' numberSuffix='%25' showAboutMenuItem='0' decimals='2' chartTopMargin='0' chartBottomMargin='0' caption='' showValues='0' formatNumberScale='0' bgColor='99CCFF,FFFFFF' bgAlpha='0,0' startingAngle='60'>";
                for (var u = 0; u < this.data.length; u++) {
                    var y = this.data[u];
                    if (this.selected[u] != null) {
                        g += "<set label='" + (u + 1) + "' value='" + f[u].replace("%", "") + "' displayValue='" + (Core.String.shorten(this._labels[u], 7, "…")) + "' toolText='" + this._labels[u] + "(" + f[u] + ")' isSliced='1' />"
                    } else {
                        g += "<set label='" + (u + 1) + "' value='" + f[u].replace("%", "") + "' displayValue='" + (Core.String.shorten(this._labels[u], 7, "…")) + "' toolText='" + this._labels[u] + "(" + f[u] + ")' />"
                    }
                }
                g += "</chart>";
                var n = new FusionCharts($_GLOBAL.flashBasicURL + "Pie3D.swf", A, "360", o, "0", "0");
                n.setDataXML(g);
                n.setTransparent(true);
                n.render(t)
            } else {
                if (l == "Column3D.swf") {
                    this.current = "Column3D.swf";
                    var m = this._tabTemplate.chooses.join("");
                    var b = "";
                    for (var u = 0; u < this._labels.length; u++) {
                        var v = this._tabTemplate.item.join("");
                        v = v.replace("#{type}", window.vote_rc_type + "");
                        v = v.replace(/([#][{]index[}])/ig, u + 1);
                        v = v.replace("#{text}", this._labels[u]);
                        b += v
                    }
                    m = m.replace("#{uls}", b);
                    m += this._tabTemplate.flash.join("");
                    this.eventDom.content.innerHTML = m;
                    var o = this._labels.length * 30;
                    if (o < 150) {
                        o = 150
                    }
                    var g = "<chart baseFontSize='12' baseFontColor='888888' showValues='1' outCnvBaseFontColor='999999' outCnvBaseFontSize='12' numberSuffix='%25' showAboutMenuItem='0' decimals='2' yAxisMaxValue='100' palette='2' enableRotation='1' canvasBgColor='ffffff' canvasBgAlpha='0' canvasBgDepth='3' canvasBaseColor='ffffff' divLineColor='d8d8d8' numDivLines='4' bgAlpha='0' divLineColor='d8d8d8' canvasPadding='8' chartLeftMargin='0' chartRightMargin='5' chartTopMargin='5' chartBottomMargin='0' maxColWidth='70' showValues='0'><styles><definition><style name='myToolTip' type='font' size='12' color='666666' /></definition><application><apply toObject='ToolTip' styles='myToolTip' /></application></styles>";
                    for (var u = 0; u < this.data.length; u++) {
                        var y = this.data[u];
                        g += "<set label='" + (u + 1) + "' value='" + f[u].replace("%", "") + "' toolText='" + this._labels[u] + "(" + f[u] + ")' />"
                    }
                    g += "</chart>";
                    var n = new FusionCharts($_GLOBAL.flashBasicURL + "Column3D.swf", A, "360", o, "0", "0");
                    n.setDataXML(g);
                    n.setTransparent(true);
                    n.render(t)
                }
            }
        }
        window.getNewList();
        window.initNewVote();
        if ($E("flashContent")) {
            $E("flashContent").style.padding = "13px 0 0 "
        }
    },
    _refreshFlashId: function() {
        this.flashId = Core.Math.getUniqueId()
    },
    _addClickEvent: function(a) {
        var b = this;
        if (a) {
            a.onclick = function() {
                b._onClickHandler(this)
            }
        }
    },
    _onClickHandler: function(b) {
        var d = this;
        function a(f) {
            d.eventDom.line.parentNode.className = "";
            d.eventDom.pie.parentNode.className = "";
            d.eventDom.column.parentNode.className = "";
            d.eventDom[f].parentNode.className = "cur SG_txtb"
        }
        if (b != null) {
            var c = b.id;
            if (c == "lineView") {
                this.showTab("line", "lineId", "voteViewContent");
                a("line")
            } else {
                if (c == "pieView") {
                    this.showTab("Pie3D.swf", "Pie3D_" + this.flashId, "flashContent");
                    a("pie")
                } else {
                    if (c == "columnView") {
                        this.showTab("Column3D.swf", "Column3D_" + this.flashId, "flashContent");
                        a("column")
                    }
                }
            }
        }
    },
    combineData: function(b) {
        if (!this.data) {
            this.data = [];
            var f = this._getLabel();
            for (var c = 0; c < f.length; c++) {
                this.data[this.data.length] = {
                    label: f[c],
                    num: null
                }
            }
        }
        var d = this._getVoteNum();
        if (b != null) {
            for (var c = 0; c < b.length; c++) {
                var a = parseInt(b[c].split("_")[1], 10) - 1;
                d[a]++;
                this.selected[a] = a;
                this.data[a].num++
            }
        } else {
            for (var c = 0; c < this.data.length; c++) {
                this.data[c].num = d[c]
            }
        }
    },
    _getLabel: function() {
        var d = [];
        var b = Core.Dom.getElementsByClass($E("voteViewContent"), "span", "");
        var c = b.length;
        for (var a = 0; a < c; a++) {
            d[d.length] = b[a].innerHTML
        }
        this._labels = d;
        return d
    },
    _getVoteNum: function() {
        var a = [];
        if (cache_vote_data) {
            for (var b = 0; b < 10; b++) {
                if (cache_vote_data[prefix + (b + 1)] == null) {
                    break
                }
                a[a.length] = cache_vote_data[prefix + (b + 1)]
            }
        }
        return a
    },
    _tabTemplate: {
        chooses: ['<div class="vContentRe">', "<ul>", "#{uls}", "</ul>", "</div>"],
        item: ['<li class="clearfix">', '<div class="choosed">', '<input type="#{type}" disabled="disabled" id="chb#{index}"/><label for="chb#{index}" style="cursor:default"><em>#{index}.</em><span>#{text}</span></label>', "</div>", "</li>"],
        flash: ['<div id="flashContent" class="vContentPic">', "</div>"]
    }
}; (function(a) {
    a.rf = null;
    a.changeType = function(b) {
        $E("mutiple").style.display = b ? "": "none";
        $E("voteType").value = b ? $E("mutiple").value: 1
    };
    a.checkNum = function(f, d) {
        var c = document.getElementsByName("chb1");
        var j = 0;
        for (var g = 0; g < c.length; g++) {
            var b = c[g];
            if (b.checked) {
                j++
            }
        }
        if (j > d) {
            winDialog.alert("最多只能选" + d + "项！", {
                icon: "01"
            });
            f.checked = false
        }
    };
    a.isExpired = function(b) {
        return (b.replace(/(-)|\s/g, "") < getTimestamp("yyyy-MM-dd hh").replace(/(-)|\s/g, ""))
    };
    a.getTimestamp = function(j) {
        var i = new Date();
        var d = i.getFullYear();
        var c = i.getMonth() + 1;
        c = c > 9 ? c: ("0" + c);
        var b = i.getDate() > 9 ? i.getDate() : ("0" + i.getDate());
        var g = i.getHours();
        var l = i.getMinutes() > 9 ? i.getMinutes() : ("0" + i.getMinutes());
        var f = i.getSeconds() > 9 ? i.getSeconds() : ("0" + i.getSeconds());
        return (j.replace(/(y{2,4})/, d).replace("MM", c).replace("dd", b).replace("hh", g).replace("mm", l).replace("ss", f))
    };
    a.readyFun = function() {
        var n;
        var l = false;
        Lib.checkAuthor();
        if ($isLogin) {
            n = $UID
        } else {
            n = "0"
        }
        var c = swfAPI.getC(n);
        if (c) {
            var q = c.split("|");
            for (var g = 0; g < q.length; g++) {
                var b = q[g];
                if (b == scope.$articleid + "_" + voteid) {
                    l = true;
                    break
                }
            }
        }
        if (!l) {
            Core.Events.addEvent("voteBtn",
            function() {
                var j = document.getElementsByName("chb1");
                var u = [];
                for (var r = 0; r < j.length; r++) {
                    var s = j[r];
                    if (s.checked) {
                        u.push(voteid + "_" + (r + 1))
                    }
                }
                if (u.length < 1) {
                    winDialog.alert("请选择要投票的项！", {
                        icon: "01"
                    });
                    return false
                }
                Lib.checkAuthor();
                if ($isLogin) {
                    n = $UID
                } else {
                    n = "0"
                }
                this.flag = true;
                var t = u.length;
                new Interface("http://control.blog.sina.com.cn/admin/vote/shot_vote.php?version=7", "ijax").request({
                    POST: {
                        blog_id: scope.$articleid,
                        vote_checklist: u.join(",")
                    },
                    onSuccess: function(F) {
                        var i = Core.Dom.getElementsByClass(document, "div", "vBtn")[0];
                        Core.Dom.removeParentNode($E("voteBtn"));
                        i.innerHTML = '<span class="voteState">已投票</span>';
                        var A = Core.Dom.getElementsByClass($E("voter"), "div", "vShape")[0];
                        if (A) {
                            A.style.display = ""
                        }
                        try {
                            for (var v = 0; v < window.itvIds.length; v++) {
                                try {
                                    window.clearInterval(window.itvIds[v])
                                } catch(G) {}
                            }
                        } catch(G) {}
                        if (c) {
                            if (q.length > 99) {
                                swfAPI.clearK(n)
                            } else {
                                c = scope.$articleid + "_" + voteid + "|" + c
                            }
                        } else {
                            c = scope.$articleid + "_" + voteid
                        }
                        swfAPI.setC(n, c.toString());
                        var C = {};
                        C[prefix + "0"] = parseInt($E("total").innerHTML.replace(/人/g, "")) + 1;
                        var E = Core.Dom.getElementsByClass($E("voter"), "div", "num");
                        for (var y = 0; y < j.length; y++) {
                            var H = j[y];
                            var z = E[y].innerHTML.replace(/(\<span.*)/gi, "") * 1;
                            C[prefix + (y + 1)] = z;
                            var D = t;
                            while (D > 0) {
                                var B = u[D - 1];
                                if (y == (B.split("_")[1]) * 1 - 1) {
                                    H.checked = true;
                                    C[prefix + (y + 1)] = z + 1
                                }
                                D--
                            }
                            H.disabled = true;
                            try {
                                if ($IE) {
                                    j[f].parentNode.childNodes[2].style.cursor = "default"
                                } else {
                                    j[f].parentNode.childNodes[3].style.cursor = "default"
                                }
                            } catch(G) {}
                        }
                        vote_total++;
                        $E("total").innerHTML = vote_total + "人";
                        cache_vote_data = C;
                        renderVoteNum(C, l);
                        window.initLoginBar()
                    },
                    onError: function(B) {
                        try {
                            winDialog.alert($SYSMSG[B.code]);
                            if (B.code == "B00902") {
                                var A = Core.Dom.getElementsByClass(document, "div", "vBtn")[0];
                                Core.Dom.removeParentNode($E("voteBtn"));
                                A.innerHTML = '<span class="voteState">投票已截止</span>';
                                var C = $N("chb1");
                                for (var z = 0; z < C.length; z++) {
                                    C[z].disabled = true;
                                    try {
                                        C[z].parentNode.childNodes[3].style.cursor = "default"
                                    } catch(y) {}
                                }
                                var v = Core.Dom.getElementsByClass($E("voter"), "div", "vShape")[0];
                                if (v) {
                                    v.style.display = ""
                                }
                            } else {
                                if (B.code == "B00904") {
                                    var A = Core.Dom.getElementsByClass(document, "div", "vBtn")[0];
                                    Core.Dom.removeParentNode($E("voteBtn"));
                                    A.innerHTML = '<span class="voteState">已投票</span>';
                                    var C = $N("chb1");
                                    for (var z = 0; z < C.length; z++) {
                                        C[z].disabled = true;
                                        try {
                                            C[z].parentNode.childNodes[3].style.cursor = "default"
                                        } catch(y) {}
                                    }
                                    var v = Core.Dom.getElementsByClass($E("voter"), "div", "vShape")[0];
                                    if (v) {
                                        v.style.display = ""
                                    }
                                }
                            }
                        } catch(y) {}
                    }
                })
            },
            "click", false)
        } else {
            var d = Core.Dom.getElementsByClass(document, "div", "vBtn")[0];
            Core.Dom.removeParentNode($E("voteBtn"));
            d.innerHTML = '<span class="voteState">已投票</span>';
            var o = document.getElementsByName("chb1");
            for (var f = 0; f < o.length; f++) {
                o[f].disabled = "true";
                try {
                    if ($IE) {
                        o[f].parentNode.childNodes[2].style.cursor = "default"
                    } else {
                        o[f].parentNode.childNodes[3].style.cursor = "default"
                    }
                } catch(p) {}
            }
            var m = Core.Dom.getElementsByClass($E("voter"), "div", "vShape")[0];
            if (m) {
                m.style.display = ""
            }
        }
    };
    a.swfAPI = {
        setC: function(b, c) {
            $E("swfId").setC(b, c)
        },
        getC: function(b) {
            return $E("swfId").getC(b)
        },
        clearK: function(b) {
            $E("swfId").clearK(b)
        },
        clearC: function() {
            $E("swfId").clearC()
        }
    };
    a.getLabel = function() {
        var f = [];
        var c = Core.Dom.getElementsByClass($E("voteViewContent"), "span", "");
        var d = c.length;
        for (var b = 0; b < d; b++) {
            f[f.length] = c[b].innerHTML
        }
        return f
    };
    a.getNewList = function(b) {
        if ($E("voterlist")) {
            Lib.checkAuthor();
            var d = "";
            try {
                d = Core.Dom.getElementsByClass($E("voter"), "span", "voteState")[0].innerHTML
            } catch(c) {}
            var f = new Interface("http://control.blog.sina.com.cn/admin/vote/get_user_vote.php?version=7", $IE ? "ijax": "jsload");
            f.request({
                GET: {
                    blog_id: scope.$articleid,
                    vote_id: voteid
                },
                onSuccess: function(g) {
                    if (g && g != "") {
                        var o = [];
                        for (var m = 0; m < g.length; m++) {
                            var n = g[m];
                            o[o.length] = n[0]
                        }
                        this.vote_interface_result = g;
                        Lib.Uic.getNickName(o, insertList)
                    } else {
                        if ($E("voterlist") && $isLogin && d != "投票已截止") {
                            $E("voterlist").innerHTML = "还没有博主投票呢，赶紧抢个沙发吧。"
                        } else {
                            if (d == "投票已截止") {
                                try {
                                    var j = Core.Dom.getElementsByClass($E("voter"), "div", "vShape")[0];
                                    if (j) {
                                        j.style.display = "none"
                                    }
                                    Core.Dom.getElementsByClass($E("module_920"), "div", "newVoteList SG_j_linedot1")[0].style.display = "none"
                                } catch(l) {}
                            } else {
                                if (b || !$isLogin) {
                                    $E("voterlist").innerHTML = "还没有博主投票呢，赶紧抢个沙发吧。"
                                } else {
                                    $E("voterlist").innerHTML = "加载中…"
                                }
                            }
                        }
                    }
                },
                onError: function(i) {
                    if ($E("voterlist")) {
                        $E("voterlist").innerHTML = "加载中…"
                    }
                    if (d == "投票已截止") {
                        try {
                            Core.Dom.getElementsByClass($E("module_920"), "div", "newVoteList SG_j_linedot1")[0].style.display = "none"
                        } catch(g) {}
                    }
                }
            })
        }
    };
    a.insertList = function(m) {
        function d(j) {
            var i = new Date(j * 1000);
            return i.getFullYear() + "-" + ((i.getMonth() + 1) < 10 ? ("0" + (i.getMonth() + 1)) : (i.getMonth() + 1)) + "-" + i.getDate() + " " + i.getHours() + ":" + (i.getMinutes() < 10 ? "0" + i.getMinutes() : i.getMinutes())
        }
        var l = this.getLabel();
        var n = '<li><span class="SG_dot"></span><span class="txt"><a target="_blank" href="#{url}">#{nick}</a>&nbsp;<span class="SG_txtb">投票给 #{vote}</span><em class="SG_txtc">#{time}</em></span></li>';
        var o = "";
        var f = 0;
        if (this.vote_interface_result) {
            for (var q in m) {
                var r = vote_interface_result[f];
                var g = n;
                g = g.replace("#{url}", "http://blog.sina.com.cn/u/" + r[0]);
                g = g.replace("#{nick}", m[q]);
                g = g.replace("#{time}", d(r[2]));
                var b = "";
                var p = r[1].split(",");
                for (var c = 0; c < p.length; c++) {
                    b += '"' + l[p[c] - 1] + '" '
                }
                g = g.replace("#{vote}", b);
                o = g + o;
                f++
            }
            if ($E("voterlist")) {
                $E("voterlist").innerHTML = o
            }
        }
    };
    a.initLoginBar = function() {
        Lib.checkAuthor();
        if ($E("vote_login_txt")) {
            if ($isLogin) {
                $E("vote_login_txt").style.display = "none"
            } else {
                $E("vote_login_txt").style.display = "";
                $E("vote_login").onclick = function() {
                    var b = new Lib.Login.Ui();
                    b.login()
                }
            }
        }
    };
    a.initNewVote = function() {
        Lib.checkAuthor();
        if ($E("voteAD")) {
            if ($isLogin) {
                new Interface("http://control.blog.sina.com.cn/riaapi/profile/unread.php", $IE ? "ijax": "jsload").request({
                    GET: {
                        uid: $UID,
                        product: "blog",
                        version: 7
                    },
                    onSuccess: function(b) {
                        if (b.version == 7) {
                            $E("voteAD").innerHTML = '<a class="SG_linka">+</a>&nbsp;<a target="_blank" href="http://control.blog.sina.com.cn/admin/article/article_add.php#voteadd">发起新投票</a>'
                        } else {
                            $E("voteAD").innerHTML = '<a href="http://blog.sina.com.cn/lm/iframe/xhtml/2010/blogspread.html" target="_blank">[投票是新版博客专有功能，点击立即体验]</a>'
                        }
                    },
                    onError: function(b) {
                        $E("voteAD").innerHTML = '<a href="http://blog.sina.com.cn/lm/iframe/xhtml/2010/blogspread.html" target="_blank">[投票是新版博客专有功能，点击立即体验]</a>'
                    }
                })
            } else {
                $E("voteAD").innerHTML = '<a href="http://blog.sina.com.cn/lm/iframe/xhtml/2010/blogspread.html" target="_blank">[投票是新版博客专有功能，点击立即体验]</a>'
            }
        }
    };
    a.renderVoteNum = function(g, l) {
        this.getNewList(l);
        this.initNewVote();
        cache_vote_data = g;
        var n = 0;
        var m = Core.Dom.getElementsByClass($E("voter"), "div", "num");
        var c = [];
        var b;
        var o = $E("chb1");
        if (o != null && o.type == "radio") {
            for (var d = 1; d <= m.length; d++) {
                n += (g[prefix + "" + d]) * 1
            }
            window.vote_rc_type = "radio"
        } else {
            window.vote_rc_type = "checkbox";
            n = 0;
            n = (g[prefix + "0"]) * 1
        }
        $E("total").innerHTML = n + "人";
        vote_total = n;
        for (b = 0; b < m.length; b++) {
            var f = g[prefix + (b + 1)] == null ? 0 : g[prefix + (b + 1)];
            if (n == 0) {
                var j = "0%"
            } else {
                if (Math.round(f / n * 100) > 100) {
                    var j = "100%"
                } else {
                    var j = Math.round(f / n * 100) + "%"
                }
            }
            c.push(j);
            m[b].innerHTML = f + '<span class="SG_txtc">(' + j + ")</span>"
        }
        if (g[prefix + "0"] != null) {
            renderProgress(c)
        }
    };
    a.renderProgress = function(g) {
        window.itvIds = [];
        var c;
        var f = Core.Dom.getElementsByAttr($E("voter"), "name", "voteResult");
        var b = Core.Dom.getElementsByClass($E("voter"), "div", "num");
        var d = [];
        for (c = 0; c < b.length; c++) { (/\((.*)\)/).test(b[c].innerHTML);
            d[c] = RegExp.$1
        }
        for (c = 0; c < f.length; c++) {
            f[c].className = "color c" + (c + 1);
            f[c].style.fontSize = "8px";
            f[c].style.width = "0px";
            window.itvIds[c] = window.setInterval((function(i) {
                return function() {
                    if (parseInt(f[i].style.width) < parseInt(d[i])) {
                        f[i].style.width = parseInt(f[i].style.width, 10) + 1 + "%"
                    } else {
                        window.clearInterval(itvIds[i])
                    }
                }
            })(c), 10)
        }
        if (!this.rf) {
            a.rf = new RenderFlash()
        }
    };
    a.clearAllInterval = function() {
        if (window.itvIds) {
            for (var b = 0; b < window.itvIds.length; b++) {
                window.clearInterval(itvIds[b])
            }
        }
    }
})(window);
$registJob("dynamicVoteView",
function() {
    if (typeof voteid == "undefined") {
        return
    }
    var b = $E("voter");
    var c = Core.Dom.getElementsByClass(b, "div", "num");
    var g = [];
    var d;
    var f;
    for (d = 0; d < c.length; d++) { (/\((.*)\)/).test(c[d].innerHTML);
        g[d] = RegExp.$1
    }
    window.prefix = scope.$articleid + "_" + voteid + "_";
    var a = [];
    for (var d = 0; d <= c.length; d++) {
        a.push(prefix + d)
    }
    window.vote_progress_css = ["1px solid #8d458e", "1px solid #578425", "1px solid #89ba00", "1px solid #008d8e", "1px solid #7da4cf", "1px solid #d54545", "1px solid #ff8d46", "1px solid #f6bd0e", "1px solid #008dd5", "1px solid #b2aa01"];
    Utils.Io.JsLoad.request("http://vote.sinajs.cn/query?class=tp&varname=res", {
        GET: {
            keys: a.join(",")
        },
        onComplete: function(i) {
            if (i.code == "A00006") {
                window.vote_cache_content_html = $E("voteViewContent") ? $E("voteViewContent").innerHTML: "";
                renderVoteNum(i.data)
            } else {
                winDialog.alert(i.code, {
                    icon: "02"
                })
            }
        },
        noencode: true
    })
}); (function() {
    var b = "readyFun";
    function a(d, g, i, f) {
        var c = function() {
            var j = new Utils.Flash.swfObject(g, f, "1", "1", "9", "#00ff00");
            j.addParam("quality", "high");
            j.addParam("allowScriptAccess", "always");
            j.addVariable("readyFun", i);
            j.write(d)
        };
        c()
    }
    a("swfbox", $_GLOBAL.flashBasicURL + "voteCookie.swf?uid=" + Core.Math.getUniqueId(1, 10), b, "swfId")
})();
$SYSMSG.extend({
    B03020: "博文已收藏成功！",
    B03002: "已达收藏数1000条上限，不能继续收藏。",
    B03004: "已收藏过此博文，不能重复收藏。",
    B03005: "确实要取消此收藏吗？",
    B03006: "确实要删除此博文吗？删除后可在“回收站”恢复。",
    B03007: "确实要删除此草稿吗？删除后不可恢复。",
    B03008: "确实要彻底删除此博文吗？删除后不可恢复。",
    B03010: "确实要替换已置顶的博文吗？",
    B03011: "确实要取消置顶吗？取消后可在“博文”页恢复。",
    B03014: "博文已成功置顶到首页！",
    B03015: "抱歉，您的博客尚未升级，请<a href='http://blog.sina.com.cn/u/#UID' target='_blank'>升级</a>后再“收藏” 。",
    S01107: "已收藏过此博文，不能重复收藏。"
});
$SYSMSG.extend({
    B00007: "跳转到自动开通页",
    B00008: "自动开通用户(跳转到假页)",
    B00009: "跳转到自动开通页",
    B00010: "错误页(未开通页)",
    B00011: "抱歉，Blog ID 错误，操作无法完成。",
    B00012: "抱歉，可能因为重复操作而无法执行，请刷新本页再试。",
    B00013: "用户ID被封杀",
    B00014: "很抱歉，您输入的验证码不正确。",
    B04101: "请输入您的昵称！",
    B04102: "请正确输入您的邮件地址！",
    B04103: "请选择您举报信息的位置！",
    B04104: "请选择您举报的不良信息的类型！",
    B04105: "简单描述最多只能输入500个字符！",
    B04106: "再次感谢您帮助我们进行不良信息的验证工作，我们将认真仔细地处理您提交的内容。"
});
App.ArticleMange = Core.Class.create();
Core.Class.extend(App.ArticleMange.prototype, {
    initialize: function(c, b) {
        for (var a in b) {
            this[a] = b[a]
        }
        this.articleId = c;
        Lib.checkAuthor();
        this.pretreat()
    },
    pretreat: function() {
        if (this.articleId == null) {
            Debug.error("ArticleManage need the article id.");
            return
        } else {
            this.checkLogin();
            return this
        }
    },
    checkLogin: function() {
        this.needLogin = this.needLogin();
        Debug.log("checkLogin : " + this.needLogin);
        var b = function(c) {
            new Lib.Login.Ui().login(c)
        };
        var a = Core.Function.bind2(this.confirm, this);
        Lib.checkAuthor();
        if (this.needLogin || !$isLogin) {
            b(a)
        } else {
            a()
        }
    },
    confirm: function() {
        if (!$isLogin) {
            Lib.checkAuthor();
            $tray.renderLogin()
        }
        this.needLogin = false;
        if (this.confirmMSG) {
            winDialog.confirm(this.confirmMSG, {
                funcOk: Core.Function.bind2(this.doAction, this)
            })
        } else {
            this.doAction()
        }
    },
    doAction: function() {
        if ($IE && Core.Events.getEvent()) {
            Core.Events.stopEvent()
        }
        var b = {};
        for (var a in this.param) {
            if (typeof this.param[a] == "function") {
                b[a] = Core.Function.bind2(this.param[a], this)()
            } else {
                b[a] = this.param[a]
            }
        }
        this.Interface.request({
            GET: b,
            onSuccess: this.callback || this.requestOk ||
            function() {
                window.location.reload()
            },
            onError: this.requestError ||
            function(c) {
                showError(c.code)
            },
            onFail: function() {
                showError("A00001")
            }
        })
    }
});
App.deleteArticle = Core.Class.define(null, App.ArticleMange, {
    Interface: new Interface("http://control.blog.sina.com.cn/admin/article/article_del_recycle.php", "jsload"),
    needLogin: function() {
        trace("检查用户");
        Lib.checkAuthor();
        return ! $isAdmin
    },
    confirmMSG: $SYSMSG.B03006,
    param: {
        "blog_id[]": function() {
            return this.articleId
        },
        uid: scope.$uid
    },
    requestOk: function() {
        window.location.reload()
    }
});
App.deleteDraftArticle = Core.Class.define(null, App.ArticleMange, {
    Interface: new Interface("http://control.blog.sina.com.cn/admin/article/article_draft_del.php", "jsload"),
    needLogin: function() {
        Lib.checkAuthor();
        return ! $isAdmin
    },
    confirmMSG: $SYSMSG.B03007,
    param: {
        "blog_id[]": function() {
            return this.articleId
        },
        uid: scope.$uid
    },
    requestOk: function() {
        window.location.reload()
    }
});
App.clearRecycleBinArticle = Core.Class.define(null, App.ArticleMange, {
    Interface: new Interface("http://control.blog.sina.com.cn/admin/article/article_recycle_del.php", "jsload"),
    needLogin: function() {
        Lib.checkAuthor();
        return ! $isAdmin
    },
    confirmMSG: $SYSMSG.B03008,
    param: {
        "blog_id[]": function() {
            return this.articleId
        },
        uid: scope.$uid
    },
    requestOk: function() {
        window.location.reload()
    }
});
App.restoreRecycleBinArticle = Core.Class.define(null, App.ArticleMange, {
    Interface: new Interface("http://control.blog.sina.com.cn/admin/article/article_recycle_resume.php", "jsload"),
    needLogin: function() {
        Lib.checkAuthor();
        return ! $isAdmin
    },
    param: {
        blog_id: function() {
            return this.articleId
        },
        uid: scope.$uid
    },
    requestOk: function() {
        window.location.reload()
    }
});
App.addFavoriteArticle = Core.Class.define(null, App.ArticleMange, {
    Interface: new Interface("http://control.blog.sina.com.cn/admin/article/favourites_save.php", "jsload"),
    needLogin: function() {
        Lib.checkAuthor();
        return ! $isLogin
    },
    param: {
        blog_id: function() {
            return this.articleId
        },
        uid: scope.$uid
    },
    requestOk: function() {
        if ($E("f_" + scope.$articleid)) {
            $E("f_" + scope.$articleid).innerHTML = $E("f_" + scope.$articleid).innerHTML.replace(/\((\d*)\)/gi,
            function(d, c) {
                return "(" + (window.parseInt(c) + 1) + ")"
            })
        }
        winDialog.alert($SYSMSG.B03020, {
            icon: "03"
        })
    }
});
App.deleteFavoriteArticle = Core.Class.define(null, App.ArticleMange, {
    Interface: new Interface("http://control.blog.sina.com.cn/admin/article/favourites_del.php", "jsload"),
    needLogin: function() {
        Lib.checkAuthor();
        return ! $isAdmin
    },
    confirmMSG: $SYSMSG.B03005,
    param: {
        resourceids: function() {
            return this.articleId
        },
        uid: scope.$uid
    },
    requestOk: function() {
        window.location.reload()
    }
});
App.setTopArticle = Core.Class.define(null, App.ArticleMange, {
    Interface: new Interface("http://control.blog.sina.com.cn/admin/article/article_top.php", "jsload"),
    needLogin: function() {
        Lib.checkAuthor();
        return ! $isAdmin
    },
    param: {
        blog_id: function() {
            return this.articleId
        },
        uid: scope.$uid
    },
    requestOk: function() {
        window.location.reload()
    }
});
App.replaceTopArticle = Core.Class.define(null, App.ArticleMange, {
    Interface: new Interface("http://control.blog.sina.com.cn/admin/article/article_top.php", "jsload"),
    needLogin: function() {
        Lib.checkAuthor();
        return ! $isAdmin
    },
    confirmMSG: $SYSMSG.B03010,
    param: {
        blog_id: function() {
            return this.articleId
        },
        uid: scope.$uid
    },
    requestOk: function() {
        window.location.reload()
    }
});
App.unsetTopArticle = Core.Class.define(null, App.ArticleMange, {
    Interface: new Interface("http://control.blog.sina.com.cn/admin/article/article_top_del.php", "jsload"),
    needLogin: function() {
        Lib.checkAuthor();
        return ! $isAdmin
    },
    confirmMSG: $SYSMSG.B03011,
    param: {
        blog_id: function() {
            return this.articleId
        },
        uid: scope.$uid
    },
    requestOk: function() {
        window.location.reload()
    }
});
App.moreLayer = function(f, b) {
    var c = "";
    var d = "";
    var a = "";
    if (!scope.moreLayerId) {
        scope.moreLayerId = [0, 0]
    }
    scope.moreLayerId.push(f);
    scope.moreLayerId.shift();
    c = $E("a_layer_" + scope.moreLayerId[0]);
    a = $E("a_more_" + scope.moreLayerId[1]);
    d = $E("a_layer_" + scope.moreLayerId[1]);
    d.style.left = Core.Dom.getLeft(a) - 30 + "px";
    d.style.top = Core.Dom.getTop(a) + a.offsetHeight + "px";
    if (c) {
        c.style.display = "none"
    }
    d.style.height = 0;
    d.style.display = "";
    new Ui.tween(d, ["height"], [80], 0.4, "strongEaseOut",
    function() {});
    Core.Events.stopEvent()
};
String.prototype.format = function() {
    var f = (!arguments[0] || typeof arguments[0] == "undefined") ? "": arguments[0].toString();
    var d = /(.*?)({(\d+)(:([0-9a-z]+))?})/ig;
    var c = this.match(d);
    if (c) {
        for (var b = 0,
        a = c.length; b < a; b++) {
            c[b] = c[b].replace(d, "$1");
            switch (typeof arguments[parseInt(RegExp.$3)]) {
            case "undefined":
                c[b] += RegExp.$2;
                break;
            case "number":
                c[b] += (isNaN(RegExp.$5) || RegExp.$5 == "") ? arguments[parseInt(RegExp.$3)] : arguments[parseInt(RegExp.$3)].toString(Math.max(Math.min(Math.round(RegExp.$5), 36), 2));
                break;
            default:
                c[b] += arguments[parseInt(RegExp.$3)]
            }
        }
        c.push(this.replace(d, ""));
        return c.join("")
    }
    return this
};
App.modifyCategory = Core.Class.define(null, App.ArticleMange, {
    Interface: new Interface("http://control.blog.sina.com.cn/riaapi/article/edit_cat.php", "jsload"),
    param: {},
    requestOk: function() {
        window.location.reload()
    },
    requestError: function(a) {},
    needLogin: function() {
        trace("检查用户");
        Lib.checkAuthor();
        return ! $isAdmin
    },
    confirmMSG: ['<div id="#{content}" class="CP_layercon1">', '<div class="CP_prompt" style="padding:0;">', '<table class="CP_w_ttl"><tr><td id="#{text}">', '<p style="font-size:13px; font-weight:normal; padding-left:30px;">文章分类：', '<select id="cateSel" style="width:130px;">{0}</select>', "</p>", "</td></tr></table>", '<div id="#{subText}" class="CP_w_cnt SG_txtb"></div>', '<p class="CP_w_btns" style="padding-left:60px;">', '<a id="#{linkOk}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnOk}"><span id="#{ok}">确认</span></cite></a>', '<a style="margin-left:5px;" id="#{linkCancel}" class="SG_aBtn SG_aBtnB" href="#" onclick="return false;"><cite id="#{btnCancel}"><span id="#{cancel}">取消</span></cite></a>', "</p>", "</div>", "</div>"].join(""),
    confirm: function() {
        if (!$isLogin) {
            Lib.checkAuthor();
            $tray.renderLogin()
        }
        this.needLogin = false;
        if (this.confirmMSG) {
            var a = this;
            if (!App.cacheSort) {
                App.getArticlesSort(function(b) {
                    App.cacheSort = b.c.cates;
                    a.showLayer()
                })
            } else {
                this.showLayer()
            }
        } else {
            this.doAction()
        }
    },
    showLayer: function() {
        var g = this;
        var a, f;
        var c = "<option value='{1}'>{0}</option>";
        var d = "<option value='00'>选择分类</option>";
        for (var b = 0; b < App.cacheSort.length; b++) {
            d += c.format(App.cacheSort[b].name, App.cacheSort[b].id)
        }
        d += "<option value='0'>私密博文</option>";
        this.confirmMSG = this.confirmMSG.format(d);
        a = winDialog.createCustomsDialog({
            title: "修改博文分类",
            content: this.confirmMSG
        });
        a.setFixed(true);
        a.setMiddle();
        a.show();
        f = $E("cateSel");
        f.selectedIndex = this.cateId * 1;
        a.nodes.linkCancel.onclick = function() {
            a.close();
            return false
        };
        a.nodes.btnClose.onclick = function() {
            a.close();
            return false
        };
        a.nodes.linkOk.onclick = function() {
            g.param = {
                old_cat: g.cateId,
                new_cat: f.options[f.selectedIndex].value,
                blog_id: g.articleId
            };
            Core.Function.bind2(g.doAction, g)();
            a.close();
            return false
        }
    },
    requestOk: function() {
        winDialog.alert("修改分类成功", {
            icon: "03",
            funcOk: function() {
                window.location.reload()
            }
        })
    }
});
$articleManage = function(d, c, b) {
    if ($IE) {
        try {
            Core.Events.stopEvent();
            $E("a_layer_" + scope.moreLayerId[1]).style.display = "none";
            $E("a_layer_" + scope.moreLayerId[0]).style.display = "none"
        } catch(a) {}
    }
    b = b || {};
    switch (c) {
    case 1:
        new App.deleteArticle(d, b);
        break;
    case 2:
        new App.deleteDraftArticle(d, b);
        break;
    case 3:
        new App.clearRecycleBinArticle(d, b);
        break;
    case 4:
        new App.restoreRecycleBinArticle(d, b);
        break;
    case 5:
        new App.addFavoriteArticle(d, b);
        break;
    case 6:
        new App.deleteFavoriteArticle(d, b);
        break;
    case 7:
        new App.setTopArticle(d, b);
        break;
    case 8:
        new App.replaceTopArticle(d, b);
        break;
    case 9:
        new App.unsetTopArticle(d, b);
        break;
    case 10:
        App.moreLayer(d, Core.Events.getEvent());
        break;
    case 11:
        new App.modifyCategory(d, b);
        break
    }
};
function changeFontSize(f) {
    var a, g = "字体大小：";
    var d = "<strong>#</strong>&nbsp;",
    c = 3,
    b = ["小", "中", "大"];
    g += new Array(4).join(d);
    switch (f) {
    case 2:
        a = "fontSize_L";
        break;
    case 0:
        a = "fontSize_S";
        break;
    case 1:
    default:
        a = "fontSize_M";
        break
    }
    g = g.replace(/(<strong>)(#)(<\/strong>)/g,
    function(j, i, m, l) {
        c--;
        if (c != f) {
            return '<a href="#" onclick="changeFontSize(' + c + ');return false;">' + b[c] + "</a>"
        } else {
            return i + b[f] + l
        }
    });
    $E("articleFontManage").innerHTML = g.substring(0, g.length - 6);
    $E("articlebody").className = "artical " + a
}
Utils.Io.loadCss = function(d, b) {
    if (d == null) {
        return false
    }
    b = b || window;
    var a = b.document;
    d.id = d.id || "";
    var c;
    if (d.url) {
        c = a.createElement("link");
        c.setAttribute("rel", "stylesheet");
        c.setAttribute("type", "text/css");
        c.setAttribute("href", d.url)
    } else {
        if (d.text) {
            c = a.createElement("style");
            c.setAttribute("type", "text/css");
            if ($IE) {
                c.styleSheet.cssText = d.text
            } else {
                c.innerHTML = d.text
            }
        }
    }
    c.setAttribute("id", d.id);
    a.getElementsByTagName("head")[0].appendChild(c)
};
$registJob("webim",
function() {
    Lib.checkAuthor();
    if ($isLogin == true && typeof ucClient == "undefined") {
        Utils.Io.loadCss({
            url: "http://sjs.sinajs.cn/webchat/blog/chatroomBlog.css"
        });
        Utils.Io.JsLoad.request("http://sjs.sinajs.cn/webchat/common/baseMerge.js", {
            onComplete: function() {
                Utils.Io.JsLoad.request("http://sjs.sinajs.cn/webchat/apps/blog/webucBlog.js", {
                    noreturn: true
                })
            },
            noreturn: true
        })
    }
});
Lib.BlogRecommendDialog = Core.Class.create();
Lib.BlogRecommendDialog.prototype = {
    width: 260,
    height: 190,
    isMin: false,
    template: ['<div class="blogreco" id="#{entity}">', '<div id="#{frame}">', '<div class="TB" id="#{titleBar}">', '<a class="btnClose" style="position:absolute;left:240px;" id="#{btnClose}" href="javascript:">&nbsp;</a>', '<a class="btnMin" style="position:absolute;left:220px;" id="#{btnMin}" href="javascript:">&nbsp;</a>', "</div>", '<div id="#{content}"></div>', "</div>", "</div>"].join(""),
    name: "blogRecoDialog",
    contentUrl: '<iframe class="IF" src="http://blog.sina.com.cn/lm/mini/01.html"></iframe>',
    _slide: null,
    _dialog: null,
    _cookie: "sina_blog_popup_next_display_time",
    _mode: null,
    _timePoints: null,
    initialize: function(g, f) {
        var d = this;
        this._mode = g;
        this._timePoints = f;
        if (!this._dialog) {
            this._dialog = new Layer(this.template, this.name);
            this._dialog.entity.style.zIndex = "100";
            this._dialog.ifm && (this._dialog.ifm.style.zIndex = "100");
            this._dialog.setSize({
                width: this.width,
                height: this.height
            });
            this._dialog.setContent(this.contentUrl);
            this._dialog.setFixed(true);
            var a = Core.System.pageSize();
            var c = Math.min(a[2], document.documentElement.clientWidth) - this.width;
            var b = Math.min(a[3], document.documentElement.clientHeight) - this.height;
            this._dialog.setPosition({
                x: c,
                y: b
            })
        }
        Core.Events.addEvent(this._dialog.getProperty().nodes.btnClose, this.close.bind2(this));
        Core.Events.addEvent(this._dialog.getProperty().nodes.btnMin, this.toggle.bind2(this));
        Core.Events.addEvent(window,
        function() {
            if (d._dialog && d._dialog.entity) {
                d._dialog.setPosition({
                    x: Math.max(document.documentElement.clientWidth) - d.width,
                    y: Math.max(document.documentElement.clientHeight) - d.height
                })
            }
        },
        "resize")
    },
    show: function() {
        try {
            if (this._mode == "once") {
                var c = parseInt(Utils.Cookie.getCookie(this._cookie));
                if ((new Date().getTime()) < c) {
                    return
                }
            }
        } catch(f) {}
        var d = new Date().getHours();
        for (var b = 0; b < this._timePoints.length && d >= this._timePoints[b]; b++) {}
        var a = parseInt(new Date().getTime() / (3600 * 1000)) * (3600 * 1000);
        if (b == 0) {
            a += ((this._timePoints[0] - d) * 3600 * 1000)
        } else {
            if (b == this._timePoints.length) {
                a += ((this._timePoints[0] - d + 24) * 3600 * 1000)
            } else {
                a += ((this._timePoints[b] - d) * 3600 * 1000)
            }
        }
        Utils.Cookie.setCookie(this._cookie, new Date(a).getTime(), 24, "/");
        this._dialog.show();
        this._slide = new Ui.Slide($E(this._dialog.getProperty().nodes.frame.id));
        this._slide.slideMax = function() {
            this.node.style.marginTop = this.offset + "px";
            new Ui.tween(this.node, "marginTop", 0, this.duration, this.animation, {
                tween: function(g) {}.bind2(this),
                end: this.onSlideMax
            })
        }.bind2(this._slide);
        this._slide.slideMin = function() {
            new Ui.tween(this.node, "marginTop", this.offset - 28, this.duration, this.animation, {
                tween: function(g) {}.bind2(this),
                end: this.onSlideMin
            })
        }.bind2(this._slide);
        this._slide.slideIn = function() {
            new Ui.tween(this.node, "marginTop", this.offset, 5 * this.duration, this.animation, {
                tween: function(g) {}.bind2(this),
                end: this.onSlideIn
            })
        }.bind2(this._slide);
        this._slide.onSlideIn = function() {
            Core.Dom.removeNode(this._dialog.getProperty().nodes.entity)
        }.bind2(this);
        this._slide.slideMax();
        Utils.Io.JsLoad.request("http://dcads.sina.com.cn/html.ng/pos=quitad&site=sina", {
            onComplete: function() {},
            onException: function() {}
        })
    },
    toggle: function() {
        if (this._dialog.getProperty().nodes.btnMin) {
            var a = this._dialog.getProperty().nodes.btnMin.className;
            if (a == "btnMin") {
                a = "btnMax";
                this._slide.slideMin()
            } else {
                a = "btnMin";
                this._slide.slideMax()
            }
            this._dialog.getProperty().nodes.btnMin.className = a;
            a = null;
            this.onToggle()
        }
    },
    close: function() {
        var a = this;
        try {
            var c = ['<div style="position:absolute;left:0;top:0;z-index:10;" id="closeswf_div">', '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="260" height="190" align="middle">', '<param name="allowScriptAccess" value="always" />', '<param name="wmode" value="transparent" />', '<param name="movie" value="' + quitAdSrc + '" />', '<param name="flashvars" value="adlink=' + (quitAdUrl) + '" />', '<param name="menu" value="false" />', '<param name="quality" value="high" />', '<param name="bgcolor" value="#FFFFFF" />', '<embed src="' + quitAdSrc + '" flashvars="adlink=' + (quitAdUrl) + '" menu="false" quality="high" bgcolor="#FFFFFF" width="260" height="190" align="middle" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />', "</object>", '<div style="position:absolute;left:0;top:0;z-index:1;">' + quitAdCount + "</div>", "</div>"].join("");
            a._dialog.setContent(c);
            setTimeout(function() {
                a._slide.slideIn()
            },
            500)
        } catch(b) {
            a._slide.slideIn()
        }
    },
    onToggle: function() {}
};
$registJob("680",
function() {
    try {
        var c = false;
        var a = new Lib.BlogRecommendDialog("once", [7, 14]);
        a.onToggle = function() {
            c = true
        };
        a.show();
        setTimeout(function() {
            if (!c && a._slide && a._dialog.getProperty().nodes.btnMin.className == "btnMin") {
                a.toggle()
            }
        },
        60000)
    } catch(b) {}
});
Utils.Form.Radio = {};
Utils.Form.Radio.get = function(b) {
    if (!b) {
        return ""
    }
    var c = b.length;
    if (c == undefined) {
        if (b.checked) {
            return b.value
        } else {
            return ""
        }
    }
    for (var a = 0; a < c; a++) {
        if (b[a].checked) {
            return b[a].value
        }
    }
    return ""
};
Utils.Form.Radio.set = function(b, d) {
    if (!b) {
        return
    }
    var c = b.length;
    if (c == undefined) {
        b.checked = (b.value == d.toString());
        return
    }
    for (var a = 0; a < c; a++) {
        b[a].checked = false;
        if (b[a].value == d.toString()) {
            b[a].checked = true
        }
    }
};
scope.reportMainTpl = ['<div id="#{entity}" class="blog_report">', '<div id="#{titleBar}" class="BRpt_topTit">', '<a href="#" onclick="return false;" id="#{btnClose}" title=""><img src="http://simg.sinajs.cn/blog7style/images/common/report/icon_clo.gif" /></a>', "</div>", '<div id="#{content}" class="BRpt_mid">', "</div>", "</div>"].join("");
scope.reportStartTpl = ['<div class="BRpt_Mtop">', "<p>新浪博客愿和您一起共同打造健康和谐的网络信息交流平台。并有7×24小时的值班服务，及时有效的处理您的举报。</p>", "</div>", '<div class="Brpt_RtConn">', '<p id="#{resumeInfo}" class="Brpt_RtInf"></p>', '<textarea id="#{resumeContent}" readonly="readonly" class="Brpt_RtTxt"></textarea>', '<p class="Brpt_Rhost"><input type="checkbox" id="#{cbBlogHost}" /><label for="#{cbBlogHost}">同时举报博主</label></p>', '<div class="clear"></div>', '<div class="Brpt_choCla">', '<p class="claTit">请选择您举报类别（<span class="cho">必选</span>）：</p>', '<p class="cla_conn">', '<input id="ero" value="1" type="radio" name="chocla" /><label for="ero">色情</label>', '<input id="pol" value="2" type="radio" name="chocla" /><label for="pol">政治</label>', '<input id="tor" value="3" type="radio" name="chocla" /><label for="tor">侵权</label>', '<input id="oth" value="4" type="radio" name="chocla" /><label for="oth">其他</label>', "</p>", "</div>", '<p class="Brpt_othInt">您可以填写更多举例说明：</p>', '<textarea id="#{reportReason}" class="Brpt_RtTxt"></textarea>', "</div>", '<div class="Brpt_RCBtn">', '<a class="BRpt_btnGy" href="#" onclick="return false;" id="#{btnOk}" title=""><span>确认</span></a>', '<a class="BRpt_btn" href="#" onclick="return false;" id="#{btnCancel}" title=""><span>取消</span></a>', '<div class="clearit"></div>', "</div>"].join("");
scope.reportBadTpl = ['<div class="BRpt_Mtop">', "<p>新浪博客愿和您一起共同打造健康和谐的网络信息交流平台。并有7×24小时的值班服务，及时有效的处理您的举报。</p>", "</div>", '<div class="Brpt_exclt">', '<p class="Brpt_extP1">您已经成功举报了该信息，工作人员会尽快处理。</p>', '<p class="Brpt_extP2">再次感谢您对新浪博客的支持！</p>', '<div class="Brpt_extBtn"><a class="BRpt_btn" href="#" onclick="return false;" id="#{btnOk}" title=""><span>确认</span></a><div class="clear"></div></div>', "</div>"].join("");
scope.reportSuccessTpl = ['<div class="BRpt_Mtop">', "<p>新浪博客愿和您一起共同打造健康和谐的网络信息交流平台。并有7×24小时的值班服务，及时有效的处理您的举报。</p>", "</div>", '<div class="Brpt_extRst">', '<p class="Brpt_eRTit">举报完成！感谢您对我们工作的支持，我们将在24小时内处理。</p>', '<div class="Brpt_eRmtd">', '<p class="tit">您还可以：</p>', '<div class="conn">', '<p class="mtd">', '<input type="checkbox" id="#{cbCustom}"/>', '<label for="#{cbCustom}">我是新浪博客用户，我要接收处理结果</label><span id="#{guestText}">(您还没有登录)</span>', "</p>", "</div>", '<div class="conn2">', '<p class="mtd"><input type="checkbox" id="#{cbOtherMethod}" /><label for="#{cbOtherMethod}">我要通过其他方式接收处理结果</label></p>', '<div id="#{userForm}" style="display:none;">', '<p class="perInf"><span>您的姓名：</span><input id="#{userName}" type="text" /></p>', '<p class="perInf"><span>您的邮箱：</span><input id="#{userEmail}" type="text" /></p>', '<p class="perInf"><span>您的电话：</span><input id="#{userTel}" type="text" /></p>', "</div>", "</div>", "</div>", '<div class="Brpt_eRBtn"><a class="BRpt_btnGy" href="#" onclick="return false;" id="#{btnOk}" title=""><span>确认</span></a><div class="clear"></div></div>'].join("");
scope.reportFinishedTpl = ['<div class="BRpt_Mtop">', "<p>新浪博客愿和您一起共同打造健康和谐的网络信息交流平台。并有7×24小时的值班服务，及时有效的处理您的举报。</p>", "</div>", '<div class="Brpt_thx">', "<p>再次感谢您对新浪博客举报的大力支持！</p>", '<div class="Brpt_thxBtn"><a class="BRpt_btnGy" href="#" onclick="return false;" id="#{btnCancel}" title=""><span>关闭</span></a></div>', "</div>"].join("");
scope.GeneralReport = Core.Class.create();
scope.GeneralReport.prototype = {
    type: "",
    _hashType: {
        comment: {
            "class": "2",
            initFunction: null
        },
        blog: {
            "class": "1",
            initFunction: null
        },
        guestBook: {
            "class": "3",
            initFunction: null
        },
        friend: {
            "class": "4",
            initFunction: null
        },
        photoComment: {
            "class": "5",
            initFunction: null
        }
    },
    dataInterface: null,
    canSubmit: true,
    bodyID: "",
    reportUID: "",
    userNameInfo1: "",
    userNameInfo2: "",
    titleInfo: "",
    nickName: "",
    contentInfo: "",
    _isInitDialog: false,
    _dialog: null,
    initialize: function() {
        this.dataInterface = new Interface("http://control.blog.sina.com.cn/admin/advice/impeach_post_content.php?version=7", "ijax");
        this._hashType.comment["initFunction"] = this._commentInit;
        this._hashType.blog["initFunction"] = this._blogInit;
        this._hashType.guestBook["initFunction"] = this._guestBookInit;
        this._hashType.friend["initFunction"] = this._friendInit;
        this._hashType.photoComment["initFunction"] = this._photoCommentInit
    },
    show: function() { ! this._isInitDialog && this._initDialog();
        this._dialog.setAreaLocked(true);
        this._dialog.setMiddle();
        this._dialog.show();
        this._isInitDialog = true;
        this._hashType[this.type]["initFunction"].call(this)
    },
    hidden: function() {
        this._dialog.hidden()
    },
    clear: function() {
        var a = this._dialog.nodes;
        a.resumeInfo.innerHTML = "";
        a.resumeContent.value = "";
        a.cbBlogHost.checked = false;
        Utils.Form.Radio.set($N("chocla"), "");
        a.reportReason.value = ""
    },
    submit: function() {
        var a = this;
        this.dataInterface.request({
            POST: {
                body_id: a.bodyID,
                "class": a._hashType[a.type]["class"],
                type: Utils.Form.Radio.get($N("chocla")),
                fnickname: a.nickName,
                fuid: a.reportUID,
                reason: a._dialog.nodes.reportReason.value,
                is_report: a._dialog.nodes.cbBlogHost.checked
            },
            onSuccess: function(b) {
                a.canSubmit = true;
                a.onSuccessed(b)
            },
            onError: function(b) {
                a.canSubmit = true;
                a.onError(b)
            },
            onFail: function() {
                a.canSubmit = true
            }
        })
    },
    _initDialog: function() {
        this._dialog = winDialog.createCustomsDialog({
            tpl: scope.reportMainTpl,
            content: scope.reportStartTpl
        });
        var a = this,
        b = this._dialog.nodes;
        this._dialog.onHidden = function() {
            a.clear()
        };
        Core.Events.addEvent(b.btnOk,
        function() {
            if (a.canSubmit) {
                a.canSubmit = false;
                a.submit()
            }
        },
        "click");
        Core.Events.addEvent(b.btnCancel,
        function() {
            a._dialog.hidden()
        },
        "click");
        Utils.Form.limitMaxLen(b.reportReason, 400)
    },
    _commentInit: function() {
        this._dialog.nodes.resumeInfo.innerHTML = "您要举报的是" + this.userNameInfo1 + "在博文" + this.titleInfo + "中发表的评论，摘要如下：";
        this._dialog.nodes.resumeContent.value = this.contentInfo;
        this._dialog.nodes.cbBlogHost.checked = false
    },
    _blogInit: function() {
        this._dialog.nodes.resumeInfo.innerHTML = "您要举报的是" + this.userNameInfo1 + "发表的" + this.titleInfo + "，摘要如下：";
        this._dialog.nodes.resumeContent.value = this.contentInfo;
        this._dialog.nodes.cbBlogHost.checked = false
    },
    _guestBookInit: function() {
        this._dialog.nodes.resumeInfo.innerHTML = "您要举报的是" + this.userNameInfo1 + "在" + this.userNameInfo2 + "博客的留言，摘要如下：";
        this._dialog.nodes.resumeContent.value = this.contentInfo;
        this._dialog.nodes.cbBlogHost.checked = false
    },
    _friendInit: function() {
        this._dialog.nodes.resumeInfo.innerHTML = "您要举报的是" + this.userNameInfo1 + "给您发的好友申请，摘要如下：";
        this._dialog.nodes.resumeContent.value = this.contentInfo;
        this._dialog.nodes.cbBlogHost.checked = true
    },
    _photoCommentInit: function() {
        this._dialog.nodes.resumeInfo.innerHTML = "您要举报的是" + this.userNameInfo1 + "在图片" + this.titleInfo + "中发表的评论，摘要如下：";
        this._dialog.nodes.resumeContent.value = this.contentInfo;
        this._dialog.nodes.cbBlogHost.checked = false
    },
    onSuccessed: function(a) {},
    onError: function(a) {}
};
Utils.Form.inputListen = function(b, d, g) {
    b = $E(b);
    if (typeof d != "undefined") {
        d = isNaN(d) ? null: d * 1
    }
    if (b == null || d == null || b.nodeType != 1) {
        return false
    }
    g = g || {};
    var f = g.limitRe;
    var a = g.doubleByte;
    a = a == null ? true: a;
    var i = function() {
        try {
            var j = Core.Events.getEvent();
            if (j) {
                var n = j.which || j.keyCode;
                if (n == 37 || n == 39) {
                    return false
                }
            }
        } catch(m) {}
        var l = b.max;
        while (f != null && f.test(b.value)) {
            b.value = b.value.replace(f, "")
        }
        if (a == true) {
            if (Core.String.byteLength(b.value) > l) {
                var o = b.value.substr(0, l);
                while (Core.String.byteLength(o) > l) {
                    o = o.replace(/.$/, "")
                }
                b.value = o;
                b.maxLength = o.length
            } else {
                b.maxLength = l - b.value.replace(/[\x00-\xff]/g, "").length
            }
        } else {
            b.maxLength = l
        }
        if (l < b.value) {
            b.value = b.value.substr(0, l)
        }
    };
    var c = function() {
        if (f != null && f.test(b.value)) {
            b.value = b.value.replace(f, "")
        }
    };
    b.max = d;
    b.maxLength = d;
    i();
    if (b.beWatched == null) {
        b.beWatched = true;
        if ($MOZ) {
            Core.Events.addEvent(b, i, "input")
        } else {
            Core.Events.addEvent(b, i, "keyup");
            Core.Events.addEvent(b, i, "keypress");
            Core.Events.addEvent(b, i, "mouseout")
        }
        Core.Events.addEvent(b, c, "blur")
    }
};
scope.SuccessedReport = Core.Class.create();
scope.SuccessedReport.prototype = {
    loginUI: null,
    _isInitDialog: false,
    canSubmit: true,
    dataInterface: null,
    dataID: "",
    bodyID: "",
    userInfo: {
        nickName: ""
    },
    initialize: function() {
        this.dataInterface = new Interface("http://control.blog.sina.com.cn/admin/advice/impeach_post_userinfo.php?version=7", "ijax");
        this.loginUI = new Lib.Login.Ui()
    },
    show: function() { ! this._isInitDialog && this._initDialog();
        this._dialog.setAreaLocked(true);
        this._dialog.setMiddle();
        this._dialog.show();
        this._isInitDialog = true
    },
    displayUserInfo: function(a) {
        this._dialog.nodes.userForm.style.display = a === false ? "none": ""
    },
    login: function() {
        var a = this;
        this.loginUI.login(function() {
            a.submit()
        })
    },
    clear: function() {
        var a = this._dialog.nodes;
        a.cbCustom.checked = false;
        a.cbOtherMethod.checked = false;
        a.userForm.style.display = "none";
        a.userName.value = "";
        a.userEmail.value = "";
        a.userTel.value = ""
    },
    hidden: function() {
        this._dialog.hidden()
    },
    submit: function() {
        var a = this,
        b = this._dialog.nodes;
        Lib.checkAuthor();
        a.canSubmit = false;
        this.dataInterface.request({
            POST: {
                id: a.dataID,
                body_id: a.bodyID,
                nickname: typeof($nick) == "undefined" ? "": $nick,
                name: b.userName.value,
                email: b.userEmail.value,
                phone: b.userTel.value,
                uid: $UID,
                is_login: b.cbCustom.checked ? "1": "0"
            },
            onSuccess: function(c) {
                a.canSubmit = true;
                a.onSuccessed(c)
            },
            onError: function(c) {
                a.canSubmit = true;
                a.onError(c)
            },
            onFail: function() {
                a.canSubmit = true
            }
        })
    },
    _initDialog: function() {
        this._dialog = winDialog.createCustomsDialog({
            tpl: scope.reportMainTpl,
            content: scope.reportSuccessTpl
        });
        var a = this,
        b = this._dialog.nodes;
        this._dialog.onHidden = function() {
            a.clear()
        };
        Lib.checkAuthor();
        b.guestText.style.display = $isLogin ? "none": "";
        Core.Events.addEvent(b.btnOk,
        function() {
            if (a.canSubmit) {
                Lib.checkAuthor();
                if (!$isLogin && b.cbCustom.checked) {
                    a.login()
                } else {
                    a.submit()
                }
            }
        },
        "click");
        Core.Events.addEvent(b.cbOtherMethod,
        function() {
            a.displayUserInfo(b.cbOtherMethod.checked)
        },
        "click");
        Utils.Form.inputListen(b.userName, 100);
        Utils.Form.inputListen(b.userEmail, 200);
        Utils.Form.inputListen(b.userTel, 100)
    },
    onSuccessed: function(a) {},
    onError: function(a) {}
};
$SYSMSG.extend({
    B04102: "您输入的电子邮件格式错误，请重新输入",
    B04105: "很抱歉，您输入的内容过多，请删减后重新提交",
    B04107: "您要举报的内容已经不存在，感谢您的支持",
    B04108: "举报分类错误",
    B04109: "您还没有选择举报类别，请选择后继续操作",
    B04110: "您的昵称为空，请输入后继续操作",
    B04111: "系统繁忙，请稍后再试",
    B04112: "您已经举报过该用户，再次感谢您的支持",
    B04113: "系统繁忙，请稍后再试",
    B04114: "系统繁忙，请稍后再试",
    B04115: "系统繁忙，请稍后再试",
    B04116: "系统繁忙，请稍后再试"
});
Lib.BlogReport = Core.Class.create();
Lib.BlogReport.prototype = {
    generalReport: null,
    successedReport: null,
    badReport: null,
    finishedReport: null,
    isBRInit: false,
    isFRInit: false,
    initialize: function() {
        this.generalReport = new scope.GeneralReport();
        this.successedReport = new scope.SuccessedReport()
    },
    start: function(g, j, b, m, l, i, c, d) {
        var f = this,
        a = this.generalReport;
        d = Core.String.decodeHTML(d);
        a.nickName = j;
        a.type = g;
        a.reportUID = m;
        a.userNameInfo1 = l;
        a.userNameInfo2 = i;
        a.titleInfo = c;
        a.contentInfo = Core.String.byteLength(d) > 800 ? Core.String.shorten(d, 800) : d;
        a.bodyID = b;
        a.onSuccessed = function(n) {
            f.reportSuccess(j, b, n.dataID);
            this.hidden()
        };
        a.onError = function(n) {
            if (n.code === "B04112") {
                f.showBad();
                this.hidden()
            } else {
                winDialog.alert($SYSMSG[n.code])
            }
        };
        a.show()
    },
    showBad: function() {
        var a = this;
        if (!this.isBRInit) {
            this.badReport = winDialog.createCustomsDialog({
                tpl: scope.reportMainTpl,
                content: scope.reportBadTpl
            });
            Core.Events.addEvent(this.badReport.nodes.btnOk,
            function() {
                a.badReport.hidden()
            },
            "click")
        }
        this.badReport.setAreaLocked(true);
        this.badReport.setMiddle();
        this.badReport.show()
    },
    reportSuccess: function(f, d, a) {
        var c = this,
        b = this.successedReport;
        b.bodyID = d;
        b.dataID = a;
        b.userInfo.nickName = f;
        b.onSuccessed = function(g) {
            c.finished();
            this.hidden()
        };
        b.onError = function(g) {
            winDialog.alert($SYSMSG[g.code])
        };
        b.show()
    },
    finished: function() {
        var a = this;
        if (!this.isFRInit) {
            this.finishedReport = winDialog.createCustomsDialog({
                tpl: scope.reportMainTpl,
                content: scope.reportFinishedTpl
            });
            Core.Events.addEvent(this.finishedReport.nodes.btnCancel,
            function() {
                a.finishedReport.hidden()
            },
            "click")
        }
        this.finishedReport.setAreaLocked(true);
        this.finishedReport.setMiddle();
        this.finishedReport.show()
    }
};
$registJob("report_blogComment",
function() {
    var a = new Lib.BlogReport();
    window.comment_report = function(c) {
        var n = c.split("_")[0],
        b = c.split("_")[1],
        i,
        l = "0",
        j,
        g = "",
        d = '<a target="_blank" href="http://blog.sina.com.cn/s/blog_' + n + '.html">' + $E("t_" + n).innerHTML + "</a>",
        f = $E("body_cmt_" + b).innerHTML;
        var m = $E("nick_cmt_" + b).getElementsByTagName("a");
        if (m.length > 0) {
            i = m[0].innerHTML;
            l = m[0].href.split("/").pop();
            j = '<a href="' + m[0].href + '" target="_blank">' + i + "</a>"
        } else {
            i = $E("nick_cmt_" + b).innerHTML;
            j = "<strong>" + i + "</strong>"
        }
        a.start("comment", i, c, l, j, g, d, f)
    }
});
$registJob("report_bodyArticle",
function() {
    var a = new Lib.BlogReport(),
    b = "";
    window.report = function(f) {
        var j = scope.$uid,
        i, g = "",
        c = '<a target="_blank" href="http://blog.sina.com.cn/s/blog_' + f + '.html">' + $E("t_" + f).innerHTML + "</a>",
        d = $E("t_" + f).innerHTML;
        if (b === "") {
            Utils.Io.JsLoad.request("http://uic.sinajs.cn/uic?type=nick&uids=" + j + "&varname=reportInfo", {
                onComplete: function() {
                    a.start("blog", reportInfo[j], f, j, '<a target="_blank" href="http://blog.sina.com.cn/u/' + scope.$uid + '">' + reportInfo[j] + "</a>", g, c, d)
                },
                onException: function() {
                    a.start("blog", "新浪网友", f, j, "新浪网友", g, c, d)
                }
            })
        } else {
            i = '<a target="_blank" href="http://blog.sina.com.cn/u/' + scope.$uid + '">' + b + "</a>";
            a.start("blog", b, f, j, i, g, c, d)
        }
    };
    window.article_report = function(f) {
        var j = scope.$uid,
        i, g = "",
        c = '<a target="_blank" href="http://blog.sina.com.cn/s/blog_' + f + '.html">' + $E("t_" + f).innerHTML + "</a>",
        d = $E("t_" + f).innerHTML;
        if (b === "") {
            Utils.Io.JsLoad.request("http://uic.sinajs.cn/uic?type=nick&uids=" + j + "&varname=reportInfo", {
                onComplete: function() {
                    a.start("blog", reportInfo[j], f, j, '<a target="_blank" href="http://blog.sina.com.cn/u/' + scope.$uid + '">' + reportInfo[j] + "</a>", g, c, d)
                },
                onException: function() {
                    a.start("blog", "新浪网友", f, j, "新浪网友", g, c, d)
                }
            })
        } else {
            i = '<a target="_blank" href="http://blog.sina.com.cn/u/' + scope.$uid + '">' + b + "</a>";
            a.start("blog", b, f, j, i, g, c, d)
        }
    }
});
var Article = {};
Article.getSearchReferrer = function() {
    var i = {};
    var f = document.URL;
    if (f.indexOf("blog.sina.com.cn") != -1 && f.indexOf("k=") != -1) {
        var c = new Utils.Url(f);
        i.key = c.getParam("k");
        i.type = c.getParam("t");
        return i
    }
    var d = document.referrer;
    if (!d || d === "") {
        return false
    }
    var g = {
        "www.google.com": {
            param: "q",
            type: "utf-8"
        },
        "www.google.cn": {
            param: "q",
            type: "utf-8"
        },
        "www.baidu.com": {
            param: "wd",
            type: "GBK"
        },
        "www.soso.com": {
            param: "w",
            type: "GBK"
        },
        "cn.yahoo.com": {
            param: "p",
            type: "utf-8"
        },
        "search.yahoo.com": {
            param: "p",
            type: "utf-8"
        },
        "gougou.com": {
            param: "search",
            type: "utf-8"
        },
        "cn.bing.com": {
            param: "q",
            type: "utf-8"
        },
        "www.youdao.com": {
            param: "q",
            type: "utf-8"
        },
        "www.sogou.com": {
            param: "query",
            type: "GBK"
        },
        "yisou.com": {
            param: "search",
            type: "utf-8"
        },
        "uni.sina.com.cn": {
            param: "k",
            type: "gbk"
        }
    };
    for (var a in g) {
        if (d.indexOf("yisou.com/search:") != -1) {
            i.key = d.split("search:")[1];
            i.type = "utf-8";
            break
        }
        var b = new Utils.Url(d);
        if (d.indexOf("uni.sina.com.cn") != -1 && d.indexOf("ie=") != -1) {
            i.key = b.getParam("k");
            i.type = b.getParam("ie");
            break
        }
        if (d.indexOf(a) != -1) {
            i.key = b.getParam(g[a]["param"]);
            i.type = g[a]["type"];
            break
        }
    }
    if (!i.key || i.key === "") {
        return false
    } else {
        return i
    }
};
Article.outSearch = function() {
    var c = "http://keyword.sina.com.cn/blogrelated/combinedqueryBPV_utf8.php";
    var J = "";
    var b = "GBK";
    var p = null;
    var o = 86;
    var D = '<div class="blog_sfout"><div class="blog_srhflt" ><div class="blog_sfL"><div class="blog_sfTit" id="out_topTitle"></div><div class="blog_sflist" id="out_content"></div></div><div class="blog_sfR" id="out_right"></div><div class="clear"></div></div><div class="blog_sfClo"><a id="searchXID" onclick="return false;" href="#"></a></div></div>';
    var a = "<ul>#{titleTxt}</ul>";
    var g = '<div style="float:right;margin-right:12px;"></div><img src="http://ba.sass.sina.com.cn/front/blog/deliver?psId=adps000004" style="display:none;"/>';
    var j = '<div class="blog_sfR_ad" id="blogSfRad"></div>';
    var I = "swf";
    var z = {};
    z.swf = "";
    z.img = '<a href="#{adHref}" title="" target="_blank"><img src="#{imgSrc}" /></a>';
    var u = '<div class="loatReading">读取中...</div>';
    var r = '<div class="interErro"><a href="http://uni.sina.com.cn/" target="_blank">网络问题，请点击此处重新获取内容</a></div>';
    var F = "<h3>近期热点内容推荐：</h3>";
    var t = '关于“<span class="blog_sfNm"><a href="#" onclick="return false;" title="#{title}">#{content}</a></span>”的更多内容：';
    var v = "<div><div class=\"open\"><span>新浪博客在乎你的声音！</span><a onclick=\"v7sendLog('09_29_a01_0',scope.$pageid,'searchTips');window.location.href='http://login.sina.com.cn/signup/signup.php?entry=blog&srcuid=" + scope.$uid + '&src=blogicp\'" href="###"><img src="http://simg.sinajs.cn/blog7style/images/blog/srh_flt/btn.gif"></a><div class="clear"></div></div><p class="login"><a href="#" id="serzz" onclick="return false;">我要转载这篇博文</a>&nbsp;&nbsp;<a href="#" onclick="return false;" id="sergg">我要关注此博主</a>&nbsp;&nbsp;[<a href="#" onclick="return false;" id="outshlogin">请登录</a>]</p></div>' + j;
    var i = '<div> <div class="photo"><a onclick="v7sendLog(\'09_29_a05_#{id}\',scope.$pageid,\'searchTips\');window.location.href=\'http://blog.sina.com.cn/u/#{id}\'" href="###"><img src="#{portait}"></a></div><div class="person"><p class="hello">#{wenhou}，<span>#{nick}</span><a onclick="v7sendLog(\'09_29_a06_#{id}\',scope.$pageid,\'searchTips\');window.location.href=\'http://login.sina.com.cn/cgi/login/logout.php\'" href="###">[退出]</a></p><div class="perlink"> <ul><li><img class="perctr" src="http://simg.sinajs.cn/blog7style/images/blog/srh_flt/icon1.gif"><a onclick="v7sendLog(\'09_29_a07_#{id}\',scope.$pageid,\'searchTips\');window.location.href=\'http://control.blog.sina.com.cn/blogprofile/index.php\'" href="###">个人中心</a></li><li><img src="http://simg.sinajs.cn/blog7style/images/blog/srh_flt/icon2.gif"><a onclick="v7sendLog(\'09_29_a08_#{id}\',scope.$pageid,\'searchTips\'); window.location.href=\'http://blog.sina.com.cn/u/#{id}\'" href="###">我的博客</a></li><li><img src="http://simg.sinajs.cn/blog7style/images/blog/srh_flt/icon3.gif"><a onclick="v7sendLog(\'09_29_a09_#{id}\',scope.$pageid,\'searchTips\');window.location.href=\'http://control.blog.sina.com.cn/admin/article/article_add.php\'" href="###">发博文</a></li><div class="clear"></div></ul></div><div class="peroth"><a onclick="v7sendLog(\'09_29_a10_#{id}\',scope.$pageid,\'searchTips\');window.location.href=\'http://control.blog.sina.com.cn/blogprofile/profilenoticelist.php\'" href="###">通知#{notice}</a><span>|</span><a onclick="v7sendLog(\'09_29_a11_#{id}\',scope.$pageid,\'searchTips\');window.location.href=\'http://control.blog.sina.com.cn/blogprofile/profilepaperlist.php?type=1\'" href="###">纸条#{message}</a><span>|</span><a onclick="v7sendLog(\'09_29_a13_#{id}\',scope.$pageid,\'searchTips\');window.location.href=\'http://control.blog.sina.com.cn/blogprofile/profilecommlist.php?type=1\'" href="###">评论#{blogcomment}</a></div></div><div class="clear"></div>' + j + "</div>";
    var q = {};
    var f = "";
    var n = function() {
        var L = {};
        L.portait = "http://portrait" + ((1 * $UID) % 8 + 1) + ".sinaimg.cn/" + $UID + "/blog/50";
        L.id = $UID;
        L.wenhou = "早上好";
        var K = new Date();
        if (K.getHours() < 6 || K.getHours() > 16) {
            L.wenhou = "晚上好"
        } else {
            if (K.getHours() < 12) {
                L.wenhou = "早上好"
            } else {
                if (K.getHours() < 15) {
                    L.wenhou = "中午好"
                } else {
                    L.wenhou = "下午好"
                }
            }
        }
        if (scope.unreadMsg) {
            L.nick = (typeof scope.unreadMsg.nickname == "undefeind") ? $UID: scope.unreadMsg.nickname;
            L.notice = (typeof scope.unreadMsg.notice == "undefeind" || scope.unreadMsg.notice == 0) ? "": ("(" + scope.unreadMsg.notice + ")");
            L.blogcomment = (typeof scope.unreadMsg.blogcomment == "undefeind" || scope.unreadMsg.blogcomment == 0) ? "": ("(" + scope.unreadMsg.blogcomment + ")");
            L.message = (typeof scope.unreadMsg.message == "undefeind" || scope.unreadMsg.message == 0) ? "": ("(" + scope.unreadMsg.message + ")")
        } else {
            L.nick = $UID;
            L.notice = "";
            L.blogcomment = "";
            L.message = ""
        }
        f = new Ui.Template(i).evaluate(L)
    };
    if ($isLogin) {
        n()
    }
    var d = function(M, P, O, N, L) {
        L = L ? L: 2;
        M.style[P] = O + "px";
        var K = function() {
            var Q = parseInt(M.style[P]);
            if (Q <= N + Math.abs(L) && Q >= N - Math.abs(L)) {
                M.style[P] = N + "px"
            } else {
                M.style[P] = (Q + L) + "px";
                setTimeout(K, 30)
            }
        };
        K()
    };
    var y = function(N, O) {
        var K = N.substr(0, O);
        var M = K.replace(/[^\x00-\xff]/g, "\r\n").split("");
        O = (M[O - 1] == "\r") ? O - 2 : O - 1;
        var L = M.slice(0, O).join("").replace(/\r\n/g, "*").length + 1;
        return K.substr(0, L)
    };
    var B = function() {
        var K = Article.getSearchReferrer();
        if (!K) {
            return
        } else {
            J = K.key;
            b = K.type
        }
        setTimeout(function() {
            q.imgSrc = "http://simg.sinajs.cn/blog7style/images/blog/srh_flt/img_ad.gif";
            q.adHref = "http://www.google.com";
            q.swfSrc = "http://simg.sinajs.cn/blog7common/swf/240x60.swf"
        },
        1);
        Core.Events.addEvent(window, A, "scroll", false)
    };
    var G = function() {
        $E("out_content").innerHTML = r;
        $E("out_right").innerHTML = $isLogin ? f: v;
        s()
    };
    var m = function(N) {
        var P = {};
        var O = "";
        var L = N.data.b.length > 4 ? 4 : N.data.b.length;
        for (var M = 0; M < L; M++) {
            var K = '<li><a  href="' + N.data.b[M].l + "?k=" + encodeURIComponent(N.data.k) + '&t=utf-8" title="' + N.data.b[M].f + "\" target=\"_blank\" onclick=\"v6SendLog('blog', 'search', 'article');\">" + Core.String.shorten(N.data.b[M].f, 20) + "</a></li>";
            O += K
        }
        P.titleTxt = O;
        a = new Ui.Template(a).evaluate(P);
        $E("out_content").innerHTML = a;
        $E("out_right").innerHTML = $isLogin ? f: v;
        Core.Events.addEvent($E("outshlogin"),
        function() {
            v7sendLog("09_29_a04_0", scope.$pageid, "searchTips");
            var R = new Lib.Login.Ui();
            R.login(function() {
                n();
                $E("out_right").innerHTML = $isLogin ? f: v;
                l()
            },
            false, "referer:" + location.hostname + location.pathname + ",func:0007")
        },
        "click");
        if (N.code == "A09000") {
            $E("out_topTitle").innerHTML = g + F
        } else {
            var Q = "http://uni.sina.com.cn/c.php?k=" + encodeURIComponent(N.data.k) + "&t=all&ie=utf-8";
            $E("out_topTitle").innerHTML = g + "关于“<span class=\"blog_sfNm\"><a onclick=\"v6SendLog('blog', 'search', 'keywords');\" href=\"" + Q + '" target="_blank" title="' + N.data.k + '">' + N.data.ks + "</a></span>”的更多内容："
        }
        l();
        s()
    };
    var C = function() {
        setTimeout(function() {
            l()
        },
        300)
    };
    var l = function() {
        if (I == "img") {
            if (q.imgSrc) {
                z.img = new Ui.Template(z.img).evaluate(q);
                if ($E("blogSfRad")) {
                    $E("blogSfRad").innerHTML = z.img
                } else {
                    C()
                }
            } else {
                C()
            }
        } else {
            if (I == "swf") {
                if (q.swfSrc) {
                    if ($E("blogSfRad")) {
                        var L = function() {
                            var M = $FF ? "window": "transparent";
                            var N = new sinaFlash(q.swfSrc, "fucengAD", "240", "60", "9", "#FFFFFF", false, "High", "http://www.sina.com.cn/", "http://www.sina.com.cn/", false);
                            N.addParam("allowScriptAccess", "always");
                            N.addParam("wmode", M);
                            N.write("blogSfRad")
                        };
                        if (typeof sinaFlash == "undefined") {
                            Lib.include(["http://i3.sinaimg.cn/home/sinaflash.js"], L)
                        } else {
                            var K = $FF ? "window": "transparent";
                            L()
                        }
                    } else {
                        C()
                    }
                } else {
                    C()
                }
            }
        }
    };
    var s = function() {
        if ($isLogin) {} else {
            Core.Events.addEvent($E("serzz"),
            function() {
                v7sendLog("09_29_a02_0", scope.$pageid, "searchTips");
                var K = new Lib.Login.Ui();
                K.login(function() {
                    n();
                    $E("serzz") && (scope.serarticle_quote = new Quote("serzz"));
                    scope.serarticle_quote.check();
                    $E("out_right").innerHTML = $isLogin ? f: v;
                    l()
                },
                false, "referer:" + location.hostname + location.pathname + ",func:0007")
            },
            "click");
            Core.Events.addEvent($E("sergg"),
            function() {
                v7sendLog("09_29_a03_0", scope.$pageid, "searchTips");
                var K = new Lib.Login.Ui();
                K.login(function() {
                    n();
                    Lib.Component.Attention();
                    $E("out_right").innerHTML = $isLogin ? f: v;
                    l()
                },
                false, "referer:" + location.hostname + location.pathname + ",func:0007")
            },
            "click");
            Core.Events.addEvent($E("serblog"),
            function() {
                v7sendLog("09_29_a01_0", scope.$pageid, "searchTips");
                window.location.href = "http://login.sina.com.cn/signup/signup.php?entry=blog&srcuid=" + scope.$uid + "&src=blogicp"
            })
        }
    };
    var H = function() {
        if (!/^(%[abcdef0-9]{2})/gi.test(J)) {
            b = "utf-8"
        }
        var K = Utils.Io.JsLoad.request(c, {
            GET: {
                type: b,
                varname: "outSearch_data",
                keyword: J
            },
            charset: "utf-8",
            onComplete: (function(L) {
                if (L && L.data && (L.code == "A00006" || L.code == "A09000")) {
                    m(L)
                } else {
                    G()
                }
            }).bind2(this),
            onException: (function() {
                G()
            }).bind2(this)
        })
    };
    var E = function() {
        document.body.removeChild(p);
        Core.Events.removeEvent(window, A, "scroll");
        return false
    };
    var A = function() {
        var K = function() {
            if (!$IE6) {
                p.style.position = "fixed";
                d(p, "top", document.documentElement.clientHeight, document.documentElement.clientHeight - 86, -10)
            } else {
                p.style.position = "absolute";
                p.style.top = document.documentElement.clientHeight + document.documentElement.scrollTop - 87 + "px"
            }
        };
        var L = function() {
            $E("out_content").innerHTML = u
        };
        if (!p) {
            if (Math.max(document.documentElement.scrollTop, document.body.scrollTop) > 250) {
                p = $C("div");
                p.style.left = "0px";
                p.style.zIndex = 101;
                p.style.width = "100%";
                p.innerHTML = D;
                document.body.appendChild(p);
                Core.Events.addEvent($E("searchXID"), E, "click", false);
                K();
                L();
                H()
            }
        } else {
            if ($IE6) {
                p.style.top = document.documentElement.clientHeight + document.documentElement.scrollTop - 87 + "px"
            }
        }
    };
    B()
};
$registJob("outSearch",
function() {
    Article.outSearch()
});
$registJob("flashtemplate",
function() {
    Lib.getTplNum(function() {
        if (scope.tpl) {
            Lib.insertMoban()
        }
    })
});
$registJob("imageLazyLoad",
function() {
    var d = document.getElementsByTagName("IMG");
    var c = [];
    for (var b = 0,
    a = d.length; b < a; b++) {
        if (d[b].getAttribute("real_src") != null) {
            c.push(d[b])
        }
    }
    if (c.length > 0) {
        Lib.LazyLoad(c, {
            callback: function(f) {
                f.src = f.getAttribute("real_src")
            }
        })
    }
});
$registJob("stylefix",
function() {
    if ($IE6 && scope.UserPic && scope.UserPic[1] && scope.UserPic[1].apply == "1") {
        $E("blognavBg").style.filter = "none"
    }
});
function main() {
    var a = new Jobs();
    a.add("tray");
    a.add("timePad");
    a.add("autoBlog");
    a.add("recordVisitor");
    a.add("imageLazyLoad");
    a.add("articleComp1");
    a.add("articleNumber");
    a.add("articleComment");
    a.add("articleCommentPost");
    a.add("articleCommentManager");
    a.add("quote");
    a.add("quote_list");
    a.add("dynamicVoteView");
    a.add("outSearch");
    a.add("updownurl");
    a.add("articleComp2");
    a.add("renderAd");
    a.add("templateClone", 3);
    a.add("phone_attention_add", 3);
    a.add("randomScroll", 3);
    a.add("audioCheck", 3);
    a.add("subscribe", 3);
    a.add("articleShare", 3);
    a.add("webim", 3);
    a.add("680");
    a.add("report_blogComment");
    a.add("report_bodyArticle");
    a.add("flashtemplate", 3);
    a.add("stylefix", 3);
    a.start()
};