"use strict"
const chokidar = require('chokidar');

const directory = process.argv[2];

var watcher = chokidar.watch(directory, {
    ignored: /(^|[\/\\])\../,
    persistent: true
});

var log = console.log.bind(console);

watcher.on('add', path => log(`File ${path} has been added`));

