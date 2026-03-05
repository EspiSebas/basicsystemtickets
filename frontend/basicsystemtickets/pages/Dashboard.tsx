import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react"
import { getAllTickets, getInfoDashboard } from "../api/endpoint.api";
import { CardInfo } from "../components/CardInfo";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
export const Dashboard = () => {
    const [dashboard, setDashboard] = useState({
        total: 0,
        open: 0,
        inProgress: 0,
        resolved: 0
    });
    const [tickets, setTickets] = useState<any[]>([]);
    const [loadingTickets, setLoadingTickets] = useState(true);
    const [loadingDashboard, setLoadingDashboard] = useState(true);

    useEffect(() => {
        getInfoDashboard()
            .then((res) => {
                setDashboard(res.data);
                setLoadingDashboard(false);

            })
            .catch((err) => {
                console.error(err);
                setLoadingDashboard(false);
            });

        getAllTickets()
            .then((res) => {
                setTickets(res.data)
                setLoadingTickets(false)
            })
            .catch((err) => {
                console.error(err);
                setLoadingTickets(false);
            });
    }, []);

    const data = {
        labels: ["Open", "In Progress", "Resolved"],
        datasets: [
            {
                data: [dashboard.open, dashboard.inProgress, dashboard.resolved],
                backgroundColor: [
                    "#ffc107",
                    "#0dcaf0",
                    "#198754"
                ],
                borderWidth: 1
            }
        ]
    };


    return (
        <div className="container mt-4">
            <h2 className="text-center">Dashboard</h2>

            <div className="row">
                <CardInfo
                    title="Total Tickets"
                    value={dashboard.total}
                    color="primary"
                    icon={<i className="bi bi-ticket-perforated"></i>}
                />

                <CardInfo
                    title="Open"
                    value={dashboard.open}
                    color="warning"
                    icon={<i className="bi bi-exclamation-triangle"></i>}
                />

                <CardInfo
                    title="In Progress"
                    value={dashboard.inProgress}
                    color="info"
                    icon={<i className="bi bi-arrow-repeat"></i>}
                />

                <CardInfo
                    title="Resolved"
                    value={dashboard.resolved}
                    color="success"
                    icon={<i className="bi bi-check-circle"></i>}
                />
            </div>
            <div className="row mt-4">

                <div className="col-md-6">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                            <h6 className="mb-3">Tickets Status</h6>
                            <div style={{ height: "300px" }}>
                                <Pie data={data} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                            <h6 className="mb-3">Recent Tickets</h6>

                            <table className="table table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.slice(0, 5).map(ticket => (
                                        <tr key={ticket.id}>
                                            <td>{ticket.id}</td>
                                            <td>{ticket.title}</td>
                                            <td>{ticket.status}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            </div>


        </div>


    )
}
