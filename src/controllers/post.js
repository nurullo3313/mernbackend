import User from "../models/User.js";
import Posts from "../models/Posts.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { assert } from "console";
import Comment from "../models/Comment.js";



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

export const getOnePost = async (req, res) => {
  try {
    const onePost = await Posts.findByIdAndUpdate(
      req.params.id,
      { $inc: { view: 1 } },
      { new: true },
    );

    if (!onePost) {
      return res.status(404).json({
        onePost,
        msg: "Пост  не найден!",
      });
    }
    return res.status(200).json({
      onePost,
      msg: "Пост успешно получен!",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Не удалось получать один пост!",
    });
  }
};

export const myPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Posts.findById(post._id);
      }),
    );

    if (list.length === 0) {
      return res.status(404).json({
        msg: "У вас нет постов!!",
      });
    }

    return res.status(200).json({
      list,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Не удалось получит ваши посты!",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        msg: "Пост не найден!",
      });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    return res.status(200).json({
      msg: "Пост успешно удалён!!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Не удалось удалить пость",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const post = await Posts.findById(id);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    if (!post) {
      return res.status(404).json({ msg: "Пост не найден" });
    }

    if (req.files && req.files.image) {
      const image = req.files.image;
      const ext = path.extname(image.name);
      const filename = crypto.randomUUID() + ext;

      await image.mv(path.join(__dirname, "../uploads", filename));

      post.imgUrl = `/uploads/${filename}`; // ✅ ДУРУСТ
    }

    post.title = title;
    post.text = text;

    await post.save();

    return res.status(200).json({
      post,
      msg: "Пост успешно изменён",
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error); // 👈 БИН, АГАР БОЗ ХАТО ШАВАД
    res.status(500).json({ msg: "Не удалось изменить пост" });
  }
};


export const getComments = async (req, res)=>{
  try {
    const post  = await Posts.findById(req.params.id)
    if(!post){
     return res.status(404).json({
        msg : "Пост не найден!"
      })
    }
    const list = await Promise.all(
      post.comments.map((comment)=>{
        return Comment.findById(comment)
      })
    )

    return res.status(200).json({
      list
    })

  
  } catch (error) {
    return res.status(500).json({
      msg : "Ошбка сервера при полученя коментарии!"
    })
  }
}



