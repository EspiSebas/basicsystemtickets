const ticketRepository = require("../repository/tickets")


exports.createTicket = async(data) => {
    if(!data.title || !data.description  || !data.client_id){
        throw new Error("The title,description and client are required")
    }

    const ticket = await ticketRepository.create(data)

    return {id,...data}

}