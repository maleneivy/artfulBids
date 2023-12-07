import { formatDateTimeNorwegian } from "../utils/norwegianTimeFormat.mjs";

export async function presentListings(listings) {
  // get container and then clear it
  const listingsContainer = document.querySelector(".listings-container");
  listingsContainer.innerHTML = "";

  // Iterate over the posts and insert them to DOM.
  listings.forEach((listing) => {
    const title = listing.title;
    let media = listing.media;
    media = media.toString();
    const tags = listing.tags;
    const endsAt = formatDateTimeNorwegian(listing.endsAt);
    const bids = listing.bids;

    //ListingCard (Card will link href to the specific listing)
    const listingCard = document.createElement("a");
    listingCard.href = `#`;
    listingCard.classList.add(
      "card",
      "col-sm-12",
      "col-xs-2",
      "col-md-5",
      "m-2",
      "p-0",
    );

    // Body of the card
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "p-0");

    // Image for the cardBody
    let listingImage = document.createElement("img");
    listingImage.classList.add("card-img-top");

    if (!media) {
      listingImage.src = "../../../images/default/default-post-image.jpg";
    } else {
      // Split the media string into an array of image URLs
      const mediaUrls = media.split(",");

      // Select the first image from the array
      const firstImageUrl = mediaUrls[0].trim();

      // Set the src attribute for the listingImage
      listingImage.src = firstImageUrl;

      // Handle error for the first image
      listingImage.onerror = function () {
        console.log(`Error loading image: ${firstImageUrl}`);
        // set the default image in case of error
        listingImage.src = "../../../images/default/default-post-image.jpg";
        // Remove the onerror handler to prevent the default error message
        listingImage.onerror = null;
      };
    }

    // Title for the Cardbody
    let listingTitle = document.createElement("h5");
    listingTitle.classList.add("card-title", "p-2");
    listingTitle.textContent = title;

    // Categories/tags for the listing
    let listingTags = document.createElement("p");
    listingTags.classList.add("card-text", "p-2");
    if (tags.length === 0) {
      listingTags.textContent = `No tags`;
    } else {
      listingTags.textContent = tags;
    }

    // Ending time for listing
    let listingEndsAt = document.createElement("p");
    listingEndsAt.classList.add("card-text", "p-2");
    listingEndsAt.textContent = endsAt;
    listingEndsAt.style.whiteSpace = "pre-line";

    // bids
    const listingBid = document.createElement("p");
    listingBid.classList.add("card-text", "p-2");
    if (bids.length > 0) {
      // Find the highest bid amount
      const highestBidAmount = bids.reduce((maxBid, currentBid) => {
        return currentBid.amount > (maxBid ? maxBid.amount : 0)
          ? currentBid
          : maxBid;
      }, bids[0]);

      listingBid.textContent = `Highest Bid: ${highestBidAmount.amount}`;
    } else {
      listingBid.textContent = "No Bids";
    }

    // Append the elements to the cardBody
    cardBody.appendChild(listingImage);
    cardBody.appendChild(listingTitle);
    cardBody.appendChild(listingTags);
    cardBody.appendChild(listingEndsAt);
    cardBody.appendChild(listingBid);

    //Append the cardBody to the listingCard
    listingCard.appendChild(cardBody);

    // Append the listingCard to its container
    listingsContainer.appendChild(listingCard);
  });
}
