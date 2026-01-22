import User from "../models/User.js";
import Posts from "../models/Posts.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

export const createPost = async (req, res) => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ msg: "Пользователь не найден" });
    }

    let imageUrl = "";

    if (req.files && req.files.image) {
      const image = req.files.image;
      const ext = path.extname(image.name);
      const filename = crypto.randomUUID() + ext;
      await image.mv(path.join(__dirname, "../uploads", filename));
      imageUrl = `/uploads/${filename}`;
    }

    const newPost = new Posts({
      username: user.username,
      title,
      text,
      imgUrl: imageUrl,
      author: user._id,
    });

    await newPost.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPost._id },
    });

    return res.status(201).json({
      newPost,
      msg: imageUrl ? "Пост создан с картинкой" : "Пост создан без картинки",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Ошибка сервера при добавлении поста" });
  }
};


export const getAllPost = async (req, res) => {
  try {
    const allpost = await Posts.find().sort("-createdAt");
    const popularPosts = await Posts.find().limit(5).sort("-view");

    if (!allpost) {
      return res.status(404).json({
        msg: "Посты не найден",
      });
    }

    return res.status(200).json({
      msg: "Успешно все посты получен",
      allpost,
      popularPosts,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Не удаось получать все посты",
    });
  }
};
