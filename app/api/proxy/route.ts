/*
* Shiphol api'a istek atarken düşülen CORS hatasından dolayı proxy yazılmıştır.
* (ICAO) Filtre işlemi için GET atılacak URL maniplasyonu burada yapılmıştır.
* API'a istek atılırken pagination için gerekli düzenlemeler burda yapılmıştır.*/

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '0';
    const route = searchParams.get('route');


    let apiUrl = `https://api.schiphol.nl/public-flights/flights?`;

    if (route) {
        apiUrl += `route=${route}&`;
    }

    apiUrl += `includedelays=false&page=${page}&sort=%2BscheduleTime`;

    const apiResponse = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'app_id': process.env.NEXT_PUBLIC_APP_ID!,
            'app_key': process.env.NEXT_PUBLIC_APP_KEY!,
            'ResourceVersion': 'v4',
        }
    });

    const data = await apiResponse.json();
    return NextResponse.json(data);
}
