
import { Table, Button } from "react-bootstrap";

export default function TableView({ items,onUserSelect }:any) { 
  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item:any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => onUserSelect(item)}
                >
                  Ver Detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
     
    </>
  );
}
