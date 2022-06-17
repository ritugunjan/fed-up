const blogsContainer = document.querySelector(".blogs-container");
const loadMoreBtn = document.querySelector(".load-more-blogs-btn");

function renderBlogItems(newBlogs) {
  newBlogs.forEach((blog) => {
    const blogCard = getRenderedBlogCard(blog, categoriesMap);
    blogsContainer.insertAdjacentHTML("beforeend", blogCard);
  });
}

blogs.addEventListener("push", renderBlogItems);

async function loadMoreBlogs() {
  loadMoreBtn.classList.add(".disabled");
  await fetchAllBlogs();
  loadMoreBtn.classList.remove(".disabled");
}

loadMoreBtn.addEventListener("click", loadMoreBlogs);

fetchAllBlogs();
