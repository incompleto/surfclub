parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"o2ZU":[function(require,module,exports) {
!function(n,t){"object"==typeof module&&module.exports?module.exports=t():n.Zdog=t()}(this,function(){var n={};n.TAU=2*Math.PI,n.extend=function(n,t){for(var r in t)n[r]=t[r];return n},n.lerp=function(n,t,r){return(t-n)*r+n},n.modulo=function(n,t){return(n%t+t)%t};var t={2:function(n){return n*n},3:function(n){return n*n*n},4:function(n){return n*n*n*n},5:function(n){return n*n*n*n*n}};return n.easeInOut=function(n,r){if(1==r)return n;var u=(n=Math.max(0,Math.min(1,n)))<.5,e=u?n:1-n,o=(t[r]||t[2])(e/=.5);return o/=2,u?o:1-o},n});
},{}],"qrKX":[function(require,module,exports) {
!function(n,e){"object"==typeof module&&module.exports?module.exports=e():n.Zdog.CanvasRenderer=e()}(this,function(){var n={isCanvas:!0,begin:function(n){n.beginPath()},move:function(n,e,t){n.moveTo(t.x,t.y)},line:function(n,e,t){n.lineTo(t.x,t.y)},bezier:function(n,e,t,o,i){n.bezierCurveTo(t.x,t.y,o.x,o.y,i.x,i.y)},closePath:function(n){n.closePath()},setPath:function(){},renderPath:function(e,t,o,i){this.begin(e,t),o.forEach(function(o){o.render(e,t,n)}),i&&this.closePath(e,t)},stroke:function(n,e,t,o,i){t&&(n.strokeStyle=o,n.lineWidth=i,n.stroke())},fill:function(n,e,t,o){t&&(n.fillStyle=o,n.fill())},end:function(){}};return n});
},{}],"x/Ec":[function(require,module,exports) {
!function(t,n){"object"==typeof module&&module.exports?module.exports=n():t.Zdog.SvgRenderer=n()}(this,function(){var t={isSvg:!0},n=t.round=function(t){return Math.round(1e3*t)/1e3};function e(t){return n(t.x)+","+n(t.y)+" "}return t.begin=function(){},t.move=function(t,n,r){return"M"+e(r)},t.line=function(t,n,r){return"L"+e(r)},t.bezier=function(t,n,r,o,u){return"C"+e(r)+e(o)+e(u)},t.closePath=function(){return"Z"},t.setPath=function(t,n,e){n.setAttribute("d",e)},t.renderPath=function(n,e,r,o){var u="";r.forEach(function(r){u+=r.render(n,e,t)}),o&&(u+=this.closePath(n,e)),this.setPath(n,e,u)},t.stroke=function(t,n,e,r,o){e&&(n.setAttribute("stroke",r),n.setAttribute("stroke-width",o))},t.fill=function(t,n,e,r){var o=e?r:"none";n.setAttribute("fill",o)},t.end=function(t,n){t.appendChild(n)},t});
},{}],"oGeX":[function(require,module,exports) {
!function(t,i){if("object"==typeof module&&module.exports)module.exports=i(require("./boilerplate"));else{var s=t.Zdog;s.Vector=i(s)}}(this,function(t){function i(t){this.set(t)}var s=t.TAU;function o(t,i,o,r){if(i&&i%s!=0){var h=Math.cos(i),n=Math.sin(i),e=t[o],u=t[r];t[o]=e*h-u*n,t[r]=u*h+e*n}}function r(t){return Math.abs(t-1)<1e-8?1:Math.sqrt(t)}return i.prototype.set=function(t){return this.x=t&&t.x||0,this.y=t&&t.y||0,this.z=t&&t.z||0,this},i.prototype.write=function(t){return t?(this.x=null!=t.x?t.x:this.x,this.y=null!=t.y?t.y:this.y,this.z=null!=t.z?t.z:this.z,this):this},i.prototype.rotate=function(t){if(t)return this.rotateZ(t.z),this.rotateY(t.y),this.rotateX(t.x),this},i.prototype.rotateZ=function(t){o(this,t,"x","y")},i.prototype.rotateX=function(t){o(this,t,"y","z")},i.prototype.rotateY=function(t){o(this,t,"x","z")},i.prototype.add=function(t){return t?(this.x+=t.x||0,this.y+=t.y||0,this.z+=t.z||0,this):this},i.prototype.subtract=function(t){return t?(this.x-=t.x||0,this.y-=t.y||0,this.z-=t.z||0,this):this},i.prototype.multiply=function(t){return null==t?this:("number"==typeof t?(this.x*=t,this.y*=t,this.z*=t):(this.x*=null!=t.x?t.x:1,this.y*=null!=t.y?t.y:1,this.z*=null!=t.z?t.z:1),this)},i.prototype.transform=function(t,i,s){return this.multiply(s),this.rotate(i),this.add(t),this},i.prototype.lerp=function(i,s){return this.x=t.lerp(this.x,i.x||0,s),this.y=t.lerp(this.y,i.y||0,s),this.z=t.lerp(this.z,i.z||0,s),this},i.prototype.magnitude=function(){return r(this.x*this.x+this.y*this.y+this.z*this.z)},i.prototype.magnitude2d=function(){return r(this.x*this.x+this.y*this.y)},i.prototype.copy=function(){return new i(this)},i});
},{"./boilerplate":"o2ZU"}],"jshy":[function(require,module,exports) {
!function(t,r){if("object"==typeof module&&module.exports)module.exports=r(require("./boilerplate"),require("./vector"),require("./canvas-renderer"),require("./svg-renderer"));else{var e=t.Zdog;e.Anchor=r(e,e.Vector,e.CanvasRenderer,e.SvgRenderer)}}(this,function(t,r,e,o){var n=t.TAU,i={x:1,y:1,z:1};function a(t){this.create(t||{})}return a.prototype.create=function(e){t.extend(this,this.constructor.defaults),this.setOptions(e),this.translate=new r(e.translate),this.rotate=new r(e.rotate),this.scale=new r(i).multiply(this.scale),this.origin=new r,this.renderOrigin=new r,this.children=[],this.addTo&&this.addTo.addChild(this)},a.defaults={},a.optionKeys=Object.keys(a.defaults).concat(["rotate","translate","scale","addTo"]),a.prototype.setOptions=function(t){var r=this.constructor.optionKeys;for(var e in t)r.includes(e)&&(this[e]=t[e])},a.prototype.addChild=function(t){-1==this.children.indexOf(t)&&(t.remove(),t.addTo=this,this.children.push(t))},a.prototype.removeChild=function(t){var r=this.children.indexOf(t);-1!=r&&this.children.splice(r,1)},a.prototype.remove=function(){this.addTo&&this.addTo.removeChild(this)},a.prototype.update=function(){this.reset(),this.children.forEach(function(t){t.update()}),this.transform(this.translate,this.rotate,this.scale)},a.prototype.reset=function(){this.renderOrigin.set(this.origin)},a.prototype.transform=function(t,r,e){this.renderOrigin.transform(t,r,e),this.children.forEach(function(o){o.transform(t,r,e)})},a.prototype.updateGraph=function(){this.update(),this.updateFlatGraph(),this.flatGraph.forEach(function(t){t.updateSortValue()}),this.flatGraph.sort(a.shapeSorter)},a.shapeSorter=function(t,r){return t.sortValue-r.sortValue},Object.defineProperty(a.prototype,"flatGraph",{get:function(){return this._flatGraph||this.updateFlatGraph(),this._flatGraph},set:function(t){this._flatGraph=t}}),a.prototype.updateFlatGraph=function(){this.flatGraph=this.getFlatGraph()},a.prototype.getFlatGraph=function(){var t=[this];return this.addChildFlatGraph(t)},a.prototype.addChildFlatGraph=function(t){return this.children.forEach(function(r){var e=r.getFlatGraph();Array.prototype.push.apply(t,e)}),t},a.prototype.updateSortValue=function(){this.sortValue=this.renderOrigin.z},a.prototype.render=function(){},a.prototype.renderGraphCanvas=function(t){if(!t)throw new Error("ctx is "+t+". Canvas context required for render. Check .renderGraphCanvas( ctx ).");this.flatGraph.forEach(function(r){r.render(t,e)})},a.prototype.renderGraphSvg=function(t){if(!t)throw new Error("svg is "+t+". SVG required for render. Check .renderGraphSvg( svg ).");this.checkFlatGraph(),this.flatGraph.forEach(function(r){r.render(t,o)})},a.prototype.copy=function(r){var e={};return this.constructor.optionKeys.forEach(function(t){e[t]=this[t]},this),t.extend(e,r),new(0,this.constructor)(e)},a.prototype.copyGraph=function(t){var r=this.copy(t);return this.children.forEach(function(t){t.copyGraph({addTo:r})}),r},a.prototype.normalizeRotate=function(){this.rotate.x=t.modulo(this.rotate.x,n),this.rotate.y=t.modulo(this.rotate.y,n),this.rotate.z=t.modulo(this.rotate.z,n)},a.subclass=function r(e){return function(o){function n(t){this.create(t||{})}return n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.defaults=t.extend({},e.defaults),t.extend(n.defaults,o),n.optionKeys=e.optionKeys.slice(0),Object.keys(n.defaults).forEach(function(t){n.optionKeys.includes(t)||n.optionKeys.push(t)}),n.subclass=r(n),n}}(a),a});
},{"./boilerplate":"o2ZU","./vector":"oGeX","./canvas-renderer":"qrKX","./svg-renderer":"x/Ec"}],"UR0X":[function(require,module,exports) {
!function(t,o){"object"==typeof module&&module.exports?module.exports=o(t):t.Zdog.Dragger=o(t)}(this,function(t){var o="mousedown",e="mousemove",n="mouseup";function r(){}function i(t){this.create(t||{})}return t.PointerEvent?(o="pointerdown",e="pointermove",n="pointerup"):"ontouchstart"in t&&(o="touchstart",e="touchmove",n="touchend"),i.prototype.create=function(t){this.onDragStart=t.onDragStart||r,this.onDragMove=t.onDragMove||r,this.onDragEnd=t.onDragEnd||r,this.bindDrag(t.startElement)},i.prototype.bindDrag=function(t){(t=this.getQueryElement(t))&&t.addEventListener(o,this)},i.prototype.getQueryElement=function(t){return"string"==typeof t&&(t=document.querySelector(t)),t},i.prototype.handleEvent=function(t){var o=this["on"+t.type];o&&o.call(this,t)},i.prototype.onmousedown=i.prototype.onpointerdown=function(t){this.dragStart(t,t)},i.prototype.ontouchstart=function(t){this.dragStart(t,t.changedTouches[0])},i.prototype.dragStart=function(o,r){o.preventDefault(),this.dragStartX=r.pageX,this.dragStartY=r.pageY,t.addEventListener(e,this),t.addEventListener(n,this),this.onDragStart(r)},i.prototype.ontouchmove=function(t){this.dragMove(t,t.changedTouches[0])},i.prototype.onmousemove=i.prototype.onpointermove=function(t){this.dragMove(t,t)},i.prototype.dragMove=function(t,o){t.preventDefault();var e=o.pageX-this.dragStartX,n=o.pageY-this.dragStartY;this.onDragMove(o,e,n)},i.prototype.onmouseup=i.prototype.onpointerup=i.prototype.ontouchend=i.prototype.dragEnd=function(){t.removeEventListener(e,this),t.removeEventListener(n,this),this.onDragEnd()},i});
},{}],"SunY":[function(require,module,exports) {
!function(t,e){if("object"==typeof module&&module.exports)module.exports=e(require("./boilerplate"),require("./anchor"),require("./dragger"));else{var i=t.Zdog;i.Illustration=e(i,i.Anchor,i.Dragger)}}(this,function(t,e,i){function s(){}var r=t.TAU,h=e.subclass({element:void 0,centered:!0,zoom:1,dragRotate:!1,resize:!1,onPrerender:s,onDragStart:s,onDragMove:s,onDragEnd:s,onResize:s});return t.extend(h.prototype,i.prototype),h.prototype.create=function(t){e.prototype.create.call(this,t),i.prototype.create.call(this,t),this.setElement(this.element),this.setDragRotate(this.dragRotate),this.setResize(this.resize)},h.prototype.setElement=function(t){if(!(t=this.getQueryElement(t)))throw new Error("Zdog.Illustration element required. Set to "+t);var e=t.nodeName.toLowerCase();"canvas"==e?this.setCanvas(t):"svg"==e&&this.setSvg(t)},h.prototype.setSize=function(t,e){t=Math.round(t),e=Math.round(e),this.isCanvas?this.setSizeCanvas(t,e):this.isSvg&&this.setSizeSvg(t,e)},h.prototype.setResize=function(t){this.resize=t,this.resizeListener||(this.resizeListener=this.onWindowResize.bind(this)),t?(window.addEventListener("resize",this.resizeListener),this.onWindowResize()):window.removeEventListener("resize",this.resizeListener)},h.prototype.onWindowResize=function(){this.setMeasuredSize(),this.onResize(this.width,this.height)},h.prototype.setMeasuredSize=function(){var t,e;if("fullscreen"==this.resize)t=window.innerWidth,e=window.innerHeight;else{var i=this.element.getBoundingClientRect();t=i.width,e=i.height}this.setSize(t,e)},h.prototype.renderGraph=function(t){this.isCanvas?this.renderGraphCanvas(t):this.isSvg&&this.renderGraphSvg(t)},h.prototype.updateRenderGraph=function(t){this.updateGraph(),this.renderGraph(t)},h.prototype.setCanvas=function(t){this.element=t,this.isCanvas=!0,this.ctx=this.element.getContext("2d"),this.setSizeCanvas(t.width,t.height)},h.prototype.setSizeCanvas=function(t,e){this.width=t,this.height=e;var i=this.pixelRatio=window.devicePixelRatio||1;this.element.width=this.canvasWidth=t*i,this.element.height=this.canvasHeight=e*i,i>1&&!this.resize&&(this.element.style.width=t+"px",this.element.style.height=e+"px")},h.prototype.renderGraphCanvas=function(t){t=t||this,this.prerenderCanvas(),e.prototype.renderGraphCanvas.call(t,this.ctx),this.postrenderCanvas()},h.prototype.prerenderCanvas=function(){var t=this.ctx;if(t.lineCap="round",t.lineJoin="round",t.clearRect(0,0,this.canvasWidth,this.canvasHeight),t.save(),this.centered){var e=this.width/2*this.pixelRatio,i=this.height/2*this.pixelRatio;t.translate(e,i)}var s=this.pixelRatio*this.zoom;t.scale(s,s),this.onPrerender(t)},h.prototype.postrenderCanvas=function(){this.ctx.restore()},h.prototype.setSvg=function(t){this.element=t,this.isSvg=!0,this.pixelRatio=1;var e=t.getAttribute("width"),i=t.getAttribute("height");this.setSizeSvg(e,i)},h.prototype.setSizeSvg=function(t,e){this.width=t,this.height=e;var i=t/this.zoom,s=e/this.zoom,r=this.centered?-i/2:0,h=this.centered?-s/2:0;this.element.setAttribute("viewBox",r+" "+h+" "+i+" "+s),this.resize?(this.element.removeAttribute("width"),this.element.removeAttribute("height")):(this.element.setAttribute("width",t),this.element.setAttribute("height",e))},h.prototype.renderGraphSvg=function(t){t=t||this,function(t){for(;t.firstChild;)t.removeChild(t.firstChild)}(this.element),this.onPrerender(this.element),e.prototype.renderGraphSvg.call(t,this.element)},h.prototype.setDragRotate=function(t){t&&(!0===t&&(t=this),this.dragRotate=t,this.bindDrag(this.element))},h.prototype.dragStart=function(){this.dragStartRX=this.dragRotate.rotate.x,this.dragStartRY=this.dragRotate.rotate.y,i.prototype.dragStart.apply(this,arguments)},h.prototype.dragMove=function(t,e){var s=e.pageX-this.dragStartX,h=e.pageY-this.dragStartY,n=Math.min(this.width,this.height),o=s/n*r,a=h/n*r;this.dragRotate.rotate.x=this.dragStartRX-a,this.dragRotate.rotate.y=this.dragStartRY-o,i.prototype.dragMove.apply(this,arguments)},h});
},{"./boilerplate":"o2ZU","./anchor":"jshy","./dragger":"UR0X"}],"4bOY":[function(require,module,exports) {
!function(t,n){if("object"==typeof module&&module.exports)module.exports=n(require("./vector"));else{var e=t.Zdog;e.PathCommand=n(e.Vector)}}(this,function(t){function n(n,o,i){this.method=n,this.points=o.map(e),this.renderPoints=o.map(r),this.previousPoint=i,this.endRenderPoint=this.renderPoints[this.renderPoints.length-1],"arc"==n&&(this.controlPoints=[new t,new t])}function e(n){return n instanceof t?n:new t(n)}function r(n){return new t(n)}n.prototype.reset=function(){var t=this.points;this.renderPoints.forEach(function(n,e){var r=t[e];n.set(r)})},n.prototype.transform=function(t,n,e){this.renderPoints.forEach(function(r){r.transform(t,n,e)})},n.prototype.render=function(t,n,e){return this[this.method](t,n,e)},n.prototype.move=function(t,n,e){return e.move(t,n,this.renderPoints[0])},n.prototype.line=function(t,n,e){return e.line(t,n,this.renderPoints[0])},n.prototype.bezier=function(t,n,e){var r=this.renderPoints[0],o=this.renderPoints[1],i=this.renderPoints[2];return e.bezier(t,n,r,o,i)};return n.prototype.arc=function(t,n,e){var r=this.previousPoint,o=this.renderPoints[0],i=this.renderPoints[1],s=this.controlPoints[0],h=this.controlPoints[1];return s.set(r).lerp(o,9/16),h.set(i).lerp(o,9/16),e.bezier(t,n,s,h,i)},n});
},{"./vector":"oGeX"}],"3q8W":[function(require,module,exports) {
!function(t,e){if("object"==typeof module&&module.exports)module.exports=e(require("./boilerplate"),require("./vector"),require("./path-command"),require("./anchor"));else{var r=t.Zdog;r.Shape=e(r,r.Vector,r.PathCommand,r.Anchor)}}(this,function(t,e,r,n){var i=n.subclass({stroke:1,fill:!1,color:"#333",closed:!0,visible:!0,path:[{}],front:{z:1},backface:!0});i.prototype.create=function(t){n.prototype.create.call(this,t),this.updatePath(),this.front=new e(t.front||this.front),this.renderFront=new e(this.front),this.renderNormal=new e};var o=["move","line","bezier","arc"];i.prototype.updatePath=function(){this.setPath(),this.updatePathCommands()},i.prototype.setPath=function(){},i.prototype.updatePathCommands=function(){var t;this.pathCommands=this.path.map(function(e,n){var i=Object.keys(e),s=i[0],a=e[s];1==i.length&&o.includes(s)||(s="line",a=e);var h="line"==s||"move"==s,d=Array.isArray(a);h&&!d&&(a=[a]);var c=new r(s=0===n?"move":s,a,t);return t=c.endRenderPoint,c})},i.prototype.reset=function(){this.renderOrigin.set(this.origin),this.renderFront.set(this.front),this.pathCommands.forEach(function(t){t.reset()})},i.prototype.transform=function(t,e,r){this.renderOrigin.transform(t,e,r),this.renderFront.transform(t,e,r),this.renderNormal.set(this.renderOrigin).subtract(this.renderFront),this.pathCommands.forEach(function(n){n.transform(t,e,r)}),this.children.forEach(function(n){n.transform(t,e,r)})},i.prototype.updateSortValue=function(){var t=0;this.pathCommands.forEach(function(e){t+=e.endRenderPoint.z}),this.sortValue=t/this.pathCommands.length},i.prototype.render=function(t,e){var r=this.pathCommands.length;if(this.visible&&r&&(this.isFacingBack=this.renderNormal.z>0,this.backface||!this.isFacingBack)){if(!e)throw new Error("Zdog renderer required. Set to "+e);var n=1==r;e.isCanvas&&n?this.renderCanvasDot(t,e):this.renderPath(t,e)}};var s=t.TAU;i.prototype.renderCanvasDot=function(t){var e=this.getLineWidth();if(e){t.fillStyle=this.getRenderColor();var r=this.pathCommands[0].endRenderPoint;t.beginPath();var n=e/2;t.arc(r.x,r.y,n,0,s),t.fill()}},i.prototype.getLineWidth=function(){return this.stroke?1==this.stroke?1:this.stroke:0},i.prototype.getRenderColor=function(){return"string"==typeof this.backface&&this.isFacingBack?this.backface:this.color},i.prototype.renderPath=function(t,e){var r=this.getRenderElement(t,e),n=!(2==this.pathCommands.length&&"line"==this.pathCommands[1].method)&&this.closed,i=this.getRenderColor();e.renderPath(t,r,this.pathCommands,n),e.stroke(t,r,this.stroke,i,this.getLineWidth()),e.fill(t,r,this.fill,i),e.end(t,r)};return i.prototype.getRenderElement=function(t,e){if(e.isSvg)return this.svgElement||(this.svgElement=document.createElementNS("http://www.w3.org/2000/svg","path"),this.svgElement.setAttribute("stroke-linecap","round"),this.svgElement.setAttribute("stroke-linejoin","round")),this.svgElement},i});
},{"./boilerplate":"o2ZU","./vector":"oGeX","./path-command":"4bOY","./anchor":"jshy"}],"hw4v":[function(require,module,exports) {
!function(t,r){if("object"==typeof module&&module.exports)module.exports=r(require("./anchor"));else{var o=t.Zdog;o.Group=r(o.Anchor)}}(this,function(t){var r=t.subclass({updateSort:!1,visible:!0});return r.prototype.updateSortValue=function(){var r=0;this.flatGraph.forEach(function(t){t.updateSortValue(),r+=t.sortValue}),this.sortValue=r/this.flatGraph.length,this.updateSort&&this.flatGraph.sort(t.shapeSorter)},r.prototype.render=function(t,r){this.visible&&this.flatGraph.forEach(function(o){o.render(t,r)})},r.prototype.updateFlatGraph=function(){this.flatGraph=this.addChildFlatGraph([])},r.prototype.getFlatGraph=function(){return[this]},r});
},{"./anchor":"jshy"}],"4vOc":[function(require,module,exports) {
!function(t,e){if("object"==typeof module&&module.exports)module.exports=e(require("./shape"));else{var h=t.Zdog;h.Rect=e(h.Shape)}}(this,function(t){var e=t.subclass({width:1,height:1});return e.prototype.setPath=function(){var t=this.width/2,e=this.height/2;this.path=[{x:-t,y:-e},{x:t,y:-e},{x:t,y:e},{x:-t,y:e}]},e});
},{"./shape":"3q8W"}],"Y+Gf":[function(require,module,exports) {
!function(t,e){if("object"==typeof module&&module.exports)module.exports=e(require("./shape"));else{var h=t.Zdog;h.RoundedRect=e(h.Shape)}}(this,function(t){var e=t.subclass({width:1,height:1,cornerRadius:.25,closed:!1});return e.prototype.setPath=function(){var t=this.width/2,e=this.height/2,h=Math.min(t,e),s=Math.min(this.cornerRadius,h),o=t-s,a=e-s,p=[{x:o,y:-e},{arc:[{x:t,y:-e},{x:t,y:-a}]}];a&&p.push({x:t,y:a}),p.push({arc:[{x:t,y:e},{x:o,y:e}]}),o&&p.push({x:-o,y:e}),p.push({arc:[{x:-t,y:e},{x:-t,y:a}]}),a&&p.push({x:-t,y:-a}),p.push({arc:[{x:-t,y:-e},{x:-o,y:-e}]}),o&&p.push({x:o,y:-e}),this.path=p},e.prototype.updateSortValue=function(){t.prototype.updateSortValue.apply(this,arguments);var e=this.pathCommands.length,h=this.pathCommands[e-1].endRenderPoint;this.sortValue-=h.z/e},e});
},{"./shape":"3q8W"}],"UlfE":[function(require,module,exports) {
!function(t,e){if("object"==typeof module&&module.exports)module.exports=e(require("./shape"));else{var h=t.Zdog;h.Ellipse=e(h.Shape)}}(this,function(t){var e=t.subclass({diameter:1,width:void 0,height:void 0,quarters:4,closed:!1});return e.prototype.setPath=function(){var t=(null!=this.width?this.width:this.diameter)/2,e=(null!=this.height?this.height:this.diameter)/2;this.path=[{x:0,y:-e},{arc:[{x:t,y:-e},{x:t,y:0}]}],this.quarters>1&&this.path.push({arc:[{x:t,y:e},{x:0,y:e}]}),this.quarters>2&&this.path.push({arc:[{x:-t,y:e},{x:-t,y:0}]}),this.quarters>3&&this.path.push({arc:[{x:-t,y:-e},{x:0,y:-e}]})},e.prototype.updateSortValue=function(){if(t.prototype.updateSortValue.apply(this,arguments),4==this.quarters){var e=this.pathCommands.length,h=this.pathCommands[e-1].endRenderPoint;this.sortValue-=h.z/e}},e});
},{"./shape":"3q8W"}],"91so":[function(require,module,exports) {
!function(s,t){if("object"==typeof module&&module.exports)module.exports=t(require("./boilerplate"),require("./shape"));else{var e=s.Zdog;e.Polygon=t(e,e.Shape)}}(this,function(s,t){var e=t.subclass({sides:3,radius:.5}),i=s.TAU;return e.prototype.setPath=function(){this.path=[];for(var s=0;s<this.sides;s++){var t=s/this.sides*i-i/4,e=Math.cos(t)*this.radius,o=Math.sin(t)*this.radius;this.path.push({x:e,y:o})}},e});
},{"./boilerplate":"o2ZU","./shape":"3q8W"}],"jWup":[function(require,module,exports) {
!function(e,t){if("object"==typeof module&&module.exports)module.exports=t(require("./boilerplate"),require("./ellipse"));else{var r=e.Zdog;r.Hemisphere=t(r,r.Ellipse)}}(this,function(e,t){var r=t.subclass({fill:!0}),i=e.TAU;r.prototype.render=function(e,r){this.renderDome(e,r),t.prototype.render.apply(this,arguments)},r.prototype.renderDome=function(e,t){if(this.visible){var r=this.getDomeRenderElement(e,t),o=Math.atan2(this.renderNormal.y,this.renderNormal.x),n=this.diameter/2*this.renderNormal.magnitude(),s=this.renderOrigin.x,l=this.renderOrigin.y;if(t.isCanvas){var m=o+i/4,d=o-i/4;e.beginPath(),e.arc(s,l,n,m,d)}else t.isSvg&&(o=(o-i/4)/i*360,this.domeSvgElement.setAttribute("d","M "+-n+",0 A "+n+","+n+" 0 0 1 "+n+",0"),this.domeSvgElement.setAttribute("transform","translate("+s+","+l+" ) rotate("+o+")"));t.stroke(e,r,this.stroke,this.color,this.getLineWidth()),t.fill(e,r,this.fill,this.color),t.end(e,r)}};return r.prototype.getDomeRenderElement=function(e,t){if(t.isSvg)return this.domeSvgElement||(this.domeSvgElement=document.createElementNS("http://www.w3.org/2000/svg","path"),this.domeSvgElement.setAttribute("stroke-linecap","round"),this.domeSvgElement.setAttribute("stroke-linejoin","round")),this.domeSvgElement},r});
},{"./boilerplate":"o2ZU","./ellipse":"UlfE"}],"B0NZ":[function(require,module,exports) {
!function(e,t){if("object"==typeof module&&module.exports)module.exports=t(require("./boilerplate"),require("./path-command"),require("./shape"),require("./group"),require("./ellipse"));else{var r=e.Zdog;r.Cylinder=t(r,r.PathCommand,r.Shape,r.Group,r.Ellipse)}}(this,function(e,t,r,i,o){function s(){}var n=i.subclass({color:"#333",updateSort:!0});n.prototype.create=function(){i.prototype.create.apply(this,arguments),this.pathCommands=[new t("move",[{}]),new t("line",[{}])]},n.prototype.render=function(e,t){this.renderCylinderSurface(e,t),i.prototype.render.apply(this,arguments)},n.prototype.renderCylinderSurface=function(e,t){if(this.visible){var r=this.getRenderElement(e,t),i=this.frontBase,o=this.rearBase,s=i.renderNormal.magnitude(),n=i.diameter*s+i.getLineWidth();this.pathCommands[0].renderPoints[0].set(i.renderOrigin),this.pathCommands[1].renderPoints[0].set(o.renderOrigin),t.isCanvas&&(e.lineCap="butt"),t.renderPath(e,r,this.pathCommands),t.stroke(e,r,!0,this.color,n),t.end(e,r),t.isCanvas&&(e.lineCap="round")}};n.prototype.getRenderElement=function(e,t){if(t.isSvg)return this.svgElement||(this.svgElement=document.createElementNS("http://www.w3.org/2000/svg","path")),this.svgElement},n.prototype.copyGraph=s,o.subclass().prototype.copyGraph=s;var a=r.subclass({diameter:1,length:1,frontFace:void 0,fill:!0}),p=e.TAU;a.prototype.create=function(){r.prototype.create.apply(this,arguments),this.group=new n({addTo:this,color:this.color,visible:this.visible});var e=this.length/2,t=this.backface||!0;this.frontBase=this.group.frontBase=new o({addTo:this.group,diameter:this.diameter,translate:{z:e},rotate:{y:p/2},color:this.color,stroke:this.stroke,fill:this.fill,backface:this.frontFace||t,visible:this.visible}),this.rearBase=this.group.rearBase=this.frontBase.copy({translate:{z:-e},rotate:{y:0},backface:t})},a.prototype.render=function(){};return["stroke","fill","color","visible"].forEach(function(e){var t="_"+e;Object.defineProperty(a.prototype,e,{get:function(){return this[t]},set:function(r){this[t]=r,this.frontBase&&(this.frontBase[e]=r,this.rearBase[e]=r,this.group[e]=r)}})}),a});
},{"./boilerplate":"o2ZU","./path-command":"4bOY","./shape":"3q8W","./group":"hw4v","./ellipse":"UlfE"}],"YaK8":[function(require,module,exports) {
!function(e,t){if("object"==typeof module&&module.exports)module.exports=t(require("./boilerplate"),require("./vector"),require("./path-command"),require("./anchor"),require("./ellipse"));else{var r=e.Zdog;r.Cone=t(r,r.Vector,r.PathCommand,r.Anchor,r.Ellipse)}}(this,function(e,t,r,n,i){var s=i.subclass({length:1,fill:!0}),a=e.TAU;s.prototype.create=function(){i.prototype.create.apply(this,arguments),this.apex=new n({addTo:this,translate:{z:this.length}}),this.renderApex=new t,this.tangentA=new t,this.tangentB=new t,this.surfacePathCommands=[new r("move",[{}]),new r("line",[{}]),new r("line",[{}])]},s.prototype.render=function(e,t){this.renderConeSurface(e,t),i.prototype.render.apply(this,arguments)},s.prototype.renderConeSurface=function(e,t){if(this.visible){this.renderApex.set(this.apex.renderOrigin).subtract(this.renderOrigin);var r=this.renderNormal.magnitude(),n=this.renderApex.magnitude2d(),i=this.renderNormal.magnitude2d(),s=Math.acos(i/r),o=Math.sin(s),h=this.diameter/2*r;if(h*o<n){var d=Math.atan2(this.renderNormal.y,this.renderNormal.x)+a/2,u=n/o,c=Math.acos(h/u),l=this.tangentA,p=this.tangentB;l.x=Math.cos(c)*h*o,l.y=Math.sin(c)*h,p.set(this.tangentA),p.y*=-1,l.rotateZ(d),p.rotateZ(d),l.add(this.renderOrigin),p.add(this.renderOrigin),this.setSurfaceRenderPoint(0,l),this.setSurfaceRenderPoint(1,this.apex.renderOrigin),this.setSurfaceRenderPoint(2,p);var f=this.getSurfaceRenderElement(e,t);t.renderPath(e,f,this.surfacePathCommands),t.stroke(e,f,this.stroke,this.color,this.getLineWidth()),t.fill(e,f,this.fill,this.color),t.end(e,f)}}};return s.prototype.getSurfaceRenderElement=function(e,t){if(t.isSvg)return this.surfaceSvgElement||(this.surfaceSvgElement=document.createElementNS("http://www.w3.org/2000/svg","path"),this.surfaceSvgElement.setAttribute("stroke-linecap","round"),this.surfaceSvgElement.setAttribute("stroke-linejoin","round")),this.surfaceSvgElement},s.prototype.setSurfaceRenderPoint=function(e,t){this.surfacePathCommands[e].renderPoints[0].set(t)},s});
},{"./boilerplate":"o2ZU","./vector":"oGeX","./path-command":"4bOY","./anchor":"jshy","./ellipse":"UlfE"}],"+/N8":[function(require,module,exports) {
!function(t,e){if("object"==typeof module&&module.exports)module.exports=e(require("./boilerplate"),require("./anchor"),require("./shape"),require("./rect"));else{var h=t.Zdog;h.Box=e(h,h.Anchor,h.Shape,h.Rect)}}(this,function(t,e,h,i){var s=i.subclass();s.prototype.copyGraph=function(){};var a=t.extend({width:1,height:1,depth:1,frontFace:!0,rearFace:!0,leftFace:!0,rightFace:!0,topFace:!0,bottomFace:!0},h.defaults);a.fill=!0,delete a.path;var r=e.subclass(a),o=t.TAU;return r.prototype.create=function(t){e.prototype.create.call(this,t),this.updatePath()},r.prototype.updatePath=function(){this.setFace("frontFace",{width:this.width,height:this.height,translate:{z:this.depth/2}}),this.setFace("rearFace",{width:this.width,height:this.height,translate:{z:-this.depth/2},rotate:{y:o/2}}),this.setFace("leftFace",{width:this.depth,height:this.height,translate:{x:-this.width/2},rotate:{y:-o/4}}),this.setFace("rightFace",{width:this.depth,height:this.height,translate:{x:this.width/2},rotate:{y:o/4}}),this.setFace("topFace",{width:this.width,height:this.depth,translate:{y:-this.height/2},rotate:{x:-o/4}}),this.setFace("bottomFace",{width:this.width,height:this.depth,translate:{y:this.height/2},rotate:{x:-o/4}})},r.prototype.setFace=function(e,h){var i=this[e],a=e+"Rect",r=this[a];i?(t.extend(h,{color:"string"==typeof i?i:this.color,stroke:this.stroke,fill:this.fill,backface:this.backface,front:this.front,visible:this.visible}),r?r.setOptions(h):r=this[a]=new s(h),r.updatePath(),this.addChild(r)):this.removeChild(r)},r});
},{"./boilerplate":"o2ZU","./anchor":"jshy","./shape":"3q8W","./rect":"4vOc"}],"XPX6":[function(require,module,exports) {
var define;
var e;!function(r,o){var i,u,n,t,a,d,q,l,c,p,s,g,h,m,v,y,R,f;"object"==typeof module&&module.exports?module.exports=(i=require("./boilerplate"),u=require("./canvas-renderer"),n=require("./svg-renderer"),t=require("./vector"),a=require("./anchor"),d=require("./dragger"),q=require("./illustration"),l=require("./path-command"),c=require("./shape"),p=require("./group"),s=require("./rect"),g=require("./rounded-rect"),h=require("./ellipse"),m=require("./polygon"),v=require("./hemisphere"),y=require("./cylinder"),R=require("./cone"),f=require("./box"),i.CanvasRenderer=u,i.SvgRenderer=n,i.Vector=t,i.Anchor=a,i.Dragger=d,i.Illustration=q,i.PathCommand=l,i.Shape=c,i.Group=p,i.Rect=s,i.RoundedRect=g,i.Ellipse=h,i.Polygon=m,i.Hemisphere=v,i.Cylinder=y,i.Cone=R,i.Box=f,i):"function"==typeof e&&e.amd&&e("zdog",[],r.Zdog)}(this);
},{"./boilerplate":"o2ZU","./canvas-renderer":"qrKX","./svg-renderer":"x/Ec","./vector":"oGeX","./anchor":"jshy","./dragger":"UR0X","./illustration":"SunY","./path-command":"4bOY","./shape":"3q8W","./group":"hw4v","./rect":"4vOc","./rounded-rect":"Y+Gf","./ellipse":"UlfE","./polygon":"91so","./hemisphere":"jWup","./cylinder":"B0NZ","./cone":"YaK8","./box":"+/N8"}],"mpVp":[function(require,module,exports) {
"use strict";var e=t(require("zdog"));function t(e){return e&&e.__esModule?e:{default:e}}var a=e.default.TAU,o="#fff",r="#111",d=new e.default.Illustration({element:".zdog-canvas",dragRotate:!0,zoom:2}),l=new e.default.Ellipse({addTo:d,width:120,height:120,stroke:6,color:"#000",quarters:1,fill:!1});l.copy({rotate:{z:a/2}}),l.copy({rotate:{z:a/4}}),l.copy({rotate:{z:-a/4}});var n=new e.default.Group({addTo:d,translate:{y:-18,x:-16,z:40},rotate:{x:-a/2.2}}),i=new e.default.Ellipse({addTo:n,width:8,height:26,stroke:5,color:"#000",fill:!0});n.copyGraph({translate:{y:-18,x:16,z:40}});var s=new e.default.Shape({addTo:d,path:[{x:-35,y:20},{bezier:[{x:-18,y:48},{x:18,y:48},{x:35,y:20}]}],closed:!1,stroke:7,color:"#000",translate:{y:-2,z:40}}),p=new e.default.Shape({addTo:s,path:[{x:0,y:0},{arc:[{x:6,y:-5},{x:12,y:0}]}],translate:{x:-40.5,y:23},rotate:{z:-a/13},stroke:6,closed:!1,color:"#000"}),c=new e.default.Shape({addTo:d,stroke:110,color:"#f8d946"});p.copyGraph({translate:{x:29,y:18},rotate:{z:e.default.TAU/12}});var u=document.getElementsByTagName("body")[0],h=document.documentElement,y=document.createElement("div");function f(e){var t=window.innerWidth||h.clientWidth||u.clientWidth,a=window.innerHeight||h.clientHeight||u.clientHeight,o=.3*Math.cos(Math.PI*e.pageY/a),r=.3*Math.cos(Math.PI*e.pageX/t);d.rotate.x=o,d.rotate.y=r,d.updateRenderGraph()}function x(e){y.style.top=e.pageY+"px",y.style.left=e.pageX+"px"}y.id="cursor",u.appendChild(y),y.style.top="-9999px",y.style.left="-9999px",addEventListener("mousemove",f,!1),addEventListener("mousemove",x,!1),d.updateRenderGraph();
},{"zdog":"XPX6"}]},{},["mpVp"], null)
//# sourceMappingURL=/script.4d7551a2.js.map