/*
    Filtre componentidir. Yalnızca uçuş yönüne göre filtre atılabilmektedir. (ICAO: ADB, SAW, AYT vs.)
*/

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane, faPlaneArrival, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import {faCalendarDays} from "@fortawesome/free-regular-svg-icons";

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

    const handleBookFlight = () => {
        fetchFlights();
    };

    console.log("fetch flights-----", flights)
    return (
        <div className="h-full w-full pb-16 px-3 mb-3 border-2 bg-white rounded-lg">
            <div className="flex h-[65%] w-full flex-row justify-between items-center">
                <h1 className=" text-xl font-bold">
                    <FontAwesomeIcon className="text-purple-800 pr-2" icon={faPlane}/>
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
                <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon className="text-purple-800" icon={faPlaneDeparture}/>
                    <input className="rounded-l-full h-10 border-2" type="text" placeholder="From"/>
                    <input
                        className="rounded-r-full h-10 border-2"
                        type="text" placeholder="To"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}/>
                    <FontAwesomeIcon className="text-purple-800" icon={faPlaneArrival}/>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <FontAwesomeIcon className="text-purple-800" icon={faCalendarDays} />
                    <input className="rounded-l-full h-10 border-2" type="text" placeholder="Departure Time"/>
                    <input className="rounded-r-full h-10 border-2" type="text" placeholder="Landing Time"/>
                    <FontAwesomeIcon className="text-purple-800" icon={faCalendarDays} />

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