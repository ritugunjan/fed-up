const blogHeaderTitle = document.querySelector(".blog-header-title");
const blogContainer = document.querySelector(".blog-container");
const blogContent = document.querySelector(".blog-content");

const qParams = new URLSearchParams(window.location.search);
const blogId = Number(qParams.get("blogId")) || null;

async function init() {
  try {
    if (!blogId) {
      throw new Error("Blog id is not provided");
    }
    let blogDetails = await fetchBlogDetails(blogId);
    const allCategoryNames = blogDetails.categories
      .map((categoryId) => categoriesMap[categoryId].name ?? "")
      .filter(Boolean)
      .join(", ");
    let publishedDate = new Date(blogDetails.date);
    publishedDate = `${publishedDate.getDate()} ${
      monthNames[publishedDate.getMonth()]
    }, ${dayNames[publishedDate.getDay()]},  ${publishedDate.getFullYear()}`;
    const title = blogDetails.title.rendered;
    const image =
      blogDetails?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
    blogHeaderTitle.textContent = title;
    blogContent.innerHTML = blogDetails.content.rendered;
  } catch (err) {
    blogHeaderTitle.textContent = `Error loading blog with ID ${blogId}`;
    console.error(err);
  }
}

init();
