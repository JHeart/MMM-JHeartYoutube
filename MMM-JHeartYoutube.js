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
Module.register("MMM-JHeartYoutube", {

	defaults: {
        header: "MMM-JHeartYoutube",

	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
        Log.info('Starting module: '+this.name);

		var self = this;


		var resultArray = [];
		var videoId = null;


		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;
        this.updateTimer = null;

        //"https://www.googleapis.com/youtube/v3/search?part=snippet&q="+paylod+"&key="+config.youtube.key + "&maxResults=30&type=video"
        //this.apiBase = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
       // this.url = encodeURI(this.apiBase);
        if (this.config.debug) {
            Log.info(this.url);
        }
		// Schedule update timer.
		//this.getData();
	/*	setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);*/
       // this.sendSocketNotification("test", "test1");
	},
    getVideoId :function(){
        var self = this;
        self.sendSocketNotification("getVideoId", "getVideoId");
        //var videoId;
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


	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "YouTube_DATA") {
			 console.log("response")
            this.result = payload.data;
			var resultURI = "https://www.youtube.com/embed/" +this.getVideoId()+"?autoplay=1&enablejsapi=1&version=3&playerapiid=ytplayer";
			console.log(resultURI);
			this.sendNotification("YOUTUBE", resultURI);
			// set dataNotification
			this.dataNotification = payload;
			//this.updateDom();
		}

		else if(notification == "getYouTubeData"){
			console.log("getYouTubeData");
		}

		else if(notification == "getYouTubeDatarequest1"){

            console.log("getYouTubeDatarequest1");
        }

        else if(notification == "getYouTubeDatarequest2"){

            console.log("getYouTubeDatarequest2");
        }
        else if(notification =="getYouTubeDatarequest1_1"){
			console.log("getYouTubeDatarequest1_1");
		}
		else if(notification =="getYouTubeDatarequest1_2"){
			console.log("getYouTubeDatarequest1_2");
		}
        else if(notification =="error"){
            console.log("error");
        }
        else if(notification =="error1"){
            console.log("error1");
        }
        else if(notification =="getYouTubeDatarequest1_3"){
            console.log("getYouTubeDatarequest1_3");
        }
        else if(notification =="getVideoId"){
            console.log("getVideoId");
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
            }


		}

    },



});
