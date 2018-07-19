"use strict"
const fs = require('fs');

const log = console.log.bind(console);

const filename = process.argv[2];

var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));

console.log(JSON.stringify(obj, null, 2));

if(obj.people === undefined || obj.people.length == 0)
{
    log('Has no peeps');
} else {
    log("Has peeps");
    var pose = obj.people[0].pose_keypoints_2d;
    log(pose);
}
