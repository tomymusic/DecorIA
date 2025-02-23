import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { motion } from "framer-motion";
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
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-blue-100 to-white min-h-screen text-gray-900">
      <h1 className="text-5xl font-semibold mb-8 text-blue-700 tracking-wide">Decoración Inteligente IA</h1>
      <Card className="w-full max-w-3xl p-10 shadow-2xl bg-white rounded-3xl border border-gray-300">
        <CardContent className="flex flex-col items-center gap-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 rounded-lg w-full text-lg shadow-md bg-gray-50 file:mr-4 file:py-2 file:px-4 file:h-10 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button
            className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition-transform"
            onClick={handleImageGeneration}
            disabled={!imageUploaded || loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Aplicar Estilos con IA"}
          </Button>
          {errorMessage && <p className="mt-4 text-red-500 text-lg font-semibold">{errorMessage}</p>}
          {imagePreview && processedImage && (
            <motion.div
              className="mt-6 w-full max-w-2xl rounded-xl overflow-hidden shadow-lg border border-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ReactBeforeSliderComponent
                firstImage={{ imageUrl: imagePreview }}
                secondImage={{ imageUrl: processedImage }}
              />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
