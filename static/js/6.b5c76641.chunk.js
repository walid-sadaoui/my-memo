(this["webpackJsonpmy-memo"]=this["webpackJsonpmy-memo"]||[]).push([[6],{61:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(6),s=a(21),m=a(20),c=a(31),o=a(41),u=a(40),i=function(e){var t=Object.assign({},e);return r.a.createElement(s.b,Object.assign({to:"/login",className:"flex items-end justify-end text-white rounded hover:text-teal-200"},t),r.a.createElement(m.b,{icon:"userCircle",size:m.a.MEDIUM},r.a.createElement("span",{className:"sr-only sm:not-sr-only sm:ml-2 sm:flex"},"Connexion")))},p=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],p=t[1];return r.a.createElement(r.a.Fragment,null,a&&r.a.createElement(u.a,{onClose:function(){return p(!1)}}),r.a.createElement(o.a,null,r.a.createElement(m.b,{icon:"menu",size:m.a.MEDIUM,onClick:function(){return p(!0)},className:"m-4 sm:hidden","aria-label":"Menu"}),r.a.createElement(c.a,{onClick:function(){return p(!1)}}),r.a.createElement(o.b,null,r.a.createElement("ul",{className:"hidden sm:flex sm:flex-row sm:mr-auto sm:ml-4 sm:w-auto"},r.a.createElement("li",{className:"py-2"},r.a.createElement(s.b,{to:"/notes",onClick:function(){return p(!1)},className:"ml-2 mr-4 text-teal-200 hover:text-white"},"Notes"))),r.a.createElement(i,{onClick:function(){return p(!1)}}))))},d=a(42),f=a(19),b=a(36),E=a(1),x=a.n(E),h=a(2),g=a(43),v=a(3),w=a(37),y=function(){var e,t,a=Object(v.b)().login,l=Object(n.useRef)(null),c=Object(g.a)({mode:"onBlur"}),o=c.register,u=c.handleSubmit,i=c.errors,p=function(){var e=Object(h.a)(x.a.mark((function e(t){var n,r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.email,r=t.password,e.next=3,a({email:n,password:r});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){var e;null===(e=l.current)||void 0===e||e.focus()}),[]),r.a.createElement("section",{className:"flex flex-col flex-1 p-2 my-auto sm:border-t-4 sm:border-blue-900 mx-auto max-w-2xl sm:shadow-lg"},r.a.createElement("header",{className:"flex pl-8 pr-12 py-2 items-center text-gray-900 justify-center"},r.a.createElement("h1",{className:"text-5xl font-medium font-hand text-gray-800"},"Connexion")),r.a.createElement("form",{onSubmit:u(p),className:"flex flex-col px-8"},r.a.createElement(w.a,{id:"signup-email",label:"Email",type:"email",name:"email",ref:function(e){l.current=e,o(e,{required:!0})}}),i.email&&r.a.createElement("span",{className:"text-red-500"},"L'email est requis"),r.a.createElement(w.a,{id:"signup-password",label:"Mot de passe",type:"password",name:"password",ref:o({required:!0,minLength:6})}),"required"===(null===(e=i.password)||void 0===e?void 0:e.type)&&r.a.createElement("span",{className:"text-red-500"},"Le mot de passe est requis"),"minLength"===(null===(t=i.password)||void 0===t?void 0:t.type)&&r.a.createElement("span",{className:"text-red-500"},"Le mot de passe doit contenir au moins 6 caract\xe8res avec une lettre et un chiffre"),r.a.createElement(s.b,{to:"/signup",className:"mr-auto text-blue-700 hover:underline"},"Mot de passe oubli\xe9 ?"),r.a.createElement(m.b,{value:"Se Connecter",type:"submit"}),r.a.createElement("button",{type:"submit",className:"inline-flex items-center px-4 py-2 mx-auto my-4 text-white bg-blue-900 rounded hover:bg-blue-800"},"Se Connecter")),r.a.createElement("span",{className:"mx-auto"},"Vous n'avez pas de compte ?"," ",r.a.createElement(s.b,{to:"/signup",className:"text-blue-700 hover:underline"},"Cr\xe9ez un compte")))},N=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(f.b,{exact:!0,path:"/",component:d.a}),r.a.createElement(f.b,{path:"/notes",component:d.a}),r.a.createElement(f.b,{path:"/signup",component:b.a}),r.a.createElement(f.b,{path:"/login",component:y}),r.a.createElement(f.b,{path:"*"},r.a.createElement(f.a,{to:"/"})))};t.default=function(){return r.a.createElement(s.a,null,r.a.createElement(p,null),r.a.createElement("main",{role:"main",className:"flex flex-grow overflow-hidden bg-white"},r.a.createElement(N,null)))}}}]);
//# sourceMappingURL=6.b5c76641.chunk.js.map