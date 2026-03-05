import { useState, useEffect } from "react"
import { getAllClients, getClientById,createClient } from "../api/endpoint.api";
import TableView from "../components/TableView";
import ModalView from "../components/ModalView"


export const Clients = () => {
    const [clients, setClients] = useState<any[]>([]);
    const [loadingClients, setLoadingClients] = useState(true);
    const [infoClient, setInfoClient] = useState<any | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [loadingInfoClient, setLoadingInfoClient] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
     const [newClient, setNewClient] = useState({
        name: "",
        email: ""
    });

    const fetchClient = async() => {
        try {
            setLoadingClients(true)
            const res = await getAllClients()
            setClients(res.data);
        } catch (error) {
            console.log(error)
        }finally{
            setLoadingClients(false)
        }
    }
    useEffect(() => {
        fetchClient();
    }, []);

    const handleCreateClient = async () => {
            try {
                const res =  await createClient(newClient)
                alert("Created correctly")
                await fetchClient();
            } catch (error) {
                console.error(error);
            }
            setShowAddModal(false);
            setNewClient({ name: "", email: "" });
        };

    const handleClientSelected = async (client: any) => {
        setSelectedClient(client)
        setShowModal(true);
        setLoadingInfoClient(true)

        try {
            const res = await getClientById(client.id)
            setInfoClient(res.data)
        } catch (error) {
            alert(error)
        } finally {
            setLoadingInfoClient(false)
        }
    }
    return (
        <div className="container mt-5">

            <div className="card border-0 shadow-sm">
                <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>
                            <h2 className="fw-bold mb-0">Users</h2>
                            <small className="text-muted">
                                Manage your registered users
                            </small>
                        </div>

                        <button className="btn btn-danger px-4 py-2 fw-semibold shadow-sm rounded-pill" onClick={()=> setShowAddModal(true)}>
                            <i className="bi bi-person-plus-fill me-2"></i>
                            Add User
                        </button>

                    </div>

                    <TableView items={clients} onUserSelect={handleClientSelected} />

                </div>
            </div>
            <ModalView
                show={showModal}
                onClose={() => setShowModal(false)}
                title={`Information of ${selectedClient?.name}`}
                content={
                    loadingInfoClient ? (
                        <p>Loading client info...</p>
                    ) : infoClient ? (
                        <div>
                            <h5>{infoClient.name}</h5>
                            <p><strong>Email:</strong> {infoClient.email}</p>

                            <h6 className="mt-3">Tickets</h6>

                            {infoClient.tickets.length === 0 ? (
                                <p>No tickets assigned</p>
                            ) : (
                                <ul className="list-group">
                                    {infoClient.tickets.map(ticket => (
                                        <li key={ticket.id} className="list-group-item">
                                            <strong>{ticket.title}</strong>
                                            <div>Status: {ticket.status}</div>
                                            <small>
                                                Created: {new Date(ticket.created_at).toLocaleDateString()}
                                            </small>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <p>No data available</p>
                    )
                }
            />
            
            <ModalView
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Create New Client"
                content={
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newClient.name}
                                onChange={(e) =>
                                    setNewClient({ ...newClient, name: e.target.value })
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={newClient.email}
                                onChange={(e) =>
                                    setNewClient({ ...newClient, email: e.target.value })
                                }
                            />
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowAddModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleCreateClient}
                            >
                                Save Agent
                            </button>
                        </div>
                    </form>
                }
            />
        </div>

    )
}
