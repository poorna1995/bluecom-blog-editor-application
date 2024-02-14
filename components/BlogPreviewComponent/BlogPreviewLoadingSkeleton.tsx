import React from "react";
import Skeleton from "react-loading-skeleton";

export default function BlogPreviewLoadingSkeleton() {
  return (
    <div className=" mx-auto max-w-2xl mt-16">
      <Skeleton height={80} className="mb-4" count={2} />

      <Skeleton height={400} className="mb-4" count={1} />

      <Skeleton height={50} className="mb-4" count={10} />
    </div>
  );
}
