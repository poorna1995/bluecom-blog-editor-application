"use client";
import { useQuery } from "@tanstack/react-query";
import BlogsList, { getBlogs } from "components/BlogsList";
import BlogSkeletonList from "components/BlogsList/BlogSkeletonList";
import { BLOG } from "constants/API_URLS";
import useLocalStorage from "lib/hooks/use-local-storage";
import { redirect, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import lodash from "lodash";
export default function AllBlogsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useLocalStorage<{
    login_token: string;
    is_admin: boolean;
  }>("currentUser", {
    login_token: "",
    is_admin: false,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["blogs", currentUser.login_token],
    queryFn: () => getBlogs(currentUser.login_token),
  });

  const orderedBlogs = lodash.orderBy(data?.result, "published_at", "desc");
  const blogs = orderedBlogs; 
  //  data?.result || [];

  // const [blogsCount, setBlogsCount] = useLocalStorage("blogsCount", 0);
  // if (!currentUser.login_token) {
  //   redirect("/login");
  // }

  return (
    <div>
      <div className="bg-white py-8 sm:py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                All Blogs ({blogs.length})
              </h2>
            </div>
            <div className="flex min-w-[480px] items-center justify-end">
              {currentUser.is_admin && (
                <button
                  className="mr-4 flex w-[200px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => router.push("/create")}
                >
                  Create Blog
                </button>
              )}
              {currentUser.is_admin && (
                <button
                  className="flex w-[200px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() =>
                    setCurrentUser({
                      login_token: "",
                      is_admin: false,
                    })
                  }
                >
                  Logout
                </button>
              )}
              {!currentUser.is_admin && (
                <button
                  className="flex w-[200px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {isLoading ? <BlogSkeletonList /> : <BlogsList blogs={blogs} />}
          {/* <Suspense fallback={<BlogSkeletonList />}>
            <BlogsList login_token={currentUser.login_token} />
          </Suspense> */}
        </div>
      </div>
    </div>
  );
}
