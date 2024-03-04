"use client";
import { createContext, useEffect, useState, useContext } from "react";
import { userValidate, getAllBooks } from "../hooks/axiosAPI";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [refetch, setRefetch] = useState(false);

  // Function to fetch books from the backend
  const fetchBooks = async () => {
    try {
      const resData = await getAllBooks(`/getallbooks?page=${currentPage}`);
      if (resData) {
        setAllBooks(resData.books);
        setTotalBooks(resData.totalBooks);
        setRefetch(false);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const sortBooks = async (sortOption) => {
    const sortedData = await getAllBooks(
      `/getallbooks?page=${currentPage}&sort=${sortOption}`
    );

    setAllBooks(sortedData.books);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch books when the component mounts or currentPage changes
  useEffect(() => {
    fetchBooks();
  }, [currentPage, refetch, isAuthenticated]);

  // Check is user logged when component moints
  useEffect(() => {
    const checkIsUserValid = async () => {
      const req = await userValidate("/validate");

      if (req.isAuthenticated) {
        setUser(req);
      }
    };

    checkIsUserValid();
  }, []);

  // If user is loggedin update state
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        allBooks,
        totalBooks,
        currentPage,
        setRefetch,
        handlePageChange,
        sortBooks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
