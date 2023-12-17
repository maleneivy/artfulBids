import { fetchListings } from "./fetchListings.mjs";
import { presentListings } from "./presentListings.mjs";

export async function setUpTagsAndListings() {
  // Fetch all posts.
  let listings = await fetchListings(null);

  // Present all posts.
  presentListings(listings);

  // Setup tags.
  let allTags = [];

  listings.forEach((listing) => {
    let tags = listing.tags;
    allTags = allTags.concat(tags);
  });

  // Remove tags that are empty.
  allTags = allTags.filter((tag) => {
    return tag !== "";
  });

  // Remove duplicate tags and sort them.
  allTags = [...new Set(allTags)].sort();

  // Insert the tags into the <select>.
  const selectTagFormContainer = document.querySelector(".form-select");
  allTags.forEach((tag) => {
    const selectOption = document.createElement("option");
    selectOption.setAttribute = "value";
    selectOption.value = `${tag}`;
    selectOption.textContent = `${tag}`;

    selectTagFormContainer.appendChild(selectOption);
  });

  // Add event listener that will fetch all posts with the selected tag.
  selectTagFormContainer.addEventListener("change", async (e) => {
    let tag = selectTagFormContainer.value;
    tag = tag == "show-all-listings" ? null : tag;

    let listings = await fetchListings(tag);
    presentListings(listings);
  });
}

setUpTagsAndListings();
