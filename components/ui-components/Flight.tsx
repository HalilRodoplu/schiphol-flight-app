import React from 'react';
import {Button} from "@/components/ui/button";

interface FlightProps {
    title: string,
    body: string,
}


const Flight = ({title, body}: FlightProps) => {
    return (

        <div className="bg-white p-4 rounded-lg shadow mb-4 border-purple-400 border-2">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-700">{body}</p>
                <Button>Buy</Button>
        </div>
    );
};

export default Flight;