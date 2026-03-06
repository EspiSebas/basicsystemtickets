import { useState, useEffect } from "react";
import { getAllTickets, updateStatus, createAssign, getAllAgents, createTicket, getAllClients } from "../api/endpoint.api";
import { TableWithActions } from "../components/TableViewActions";
import ModalView from '../components/ModalView'

export const Tickets = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  const [agent, setAgent] = useState<any[]>([]);
  const [loadingAgent, setLoadingAgent] = useState(true);

  const [ticketToStatus, setTicketToStatus] = useState<any | null>(null);
  const [ticketToAssign, setTicketToAssign] = useState<any | null>(null);

  const [newStatus, setNewStatus] = useState("");
  const [resolution, setResolution] = useState("");
  const [agentId, setAgentId] = useState("");

  const [client, setClient] = useState<any[]>([]);
  const [loadingClient, setLoadingClient] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false)
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    client_id: 0
  })

  const fetchTickets = async() => {
    try {
      const res =  await getAllTickets()
      setTickets(res.data);
      setLoadingTickets(false);
    } catch (error) {
      console.error(error);
      setLoadingTickets(false);
    }
  }

  
  useEffect(() => {
    fetchTickets();
    getAllAgents()
      .then((res) => {
        setAgent(res.data);
        setLoadingAgent(false);

      })
      .catch((err) => {
        console.error(err);
        setLoadingAgent(false);
      });

    getAllClients()
      .then((res) => {
        setClient(res.data);
        setLoadingClient(false);

      })
      .catch((err) => {
        console.error(err);
        setLoadingClient(false);
      });

  }, []);


  const handleChangeStatus = async () => {
    if (!ticketToStatus) return;

    try {
      await updateStatus(ticketToStatus.id, {
        status: newStatus,
        resolution: newStatus === "RESOLVED" ? resolution : null,
      });

      setTickets(
        tickets.map((t) =>
          t.id === ticketToStatus.id
            ? { ...t, status: newStatus, resolution }
            : t
        )
      );

      setTicketToStatus(null);
      setNewStatus("");
      setResolution("");

      alert("Status updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };


  const handleAssignAgent = async () => {
    if (!ticketToAssign) return;

    try {
      await createAssign(ticketToAssign.id, { agentId: agentId });

      setTickets(
        tickets.map((t) =>
          t.id === ticketToAssign.id
            ? { ...t, agent_id: agentId }
            : t
        )
      );

      setTicketToAssign(null);
      setAgentId("");

      alert("Agent assigned successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTicket = async () => {
    try {
      const res = await createTicket(newTicket)
      fetchTickets()
      alert("Created correctly")
    } catch (error) {
      console.error(error);
    }
    setShowAddModal(false)
    setNewTicket({ title: "", description: "", client_id: 0 })
  }

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="fw-bold mb-0">Tickets</h2>
            <small className="text-muted">
              Manage your registered tickets
            </small>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-danger px-4 py-2 fw-semibold shadow-sm rounded-pill">
            <i className="bi bi-person-plus-fill me-2"></i>
            Add Ticket
          </button>

        </div>

        {loadingTickets ? (
          <p>Cargando tickets...</p>
        ) : (
          <TableWithActions
            items={tickets}
            onUpdateStatus={setTicketToStatus}
            onAssign={setTicketToAssign}
          />
        )}

        <ModalView
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false)
        }}
        title="Create New Ticket"
        content={
          <form>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={newTicket.title}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, title: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={newTicket.description}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, description: e.target.value })
                }
              />
            </div>

            <select
              className="form-control mb-3"
              value={newTicket.client_id}
              onChange={(e) => setNewTicket({...newTicket, client_id :Number(e.target.value)})}
            >
              <option value="">Select a client</option>

              {client.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <small className="text-muted mt-2">
    Select the client who created the ticket
  </small>

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
                onClick={handleCreateTicket}
              >
                Save Agent
              </button>
            </div>
          </form>
        }
      />
      </div>


      {ticketToStatus && (
        <ModalView
          show={!!ticketToStatus}
          onClose={() => setTicketToStatus(null)}
          title={`Change Status - Ticket ${ticketToStatus.id}`}
          content={
            <div>
              <label className="form-label">New Status</label>
              <select
                className="form-select mb-3"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>

              {newStatus === "RESOLVED" && (
                <>
                  <label className="form-label">Resolution</label>
                  <textarea
                    className="form-control mb-3"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                  />
                </>
              )}

              <button
                className="btn btn-warning"
                onClick={handleChangeStatus}
              >
                Update Status
              </button>
            </div>
          }
        />
      )}


      {ticketToAssign && (
        <ModalView
          show={!!ticketToAssign}
          onClose={() => setTicketToAssign(null)}
          title={`Assign Agent - Ticket ${ticketToAssign.id}`}
          content={
            <div>
              <label className="form-label">Agent ID</label>
              <select
                className="form-control mb-3"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
              >
                <option value="">Select a user</option>

                {agent.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>

              <button
                className="btn btn-primary"
                onClick={handleAssignAgent}
              >
                Assign Agent
              </button>
            </div>
          }
        />
      )}


      
    </>
  );
};