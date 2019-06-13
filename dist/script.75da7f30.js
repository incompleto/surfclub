// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/zdog/js/boilerplate.js":[function(require,module,exports) {
/*!
 * Zdog v1.0.2
 * Round, flat, designer-friendly pseudo-3D engine
 * Licensed MIT
 * https://zzz.dog
 * Copyright 2019 Metafizzy
 */

/**
 * Boilerplate & utils
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    root.Zdog = factory();
  }
}( this, function factory() {

var Zdog = {};

Zdog.TAU = Math.PI * 2;

Zdog.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

Zdog.lerp = function( a, b, alpha ) {
  return ( b - a ) * alpha + a;
};

Zdog.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

var powerMultipliers = {
  2: function( a ) {
    return a * a;
  },
  3: function( a ) {
    return a * a * a;
  },
  4: function( a ) {
    return a * a * a * a;
  },
  5: function( a ) {
    return a * a * a * a * a;
  },
};

Zdog.easeInOut = function( alpha, power ) {
  if ( power == 1 ) {
    return alpha;
  }
  alpha = Math.max( 0, Math.min( 1, alpha ) );
  var isFirstHalf = alpha < 0.5;
  var slope = isFirstHalf ? alpha : 1 - alpha;
  slope /= 0.5;
  // make easing steeper with more multiples
  var powerMultiplier = powerMultipliers[ power ] || powerMultipliers[2];
  var curve = powerMultiplier( slope );
  curve /= 2;
  return isFirstHalf ? curve : 1 - curve;
};

return Zdog;

}));

},{}],"../node_modules/zdog/js/canvas-renderer.js":[function(require,module,exports) {
/**
 * CanvasRenderer
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    root.Zdog.CanvasRenderer = factory();
  }
}( this, function factory() {

var CanvasRenderer = { isCanvas: true };

CanvasRenderer.begin = function( ctx ) {
  ctx.beginPath();
};

CanvasRenderer.move = function( ctx, elem, point ) {
  ctx.moveTo( point.x, point.y );
};

CanvasRenderer.line = function( ctx, elem, point ) {
  ctx.lineTo( point.x, point.y );
};

CanvasRenderer.bezier = function( ctx, elem, cp0, cp1, end ) {
  ctx.bezierCurveTo( cp0.x, cp0.y, cp1.x, cp1.y, end.x, end.y );
};

CanvasRenderer.closePath = function( ctx ) {
  ctx.closePath();
};

CanvasRenderer.setPath = function() {};

CanvasRenderer.renderPath = function( ctx, elem, pathCommands, isClosed ) {
  this.begin( ctx, elem );
  pathCommands.forEach( function( command ) {
    command.render( ctx, elem, CanvasRenderer );
  });
  if ( isClosed ) {
    this.closePath( ctx, elem );
  }
};

CanvasRenderer.stroke = function( ctx, elem, isStroke, color, lineWidth ) {
  if ( !isStroke ) {
    return;
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};

CanvasRenderer.fill = function( ctx, elem, isFill, color ) {
  if ( !isFill ) {
    return;
  }
  ctx.fillStyle = color;
  ctx.fill();
};

CanvasRenderer.end = function() {};

return CanvasRenderer;

}));

},{}],"../node_modules/zdog/js/svg-renderer.js":[function(require,module,exports) {
/**
 * SvgRenderer
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    root.Zdog.SvgRenderer = factory();
  }
}( this, function factory() {

var SvgRenderer = { isSvg: true };

// round path coordinates to 3 decimals
var round = SvgRenderer.round = function( num ) {
  return Math.round( num * 1000 ) / 1000;
};

function getPointString( point ) {
  return round( point.x ) + ',' + round( point.y ) + ' ';
}

SvgRenderer.begin = function() {};

SvgRenderer.move = function( svg, elem, point ) {
  return 'M' + getPointString( point );
};

SvgRenderer.line = function( svg, elem, point ) {
  return 'L' + getPointString( point );
};

SvgRenderer.bezier = function( svg, elem, cp0, cp1, end ) {
  return 'C' + getPointString( cp0 ) + getPointString( cp1 ) +
    getPointString( end );
};

SvgRenderer.closePath = function(/* elem */) {
  return 'Z';
};

SvgRenderer.setPath = function( svg, elem, pathValue ) {
  elem.setAttribute( 'd', pathValue );
};

SvgRenderer.renderPath = function( svg, elem, pathCommands, isClosed ) {
  var pathValue = '';
  pathCommands.forEach( function( command ) {
    pathValue += command.render( svg, elem, SvgRenderer );
  });
  if ( isClosed ) {
    pathValue += this.closePath( svg, elem );
  }
  this.setPath( svg, elem, pathValue );
};

SvgRenderer.stroke = function( svg, elem, isStroke, color, lineWidth ) {
  if ( !isStroke ) {
    return;
  }
  elem.setAttribute( 'stroke', color );
  elem.setAttribute( 'stroke-width', lineWidth );
};

SvgRenderer.fill = function( svg, elem, isFill, color ) {
  var fillColor = isFill ? color : 'none';
  elem.setAttribute( 'fill', fillColor );
};

SvgRenderer.end = function( svg, elem ) {
  svg.appendChild( elem );
};

return SvgRenderer;

}));

},{}],"../node_modules/zdog/js/vector.js":[function(require,module,exports) {
/**
 * Vector
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./boilerplate') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Vector = factory( Zdog );
  }

}( this, function factory( utils ) {

function Vector( position ) {
  this.set( position );
}

var TAU = utils.TAU;

// 'pos' = 'position'
Vector.prototype.set = function( pos ) {
  this.x = pos && pos.x || 0;
  this.y = pos && pos.y || 0;
  this.z = pos && pos.z || 0;
  return this;
};

// set coordinates without sanitizing
// vec.write({ y: 2 }) only sets y coord
Vector.prototype.write = function( pos ) {
  if ( !pos ) {
    return this;
  }
  this.x = pos.x != undefined ? pos.x : this.x;
  this.y = pos.y != undefined ? pos.y : this.y;
  this.z = pos.z != undefined ? pos.z : this.z;
  return this;
};

Vector.prototype.rotate = function( rotation ) {
  if ( !rotation ) {
    return;
  }
  this.rotateZ( rotation.z );
  this.rotateY( rotation.y );
  this.rotateX( rotation.x );
  return this;
};

Vector.prototype.rotateZ = function( angle ) {
  rotateProperty( this, angle, 'x', 'y' );
};

Vector.prototype.rotateX = function( angle ) {
  rotateProperty( this, angle, 'y', 'z' );
};

Vector.prototype.rotateY = function( angle ) {
  rotateProperty( this, angle, 'x', 'z' );
};

function rotateProperty( vec, angle, propA, propB ) {
  if ( !angle || angle % TAU === 0 ) {
    return;
  }
  var cos = Math.cos( angle );
  var sin = Math.sin( angle );
  var a = vec[ propA ];
  var b = vec[ propB ];
  vec[ propA ] = a*cos - b*sin;
  vec[ propB ] = b*cos + a*sin;
}

Vector.prototype.add = function( pos ) {
  if ( !pos ) {
    return this;
  }
  this.x += pos.x || 0;
  this.y += pos.y || 0;
  this.z += pos.z || 0;
  return this;
};

Vector.prototype.subtract = function( pos ) {
  if ( !pos ) {
    return this;
  }
  this.x -= pos.x || 0;
  this.y -= pos.y || 0;
  this.z -= pos.z || 0;
  return this;
};

Vector.prototype.multiply = function( pos ) {
  if ( pos == undefined ) {
    return this;
  }
  // multiple all values by same number
  if ( typeof pos == 'number' ) {
    this.x *= pos;
    this.y *= pos;
    this.z *= pos;
  } else {
    // multiply object
    this.x *= pos.x != undefined ? pos.x : 1;
    this.y *= pos.y != undefined ? pos.y : 1;
    this.z *= pos.z != undefined ? pos.z : 1;
  }
  return this;
};

Vector.prototype.transform = function( translation, rotation, scale ) {
  this.multiply( scale );
  this.rotate( rotation );
  this.add( translation );
  return this;
};

Vector.prototype.lerp = function( pos, alpha ) {
  this.x = utils.lerp( this.x, pos.x || 0, alpha );
  this.y = utils.lerp( this.y, pos.y || 0, alpha );
  this.z = utils.lerp( this.z, pos.z || 0, alpha );
  return this;
};

Vector.prototype.magnitude = function() {
  var sum = this.x*this.x + this.y*this.y + this.z*this.z;
  return getMagnitudeSqrt( sum );
};

function getMagnitudeSqrt( sum ) {
  // PERF: check if sum ~= 1 and skip sqrt
  if ( Math.abs( sum - 1 ) < 0.00000001 ) {
    return 1;
  }
  return Math.sqrt( sum );
}

Vector.prototype.magnitude2d = function() {
  var sum = this.x*this.x + this.y*this.y;
  return getMagnitudeSqrt( sum );
};

Vector.prototype.copy = function() {
  return new Vector( this );
};

return Vector;

}));

},{"./boilerplate":"../node_modules/zdog/js/boilerplate.js"}],"../node_modules/zdog/js/anchor.js":[function(require,module,exports) {
/**
 * Anchor
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./boilerplate'), require('./vector'),
        require('./canvas-renderer'), require('./svg-renderer') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Anchor = factory( Zdog, Zdog.Vector, Zdog.CanvasRenderer,
        Zdog.SvgRenderer );
  }
}( this, function factory( utils, Vector, CanvasRenderer, SvgRenderer ) {

var TAU = utils.TAU;
var onePoint = { x: 1, y: 1, z: 1 };

function Anchor( options ) {
  this.create( options || {} );
}

Anchor.prototype.create = function( options ) {
  // set defaults & options
  utils.extend( this, this.constructor.defaults );
  this.setOptions( options );

  // transform
  this.translate = new Vector( options.translate );
  this.rotate = new Vector( options.rotate );
  this.scale = new Vector( onePoint ).multiply( this.scale );
  // origin
  this.origin = new Vector();
  this.renderOrigin = new Vector();
  // children
  this.children = [];
  if ( this.addTo ) {
    this.addTo.addChild( this );
  }
};

Anchor.defaults = {};

Anchor.optionKeys = Object.keys( Anchor.defaults ).concat([
  'rotate',
  'translate',
  'scale',
  'addTo',
]);

Anchor.prototype.setOptions = function( options ) {
  var optionKeys = this.constructor.optionKeys;

  for ( var key in options ) {
    if ( optionKeys.includes( key ) ) {
      this[ key ] = options[ key ];
    }
  }
};

Anchor.prototype.addChild = function( shape ) {
  var index = this.children.indexOf( shape );
  if ( index != -1 ) {
    return;
  }
  shape.remove(); // remove previous parent
  shape.addTo = this; // keep parent reference
  this.children.push( shape );
};

Anchor.prototype.removeChild = function( shape ) {
  var index = this.children.indexOf( shape );
  if ( index != -1 ) {
    this.children.splice( index, 1 );
  }
};

Anchor.prototype.remove = function() {
  if ( this.addTo ) {
    this.addTo.removeChild( this );
  }
};

// ----- update ----- //

Anchor.prototype.update = function() {
  // update self
  this.reset();
  // update children
  this.children.forEach( function( child ) {
    child.update();
  });
  this.transform( this.translate, this.rotate, this.scale );
};

Anchor.prototype.reset = function() {
  this.renderOrigin.set( this.origin );
};

Anchor.prototype.transform = function( translation, rotation, scale ) {
  this.renderOrigin.transform( translation, rotation, scale );
  // transform children
  this.children.forEach( function( child ) {
    child.transform( translation, rotation, scale );
  });
};

Anchor.prototype.updateGraph = function() {
  this.update();
  this.updateFlatGraph();
  this.flatGraph.forEach( function( item ) {
    item.updateSortValue();
  });
  // z-sort
  this.flatGraph.sort( Anchor.shapeSorter );
};

Anchor.shapeSorter = function( a, b ) {
  return a.sortValue - b.sortValue;
};

// custom getter to check for flatGraph before using it
Object.defineProperty( Anchor.prototype, 'flatGraph', {
  get: function() {
    if ( !this._flatGraph ) {
      this.updateFlatGraph();
    }
    return this._flatGraph;
  },
  set: function( graph ) {
    this._flatGraph = graph;
  },
});

Anchor.prototype.updateFlatGraph = function() {
  this.flatGraph = this.getFlatGraph();
};

// return Array of self & all child graph items
Anchor.prototype.getFlatGraph = function() {
  var flatGraph = [ this ];
  return this.addChildFlatGraph( flatGraph );
};

Anchor.prototype.addChildFlatGraph = function( flatGraph ) {
  this.children.forEach( function( child ) {
    var childFlatGraph = child.getFlatGraph();
    Array.prototype.push.apply( flatGraph, childFlatGraph );
  });
  return flatGraph;
};

Anchor.prototype.updateSortValue = function() {
  this.sortValue = this.renderOrigin.z;
};

// ----- render ----- //

Anchor.prototype.render = function() {};

// TODO refactor out CanvasRenderer so its not a dependency within anchor.js
Anchor.prototype.renderGraphCanvas = function( ctx ) {
  if ( !ctx ) {
    throw new Error( 'ctx is ' + ctx + '. ' +
      'Canvas context required for render. Check .renderGraphCanvas( ctx ).' );
  }
  this.flatGraph.forEach( function( item ) {
    item.render( ctx, CanvasRenderer );
  });
};

Anchor.prototype.renderGraphSvg = function( svg ) {
  if ( !svg ) {
    throw new Error( 'svg is ' + svg + '. ' +
      'SVG required for render. Check .renderGraphSvg( svg ).' );
  }
  this.checkFlatGraph();
  this.flatGraph.forEach( function( item ) {
    item.render( svg, SvgRenderer );
  });
};

// ----- misc ----- //

Anchor.prototype.copy = function( options ) {
  // copy options
  var itemOptions = {};
  var optionKeys = this.constructor.optionKeys;
  optionKeys.forEach( function( key ) {
    itemOptions[ key ] = this[ key ];
  }, this );
  // add set options
  utils.extend( itemOptions, options );
  var ItemClass = this.constructor;
  return new ItemClass( itemOptions );
};

Anchor.prototype.copyGraph = function( options ) {
  var clone = this.copy( options );
  this.children.forEach( function( child ) {
    child.copyGraph({
      addTo: clone,
    });
  });
  return clone;
};

Anchor.prototype.normalizeRotate = function() {
  this.rotate.x = utils.modulo( this.rotate.x, TAU );
  this.rotate.y = utils.modulo( this.rotate.y, TAU );
  this.rotate.z = utils.modulo( this.rotate.z, TAU );
};

// ----- subclass ----- //

function getSubclass( Super ) {
  return function( defaults ) {
    // create constructor
    function Item( options ) {
      this.create( options || {} );
    }

    Item.prototype = Object.create( Super.prototype );
    Item.prototype.constructor = Item;

    Item.defaults = utils.extend( {}, Super.defaults );
    utils.extend( Item.defaults, defaults );
    // create optionKeys
    Item.optionKeys = Super.optionKeys.slice(0);
    // add defaults keys to optionKeys, dedupe
    Object.keys( Item.defaults ).forEach( function( key ) {
      if ( !Item.optionKeys.includes( key ) ) {
        Item.optionKeys.push( key );
      }
    });

    Item.subclass = getSubclass( Item );

    return Item;
  };
}

Anchor.subclass = getSubclass( Anchor );

return Anchor;

}));

},{"./boilerplate":"../node_modules/zdog/js/boilerplate.js","./vector":"../node_modules/zdog/js/vector.js","./canvas-renderer":"../node_modules/zdog/js/canvas-renderer.js","./svg-renderer":"../node_modules/zdog/js/svg-renderer.js"}],"../node_modules/zdog/js/dragger.js":[function(require,module,exports) {
/**
 * Dragger
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( root );
  } else {
    // browser global
    root.Zdog.Dragger = factory( root );
  }
}( this, function factory( window ) {

// quick & dirty drag event stuff
// messes up if multiple pointers/touches

// event support, default to mouse events
var downEvent = 'mousedown';
var moveEvent = 'mousemove';
var upEvent = 'mouseup';
if ( window.PointerEvent ) {
  // PointerEvent, Chrome
  downEvent = 'pointerdown';
  moveEvent = 'pointermove';
  upEvent = 'pointerup';
} else if ( 'ontouchstart' in window ) {
  // Touch Events, iOS Safari
  downEvent = 'touchstart';
  moveEvent = 'touchmove';
  upEvent = 'touchend';
}

function noop() {}

function Dragger( options ) {
  this.create( options || {} );
}

Dragger.prototype.create = function( options ) {
  this.onDragStart = options.onDragStart || noop;
  this.onDragMove = options.onDragMove || noop;
  this.onDragEnd = options.onDragEnd || noop;

  this.bindDrag( options.startElement );
};

Dragger.prototype.bindDrag = function( element ) {
  element = this.getQueryElement( element );
  if ( element ) {
    element.addEventListener( downEvent, this );
  }
};

Dragger.prototype.getQueryElement = function( element ) {
  if ( typeof element == 'string' ) {
    // with string, query selector
    element = document.querySelector( element );
  }
  return element;
};

Dragger.prototype.handleEvent = function( event ) {
  var method = this[ 'on' + event.type ];
  if ( method ) {
    method.call( this, event );
  }
};

Dragger.prototype.onmousedown =
Dragger.prototype.onpointerdown = function( event ) {
  this.dragStart( event, event );
};

Dragger.prototype.ontouchstart = function( event ) {
  this.dragStart( event, event.changedTouches[0] );
};

Dragger.prototype.dragStart = function( event, pointer ) {
  event.preventDefault();
  this.dragStartX = pointer.pageX;
  this.dragStartY = pointer.pageY;
  window.addEventListener( moveEvent, this );
  window.addEventListener( upEvent, this );
  this.onDragStart( pointer );
};

Dragger.prototype.ontouchmove = function( event ) {
  // HACK, moved touch may not be first
  this.dragMove( event, event.changedTouches[0] );
};

Dragger.prototype.onmousemove =
Dragger.prototype.onpointermove = function( event ) {
  this.dragMove( event, event );
};

Dragger.prototype.dragMove = function( event, pointer ) {
  event.preventDefault();
  var moveX = pointer.pageX - this.dragStartX;
  var moveY = pointer.pageY - this.dragStartY;
  this.onDragMove( pointer, moveX, moveY );
};

Dragger.prototype.onmouseup =
Dragger.prototype.onpointerup =
Dragger.prototype.ontouchend =
Dragger.prototype.dragEnd = function(/* event */) {
  window.removeEventListener( moveEvent, this );
  window.removeEventListener( upEvent, this );
  this.onDragEnd();
};

return Dragger;

}));

},{}],"../node_modules/zdog/js/illustration.js":[function(require,module,exports) {
/**
 * Illustration
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./boilerplate'), require('./anchor'),
        require('./dragger') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Illustration = factory( Zdog, Zdog.Anchor, Zdog.Dragger );
  }
}( this, function factory( utils, Anchor, Dragger ) {

function noop() {}
var TAU = utils.TAU;

var Illustration = Anchor.subclass({
  element: undefined,
  centered: true,
  zoom: 1,
  dragRotate: false,
  resize: false,
  onPrerender: noop,
  onDragStart: noop,
  onDragMove: noop,
  onDragEnd: noop,
  onResize: noop,
});

utils.extend( Illustration.prototype, Dragger.prototype );

Illustration.prototype.create = function( options ) {
  Anchor.prototype.create.call( this, options );
  Dragger.prototype.create.call( this, options );
  this.setElement( this.element );
  this.setDragRotate( this.dragRotate );
  this.setResize( this.resize );
};

Illustration.prototype.setElement = function( element ) {
  element = this.getQueryElement( element );
  if ( !element ) {
    throw new Error( 'Zdog.Illustration element required. Set to ' + element );
  }

  var nodeName = element.nodeName.toLowerCase();
  if ( nodeName == 'canvas' ) {
    this.setCanvas( element );
  } else if ( nodeName == 'svg' ) {
    this.setSvg( element );
  }
};

Illustration.prototype.setSize = function( width, height ) {
  width = Math.round( width );
  height = Math.round( height );
  if ( this.isCanvas ) {
    this.setSizeCanvas( width, height );
  } else if ( this.isSvg ) {
    this.setSizeSvg( width, height );
  }
};

Illustration.prototype.setResize = function( resize ) {
  this.resize = resize;
  // create resize event listener
  if ( !this.resizeListener ) {
    this.resizeListener = this.onWindowResize.bind( this );
  }
  // add/remove event listener
  if ( resize ) {
    window.addEventListener( 'resize', this.resizeListener );
    this.onWindowResize();
  } else {
    window.removeEventListener( 'resize', this.resizeListener );
  }
};

// TODO debounce this?
Illustration.prototype.onWindowResize = function() {
  this.setMeasuredSize();
  this.onResize( this.width, this.height );
};

Illustration.prototype.setMeasuredSize = function() {
  var width, height;
  var isFullscreen = this.resize == 'fullscreen';
  if ( isFullscreen ) {
    width = window.innerWidth;
    height = window.innerHeight;
  } else {
    var rect = this.element.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
  }
  this.setSize( width, height );
};

// ----- render ----- //

Illustration.prototype.renderGraph = function( item ) {
  if ( this.isCanvas ) {
    this.renderGraphCanvas( item );
  } else if ( this.isSvg ) {
    this.renderGraphSvg( item );
  }
};

// combo method
Illustration.prototype.updateRenderGraph = function( item ) {
  this.updateGraph();
  this.renderGraph( item );
};

// ----- canvas ----- //

Illustration.prototype.setCanvas = function( element ) {
  this.element = element;
  this.isCanvas = true;
  // update related properties
  this.ctx = this.element.getContext('2d');
  // set initial size
  this.setSizeCanvas( element.width, element.height );
};

Illustration.prototype.setSizeCanvas = function( width, height ) {
  this.width = width;
  this.height = height;
  // up-rez for hi-DPI devices
  var pixelRatio = this.pixelRatio = window.devicePixelRatio || 1;
  this.element.width = this.canvasWidth = width * pixelRatio;
  this.element.height = this.canvasHeight = height * pixelRatio;
  var needsHighPixelRatioSizing = pixelRatio > 1 && !this.resize;
  if ( needsHighPixelRatioSizing ) {
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
  }
};

Illustration.prototype.renderGraphCanvas = function( item ) {
  item = item || this;
  this.prerenderCanvas();
  Anchor.prototype.renderGraphCanvas.call( item, this.ctx );
  this.postrenderCanvas();
};

Illustration.prototype.prerenderCanvas = function() {
  var ctx = this.ctx;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight );
  ctx.save();
  if ( this.centered ) {
    var centerX = this.width/2 * this.pixelRatio;
    var centerY = this.height/2 * this.pixelRatio;
    ctx.translate( centerX, centerY );
  }
  var scale = this.pixelRatio * this.zoom;
  ctx.scale( scale, scale );
  this.onPrerender( ctx );
};

Illustration.prototype.postrenderCanvas = function() {
  this.ctx.restore();
};

// ----- svg ----- //

Illustration.prototype.setSvg = function( element ) {
  this.element = element;
  this.isSvg = true;
  this.pixelRatio = 1;
  // set initial size from width & height attributes
  var width = element.getAttribute('width');
  var height = element.getAttribute('height');
  this.setSizeSvg( width, height );
};

Illustration.prototype.setSizeSvg = function( width, height ) {
  this.width = width;
  this.height = height;
  var viewWidth = width / this.zoom;
  var viewHeight = height / this.zoom;
  var viewX = this.centered ? -viewWidth/2 : 0;
  var viewY = this.centered ? -viewHeight/2 : 0;
  this.element.setAttribute( 'viewBox', viewX + ' ' + viewY + ' ' +
    viewWidth + ' ' + viewHeight );
  if ( this.resize ) {
    // remove size attributes, let size be determined by viewbox
    this.element.removeAttribute('width');
    this.element.removeAttribute('height');
  } else {
    this.element.setAttribute( 'width', width );
    this.element.setAttribute( 'height', height );
  }
};

Illustration.prototype.renderGraphSvg = function( item ) {
  item = item || this;
  empty( this.element );
  this.onPrerender( this.element );
  Anchor.prototype.renderGraphSvg.call( item, this.element );
};

function empty( element ) {
  while ( element.firstChild ) {
    element.removeChild( element.firstChild );
  }
}

// ----- drag ----- //

Illustration.prototype.setDragRotate = function( item ) {
  if ( !item ) {
    return;
  } else if ( item === true ) {
    /* eslint consistent-this: "off" */
    item = this;
  }
  this.dragRotate = item;

  this.bindDrag( this.element );
};

Illustration.prototype.dragStart = function(/* event, pointer */) {
  this.dragStartRX = this.dragRotate.rotate.x;
  this.dragStartRY = this.dragRotate.rotate.y;
  Dragger.prototype.dragStart.apply( this, arguments );
};

Illustration.prototype.dragMove = function( event, pointer ) {
  var moveX = pointer.pageX - this.dragStartX;
  var moveY = pointer.pageY - this.dragStartY;
  var displaySize = Math.min( this.width, this.height );
  var moveRY = moveX / displaySize * TAU;
  var moveRX = moveY / displaySize * TAU;
  this.dragRotate.rotate.x = this.dragStartRX - moveRX;
  this.dragRotate.rotate.y = this.dragStartRY - moveRY;
  Dragger.prototype.dragMove.apply( this, arguments );
};

return Illustration;

}));

},{"./boilerplate":"../node_modules/zdog/js/boilerplate.js","./anchor":"../node_modules/zdog/js/anchor.js","./dragger":"../node_modules/zdog/js/dragger.js"}],"../node_modules/zdog/js/path-command.js":[function(require,module,exports) {
/**
 * PathCommand
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./vector') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.PathCommand = factory( Zdog.Vector );
  }
}( this, function factory( Vector ) {

function PathCommand( method, points, previousPoint ) {
  this.method = method;
  this.points = points.map( mapVectorPoint );
  this.renderPoints = points.map( mapNewVector );
  this.previousPoint = previousPoint;
  this.endRenderPoint = this.renderPoints[ this.renderPoints.length - 1 ];
  // arc actions come with previous point & corner point
  // but require bezier control points
  if ( method == 'arc' ) {
    this.controlPoints = [ new Vector(), new Vector() ];
  }
}

function mapVectorPoint( point ) {
  if ( point instanceof Vector ) {
    return point;
  } else {
    return new Vector( point );
  }
}

function mapNewVector( point ) {
  return new Vector( point );
}

PathCommand.prototype.reset = function() {
  // reset renderPoints back to orignal points position
  var points = this.points;
  this.renderPoints.forEach( function( renderPoint, i ) {
    var point = points[i];
    renderPoint.set( point );
  });
};

PathCommand.prototype.transform = function( translation, rotation, scale ) {
  this.renderPoints.forEach( function( renderPoint ) {
    renderPoint.transform( translation, rotation, scale );
  });
};

PathCommand.prototype.render = function( ctx, elem, renderer ) {
  return this[ this.method ]( ctx, elem, renderer );
};

PathCommand.prototype.move = function( ctx, elem, renderer ) {
  return renderer.move( ctx, elem, this.renderPoints[0] );
};

PathCommand.prototype.line = function( ctx, elem, renderer ) {
  return renderer.line( ctx, elem, this.renderPoints[0] );
};

PathCommand.prototype.bezier = function( ctx, elem, renderer ) {
  var cp0 = this.renderPoints[0];
  var cp1 = this.renderPoints[1];
  var end = this.renderPoints[2];
  return renderer.bezier( ctx, elem, cp0, cp1, end );
};

var arcHandleLength = 9/16;

PathCommand.prototype.arc = function( ctx, elem, renderer ) {
  var prev = this.previousPoint;
  var corner = this.renderPoints[0];
  var end = this.renderPoints[1];
  var cp0 = this.controlPoints[0];
  var cp1 = this.controlPoints[1];
  cp0.set( prev ).lerp( corner, arcHandleLength );
  cp1.set( end ).lerp( corner, arcHandleLength );
  return renderer.bezier( ctx, elem, cp0, cp1, end );
};

return PathCommand;

}));

},{"./vector":"../node_modules/zdog/js/vector.js"}],"../node_modules/zdog/js/shape.js":[function(require,module,exports) {
/**
 * Shape
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./boilerplate'), require('./vector'),
        require('./path-command'), require('./anchor') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Shape = factory( Zdog, Zdog.Vector, Zdog.PathCommand, Zdog.Anchor );
  }
}( this, function factory( utils, Vector, PathCommand, Anchor ) {

var Shape = Anchor.subclass({
  stroke: 1,
  fill: false,
  color: '#333',
  closed: true,
  visible: true,
  path: [ {} ],
  front: { z: 1 },
  backface: true,
});

Shape.prototype.create = function( options ) {
  Anchor.prototype.create.call( this, options );
  this.updatePath();
  // front
  this.front = new Vector( options.front || this.front );
  this.renderFront = new Vector( this.front );
  this.renderNormal = new Vector();
};

var actionNames = [
  'move',
  'line',
  'bezier',
  'arc',
];

Shape.prototype.updatePath = function() {
  this.setPath();
  this.updatePathCommands();
};

// place holder for Ellipse, Rect, etc.
Shape.prototype.setPath = function() {};

// parse path into PathCommands
Shape.prototype.updatePathCommands = function() {
  var previousPoint;
  this.pathCommands = this.path.map( function( pathPart, i ) {
    // pathPart can be just vector coordinates -> { x, y, z }
    // or path instruction -> { arc: [ {x0,y0,z0}, {x1,y1,z1} ] }
    var keys = Object.keys( pathPart );
    var method = keys[0];
    var points = pathPart[ method ];
    // default to line if no instruction
    var isInstruction = keys.length == 1 && actionNames.includes( method );
    if ( !isInstruction ) {
      method = 'line';
      points = pathPart;
    }
    // munge single-point methods like line & move without arrays
    var isLineOrMove = method == 'line' || method == 'move';
    var isPointsArray = Array.isArray( points );
    if ( isLineOrMove && !isPointsArray ) {
      points = [ points ];
    }

    // first action is always move
    method = i === 0 ? 'move' : method;
    // arcs require previous last point
    var command = new PathCommand( method, points, previousPoint );
    // update previousLastPoint
    previousPoint = command.endRenderPoint;
    return command;
  });
};

// ----- update ----- //

Shape.prototype.reset = function() {
  this.renderOrigin.set( this.origin );
  this.renderFront.set( this.front );
  // reset command render points
  this.pathCommands.forEach( function( command ) {
    command.reset();
  });
};

Shape.prototype.transform = function( translation, rotation, scale ) {
  // calculate render points backface visibility & cone/hemisphere shapes
  this.renderOrigin.transform( translation, rotation, scale );
  this.renderFront.transform( translation, rotation, scale );
  this.renderNormal.set( this.renderOrigin ).subtract( this.renderFront );
  // transform points
  this.pathCommands.forEach( function( command ) {
    command.transform( translation, rotation, scale );
  });
  // transform children
  this.children.forEach( function( child ) {
    child.transform( translation, rotation, scale );
  });
};


Shape.prototype.updateSortValue = function() {
  var sortValueTotal = 0;
  this.pathCommands.forEach( function( command ) {
    sortValueTotal += command.endRenderPoint.z;
  });
  // average sort value of all points
  // def not geometrically correct, but works for me
  this.sortValue = sortValueTotal / this.pathCommands.length;
};

// ----- render ----- //

Shape.prototype.render = function( ctx, renderer ) {
  var length = this.pathCommands.length;
  if ( !this.visible || !length ) {
    return;
  }
  // do not render if hiding backface
  this.isFacingBack = this.renderNormal.z > 0;
  if ( !this.backface && this.isFacingBack ) {
    return;
  }
  if ( !renderer ) {
    throw new Error( 'Zdog renderer required. Set to ' + renderer );
  }
  // render dot or path
  var isDot = length == 1;
  if ( renderer.isCanvas && isDot ) {
    this.renderCanvasDot( ctx, renderer );
  } else {
    this.renderPath( ctx, renderer );
  }
};

var TAU = utils.TAU;
// Safari does not render lines with no size, have to render circle instead
Shape.prototype.renderCanvasDot = function( ctx ) {
  var lineWidth = this.getLineWidth();
  if ( !lineWidth ) {
    return;
  }
  ctx.fillStyle = this.getRenderColor();
  var point = this.pathCommands[0].endRenderPoint;
  ctx.beginPath();
  var radius = lineWidth/2;
  ctx.arc( point.x, point.y, radius, 0, TAU );
  ctx.fill();
};

Shape.prototype.getLineWidth = function() {
  if ( !this.stroke ) {
    return 0;
  }
  if ( this.stroke == true ) {
    return 1;
  }
  return this.stroke;
};

Shape.prototype.getRenderColor = function() {
  // use backface color if applicable
  var isBackfaceColor = typeof this.backface == 'string' && this.isFacingBack;
  var color = isBackfaceColor ? this.backface : this.color;
  return color;
};

Shape.prototype.renderPath = function( ctx, renderer ) {
  var elem = this.getRenderElement( ctx, renderer );
  var isTwoPoints = this.pathCommands.length == 2 &&
    this.pathCommands[1].method == 'line';
  var isClosed = !isTwoPoints && this.closed;
  var color = this.getRenderColor();

  renderer.renderPath( ctx, elem, this.pathCommands, isClosed );
  renderer.stroke( ctx, elem, this.stroke, color, this.getLineWidth() );
  renderer.fill( ctx, elem, this.fill, color );
  renderer.end( ctx, elem );
};

var svgURI = 'http://www.w3.org/2000/svg';

Shape.prototype.getRenderElement = function( ctx, renderer ) {
  if ( !renderer.isSvg ) {
    return;
  }
  if ( !this.svgElement ) {
    // create svgElement
    this.svgElement = document.createElementNS( svgURI, 'path');
    this.svgElement.setAttribute( 'stroke-linecap', 'round' );
    this.svgElement.setAttribute( 'stroke-linejoin', 'round' );
  }
  return this.svgElement;
};

return Shape;

}));

},{"./boilerplate":"../node_modules/zdog/js/boilerplate.js","./vector":"../node_modules/zdog/js/vector.js","./path-command":"../node_modules/zdog/js/path-command.js","./anchor":"../node_modules/zdog/js/anchor.js"}],"../node_modules/zdog/js/group.js":[function(require,module,exports) {
/**
 * Group
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./anchor') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Group = factory( Zdog.Anchor );
  }
}( this, function factory( Anchor ) {

var Group = Anchor.subclass({
  updateSort: false,
  visible: true,
});

// ----- update ----- //

Group.prototype.updateSortValue = function() {
  var sortValueTotal = 0;
  this.flatGraph.forEach( function( item ) {
    item.updateSortValue();
    sortValueTotal += item.sortValue;
  });
  // average sort value of all points
  // def not geometrically correct, but works for me
  this.sortValue = sortValueTotal / this.flatGraph.length;

  if ( this.updateSort ) {
    this.flatGraph.sort( Anchor.shapeSorter );
  }
};

// ----- render ----- //

Group.prototype.render = function( ctx, renderer ) {
  if ( !this.visible ) {
    return;
  }

  this.flatGraph.forEach( function( item ) {
    item.render( ctx, renderer );
  });
};

// actual group flatGraph only used inside group
Group.prototype.updateFlatGraph = function() {
  // do not include self
  var flatGraph = [];
  this.flatGraph = this.addChildFlatGraph( flatGraph );
};

// do not include children, group handles rendering & sorting internally
Group.prototype.getFlatGraph = function() {
  return [ this ];
};

return Group;

}));

},{"./anchor":"../node_modules/zdog/js/anchor.js"}],"../node_modules/zdog/js/rect.js":[function(require,module,exports) {
/**
 * Rect
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./shape') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Rect = factory( Zdog.Shape );
  }
}( this, function factory( Shape ) {

var Rect = Shape.subclass({
  width: 1,
  height: 1,
});

Rect.prototype.setPath = function() {
  var x = this.width / 2;
  var y = this.height / 2;
  /* eslint key-spacing: "off" */
  this.path = [
    { x: -x, y: -y },
    { x:  x, y: -y },
    { x:  x, y:  y },
    { x: -x, y:  y },
  ];
};

return Rect;

}));

},{"./shape":"../node_modules/zdog/js/shape.js"}],"../node_modules/zdog/js/rounded-rect.js":[function(require,module,exports) {
/**
 * RoundedRect
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./shape') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.RoundedRect = factory( Zdog.Shape );
  }
}( this, function factory( Shape ) {

var RoundedRect = Shape.subclass({
  width: 1,
  height: 1,
  cornerRadius: 0.25,
  closed: false,
});

RoundedRect.prototype.setPath = function() {
  /* eslint
     id-length: [ "error", { "min": 2, "exceptions": [ "x", "y" ] }],
     key-spacing: "off" */
  var xA = this.width / 2;
  var yA = this.height / 2;
  var shortSide = Math.min( xA, yA );
  var cornerRadius = Math.min( this.cornerRadius, shortSide );
  var xB = xA - cornerRadius;
  var yB = yA - cornerRadius;
  var path = [
    // top right corner
    { x: xB, y: -yA },
    { arc: [
      { x: xA, y: -yA },
      { x: xA, y: -yB },
    ]},
  ];
  // bottom right corner
  if ( yB ) {
    path.push({ x: xA, y: yB });
  }
  path.push({ arc: [
    { x: xA, y:  yA },
    { x: xB, y:  yA },
  ]});
  // bottom left corner
  if ( xB ) {
    path.push({ x: -xB, y: yA });
  }
  path.push({ arc: [
    { x: -xA, y:  yA },
    { x: -xA, y:  yB },
  ]});
  // top left corner
  if ( yB ) {
    path.push({ x: -xA, y: -yB });
  }
  path.push({ arc: [
    { x: -xA, y: -yA },
    { x: -xB, y: -yA },
  ]});

  // back to top right corner
  if ( xB ) {
    path.push({ x: xB, y: -yA });
  }

  this.path = path;
};

RoundedRect.prototype.updateSortValue = function() {
  Shape.prototype.updateSortValue.apply( this, arguments );
  // ellipse is self closing, do not count last point twice
  var length = this.pathCommands.length;
  var lastPoint = this.pathCommands[ length - 1 ].endRenderPoint;
  this.sortValue -= lastPoint.z / length;
};

return RoundedRect;

}));

},{"./shape":"../node_modules/zdog/js/shape.js"}],"../node_modules/zdog/js/ellipse.js":[function(require,module,exports) {
/**
 * Ellipse
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./shape') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Ellipse = factory( Zdog.Shape );
  }

}( this, function factory( Shape ) {

var Ellipse = Shape.subclass({
  diameter: 1,
  width: undefined,
  height: undefined,
  quarters: 4,
  closed: false,
});

Ellipse.prototype.setPath = function() {
  var width = this.width != undefined ? this.width : this.diameter;
  var height = this.height != undefined ? this.height : this.diameter;
  var x = width / 2;
  var y = height / 2;
  this.path = [
    { x: 0, y: -y },
    { arc: [ // top right
      { x: x, y: -y },
      { x: x, y: 0 },
    ]},
  ];
  // bottom right
  if ( this.quarters > 1 ) {
    this.path.push({ arc: [
      { x: x, y: y },
      { x: 0, y: y },
    ]});
  }
  // bottom left
  if ( this.quarters > 2 ) {
    this.path.push({ arc: [
      { x: -x, y: y },
      { x: -x, y: 0 },
    ]});
  }
  // top left
  if ( this.quarters > 3 ) {
    this.path.push({ arc: [
      { x: -x, y: -y },
      { x: 0, y: -y },
    ]});
  }
};

Ellipse.prototype.updateSortValue = function() {
  Shape.prototype.updateSortValue.apply( this, arguments );
  if ( this.quarters != 4 ) {
    return;
  }
  // ellipse is self closing, do not count last point twice
  var length = this.pathCommands.length;
  var lastPoint = this.pathCommands[ length - 1 ].endRenderPoint;
  this.sortValue -= lastPoint.z / length;
};

return Ellipse;

}));

},{"./shape":"../node_modules/zdog/js/shape.js"}],"../node_modules/zdog/js/polygon.js":[function(require,module,exports) {
/**
 * Shape
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./boilerplate'), require('./shape') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Polygon = factory( Zdog, Zdog.Shape );
  }
}( this, function factory( utils, Shape ) {

var Polygon = Shape.subclass({
  sides: 3,
  radius: 0.5,
});

var TAU = utils.TAU;

Polygon.prototype.setPath = function() {
  this.path = [];
  for ( var i=0; i < this.sides; i++ ) {
    var theta = i/this.sides * TAU - TAU/4;
    var x = Math.cos( theta ) * this.radius;
    var y = Math.sin( theta ) * this.radius;
    this.path.push({ x: x, y: y });
  }
};

return Polygon;

}));

},{"./boilerplate":"../node_modules/zdog/js/boilerplate.js","./shape":"../node_modules/zdog/js/shape.js"}],"../node_modules/zdog/js/hemisphere.js":[function(require,module,exports) {
/**
 * Hemisphere composite shape
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./boilerplate'), require('./ellipse') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Hemisphere = factory( Zdog, Zdog.Ellipse );
  }
}( this, function factory( utils, Ellipse ) {

var Hemisphere = Ellipse.subclass({
  fill: true,
});

var TAU = utils.TAU;

Hemisphere.prototype.render = function( ctx, renderer ) {
  this.renderDome( ctx, renderer );
  // call super
  Ellipse.prototype.render.apply( this, arguments );
};

Hemisphere.prototype.renderDome = function( ctx, renderer ) {
  if ( !this.visible ) {
    return;
  }
  var elem = this.getDomeRenderElement( ctx, renderer );
  var contourAngle = Math.atan2( this.renderNormal.y, this.renderNormal.x );
  var domeRadius = this.diameter/2 * this.renderNormal.magnitude();
  var x = this.renderOrigin.x;
  var y = this.renderOrigin.y;

  if ( renderer.isCanvas ) {
    // canvas
    var startAngle = contourAngle + TAU/4;
    var endAngle = contourAngle - TAU/4;
    ctx.beginPath();
    ctx.arc( x, y, domeRadius, startAngle, endAngle );
  } else if ( renderer.isSvg ) {
    // svg
    contourAngle = (contourAngle - TAU/4) / TAU * 360;
    this.domeSvgElement.setAttribute( 'd', 'M ' + -domeRadius + ',0 A ' +
        domeRadius + ',' + domeRadius + ' 0 0 1 ' + domeRadius + ',0' );
    this.domeSvgElement.setAttribute( 'transform',
        'translate(' + x + ',' + y + ' ) rotate(' + contourAngle + ')' );
  }

  renderer.stroke( ctx, elem, this.stroke, this.color, this.getLineWidth() );
  renderer.fill( ctx, elem, this.fill, this.color );
  renderer.end( ctx, elem );
};

var svgURI = 'http://www.w3.org/2000/svg';

Hemisphere.prototype.getDomeRenderElement = function( ctx, renderer ) {
  if ( !renderer.isSvg ) {
    return;
  }
  if ( !this.domeSvgElement ) {
    // create svgElement
    this.domeSvgElement = document.createElementNS( svgURI, 'path');
    this.domeSvgElement.setAttribute( 'stroke-linecap', 'round' );
    this.domeSvgElement.setAttribute( 'stroke-linejoin', 'round' );
  }
  return this.domeSvgElement;
};

return Hemisphere;

}));

},{"./boilerplate":"../node_modules/zdog/js/boilerplate.js","./ellipse":"../node_modules/zdog/js/ellipse.js"}],"../node_modules/zdog/js/cylinder.js":[function(require,module,exports) {
/**
 * Cylinder composite shape
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./boilerplate'),
        require('./path-command'), require('./shape'), require('./group'),
        require('./ellipse') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Cylinder = factory( Zdog, Zdog.PathCommand, Zdog.Shape,
        Zdog.Group, Zdog.Ellipse );
  }
}( this, function factory( utils, PathCommand, Shape, Group, Ellipse ) {

function noop() {}

// ----- CylinderGroup ----- //

var CylinderGroup = Group.subclass({
  color: '#333',
  updateSort: true,
});

CylinderGroup.prototype.create = function() {
  Group.prototype.create.apply( this, arguments );
  this.pathCommands = [
    new PathCommand( 'move', [ {} ] ),
    new PathCommand( 'line', [ {} ] ),
  ];
};

CylinderGroup.prototype.render = function( ctx, renderer ) {
  this.renderCylinderSurface( ctx, renderer );
  Group.prototype.render.apply( this, arguments );
};

CylinderGroup.prototype.renderCylinderSurface = function( ctx, renderer ) {
  if ( !this.visible ) {
    return;
  }
  // render cylinder surface
  var elem = this.getRenderElement( ctx, renderer );
  var frontBase = this.frontBase;
  var rearBase = this.rearBase;
  var scale = frontBase.renderNormal.magnitude();
  var strokeWidth = frontBase.diameter * scale + frontBase.getLineWidth();
  // set path command render points
  this.pathCommands[0].renderPoints[0].set( frontBase.renderOrigin );
  this.pathCommands[1].renderPoints[0].set( rearBase.renderOrigin );

  if ( renderer.isCanvas ) {
    ctx.lineCap = 'butt'; // nice
  }
  renderer.renderPath( ctx, elem, this.pathCommands );
  renderer.stroke( ctx, elem, true, this.color, strokeWidth );
  renderer.end( ctx, elem );

  if ( renderer.isCanvas ) {
    ctx.lineCap = 'round'; // reset
  }
};

var svgURI = 'http://www.w3.org/2000/svg';

CylinderGroup.prototype.getRenderElement = function( ctx, renderer ) {
  if ( !renderer.isSvg ) {
    return;
  }
  if ( !this.svgElement ) {
    // create svgElement
    this.svgElement = document.createElementNS( svgURI, 'path');
  }
  return this.svgElement;
};

// prevent double-creation in parent.copyGraph()
// only create in Cylinder.create()
CylinderGroup.prototype.copyGraph = noop;

// ----- CylinderEllipse ----- //

var CylinderEllipse = Ellipse.subclass();

CylinderEllipse.prototype.copyGraph = noop;

// ----- Cylinder ----- //

var Cylinder = Shape.subclass({
  diameter: 1,
  length: 1,
  frontFace: undefined,
  fill: true,
});

var TAU = utils.TAU;

Cylinder.prototype.create = function(/* options */) {
  // call super
  Shape.prototype.create.apply( this, arguments );
  // composite shape, create child shapes
  // CylinderGroup to render cylinder surface then bases
  this.group = new CylinderGroup({
    addTo: this,
    color: this.color,
    visible: this.visible,
  });
  var baseZ = this.length/2;
  var baseColor = this.backface || true;
  // front outside base
  this.frontBase = this.group.frontBase = new Ellipse({
    addTo: this.group,
    diameter: this.diameter,
    translate: { z: baseZ },
    rotate: { y: TAU/2 },
    color: this.color,
    stroke: this.stroke,
    fill: this.fill,
    backface: this.frontFace || baseColor,
    visible: this.visible,
  });
  // back outside base
  this.rearBase = this.group.rearBase = this.frontBase.copy({
    translate: { z: -baseZ },
    rotate: { y: 0 },
    backface: baseColor,
  });
};

// Cylinder shape does not render anything
Cylinder.prototype.render = function() {};

// ----- set child properties ----- //

var childProperties = [ 'stroke', 'fill', 'color', 'visible' ];
childProperties.forEach( function( property ) {
  // use proxy property for custom getter & setter
  var _prop = '_' + property;
  Object.defineProperty( Cylinder.prototype, property, {
    get: function() {
      return this[ _prop ];
    },
    set: function( value ) {
      this[ _prop ] = value;
      // set property on children
      if ( this.frontBase ) {
        this.frontBase[ property ] = value;
        this.rearBase[ property ] = value;
        this.group[ property ] = value;
      }
    },
  });
});

// TODO child property setter for backface, frontBaseColor, & rearBaseColor

return Cylinder;

}));

},{"./boilerplate":"../node_modules/zdog/js/boilerplate.js","./path-command":"../node_modules/zdog/js/path-command.js","./shape":"../node_modules/zdog/js/shape.js","./group":"../node_modules/zdog/js/group.js","./ellipse":"../node_modules/zdog/js/ellipse.js"}],"../node_modules/zdog/js/cone.js":[function(require,module,exports) {
/**
 * Cone composite shape
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./boilerplate'), require('./vector'),
        require('./path-command'), require('./anchor'), require('./ellipse') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Cone = factory( Zdog, Zdog.Vector, Zdog.PathCommand,
        Zdog.Anchor, Zdog.Ellipse );
  }
}( this, function factory( utils, Vector, PathCommand, Anchor, Ellipse ) {

var Cone = Ellipse.subclass({
  length: 1,
  fill: true,
});

var TAU = utils.TAU;

Cone.prototype.create = function(/* options */) {
  // call super
  Ellipse.prototype.create.apply( this, arguments );
  // composite shape, create child shapes
  this.apex = new Anchor({
    addTo: this,
    translate: { z: this.length },
  });

  // vectors used for calculation
  this.renderApex = new Vector();
  this.tangentA = new Vector();
  this.tangentB = new Vector();

  this.surfacePathCommands = [
    new PathCommand( 'move', [ {} ] ), // points set in renderConeSurface
    new PathCommand( 'line', [ {} ] ),
    new PathCommand( 'line', [ {} ] ),
  ];
};

Cone.prototype.render = function( ctx, renderer ) {
  this.renderConeSurface( ctx, renderer );
  Ellipse.prototype.render.apply( this, arguments );
};

Cone.prototype.renderConeSurface = function( ctx, renderer ) {
  if ( !this.visible ) {
    return;
  }
  this.renderApex.set( this.apex.renderOrigin )
    .subtract( this.renderOrigin );

  var scale = this.renderNormal.magnitude();
  var apexDistance = this.renderApex.magnitude2d();
  var normalDistance = this.renderNormal.magnitude2d();
  // eccentricity
  var eccenAngle = Math.acos( normalDistance / scale );
  var eccen = Math.sin( eccenAngle );
  var radius = this.diameter/2 * scale;
  // does apex extend beyond eclipse of face
  var isApexVisible = radius * eccen < apexDistance;
  if ( !isApexVisible ) {
    return;
  }
  // update tangents
  var apexAngle = Math.atan2( this.renderNormal.y, this.renderNormal.x ) +
      TAU/2;
  var projectLength = apexDistance / eccen;
  var projectAngle = Math.acos( radius / projectLength );
  // set tangent points
  var tangentA = this.tangentA;
  var tangentB = this.tangentB;

  tangentA.x = Math.cos( projectAngle ) * radius * eccen;
  tangentA.y = Math.sin( projectAngle ) * radius;

  tangentB.set( this.tangentA );
  tangentB.y *= -1;

  tangentA.rotateZ( apexAngle );
  tangentB.rotateZ( apexAngle );
  tangentA.add( this.renderOrigin );
  tangentB.add( this.renderOrigin );

  this.setSurfaceRenderPoint( 0, tangentA );
  this.setSurfaceRenderPoint( 1, this.apex.renderOrigin );
  this.setSurfaceRenderPoint( 2, tangentB );

  // render
  var elem = this.getSurfaceRenderElement( ctx, renderer );
  renderer.renderPath( ctx, elem, this.surfacePathCommands );
  renderer.stroke( ctx, elem, this.stroke, this.color, this.getLineWidth() );
  renderer.fill( ctx, elem, this.fill, this.color );
  renderer.end( ctx, elem );
};

var svgURI = 'http://www.w3.org/2000/svg';

Cone.prototype.getSurfaceRenderElement = function( ctx, renderer ) {
  if ( !renderer.isSvg ) {
    return;
  }
  if ( !this.surfaceSvgElement ) {
    // create svgElement
    this.surfaceSvgElement = document.createElementNS( svgURI, 'path');
    this.surfaceSvgElement.setAttribute( 'stroke-linecap', 'round' );
    this.surfaceSvgElement.setAttribute( 'stroke-linejoin', 'round' );
  }
  return this.surfaceSvgElement;
};

Cone.prototype.setSurfaceRenderPoint = function( index, point ) {
  var renderPoint = this.surfacePathCommands[ index ].renderPoints[0];
  renderPoint.set( point );
};

return Cone;

}));

},{"./boilerplate":"../node_modules/zdog/js/boilerplate.js","./vector":"../node_modules/zdog/js/vector.js","./path-command":"../node_modules/zdog/js/path-command.js","./anchor":"../node_modules/zdog/js/anchor.js","./ellipse":"../node_modules/zdog/js/ellipse.js"}],"../node_modules/zdog/js/box.js":[function(require,module,exports) {
/**
 * Box composite shape
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( require('./boilerplate'), require('./anchor'),
        require('./shape'), require('./rect') );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Box = factory( Zdog, Zdog.Anchor, Zdog.Shape, Zdog.Rect );
  }
}( this, function factory( utils, Anchor, Shape, Rect ) {

// ----- BoxRect ----- //

var BoxRect = Rect.subclass();
// prevent double-creation in parent.copyGraph()
// only create in Box.create()
BoxRect.prototype.copyGraph = function() {};

// ----- Box ----- //

var boxDefaults = utils.extend( {
  width: 1,
  height: 1,
  depth: 1,
  frontFace: true,
  rearFace: true,
  leftFace: true,
  rightFace: true,
  topFace: true,
  bottomFace: true,
}, Shape.defaults );
// default fill
boxDefaults.fill = true;
delete boxDefaults.path;

var Box = Anchor.subclass( boxDefaults );

var TAU = utils.TAU;

Box.prototype.create = function( options ) {
  Anchor.prototype.create.call( this, options );
  this.updatePath();
};

Box.prototype.updatePath = function() {
  this.setFace( 'frontFace', {
    width: this.width,
    height: this.height,
    translate: { z: this.depth/2 },
  });
  this.setFace( 'rearFace', {
    width: this.width,
    height: this.height,
    translate: { z: -this.depth/2 },
    rotate: { y: TAU/2 },
  });
  this.setFace( 'leftFace', {
    width: this.depth,
    height: this.height,
    translate: { x: -this.width/2 },
    rotate: { y: -TAU/4 },
  });
  this.setFace( 'rightFace', {
    width: this.depth,
    height: this.height,
    translate: { x: this.width/2 },
    rotate: { y: TAU/4 },
  });
  this.setFace( 'topFace', {
    width: this.width,
    height: this.depth,
    translate: { y: -this.height/2 },
    rotate: { x: -TAU/4 },
  });
  this.setFace( 'bottomFace', {
    width: this.width,
    height: this.depth,
    translate: { y: this.height/2 },
    rotate: { x: -TAU/4 },
  });
};

Box.prototype.setFace = function( faceName, options ) {
  var property = this[ faceName ];
  var rectProperty = faceName + 'Rect';
  var rect = this[ rectProperty ];
  // remove if false
  if ( !property ) {
    this.removeChild( rect );
    return;
  }
  // update & add face
  utils.extend( options, {
    // set color from option, i.e. `front: '#19F'`
    color: typeof property == 'string' ? property : this.color,
    stroke: this.stroke,
    fill: this.fill,
    backface: this.backface,
    front: this.front,
    visible: this.visible,
  });
  if ( rect ) {
    // update previous
    rect.setOptions( options );
  } else {
    // create new
    rect = this[ rectProperty ] = new BoxRect( options );
  }
  rect.updatePath();
  this.addChild( rect );
};

return Box;

}));

},{"./boilerplate":"../node_modules/zdog/js/boilerplate.js","./anchor":"../node_modules/zdog/js/anchor.js","./shape":"../node_modules/zdog/js/shape.js","./rect":"../node_modules/zdog/js/rect.js"}],"../node_modules/zdog/js/index.js":[function(require,module,exports) {
var define;
/**
 * Index
 */

( function( root, factory ) {
  // module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        require('./boilerplate'),
        require('./canvas-renderer'),
        require('./svg-renderer'),
        require('./vector'),
        require('./anchor'),
        require('./dragger'),
        require('./illustration'),
        require('./path-command'),
        require('./shape'),
        require('./group'),
        require('./rect'),
        require('./rounded-rect'),
        require('./ellipse'),
        require('./polygon'),
        require('./hemisphere'),
        require('./cylinder'),
        require('./cone'),
        require('./box')
    );
  } else if ( typeof define == 'function' && define.amd ) {
    /* globals define */ // AMD
    define( 'zdog', [], root.Zdog );
  }
})( this, function factory( Zdog, CanvasRenderer, SvgRenderer, Vector, Anchor,
    Dragger, Illustration, PathCommand, Shape, Group, Rect, RoundedRect,
    Ellipse, Polygon, Hemisphere, Cylinder, Cone, Box ) {

      Zdog.CanvasRenderer = CanvasRenderer;
      Zdog.SvgRenderer = SvgRenderer;
      Zdog.Vector = Vector;
      Zdog.Anchor = Anchor;
      Zdog.Dragger = Dragger;
      Zdog.Illustration = Illustration;
      Zdog.PathCommand = PathCommand;
      Zdog.Shape = Shape;
      Zdog.Group = Group;
      Zdog.Rect = Rect;
      Zdog.RoundedRect = RoundedRect;
      Zdog.Ellipse = Ellipse;
      Zdog.Polygon = Polygon;
      Zdog.Hemisphere = Hemisphere;
      Zdog.Cylinder = Cylinder;
      Zdog.Cone = Cone;
      Zdog.Box = Box;

      return Zdog;
});

},{"./boilerplate":"../node_modules/zdog/js/boilerplate.js","./canvas-renderer":"../node_modules/zdog/js/canvas-renderer.js","./svg-renderer":"../node_modules/zdog/js/svg-renderer.js","./vector":"../node_modules/zdog/js/vector.js","./anchor":"../node_modules/zdog/js/anchor.js","./dragger":"../node_modules/zdog/js/dragger.js","./illustration":"../node_modules/zdog/js/illustration.js","./path-command":"../node_modules/zdog/js/path-command.js","./shape":"../node_modules/zdog/js/shape.js","./group":"../node_modules/zdog/js/group.js","./rect":"../node_modules/zdog/js/rect.js","./rounded-rect":"../node_modules/zdog/js/rounded-rect.js","./ellipse":"../node_modules/zdog/js/ellipse.js","./polygon":"../node_modules/zdog/js/polygon.js","./hemisphere":"../node_modules/zdog/js/hemisphere.js","./cylinder":"../node_modules/zdog/js/cylinder.js","./cone":"../node_modules/zdog/js/cone.js","./box":"../node_modules/zdog/js/box.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _zdog = _interopRequireDefault(require("zdog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// script.js
var TAU = _zdog.default.TAU;
var white = "#fff";
var black = "#111";
var illo = new _zdog.default.Illustration({
  element: ".zdog-canvas",
  dragRotate: true,
  zoom: 2
});
var outline = new _zdog.default.Ellipse({
  addTo: illo,
  width: 120,
  height: 120,
  stroke: 6,
  color: "#000",
  quarters: 1,
  fill: false
});
outline.copy({
  rotate: {
    z: TAU / 2
  }
});
outline.copy({
  rotate: {
    z: TAU / 4
  }
});
outline.copy({
  rotate: {
    z: -TAU / 4
  }
});
var eyeGroup = new _zdog.default.Group({
  addTo: illo,
  translate: {
    y: -18,
    x: -16,
    z: 40
  },
  rotate: {
    x: -TAU / 2.2
  }
});
var eye = new _zdog.default.Ellipse({
  addTo: eyeGroup,
  width: 8,
  height: 26,
  stroke: 5,
  color: "#000",
  fill: true
});
eyeGroup.copyGraph({
  translate: {
    y: -18,
    x: 16,
    z: 40
  }
});
var mouth = new _zdog.default.Shape({
  addTo: illo,
  path: [{
    x: -35,
    y: 20
  }, {
    bezier: [{
      x: -18,
      y: 48
    }, {
      x: 18,
      y: 48
    }, {
      x: 35,
      y: 20
    }]
  }],
  closed: false,
  stroke: 7,
  color: "#000",
  translate: {
    y: -2,
    z: 40
  }
});
var wrinkle = new _zdog.default.Shape({
  addTo: mouth,
  path: [{
    x: 0,
    y: 0
  }, {
    arc: [{
      x: 6,
      y: -5
    }, {
      x: 12,
      y: 0
    }]
  }],
  translate: {
    x: -40.5,
    y: 23
  },
  rotate: {
    z: -TAU / 13
  },
  stroke: 6,
  closed: false,
  color: "#000"
});
var head = new _zdog.default.Shape({
  addTo: illo,
  stroke: 110,
  color: "#f8d946"
});
wrinkle.copyGraph({
  translate: {
    x: 29,
    y: 18
  },
  rotate: {
    z: _zdog.default.TAU / 12
  }
}); // ---

var body = document.getElementsByTagName("body")[0];
var elem = document.documentElement;
var div = document.createElement("div");
div.id = "cursor";
body.appendChild(div);

function animate(cursor) {
  var windowWidth = window.innerWidth || elem.clientWidth || body.clientWidth,
      windowHeight = window.innerHeight || elem.clientHeight || body.clientHeight;
  var x = Math.cos(Math.PI * cursor.pageY / windowHeight) * 0.3;
  var y = Math.cos(Math.PI * cursor.pageX / windowWidth) * 0.3;
  illo.rotate.x = x;
  illo.rotate.y = y;
  illo.updateRenderGraph();
}

function move(cursor) {
  div.style.top = cursor.pageY + "px";
  div.style.left = cursor.pageX + "px";
}

addEventListener("mousemove", animate, false);
addEventListener("mousemove", move, false);
illo.updateRenderGraph();
},{"zdog":"../node_modules/zdog/js/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64222" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map