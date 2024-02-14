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
import { toast } from "sonner";
import Editor from "ui/editor";
import appFetch from "utils/appFetch";

import { remark } from "remark";
import html from "remark-html";
export default function CreateBlogPage() {
  // const [blogData, setBlogData] = useLocalStorage("blogData", {
  //   title: "",
  //   description: "",
  //   keywords: "",
  //   content: "",
  //   category: "",
  // });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState({
    label: "",
    value: "",
  });
  const [publishedDate, setPublishedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [isFeaturedBlog, setIsFeaturedBlog] = useState(false);
  console.log({ category, publishedDate });
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   setTitle(blogData.title ?? "");
  //   setDescription(blogData.description ?? "");
  //   setKeywords(blogData.keywords ?? "");
  //   setCategory(
  //     { label: blogData.category, value: blogData.category } ?? {
  //       label: "",
  //       value: "",
  //     },
  //   );
  //   setContent(blogData.content ?? "");
  // }, []);

  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", {
    merchant_id: "",
    login_token: "",
  });
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedFileUrl(URL.createObjectURL(file));
    }
  };
  // useEffect(() => {
  //   if (title) {
  //     setBlogData({
  //       title,
  //       description,
  //       keywords,
  //       content,
  //       category: category.value,
  //     });
  //     setContent(content);
  //   }
  // }, [title, description, keywords, content, category]);

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
    handleCreateBlog(e, status);
  };

  const handleCreateBlog = (
    e: React.MouseEvent<HTMLButtonElement>,
    status = "draft",
    fileUrl = "",
  ) => {
    const URL = BLOG.BLOGS;
    const data = {
      title,
      description,
      keywords,
      content,
      slug: title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/ /g, "-"), //replace space with - and also remove all the symbols like * / etc
      // slug :title.toLowerCase().replace(/ /g,"-"),
      status: status,
      user_id: currentUser.merchant_id,
      image_url: fileUrl,
      category: category.value,
      published_at: publishedDate.startDate,
      type: isFeaturedBlog ? "featured" : "normal",
      // order: isFeaturedBlog && 0,
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
      method: "POST",
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
          if (status === "draft") {
            toast("Blog has been saved as draft", {
              action: {
                label: "close",
                onClick: () => console.log("close"),
              },
            });
          }
          if (status === "published") {
            toast("Blog has been published", {
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

  const handleGenerateBlogSuggestion = () => {
    const URL = BLOG.GENERATE_BLOGS;
    const data = {
      title: title,
      category: category,
    };
    setLoading(true);
    appFetch(URL, data)
      .then((json) => {
        setLoading(false);
        if (json.status === "success") {
          console.log(json);
          setKeywords(json.result.keyword);
          const markdownContent = json.result.output;
          const contentHtml = getHTMLData(markdownContent)
            .then((res) => {
              console.log({ res });
              setContent(res);

              // return res;
            })
            .catch((err) => console.log(err));

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
    toast("Cancelled blog creation!", {
      action: {
        label: "close",
        onClick: () => console.log("close"),
      },
    });
  };
  return (
    <div className=" mx-auto max-w-2xl">
      <div className=" fixed left-0 right-0 top-0  bg-white">
        <div className="mx-auto flex max-w-2xl  items-center justify-between py-2">
          <h1 className=" w-full text-3xl font-bold tracking-tight text-gray-900">
            Create new blog
          </h1>
          <div className="flex min-w-[300px] items-center justify-between">
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
        // setLoading={setLoading}
      />
      {/* <TipTapEditor /> */}
    </div>
  );
}
