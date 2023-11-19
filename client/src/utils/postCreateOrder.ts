"use server"
import { cookies } from "next/headers";
import links from "../data/links";
import { Order, StoreOrderReqBody } from "@sharedtypes/myTypes";


export async function postCreateOrder (order:Order,user_wallet:string,sign:string) {
  "use server"
  try {
    // Abort any ongoing requests
    // Create a new signal for the new request
    const postOrderBody:StoreOrderReqBody = {
        order:order,
        sign:sign,
        source_adress:user_wallet,
        chain_id:order.destinationChainId

    };
    
    const nextCookies = cookies();
    try {
        
        const res = await fetch(links.post_store_dborder, {
            credentials: "include",
            method: "POST",
            cache: "no-store",
            body: JSON.stringify(postOrderBody),
            headers: {
              "Content-Type": "application/json", // set the content type of the request body
            },
        });
    } catch (error) {
        
    }
    const delay = (ms: number): Promise<void>=> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    await delay(5000);
    
    return {};



    
  } catch (error) {
    return {}  ;
  }
};

export default postCreateOrder;
