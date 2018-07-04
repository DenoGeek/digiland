import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.digiland.org{
   export class Land extends Asset {
      landRefNo: string;
      owner: Member;
   }
   export enum ListingState {
      FOR_SALE,
      RESERVE_NOT_MET,
      SOLD,
   }
   export class LandListing extends Asset {
      listingId: string;
      reservePrice: number;
      description: string;
      state: ListingState;
      offers: Offer[];
      land: Land;
   }
   export abstract class User extends Participant {
      email: string;
      firstName: string;
      lastName: string;
   }
   export class Member extends User {
      balance: number;
   }
   export class Auctioneer extends User {
   }
   export class Offer extends Transaction {
      bidPrice: number;
      listing: LandListing;
      member: Member;
   }
   export class acceptDeal extends Transaction {
      listing: LandListing;
   }
// }
