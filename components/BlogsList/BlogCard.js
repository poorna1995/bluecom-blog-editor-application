import Image from "next/image";
import React from "react";
import { format } from "date-fns";
export default function BlogCard({ blog }) {
  return (
    <article className="flex max-w-xl flex-col items-start ">
      <div className="flex">
        {" "}
        {blog.image_url ? (
          <Image
            src={blog.image_url}
            alt={`${blog.title}`}
            width={300}
            height={180}
            className="mb-2 max-h-[180px] rounded-lg object-cover "
          />
        ) : (
          <svg
            className="h-[160px] w-full text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div className="flex flex-col ">
        <div className="flex items-center gap-x-0 text-xs">
          {blog.published_at && (
            <span className="text-gray-500">
              Publish Date:{" "}
              {format(new Date(blog.published_at), "MMMM dd, yyyy")}
            </span>
          )}{" "}
          <span
            // href={`/${blog.slug}`}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            Category:{blog.category}
          </span>
          <span
            // href={`/${blog.slug}`}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {blog.status}
          </span>
        </div>
        <div className="group relative">
          <h3 className="mt-1 text-lg font-semibold leading-6 text-gray-900 hover:underline group-hover:text-purple-600">
            <a href={blog.slug}>
              <span className="absolute inset-0" />
              {blog.title}
            </a>
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
            {blog.description}
          </p>
        </div>
      </div>
    </article>
  );
}
