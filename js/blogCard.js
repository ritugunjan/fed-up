const blogCardTemplate = `
<a class="blog-card" href="./blog-details.html?blogId={{blogId}}">
  <img
    src="{{image}}"
    alt="{{title}}"
    class="blog-card-img"
  />
  <div class="blog-card-content">
      <p class="blog-card-title">{{title}}</p>
      <p class="blog-card-date">
          <strong>Published Date:</strong> {{date}}
      </p>
      <p class="blog-card-categories">
          <strong>Categories:</strong> {{categories}}
      </p>
  </div>
</a>
`;

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getRenderedBlogCard(blogDetails, categoriesMap) {
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
  const blogId = blogDetails.id;
  return blogCardTemplate
    .replaceAll("{{categories}}", allCategoryNames)
    .replaceAll("{{date}}", publishedDate)
    .replaceAll("{{title}}", title)
    .replaceAll("{{blogId}}", blogId)
    .replaceAll("{{image}}", image);
}
