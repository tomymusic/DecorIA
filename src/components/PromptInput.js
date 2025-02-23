import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SparklesIcon } from "lucide-react";

const promptSuggestions = [
  "Decoración minimalista",
  "Estilo rústico moderno",
  "Ambiente acogedor",
  "Diseño industrial",
  "Espacio elegante"
];

export default function PromptInput({ onSubmit, isLoading }) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-4">
      <Input
        type="text"
        placeholder="Escribe una descripción aquí..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm"
      />
      <div className="flex gap-2 flex-wrap">
        {promptSuggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="text-sm px-3 py-1 rounded-md"
            onClick={() => setPrompt(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
      <Button
        onClick={() => onSubmit(prompt)}
        disabled={isLoading || !prompt}
        className="w-full bg-primary text-white py-2 rounded-lg shadow-lg hover:bg-primary-dark"
      >
        {isLoading ? <SparklesIcon className="animate-spin" /> : "Generar Imagen"}
      </Button>
    </div>
  );
}
