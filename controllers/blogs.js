const blogsRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (request, response) => {
  const body = request.body;

  if (!body.title) {
    return response.status(400).json({
      error: "title missing",
    });
  } else if (!body.author) {
    return response.status(400).json({
      error: "author missing",
    });
  } else if (!body.url) {
    return response.status(400).json({
      error: "url missing",
    });
  } else if (!body.likes) {
    return response.status(400).json({
      error: "likes missing",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
