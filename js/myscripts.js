window.com = window.com || {};
com.example = com.example || {};
com.example.util = com.example.util || {};

installHelper(com.example.util,"jb");
var jb = com.example.util.jb;

function fadeOutCallback(){
    console.log("Fade Out Completed");
}

function fadeInCallback(){
    console.log("Fade In Completed");
}

function slideUpCallback(){
    console.log("Slide Up Completed");
}

function slideDownCallback(){
    console.log("Slide Down Completed");
}

jb(window).addEvent("load",function(){
    jb("fadeInButton").addEvent("click",function(evt){
        jb("fadeInDiv").fadeIn(1000,fadeInCallback);
    });
    jb("noOpacityButton").addEvent("click",function(evt){
        console.log("I'm here.");
        jb("fadeInDiv").setOpacity(0);
    });
    jb("fullOpacityButton").addEvent("click",function(evt){
        jb("fadeOutDiv").setOpacity(1);
    })
    jb("fadeOutButton").addEvent("click",function(evt){
        jb("fadeOutDiv").fadeOut(1000,fadeOutCallback);
    });
    jb("slideUpButton").addEvent("click",function(evt){
        jb("testImage").slideUp(1000,slideUpCallback,100);
    });
    jb("slideDownButton").addEvent("click",function(evt){
        jb("testImage").slideDown(1000,slideDownCallback,100);
    });
    jb("hideButton").addEvent("click",function(evt){
        jb("hideShowDiv").hide();
    });
    jb("showButton").addEvent("click",function(evt){
        jb("hideShowDiv").show();
    });
});


