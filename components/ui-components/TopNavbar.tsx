"use client"
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useRouter, usePathname} from "next/navigation";


const TopNavbar = () => {


    const pathName = usePathname()



    return (
        <nav className="bg-white border-b-2 border-gray-300 rounded-b-lg m-1 p-2">
            <div className="container mx-auto px-4 py-3 flex flex-row justify-between items-center">
                <div className="text-xl font-semibold text-gray-800 flex flex-row gap-2 justify-center items-center">
                    <Image
                        src="/flight.svg"
                        alt="flight logo"
                        width={40}
                        height={40}
                    />
                    AppFellas
                </div>
                <div className="flex">
                    <Button
                        size="lg"
                        variant={pathName === '/' ? 'purple' : 'purple_outline'}

                    >
                        <Link href="/">
                            Booking
                        </Link>
                    </Button>
                    <Button
                        size="lg"
                        variant={pathName === '/tickets' ? 'purple' : 'purple_outline'}

                    >
                        <Link href="/tickets">
                            My Tickets
                        </Link>
                    </Button>
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
