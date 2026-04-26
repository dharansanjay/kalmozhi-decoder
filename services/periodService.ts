export const predictPeriod = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:8000/predict-period", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  console.log(data); // 🔥 debug (important)

  return data; // ✅ full data return
};