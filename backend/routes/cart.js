const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createCart,
  updateCart,
  deleteCart,
  clearCart,
  getUserCart,
  getCarts,
  removeProductFromCart,
} = require("../controllers/cart");
const mapCart = require("../helpers/mapCart");

router.post("/", async (req, res) => {
  try {
    const savedCart = await createCart(req.body);
    res.status(201).json(mapCart(savedCart));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedCart = await updateCart(req.params.id, req.body);
    res.send({ data: mapCart(updatedCart) });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteCart(req.params.id);
    res.status(200).json({ message: "Корзина успешно удалена" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:userId/products", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await clearCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const cart = await getUserCart(req.params.userId);
    if (cart) {
      res.status(200).json(mapCart(cart));
    } else {
      res.status(404).json({ error: "Корзина не найдена" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await getCarts();
    res.send({ data: carts.map(mapCart) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:cartId/products/:productId", async (req, res) => {
  try {
    const cartProductDelete = await removeProductFromCart(
      req.params.cartId,
      req.params.productId
    );
    res.send({ data: mapCart(cartProductDelete) });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
