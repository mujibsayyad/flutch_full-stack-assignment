import api from "../axios.config";

export const getAllBooks = async (url) => {
  try {
    const res = await api.get(url);
    const data = await res.data;
    return data;
  } catch (error) {
    return { error: error?.response?.data };
  }
};

export const createBook = async (url, bookData) => {
  try {
    const res = await api.post(url, bookData);
    const data = await res.data;

    return data;
  } catch (error) {
    return { error: error?.response?.data };
  }
};

export const getBookByID = async (url) => {
  try {
    const res = await api.get(url);
    const data = await res.data;
    return data;
  } catch (error) {
    return { error: error?.response?.data };
  }
};

export const updateBook = async (url, bookData) => {
  try {
    const res = await api.put(url, bookData);
    const data = await res.data;

    return data;
  } catch (error) {
    return { error: error?.response?.data };
  }
};

export const deleteBook = async (url, bookData) => {
  try {
    const res = await api.delete(url, bookData);
    const data = await res.data;

    return data;
  } catch (error) {
    return { error: error?.response?.data };
  }
};

export const searchBooks = async (url) => {
  try {
    const res = await api.get(url);
    const data = await res.data;

    return data;
  } catch (error) {
    return { error: error?.response?.data };
  }
};

// Auth

// User validate for first time to check is loggedin or not
export const userValidate = async (url) => {
  try {
    const res = await api.get(url);
    const data = await res.data;

    return data;
  } catch (error) {
    return { error: error?.response?.data };
  }
};

// Login user
export const userLogin = async (url, userData) => {
  try {
    const res = await api.post(url, userData);
    const data = await res.data;

    return data;
  } catch (error) {
    return { error: error?.response };
  }
};

// Signup user
export const userSignup = async (url, userData) => {
  try {
    const res = await api.post(url, userData);
    const data = await res.data;

    return data;
  } catch (error) {
    return { error: error?.response };
  }
};

// Logout user
export const userLogout = async (url) => {
  try {
    const res = await api.post(url);
    const data = await res.data;

    return data;
  } catch (error) {
    return { error: error?.response?.data };
  }
};
