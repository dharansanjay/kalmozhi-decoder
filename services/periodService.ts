export const predictPeriod = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://kalmozhi-decoder.onrender.com", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  console.log(data); // 🔥 debug (important)

  return data; // ✅ full data return
};