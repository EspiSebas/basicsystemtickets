import { useState, useEffect } from "react"
import { createAgent, getAgentById, getAllAgents } from "../api/endpoint.api";
import TableView from "../components/TableView";
import ModalView from "../components/ModalView"

interface Agent {
    id: number;
    name: string;
    email: string;
    in_progress: number;
    resolved: number;
}

export const Agents = () => {

    const [agents, setAgents] = useState<Agent[]>([]);
    const [loadingAgents, setLoadingAgents] = useState(true);

    const [infoAgent, setInfoAgent] = useState<Agent | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [loadingInfoAgent, setLoadingInfoAgent] = useState(false);
    const [newAgent, setNewAgent] = useState({
        name: "",
        email: ""
    });

    const fetchAgents = async () => {
        try {
            setLoadingAgents(true);
            const res = await getAllAgents();
            setAgents(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAgents(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    const handlerAgentSelected = async (agent: Agent) => {
        setSelectedAgent(agent);
        setShowModal(true);
        setLoadingInfoAgent(true);

        try {
            const res = await getAgentById(agent.id);
            setInfoAgent(res.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingInfoAgent(false);
        }
    };

    const handleCreateAgent = async () => {
        try {
            const res = await createAgent(newAgent)
            alert("Created correctly")
            await fetchAgents();
        } catch (error) {
            console.error(error);
        }
        setShowAddModal(false);
        setNewAgent({ name: "", email: "" });
    };

    return (
        <>
            <div className="container mt-5">

                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div>
                                <h2 className="fw-bold mb-0">Agents</h2>
                                <small className="text-muted">
                                    Manage support agents
                                </small>
                            </div>

                            <button
                                onClick={() => setShowAddModal(true)}
                                className="btn btn-danger px-4 py-2 fw-semibold shadow-sm rounded-pill"
                            >
                                <i className="bi bi-person-plus-fill me-2"></i>
                                Add Agent
                            </button>

                        </div>

                        {loadingAgents ? (
                            <p className="text-center">Loading agents...</p>
                        ) : (
                            <TableView
                                items={agents}
                                onUserSelect={handlerAgentSelected}
                            />
                        )}

                    </div>
                </div>
            </div>

            <ModalView
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setInfoAgent(null);
                }}
                title={`Information of ${selectedAgent?.name}`}
                content={
                    loadingInfoAgent ? (
                        <p>Loading agent info...</p>
                    ) : infoAgent ? (
                        <div>
                            <h5 className="fw-bold">{infoAgent.name}</h5>
                            <p><strong>Email:</strong> {infoAgent.email}</p>

                            <hr />

                            <h6 className="mt-3">Tickets Summary</h6>

                            <div className="d-flex gap-3">
                                <span className="badge bg-warning text-dark px-3 py-2">
                                    In Progress: {infoAgent.in_progress}
                                </span>

                                <span className="badge bg-success px-3 py-2">
                                    Resolved: {infoAgent.resolved}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p>No data available</p>
                    )
                }


            />

            <ModalView
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Create New Agent"
                content={
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newAgent.name}
                                onChange={(e) =>
                                    setNewAgent({ ...newAgent, name: e.target.value })
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={newAgent.email}
                                onChange={(e) =>
                                    setNewAgent({ ...newAgent, email: e.target.value })
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
                                onClick={handleCreateAgent}
                            >
                                Save Agent
                            </button>
                        </div>
                    </form>
                }
            />
        </>
    )
}