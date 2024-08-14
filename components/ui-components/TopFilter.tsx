import React, {useState} from 'react';
import {Button} from "@/components/ui/button";

const TopFilter = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [landingTime, setLandingTime] = useState('');
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);

    const fetchFlights = async () => {
        let apiUrl = `/api/proxy?page=${page}`;

        if (to) {
            apiUrl += `&route=${to}`;
        }

        if (departureTime) {
            apiUrl += `&departureTime=${departureTime}`;
        }

        if (landingTime) {
            apiUrl += `&landingTime=${landingTime}`;
        }

        console.log("api url----", apiUrl)

        setIsLoading(true);

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log("filter-data------", data)
            setFlights(data.flights);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookFlight = () => {
        fetchFlights();
    };

    console.log("fetch flights-----", flights)
    return (
        <div className="h-full w-full pb-6 mb-3 border-2 bg-slate-300 rounded-lg">
            <div className="flex h-full w-full flex-row justify-between items-center">
                <h1 className=" text-xl font-bold">
                    BOOK YOUR FLIGHT
                </h1>
                <div className="flex flex-row gap-0.5">
                    <Button className="rounded-l-full" variant="purple">
                        Round Trip
                    </Button>
                    <Button className="rounded-r-full" variant="purple">
                        One Way
                    </Button>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between ">
                <div className="flex flex-row gap-1">
                    <input className="rounded-l-full" type="text" placeholder="From"/>
                    <input
                        className="rounded-r-full"
                        type="text" placeholder="To"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}/>
                </div>
                <div className="flex flex-row gap-1">
                    <input className="rounded-l-full" type="text" placeholder="Departure Time"/>
                    <input className="rounded-r-full" type="text" placeholder="Landing Time"/>
                </div>
            </div>
            <div className="flex flex-row left-2 m-2">
                <Button onClick={handleBookFlight} variant="purple" className="left-2">
                    Book Flight
                </Button>
            </div>


        </div>
    );
};

export default TopFilter;