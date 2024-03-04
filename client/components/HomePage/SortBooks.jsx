import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SortBooks = ({ onSortChange }) => {
  const handleSortChange = (value) => {
    onSortChange(value);
  };

  return (
    <div>
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] text-black font-semibold">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          <SelectItem value="title" className="cursor-pointer">
            Title
          </SelectItem>
          <SelectItem value="author" className="cursor-pointer">
            Author
          </SelectItem>
          <SelectItem value="updatedAt" className="cursor-pointer">
            Year
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortBooks;
