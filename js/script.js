const showPost = (posts, users) => {
    const onlyTenPost = posts.slice(0, 10);
    console.log(onlyTenPost);

    const postContainer = document.createElement("div");
    postContainer.classList = "post-container";
    document.body.append(postContainer);

    for (const post of onlyTenPost) {

    const postCard = document.createElement("div");
    postCard.classList = "post-card";
    postContainer.append(postCard);

    const userCard = document.createElement("div");
    userCard.classList = "user-card";
    postCard.append(userCard);

    const imageUser = document.createElement("img");
    imageUser.src = post.userId.image;
    userCard.append(imageUser);

    
    const postBody = document.createElement("div");
    postBody.classList = "post-body";
    postCard.append(postBody);
    
    const name = document.createElement("h3");
    name.innerText = post.userId.username;
    postBody.append(name);

    const postText = document.createElement("p");
    postText.innerText = post.body;
    postBody.append(postText);

    const postReactions = document.createElement("p");
    postReactions.innerText = `Like: ${post.reactions}`;
    postReactions.classList = "like"
    postBody.append(postReactions);
    }
}

async function fetchPost() {
    try{
        const response = await fetch(`https://dummyjson.com/posts/`)
        const data = await response.json()
        showPost(data.posts)
    }catch(err){
        console.log(err);
    }
}
fetchPost()

async function fetchUser(id) {
    try{
        const response = await fetch(`https://dummyjson.com/posts/${id}`);
        const postData = await response.json();
      
        const userId = postData.userId;
      
        const responseUser = await fetch(`https://dummyjson.com/user/${userId}`);
        const userData = await responseUser.json();
        showPost(userData.users)
    }catch(err){
        console.log(err);
    }
}
fetchUser(1)
