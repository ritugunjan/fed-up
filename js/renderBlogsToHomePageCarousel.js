const swiperWrapper = document.querySelector(".swiper-wrapper");

const swiperSliderTemplate = `
<div class="swiper-slide">
        {{blogCard}}
</div>
`;

function renderBlogItems(newBlogs) {
  newBlogs.forEach((blog) => {
    let blogCard = getRenderedBlogCard(blog, categoriesMap);
    blogCard = swiperSliderTemplate.replaceAll("{{blogCard}}", blogCard);
    swiperWrapper.insertAdjacentHTML("beforeend", blogCard);
  });
  initSwiper();
}

blogs.addEventListener("push", renderBlogItems);

fetchAllBlogs();
