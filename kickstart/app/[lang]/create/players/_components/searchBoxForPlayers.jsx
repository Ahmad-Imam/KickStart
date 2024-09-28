"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Simulated data for search results
const items = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Quince",
];

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

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
  }, [query]);

  const handleResultClick = (item) => {
    if (!savedItems.includes(item)) {
      setSavedItems((prev) => [...prev, item]);
    }
  };

  const removeSavedItem = (item) => {
    setSavedItems((prev) => prev.filter((i) => i !== item));
  };

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
                  onClick={() => handleResultClick(item)}
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

      {savedItems?.length > 0 && (
        <div className="mt-4 ">
          {/* <h3 className="font-semibold mb-2">Saved Items:</h3> */}
          <ul className="flex flex-wrap gap-2 w-full max-w-lg">
            {savedItems?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                {item}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSavedItem(item)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
