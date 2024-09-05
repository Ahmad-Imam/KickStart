import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function SearchBox({ items, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300); // Simulate a slight delay

    return () => clearTimeout(timeoutId);
  }, [query, items]);

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
      {query.trim() !== "" && (
        <ScrollArea className="h-[200px] w-full rounded-md border">
          {results?.length > 0 ? (
            <ul className="p-4">
              {results?.map((item, index) => (
                <li
                  key={index}
                  className="py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                  onClick={() => onSelect(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-center text-muted-foreground">
              No results found
            </p>
          )}
        </ScrollArea>
      )}
    </div>
  );
}
