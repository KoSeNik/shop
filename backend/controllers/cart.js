const Cart = require("../models/Cart");

async function createCart(data) {
  const newCart = new Cart(data);
  try {
    const savedCart = await newCart.save();
    return savedCart;
  } catch (err) {
    throw new Error("Ошибка при создании корзины");
  }
}

async function deleteCart(id) {
  try {
    await Cart.findByIdAndDelete(id);
  } catch (err) {
    throw new Error("Ошибка при удалении корзины");
  }
}

async function getUserCart(userId) {
  try {
    const cart = await Cart.findOne({ userId: userId });
    return cart;
  } catch (error) {
    throw new Error("Ошибка при получении корзины пользователя");
  }
}

async function getCarts() {
  try {
    const carts = await Cart.find();
    return carts;
  } catch (error) {
    throw new Error("Ошибка при получении списка корзин");
  }
}

async function removeProductFromCart(cartId, productId) {
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error("Корзина не найдена");
    }

    cart.products = cart.products.filter(
      (product) => product.productId !== productId
    );

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error("Ошибка при удалении товара из корзины");
  }
}

const clearCart = async (userId) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { products: [] } },
      { new: true }
    );

    if (!cart) {
      throw new Error("Корзина не найдена");
    }

    return cart;
  } catch (error) {
    throw new Error("Ошибка при очистке корзины");
  }
};

async function updateCart(id, productData) {
  try {
    const cart = await Cart.findById(id);

    if (!cart) {
      throw new Error("Корзина не найдена");
    }

    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId === productData.productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].productCount =
        productData.productCount || 1;
    } else {
      cart.products.push({
        productId: productData.productId,
        productImage: productData.productImage,
        productName: productData.productName,
        productPrice: productData.productPrice,
        productCount: productData.productCount || 1,
      });
    }

    const updatedCart = await cart.save();

    return updatedCart;
  } catch (err) {
    throw new Error("Ошибка при обновлении корзины");
  }
}

module.exports = {
  createCart,
  deleteCart,
  getUserCart,
  getCarts,
  removeProductFromCart,
  clearCart,
  updateCart,
};
