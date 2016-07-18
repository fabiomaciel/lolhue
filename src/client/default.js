var restify = require('restify');
var qs = require('querystring');
var fs = require('fs')

const API_ROOT = '/api/lol'
const API_KEY = fs.readFileSync(`${__dirname}/../../.key`, 'utf-8')

var client = restify.createJsonClient({
    url: "https://br.api.pvp.net"
})

var _get = (options, cb) =>{
    if(!options.query) options.query = {}
    options.query.api_key = API_KEY;

    var locale = options.locale || 'br'
    var version = options.version || '1'

    var query = qs.stringify(options.query)
    
    var uri = `${API_ROOT}/${locale}/${version}/${options.url}?${query}`
    console.log(uri);

    var promise = new Promise(function(resolve, reject){
        client.get(uri, (a,b,c,d)=>{ resolve(cb(a,b,c,d)); })
    })
    
    return promise;
    
}

function _defaultOptions(ROOT, API_VERSION){
    return (url) => {
        return {
            get version(){return API_VERSION},
            uri: url,
            get url(){
                return `${ROOT}/${this.uri}`
            },
            set url(uri){
                this.uri = uri
            }
        }
    }
}

module.exports = {
    get: _get,
    defaultOptions: _defaultOptions
}