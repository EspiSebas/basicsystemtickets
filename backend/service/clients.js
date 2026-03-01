const clientRepository = require("../repository/clients")


exports.createClient = async(data) => {
     if(!data.name || !data.email){
        throw new Error('The name and email are required!!!');
    }

    const id = await clientRepository.create(data);
    return { id, ...data };
}

exports.findById = async(id) => {
    const data = await clientRepository.findById(id)
    if(!data){
        throw new Error("Client not found");
    }

    return data;
}

exports.findAll = async() => {
    const data = await clientRepository.findAll()

    if(length(data) == 0){
        return "There is not data";
    }
    
    return data;
}