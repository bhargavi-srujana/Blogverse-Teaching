# BlogVerse — API Payloads & Response Formats

Base URL: `http://localhost:3000` (from `VITE_API_URL` in `frontend/.env`)
Auth: JWT in an **httpOnly cookie** — every protected route needs
`credentials: "include"` (fetch) or `withCredentials: true` (axios).
Content-Type for all bodies below: `application/json`.

---

## Auth / Users — `src/core/auth.js`

### POST `/api/users/signup`
Request body:
```json
{ "fullName": "Prem Sagar", "email": "prem@test.com", "password": "secret123" }
```
201 Response:
```json
{ "message": "Signup successful", "user": { "id": "...", "fullName": "...", "email": "..." } }
```
Errors: `400 { "message": "Please fill all fields" }`, `400 { "message": "User already exists" }`

### POST `/api/users/login`
Request body:
```json
{ "email": "prem@test.com", "password": "secret123" }
```
200 Response:
```json
{ "message": "Login successful", "user": { "id": "...", "fullName": "...", "email": "..." } }
```
Errors: `401 { "message": "Invalid email or password" }`

### POST `/api/users/logout`
Request body: none
200 Response:
```json
{ "message": "Logged out" }
```

### GET `/api/users/me`  (protected)
200 Response:
```json
{ "user": { "_id": "...", "fullName": "...", "email": "...", "role": "user", "posts": [], "savedPosts": [], "createdAt": "...", "updatedAt": "..." } }
```
Error: `401 { "message": "..." }` (no/invalid token cookie)

### GET `/api/users/users`  (protected)
200 Response: array of user objects (same shape as `/me`, without password)
```json
[{ "_id": "...", "fullName": "...", "email": "...", "role": "user" }]
```

### PUT `/api/users/profile`  (protected)
Request body (all fields optional, send only what changes):
```json
{ "fullName": "New Name", "email": "new@test.com", "password": "newpass123" }
```
200 Response:
```json
{ "message": "Profile updated", "user": { "id": "...", "fullName": "...", "email": "..." } }
```

### POST `/api/users/saved-posts/:postId`  (protected)
Request body: none. `:postId` = the Mongo `_id` of the post.
200 Response:
```json
{ "savedPosts": ["/posts/64abc..."] }
```

### DELETE `/api/users/saved-posts/:postId`  (protected)
200 Response:
```json
{ "savedPosts": [] }
```

---

## Posts — `src/core/post.js`

Post object shape (Mongo document):
```json
{
  "_id": "...", "title": "...", "content": "...", "author": "Prem Sagar",
  "authorId": "...", "category": "Technology", "readTime": 5,
  "image": "https://...", "tags": [], "published": false,
  "createdAt": "...", "updatedAt": "..."
}
```

### GET `/api/posts`
200 Response: array of post objects (shape above)

### GET `/api/posts/:id`
200 Response: single post object
Error: `404 { "message": "Post not found" }`

### POST `/api/posts`  (protected)
Request body (`author`/`authorId` are filled by the backend from the JWT user):
```json
{ "title": "My First Post", "content": "Hello world...", "category": "Technology", "readTime": 5, "image": "https://..." }
```
201 Response:
```json
{ "message": "Post created successfully", "post": { ...post object... } }
```

### PUT `/api/posts/:id`
Request body (any subset):
```json
{ "title": "Updated", "content": "New text", "category": "Life", "readTime": 8, "image": "https://..." }
```
200 Response:
```json
{ "message": "Post updated successfully", "post": { ...updated post... } }
```
Error: `404 { "message": "Post not found" }`

### DELETE `/api/posts/:id`
200 Response:
```json
{ "message": "Post deleted successfully" }
```
Error: `404 { "message": "Post not found" }`

---

## Quick mapping to core functions

Auth endpoints (signup/login/logout/me/profile/saved-posts) are integrated by the
students themselves in their own files — see `frontend/src/api.js` / `AuthContext.jsx`.
Post endpoints are in `frontend/src/core/post.js`:

| Endpoint | Function | Tool |
|---|---|---|
| GET /api/posts | `getPosts()` | fetch |
| GET /api/posts/:id | `getPostById(id)` | fetch |
| POST /api/posts | `createPost(post)` | axios |
| PUT /api/posts/:id | `updatePost(id, post)` | axios |
| DELETE /api/posts/:id | `deletePost(id)` | axios |
