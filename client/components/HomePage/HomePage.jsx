"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "../../lib/utils";
import { useRandomImage } from "../../hooks/randomImage";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

import EditBook from "./EditBook";
import SortBooks from "./SortBooks";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useAuth } from "../../context/AuthContext";
import { deleteBook, getAllBooks } from "../../hooks/axiosAPI";

const HomePage = () => {
  const [showEditBox, setShowEditBox] = useState(false);
  const [selectedBook, setSelectedBook] = useState(false);
  const [userData, setUserData] = useState([]);

  const randomImage = useRandomImage();

  const router = useRouter();
  const userAuth = useAuth();

  const totalPaginationPages = Math.ceil(userAuth.totalBooks / 6);

  useEffect(() => {
    if (!userAuth.isAuthenticated) {
      router.push("/login");
    }

    setUserData(userAuth?.user);
  }, [userAuth]);

  // Redirect to clicked book page
  const handleOnBookClick = (id) => {
    router.push(`/book/${id}`);
  };

  const handleEditBox = (data) => {
    setShowEditBox(data);
  };

  const handleEdit = (bookData) => {
    setShowEditBox(true);
    setSelectedBook(bookData);
  };

  const handleDelete = async (bookId) => {
    await deleteBook(`/deletebook/${bookId}`);
    userAuth.setRefetch(true);
  };

  const handleSortChange = async (sortOption) => {
    userAuth.sortBooks(sortOption);
  };

  if (!userAuth.isAuthenticated) return null;

  return (
    <div className="flex flex-col w-full h-full max-w-full relative md:border">
      <div className="flex justify-end md:mr-20 mt-8 mb-8">
        <SortBooks onSortChange={handleSortChange} />
      </div>
      <div className="w-full md:p-16 flex gap-20 flex-wrap items-center justify-center mb-12 md:mb-0">
        {userAuth?.allBooks?.map((book) => {
          return (
            <div className="flex gap-4" key={book._id}>
              <div
                className="w-32 cursor-pointer"
                onClick={() => handleOnBookClick(book._id)}
              >
                <div
                  className="border w-32 p-8 rounded-lg h-40"
                  style={{
                    backgroundImage: `url(${randomImage})`,
                    backgroundSize: "cover",
                  }}
                ></div>

                <h2 className="mt-4 text-lg font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {book.title}
                </h2>
                <h2 className="mt-4 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  Author: {book.author}
                </h2>
                <h2 className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                  Description: {book.description}
                </h2>
              </div>

              {userData?._id === book.user && (
                <div className="flex flex-col gap-4">
                  <FaEdit
                    className="text-xl cursor-pointer"
                    onClick={() => handleEdit(book)}
                  />
                  <MdDelete
                    className="text-xl cursor-pointer"
                    onClick={() => handleDelete(book._id)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalPaginationPages > 0 && (
        <Pagination className="py-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => {
                  if (userAuth?.currentPage !== 1)
                    userAuth.handlePageChange(
                      Math.max(userAuth.currentPage - 1, 1)
                    );
                }}
              />
            </PaginationItem>

            {[...Array(totalPaginationPages || 0)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    className={cn({
                      "text-black": pageNumber === userAuth?.currentPage,
                    })}
                    isActive={pageNumber === userAuth?.currentPage}
                    onClick={() => userAuth.handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem className="cursor-pointer">
              <PaginationNext
                className="cursor-pointer"
                onClick={() => {
                  if (userAuth?.currentPage !== totalPaginationPages) {
                    userAuth.handlePageChange(userAuth.currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {showEditBox && (
        <div className="absolute z-50 w-full py-20 px-20 mt-20 bg-[#2e2e2e]">
          <div className=" absolute right-0 pr-20">
            <ImCross
              className="cursor-pointer"
              onClick={() => setShowEditBox(false)}
            />
          </div>
          <EditBook
            selectedBookData={selectedBook}
            handleEditBox={handleEditBox}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
