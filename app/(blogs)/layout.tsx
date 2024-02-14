"use client";
import useLocalStorage from "lib/hooks/use-local-storage";
import { redirect } from "next/navigation";
import React from "react";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
