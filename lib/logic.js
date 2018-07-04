
/**
 * Close the bidding for a vehicle listing and choose the
 * highest bid that is over the asking price
 * @param {com.digiland.org.acceptDeal} acceptDeal - the acceptDeal transaction
 * @transaction
 */

async function acceptDeal(acceptDeal) {  // eslint-disable-line no-unused-vars
    const listing = acceptDeal.listing;
    if (listing.state !== 'FOR_SALE') {
        throw new Error('Listing is not FOR SALE');
    }
    // by default we mark the listing as RESERVE_NOT_MET
    listing.state = 'RESERVE_NOT_MET';
    let highestOffer = null;
    let buyer = null;
    let seller = null;
    if (listing.offers && listing.offers.length > 0) {
        // sort the bids by bidPrice
        listing.offers.sort(function(a, b) {
            return (b.bidPrice - a.bidPrice);
        });
        highestOffer = listing.offers[0];
        if (highestOffer.bidPrice >= listing.reservePrice) {
            // mark the listing as SOLD
            listing.state = 'SOLD';
            buyer = highestOffer.member;
            seller = listing.land.owner;
            // update the balance of the seller
            console.log('#### seller balance before: ' + seller.balance);
            seller.balance += highestOffer.bidPrice;
            console.log('#### seller balance after: ' + seller.balance);
            // update the balance of the buyer
            console.log('#### buyer balance before: ' + buyer.balance);
            buyer.balance -= highestOffer.bidPrice;
            console.log('#### buyer balance after: ' + buyer.balance);
            // transfer the vehicle to the buyer
            listing.land.owner = buyer;
            // clear the offers
            listing.offers = null;
        }
    }

    if (highestOffer) {
        // save the vehicle
        const landRegistry = await getAssetRegistry('com.digiland.org.Land');
        await landRegistry.update(listing.land);
    }

    // save the vehicle listing
    const landListingRegistry = await getAssetRegistry('com.digiland.org.LandListing');
    await landListingRegistry.update(listing);

    if (listing.state === 'SOLD') {
        // save the buyer
        const userRegistry = await getParticipantRegistry('com.digiland.org.Member');
        await userRegistry.updateAll([buyer, seller]);
    }
}

/**
 * Make an Offer for a VehicleListing
 * @param {com.digiland.org.Offer} offer - the offer
 * @transaction
 */
async function makeOffer(offer) {  // eslint-disable-line no-unused-vars
    let listing = offer.listing;
    if (listing.state !== 'FOR_SALE') {
        throw new Error('Listing is not FOR SALE');
    }
    if (!listing.offers) {
        listing.offers = [];
    }
    listing.offers.push(offer);

    // save the vehicle listing
    const landListingRegistry = await getAssetRegistry('com.digiland.org.LandListing');
    await landListingRegistry.update(listing);
}
