const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const upload = require("../middlewares/upload");
const mapProduct = require("../helpers/mapProduct");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { products, lastPage } = await getProducts(
    req.query.search,
    req.query.limit,
    req.query.page,
    req.query.sortDirection,
    req.query.selectedCategory
  );

  res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

router.get("/:id", async (req, res) => {
  const product = await getProduct(req.params.id);

  res.send({ data: mapProduct(product) });
});

router.post(
  "/upload",
  authenticated,
  hasRole([ROLES.ADMIN]),
  upload.single("product"),

  async (req, res) => {
    try {
      res.status(201).json({
        success: 1,
        imageUrl: `/images/${req.file.filename}`,
      });
    } catch (error) {
      console.log(`ошибка загрузки картинки: ${error}`);
    }
  }
);

router.post(
  "/addproduct",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const newProduct = await addProduct({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
    });

    res.send({ data: mapProduct(newProduct) });

    console.log(newProduct, " saved");
  }
);

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedProduct = await editProduct(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
    });

    res.send({ data: mapProduct(updatedProduct) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteProduct(req.params.id);
    res.send({ error: null });
  }
);

module.exports = router;
