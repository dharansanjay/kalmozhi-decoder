import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# ✅ Load model
model = load_model("period_model.h5")

# ✅ Class names (same order as training)
class_names = ['Chola_Later_Tamil', 'Tamil_Brahmi', 'Vattezhuthu']

# ✅ Script → Period mapping
script_to_period = {
    "Tamil_Brahmi": "3rd Century BCE – 3rd Century CE (Sangam Era)",
    "Vattezhuthu": "5th – 10th Century CE (Pandya Period)",
    "Chola_Later_Tamil": "9th – 13th Century CE (Chola Period)"
}

def predict_period(img_path):
    # ✅ Load & preprocess image
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    # ✅ Prediction
    prediction = model.predict(img_array)

    predicted_class = np.argmax(prediction)
    confidence = float(np.max(prediction) * 100)

    script = class_names[predicted_class]

    # ✅ Get period
    period = script_to_period.get(script, "Unknown Period")

    # ✅ FINAL RETURN (IMPORTANT 🔥)
    return {
        "script": f"{script} ({confidence:.2f}%)",
        "period": period
    }