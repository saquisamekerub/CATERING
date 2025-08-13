import React, { useEffect, useState } from "react";
import "./TransactionHistory.css";  // Assuming this file path is correct
import Navbar from "../Navbar/Navbar";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    // Fetch transactions from the backend
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch("http://localhost/Integ_Prog_DBCon/getReservations.php", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                console.log("Fetched data:", data); // Log fetched data for debugging
                if (data.status === "success" && data.data) {
                    setTransactions(data.data);  // Adjust based on your API response structure
                } else {
                    setError("Failed to load transaction data.");
                    console.error("Failed to fetch transactions:", data.message);
                }
            } catch (error) {
                setError("Error fetching transactions.");
                console.error("Fetch error:", error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>TRANSACTION HISTORY</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="transaction-list">
                    {transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <div key={transaction.final_order_id} className="transaction-item">
                                <div className="transaction-details">
                                    <p>Final Order ID: {transaction.final_order_id || "N/A"}</p>
                                    <p>Event ID: {transaction.event_id || "N/A"}</p>
                                    <p>Equipment Package ID: {transaction.equip_pckg_id || "N/A"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-transactions-message">No transactions available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default TransactionHistory;
