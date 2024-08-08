"use client"

import React, {useState, useEffect} from 'react';
import Flight from "@/components/ui-components/Flight";
import {Button} from "@/components/ui/button";

const Flights = () => {

    const [flights, setFlights] = useState([]);
    const app_key = process.env.NEXT_PUBLIC_APP_KEY!;
    const app_id = process.env.NEXT_PUBLIC_APP_ID!;

    const apiUrl = 'https://api.schiphol.nl/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime'

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'app_id': app_id,
            'app_key': app_key,
            'ResourceVersion': 'v4'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data.flights[0]))
        .catch(error => console.error('Error:', error));


    // useEffect(()=> {
    //     const apiUrl = "https://api.schiphol.nl/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime"
    //
    //     fetch(apiUrl,{
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //             app_id: "0a76a847",
    //             app_key: "9b329b94631c2482e5d5de0dbafc8a45",
    //             ResourceVersion: "v4"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             const firstTenPosts = data.slice(0, 10);
    //             console.log(firstTenPosts);
    //             setFlights(firstTenPosts);
    //         })
    //         .catch(err => console.log(err));
    // })

    const contents = []
    for (let i = 0; i < 10; i++) {
        contents.push({
            title: `Title: ${i}`,
            body: `Body: ${i}`,
        })
    }

    return (
        <div className="w-3/4 h-fit ml-3 bg-gray-100 p-6 rounded-lg shadow-md">
            {contents.map((item, i) => (
                <Flight key={i} title={item.title} body={item.body} />
            ))}
        </div>
    );
};

export default Flights;