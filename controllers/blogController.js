import Blog from "../models/blogModel.js";
import fs from "fs";

class BlogController {
  async createBlog(req, res) {
    try {
      const userId = req.user.id;
      const { title, description, category, subtitle } = req.body;

      if (!userId) {
        return res.status(400).json({
          message: "Please Login",
        });
      }

      if (!title || !description || !category || !subtitle) {
        return res.status(400).json({
          message: "Please provide title, description, category, and subtitle",
        });
      }
      let fileName;
      if (!req.file) {
        return res.status(400).json({
          message: "Please Insert the Image",
        });
      }

      fileName = process.env.LIVE_SERVER + req.file.filename;

      const blog = await Blog.create({
        title,
        description,
        category,
        userId,
        subtitle,
        imageUrl: fileName,
      });

      res.status(201).json({
        message: "Blog Created Successfully",
        blog,
      });
    } catch (error) {
      console.log(error, "Errorr");
      return res.status(500).json({
        message: "Internal server Errorr",
      });
    }
  }

  async getAllBlog(req, res) {
    const data = await Blog.find().populate("userId", "-password");
    if (data.length == 0) {
      return res.status(404).json({
        message: "No blog found",
      });
    }
    res.status(200).json({
      message: "Blogs fetched successfully",
      data,
    });
  }
  async getSingleBlog(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "Please provide id",
      });
    }

    const data = await Blog.findById(id).populate("userId", "-password");
    res.status(200).json({
      message: "Blogs fetched successfully",
      data,
    });
  }

  async deleteBlog(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        message: "Please provide userId",
      });
    }

    if (!id) {
      return res.status(400).json({
        message: "Please provide id",
      });
    }
    const data = await Blog.findById(id).populate("userId");

    const blog = await Blog.findByIdAndDelete(id);
    if (data.userId.equals(userId)) {
      if (blog.imageUrl && process.env.LIVE_SERVER) {
        const lengthToCut = process.env.LIVE_SERVER.length;

        if (blog.imageUrl.startsWith(process.env.LIVE_SERVER)) {
          const finalFilePathAfterCut = blog.imageUrl.slice(lengthToCut);

          fs.unlink("./uploads/" + finalFilePathAfterCut, (err) => {
            if (err) {
              console.log("Error deleting file:", err);
            } else {
              console.log("File deleted successfully");
            }
          });
        }
      }

      res.status(200).json({
        message: "Blogs deleted successfully",
      });
      return;
    } else {
      return res.status(403).json({
        message: "You arenot the author",
      });
    }
  }
  async updateBlog(req, res) {
    try {
      const id = req.params.id;
      const { title, description, category, subtitle } = req.body;

      if (!id) {
        res.status(400).json({
          message: "You are not loggedIn",
        });
        return;
      }
      if (!title || !description || !category || !subtitle) {
        return res.status(400).json({
          message: "Please provide all required fields",
        });
      }
      const oldData = await Blog.findById(id);
      console.log("old", oldData);
      if (!oldData) {
        return res.status(400).json({
          message: "No data found with that id",
        });
      }
      const oldProductImage = oldData.imageUrl;
      const lengthToCut = process.env.LIVE_SERVER.length;
      const finalFilePathAfteCut = oldProductImage.slice(lengthToCut);

      if (req.file && req.file.filename) {
        fs.unlink("./uploads/" + finalFilePathAfteCut, (err) => {
          if (err) {
            console.log("Error deleting FIle");
          } else {
            console.log("File deleted successfully");
          }
        });
      }
      const datas = await Blog.findByIdAndUpdate(
        id,
        {
          title,
          description,
          category,
          subtitle,
          imageUrl:
            req.file && req.file.filename
              ? process.env.LIVE_SERVER + req.file.filename
              : oldProductImage,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "Blog Updated successfully",
        data: datas,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server Error",
      });
      console.log("error", error);
    }
  }
}

export default new BlogController();
