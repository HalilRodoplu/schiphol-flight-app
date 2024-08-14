import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import FlightSum from "@/components/ui-components/FlightSum";
import FlightDirection from "@/components/ui-components/FlightDirection";
import {cn} from "@/lib/utils"
import {schiphol} from "@/constants/schiphol";
import {toast, Toaster} from "sonner";

interface FlightProps {
    landingTime: string,
    flight: string,
    to: string,
    flightTime: string,
    departureTime: string,
    arrivalTime: string,
    isFutureDate: boolean,
    icao: string,
    mainFlight: string,
}

const priceOptions = [200, 250, 300, 350, 400];

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
    const [showPriceOptions, setShowPriceOptions] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

    const postTicket = async (ticketData: any) => {
        const response = await fetch("/api/tickets", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(ticketData)
        });
        const data = await response.json();
        if (!data.error) {
            toast.success('Successfully bought a ticket!', {
                style: {
                    backgroundColor: 'green',
                    color: 'white'
                }
            });
        } else {
            toast.error('Something went wrong!', {
                style: {
                    backgroundColor: 'red',
                    color: 'white'
                }
            });
        }
    };

    const clickHandler = async () => {
        if (isLoading) return;

        if (!showPriceOptions) {
            // İlk tıklama, fiyat seçeneklerini gösterir
            setShowPriceOptions(true);
        } else if (selectedPrice !== null) {
            // Fiyat seçildikten sonra ikinci tıklama, veritabanına kaydeder
            setIsLoading(true);

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
                price: selectedPrice,  // Seçilen fiyat
                mainFlight: mainFlight
            };

            await postTicket(ticketData);
            setIsLoading(false);
            setShowPriceOptions(false);
            setSelectedPrice(null);  // Seçilen fiyatı sıfırla
        } else {
            toast('Please select a flight price', {
                style: {
                    backgroundColor: 'yellow',
                    color: 'black'
                }
            });
        }
    };

    const handlePriceSelection = (price: number) => {
        setSelectedPrice(price);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4 border-purple-400 border-2 flex flex-col">
            <Toaster />
            <FlightDirection to={to} mainFlight={mainFlight}/>
            <FlightSum icao={icao} to={to} flightTime={flightTime} departureTime={departureTime}
                       arrivalTime={arrivalTime}/>
            <div className="flex flex-row justify-between items-center bottom-0">
                <div className="bottom-0">
                    <h3 className="font-bold text-lg text-purple-600">Price: ${selectedPrice || schiphol.price}</h3>
                    <h3 className="opacity-75">Round Trip</h3>
                </div>
                <div className={isFutureDate ? "hover:scale-110 duration-500" : ""}>
                    <Button
                        className={cn("h-10 w-28", isFutureDate ? "" : "cursor-not-allowed")}
                        variant={isFutureDate ? "purple" : "purple_outline"}
                        onClick={clickHandler}
                        disabled={!isFutureDate || isLoading}
                    >
                        {isLoading ? "Booking..." : (selectedPrice ? "Confirm Booking" : "Select Price")}
                    </Button>
                </div>
            </div>
            {showPriceOptions && isFutureDate ? (
                <div className="flex flex-row justify-center mt-4 space-x-4">
                    {priceOptions.map((price, index) => (
                        <div
                            key={index}
                            onClick={() => handlePriceSelection(price)}
                            className={cn(
                                "cursor-pointer border-2 p-4 rounded-lg",
                                selectedPrice === price ? "border-purple-600 bg-purple-100" : "border-gray-300"
                            )}
                        >
                            ${price}
                        </div>
                    ))}
                </div>
            ) : <div></div>}
        </div>
    );
};

export default Flight;
