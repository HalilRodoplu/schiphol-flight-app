import React from 'react';
import Image from 'next/image';
import Link from "next/link";

const Advertises = () => {
    return (
        <div className="w-1/4 h-screen mr-2 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col">
            <div className="m-2 p-3 flex flex-col items-center gap-2">
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/onboarding-img.png"
                        alt="flight logo"
                        width={480}
                        height={40}
                        className="rounded-lg"
                    />
                </a>

                <Image
                    src="/onboarding-img.png"
                    alt="flight logo"
                    width={480}
                    height={40}
                    className="rounded-lg"
                />
                <Image
                    src="/onboarding-img.png"
                    alt="flight logo"
                    width={480}
                    height={40}
                    className="rounded-lg"
                />
            </div>

        </div>
    );
};

export default Advertises;