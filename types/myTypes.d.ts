import { type } from "os";
import {  AccountType, AllowedChains,OrderState,ResponseMessage, Socials } from "./enums";
import { Document, Types } from 'mongoose';

// DB MODELS
export interface DbUser extends Document {
  discord_id: string;
  owned_creatures:Types.ObjectId[];
  account_type: AccountType;
  su_amount:number;
  rewards:Types.ObjectId;
  bio:string
  socials:{[key in Socials]:string}
  discord_user:DiscordUser
  is_profile_visible:boolean;
  current_cult_discord_id:string;
  collected_lp:number
  is_active: boolean;
}  



  export interface DiscordUser {
    discord_id: string;
    username: string;
    avatar: string;
    mfa_enabled:boolean;
    access_token:string
  } 

  export interface Order {
    
    
    sourceChainId: number;
  destinationChainId: number;
  nonce: number;
  amountSourceToken: number;
  minDestinationTokenAmount: number;
  expirationTimestamp: number;
  stakeAmount: number;
  orderIndex: number;
  sourceAddress: string; // Assuming address is represented as a string in TypeScript
  destinationAddress: string; // Assuming address is represented as a string in TypeScript
  sourceTokenAddress: string; // Assuming address is represented as a string in TypeScript
  destinationTokenAddress: string; // Assuming address is represented as a string in TypeScript


  }


  export interface DbOrder{
    sign:string;
    source_adress:string;
    chain_id:number;
    order:Order;
    order_state:OrderState;
  }
 
  export interface StoreOrderReqBody{
    order:Order;
    sign:string;
    source_adress:string;
    chain_id:number;
  }