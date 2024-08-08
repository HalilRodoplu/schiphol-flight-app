import React from 'react';
import Image from 'next/image';

const TopNavbar = () => {
    return (
        <nav className="bg-white border-b-2 border-gray-300 rounded-b-lg m-1 p-2">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-xl font-semibold text-gray-800 flex flex-row gap-2 justify-center items-center">
                    <Image
                        src="/flight.svg"
                        alt="flight logo"
                        width={40}
                        height={40}
                    />
                    AppFellas
                </div>
                <div>
                    {/*TODO Buraya user pic gelcek*/}
                    <Image
                        src="/mascot_bad.svg"
                        alt="profile pic"
                        width={40}
                        height={40}
                    />
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
