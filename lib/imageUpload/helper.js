import imageCompression from "browser-image-compression";

function blobToFile(theBlob, fileName) {
  // const file_name = fileName.split(".")[0];
  // const file_extension = type.split("/")[1];
  // const myFileName = `${file_name}.${file_extension}`;
  return new File([theBlob], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
}
export const compressImageAndUpload = async (e, file, userID) => {
  e.preventDefault();
  const imageFile = file;

  // dispatch(setSectionLoading(true));
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/jpg",
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    const image = blobToFile(compressedFile, compressedFile.name);
    const dataURL = await handleProductImageUpload(image, userID);

    console.log({ dataURL, compressedFile });
    return dataURL;
  } catch (error) {
    console.log(error);
  }
};

const handleProductImageUpload = async (file, userID = "") => {
  // setLoading(true);
  const formData = new FormData();

  formData.append("file", file);

  const url = `https://api.bluecom.ai/api/mediaUpload?user_id=${userID}&type=product_image&category=product_image`;
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  return `https://${data.file_url}`;
};
