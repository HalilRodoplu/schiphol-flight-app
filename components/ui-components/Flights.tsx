/*
    Bütün uçuşların gösterildiği asıl componenetimizdir. Filtre pagination gibi işlemler bu componenette yapılmıştır.
*/

"use client";

import React, {useState, useEffect} from 'react';
import Flight from "@/components/ui-components/Flight";
import {InfinitySpin} from "react-loader-spinner";
import {availableFlights} from "@/constants/availableFlights";
import TopFilter from "@/components/ui-components/TopFilter";

interface FlightData {
    id: string;
    mainFlight: string;
    estimatedLandingTime?: string;
    scheduleTime?: string;
    scheduleDateTime?: string;
    actualLandingTime?: string;
    prefixICAO?: string;
    route: {
        destination: string;
        destinations?: string;
    };
    landingTime?: string;
}



const Flights = () => {

    // stateler ayarlanmıştır

    const [flights, setFlights] = useState<FlightData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchFlights();
    }, [page]);


    // api proxye atılan get isteğiyle veri döndürülmüştür
    const fetchFlights = async () => {
        const apiUrl = `/api/proxy?page=${page}`;
        setIsLoading(true);

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFlights(data.flights);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // pagination işlemi için yazılmış olan fonksiyonlar

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 0)); // Sayfa 0'ın altına düşmesin
    };

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const handlePriceSelection = (price: number) => {
        setSelectedPrice(price);
    };

    const startPage = Math.floor(page / itemsPerPage) * itemsPerPage;
    const endPage = startPage + itemsPerPage;

    // uçuş süresini hesaplamak için yazılmış fonksiyon

    function formatDateTime(isoString: string, formatType: string) {
        const date = new Date(isoString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başladığı için +1 ekliyoruz
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        if (formatType === 'time') {
            return `${hours}:${minutes}:${seconds}`;
        } else {
            return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        }
    }

    function getTimeDifference(startTime: string, endTime: string) {
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (end < start) {
            end.setDate(end.getDate() + 1);
        }

        const diffMs = end.getTime() - start.getTime();

        const hours = Math.floor(diffMs / 3600000);
        const minutes = Math.floor((diffMs % 3600000) / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);

        let result = '';
        if (hours > 0) {
            result += `${hours}h`;
        }
        if (minutes > 0) {
            result += ` ${minutes}m`;
        }
        if (seconds > 0) {
            result += ` ${seconds}s`;
        }
        return result.trim();
    }

    // şu anki saat geçildiyse bilet alınmasını engellemek için yazılmış fonksiyon

    const isFuture = (dateString: string) => {
        const inputDate = new Date(dateString);
        const now = new Date();

        return inputDate > now;
    };

    // bilet satın alırken kullanılan post isteği

    const postTicket = async (ticketData: any) => {
        const response = await fetch("/api/tickets", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData)
        });
        const data = await response.json();
        if (!data.error) {
            console.log('Ticket successfully posted:', data.ticket);
        } else {
            console.error('Error posting ticket:', data.error);
        }
    };

    const handleBooking = async (flight: FlightData) => {
        if (selectedPrice === null) {
            console.error('Please select a price before booking.');
            return;
        }

        const ticketData = {
            flight,
            price: selectedPrice,
        };

        await postTicket(ticketData);
    };

    // sayfa yüklenirken kullanılan loader

    if (isLoading) {
        return (
            <div className="w-3/4 h-screen bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                <InfinitySpin width="100" color="purple" />
            </div>
        );
    }

    return (
        <div className="w-3/4 h-screen bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between">
            <TopFilter/>
            <div className="overflow-y-auto flex-grow">
                {availableFlights.map((availableFlight) => (
                    <Flight
                        key={availableFlight.id}
                        mainFlight={availableFlight.mainFlight}
                        arrivalTime={formatDateTime(availableFlight.actualLandingTime || '', "time")}
                        departureTime={formatDateTime(availableFlight.scheduleDateTime || '', "time")}
                        to={availableFlight.route.destination}
                        flightTime={getTimeDifference(availableFlight.scheduleDateTime || '', availableFlight.actualLandingTime || '')}
                        isFutureDate={isFuture(availableFlight.actualLandingTime || '')}
                        icao={availableFlight.prefixICAO}
                    />
                ))}

                {flights.map((flight, i) => (
                    <div key={i} className="mb-4">
                        <Flight
                            mainFlight={flight.mainFlight}
                            arrivalTime={flight.estimatedLandingTime ? formatDateTime(flight.estimatedLandingTime, "time") : "Time value not found!"}
                            departureTime={flight.scheduleTime || "Time value not found!"}
                            to={flight.route.destinations || "Destination not found!"}
                            landingTime={flight.landingTime ? formatDateTime(flight.estimatedLandingTime || '', "time") : "Time value not found!"}
                            flightTime={getTimeDifference(flight.scheduleDateTime || '', flight.estimatedLandingTime || '')}
                            isFutureDate={isFuture(flight.actualLandingTime || '')}
                            icao={flight.prefixICAO || ''}
                        />
                    </div>
                ))}
            </div>

            <div className="paginator flex justify-center mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 0}
                    className="border border-purple-800 text-purple-800 px-4 py-2 mx-1 rounded"
                >
                    Previous
                </button>

                {[...Array(itemsPerPage)].map((_, index) => {
                    const pageNumber = startPage + index;
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageClick(pageNumber)}
                            className={`border border-purple-800 text-purple-800 px-4 py-2 mx-1 rounded ${pageNumber === page ? 'bg-purple-800 text-white' : ''}`}
                        >
                            {pageNumber + 1}
                        </button>
                    );
                })}

                <button
                    onClick={handleNextPage}
                    className="border border-purple-800 text-purple-800 px-4 py-2 mx-1 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Flights;
