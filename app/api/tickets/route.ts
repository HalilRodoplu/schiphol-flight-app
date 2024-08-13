import dbConnect from "@/app/lib/dbConnect";
import Tickets from "@/app/models/Tickets";
import {NextResponse} from "next/server";

export const GET = async () => {
    await dbConnect()

    try {
        const tickets = await Tickets.find({})
        return NextResponse.json(tickets);
    } catch (error: any) {
        console.error("Errorrrr-----",error);
        return NextResponse.json({ error: error.message });
    }

}