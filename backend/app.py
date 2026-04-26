from flask import Flask, request, jsonify
from flask_cors import CORS
from predict_period import predict_period
import os 
import google.generativeai as genai
genai.configure(api_Key=os.getenv("GEMINI_API_KEY"))

# ✅ FIRST create app
app = Flask(__name__)

# ✅ THEN enable CORS
CORS(app)

# ✅ Upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ✅ Home route
@app.route("/")
def home():
    return jsonify({"message": "Backend Running 🚀"})


# ✅ Predict route
@app.route("/predict-period", methods=["POST"])
def predict():
    try:
        # Check file
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']

        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        # Save file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        # Call prediction
        result = predict_period(file_path)

        # ✅ Expecting result = { script, period }
        return jsonify({
            "predicted_script": result["script"],
            "estimated_period": result["period"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Run server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)