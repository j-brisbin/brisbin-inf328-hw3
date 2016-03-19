(function(){
    //use a private class
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

    _$.prototype = {
      each: function(fn){
        for(var i = 0; i<this.elements.length;i++){
            fn.call(this,this.elements[i]);
        }
        return this;
      },
      setStyle: function(prop,val){
          this.each(function(element){
            element.style[prop] = val;
          });
          return this;
      },
      show: function(){
          this.each(function(element){
              this.setStyle("display","block");
          }.bind(this));
          return this;
      },
      hide: function(){
          this.each(function(element){
              this.setStyle("display","none");
          }.bind(this));
          return this;
      },
      addEvent: function(type,fn){
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
      },
      addClass: function(name){
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
      },
      removeClass: function(name){
          this.each(function(element){
              element.className = " " + element.className + " ";
              element.className = element.className.replace(" " + name + " "," ");
              element.className = element.className.replace("  "," ");
              element.className = element.className.trim();
              console.log(element.className);
          });
      },
      fadeIn: function(duration,callback){
          this.each(function(element){
              element.style.transition="all " + duration*1000 + "s";
              element.style.opacity = 0;
              element.style.opacity = 1;
              callback();
          });
      },
      fadeOut: function (duration, callback) {
          this.each(function(element){
              element.style.transition="all " + duration + "ms";
              element.style.opacity = 1;
              element.style.opacity = 0;
              callback();
          });
      },
      slideUp: function (duration, callback) {
          this.each(function(element){
              element.style.transition="all " + duration + "ms";
              element.style.height = 0;
              callback();

          });
      },
      slideDown: function (duration, callback) {
          this.each(function(element){
              element.style.transition="all " + duration + "ms";
              element.style.height = auto;
              callback();

          });
      }
    };

    window.$ = function()
    {
        return new _$(arguments);
    };


})();
