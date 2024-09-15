const Product = require("../models/Product");

async function addProduct(product) {
  const newProduct = await Product.create(product);

  return newProduct;
}

async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    returnDocument: "after",
  });

  return newProduct;
}

function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

async function getProducts(
  search = "",
  limit = 12,
  page = 1,
  sortDirection = "increase",
  selectedCategory = ""
) {
  let sortProducts = { price: sortDirection === "increase" ? 1 : -1 };

  const query = {
    title: { $regex: search, $options: "i" },
  };

  if (selectedCategory) {
    query.category = selectedCategory;
  }

  const [products, count] = await Promise.all([
    Product.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortProducts),
    Product.countDocuments(query),
  ]);

  return {
    products,
    lastPage: Math.ceil(count / limit),
  };
}

function getProduct(id) {
  return Product.findById(id);
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProduct,
};
