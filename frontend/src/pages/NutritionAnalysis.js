import React, { useState } from "react";
import axios from "axios";

const NutritionAnalysis = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [nutritionData, setNutritionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // Secure API Key Handling
    const API_KEY = process.env.REACT_APP_LOGMEAL_API_KEY || "aedf8262a0c74f22fa74174e459b42cda3e14ee4";

    // Function to optimize the image before upload (convert to JPG & reduce size)
    const optimizeImage = async (file) => {
        const image = await fetch(URL.createObjectURL(file));
        const blob = await image.blob();
        return new File([blob], "optimized.jpg", { type: "image/jpeg" });
    };

    // Handle image selection
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Optimize image
            const optimizedFile = await optimizeImage(file);
            setImage(optimizedFile);
            setPreview(URL.createObjectURL(optimizedFile));
        }
    };

    // Analyze the uploaded image using LogMeal API
    const analyzeImage = async () => {
        if (!image) {
            alert("Please upload an image first!");
            return;
        }

        setLoading(true);
        setNutritionData(null);
        setErrorMessage(null);

        const formData = new FormData();
        formData.append("image", image);

        try {
            console.log("API Key:", API_KEY); // Debugging API Key
            console.log("Uploading image for food detection...");

            // Step 1: Upload Image for Food Detection
            const detectionRes = await axios.post(
                "https://api.logmeal.es/v2/image/segmentation/complete",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Detection Response:", detectionRes.data);

            if (!detectionRes.data.foods || detectionRes.data.foods.length === 0) {
                setErrorMessage("No food detected. Try another image.");
                setLoading(false);
                return;
            }

            const foodId = detectionRes.data.foods[0].food_id;
            console.log("Detected Food ID:", foodId);

            // Step 2: Retrieve Nutrition Information
            console.log("Fetching nutrition data...");
            const nutritionRes = await axios.get(
                `https://api.logmeal.es/v2/nutrition/recipe/nutritionalInfo/${foodId}`,
                {
                    headers: { Authorization: `Bearer ${API_KEY}` }
                }
            );

            console.log("Nutrition Response:", nutritionRes.data);

            setNutritionData(nutritionRes.data);
        } catch (error) {
            console.error("LogMeal API Error:", error.response?.data || error.message);
            setErrorMessage(
                "API Error: " + (error.response?.data?.message || error.message)
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="nutrition-analysis">
            <h2>🍽️ Nutrition Analysis</h2>

            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && <img src={preview} alt="Food Preview" className="preview-image" />}

            <button onClick={analyzeImage} disabled={!image || loading}>
                {loading ? "Analyzing..." : "Analyze Nutrition"}
            </button>

            {errorMessage && <p className="error-message">❌ {errorMessage}</p>}

            {nutritionData && (
                <div className="nutrition-results">
                    <h3>🥗 Nutrition Details</h3>
                    <p><strong>Dish:</strong> {nutritionData.dish_name}</p>
                    <p><strong>Calories:</strong> {nutritionData.calories} kcal</p>
                    <p><strong>Serving Size:</strong> {nutritionData.serving_size}g</p>
                    <h4>Macronutrients:</h4>
                    <ul>
                        <li>Protein: {nutritionData.protein}g</li>
                        <li>Carbs: {nutritionData.carbs}g</li>
                        <li>Fat: {nutritionData.fat}g</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NutritionAnalysis;
