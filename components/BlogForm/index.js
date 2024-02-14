import CheckboxInput from "components/Inputs/CheckboxInput";
import DateInput from "components/Inputs/DateInput";
import ImageInput from "components/Inputs/ImageInput";
import SelectInput from "components/Inputs/SelectInput";
import TextInput from "components/Inputs/TextInput";
import React from "react";
import Editor from "ui/editor";
import { ThreeDots } from "react-loader-spinner";
import SecondaryButton from "components/Buttons/SecondaryButton";

export default function BlogForm({
  title,
  setTitle,
  description,
  setDescription,
  keywords,
  setKeywords,
  content,
  setContent,
  inputRef,
  selectedFileUrl,
  handleFileSelect,
  category,
  setCategory,
  publishedDate,
  setPublishedDate,
  isFeaturedBlog,
  setIsFeaturedBlog,
  loading,
  handleGenerateBlogs,
  // setLoading,
}) {
  return (
    <div>
      <div className="mt-16 grid grid-cols-6 gap-x-2 gap-y-4 sm:col-span-6 sm:grid-cols-1  ">
        <TextInput
          label={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={1}
          required
        />
        <TextInput
          label={"Description"}
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          rows={1}
        />
        <CheckboxInput
          label="It is a featured blog"
          checked={isFeaturedBlog}
          setChecked={setIsFeaturedBlog}
        />
        <SelectInput
          options={categoriesOptions}
          value={category}
          onChange={setCategory}
          title={"Category"}
          required
          noPadding
          id="category-options"
          // labelStyles={{
          //   paddingBottom: "16px",
          //   fontSize: "14px",
          //   fontWeight: 500,
          //   lineHeight: "20px",
          // }}
        />
        <div className="sm:col-span-6 flex items-center ">
          <SecondaryButton
            onClick={handleGenerateBlogs}
            className="max-h-[42px] max-w-[200px] mr-4 "
          >
            Get Suggestions
          </SecondaryButton>
          {loading && (
            <ThreeDots
              height="42"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          )}
        </div>
        <DateInput
          label="Published on date:"
          required
          value={publishedDate}
          setValue={setPublishedDate}
        />
        <TextInput
          label={"Keywords"}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          rows={1}
          helperText="Enter keywords separated by commas (,) about your blog. (optional)"
        />
        <ImageInput
          inputRef={inputRef}
          selectedFile={selectedFileUrl}
          handleFileSelect={handleFileSelect}
        />
      </div>

      <Editor
        label="Content"
        required
        content={content}
        setContent={setContent}
      />
    </div>
  );
}

const categories = [
  "Barcode",
  "General",
  "Forecasting",
  "Reorder Quantity",
  "Inventory Management",
  "Product Management",
  "Replenishment",
  "Amazon",
  "Multi- Channel Ecommerce",
  "Drop shipping",
];
const categoriesOptions = categories.map((category) => ({
  value: category,
  label: category,
}));
