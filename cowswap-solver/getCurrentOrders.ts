import {DbOrder} from "@sharedtypes/myTypes"
export default async function getCurrentOrders() {
    try {
        const response = await fetch(process.env.SERVER_DOMAIN+"/solver/latest/cow");
        const data = await response.json() as DbOrder[];
        // Process the data here
        return data
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}