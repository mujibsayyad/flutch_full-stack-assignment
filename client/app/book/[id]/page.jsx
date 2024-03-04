"use client";
import React from "react";
import { useParams } from "next/navigation";

import BookDetails from "../../../components/bookDetails/BookDetails";

const page = () => {
  const params = useParams();

  return (
    <div>
      <BookDetails bookID={params} />
    </div>
  );
};

export default page;
