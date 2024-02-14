import React from "react";
import Skeleton from "react-loading-skeleton";

export default function BlogSkeleton() {
  return (
    <div>
      <Skeleton height={160} className="mb-4 rounded-xl" />
      <Skeleton count={3} height={40} className="mb-2 rounded-xl" />
    </div>
  );
}
