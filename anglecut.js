(function(){
    var init = function(event) {
        var imgs = document.querySelectorAll("img");
        for (var index = 0; index < imgs.length; index++) {
            var element = imgs[index];
            var hh = element.naturalHeight;
            var ww = element.naturalWidth;            
            /* On récupére les paramètres */
            var params = element.getAttribute("anglecut");
            if (params) {                
                var splitedParams = params.split(" ");
                var validParams = [];
                for (var z = 0; z < splitedParams.length; z++) {
                    var currentParam = Number(splitedParams[z]);                    
                    if (-90 < currentParam && currentParam < 90) {
                        validParams.push(currentParam);
                    }
                }
                var mappedParams = {top:0,right:0,bottom:0,left:0};
                if (validParams.length == 4) {
                    mappedParams = {
                        top:validParams[0],
                        right:validParams[1],
                        bottom:validParams[2],
                        left:validParams[3]
                    };
                } else if (validParams.length == 3) {
                    mappedParams = {
                        top:validParams[0],
                        right:validParams[1],
                        bottom:validParams[2],
                        left:validParams[1]
                    };
                } else if (validParams.length == 2) {
                    mappedParams = {
                        top:validParams[0],
                        right:validParams[1],
                        bottom:validParams[0],
                        left:validParams[1]
                    };
                } else if (validParams.length == 1) {
                    mappedParams = {
                        top:validParams[0],
                        right:validParams[0],
                        bottom:validParams[0],
                        left:validParams[0]
                    };
                } else {                    
                    continue;
                }                
                var cvs = document.createElement("canvas");
                cvs.height = hh;
                cvs.width = ww;

                var ctx = cvs.getContext("2d");
                ctx.drawImage(element,0,0);

                /* Découpage de l'image */
                var top = mappedParams.top;
                var right = mappedParams.right;
                var bottom = mappedParams.bottom;
                var left = mappedParams.left;
                var lTop = Math.round(Math.tan(Math.abs(top) * Math.PI/180) * ww);
                var lBottom = Math.round(Math.tan(Math.abs(bottom) * Math.PI/180) * ww);
                var lRight = Math.round(Math.tan(Math.abs(right) * Math.PI/180) * hh);
                var lleft = Math.round(Math.tan(Math.abs(left) * Math.PI/180) * hh);                
                ctx.globalCompositeOperation = "destination-out";
                if (top > 0) {
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(ww,0);
                    ctx.lineTo(ww,lTop);
                    ctx.lineTo(0,0);
                    ctx.fill();
                    ctx.closePath();
                } else if (top < 0) {
                    ctx.beginPath();
                    ctx.moveTo(ww,0);
                    ctx.lineTo(0,0);
                    ctx.lineTo(0,lTop);
                    ctx.lineTo(ww,0);
                    ctx.fill();
                    ctx.closePath();
                }                
                if (right > 0) {
                    ctx.beginPath();
                    ctx.moveTo(ww,0);
                    ctx.lineTo(ww,hh);
                    ctx.lineTo(ww-lRight,hh);
                    ctx.lineTo(ww,0);
                    ctx.fill();
                    ctx.closePath();
                } else if (right < 0) {
                    ctx.beginPath();
                    ctx.moveTo(ww,hh);
                    ctx.lineTo(ww,0);
                    ctx.lineTo(ww-lRight,0);
                    ctx.lineTo(ww,hh);
                    ctx.fill();
                    ctx.closePath();
                }                
                if (bottom > 0) {
                    ctx.beginPath();
                    ctx.moveTo(ww,hh);
                    ctx.lineTo(0,hh);
                    ctx.lineTo(0,hh-lBottom);
                    ctx.moveTo(ww,hh);
                    ctx.fill();
                    ctx.closePath();
                } else if (bottom < 0) {
                    ctx.beginPath();
                    ctx.moveTo(0,hh);
                    ctx.lineTo(ww,hh);
                    ctx.lineTo(ww,hh-lBottom);
                    ctx.moveTo(0,hh);
                    ctx.fill();
                    ctx.closePath();
                }                                
                if (left > 0) {
                    ctx.beginPath();
                    ctx.moveTo(0,hh);
                    ctx.lineTo(0,0);
                    ctx.lineTo(lleft, 0);
                    ctx.lineTo(0,hh);
                    ctx.fill();
                    ctx.closePath();
                } else if (left < 0) {
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(0,hh);
                    ctx.lineTo(lleft, hh);
                    ctx.lineTo(0,0);
                    ctx.fill();
                    ctx.closePath();
                }                
                /* Remplacer l'image */
                element.src = cvs.toDataURL();
            }
        }
    };
    document.addEventListener("DOMContentLoaded", init);
})();