const agentRepository = require("../repository/agents")

exports.createAgent = async(data) => {
    if(!data.name || !data.email){
        throw new Error('The name and email are required!!!');
    }

    const id = await agentRepository.create(data);

    return {id,...data}
}


exports.findById = async(id) => {
    const info = await agentRepository.findById(id)

    if(!info){
        throw new Error("The agents not found")
    }

    return info;

}

exports.findAll = async() => {
    const data = await agentRepository.findAll()
     if(!data){
        throw new Error("Agents not found");
    }
    return data;
}