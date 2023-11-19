"use server"
import { cookies } from "next/headers";
import links from "../data/links";
import { Order, StoreOrderReqBody } from "@sharedtypes/myTypes";


export async function postCreateOrder (order:Order,user_wallet:string,sign:string) {
  "use server"
  try {
    // Abort any ongoing requests
    // Create a new signal for the new request

    const nextCookies = cookies();

    // const postOrderBody:StoreOrderReqBody = {
    //     order:order,
    //     sign:sign,
    //     source_adress:user_wallet,
    //     chain_id:order.destinationChainId

    // };
    // console.log("gwe");
    
    // const res = await fetch(links.post_store_dborder, {
    //     credentials: "include",
    //     method: "POST",
    //     cache: "no-store",
    //     body: JSON.stringify(postOrderBody),
    //     headers: {
    //       "Content-Type": "application/json", // set the content type of the request body
    //     },
    // });
    // const data = await res.json();
    // return data;
    console.log("AAOFJWOEJFIOWJFIOWEJFOJWEOFIJWEFJWOEJFOWJEFOIJWEOFJEOIJ");
    
  } catch (error) {
    return {}  ;
  }
};

export default postCreateOrder;
