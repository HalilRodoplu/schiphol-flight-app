/*
    Kullanıcının biletlerinin gösterildiği componenettir. satın almış olduğu biletler ve alternatif opsiyonları gösterilmiştir.
*/

import React from 'react';
import {Toaster} from "sonner";
import FlightDirection from "@/components/ui-components/FlightDirection";
import FlightSum from "@/components/ui-components/FlightSum";
import {cn} from "@/lib/utils";
import {priceOptions} from "@/constants/priceOptions";

interface TicketsProps {
    landingTime: string
    flight: any,
    to: string,
    flightTime: string,
    departureTime: string,
    arrivalTime: string,
    isFutureDate: boolean,
    icao: string,
    mainFlight: string,
    price: number
}


const Tickets = ({landingTime, flight, to, flightTime, departureTime, arrivalTime, isFutureDate, icao, mainFlight, price}: TicketsProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4 border-purple-400 border-2 flex flex-col">
            <Toaster toastOptions={{
                classNames: {
                    toast: "bg-green-500",
                    description: "text-amber-50",
                    title: "text-amber-50"
                }
            }}/>
            <div className="flex">
                <div className="w-1/2 border-2 border-[#7C00FE] rounded-md m-2 p-2 flex flex-col justify-between">
                    <FlightDirection to={to} mainFlight={mainFlight}/>
                    <FlightSum icao={icao} to={to} flightTime={flightTime} departureTime={departureTime}
                               arrivalTime={arrivalTime}/>
                    <div className="flex flex-row justify-between items-center bottom-0">
                        <div className="w-full bottom-0 flex flex-row justify-between items-center">
                            <h3 className="opacity-75">Round Trip</h3>
                            <h3 className="font-bold text-lg text-purple-600">Price: ${price}</h3>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 border-2 border-[#7C00FE] rounded-md m-2 p-2 flex flex-col justify-between">
                    <div className="flex flex-row items-center justify-between">
                        {priceOptions.map((option, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex flex-col h-full w-full items-center justify-center m-2 p-8 border-2 rounded-md cursor-pointer",
                                    price === option.value ? "border-purple-600 bg-purple-100" : "border-slate-700 opacity-50"
                                )}
                            >
                                <h1 className="font-bold text-lg">
                                    ${option.value}
                                </h1>
                                <h6 className="text-lg">
                                    {option.label}
                                </h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Tickets;
