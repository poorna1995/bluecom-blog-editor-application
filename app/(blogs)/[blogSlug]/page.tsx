"use client";
import SecondaryButton from "components/Buttons/SecondaryButton";

import useLocalStorage from "lib/hooks/use-local-storage";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import BlogPreviewLoadingSkeleton from "components/BlogPreviewComponent/BlogPreviewLoadingSkeleton";
import BlogPreviewComponent from "components/BlogPreviewComponent";

export default function BlogUpdatePage({
  params = {
    blogSlug: "",
  },
}: {
  params: {
    blogSlug: string;
  };
}) {
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", {
    merchant_id: "",
    login_token: "",
    is_admin: false,
  });
  const router = useRouter();

  return (
    <div className=" mx-auto max-w-2xl">
      <div className=" fixed left-0 right-0 top-0  bg-white">
        <div className="mx-auto flex max-w-2xl  items-center justify-between py-2 z-200">
          <h1 className=" w-full text-3xl font-bold tracking-tight text-gray-900">
            Blog Preview
          </h1>
          <div className="flex min-w-[400px] items-center justify-end">
            {currentUser.is_admin && (
              <SecondaryButton
                onClick={() => router.push(`${params.blogSlug}/edit`)}
              >
                Edit
              </SecondaryButton>
            )}{" "}
            <SecondaryButton onClick={() => router.push(`/`)} className="ml-4">
              Go to Blogs
            </SecondaryButton>
          </div>
        </div>
      </div>

      <Suspense fallback={<BlogPreviewLoadingSkeleton />}>
        <BlogPreviewComponent
          login_token={currentUser.login_token}
          blogSlug={params.blogSlug}
        />
      </Suspense>
    </div>
  );
}
