import axios from "axios";

const BASE_URL = "http://192.168.0.113:8080/api/books";

export const getBooks = () => axios.get(BASE_URL);


export const searchByTitle = (title) =>
  axios.get(`${BASE_URL}/search?title=${title}`);

export const searchByAuthor = (name) =>
  axios.get(`${BASE_URL}/searchByAuthor?name=${name}`);


export const addBook = (book) =>
  axios.post(BASE_URL, book);


export const deleteBook = (id) =>
  axios.delete(`${BASE_URL}/${id}`);

export const getByAvailable= ()=> axios.get(`${BASE_URL}/availableBook`);

export const updateBook = (id, data) =>
  axios.patch(`${BASE_URL}/${id}`, data);
