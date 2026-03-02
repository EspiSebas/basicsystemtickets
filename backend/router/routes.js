const exp = require('express')
const router = exp.Router()
const clients = require("../controllers/clients")
const agents = require("../controllers/agents")
const tickets = require("../controllers/tickets")

module.exports = function(){

    // route of clients
    router.get('/clients',clients.getAll)
    router.post('/clients',clients.create)
    router.get('/clients/:id',clients.getById)
   
    // route of agents
    router.get('/agents',agents.getAll)
    router.post('/agents',agents.create)
    router.get('/agents/:id',agents.getById)

    // roite of tickets
    router.get('/tickets',tickets.getAll)
    router.post('/tickets',tickets.create)
    router.get('/tickets/:id',tickets.getById)
    router.patch('/tickets/:id/assign',tickets.createAssign)
    router.patch('/tickets/:id/status',tickets.updateStatus)

    return router;
}

