const ticketRepository = require("../repository/tickets")
const clientRepository = require("../repository/clients")
const agentRepository = require("../repository/agents")
const { response } = require("express")

exports.createTicket = async(data) => {
    if(!data.title || !data.description  || !data.client_id){
        throw new Error("The title,description and client are required")
    }

    const client = await clientRepository.findById(data.client_id)
    if(!client){
        throw new Error("The client not found")
    }

    const ticket = await ticketRepository.create(data)

    return ticket;

}


exports.getAll = async() => {
    const tickets = await ticketRepository.findAll()
    
    return tickets;
}


exports.getById = async(id) => {
    const ticket = await ticketRepository.findById(id)
    if(!ticket){
        throw new Error("Ticket not found")
    }

    return ticket;
}

exports.updateAssign = async(id,agentId) => {
    const  ticket = await ticketRepository.findById(id)

    if(!ticket){
        throw new Error("The ticket not found")
    }

    if(ticket.status !== "OPEN"){
        throw new Error("The ticket is not status OPEN")
    }

    const agent = await agentRepository.findById(agentId)

    if(!agent){
        throw new Error("Agent not found ")
    }

    const countTicket = await ticketRepository.countInProgressByAgent(agentId)
    if(countTicket >= 5){
        throw new Error("The agent has five tickets in status IN_PROGRESS")
    }

    const assign = await ticketRepository.createAssing(id,agentId)

    return { message: "Ticket assigned successfully" };
}


exports.updateStatus = async (id,status,resolution) => {
    const ticket = await ticketRepository.findById(id)

    if(!ticket){
        throw new Error("Ticket not found")
    }

 if (!ticket.agent_id && status !== "OPEN") {
   throw new Error("The ticket must have an assigned agent before changing status");
}

    if((status == "IN_PROGRESS" || status =="OPEN") && ticket.status == "RESOLVED" ){
       throw new Error("Doesnt change the status because the ticket is RESOLVED")
    }
    
    if(ticket.status == "OPEN" && status == "RESOLVED")
    {
        throw new Error("Doesnt change the status from OPEN to RESOLVED")
    }

    if(status === "RESOLVED" && (!resolution || resolution.trim() === "")){
        throw new Error("You need to write a resolution of ticket to change the status to RESOLVED")
    }

    const updateStatusInProgress = await ticketRepository.updateStatus(id,status,resolution)
    return { message: "Ticket changed successfully" };
}
