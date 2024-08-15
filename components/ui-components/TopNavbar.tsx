"use client"
import React, {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEarthAmericas, faPlane, faTag} from "@fortawesome/free-solid-svg-icons";

const TopNavbar = () => {
    const pathName = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <nav className="bg-white border-b-2 border-gray-300 rounded-b-lg m-1 p-2">
            <div className="mx-auto px-4 py-3 flex flex-row justify-between items-center">
                <Link href="/">
                    <div
                        className="text-xl font-semibold text-gray-800 flex flex-row gap-2 justify-center items-center">
                        <FontAwesomeIcon icon={faPlane} className="text-purple-800"/>
                        PLANE SCAPE
                    </div>
                </Link>
                {/* Flex container for Deals, Discover, and App Fellas */}
                <div className="flex flex-row items-center gap-2">
                    <Button variant="ghost">
                        <FontAwesomeIcon className="text-purple-800" icon={faTag} />
                            <span className="pl-1">Deals</span>
                    </Button>
                    <Button variant="ghost">
                        <FontAwesomeIcon className="text-purple-800" icon={faEarthAmericas} />
                        <span className="pl-1">Discover</span>
                    </Button>


                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex flex-row items-center gap-2 cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            <Image
                                className="rounded-full"
                                src="/mascot_bad.svg"
                                alt="profile pic"
                                width={36}
                                height={36}
                            />
                            <span>App Fellas</span>
                        </div>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                                <Link href="/">
                                    <Button
                                        size="lg"
                                        variant={pathName === '/' ? 'purple' : 'purple_outline'}
                                        className="w-full text-left"
                                    >
                                        Booking
                                    </Button>
                                </Link>
                                <Link href="/tickets">
                                    <Button
                                        size="lg"
                                        variant={pathName === '/tickets' ? 'purple' : 'purple_outline'}
                                        className="w-full text-left"
                                    >
                                        My Tickets
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
