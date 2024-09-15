const mongoose = require("mongoose");

module.exports = function (product) {
  return {
    id: product.id,
    title: product.title,
    image: product.image,
    description: product.description,
    price: product.price,
    category: product.category,
  };
};
