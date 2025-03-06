import mongoose from "mongoose";


const { Schema } = mongoose;

const TicketSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'InProgress', 'Closed'],
        default: 'Open'
    },
    issuer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

TicketSchema.pre('save', function (next) {
    this.updatedAt = new Date(Date.now());
    next();
});

const Ticket = mongoose.model("Ticket", TicketSchema);

export default mongoose.models.Ticket || Ticket