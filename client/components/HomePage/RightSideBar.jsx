"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { searchBooks } from "../../hooks/axiosAPI";
import { useRandomImage } from "../../hooks/randomImage";
import { useAuth } from "../../context/AuthContext";

const RightSideBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();
  const userAuth = useAuth();

  if (!userAuth.isAuthenticated) return null;

  const handleSearch = async () => {
    const resData = await searchBooks(`/searchbooks?search=${searchTerm}`);

    if (resData) {
      setSearchResults(resData);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    // Trigger search on each change
    handleSearch();
  };

  // Redirect to clicked book page
  const handleOnBookClick = (id) => {
    router.push(`/book/${id}`);
  };

  return (
    <aside className="flex flex-col gap-2 h-full p-4">
      <div className="p-2 max-h-[60%]">
        <div className="flex items-center rounded-xl py-1 px-3 bg-white">
          <FaSearch className="text-black" />
          <input
            placeholder="Search for a book"
            value={searchTerm}
            onChange={handleChange}
            className="p-1 ml-2 rounded-2xl focus:outline-none"
          />
        </div>

        {searchResults.length > 0 && (
          <div className="max-h-full rounded-lg mt-2 w-full bg-white border border-gray-200 shadow-md overflow-x-hidden overflow-y-scroll">
            {searchResults.map((book) => (
              <div
                key={book._id}
                className="w-40 cursor-pointer flex justify-between gap-4 p-2 text-black"
                onClick={() => handleOnBookClick(book._id)}
              >
                <div
                  className="border w-fit p-8 rounded-lg h-fit"
                  style={{
                    backgroundImage: `url(${useRandomImage()})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div>
                  <h2 className="text-lg font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {book.title}
                  </h2>
                  <h2 className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                    Author: {book.author}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSideBar;
