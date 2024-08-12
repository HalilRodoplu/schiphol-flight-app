import React from 'react';
import {Button} from "@/components/ui/button";
import FlightSum from "@/components/ui-components/FlightSum";
import FlightDirection from "@/components/ui-components/FlightDirection";
import {cn} from "@/lib/utils"
import {schiphol} from "@/constants/schiphol";

interface FlightProps {
    id: string,
    landingTime: string
    flight: any,
    to: string,
    flightTime: string,
    departureTime: string,
    arrivalTime: string,
    isFutureDate: boolean,
    icao: string
}


const Flight = ({
                    id,
                    landingTime,
                    flight,
                    to,
                    flightTime,
                    departureTime,
                    arrivalTime,
                    isFutureDate,
                    icao
                }: FlightProps) => {

    const clickHandler = () => {
        console.log("clicked")
    }

    return (

        <div className="bg-white p-4 rounded-lg shadow mb-4 border-purple-400 border-2 flex flex-col">
            <FlightDirection to={to}/>
            {/*<h3 className="text-xl font-bold text-gray-800 mb-2">{id}</h3>*/}
            {/*<p className="text-gray-700">{landingTime}</p>*/}
            <FlightSum icao={icao} to={to} flightTime={flightTime} departureTime={departureTime} arrivalTime={arrivalTime}/>
            <div className="flex flex-row justify-between items-center">
                <div className="bottom-0">
                    <h3 className="font-bold text-lg text-purple-600">Price: ${schiphol.price}</h3>
                    <h3 className="opacity-75">Round Trip</h3>
                </div>
                <div className={isFutureDate ? "hover:scale-110 duration-500": ""}>
                    <Button
                        className={cn("h-10 w-28", isFutureDate ? "" : "cursor-not-allowed")}
                        variant={isFutureDate ? "purple" : "purple_outline"}
                        onClick={clickHandler}
                        disabled={!isFutureDate}
                    >
                        Book Flight
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Flight;