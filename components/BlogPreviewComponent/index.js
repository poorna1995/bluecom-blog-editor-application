/* eslint-disable @next/next/no-img-element */
import { BLOG } from "constants/API_URLS";
import Image from "next/image";
import React from "react";

const getBlogs = async (login_token = "", blogSlug) => {
  const noToken = await fetch(`${BLOG.BLOGS}?slug=${blogSlug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resultNoToken = noToken.json();
  const dataNoToken = resultNoToken?.result || [];

  if (!login_token || !blogSlug) return resultNoToken;
  //  router.push("/login");

  const res = await fetch(`${BLOG.BLOGS}?slug=${blogSlug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${login_token}`,
    },
  });
  //   .then((res) => res.json())
  //   .then((json) => {
  //     setLoading(false);
  //     if (json.status === "success") {
  //       const blog =
  //         Array.isArray(json.result) &&
  //         json.result.length > 0 &&
  //         json.result[0];
  //       setBlogData(blog);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log({ error });
  //   });
  const result = res.json();
  const data = result?.result || [];
  return result;
};

export default async function BlogPreviewComponent({ login_token, blogSlug }) {
  const data = await getBlogs(login_token, blogSlug);
  const blogData = data?.result[0] || {};
  console.log({ blogData });
  return (
    <div>
      {" "}
      <div className={"mt-16"}>
        <h1
          style={{
            fontWeight: "800",
            fontSize: "48px",
            // pb: "24px",
          }}
          // component={"h2"}
          // className={utilStyles.headingXl}
        >
          {blogData.title}
        </h1>
        {blogData.image_url && (
          <Image
            src={blogData.image_url}
            width="820"
            height="495"
            style={{
              width: "100%",
              height: "100%",
              pb: "28px",
              // borderRadius: "8px",
              // objectFit: "cover",
            }}
            className="mb-4 mt-4  max-h-[460px] rounded-lg object-cover"
            alt={blogData.title}
          />
        )}{" "}
        <div
          style={{
            maxWidth: "100%",
            whiteSpace: "normal",
            // code: {
            //   background: "#272822",
            //   px: 1,
            //   borderRadius: "4px",
            //   py: 0.5,
            //   color: "white",
            // },
          }}
          dangerouslySetInnerHTML={{
            __html: blogData.content,
          }}
          className="markdown-content"
        />
      </div>
    </div>
  );
}
