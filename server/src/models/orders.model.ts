import { AccountType, OrderState } from "@sharedtypes/enums"
import mongoose from "mongoose"
const Orders = new mongoose.Schema({
    sign: {
        type: String,
        required: true,
        unique: true,
        index:true
    },
    order: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    chain_id: {
        type:Number,
        required:true

    },
    source_adress: {
        type: String,
        reqiured:true,
    },
    order_state: {
        type: String,
        required: true,
        enum: OrderState,
        default: OrderState.waiting

    },
})
export default mongoose.model("Orders", Orders)