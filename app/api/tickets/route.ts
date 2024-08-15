/*
* MONGODB satın alınan biletler için bu aşamada POST isteği ayarlanmıştır.
* MONGODB ye kaydedilen biletlerim verisi çekilip kullanıcıya gösterilmesi için GET isteği burada yazılmıştır.
* */


import dbConnect from "@/app/lib/dbConnect";
import Tickets from "@/app/models/Tickets";
import {NextResponse} from "next/server";

export const GET = async () => {
    await dbConnect()

    try {
        const tickets = await Tickets.find({})
        return NextResponse.json(tickets);
    } catch (error: any) {
        console.error("Errorrrr-----", error);
        return NextResponse.json({error: error.message});
    }

}

export const POST = async (request: Request) => {
    await dbConnect()

    try {
        const ticketData = await request.json()
        const newTicket = new Tickets(ticketData)
        await newTicket.save();

        return NextResponse.json(newTicket);

        } catch (error:any) {
        console.error("Errorrrr-----", error);
        return NextResponse.json({error: error.message});
    }
}