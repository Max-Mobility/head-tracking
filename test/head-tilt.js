"use strict"
const fs = require('fs');
const chokidar = require('chokidar');
const math = require('mathjs');

var log = console.log.bind(console);

const directory = process.argv[2];
const REye = 15;
const LEye = 16;

log(directory)

var watcher = chokidar.watch(directory, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});



watcher.on('add', file => {
    //log(file);
    var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
    //log(JSON.stringify(obj, null, 2));
    if(obj.people === undefined || obj.people.length == 0)
    {
        //log('Has no peeps');
    } else {
        //log("Has peeps");
        var pose = obj.people[0].pose_keypoints_2d;
        //log(pose);
        var REyeX = pose[REye*3];
        var REyeY = pose[REye*3+1];
        var LEyeX = pose[LEye*3];
        var LEyeY = pose[LEye*3+1];
        var tilt = math.atan2(-LEyeY + REyeY, LEyeX - REyeX) * 180 / math.pi;
        //var frame = s.match(/-?\d+/g).map(Number);
        //log('Frame: %f\n Tilt: %f', frame, tilt);
        log('Tilt: %f', tilt);
    }
    

});

//log('Watched paths %s', JSON.stringify(watcher.getWatched()));

