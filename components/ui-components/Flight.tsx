import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import FlightSum from "@/components/ui-components/FlightSum";
import FlightDirection from "@/components/ui-components/FlightDirection";
import {cn} from "@/lib/utils"
import {schiphol} from "@/constants/schiphol";
import {toast, Toaster} from "sonner";

interface FlightProps {
    landingTime: string
    flight: any,
    to: string,
    flightTime: string,
    departureTime: string,
    arrivalTime: string,
    isFutureDate: boolean,
    icao: string,
    mainFlight: string
}


const Flight = ({
                    landingTime,
                    flight,
                    to,
                    flightTime,
                    departureTime,
                    arrivalTime,
                    isFutureDate,
                    icao,
                    mainFlight
                }: FlightProps) => {

    const [isLoading, setIsLoading] = useState(false);


    const postTicket = async (ticketData: any) => {
        const response = await fetch("/api/tickets", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData)
        })
        console.log("response-------", response)
        const data = await response.json()
        console.log("data------", data)
        if (!data.error) {
            toast.success('Successfully bought a ticket!');
            console.log("Ticked saved------ ", data.ticket)
        } else {
            toast.error('Something went wrong!');
            console.log("Error saving ticket-----", data.error)
        }
    }

    const clickHandler = async () => {
        if (isLoading) return;
        setIsLoading(true);
        console.log("clicked");
        const ticketData = {
            landingTime: arrivalTime,
            flight,
            landingAirport: to,
            flightTime,
            departureTime,
            departureAirport: schiphol.airportCode,
            arrivalTime,
            isFutureDate,
            icao,
            price: schiphol.price,
            mainFlight: mainFlight
        };
        console.log("ticketData: ", ticketData);

        await postTicket(ticketData);
        setIsLoading(false);
    };

    return (

        <div className="bg-white p-4 rounded-lg shadow mb-4 border-purple-400 border-2 flex flex-col">
            <Toaster toastOptions={{
                classNames: {
                    toast: "bg-green-500",
                    description: "text-amber-50",
                    title: "text-amber-50"
                }
            }}/>
            <FlightDirection to={to} mainFlight={mainFlight}/>
            <FlightSum icao={icao} to={to} flightTime={flightTime} departureTime={departureTime}
                       arrivalTime={arrivalTime}/>
            <div className="flex flex-row justify-between items-center bottom-0">
                <div className="bottom-0">
                    <h3 className="font-bold text-lg text-purple-600">Price: ${schiphol.price}</h3>
                    <h3 className="opacity-75">Round Trip</h3>
                </div>
                <div className={isFutureDate ? "hover:scale-110 duration-500" : ""}>
                    <Button
                        className={cn("h-10 w-28", isFutureDate ? "" : "cursor-not-allowed")}
                        variant={isFutureDate ? "purple" : "purple_outline"}
                        onClick={clickHandler}
                        disabled={!isFutureDate || isLoading}
                    >
                        {isLoading ? "Booking..." : "Book Flight"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Flight;