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
  nonce: number; //have to generate it frontend site
  amountSourceToken: number;
  minDestinationTokenAmount: number;
  expirationTimestamp: number;
  stakeOrder:number;
  sourceAddress: string;
  destinationAddress: string;
  sourceTokenAddress: string;
  destinationTokenAddress: string;


  }


  export interface DbOrder{
    filecoin_hash:string;
    source_adress:string;
    chain_id:number;
    order:Order;
    order_state:OrderState;
  }
 
  export interface StoreOrderReqBody{
    order:Order;
    source_adress:string;
    chain_id:number;
  }