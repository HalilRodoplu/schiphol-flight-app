// import { NextResponse } from 'next/server';
//
// export async function GET() {
//     const apiUrl = 'https://api.schiphol.nl/public-flights/flights?includedelays=false&page=1&sort=%2BscheduleTime';
//
//     const apiResponse = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'app_id': process.env.NEXT_PUBLIC_APP_ID!,
//             'app_key': process.env.NEXT_PUBLIC_APP_KEY!,
//             'ResourceVersion': 'v4',
//         }
//     });
//
//     const data = await apiResponse.json();
//     return NextResponse.json(data);
// }


import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '0'; // URL'den page parametresini alır

    const apiUrl = `https://api.schiphol.nl/public-flights/flights?includedelays=false&page=${page}&sort=%2BscheduleTime`;

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

