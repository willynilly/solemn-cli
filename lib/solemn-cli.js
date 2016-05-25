#! /usr/bin/env node

var commandLineArgs = require('command-line-args');
var gulp = require('gulp');
var gulpSolemn = require('gulp-solemn');
var _ = require('lodash');
var end = require('stream-end');

var cliDefs = [{
    name: 'files',
    alias: 'f',
    multiple: true,
    description: 'A list of glob patterns for the files you want searched. Example: ./app/**/*.js ./app/**/*.css',
    type: String,
    typeLabel: '<pattern> [<pattern>]*'
}, {
    name: 'dictionary',
    alias: 'd',
    description: 'A file path to a dictionary.  If this option is not used, it will use a default dictionary. The custom dictionary file is a JSON file containing a single JSON object.  The keys of the object are words in the dictionary and the values for each key is an array of category tags.  Example: {"hell": ["religious", "rude"], "babe": ["sexist"]}',
    type: String,
    typeLabel: '<path>'
}, {
    name: 'json',
    alias: 'j',
    description: 'Output violations to the console as JSON.',
    type: Boolean,
}];

var cli = commandLineArgs(cliDefs);
var options = cli.parse();

if ('files' in options && options.files.length > 0) {
    options.files = _.map(options.files, function(f) {
        return f.trim();
    });
} else {
    console.log(cli.getUsage(cliDefs));
    return;
}

var dictionaries = [];
var prevJson = null;
if (options.dictionary !== undefined && options.dictionary !== null) {
    dictionaries.push(options.dictionary);
}

var fileViolationsCallback = function(fileName, violations, violationMessages) {
    if (options.json) {
        if (prevJson) {
            console.log(prevJson + ',');
        }
        prevJson = _.map(violations, function(v) {
            return JSON.stringify(v);
        }).join(',');
    }
};

var options2 = {
    dictionaries: dictionaries,
    fileViolationsCallback: fileViolationsCallback,
    printViolationMessages: !options.json
};
var solemn = gulpSolemn(options2);

if (options.json) {
    console.log('[');
}

gulp.src(options.files)
    .pipe(solemn)
    .pipe(end(function() {
        if (options.json) {
            if (prevJson) {
                console.log(prevJson);
            }
            console.log(']');
        }
    }));
