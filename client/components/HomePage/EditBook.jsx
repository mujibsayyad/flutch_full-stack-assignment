import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { bookSchema } from "../../lib/zodSchema";
import { updateBook } from "../../hooks/axiosAPI";

const EditBook = ({ selectedBookData, handleEditBox }) => {
  const [bookData, setBookData] = useState({
    title: selectedBookData?.title ?? "",
    author: selectedBookData?.author ?? "",
    description: selectedBookData?.description ?? "",
  });

  const [errors, setErrors] = useState({});
  const { title, author, description } = bookData;

  const userAuth = useAuth();

  const uploadBookData = async () => {
    try {
      // Zod Validate input data
      bookSchema.parse(bookData);

      // If validation passes, proceed to upload book data
      await updateBook(`/updatebook/${selectedBookData._id}`, bookData);

      userAuth.setRefetch(true);
      handleEditBox(false);
    } catch (error) {
      setErrors(error.errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  return (
    <div className="flex flex-col gap-5 p-2 mt-6">
      {errors?.length > 0 && (
        <div className="flex flex-col gap-2">
          {errors[0] && (
            <p className="text-white bg-red-600 p-2">{errors[0]?.message}</p>
          )}
          {errors[1] && (
            <p className="text-white bg-red-600 p-2">{errors[1]?.message}</p>
          )}
          {errors[2] && (
            <p className="text-white bg-red-600 p-2">{errors[2]?.message}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-lg">Title</label>
        <input
          name="title"
          value={title}
          onChange={handleChange}
          className="p-2 rounded-lg focus:outline-blue-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg">Author</label>
        <input
          name="author"
          value={author}
          onChange={handleChange}
          className="p-2 rounded-lg focus:outline-blue-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          className="p-2 rounded-lg text-black focus:outline-blue-600"
        />
      </div>

      <button
        className="bg-blue-400 p-4 rounded-lg text-lg"
        onClick={uploadBookData}
      >
        Update Book
      </button>
    </div>
  );
};

export default EditBook;
