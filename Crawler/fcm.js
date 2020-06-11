var FCM = require('fcm-node');
var serverKey = 'AAAAB2agPMM:APA91bEqYOg0wuSq3ETOrw26DufS41RO98v7DDFaYmE-XtguxiEsHUihmlhELUXcS3Ey-OeOAscrJygTttswExnPDeiQC-jRoe132K4JCcaqAHwprAlMABhE9wIr7kyL6-aaKK0sqyW-'; //put your server key here
var fcm = new FCM(serverKey);

module.exports = {
    send_notice(to, data) {
        console.log(to)
        console.log(data)
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: to,
            collapse_key: 'com.jaryapp.myapplication3',
            notification: {
                title: data.title,
                body: data.body,
                //   click_action: "FCM_PLUGIN_ACTIVITY"
                //   click_action: ".MainActivity",
                click_action: "Result3Activity"
                //   click_action: "android.intent.action.MAIN"
            },
            data: data,

        };

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