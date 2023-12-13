function showPost(name, image, body, reaction) {
  const postContainer = document.querySelector('.postContainer')

  const postCard = document.createElement("div");
  postCard.classList = "post-card";
  postContainer.prepend(postCard);

  const userCard = document.createElement("div");
  userCard.classList = "user-card";
  postCard.append(userCard);

  const imageUser = document.createElement("img");
  imageUser.src = image;
  userCard.append(imageUser);

  const postBody = document.createElement("div");
  postBody.classList = "post-body";
  postCard.append(postBody);

  const username = document.createElement("h3");
  username.innerText = name;
  postBody.append(username);

  const postText = document.createElement("p");
  postText.innerText = body;
  postBody.append(postText);

  const postReactions = document.createElement("p");
  postReactions.innerText = `Like: ${reaction}`;
  postReactions.classList = "like";
  postBody.append(postReactions);
}

async function fetchPostAndUser() {
  try {
    const response = await fetch("https://dummyjson.com/posts");
    const data = await response.json();

    let onlyTenPosts = data.posts.slice(0, 10);
    for (const post of onlyTenPosts) {
      let userId = post.userId;
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      const data = await response.json();

      const name = data.username;
      const image = data.image;
      const body = post.body;
      const reaction = post.reactions;

      showPost(name, image, body, reaction);
    }
  } catch (error) {
    console.error("Error fetching user image:", error);
  }
}

fetchPostAndUser();

const form = document.querySelector("form");

async function fetchUserImage() {
  try {
    const responseUser = await fetch(`https://dummyjson.com/users/15`);
    const userData = await responseUser.json();
    const userImage = userData.image;

    const userImageElement = document.querySelector(".user-image");
    userImageElement.src = userImage;
  } catch (error) {
    console.error("Error fetching user image:", error);
  }
}
fetchUserImage();

async function addNewMessage(event) {
  event.preventDefault();

  const message = document.querySelector("#message").value;

  try {
    const responseUser = await fetch(`https://dummyjson.com/users/15`);
    const data = await responseUser.json();
    const userId = data.id;
    const name = data.username;
    const image = data.image;

    const response = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: message,
        userId: userId,
        name: name,
        image: image,
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
    showPost(name, image, message, 0);
    document.querySelector("#message").value = "";
  } catch (error) {
    console.error("Error fetching user image:", error);
  }
}

form.addEventListener("submit", addNewMessage);
