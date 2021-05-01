// ==UserScript==
// @name         YouTube video time show
// @namespace    https://github.com/AndyKhang404
// @version      1.0
// @description  Show the current time of the video on the title, so you don't have to periodically switch tabs
// @author       Andy Khang
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

/*
Known problem:
 - Sudden changes in playback rate can unsync the script time with the actual video time
*/

(function() {
    'use strict';
    var player = document.getElementById('movie_player');
    var title = document.title;
    var playbackSpeed = 1/player.getPlaybackRate();
    var itv = function(){
        playbackSpeed = 1/player.getPlaybackRate();
        var time = Math.round(player.getCurrentTime());
        var second = (time%60).toString(); if(second.length < 2){second = "0"+second;}
        var minute = (Math.floor(time/60)%60).toString(); if(minute.length < 2){minute = "0"+minute;}
        var hour = (Math.floor(time/3600)%24).toString();
        var day = (Math.floor(time/86400)).toString();
        if(hour.length < 2 && day.length != "0"){hour = "0"+hour;}
        if(hour === "00" && day === "0"){
            document.title = minute+":"+second+" "+title;
        } else if(hour !== "00" && day === "0"){
            document.title = hour+":"+minute+":"+second+" "+title;
        } else if(day !== "0"){
            document.title = day+":"+hour+":"+minute+":"+second+" "+title;
        }
        setTimeout(itv,1000*playbackSpeed);
    };
    setTimeout(itv,1000*playbackSpeed);
})();
