import { backend } from "./api.config";

export const getAllTickets = () => backend.get("/tickets")
export const createTicket = (data:any) => backend.post("/tickets",data)
export const getTicketById = (id:number) => backend.get(`/tickets/${id}`)
export const createAssign = (id:number,data:any) => backend.patch(`/tickets/${id}/assign`,data)
export const updateStatus = (id:number,data:any) => backend.patch(`/tickets/${id}/status`,data)
export const getInfoDashboard = () => backend.get("/dashboard")


export const getAllClients = () => backend.get("/clients")
export const getClientById = (id:number) => backend.get(`/clients/${id}`)
export const createClient = (data:any) => backend.post("/clients",data)

export const getAllAgents = () => backend.get("/agents")
export const getAgentById = (id:number) => backend.get(`/agents/${id}`)
export const createAgent = (data:any) => backend.post("/agents",data)

