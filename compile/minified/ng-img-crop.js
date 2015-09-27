/*! ngImgCropExtended v0.3.4 License: MIT */!function(){"use strict";var e=angular.module("ngImgCrop",[]);e.factory("cropAreaCircle",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._boxResizeBaseSize=20,this._boxResizeNormalRatio=.9,this._boxResizeHoverRatio=1.2,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._boxResizeNormalSize=this._boxResizeBaseSize*this._boxResizeNormalRatio,this._boxResizeHoverSize=this._boxResizeBaseSize*this._boxResizeHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize=0,this._boxResizeIsHover=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype.getType=function(){return"circle"},t.prototype._calcCirclePerimeterCoords=function(e){var t=this._size.w/2,i=e*(Math.PI/180),r=this.getCenterPoint().x+t*Math.cos(i),s=this.getCenterPoint().y+t*Math.sin(i);return[r,s]},t.prototype._calcResizeIconCenterCoords=function(){return this._calcCirclePerimeterCoords(-45)},t.prototype._isCoordWithinArea=function(e){return Math.sqrt((e[0]-this.getCenterPoint().x)*(e[0]-this.getCenterPoint().x)+(e[1]-this.getCenterPoint().y)*(e[1]-this.getCenterPoint().y))<this._size.w/2},t.prototype._isCoordWithinBoxResize=function(e){var t=this._calcResizeIconCenterCoords(),i=this._boxResizeHoverSize/2;return e[0]>t[0]-i&&e[0]<t[0]+i&&e[1]>t[1]-i&&e[1]<t[1]+i},t.prototype._drawArea=function(e,t,i){e.arc(t.x,t.y,i.w/2,0,2*Math.PI)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments);var t=this.getCenterPoint();this._cropCanvas.drawIconMove([t.x,t.y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio),this._cropCanvas.drawIconResizeBoxNESW(this._calcResizeIconCenterCoords(),this._boxResizeBaseSize,this._boxResizeIsHover?this._boxResizeHoverRatio:this._boxResizeNormalRatio)},t.prototype.processMouseMove=function(e,t){var i="default",r=!1;if(this._boxResizeIsHover=!1,this._areaIsHover=!1,this._areaIsDragging)this.setCenterPoint({x:e-this._posDragStartX,y:t-this._posDragStartY}),this._areaIsHover=!0,i="move",r=!0,this._events.trigger("area-move");else if(this._boxResizeIsDragging){i="nesw-resize";var s,o,a;o=e-this._posResizeStartX,a=this._posResizeStartY-t,s=o>a?this._posResizeStartSize.w+2*a:this._posResizeStartSize.w+2*o;var n=(this.getCenterPoint(),{}),h={};n.x=this.getCenterPoint().x-.5*s,h.x=this.getCenterPoint().x+.5*s,n.y=this.getCenterPoint().y-.5*s,h.y=this.getCenterPoint().y+.5*s,this.setSizeByCorners(n,h),this._boxResizeIsHover=!0,r=!0,this._events.trigger("area-resize")}else this._isCoordWithinBoxResize([e,t])?(i="nesw-resize",this._areaIsHover=!1,this._boxResizeIsHover=!0,r=!0):this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,r=!0);return angular.element(this._ctx.canvas).css({cursor:i}),r},t.prototype.processMouseDown=function(e,t){if(this._isCoordWithinBoxResize([e,t]))this._areaIsDragging=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!0,this._boxResizeIsHover=!0,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start");else if(this._isCoordWithinArea([e,t])){this._areaIsDragging=!0,this._areaIsHover=!0,this._boxResizeIsDragging=!1,this._boxResizeIsHover=!1;var i=this.getCenterPoint();this._posDragStartX=e-i.x,this._posDragStartY=t-i.y,this._events.trigger("area-move-start")}},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._boxResizeIsDragging&&(this._boxResizeIsDragging=!1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._boxResizeIsHover=!1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropAreaRectangle",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._resizeCtrlBaseRadius=10,this._resizeCtrlNormalRatio=.75,this._resizeCtrlHoverRatio=1,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._resizeCtrlNormalRadius=this._resizeCtrlBaseRadius*this._resizeCtrlNormalRatio,this._resizeCtrlHoverRadius=this._resizeCtrlBaseRadius*this._resizeCtrlHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize={w:0,h:0},this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._resizeCtrlIsDragging=-1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype.getType=function(){return"rectangle"},t.prototype._calcRectangleCorners=function(){var e=this.getSize(),t=this.getSouthEastBound();return[[e.x,e.y],[t.x,e.y],[e.x,t.y],[t.x,t.y]]},t.prototype._calcRectangleDimensions=function(){var e=this.getSize(),t=this.getSouthEastBound();return{left:e.x,top:e.y,right:t.x,bottom:t.y}},t.prototype._isCoordWithinArea=function(e){var t=this._calcRectangleDimensions();return e[0]>=t.left&&e[0]<=t.right&&e[1]>=t.top&&e[1]<=t.bottom},t.prototype._isCoordWithinResizeCtrl=function(e){for(var t=this._calcRectangleCorners(),i=-1,r=0,s=t.length;s>r;r++){var o=t[r];if(e[0]>o[0]-this._resizeCtrlHoverRadius&&e[0]<o[0]+this._resizeCtrlHoverRadius&&e[1]>o[1]-this._resizeCtrlHoverRadius&&e[1]<o[1]+this._resizeCtrlHoverRadius){i=r;break}}return i},t.prototype._drawArea=function(e,t,i){e.rect(i.x,i.y,i.w,i.h)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments);var t=this.getCenterPoint();this._cropCanvas.drawIconMove([t.x,t.y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);for(var i=this._calcRectangleCorners(),r=0,s=i.length;s>r;r++){var o=i[r];this._cropCanvas.drawIconResizeCircle(o,this._resizeCtrlBaseRadius,this._resizeCtrlIsHover===r?this._resizeCtrlHoverRatio:this._resizeCtrlNormalRatio)}},t.prototype.processMouseMove=function(e,t){var i="default",r=!1;if(this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._areaIsDragging)this.setCenterPoint({x:e-this._posDragStartX,y:t-this._posDragStartY}),this._areaIsHover=!0,i="move",r=!0,this._events.trigger("area-move");else if(this._resizeCtrlIsDragging>-1){var s=this.getSize(),o=this.getSouthEastBound();switch(this._resizeCtrlIsDragging){case 0:this.setSizeByCorners({x:e,y:t},{x:o.x,y:o.y}),i="nwse-resize";break;case 1:this.setSizeByCorners({x:s.x,y:t},{x:e,y:o.y}),i="nesw-resize";break;case 2:this.setSizeByCorners({x:e,y:s.y},{x:o.x,y:t}),i="nesw-resize";break;case 3:this.setSizeByCorners({x:s.x,y:s.y},{x:e,y:t}),i="nwse-resize"}this._resizeCtrlIsHover=this._resizeCtrlIsDragging,r=!0,this._events.trigger("area-resize")}else{var a=this._isCoordWithinResizeCtrl([e,t]);if(a>-1){switch(a){case 0:i="nwse-resize";break;case 1:i="nesw-resize";break;case 2:i="nesw-resize";break;case 3:i="nwse-resize"}this._areaIsHover=!1,this._resizeCtrlIsHover=a,r=!0}else this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,r=!0)}return angular.element(this._ctx.canvas).css({cursor:i}),r},t.prototype.processMouseDown=function(e,t){var i=this._isCoordWithinResizeCtrl([e,t]);if(i>-1)this._areaIsDragging=!1,this._areaIsHover=!1,this._resizeCtrlIsDragging=i,this._resizeCtrlIsHover=i,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start");else if(this._isCoordWithinArea([e,t])){this._areaIsDragging=!0,this._areaIsHover=!0,this._resizeCtrlIsDragging=-1,this._resizeCtrlIsHover=-1;var r=this.getCenterPoint();this._posDragStartX=e-r.x,this._posDragStartY=t-r.y,this._events.trigger("area-move-start")}},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._resizeCtrlIsDragging>-1&&(this._resizeCtrlIsDragging=-1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._resizeCtrlIsHover=-1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropAreaSquare",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._resizeCtrlBaseRadius=10,this._resizeCtrlNormalRatio=.75,this._resizeCtrlHoverRatio=1,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._resizeCtrlNormalRadius=this._resizeCtrlBaseRadius*this._resizeCtrlNormalRatio,this._resizeCtrlHoverRadius=this._resizeCtrlBaseRadius*this._resizeCtrlHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize=0,this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._resizeCtrlIsDragging=-1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype.getType=function(){return"square"},t.prototype._calcSquareCorners=function(){var e=this.getSize(),t=this.getSouthEastBound();return[[e.x,e.y],[t.x,e.y],[e.x,t.y],[t.x,t.y]]},t.prototype._calcSquareDimensions=function(){var e=this.getSize(),t=this.getSouthEastBound();return{left:e.x,top:e.y,right:t.x,bottom:t.y}},t.prototype._isCoordWithinArea=function(e){var t=this._calcSquareDimensions();return e[0]>=t.left&&e[0]<=t.right&&e[1]>=t.top&&e[1]<=t.bottom},t.prototype._isCoordWithinResizeCtrl=function(e){for(var t=this._calcSquareCorners(),i=-1,r=0,s=t.length;s>r;r++){var o=t[r];if(e[0]>o[0]-this._resizeCtrlHoverRadius&&e[0]<o[0]+this._resizeCtrlHoverRadius&&e[1]>o[1]-this._resizeCtrlHoverRadius&&e[1]<o[1]+this._resizeCtrlHoverRadius){i=r;break}}return i},t.prototype._drawArea=function(e,t,i){e.rect(i.x,i.y,i.w,i.h)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments);var t=this.getCenterPoint();this._cropCanvas.drawIconMove([t.x,t.y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);for(var i=this._calcSquareCorners(),r=0,s=i.length;s>r;r++){var o=i[r];this._cropCanvas.drawIconResizeCircle(o,this._resizeCtrlBaseRadius,this._resizeCtrlIsHover===r?this._resizeCtrlHoverRatio:this._resizeCtrlNormalRatio)}},t.prototype.processMouseMove=function(e,t){var i="default",r=!1;if(this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._areaIsDragging)this.setCenterPoint({x:e-this._posDragStartX,y:t-this._posDragStartY}),this._areaIsHover=!0,i="move",r=!0,this._events.trigger("area-move");else if(this._resizeCtrlIsDragging>-1){var s,o;switch(this._resizeCtrlIsDragging){case 0:s=-1,o=-1,i="nwse-resize";break;case 1:s=1,o=-1,i="nesw-resize";break;case 2:s=-1,o=1,i="nesw-resize";break;case 3:s=1,o=1,i="nwse-resize"}var a,n=(e-this._posResizeStartX)*s,h=(t-this._posResizeStartY)*o;a=n>h?this._posResizeStartSize.w+h:this._posResizeStartSize.w+n;var g=Math.max(this._minSize.w,a),c={},l={},u={},p={},d=this.getSize(),f=this.getSouthEastBound();switch(this._resizeCtrlIsDragging){case 0:c.x=f.x-g,c.y=f.y-g,this.setSizeByCorners(c,{x:f.x,y:f.y}),i="nwse-resize";break;case 1:n>=0&&h>=0?(p.x=d.x+g,p.y=f.y-g):(0>n||0>h)&&(p.x=d.x+g,p.y=f.y-g),this.setSizeByCorners({x:d.x,y:p.y},{x:p.x,y:f.y}),i="nesw-resize";break;case 2:n>=0&&h>=0?(u.x=f.x-g,u.y=d.y+g):(0>=n||0>=h)&&(u.x=f.x-g,u.y=d.y+g),this.setSizeByCorners({x:u.x,y:d.y},{x:f.x,y:u.y}),i="nesw-resize";break;case 3:l.x=d.x+g,l.y=d.y+g,this.setSizeByCorners({x:d.x,y:d.y},l),i="nwse-resize"}this._resizeCtrlIsHover=this._resizeCtrlIsDragging,r=!0,this._events.trigger("area-resize")}else{var v=this._isCoordWithinResizeCtrl([e,t]);if(v>-1){switch(v){case 0:i="nwse-resize";break;case 1:i="nesw-resize";break;case 2:i="nesw-resize";break;case 3:i="nwse-resize"}this._areaIsHover=!1,this._resizeCtrlIsHover=v,r=!0}else this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,r=!0)}return angular.element(this._ctx.canvas).css({cursor:i}),r},t.prototype.processMouseDown=function(e,t){var i=this._isCoordWithinResizeCtrl([e,t]);if(i>-1)this._areaIsDragging=!1,this._areaIsHover=!1,this._resizeCtrlIsDragging=i,this._resizeCtrlIsHover=i,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start");else if(this._isCoordWithinArea([e,t])){this._areaIsDragging=!0,this._areaIsHover=!0,this._resizeCtrlIsDragging=-1,this._resizeCtrlIsHover=-1;var r=this.getCenterPoint();this._posDragStartX=e-r.x,this._posDragStartY=t-r.y,this._events.trigger("area-move-start")}},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._resizeCtrlIsDragging>-1&&(this._resizeCtrlIsDragging=-1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._resizeCtrlIsHover=-1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropArea",["cropCanvas",function(e){var t=function(t,i){this._ctx=t,this._events=i,this._minSize={x:0,y:0,w:80,h:80},this._cropCanvas=new e(t),this._image=new Image,this._size={x:0,y:0,w:200,h:200}};return t.prototype.getImage=function(){return this._image},t.prototype.setImage=function(e){this._image=e},t.prototype.getSize=function(){return this._size},t.prototype.setSize=function(e){e=this._processSize(e),this._size=this._preventBoundaryCollision(e)},t.prototype.setSizeByCorners=function(e,t){var i={x:e.x,y:e.y,w:t.x-e.x,h:t.y-e.y};this.setSize(i)},t.prototype.getSouthEastBound=function(){return this._southEastBound(this.getSize())},t.prototype.getMinSize=function(){return this._minSize},t.prototype.getCenterPoint=function(){var e=this.getSize();return{x:e.x+e.w/2,y:e.y+e.h/2}},t.prototype.setCenterPoint=function(e){var t=this.getSize();this.setSize({x:e.x-t.w/2,y:e.y-t.h/2,w:t.w,h:t.h})},t.prototype.setMinSize=function(e){this._minSize=this._processSize(e),this.setSize(this._minSize)},t.prototype.getType=function(){return"circle"},t.prototype._preventBoundaryCollision=function(e){var t=this._ctx.canvas.height,i=this._ctx.canvas.width,r={x:e.x,y:e.y},s=this._southEastBound(e);r.x<0&&(r.x=0),r.y<0&&(r.y=0),s.x>i&&(s.x=i),s.y>t&&(s.y=t);var o={x:r.x,y:r.y,w:s.x-r.x,h:s.y-r.y};return o.w<this._minSize.w&&(o.w=this._minSize.w,s=this._southEastBound(o),s.x>i&&(s.x=i,r.x=Math.max(s.x-i,s.x-this._minSize.w),o={x:r.x,y:r.y,w:s.x-r.x,h:s.y-r.y})),o.h<this._minSize.h&&(o.h=this._minSize.h,s=this._southEastBound(o),s.y>t&&(s.y=t,r.y=Math.max(s.y-t,s.y-this._minSize.h),o={x:r.x,y:r.y,w:s.x-r.x,h:s.y-r.y})),("circle"===this.getType()||"square"===this.getType())&&(o={x:o.x,y:o.y,w:o.w,h:o.h}),o},t.prototype._drawArea=function(){},t.prototype._processSize=function(e){return"number"==typeof e&&(e={w:e,h:e}),{x:e.x||this._minSize.x,y:e.y||this._minSize.y,w:e.w||this._minSize.w,h:e.h||this._minSize.h}},t.prototype._southEastBound=function(e){return{x:e.x+e.w,y:e.y+e.h}},t.prototype.draw=function(){this._cropCanvas.drawCropArea(this._image,this.getCenterPoint(),this._size,this._drawArea)},t.prototype.processMouseMove=function(){},t.prototype.processMouseDown=function(){},t.prototype.processMouseUp=function(){},t}]),e.factory("cropCanvas",[function(){var e=[[-.5,-2],[-3,-4.5],[-.5,-7],[-7,-7],[-7,-.5],[-4.5,-3],[-2,-.5]],t=[[.5,-2],[3,-4.5],[.5,-7],[7,-7],[7,-.5],[4.5,-3],[2,-.5]],i=[[-.5,2],[-3,4.5],[-.5,7],[-7,7],[-7,.5],[-4.5,3],[-2,.5]],r=[[.5,2],[3,4.5],[.5,7],[7,7],[7,.5],[4.5,3],[2,.5]],s=[[-1.5,-2.5],[-1.5,-6],[-5,-6],[0,-11],[5,-6],[1.5,-6],[1.5,-2.5]],o=[[-2.5,-1.5],[-6,-1.5],[-6,-5],[-11,0],[-6,5],[-6,1.5],[-2.5,1.5]],a=[[-1.5,2.5],[-1.5,6],[-5,6],[0,11],[5,6],[1.5,6],[1.5,2.5]],n=[[2.5,-1.5],[6,-1.5],[6,-5],[11,0],[6,5],[6,1.5],[2.5,1.5]],h={areaOutline:"#fff",resizeBoxStroke:"#fff",resizeBoxFill:"#444",resizeBoxArrowFill:"#fff",resizeCircleStroke:"#fff",resizeCircleFill:"#444",moveIconFill:"#fff"};return function(g){var c=function(e,t,i){return[i*e[0]+t[0],i*e[1]+t[1]]},l=function(e,t,i,r){g.save(),g.fillStyle=t,g.beginPath();var s,o=c(e[0],i,r);g.moveTo(o[0],o[1]);for(var a in e)a>0&&(s=c(e[a],i,r),g.lineTo(s[0],s[1]));g.lineTo(o[0],o[1]),g.fill(),g.closePath(),g.restore()};this.drawIconMove=function(e,t){l(s,h.moveIconFill,e,t),l(o,h.moveIconFill,e,t),l(a,h.moveIconFill,e,t),l(n,h.moveIconFill,e,t)},this.drawIconResizeCircle=function(e,t,i){var r=t*i;g.save(),g.strokeStyle=h.resizeCircleStroke,g.lineWidth=2,g.fillStyle=h.resizeCircleFill,g.beginPath(),g.arc(e[0],e[1],r,0,2*Math.PI),g.fill(),g.stroke(),g.closePath(),g.restore()},this.drawIconResizeBoxBase=function(e,t,i){var r=t*i;g.save(),g.strokeStyle=h.resizeBoxStroke,g.lineWidth=2,g.fillStyle=h.resizeBoxFill,g.fillRect(e[0]-r/2,e[1]-r/2,r,r),g.strokeRect(e[0]-r/2,e[1]-r/2,r,r),g.restore()},this.drawIconResizeBoxNESW=function(e,r,s){this.drawIconResizeBoxBase(e,r,s),l(t,h.resizeBoxArrowFill,e,s),l(i,h.resizeBoxArrowFill,e,s)},this.drawIconResizeBoxNWSE=function(t,i,s){this.drawIconResizeBoxBase(t,i,s),l(e,h.resizeBoxArrowFill,t,s),l(r,h.resizeBoxArrowFill,t,s)},this.drawCropArea=function(e,t,i,r){var s=e.width/g.canvas.width,o=e.height/g.canvas.height,a=t.x-i.w/2,n=t.y-i.h/2;g.save(),g.strokeStyle=h.areaOutline,g.lineWidth=2,g.beginPath(),r(g,t,i),g.stroke(),g.clip(),i.w>0&&g.drawImage(e,a*s,n*o,i.w*s,i.h*o,a,n,i.w,i.h),g.beginPath(),r(g,t,i),g.stroke(),g.clip(),g.restore()}}}]),e.service("cropEXIF",[function(){function e(e){return!!e.exifdata}function t(e,t){t=t||e.match(/^data\:([^\;]+)\;base64,/im)[1]||"",e=e.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var i=atob(e),r=i.length,s=new ArrayBuffer(r),o=new Uint8Array(s),a=0;r>a;a++)o[a]=i.charCodeAt(a);return s}function i(e,t){var i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="blob",i.onload=function(){(200==this.status||0===this.status)&&t(this.response)},i.send()}function r(e,r){function a(t){var i=s(t),a=o(t);e.exifdata=i||{},e.iptcdata=a||{},r&&r.call(e)}if(e.src)if(/^data\:/i.test(e.src)){var n=t(e.src);a(n)}else if(/^blob\:/i.test(e.src)){var h=new FileReader;h.onload=function(e){a(e.target.result)},i(e.src,function(e){h.readAsArrayBuffer(e)})}else{var g=new XMLHttpRequest;g.onload=function(){if(200!=this.status&&0!==this.status)throw"Could not load image";a(g.response),g=null},g.open("GET",e.src,!0),g.responseType="arraybuffer",g.send(null)}else if(window.FileReader&&(e instanceof window.Blob||e instanceof window.File)){var h=new FileReader;h.onload=function(e){l&&console.log("Got file of length "+e.target.result.byteLength),a(e.target.result)},h.readAsArrayBuffer(e)}}function s(e){var t=new DataView(e);if(l&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return l&&console.log("Not a valid JPEG"),!1;for(var i,r=2,s=e.byteLength;s>r;){if(255!=t.getUint8(r))return l&&console.log("Not a valid marker at offset "+r+", found: "+t.getUint8(r)),!1;if(i=t.getUint8(r+1),l&&console.log(i),225==i)return l&&console.log("Found 0xFFE1 marker"),c(t,r+4,t.getUint16(r+2)-2);r+=2+t.getUint16(r+2)}}function o(e){var t=new DataView(e);if(l&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return l&&console.log("Not a valid JPEG"),!1;for(var i=2,r=e.byteLength,s=function(e,t){return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5)};r>i;){if(s(t,i)){var o=t.getUint8(i+7);o%2!==0&&(o+=1),0===o&&(o=4);var n=i+8+o,h=t.getUint16(i+6+o);return a(e,n,h)}i++}}function a(e,t,i){for(var r,s,o,a,n,h=new DataView(e),c={},l=t;t+i>l;)28===h.getUint8(l)&&2===h.getUint8(l+1)&&(a=h.getUint8(l+2),a in v&&(o=h.getInt16(l+3),n=o+5,s=v[a],r=g(h,l+5,o),c.hasOwnProperty(s)?c[s]instanceof Array?c[s].push(r):c[s]=[c[s],r]:c[s]=r)),l++;return c}function n(e,t,i,r,s){var o,a,n,g=e.getUint16(i,!s),c={};for(n=0;g>n;n++)o=i+12*n+2,a=r[e.getUint16(o,!s)],!a&&l&&console.log("Unknown tag: "+e.getUint16(o,!s)),c[a]=h(e,o,t,i,s);return c}function h(e,t,i,r,s){var o,a,n,h,c,l,u=e.getUint16(t+2,!s),p=e.getUint32(t+4,!s),d=e.getUint32(t+8,!s)+i;switch(u){case 1:case 7:if(1==p)return e.getUint8(t+8,!s);for(o=p>4?d:t+8,a=[],h=0;p>h;h++)a[h]=e.getUint8(o+h);return a;case 2:return o=p>4?d:t+8,g(e,o,p-1);case 3:if(1==p)return e.getUint16(t+8,!s);for(o=p>2?d:t+8,a=[],h=0;p>h;h++)a[h]=e.getUint16(o+2*h,!s);return a;case 4:if(1==p)return e.getUint32(t+8,!s);for(a=[],h=0;p>h;h++)a[h]=e.getUint32(d+4*h,!s);return a;case 5:if(1==p)return c=e.getUint32(d,!s),l=e.getUint32(d+4,!s),n=new Number(c/l),n.numerator=c,n.denominator=l,n;for(a=[],h=0;p>h;h++)c=e.getUint32(d+8*h,!s),l=e.getUint32(d+4+8*h,!s),a[h]=new Number(c/l),a[h].numerator=c,a[h].denominator=l;return a;case 9:if(1==p)return e.getInt32(t+8,!s);for(a=[],h=0;p>h;h++)a[h]=e.getInt32(d+4*h,!s);return a;case 10:if(1==p)return e.getInt32(d,!s)/e.getInt32(d+4,!s);for(a=[],h=0;p>h;h++)a[h]=e.getInt32(d+8*h,!s)/e.getInt32(d+4+8*h,!s);return a}}function g(e,t,i){for(var r="",s=t;t+i>s;s++)r+=String.fromCharCode(e.getUint8(s));return r}function c(e,t){if("Exif"!=g(e,t,4))return l&&console.log("Not valid EXIF data! "+g(e,t,4)),!1;var i,r,s,o,a,h=t+6;if(18761==e.getUint16(h))i=!1;else{if(19789!=e.getUint16(h))return l&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;i=!0}if(42!=e.getUint16(h+2,!i))return l&&console.log("Not valid TIFF data! (no 0x002A)"),!1;var c=e.getUint32(h+4,!i);if(8>c)return l&&console.log("Not valid TIFF data! (First offset less than 8)",e.getUint32(h+4,!i)),!1;if(r=n(e,h,h+c,p,i),r.ExifIFDPointer){o=n(e,h,h+r.ExifIFDPointer,u,i);for(s in o){switch(s){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":o[s]=f[s][o[s]];break;case"ExifVersion":case"FlashpixVersion":o[s]=String.fromCharCode(o[s][0],o[s][1],o[s][2],o[s][3]);break;case"ComponentsConfiguration":o[s]=f.Components[o[s][0]]+f.Components[o[s][1]]+f.Components[o[s][2]]+f.Components[o[s][3]]}r[s]=o[s]}}if(r.GPSInfoIFDPointer){a=n(e,h,h+r.GPSInfoIFDPointer,d,i);for(s in a){switch(s){case"GPSVersionID":a[s]=a[s][0]+"."+a[s][1]+"."+a[s][2]+"."+a[s][3]}r[s]=a[s]}}return r}var l=!1,u=this.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},p=this.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},d=this.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},f=this.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},v={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};this.getData=function(t,i){return(t instanceof Image||t instanceof HTMLImageElement)&&!t.complete?!1:(e(t)?i&&i.call(t):r(t,i),!0)},this.getTag=function(t,i){return e(t)?t.exifdata[i]:void 0},this.getAllTags=function(t){if(!e(t))return{};var i,r=t.exifdata,s={};for(i in r)r.hasOwnProperty(i)&&(s[i]=r[i]);return s},this.pretty=function(t){if(!e(t))return"";var i,r=t.exifdata,s="";for(i in r)r.hasOwnProperty(i)&&(s+="object"==typeof r[i]?r[i]instanceof Number?i+" : "+r[i]+" ["+r[i].numerator+"/"+r[i].denominator+"]\r\n":i+" : ["+r[i].length+" values]\r\n":i+" : "+r[i]+"\r\n");return s},this.readFromBinaryFile=function(e){return s(e)}}]),e.factory("cropHost",["$document","$q","cropAreaCircle","cropAreaSquare","cropAreaRectangle",function(e,t,i,r,s){var o=function(e){var t=e.getBoundingClientRect(),i=document.body,r=document.documentElement,s=window.pageYOffset||r.scrollTop||i.scrollTop,o=window.pageXOffset||r.scrollLeft||i.scrollLeft,a=r.clientTop||i.clientTop||0,n=r.clientLeft||i.clientLeft||0,h=t.top+s-a,g=t.left+o-n;return{top:Math.round(h),left:Math.round(g)}};return function(a,n,h){function g(){c.clearRect(0,0,c.canvas.width,c.canvas.height),null!==l&&(c.drawImage(l,0,0,c.canvas.width,c.canvas.height),c.save(),c.fillStyle="rgba(0, 0, 0, 0.65)",c.fillRect(0,0,c.canvas.width,c.canvas.height),c.restore(),u.draw())}var c=null,l=null,u=null,p=this,d=[100,100],f=[300,300],v={w:200,h:200},_=function(){if(null!==l){u.setImage(l);var e=[l.width,l.height],t=l.width/l.height,i=e;i[0]>f[0]?(i[0]=f[0],i[1]=i[0]/t):i[0]<d[0]&&(i[0]=d[0],i[1]=i[0]/t),i[1]>f[1]?(i[1]=f[1],i[0]=i[1]*t):i[1]<d[1]&&(i[1]=d[1],i[0]=i[1]*t),a.prop("width",i[0]).prop("height",i[1]).css({"margin-left":-i[0]/2+"px","margin-top":-i[1]/2+"px"});var r=c.canvas.width,s=c.canvas.height,o=p.getAreaType();("circle"===o||"square"===o)&&(s=r),u.setSize({w:Math.min(200,r/2),h:Math.min(200,s/2)}),u.setCenterPoint({x:c.canvas.width/2,y:c.canvas.height/2})}else a.prop("width",0).prop("height",0).css({"margin-top":0});g()},z=function(e){if(null!==l){var t,i,r=o(c.canvas);"touchmove"===e.type?(t=e.changedTouches[0].pageX,i=e.changedTouches[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseMove(t-r.left,i-r.top),g()}},y=function(e){if(e.preventDefault(),e.stopPropagation(),null!==l){var t,i,r=o(c.canvas);"touchstart"===e.type?(t=e.changedTouches[0].pageX,i=e.changedTouches[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseDown(t-r.left,i-r.top),g()}},S=function(e){if(null!==l){var t,i,r=o(c.canvas);"touchend"===e.type?(t=e.changedTouches[0].pageX,i=e.changedTouches[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseUp(t-r.left,i-r.top),g()}};this.getResultImage=function(){var e,t;t=angular.element("<canvas></canvas>")[0],e=t.getContext("2d");this.getResultImageSize();t.width=u.getSize().w,t.height=u.getSize().h;var i=u.getCenterPoint(),r={dataURI:null,imageData:null};return null!==l&&(e.drawImage(l,(i.x-u.getSize().w/2)*(l.width/c.canvas.width),(i.y-u.getSize().h/2)*(l.height/c.canvas.height),u.getSize().w*(l.width/c.canvas.width),u.getSize().h*(l.height/c.canvas.height),0,0,u.getSize().w,u.getSize().h),r.dataURI=t.toDataURL(),r.imageData=t.getContext("2d").getImageData(0,0,u.getSize().w,u.getSize().h)),r},this.getResultImageDataBlob=function(){var e,i,r,s=u.getCenterPoint(),r=t.defer();return i=angular.element("<canvas></canvas>")[0],e=i.getContext("2d"),i.width=u.getSize().w,i.height=u.getSize().h,null!==l&&e.drawImage(l,(s.x-u.getSize().w/2)*(l.width/c.canvas.width),(s.y-u.getSize().h/2)*(l.height/c.canvas.height),u.getSize().w*(l.width/c.canvas.width),u.getSize().h*(l.height/c.canvas.height),0,0,v,v),i.toBlob(function(e){r.resolve(e)}),r.promise},this.getAreaCoords=function(){return u.getSize()},this.setNewImageSource=function(e){if(l=null,_(),h.trigger("image-updated"),e){var t=new Image;t.onload=function(){h.trigger("load-done"),l=t,_(),h.trigger("image-updated")},t.onerror=function(){h.trigger("load-error")},h.trigger("load-start"),t.src=e}},this.setMaxDimensions=function(e,t){if(f=[e,t],null!==l){var i=c.canvas.width,r=c.canvas.height,s=[l.width,l.height],o=l.width/l.height,n=s;n[0]>f[0]?(n[0]=f[0],n[1]=n[0]/o):n[0]<d[0]&&(n[0]=d[0],n[1]=n[0]/o),n[1]>f[1]?(n[1]=f[1],n[0]=n[1]*o):n[1]<d[1]&&(n[1]=d[1],n[0]=n[1]*o),a.prop("width",n[0]).prop("height",n[1]).css({"margin-left":-n[0]/2+"px","margin-top":-n[1]/2+"px"});var h=c.canvas.width/i,p=c.canvas.height/r,v=Math.min(h,p);u.setSize({w:u.getSize().w*v,h:u.getSize().h*v});var _=u.getCenterPoint();u.setCenterPoint({x:_.x*h,y:_.y*p})}else a.prop("width",0).prop("height",0).css({"margin-top":0});g()},this.setAreaMinSize=function(e){angular.isUndefined(e)||(e={w:parseInt(e.w,10),h:parseInt(e.h,10)},isNaN(e.w)||isNaN(e.h)||(u.setMinSize(e),g()))},this.getResultImageSize=function(){return"selection"==v?u.getSize():v},this.setResultImageSize=function(e){if(!angular.isUndefined(e)){if(angular.isString(e))return v=e,void 0;
angular.isNumber(e)&&(e=parseInt(e,10),e={w:e,h:e}),e={w:parseInt(e.w,10),h:parseInt(e.h,10)},isNaN(e.w)||isNaN(e.h)||(v=e,g())}},this.getAreaType=function(){return u.getType()},this.setAreaType=function(e){var t=u.getCenterPoint(),o=u.getSize(),a=u.getMinSize(),n=t.x,p=t.y,d=i;"square"===e?d=r:"rectangle"===e&&(d=s),u=new d(c,h),u.setMinSize(a),u.setSize(o),u.setCenterPoint({x:n,y:p}),null!==l&&u.setImage(l),g()},c=a[0].getContext("2d"),u=new i(c,h),e.on("mousemove",z),a.on("mousedown",y),e.on("mouseup",S),e.on("touchmove",z),a.on("touchstart",y),e.on("touchend",S),this.destroy=function(){e.off("mousemove",z),a.off("mousedown",y),e.off("mouseup",z),e.off("touchmove",z),a.off("touchstart",y),e.off("touchend",z),a.remove()}}}]),e.factory("cropPubSub",[function(){return function(){var e={};this.on=function(t,i){return t.split(" ").forEach(function(t){e[t]||(e[t]=[]),e[t].push(i)}),this},this.trigger=function(t,i){return angular.forEach(e[t],function(e){e.call(null,i)}),this}}}]),e.directive("imgCrop",["$timeout","cropHost","cropPubSub",function(e,t,i){return{restrict:"E",scope:{image:"=",resultImage:"=",resultBlob:"=",resultImageData:"=",changeOnFly:"=",areaCoords:"=",areaType:"@",areaMinSize:"=",resultImageSize:"=",onChange:"&",onLoadBegin:"&",onLoadDone:"&",onLoadError:"&"},template:"<canvas></canvas>",controller:["$scope",function(e){e.events=new i}],link:function(i,r){var s,o=i.events,a=new t(r.find("canvas"),{},o),n=function(e){var t=a.getResultImage(),i=t.dataURI;s!==i&&(s=i,e.resultImage=i,angular.isDefined(e.resultImageData)&&(e.resultImageData=t.imageData),a.getResultImageDataBlob().then(function(t){e.resultBlob=t}),h(e),e.onChange({$dataURI:e.resultImage,$imageData:e.resultImageData}))},h=function(e){var t=a.getAreaCoords();e.areaCoords=t},g=function(t){return function(){e(function(){i.$apply(function(e){t(e)})})}};o.on("load-start",g(function(e){e.onLoadBegin({})})).on("load-done",g(function(e){e.onLoadDone({})})).on("load-error",g(function(e){e.onLoadError({})})).on("area-move area-resize",g(function(e){e.changeOnFly&&n(e)})).on("area-move-end area-resize-end image-updated",g(function(e){n(e)})),i.$watch("image",function(){a.setNewImageSource(i.image)}),i.$watch("areaType",function(){a.setAreaType(i.areaType),n(i)}),i.$watch("areaMinSize",function(){a.setAreaMinSize(i.areaMinSize),n(i)}),i.$watch("resultImageSize",function(){a.setResultImageSize(i.resultImageSize),n(i)}),i.$watch(function(){return[r[0].clientWidth,r[0].clientHeight]},function(e){a.setMaxDimensions(e[0],e[1]),n(i)},!0),i.$on("$destroy",function(){a.destroy()})}}}]),function(e){var t,i=e.Uint8Array,r=e.HTMLCanvasElement,s=r&&r.prototype,o=/\s*;\s*base64\s*(?:;|$)/i,a="toDataURL",n=function(e){for(var r,s,o,a=e.length,n=new i(a/4*3|0),h=0,g=0,c=[0,0],l=0,u=0;a--;)s=e.charCodeAt(h++),r=t[s-43],255!==r&&r!==o&&(c[1]=c[0],c[0]=s,u=u<<6|r,l++,4===l&&(n[g++]=u>>>16,61!==c[1]&&(n[g++]=u>>>8),61!==c[0]&&(n[g++]=u),l=0));return n};i&&(t=new i([62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51])),r&&!s.toBlob&&(s.toBlob=function(e,t){if(t||(t="image/png"),this.mozGetAsFile)return e(this.mozGetAsFile("canvas",t)),void 0;if(this.msToBlob&&/^\s*image\/png\s*(?:$|;)/i.test(t))return e(this.msToBlob()),void 0;var r,s=Array.prototype.slice.call(arguments,1),h=this[a].apply(this,s),g=h.indexOf(","),c=h.substring(g+1),l=o.test(h.substring(0,g));Blob.fake?(r=new Blob,r.encoding=l?"base64":"URI",r.data=c,r.size=c.length):i&&(r=l?new Blob([n(c)],{type:t}):new Blob([decodeURIComponent(c)],{type:t})),"undefined"!=typeof e&&e(r)},s.toBlobHD=s.toDataURLHD?function(){a="toDataURLHD";var e=this.toBlob();return a="toDataURL",e}:s.toBlob)}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content||this)}();