const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/roles");
const Cart = require("../models/Cart");
const { createCart, deleteCart } = require("./cart");

async function register(login, password) {
  let checkLogin = await User.findOne({ login });
  if (checkLogin) {
    throw new Error("Пользователь с таким логином уже есть");
  }
  if (!password) {
    throw new Error("Пароль не может быть пустой");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    login,
    password: passwordHash,
  });
  const token = generate({ id: user.id });

  await createCart({ userId: user.id, products: [] });

  return { user, token };
}

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Ошибка пароля");
  }

  const token = generate({ id: user.id });

  return { token, user };
}

function getUsers() {
  return User.find();
}

function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Администратор" },
    { id: ROLES.USER, name: "Пользователь" },
  ];
}

async function deleteUser(id) {
  try {
    await User.deleteOne({ _id: id });

    const userCart = await Cart.findOne({ userId: id });
    if (userCart) {
      await deleteCart(userCart._id);
    }
  } catch (err) {
    throw new Error("Ошибка при удалении пользователя");
  }
}

function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
};
