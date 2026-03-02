const exp = require('express')
const router = exp.Router()
const clients = require("../controllers/clients")
const agents = require("../controllers/agents")

module.exports = function(){

    // route of clients
    router.get('/clients',clients.getAll)
    router.post('/clients',clients.create)
    router.get('/clients/:id',clients.getById)
   
    // route of agents
    router.get('/agents',agents.getAll)
    router.post('/agents',agents.create)
    router.get('/agents/:id',agents.getById)

    return router;
}

