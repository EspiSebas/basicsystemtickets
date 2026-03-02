const agentService = require("../service/agents")


exports.create = async(req,res,next) => {
    try {
        const agent = await agentService.createAgent(req.body)
        res.status(201).json(agent)
    } catch (err) {
        next(err)
    }
}

exports.getAll = async(req,res,next) => {
    try {
        const agents = await agentService.getAll()
        res.json(agents)
    } catch (err) {
        next(err)
    }
}

exports.getById = async(req,res,next) => {
    try {
        const agent = await agentService.getById(req.params.body)
        res.json(agent)
    } catch (error) {
        next(error)
    }
}

