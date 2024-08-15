/*
    MONGODB açılacak schema ve tabloya insert edilecek verilerin tipleri burada belirlenmiştir
*/

import mongoose, {Document, Schema} from "mongoose";

export interface TicketsInterface extends Document {
    departureTime: string,
    landingTime: string,
    icao: string,
    flightTime: string,
    departureAirport: string,
    landingAirport: string,
    mainFlight: string,
    price: number
}

const ticketsSchema: Schema = new mongoose.Schema({
    departureTime: {
        type: String,
        
    },
    landingTime: {
        type: String,
        
    },
    icao: {
        type: String,
        
    },
    flightTime: {
        type: String,
        
    },
    departureAirport: {
        type: String,
        
    },
    landingAirport: {
        type: String,
        
    },
    mainFlight: {
        type: String,
        
    },
    price: {
        type: Number,
        
    }
})

const Tickets = mongoose.models.Tickets || mongoose.model<TicketsInterface>("Tickets", ticketsSchema);

export default Tickets;