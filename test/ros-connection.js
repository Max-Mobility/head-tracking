"use strict"
const ROSLIB = require('roslib');

var log = console.log.bind(console);

//set up ros connection
var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
})

ros.on('connection', error => {
    log('ros system connected on local host');
})

ros.on('error', error => {
    throw Error("A ros connection error occured")
})

ros.on('close', error => {
    log("Closing ros connection");
})

var cmdVel = new ROSLIB.Topic({
    ros: ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/Twist'
});

var publishOnRos = function(tilt){
    log('Publishing tilt');

    var twist = new ROSLIB.Message({
        linear : {
            x: 0,
            y: 0,
            z: 0
        },
        angular : {
            x: 0,
            y: 0,
            z: tilt
        }
    });
    cmdVel.publish(twist);
};

publishOnRos(34);
