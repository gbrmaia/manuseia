import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const ErrorSearch: React.FC<{ onSearch: (value: string) => void }> = ({ onSearch }) => {
  return (
    <div className="relative w-full md:w-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar..."
        className="w-full rounded-lg bg-background pl-8"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default ErrorSearch;
