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
        required: true,
    },
    landingTime: {
        type: String,
        required: true,
    },
    icao: {
        type: String,
        required: true,
    },
    flightTime: {
        type: String,
        required: true,
    },
    departureAirport: {
        type: String,
        required: true,
    },
    landingAirport: {
        type: String,
        required: true,
    },
    mainFlight: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})

const Tickets = mongoose.models.Tickets || mongoose.model<TicketsInterface>("Tickets", ticketsSchema);

export default Tickets;