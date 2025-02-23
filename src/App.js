import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Loader2 } from "lucide-react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

export default function Home() {
  const [imagePreview, setImagePreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return setErrorMessage("No se seleccionó ninguna imagen.");

    setErrorMessage("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageUploaded(true);
    };
    reader.readAsDataURL(file);
  };

  const handleImageGeneration = async () => {
    if (!imageUploaded) {
      return setErrorMessage("Por favor, sube una imagen antes de generar.");
    }

    setLoading(true);
    setErrorMessage("");

    const requestBody = {
      imageUrl: imagePreview,
      prompt: "Mejora la decoración del ambiente."
    };

    try {
      const response = await fetch("/api/redesign-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.output && data.output.length > 1) {
        setProcessedImage(data.output[1]);
      } else {
        setErrorMessage("Error al procesar la imagen.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Hubo un problema con la generación de la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10 text-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        ✨ Decoración Inteligente IA
      </h1>
      <Card className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg border">
        <CardContent className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          <Button
            className="w-full bg-black text-white py-2 rounded-md hover:opacity-80 transition"
            onClick={handleImageGeneration}
            disabled={!imageUploaded || loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Generar Imagen"}
          </Button>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {imagePreview && processedImage && (
            <ReactBeforeSliderComponent
              firstImage={{ imageUrl: imagePreview }}
              secondImage={{ imageUrl: processedImage }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
