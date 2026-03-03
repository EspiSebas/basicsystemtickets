import { Table, Button, Badge } from "react-bootstrap";

interface Ticket {
  id: number;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  client_id: number;
  agent_id?: number| null;
  resolution:string;
  created_at: string;
}

interface Props {
  items: Ticket[];
  onAssign?: (ticket: Ticket) => void;
  onUpdateStatus?: (ticket: Ticket) => void;
}

export const TableWithActions = ({ items, onAssign, onUpdateStatus }: Props) => {
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "OPEN":
        return "secondary";
      case "IN_PROGRESS":
        return "warning";
      case "RESOLVED":
        return "success";
      default:
        return "light";
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Client</th>
          <th>Agent</th>
          <th>Status</th>
          <th>Resolution</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.client_id}</td>
            <td>{item.agent_id ?? "-"}</td>

            <td>
              <Badge bg={getStatusVariant(item.status)}>
                {item.status}
              </Badge>
            </td>

            <td>{new Date(item.created_at).toLocaleDateString()}</td>
             <td>{item.resolution ?? "-"}</td>
            <td>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => onAssign?.(item)}
              >
                Assign Agent
              </Button>

              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onUpdateStatus?.(item)}
              >
                Update Status
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};