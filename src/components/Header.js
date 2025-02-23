import { SparklesIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center p-6 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <SparklesIcon className="text-yellow-500 w-6 h-6" />
        <h1 className="text-2xl font-bold text-gray-900">Decoración Inteligente IA</h1>
      </div>
      <Button className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80">
        Deploy
      </Button>
    </header>
  );
}
