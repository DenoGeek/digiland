/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { LandComponent } from './Land/Land.component';
import { LandListingComponent } from './LandListing/LandListing.component';

import { MemberComponent } from './Member/Member.component';
import { AuctioneerComponent } from './Auctioneer/Auctioneer.component';

import { OfferComponent } from './Offer/Offer.component';
import { acceptDealComponent } from './acceptDeal/acceptDeal.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Land', component: LandComponent },
  { path: 'LandListing', component: LandListingComponent },
  { path: 'Member', component: MemberComponent },
  { path: 'Auctioneer', component: AuctioneerComponent },
  { path: 'Offer', component: OfferComponent },
  { path: 'acceptDeal', component: acceptDealComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
