const createPostPage = async () => {
    const postPage = document.querySelector('.article');
    let postContent = '';

    const pageParams = new URLSearchParams(location.search);
    const postId = pageParams.get('id');

    const response = await fetch(`https://gorest.co.in/public-api/posts/${postId}`);
    const result = await response.json();
    console.log(result);
    const post = result.data;

    const responseIdUder = await fetch(`https://gorest.co.in/public-api/users/${result.data.user_id}`);
    const userId = await responseIdUder.json();
    console.log('userId :', userId);

    postContent = `
      <div class="container">
        <div class="article__text-container">
          <h1 class="article__title">${post.title}</h1>
          <p class="article__text">${post.body}</p>
          <div class="item__desc-wrapper">
            <p2 class="item__title">
              user_Id ${result.data.user_id}
            </p2>
            <p class="item__date">27 нобря 2020, 08:24</p>
            <div class="item__icons-wrapper">
              <span class="item__icons-review">0.6K</span>
              <span class="item__icons-comment">0</span>
            </div>
          </div>
        </div>
      </div>
      <div class="article__promo-container">
        <article class="article__image-wrapper">
          <img class="article__promo-image" src="" alt="">
          <a href="" class="article__promo-link></a>
        </article>
        <article class="article__image-wrapper">
          <img class="article__promo-image" src="" alt="">
          <a href="" class="article__promo-link></a>
        </article>
      </div>
    `;

    postPage.innerHTML = postContent;
}

createPostPage();