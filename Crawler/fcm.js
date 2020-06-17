/**
 * This Script Created by 조정제
 * Copyright (c) 2020. All rights reserved.
 */


var FCM = require('fcm-node');
var serverKey = 'AAAAB2agPMM:APA91bEqYOg0wuSq3ETOrw26DufS41RO98v7DDFaYmE-XtguxiEsHUihmlhELUXcS3Ey-OeOAscrJygTttswExnPDeiQC-jRoe132K4JCcaqAHwprAlMABhE9wIr7kyL6-aaKK0sqyW-'; //put your server key here
var fcm = new FCM(serverKey);

module.exports = {
    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */

    send_notice(to, data) {
        console.log(to)
        console.log(data)
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: to,
            collapse_key: 'com.jaryapp.myapplication3',
            notification: {
                title: data.title,
                body: data.body,
                click_action: ".notice"
            },
            data: data,

        };

        /**
         * This Function Created by 조정제
         * Copyright (c) 2020. All rights reserved.
         */

        fcm.send(message, function (err, response) {
            if (err) {
                console.log(err)
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });

    }
}