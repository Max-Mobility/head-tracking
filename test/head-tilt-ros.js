"use strict"
const fs = require('fs');
const chokidar = require('chokidar');
const math = require('mathjs');
const ROSLIB = require('roslib')

var log = console.log.bind(console);

const directory = process.argv[2];
if(!directory){
    throw Error("A directory to watch must be specified!");
}


//set up ros connection
var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
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

ros.on('connection', error => {
    log('ros system connected on local host');
    publishOnRos(0);
})

ros.on('error', error => {
    throw Error("A ros connection error occured")
})

ros.on('close', error => {
    log("Closing ros connection");
})



//set up index of left and right eyes
const REye = 15;
const LEye = 16;

//set up directory watcher for new frame json doc
var watcher = chokidar.watch(directory, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

watcher.on('add', file => {
    log('new frame')
    var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
    if(obj.people === undefined || obj.people.length == 0)
    {
    } else {
        var pose = obj.people[0].pose_keypoints_2d;
        var REyeX = pose[REye*3];
        var REyeY = pose[REye*3+1];
        var LEyeX = pose[LEye*3];
        var LEyeY = pose[LEye*3+1];
        var tilt = math.atan2(-LEyeY + REyeY, LEyeX - REyeX) * 180 / math.pi;
        publishOnRos(tilt);
    }
});



log(directory)
