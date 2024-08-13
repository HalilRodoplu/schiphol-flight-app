"use client"

import React, {useState, useEffect} from 'react';
import Flight from "@/components/ui-components/Flight";
import {InfinitySpin,} from "react-loader-spinner";
import {availableFlights} from "@/constants/availableFlights";
import FlightDirection from "@/components/ui-components/FlightDirection";

interface FlightProps {
    flight?: object,
    estimatedLandingTime?: string,
    scheduleTime?: string,
    scheduleDateTime?: string,
    actualLandingTime?: string,
    prefixICAO?: string
}

const Flights = () => {

    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0); // Başlangıç sayfası 0
    const itemsPerPage = 5

    useEffect(() => {
        fetchFlights();
    }, [page]); // Sayfa numarası değiştiğinde yeniden fetch yapar

    const fetchFlights = () => {
        const apiUrl = `/api/proxy?page=${page}`;
        setIsLoading(true);

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFlights(data.flights);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 0)); // Sayfa 0'ın altına düşmesin
    };

    const handlePageClick = (pageNumber:number) => {
        setPage(pageNumber);
    };

    const startPage = Math.floor(page / itemsPerPage) * itemsPerPage;
    const endPage = startPage + itemsPerPage;


    // console.log("flights----", flights);


    function formatDateTime(isoString:string, formatType:string) {
        const date = new Date(isoString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başladığı için +1 ekliyoruz
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        if (formatType === 'time') {
            return `${hours}:${minutes}:${seconds}`;
        } else { // Varsayılan olarak 'date' ya da diğer tüm değerler için tarih ve saat döndür
            return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        }
    }

    function getTimeDifference(startTime:string, endTime:string) {
        const start: any = new Date(startTime);
        const end: any = new Date(endTime);

        if (end < start) {
            end.setDate(end.getDate() + 1);
        }

        const diffMs = end - start;

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

    const isFuture = (dateString: string) => {
        const inputDate = new Date(dateString);
        const now = new Date();

        return inputDate > now
    }

    if (isLoading) {
        return (
            <div className="w-3/4 h-screen bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                <InfinitySpin
                    width="100"
                    color="purple"
                />
            </div>
        );
    }


    return (
        <div className="w-3/4 h-screen bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div className="overflow-y-auto flex-grow">
                {availableFlights.map((availableFlight) => (
                    <Flight
                        key={availableFlight.id}
                        mainFlight={availableFlight.mainFlight}
                        arrivalTime={formatDateTime(availableFlight.actualLandingTime, "time")}
                        departureTime={formatDateTime(availableFlight.scheduleDateTime, "time")}
                        to={availableFlight.route.destination}
                        flightTime={getTimeDifference(availableFlight.scheduleDateTime, availableFlight.actualLandingTime)}
                        isFutureDate={isFuture(availableFlight.actualLandingTime)}
                        icao={availableFlight.prefixICAO}
                    />
                ))}

                {flights.map((flight, i) => (
                    <Flight
                        key={i}
                        mainFlight={flight.mainFlight}
                        arrivalTime={flight.estimatedLandingTime ? formatDateTime(flight.estimatedLandingTime, "time") : "Time value not found!"}
                        departureTime={flight.scheduleTime}
                        to={flight.route.destinations}
                        landingTime={flight.landingTime ? formatDateTime(flight.estimatedLandingTime, "time") : "Time value not found!"}
                        flightTime={getTimeDifference(flight.scheduleDateTime, flight.estimatedLandingTime)}
                        isFutureDate={isFuture(flight.actualLandingTime)}
                        icao={flight.prefixICAO}
                    />
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