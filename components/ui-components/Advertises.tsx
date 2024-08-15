/*
    Ekranın sağında bulunan reklamlar bu componentte tasarlanmıştır
*/


import React from 'react';
import Image from 'next/image';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCar, faHotel, faUmbrellaBeach} from "@fortawesome/free-solid-svg-icons";

const Advertises = () => {
    return (
        <div className="w-1/4 h-full mr-2 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col ">
            <div className="m-2 p-3 flex flex-col items-center gap-2 h-full w-full">
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"
                   className="relative inline-block  hover:scale-95 duration-500">
                    <Image
                        src="/car-rental.jpg"
                        alt="flight logo"
                        width={480}
                        height={40}
                        className="rounded-lg"
                    />
                    <div className="absolute left-2 bottom-2">
                        <FontAwesomeIcon icon={faCar} className="text-white h-12 w-12 opacity-75"/>
                        <p className="text-gray-100 text-lg">Rent a car</p>
                    </div>
                </a>

                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"
                   className="relative inline-block hover:scale-95 duration-500">
                    <Image
                        src="/hotels.jpg"
                        alt="flight logo"
                        width={480}
                        height={40}
                        className="rounded-lg"
                    />
                    <div className="absolute left-2 bottom-2">
                        <FontAwesomeIcon icon={faHotel} className="text-white h-12 w-12 opacity-75"/>
                        <p className="text-gray-100 text-lg">Hotels</p>
                    </div>
                </a>

                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"
                   className="relative inline-block hover:scale-95 duration-500">
                    <Image
                        src="/travel-packages.jpg"
                        alt="flight logo"
                        width={480}
                        height={40}
                        className="rounded-lg"
                    />
                    <div className="absolute left-2 bottom-2">
                        <FontAwesomeIcon icon={faUmbrellaBeach} className="text-white h-12 w-12 opacity-75"/>
                        <p className="text-gray-100 text-lg">Travel Packages</p>
                    </div>
                </a>
            </div>

        </div>
    );
};

export default Advertises;