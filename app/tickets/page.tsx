/*
Satın alınan biletler bu sayfada gösterilmektedir buradan istek yazmış olduğumuz route'a gider ve bize state içerisinde döner
*/

"use client"
import React, {useEffect, useState} from 'react';

import {InfinitySpin} from "react-loader-spinner";
import Tickets from "@/components/ui-components/Tickets";

const TicketsPage = () => {

    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/api/tickets`);
            const ticketsData = await response.json();
            setTickets(ticketsData);
            setIsLoading(false);
        };

        fetchTickets();
    }, []);


    if (isLoading) {
        return (
            <div className="w-full h-screen bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                <InfinitySpin
                    width="100"
                    color="purple"
                />
            </div>
        );
    }


    if (tickets.length == 0) {
        return (
            <div className="w-full h-screen bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-2xl">
                There is no ticket to show
            </div>
        );
    }




    return (
        <div className="h-full w-full m-3 bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold m-1 py-2">
                Tickets
            </h1>
            {tickets.map((ticket: any, i: any) => (
                <div key={i}>
                    <Tickets
                        arrivalTime={ticket.landingTime}
                        departureTime={ticket.departureTime}
                        to={ticket.landingAirport}
                        landingTime={ticket.landingTime}
                        flightTime={ticket.flightTime}
                        isFutureDate={true}
                        icao={ticket.icao}
                        price={ticket.price}
                    />
                </div>

                ))}

        </div>
    );
};

export default TicketsPage;