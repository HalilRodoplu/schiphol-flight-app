import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {schiphol} from "@/constants/schiphol";

interface FlightDirectionProps {
    to: string,
}

const FlightDirection = ({to}: FlightDirectionProps) => {


    return (
        <div className="flex flex-row justify-start gap-2 items-center font-bold">
            <h3>{schiphol.airportCode}</h3>
            <FontAwesomeIcon icon={faArrowRight} />
            <h3>{to}</h3>
        </div>
    );
};

export default FlightDirection;