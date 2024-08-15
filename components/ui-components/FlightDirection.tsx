/*
    Flight componenetinin en üzerinde uçuşun nereden nereye olacağını göstermek için yazılmış olan componenet.
*/

import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {schiphol} from "@/constants/schiphol";

interface FlightDirectionProps {
    to: string,
    mainFlight: string
}

const FlightDirection = ({to, mainFlight}: FlightDirectionProps) => {


    return (
        <div className="flex flex-row justify-start  ">
            <div className="flex flex-col">
                <div className="flex flex-row font-bold gap-2 items-center">
                    <h3>{schiphol.airportCode}</h3>
                    <FontAwesomeIcon icon={faArrowRight}/>
                    <h3>{to}</h3>
                </div>
                <div>
                    <h3>{mainFlight}</h3>
                </div>
            </div>


        </div>
    );
};

export default FlightDirection;