import { useState, useEffect } from "react";
import { getAllTickets, updateStatus, createAssign } from "../api/endpoint.api";
import { TableWithActions } from "../components/TableViewActions";
import ModalView from '../components/ModalView'

export const Tickets = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  const [ticketToStatus, setTicketToStatus] = useState<any | null>(null);
  const [ticketToAssign, setTicketToAssign] = useState<any | null>(null);

  const [newStatus, setNewStatus] = useState("");
  const [resolution, setResolution] = useState("");
  const [agentId, setAgentId] = useState("");


  useEffect(() => {
    getAllTickets()
      .then((res) => {
        setTickets(res.data);
        setLoadingTickets(false);
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
        setLoadingTickets(false);
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
      await createAssign(ticketToAssign.id, agentId);

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

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4 fw-bold">Tickets</h2>

        {loadingTickets ? (
          <p>Cargando tickets...</p>
        ) : (
          <TableWithActions
            items={tickets}
            onUpdateStatus={setTicketToStatus}
            onAssign={setTicketToAssign}
          />
        )}
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
              <input
                type="number"
                className="form-control mb-3"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
              />

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