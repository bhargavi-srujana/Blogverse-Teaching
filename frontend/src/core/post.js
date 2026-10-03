// ============================================================
// core/post.js — Blog post API calls (5 endpoints)
// ------------------------------------------------------------
// Teaching split:
//   * GET requests  -> native fetch   (same style students used in auth)
//   * POST/PUT/DELETE (writing data) -> axios
// Base URL comes from frontend/.env -> VITE_API_URL
// ============================================================

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Shared axios instance for the write operations.
const postApi = axios.create({
  baseURL: API,
  withCredentials: true, // sends the JWT cookie
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ---------- 1. GET all posts (fetch) ----------
export const getPosts = async () => {
  return await fetch(`${API}/api/posts`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// ---------- 2. GET one post by id (fetch) ----------
export const getPostById = async (id) => {
  return await fetch(`${API}/api/posts/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// ---------- 3. CREATE a post (axios) ----------
export const createPost = async (post) => {
  return await postApi
    .post("/api/posts", post)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// ---------- 4. UPDATE a post (axios) ----------
export const updatePost = async (id, post) => {
  return await postApi
    .put(`/api/posts/${id}`, post)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// ---------- 5. DELETE a post (axios) ----------
export const deletePost = async (id) => {
  return await postApi
    .delete(`/api/posts/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
