import { useState, useEffect } from "react"
import { getAllAgents } from "../api/endpoint.api";
import TableView from "../components/TableView";
export const Agents = () => {
    const [agents, setAgents] = useState<any[]>([]);
    const [loadingAgent, setLoadingAgents] = useState(true);
    useEffect(() => {
        getAllAgents()
            .then(res => {
                setAgents(res.data);
                setLoadingAgents(false);
            })
            .catch(err => {
                console.error(err);
                setLoadingAgents(false);
            });
    }, []);
    return (
        <>
            <div className="container mt-4">
                <h1>Agents</h1>
                <TableView items={agents} />
            </div>
        </>
    )
}
