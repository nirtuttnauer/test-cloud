import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectBook({ selectedBook, onSelectBook }: { selectedBook: string, onSelectBook: (book: string) => void }) {
  return (
    <Select value={selectedBook} onValueChange={onSelectBook}>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Select a Harry Potter Book" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Harry Potter Series</SelectLabel>
          <SelectItem value="0">Show All Books</SelectItem>
          <SelectLabel>Harry Potter Spesific Book</SelectLabel>
          <SelectItem value="1">Harry Potter and the Sorcerer&apos;s Stone (Book 1)</SelectItem>
          <SelectItem value="2">Harry Potter and the Chamber of Secrets (Book 2)</SelectItem>
          <SelectItem value="3">Harry Potter and the Prisoner of Azkaban (Book 3)</SelectItem>
          <SelectItem value="4">Harry Potter and the Goblet of Fire (Book 4)</SelectItem>
          <SelectItem value="5">Harry Potter and the Order of the Phoenix (Book 5)</SelectItem>
          <SelectItem value="6">Harry Potter and the Half-Blood Prince (Book 6)</SelectItem>
          <SelectItem value="7">Harry Potter and the Deathly Hallows (Book 7)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
