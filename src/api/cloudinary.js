export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "recipes_upload");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dsqk42xqy/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};