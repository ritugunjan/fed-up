let currentPage = 1;
const ALL_CATEGORIES_ENDPOINT =
  "https://ritugunjan.no/wp-json/wp/v2/categories?_embed&acf_format=standard";
const ALL_BLOGS_END_POINT = `https://www.ritugunjan.no/wp-json/wp/v2/posts?_embed&page={{pageNumber}}`;
const BLOG_DETAILS_ENDPOINT = `https://www.ritugunjan.no/wp-json/wp/v2/posts/{{blogId}}?_embed`;
const blogLoader = document.querySelector(".blog-loader");

class Blogs extends Array {
  constructor() {
    super();
    this.listeners = {
      push: [],
    };
  }

  push(...items) {
    const result = super.push(...items);
    this.listeners.push.forEach((listener) => listener(items));
    return result;
  }

  addEventListener(eventName, callback) {
    if (eventName in this.listeners) {
      this.listeners[eventName].push(callback);
      return;
    }
    this.listeners[eventName] = [callback];
  }

  removeEventListener(eventName, callback) {
    if (eventName in this.listeners) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== callback
      );
    }
  }
}
let blogsCompleted = false;
let blogDetails = {};
const categoriesMap = {};

const blogs = new Blogs();

async function fetchAllCategories() {
  const response = await fetch(ALL_CATEGORIES_ENDPOINT);
  if (response.status === 200) {
    const categories = await response.json();
    categories.forEach((category) => {
      categoriesMap[category.id] = category;
    });
  }
}

async function fetchAllBlogs() {
  blogLoader.classList.remove("hide");
  const url = new URL(
    ALL_BLOGS_END_POINT.replace("{{pageNumber}}", currentPage.toString())
  );
  if (Object.keys(categoriesMap).length === 0) {
    await fetchAllCategories();
  }
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    blogs.push(...data);
    blogsCompleted = false;
    currentPage++;
  } else {
    blogsCompleted = true;
  }
  blogLoader.classList.add("hide");
}

async function fetchBlogDetails(blogId) {
  blogLoader.classList.remove("hide");
  const url = new URL(BLOG_DETAILS_ENDPOINT.replace("{{blogId}}", blogId));
  if (Object.keys(categoriesMap).length === 0) {
    await fetchAllCategories();
  }
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  blogLoader.classList.add("hide");
  if (response.status === 200) {
    blogDetails = await response.json();
    return Promise.resolve(blogDetails);
  } else {
    return Promise.reject(null);
  }
}
