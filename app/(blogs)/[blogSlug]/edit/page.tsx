"use client";
import BlogForm from "components/BlogForm";
import PrimaryButton from "components/Buttons/PrimaryButton";
import SecondaryButton from "components/Buttons/SecondaryButton";
import TextButton from "components/Buttons/TextButton";
import ImageInput from "components/Inputs/ImageInput";
import TextInput from "components/Inputs/TextInput";
import { BLOG } from "constants/API_URLS";
import useLocalStorage from "lib/hooks/use-local-storage";
import { compressImageAndUpload } from "lib/imageUpload/helper";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { remark } from "remark";
import { toast } from "sonner";
import Editor from "ui/editor";

import html from "remark-html";
import appFetch from "utils/appFetch";

export default function BlogUpdatePage({
  params = {
    blogSlug: "",
  },
}: {
  params: {
    blogSlug: string;
  };
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const getCategoryWithLabel = (category = "") => {
    return { label: category, value: category };
  };
  const [category, setCategory] = useState(getCategoryWithLabel("") || {});
  const getPublishedDate = (publishedDate = "") => {
    return {
      startDate: publishedDate,
      endDate: publishedDate,
    };
  };

  const [publishedDate, setPublishedDate] = useState(
    getPublishedDate("") || {
      startDate: "",
      endDate: "",
    },
  );

  const getFeaturedBlog = (type = "") => {
    if (type === "featured") {
      return true;
    }
    return false;
  };

  const [isFeaturedBlog, setIsFeaturedBlog] = useState(
    getFeaturedBlog("") || false,
  );
  console.log({ isFeaturedBlog });

  // const [content, setContent] = useLocalStorage("content", "");

  const [content, setContent] = useState("");
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", {
    merchant_id: "",
    login_token: "",
  });
  const [blogData, setBlogData] = useState({} as any);
  //   console.log({ blogData, content });

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    setTitle(blogData.title || "");
    setDescription(blogData.description || "");
    setKeywords(blogData.keywords || "");
    setContent(blogData.content || "");
    setCategory(getCategoryWithLabel(blogData?.category));
    setPublishedDate(getPublishedDate(blogData?.published_at));
    setSelectedFileUrl(blogData.image_url || null);
    setIsFeaturedBlog(getFeaturedBlog(blogData?.type));
  }, [blogData]);
  const getBlogs = (login_token = "") => {
    if (!login_token || !params.blogSlug) return;
    //  router.push("/login");

    // setLoading(true);
    fetch(`${BLOG.BLOGS}?slug=${params.blogSlug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${login_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          const blog =
            Array.isArray(json.result) &&
            json.result.length > 0 &&
            json.result[0];
          setBlogData(blog);
          setTitle(blog.title || "");
          setDescription(blog.description || "");
          setKeywords(blog.keywords || "");
          setContent(blog.content || "");
          setSelectedFileUrl(blog.image_url || null);
          setCategory(getCategoryWithLabel(blog?.category) || "");
          setPublishedDate(getPublishedDate(blog?.published_at) || "");
          setIsFeaturedBlog(getFeaturedBlog(blog?.type) || false);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
    // return res.json();
  };
  //   const data = await getBlogs(currentUser.login_token);
  useEffect(() => {
    getBlogs(currentUser.login_token);
  }, [params.blogSlug, currentUser.login_token]);
  const router = useRouter();
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setKeywords("");
    setContent("");
  };
  const handleClickButton = (
    e: React.MouseEvent<HTMLButtonElement>,
    status = "draft",
  ) => {
    if (selectedFile) {
      return compressImageAndUpload(
        e,
        selectedFile,
        currentUser.merchant_id,
      ).then((res) => {
        console.log(res);
        handleCreateBlog(e, status, res);
      });
    }
    handleCreateBlog(e, status, blogData.image_url);
  };
  const handleCreateBlog = (
    e: React.MouseEvent<HTMLButtonElement>,
    status = "draft",
    fileUrl = "",
  ) => {
    const URL = BLOG.BLOGS;
    const data = {
      ...blogData,
      title,
      description,
      keywords,
      content,
      slug: title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/ /g, "-"),
      status: status,
      user_id: currentUser.merchant_id,
      id: blogData.id,
      image_url: fileUrl ?? blogData.image_url,
      category: category?.value ?? blogData.category,
      published_at: publishedDate.startDate,
      type: isFeaturedBlog ? "featured" : "normal",
    };
    if (
      !title ||
      title.length === 0 ||
      !description ||
      description.length === 0 ||
      !content ||
      content.length === 0 ||
      !category.value ||
      category.value.length === 0 ||
      !publishedDate.startDate ||
      publishedDate.startDate.length === 0
    ) {
      toast.error("Please add the mandatory fields!", {
        action: {
          label: "close",
          onClick: () => console.log("close"),
        },
      });

      return;
    }

    fetch(URL, {
      body: JSON.stringify(data),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.login_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          //   console.log(json);
          // setContent("");
          resetForm();
          if (status === "draft") {
            toast("Blog has been saved as draft", {
              action: {
                label: "close",
                onClick: () => console.log("close"),
              },
            });
          }
          if (status === "published") {
            toast("Blog has been updated", {
              action: {
                label: "close",
                onClick: () => console.log("close"),
              },
            });
          }
          router.push("/");
        }
        if (json.status === "failure") {
          toast.error(json.message, {
            description: "Please login again!",
            action: {
              label: "close",
              onClick: () => console.log("close"),
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteBlog = (e: React.MouseEvent<HTMLButtonElement>) => {
    const URL = BLOG.BLOGS;
    const data = {
      user_id: currentUser.merchant_id,
      id: blogData.id,
    };

    fetch(URL, {
      body: JSON.stringify(data),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.login_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          console.log(json);
          // setContent("");
          resetForm();
          toast("Blog has been deleted!", {
            action: {
              label: "Close",
              onClick: () => console.log("close"),
            },
          });
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGenerateBlogSuggestion = () => {
    const URL = BLOG.GENERATE_BLOGS;
    const data = {
      title: title,
      category: category,
    };
    setLoading(true);
    appFetch(URL, data)
      .then(async (json) => {
        setLoading(false);
        if (json.status === "success") {
          console.log(json);
          setKeywords(json.result.keyword);
          const markdownContent = json.result.output;
          const contentHtml = await getHTMLData(markdownContent);
          setContent(contentHtml);
          // setBlogData({
          //   ...blogData,
          //   content: contentHtml,
          // });
          console.log({ contentHtml });
          return contentHtml;
          // console.log({ contentHtml });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const getHTMLData = async (data = "") => {
    const processedContent = await remark()
      .use(html, { sanitize: false })
      // .use(prism)
      .process(data);
    const contentHtml = processedContent.toString() ?? "";
    return contentHtml;
  };

  const handleCancelButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetForm();
    router.push("/");
    toast("Update cancelled!", {
      action: {
        label: "close",
        onClick: () => console.log("close"),
      },
    });
  };

  return (
    <div className=" mx-auto max-w-2xl">
      <div className=" fixed left-0 right-0 top-0  z-[2000] bg-white">
        <div className="mx-auto flex max-w-2xl  items-center justify-between py-2">
          <h1 className=" w-full text-3xl font-bold tracking-tight text-gray-900">
            Update blog
          </h1>
          <div className="flex min-w-[400px] items-center justify-between">
            <TextButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleCancelButtonClick(e)
              }
            >
              Cancel
            </TextButton>
            <SecondaryButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleClickButton(e, "draft")
              }
            >
              Save as Draft
            </SecondaryButton>
            <PrimaryButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleClickButton(e, "published")
              }
            >
              Publish
            </PrimaryButton>
            <PrimaryButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleDeleteBlog(e)
              }
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* <div className="mt-16 grid grid-cols-6 gap-x-2 gap-y-4 sm:col-span-6 sm:grid-cols-1  ">
        <TextInput
          label={"Title"}
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          rows={1}
        />
        <TextInput
          label={"Description"}
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          rows={1}
        />
        <TextInput
          label={"Keywords"}
          value={keywords}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeywords(e.target.value)
          }
          rows={1}
          helperText="Enter keywords separated by commas (,) about your blog. (optional)"
        />
        <ImageInput
          inputRef={inputRef}
          selectedFile={selectedFileUrl}
          handleFileSelect={handleFileSelect}
        />
      </div>

      <Editor label="Content" content={content} setContent={setContent} /> */}
      <BlogForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        keywords={keywords}
        setKeywords={setKeywords}
        inputRef={inputRef}
        // selectedFile={selectedFileUrl}
        handleFileSelect={handleFileSelect}
        content={content}
        setContent={setContent}
        selectedFileUrl={selectedFileUrl}
        category={category}
        setCategory={
          setCategory
          //   (
          //   e: React.SetStateAction<{ label: string; value: string }>,
          // ) => {
          //   if (typeof e === "function") {
          //     setCategory((prevCategory) => {
          //       const newCategory = e(prevCategory);
          //       handleGenerateBlogSuggestion(newCategory.value);
          //       return newCategory;
          //     });
          //   } else {
          //     setCategory(e);
          //     handleGenerateBlogSuggestion(e.value);
          //   }
          // }
        }
        publishedDate={publishedDate}
        setPublishedDate={setPublishedDate}
        isFeaturedBlog={isFeaturedBlog}
        setIsFeaturedBlog={setIsFeaturedBlog}
        loading={loading}
        handleGenerateBlogs={handleGenerateBlogSuggestion}
      />

      {/* <TipTapEditor /> */}
    </div>
  );
}
