_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[20],{ESKP:function(e,n,a){"use strict";a.r(n),a.d(n,"default",(function(){return E}));var t=a("o0o1"),r=a.n(t),u=a("HaE+"),c=a("q1tI"),l=a.n(c),i=(a("YFqc"),a("sKNN")),o=a("nOHt"),s=a("wd/R"),d=a.n(s),f=a("hlFM"),w=a("R/WZ"),p=a("PTE6"),m=l.a.createElement,g=Object(w.a)((function(e){return{paper:{padding:e.spacing(3),margin:e.spacing(3)}}}));function E(e){var n=Object(o.useRouter)(),a=(g(),Object(c.useState)({})),t=a[0],s=a[1];console.log(n.query.uid);var w=Object(c.useCallback)(Object(u.a)(r.a.mark((function e(){var a,t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=p.a.firestore().collection("members").doc(n.query.uid),e.next=3,a.get();case 3:(t=e.sent).exists?s(t.data()):alert("\u30e1\u30f3\u30d0\u30fc\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002");case 5:case"end":return e.stop()}}),e)}))),[n.query.uid]);return Object(c.useEffect)((function(){w()}),[w]),void 0===t.createdAt?m("p",null,"Loading..."):m(l.a.Fragment,null,m(i.a,null,m(f.a,null,"UID:",t.docId),m(f.a,null,"Email:",t.email),m(f.a,null,"\u5c45\u4f4f\u5730\u57df:",t.area),m(f.a,null,m("img",{src:t.avatarUrl,width:"200",alt:""})),m(f.a,null,"\u6027\u5225:",t.gender),m(f.a,null,"\u8a73\u7d30: ",d()(1e3*t.birthday.seconds).format("YYYY/MM/DD")),m(f.a,null,"\u540c\u610f:",String(t.agree)),m(f.a,null,"\u767b\u9332\u65e5\u6642:",d()(1e3*t.createdAt.seconds).format("YYYY-MM-DD HH:mm:dd:ss")),m(f.a,null)))}},iG21:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/work-crud-show/[uid]",function(){return a("ESKP")}])}},[["iG21",1,2,5,6,10,0,3,4,7,8]]]);