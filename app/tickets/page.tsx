"use client"
import React, {useEffect, useState} from 'react';

const TicketsPage = () => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/api/tickets`);
            const ticketsData = await response.json();
            setTickets(ticketsData); // Veriyi state'e kaydedin
        };

        fetchTickets();
    }, []); // Boş bağımlılık dizisi, effect'in sadece component mount edildiğinde çalışmasını sağlar


    return (
        <div>
            <h1>Tickets</h1>
            {tickets.map((ticket:any, i: any) => (
                <div key={i}>{ticket.departureTime}</div>
            ))}

        </div>
    );
};

export default TicketsPage;