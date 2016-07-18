var restify = require('restify')
var server = restify.createServer()


var lolClient = require('./client')

server.get('/:name', (req, res) => {
   lolClient.summoner.byName(req.params.name).then( summ => {
       res.send(summ)
   })
})

server.listen(3000)
