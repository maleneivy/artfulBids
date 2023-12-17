import { API_BASE_URL } from "../api/baseUrl.js";
import { getAllListingsUrl } from "../api/listings/listingsUrl.js";
import { displayMessage } from "../utils/displayMessage.mjs";
import { formatDateTimeNorwegian } from "../utils/norwegianTimeFormat.mjs";
import { token } from "../utils/storage.mjs";

async function fetchAndDisplayLatestListings() {
  try {
    const latestListingsApi = `${API_BASE_URL}${getAllListingsUrl}?_bids=true`;
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(latestListingsApi, fetchOptions);
    const json = await response.json();

    console.log(json);

    if (response.ok) {
      const scrollingContainer = document.querySelector(
        "#latest-listings-container",
      );
      scrollingContainer.innerHTML = "";

      // Sort listings based on the 'created' timestamp in descending order
      const sortedListings = json.sort(
        (a, b) => new Date(b.created) - new Date(a.created),
      );

      // Iterate through the latest listings and create card elements
      json.slice(0, 5).forEach((listing) => {
        const created = formatDateTimeNorwegian(listing.created);
        const title = listing.title;
        let media = listing.media;
        media = media.toString();
        const tags = listing.tags;
        const endsAt = formatDateTimeNorwegian(listing.endsAt);
        const bids = listing.bids;
        const id = listing.id;

        //ListingCard (Card will link href to the specific listing)
        const listingCard = document.createElement("a");
        listingCard.href = `/html/specific-listing.html?id=${id}`;
        listingCard.classList.add(
          "card",
          "col-sm-12",
          "col-xs-2",
          "col-md-5",
          "m-2",
          "p-0",
        );

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "p-0");

        let listingImage = document.createElement("img");
        listingImage.classList.add("card-img-top");

        if (!media) {
          listingImage.src = "../../../images/default/default-post-image.jpg";
        } else {
          // Split the media string into an array of image URLs
          const mediaUrls = media.split(",");

          // Select the first image from the array
          const firstImageUrl = mediaUrls[0].trim();

          listingImage.src = firstImageUrl;

          listingImage.onerror = function () {
            listingImage.src = "../../../images/default/default-post-image.jpg";
            listingImage.onerror = null;
          };
        }

        let listingTitle = document.createElement("h5");
        listingTitle.classList.add("card-title", "p-2");
        listingTitle.textContent = title;

        let listingTags = document.createElement("p");
        listingTags.classList.add("card-text", "p-2");
        if (tags.length === 0) {
          listingTags.textContent = `No tags`;
        } else {
          listingTags.textContent = tags;
        }

        let listingEndsAt = document.createElement("p");
        listingEndsAt.classList.add("card-text", "p-2");
        listingEndsAt.textContent = `Ends at:
        ${endsAt}`;
        listingEndsAt.style.whiteSpace = "pre-line";

        const listingBid = document.createElement("p");
        listingBid.classList.add("card-text", "p-2");
        if (bids.length > 0) {
          const highestBidAmount = bids.reduce((maxBid, currentBid) => {
            return currentBid.amount > (maxBid ? maxBid.amount : 0)
              ? currentBid
              : maxBid;
          }, bids[0]);

          listingBid.textContent = `Highest Bid: ${highestBidAmount.amount}`;
        } else {
          listingBid.textContent = "No Bids";
        }
        cardBody.appendChild(listingImage);
        cardBody.appendChild(listingTitle);
        cardBody.appendChild(listingTags);
        cardBody.appendChild(listingEndsAt);
        cardBody.appendChild(listingBid);

        listingCard.appendChild(cardBody);
        scrollingContainer.appendChild(listingCard);
      });
    } else {
      displayMessage(
        "error-message",
        "Failed to get latest listings",
        ".error-latest",
      );
    }
  } catch (error) {
    displayMessage(
      "error-message",
      "Failed to get latest listings",
      ".error-latest",
    );
  }
}

fetchAndDisplayLatestListings();
