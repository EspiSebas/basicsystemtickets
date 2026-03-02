const ticketService = require("../service/tickets")


exports.create = async(req,res,next)=>{
    try {
        const ticket = await ticketService.createTicket(req.body)
        res.status(201).json(ticket)
    } catch (err) {
        next(err)
    }
}

exports.getAll = async(req,res,next) => {
    try {
        const tickets = await ticketService.getAll()
        res.json(tickets)
    } catch (err) {
        next(err)
    }
}


exports.getById = async(req,res,next) => {
    try {
        const ticket = await ticketService.getById(req.params.id)
        res.json(ticket)
    } catch (err) {
        next(err)
    }
}


exports.updateStatus = async(req,res,next) => {
    try {
        const { id } = req.params;
        const { status,resolution } = req.body;
        const statusTicket = await ticketService.updateStatus(id,status,resolution)
        res.status(200).json(statusTicket)
    } catch (error) {
        next(error)
    }
}


exports.createAssign = async(req,res,next) => {
    try {
        const { id } = req.params;
        const { agentId } = req.body;
        const assign = await ticketService.updateAssign(id, agentId)
        res.status(200).json(assign)
    } catch (error) {
        next(error)
    }
}