
'use strict'

var client = require('./default')

const API_VERSION = 'v1.4'
const ROOT = 'summoner'

var getOptions = client.defaultOptions(ROOT, API_VERSION)

exports.byName = (name) => {  
    var options = getOptions(`by-name/${name}`);
    return client.get(options, (err, creq, cres, obj) => {
            return obj;
        });
}