import React, { useState } from "react";

const NutritionAnalysis = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Secure API Key Handling
    const API_KEY = "694ec2159e5fa1feef97081eef52b790b597ff8f";

    // Handle Image Selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Function to Analyze the Image
    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please upload an image first.");
            return;
        }

        setLoading(true);
        setError(null);
        setResults(null);

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            console.log("Uploading image for segmentation...");

            // Step 1: Upload Image for Segmentation (Using fetch)
            const segmentationResponse = await fetch(
                "https://api.logmeal.es/v2/image/segmentation/complete",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                    body: formData,
                }
            );

            if (!segmentationResponse.ok) {
                throw new Error(`Segmentation API Error: ${segmentationResponse.statusText}`);
            }

            const segmentationData = await segmentationResponse.json();
            console.log("Segmentation Response:", segmentationData);

            if (!segmentationData.imageId) {
                throw new Error("No valid image ID returned. Try again.");
            }

            const imageId = segmentationData.imageId;

            // Step 2: Retrieve Nutrition Information (Using fetch)
            console.log("Fetching nutrition data...");
            const nutritionResponse = await fetch(
                "https://api.logmeal.es/v2/nutrition/recipe/nutritionalInfo",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ imageId }),
                }
            );

            if (!nutritionResponse.ok) {
                throw new Error(`Nutrition API Error: ${nutritionResponse.statusText}`);
            }

            const nutritionalData = await nutritionResponse.json();
            console.log("Nutrition Response:", nutritionalData);
            setResults(nutritionalData);
        } catch (err) {
            console.error("API Error:", err.message);
            setError("Failed to analyze food. Please check your API key and permissions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="nutrition-analysis">
            <h2>🍽️ Nutrition Analysis</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Food Preview" className="preview-image" />}
            <button onClick={handleUpload} disabled={!selectedFile || loading}>
                {loading ? "Analyzing..." : "Analyze Nutrition"}
            </button>

            {error && <p className="error-message">❌ {error}</p>}

            {results && (
                <div className="nutrition-results">
                    <h3>🥗 Nutrition Information</h3>

                    {/* Dish Name */}
                    <p><strong>Dish:</strong> {results.foodName?.[0] || "Dish Not Identified"}</p>

                    {/* Calories */}
                    <p><strong>Calories:</strong> {results.nutritional_info?.calories 
                        ? `${results.nutritional_info.calories.toFixed(1)} kcal` 
                        : "Data Unavailable"}</p>

                    {/* Serving Size */}
                    <p><strong>Serving Size:</strong> {results.serving_size 
                        ? `${results.serving_size}g` 
                        : "Not Specified"}</p>

                    {/* Macronutrients */}
                    <h4>🔬 Macronutrient Breakdown</h4>
                    <ul>
                        <li><strong>Protein:</strong> {results.nutritional_info?.totalNutrients?.PROCNT?.quantity
                            ? `${results.nutritional_info.totalNutrients.PROCNT.quantity.toFixed(2)}g`
                            : "Data Unavailable"}</li>
                        
                        <li><strong>Carbs:</strong> {results.nutritional_info?.totalNutrients?.CHOCDF?.quantity
                            ? `${results.nutritional_info.totalNutrients.CHOCDF.quantity.toFixed(2)}g`
                            : "Data Unavailable"}</li>

                        <li><strong>Fat:</strong> {results.nutritional_info?.totalNutrients?.FAT?.quantity
                            ? `${results.nutritional_info.totalNutrients.FAT.quantity.toFixed(2)}g`
                            : "Data Unavailable"}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NutritionAnalysis;
