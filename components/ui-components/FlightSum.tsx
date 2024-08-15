/*
    Flight componentinin içerisinde ortada dönen uçuşun kalkış iniş saatini yönünü uçuş süresini gösteren componenettir.
*/

import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlaneDeparture, faPlaneArrival, faPlane} from "@fortawesome/free-solid-svg-icons";
import {schiphol} from "@/constants/schiphol";

interface FlightSumProps {

    departureTime: string,
    airline: string,
    flightTime: string,
    arrivalTime: string,
    departureAirport: string,
    arrivalAirport: string,
    to: string,
    icao: string
}

const FlightSum = ({departureTime, airline, flightTime, arrivalTime, departureAirport, arrivalAirport, to, icao}:FlightSumProps) => {
    return (
        <div className="flex flex-row justify-between m-1 p-1 items-center border-2 border-gray-300 rounded-md border-b-4 border-r-4">
            <div className="flex flex-col justify-center items-center">
                <h6>  Departure <FontAwesomeIcon icon={faPlaneDeparture}/></h6>
                <h4>{departureTime}</h4>
                <h6 className="font-bold">Airport: {schiphol.airportCode}</h6>
            </div>
            <div className="h-0.5 w-48 bg-gray-800"></div>
            <div className="flex flex-col justify-center items-center">
                <h6>{icao}</h6>
                <h4>
                    <FontAwesomeIcon icon={faPlane}/>
                </h4>
                <h6>{flightTime} </h6>
            </div>
            <div className="h-0.5 w-48 bg-gray-800"></div>
            <div className="flex flex-col justify-center items-center">
                <h6>
                    <FontAwesomeIcon icon={faPlaneArrival}/>
                    Arrival
                </h6>
                <h4>{arrivalTime}</h4>
                <h6 className="font-bold">Airport: {to}</h6>
            </div>
        </div>
    );
};

export default FlightSum;