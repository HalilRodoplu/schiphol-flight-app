import React from 'react';
import {Toaster} from "sonner";
import FlightDirection from "@/components/ui-components/FlightDirection";
import FlightSum from "@/components/ui-components/FlightSum";
import {schiphol} from "@/constants/schiphol";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

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

const Tickets = ({landingTime, flight, to, flightTime, departureTime, arrivalTime, isFutureDate, icao, mainFlight, price}:TicketsProps) => {
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
                            <h3 className="font-bold text-lg text-purple-600">Price: ${schiphol.price}</h3>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 border-2 border-[#7C00FE] rounded-md m-2 p-2 flex flex-col justify-between">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col h-full w-full items-center justify-center m-2 p-8 border-2 border-slate-700 rounded-md ">
                            <h1 className="font-bold text-lg">
                                $200
                            </h1>
                            <h6 className="text-lg">
                                Main
                            </h6>
                        </div>
                        <div className="flex flex-col h-full w-full items-center justify-center m-2 p-8 border-2 border-slate-700 rounded-md">
                            <h1 className="font-bold text-lg">
                                $250
                            </h1>
                            <h6 className="text-lg">
                                Main 1
                            </h6>
                        </div>
                        <div className="flex flex-col h-full w-full items-center justify-center m-2 p-8 border-2 border-slate-700 rounded-md">
                            <h1 className="font-bold text-lg">
                                $300
                            </h1>
                            <h6 className="text-lg">
                                Main 2
                            </h6>
                        </div>
                        <div className="flex flex-col h-full w-full items-center justify-center m-2 p-8 border-2 border-slate-700 rounded-md">
                            <h1 className="font-bold text-lg">
                                $350
                            </h1>
                            <h6 className="text-lg">
                                Main 3
                            </h6>
                        </div>
                        <div className="flex flex-col h-full w-full items-center justify-center m-2 p-8 border-2 border-slate-700 rounded-md">
                            <h1 className="font-bold text-lg">
                                $400
                            </h1>
                            <h6 className="text-lg">
                                Main 4
                            </h6>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Tickets;