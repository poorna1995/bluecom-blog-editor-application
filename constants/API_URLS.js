const domain = `https://api.bluecom.ai/api`;
const API_URLS = {
  BLOG: {
    BLOGS: `${domain}/blog/Blogs`,
    GENERATE_BLOGS:`${domain}/blog/generateBlog`
  },
  ADMIN: {
    LOGIN: `${domain}/merchant/login`,
  },
};

export const { ADMIN, BLOG } = API_URLS;
export default API_URLS;
