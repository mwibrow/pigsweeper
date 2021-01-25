(this.webpackJsonppigsweeper=this.webpackJsonppigsweeper||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,i){},function(e,t,i){},function(e,t,i){},function(e,t,i){},function(e,t,i){},function(e,t,i){},function(e,t,i){"use strict";i.r(t);var s,n=i(0),c=i(1),a=i.n(c),l=i(8),r=i.n(l),o=(i(15),i(2)),u=i(3),h=i(5),f=i(6);!function(e){e.Empty="empty",e.Mine="mine"}(s||(s={}));var d,b=function(){function e(){Object(h.a)(this,e),this.kind=s.Empty,this.visible=!1,this.flagged=!1,this.neighbors=0}return Object(f.a)(e,[{key:"setKind",value:function(e){this.kind=e}},{key:"isMine",value:function(){return this.kind===s.Mine}}]),e}(),v=function(){function e(t,i,s){Object(h.a)(this,e),this.cells=void 0,this.rows=void 0,this.columns=void 0,this.mines=void 0,this.flags=void 0,this.covered=void 0,this.rows=Math.max(t,2),this.columns=Math.max(i,2),this.mines=Math.max(Math.min(s,this.rows*this.columns-1),1),this.flags=this.covered=this.mines,this.cells=[],this.create()}return Object(f.a)(e,[{key:"create",value:function(){for(var e=this,t=0;t<this.rows;t++){this.cells.push([]);for(var i=0;i<this.columns;i++)this.cells[t].push(new b)}for(var n=this.mines;n>0;n--){var c=Math.floor(Math.random()*this.rows),a=Math.floor(Math.random()*this.columns);this.isMine(c,a)?n++:this.cells[c][a].setKind(s.Mine)}for(var l=0;l<this.rows;l++)for(var r=function(t){if(!e.isMine(l,t)){var i=0;[l-1,l,l+1].map((function(s){return[t-1,t,t+1].map((function(t){e.isMine(s,t)&&i++}))})),e.cells[l][t].neighbors=i}},o=0;o<this.columns;o++)r(o);this.flags=this.covered=this.mines}},{key:"cellAt",value:function(e,t){return this.cells[e][t]}},{key:"isInGrid",value:function(e,t){return e>=0&&e<this.rows&&t>=0&&t<this.columns}},{key:"isMine",value:function(e,t){return this.isInGrid(e,t)&&this.cells[e][t].isMine()}},{key:"isVisible",value:function(e,t){return this.isInGrid(e,t)&&this.cells[e][t].visible}},{key:"reset",value:function(){for(var e=0;e<this.rows;e++)for(var t=0;t<this.columns;t++)this.cells[e][t].flagged=!1,this.cells[e][t].visible=!1}},{key:"restart",value:function(){this.create()}},{key:"reveal",value:function(){for(var e=0;e<this.rows;e++)for(var t=0;t<this.columns;t++)this.isMine(e,t)&&(this.cells[e][t].flagged=!1,this.cells[e][t].visible=!0)}},{key:"hasWon",value:function(){return this.covered===this.mines}},{key:"toggleFlag",value:function(e,t){this.cells[e][t].flagged=!this.cells[e][t].flagged,this.cells[e][t].flagged?this.flags--:this.flags++}},{key:"hasNeighbours",value:function(e,t){return Boolean(this.isInGrid(e,t)&&this.cells[e][t].neighbors>0)}},{key:"makeVisible",value:function(e,t){!this.isInGrid(e,t)||this.cells[e][t].visible||this.cells[e][t].isMine()||(this.cells[e][t].visible=!0,this.covered--,this.cells[e][t].flagged&&this.toggleFlag(e,t),this.hasNeighbours(e,t)||(this.makeVisible(e-1,t),this.makeVisible(e+1,t),this.makeVisible(e,t-1),this.makeVisible(e,t+1),this.makeVisible(e-1,t-1),this.makeVisible(e-1,t+1),this.makeVisible(e+1,t-1),this.makeVisible(e+1,t+1)))}},{key:"showMines",value:function(){for(var e=0;e<this.rows;e++)for(var t=0;t<this.columns;t++)this.isMine(e,t)&&(this.cells[e][t].flagged=!1,this.cells[e][t].visible=!0)}}]),e}(),g=(i(16),function(e){var t=e.row,i=e.column,s=e.renderer;return Object(n.jsx)("div",{className:"grid-cell",children:s(t,i)})}),j=(i(17),function(e){var t=e.rows,i=e.columns,s=e.cellRenderer;return Object(n.jsx)("div",{className:"grid",children:Array(t).fill(1).map((function(e,t){return Object(n.jsx)("div",{className:"grid-cell-row",children:Array(i).fill(1).map((function(e,i){return Object(n.jsx)("div",{className:"grid-cell-column",children:Object(n.jsx)(g,{row:t,column:i,renderer:s})},"grid-column-".concat(i+1))}))},"grid-row-".concat(t+1))}))})}),m=i(7),O=i(9),p=(i(18),function(e){var t=e.active,i=e.visible,s=e.mine,c=e.flagged,a=e.neighbors,l=Object(O.a)(e,["active","visible","mine","flagged","neighbors"]);return Object(n.jsxs)("div",Object(m.a)(Object(m.a)({className:Object(u.a)("tile",{"tile-active":t,"tile-visible":i})},l),{},{children:[Object(n.jsx)("div",{className:Object(u.a)("tile-image","tile-image-kind-".concat(s?"mine":"empty"))}),Object(n.jsx)("div",{className:Object(u.a)("tile-neighbors","tile-neighbors-".concat(a))}),c?Object(n.jsx)("div",{className:"tile-flagged"}):null]}))});i(19);!function(e){e[e.Reset=0]="Reset",e[e.Running=1]="Running",e[e.Stopped=2]="Stopped"}(d||(d={}));var k,w=function(e){var t=e.state,i=Object(c.useRef)(void 0),s=Object(c.useState)(0),a=Object(o.a)(s,2),l=a[0],r=a[1];return Object(c.useEffect)((function(){switch(t){case d.Reset:r((function(){return 0})),clearInterval(i.current),i.current=void 0;break;case d.Running:i.current||(r((function(){return 0})),i.current=window.setInterval((function(){r((function(e){return e+1}))}),1e3));break;case d.Stopped:clearInterval(i.current),i.current=void 0}return function(){clearInterval(i.current),i.current=void 0}}),[t,i]),Object(n.jsxs)("div",{className:"timer",children:["Time: ",l]})};i(20);!function(e){e[e.Default=0]="Default",e[e.Playing=1]="Playing",e[e.Won=2]="Won",e[e.Lost=3]="Lost"}(k||(k={}));var M=function(e){e.preventDefault(),e.stopPropagation()};var x=function(){var e=Object(c.useState)(12),t=Object(o.a)(e,1)[0],i=Object(c.useState)(12),s=Object(o.a)(i,1)[0],a=Object(c.useState)(24),l=Object(o.a)(a,1)[0],r=Object(c.useState)(new v(t,s,l)),h=Object(o.a)(r,2),f=h[0],b=h[1],g=Object(c.useState)(0),m=Object(o.a)(g,2),O=m[0],x=m[1],y=Object(c.useState)(k.Default),N=Object(o.a)(y,2),S=N[0],P=N[1],R=Object(c.useState)(!1),V=Object(o.a)(R,2),D=V[0],I=V[1],C=Object(c.useState)(d.Stopped),F=Object(o.a)(C,2),L=F[0],W=F[1],A=S===k.Playing,G=A||S===k.Default,E=function(e){e.preventDefault(),e.stopPropagation(),A&&I(!0)},B=function(e){e.preventDefault(),e.stopPropagation(),A&&I(!1)},T=function(e,t){f.isVisible(e,t)||(f.toggleFlag(e,t),x(O+1),P(k.Playing),W(d.Running))},J=function(e,t){f.isMine(e,t)?(f.showMines(),P(k.Lost),W(d.Stopped)):(f.makeVisible(e,t),f.hasWon()?(P(k.Won),W(d.Stopped)):(P(k.Playing),W(d.Running))),x(O+1)},K=function(e,t,i){if(G)return function(s){s.preventDefault(),s.stopPropagation(),e(t,i)}};return Object(n.jsxs)("div",{className:"App",onContextMenu:M,onClick:M,children:[Object(n.jsx)("div",{className:"heading",children:"Pigsweeper"}),Object(n.jsxs)("div",{className:"game",children:[Object(n.jsxs)("div",{className:"dashboard",children:[Object(n.jsx)("div",{className:"dashboard-timer",children:Object(n.jsx)(w,{state:L})}),Object(n.jsx)("div",{className:Object(u.a)("dashboard-status",{"status-lost":S===k.Lost,"status-guessing":D,"status-won":S===k.Won}),onClick:function(){b(new v(t,s,l)),x(0),P(k.Default),W(d.Reset)}}),Object(n.jsxs)("div",{className:"dashboard-flags",children:["Flags: ",f.flags]})]}),Object(n.jsx)(j,{rows:f.rows,columns:f.columns,cellRenderer:function(e,t){var i=f.cellAt(e,t);return Object(n.jsx)("div",{onMouseDown:E,onMouseUp:B,onClick:K(J,e,t),onContextMenu:K(T,e,t),children:Object(n.jsx)(p,{active:G,visible:i.visible,mine:i.isMine(),neighbors:i.neighbors,flagged:i.flagged})})}})]})]})},y=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,22)).then((function(t){var i=t.getCLS,s=t.getFID,n=t.getFCP,c=t.getLCP,a=t.getTTFB;i(e),s(e),n(e),c(e),a(e)}))};r.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(x,{})}),document.getElementById("root")),y()}],[[21,1,2]]]);
//# sourceMappingURL=main.414e9d30.chunk.js.map