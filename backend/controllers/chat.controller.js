const { response } = require("express");
const { ChatModel } = require("../Models/chat.model");
const { UserModel } = require("../Models/user.model");

//& access a chat between two users or create a new chat if it doesn't already exist.
const accessChat = async (req, res) => {
  //  This ID represents the user with whom the current user wants to chat.
  const { userId } = req.body;
  console.log(req.user); // current user's ID

  if (!userId) {
    console.log("UserID is not sent with request");
    return res.status(400).send({ msg: "UserID is not sent" });
  }

  // Find Existing Chat:
  var isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  // Populate Sender in Latest Message:
  // sender field with the sender's details (name, pic, and email).
  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  // Return Existing Chat or Create New:
  if (isChat.length > 0) {
    return res.send(isChat[0]);
  } else {
    var ChatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user, userId],
    };
  }
  // Create and Save New Chat:
  try {
    const createdChat = await ChatModel.create(ChatData);
    const FullChat = await ChatModel.findOne({ _id: createdChat._id })
      .populate("users", "-password")
      .exec();

    return res.status(200).send(FullChat);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchChats = async (req, res) => {
  try {
    const chats = await ChatModel.find({
      users: { $elemMatch: { $eq: req.user } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await UserModel.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(result);
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createGroupChats = async (req, res) => {
  const name = req.body.name;
  const users = req.body.users;
  if (!users || !name)
    return response.status(400).send({ msg: "Please send all the fields" });
  /* We will be sending an array from the fronted but we can not send an array directly.
   So We can first "stringify" it. And send from fronted
   Then In backend we need to "parse" it.
*/
  var allUsers = JSON.parse(users);

  // group should have 2 users
  if (allUsers.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
  allUsers.push(req.user); // current user

  try {
    const groupChat = await ChatModel.create({
      chatName: name,
      users: allUsers,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await ChatModel.find({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  try {
    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(400);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const add = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!add) {
      res.status(400);
      throw new Error("Chat Not Found");
    } else {
      res.json(add);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const remonveFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const remove = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!remove) {
      res.status(400);
      throw new Error("Chat Not Found");
    } else {
      res.json(remove);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChats,
  renameGroup,
  addToGroup,
  remonveFromGroup
};
