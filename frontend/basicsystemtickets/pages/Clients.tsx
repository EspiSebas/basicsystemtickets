import { useState, useEffect } from "react"
import { getAllClients, getClientById } from "../api/endpoint.api";
import TableView from "../components/TableView";
export const Clients = () => {
    const [clients, setClients] = useState<any[]>([]);
    const [loadingClients, setLoadingClients] = useState(true);
    useEffect(() => {
        getAllClients()
            .then(res => {
                setClients(res.data);
                setLoadingClients(false);
            })
            .catch(err => {
                console.error(err);
                setLoadingClients(false);
            });
    }, []);
    return (
        <>
            <div className="container mt-4">
                <h1 className="text-center">Users</h1>
                <TableView items={clients} />
            </div>
        </>
    )
}
