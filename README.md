# Blog Platform API

A RESTful API for managing blog posts with image upload support.

## Features

- Create, Read, Update, Delete (CRUD) blog posts
- Image upload handling
- Authentication middleware

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Multer (for file uploads)
- JWT (for authentication)

## API Endpoints

| Method | Endpoint             | Description                       | Requires Auth |
| ------ | -------------------- | --------------------------------- | ------------- |
| POST   | `/api/blog`          | Create a new blog post            | Yes           |
| GET    | `/api/blog`          | Get all blog posts                | No            |
| GET    | `/api/blogs/:id`     | Get a single blog post            | No            |
| PUT    | `/api/blogs/:id`     | Update a blog post                | Yes           |
| DELETE | `/api/blogs/:id`     | Delete a blog post                | Yes           |
| POST   | `/api/user/login`    | Login to get authentication token | No            |
| POST   | `/api/user/register` | Register a new user               | No            |

## Request/Response Examples

### Create Blog Post

**Request:**

```http
POST /api/blogs
Content-Type: multipart/form-data
Authorization: <token>

{
  "title": "My First Blog",
  "description": "This is my first blog content",
  "category": "Technology",
  "subtitle": "An introductory post"
}
+ File: imageUrl.jpg

```

**Success Response**

```https
{
  "message": "Blog created successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "title": "My First Blog",
    "subtitle": "apis dett",
    "description": "his blog contail the detail explanation about apis",
    "category": "technology",
    "imageUrl": "http://localhost:3000/uploads/image-12345.jpg",
    "createdAt": "2023-12-15T10:30:00.000Z"
  }
}
```

## Environment Variables

Create a `.env` file with these variables:

```env
PORT =
MONGO_URI =
SECRET_key =
LIVE_SERVER =
```

## 📚 API Documentation

### **1. Interactive Documentation**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/devrel/workspace/postman-public-workspace/collection/33322053-51f1c0dc-de86-405e-b29e-7df783ac8276)

[![View in Postman](https://img.shields.io/badge/Postman-API_Docs-FF6C37?logo=postman)](https://documenter.getpostman.com/view/33322053/2sB3BAMCrT)

**Key Features:**

- One-click import to Postman
- Pre-configured example requests
- Authentication-ready templates
- Test case examples

### **How to Use:**

1. Click "Run in Postman" to import directly to your Postman workspace
2. Use the environment template below:

```json
{
  "base_url": "https://blog-platform-r6gg.onrender.com//api",
  "auth_token": "{{your_jwt_token}}"
}
```

**Collection Includes:**

- All CRUD operations for blogs
- Authentication flows
- Example requests with sample data
- Error response examples

---

### **2. Endpoint Reference**

#### **Authentication**

```http
POST /api/user/register
POST /api/user/login
```

#### **Blog**

```http
POST /api/blog
GET /api/blog
PATCH /api/blog/:id
DELETE /api/blog/:id
GET /api/blog/:id
```

### Backend is live at [Here](https://blog-platform-r6gg.onrender.com/)

## Feedback

If you have any feedback, please reach out to me at yogendrabaskota18@gmail.com
