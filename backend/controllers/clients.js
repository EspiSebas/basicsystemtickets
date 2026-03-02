const clientService = require("../service/clients")


exports.create = async (req,res,next) => {
    try{
        const client = await clientService.createClient(req.body);
        res.status(201).json(client)
    } catch(err){
        next(err)
    }
}

exports.getAll = async (req,res,next) => {
    try{
        const client = await clientService.findAll();
        res.json(client)
    } catch(err){
        next(err)
    }
}

exports.getById = async (req,res,next) => {
    try{
        const client = await clientService.findById(req.params.id);
        res.json(client)
    } catch(err){
        next(err)
    }
}