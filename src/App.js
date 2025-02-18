import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2, ShoppingCart, Trash } from "lucide-react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

export default function Home() {
  const [imagePreview, setImagePreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  const handleCart = (product, action) => {
    setCart((prevCart) =>
      action === "add"
        ? [...prevCart, product]
        : prevCart.filter((item) => item.id !== product.id)
    );
  };

  const simulateImageGeneration = () => {
    if (!imageUploaded) return setErrorMessage("Por favor, sube una imagen antes de generar.");

    setLoading(true);
    setErrorMessage("");
    setTimeout(() => {
      setProcessedImage("https://cdn.shopify.com/s/files/1/0714/2028/1052/files/image.webp?v=1739892338");
      setSuggestedProducts([
        { id: 1, name: "Frazada Coral King", price: "$19.990", image: "https://tse1.mm.bing.net/th?id=OIP.3ITM9ay8ZQFMfEPzOEdC9AHaHa&pid=Api" },
        { id: 2, name: "Cojín con Dos Tonos", price: "$8.990", image: "https://tse2.mm.bing.net/th?id=OIP.1w88AQ86ygXYr3WueqANYgHaHa&pid=Api" },
        { id: 3, name: "Alfombra Moderna", price: "$25.990", image: "https://tse4.mm.bing.net/th?id=OIP.O0je38QsC2vyt7O9pz5KHgHaHa&pid=Api" },
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-blue-100 to-white min-h-screen text-gray-900">
      <h1 className="text-5xl font-semibold mb-8 text-blue-700 tracking-wide">Decoración Inteligente IA</h1>
      <Card className="w-full max-w-3xl p-10 shadow-2xl bg-white rounded-3xl border border-gray-300">
        <CardContent className="flex flex-col items-center gap-6">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded-lg w-full text-lg shadow-md bg-gray-50 file:mr-4 file:py-2 file:px-4 file:h-10 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <Button
            className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition-transform"
            onClick={simulateImageGeneration}
            disabled={!imageUploaded || loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Aplicar Estilos con IA"}
          </Button>
          {errorMessage && <p className="mt-4 text-red-500 text-lg font-semibold">{errorMessage}</p>}
          {imagePreview && processedImage && (
            <motion.div className="mt-6 w-full max-w-2xl rounded-xl overflow-hidden shadow-lg border border-gray-300"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <ReactBeforeSliderComponent firstImage={{ imageUrl: imagePreview }} secondImage={{ imageUrl: processedImage }} />
            </motion.div>
          )}
          {suggestedProducts.length > 0 && (
            <div className="mt-10 w-full">
              <h2 className="text-3xl font-semibold mb-6 text-gray-700 text-center">Productos Utilizados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestedProducts.map((product) => (
                  <div key={product.id} className="flex flex-col items-center border p-6 rounded-lg shadow-md bg-white text-center">
                    <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover" />
                    <h3 className="text-lg font-medium text-gray-800 mt-2">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                    <Button className="mt-3 bg-green-500 text-white px-6 py-2 rounded-lg" onClick={() => handleCart(product, "add")}>Añadir al Carrito</Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
