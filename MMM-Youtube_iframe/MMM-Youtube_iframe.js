/* global Module */

/* Magic Mirror
 * Module: {{MODULE_NAME}}
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */
var service = {};
service.youtube = null;
var resultAPI = null;

var videoid_global = '';
var localplayer;

Module.register("MMM-Youtube_iframe", {

	defaults: {
        header: "MMM-Youtube_iframe",

	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
        Log.info('Starting module: '+this.name);

		var self = this;


		var resultArray = [];
		//var videoId = null;


		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;
        this.updateTimer = null;


        if (this.config.debug) {
            Log.info(this.url);
        }

	},
    getVideoId :function(){
        var self = this;
        var videoId;
        var i;
        if(this.result.items.length > 0 ){
            //나중에 추가적으로 기능을 늘릴예정
            /*responsiveVoice.speak("상위 5개 영상만 보여주j겠습니다. 어떤 영상을 보시겠습니까?","Korean Female");
        	for(i=0 ; i<5; i++){
                this.resultArray.push(this.result.snippet[i].title);*/
            var r = Math.floor((Math.random() * this.result.items.length) + 1);
            this.videoId = this.result.items[r].id.videoId;
            return this.videoId;
        }
        //return default youtube
        return null;

    },



    getDom: function() {
        var self = this;

        var wrapper = document.createElement("div");
        var div_player = document.createElement("div");
            div_player.id ="player";


	div_player.innerHTML ="test";
        wrapper.appendChild(div_player);

        return wrapper;



    },



	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "YouTube_DATA") {
			 console.log("response")
            this.result = payload.data;
            videoid_global =this.getVideoId();
            this.sendSocketNotification("YOUTUBEID",videoid_global);
            //localplayer=this.showYoutube();

			this.dataNotification = payload;

		}



    },



    notificationReceived: function (notification, payload, sender) {
		if(sender) {
			if(notification == "COMMAND") {
				console.log("1  " + notification + payload);
                if (payload == " show YouTube") {
                    //responsiveVoice.speak("어떤 동영상을 보시겠습니까", "Korean Female");
                    console.log("2  " + notification + payload);
                   this.sendSocketNotification("GET_YOUTUBEDATA", payload);

                    console.log("Working notification system. Notification:", notification, "payload: ", payload);
                }
                if(payload == " stop YouTube"){
                    console.log("stop youtube~~~~~~~~~~~~~~~~");
                    this.sendSocketNotification("STOPYOUTUBE", payload);

                }
                if(payload ==" play YouTube"){
                    console.log("play youtube~~~~~~~~~~~~~");
                    this.sendSocketNotification("PLAYYOUTUBE", payload);
                }

            }


		}

    },



});
