import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

export default function App() {
  const [imagePreview, setImagePreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // ✅ Guardar la imagen en el estado
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return setErrorMessage("No se seleccionó ninguna imagen.");

    setErrorMessage("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageFile(file); // Guardamos el archivo para enviarlo al backend
    };
    reader.readAsDataURL(file);
  };

  // ✅ Enviar la imagen al backend
  const sendImageToBackend = async () => {
    if (!imageFile) {
      return setErrorMessage("Por favor, sube una imagen antes de continuar.");
    }

    setLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/redesign-room", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setProcessedImage(data.imageUrl); // La imagen procesada devuelta por el backend
      } else {
        setErrorMessage("Error en la generación de imagen.");
      }
    } catch (error) {
      setErrorMessage("Error en el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-blue-100 to-white min-h-screen text-gray-900">
      <h1 className="text-5xl font-semibold mb-8 text-blue-700 tracking-wide">
        Decoración Inteligente IA
      </h1>
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
            onClick={sendImageToBackend}
            disabled={!imagePreview || loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Aplicar Estilos con IA"}
          </Button>
          {errorMessage && (
            <p className="mt-4 text-red-500 text-lg font-semibold">{errorMessage}</p>
          )}
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
