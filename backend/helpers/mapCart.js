module.exports = function (cart) {
  return {
    id: cart.id,
    userId: cart.userId,
    products: cart.products.map((product) => ({
      productId: product.productId,
      productImage: product.productImage,
      productName: product.productName,
      productPrice: product.productPrice,
      productCount: product.productCount,
    })),
  };
};
