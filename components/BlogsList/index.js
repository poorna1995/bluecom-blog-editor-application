// "use client";
import { BLOG } from "constants/API_URLS";
import BlogCard from "./BlogCard";
import useLocalStorage from "lib/hooks/use-local-storage";

export const getBlogs = async (login_token) => {
  const withoutToken = await fetch(BLOG.BLOGS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!login_token) return withoutToken.json();
  //  router.push("/login");

  // setLoading(true);
  const res = await fetch(BLOG.BLOGS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${login_token}`,
    },
  });
  return res.json();
};

export default function BlogsList({ blogs }) {
  // const [blogsCount, setBlogsCount] = useLocalStorage("blogsCount", 0);

  // const data = (await getBlogs(login_token)) || {};
  // const blogs = data?.result || [];
  // useEffect(() => {
  //   setBlogsCount(blogs.length);
  // }, [blogs]);
  // if (typeof window !== "undefined") {
  //   setBlogsCount(blogs.length);
  // }

  // console.log({ data });

  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {Array.isArray(blogs) &&
        blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
    </div>
  );
}
