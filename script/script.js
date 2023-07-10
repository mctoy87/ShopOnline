'use strict';
const postsList = document.querySelector('.list');
const navList = document.querySelector('.nav__item-container');
console.log('postslist: ', postsList);
console.log('navList: ', navList);

  const getPostData = async () => {
  const pageParams = new URLSearchParams(location.search);
  const postPage = pageParams.get('page');

  
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage === null ? 1 : postPage}`);
  const result = await response.json();
  console.log(result);
  console.log(`result.data`, result.data);
  console.log('pagination: ', result.meta.pagination);

  return {
      data: result.data,
      pagination: result.meta.pagination,
      ueserId: result.data.user_id
  }
}

const createPostList = async () => {
  const posts = await getPostData();
  let postItem = '';

  for (let i = 0; i < posts.data.length; i++) {
    postItem += `
      <li class="list__item">
        <div class="item__image-wrapper">
          <img class="item__image" src="" alt="">
        </div>
        <div class="item__desc-wrapper">
          <h2 class="item__title">
            <a ="item__link" href="article.html?id=${posts.data[i].id}">
              ${posts.data[i].title}
            </a>
          </h2>
          <p class="item__date"></p>
          <div class="item__icons-wrapper">
            <span class="item__icons-review"></span>
            <span class="item__icons-comment"></span>
          </div>
        </div>
      </li>
    `;

    postsList.innerHTML = postItem;
  }
};

const createPostNav = async () => {
  const pagination = await getPostData();
  let postNav ='';

  let counter = 0;
  for (let i =1; i < pagination.pagination.pages; i++) {
    if (counter < 3) {
      postNav += `
    <li class="nav__item">
      <a href="blog.html?page=${i}" class="nav__link">
        ${i}
      </a>
    </li>
    `;
    } else {
      postNav += `
      <li class="nav__item visually-hidden">
        <a href="blog.html?page=${i}" class="nav__link">
          ${i}
        </a>
      </li>
      `;
    }

    navList.innerHTML = postNav;
    counter += 1;
  }

};

getPostData();
createPostList();
createPostNav();

