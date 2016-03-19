Function.prototype.method = function(name,fn){
  this.prototype[name] = fn;
  return this;
};

(function(){
    function _$(els)
    {
        this.elements = [];
        for(var i = 0; i<els.length;i++)
        {
            var element = els[i];
            if(typeof element == "string")
            {
                element = document.getElementById(element);
            }
            this.elements.push(element);
        }
    }
    _$.method("each",function(fn){
        for(var i=0;i<this.elements.length;i++){
            fn.call(this,this.elements[i]);
        }
        return this;
    }).method("addEvent",function(type,fn){
        var add = function(element){
            if(window.addEventListener){
                element.addEventListener(type,fn,false);
            }
            else if(window.attachEvent){
                element.attachEvent("on" + type,fn);
            }
        };
        this.each(function(element){
            add(element);
        });
        return this;
    }).method("show",function(){
            this.each(function(element){
                this.setStyle("display","block");
            }.bind(this));
            return this;
    }).method("hide",function(){
        this.each(function(element){
            this.setStyle("display","none");
        }.bind(this));
        return this;
    }).method("addClass",function(name){
        this.each(function(element){
            var temp = " " + element.className + " ";
            if(temp.indexOf(" " + name + " ") == -1){
                element.className += " " + name;
                element.className = element.className.replace("  "," ");
                element.className = element.className.trim();
                console.log("Added: " + element.className);
            }
        });
        return this;
    }).method("removeClass",function(name){
        this.each(function(element){
            element.className = " " + element.className + " ";
            element.className = element.className.replace(" " + name + " "," ");
            element.className = element.className.replace("  "," ");
            element.className = element.className.trim();
            console.log(element.className);
        });
    }).method("setStyle",function(prop,val){
        this.each(function(element){
            element.style[prop] = val;
        });
        return this;
    }).method("fadeIn",function(duration,callback){
        this.each(function(element){
           element.style.transition="opacity " + duration + "ms";
           element.style.opacity = 1;
           setTimeout(function(){
                   callback();
                   element.style.transition=null;
               }
               ,duration);
            return this;

        });
    }).method("fadeOut",function(duration,callback){
        this.each(function(element){
            element.style.transition="opacity " + duration + "ms";
            element.style.opacity = 0;
            setTimeout(function(){
                    callback();
                    element.style.transition=null;
                }
                ,duration);
            return this;
        });
    }).method("slideUp",function(duration,callback,distance){

        this.each(function(element){
            element.style.top = "0px";
            var top = parseInt(element.style.top.replace("px",""));
            if(top>=-distance){
                element.style.setProperty("-webkit-transition","all " + duration + "ms");
                element.style.top = "-" + distance + "px";
                setTimeout(function(){
                        callback();
                        element.style.setProperty("-webkit-transition",null);
                    }
                    ,duration);

            }
            console.log(top);
            console.log(distance);
            return this;
        });
    }).method("slideDown",function(duration,callback,distance){

        this.each(function(element){
            element.style.top = "0px";
            var top = parseInt(element.style.top.replace("px",""));
            if(top<=distance){
                top += distance;
                element.style.setProperty("-webkit-transition","all " + duration + "ms");

                element.style.top += top + "px";
                setTimeout(function(){
                        callback();
                        element.style.setProperty("-webkit-transition",null);
                    }
                    ,duration);

            }
            else if(distance>=top){
                top -= distance;
                element.style.setProperty("-webkit-transition","all " + duration + "ms");

                element.style.top += top + "px";
                setTimeout(function(){
                        callback();
                        element.style.setProperty("-webkit-transition",null);
                    }
                    ,duration);
            }
            console.log(top);
            console.log(distance);
            return this;
        });
    }).method("setOpacity",function(opacity){
        this.each(function(element){
            element.style.opacity = opacity;
            return this;
        })
    });

    window.installHelper = function(scope,interface){
        scope[interface] = function(){
            return new _$(arguments);
        }
    }
})();