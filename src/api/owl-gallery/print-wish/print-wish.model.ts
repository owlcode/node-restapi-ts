import {
    Document,
    Schema,
    model
} from 'mongoose';

export interface AuditResource {

}

export enum PrintWishStatus {
    Pending,
    InProgress,
    Finished
}

export interface PrintWish extends Document, AuditResource {
    path: string;
    status: PrintWishStatus;
}

const PrintWishSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const PrintWishModel = model < PrintWish > ('PrintWish', PrintWishSchema);
