function handleAvatarChange() {
  const newAvatar = document.querySelector("#avatarInput").value.trim();

  // Check if the input is not empty

  if (newAvatar) {
    //Update the avatar in localStorgae
    localStorage.setItem("avatar", newAvatar);

    // Close the Bootstrap modal
    const modal = new bootstrap.Modal(document.querySelector("#avatarModal"));
    modal.hide();

    // Refresh the page
    location.reload();
  }
}
handleAvatarChange();
