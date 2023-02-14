const { VITE_API, VITE_PATH } = import.meta.env;
// const apiBase = "https://vue3-course-api.hexschool.io";

const aProduct = `${VITE_API}/api/${VITE_PATH}/product`;
const products = `${VITE_API}/api/${VITE_PATH}/products`;
const theCart = `${VITE_API}/api/${VITE_PATH}/cart`;
const carts = `${VITE_API}/api/${VITE_PATH}/carts`;
const aOrder = `${VITE_API}/api/${VITE_PATH}/order`;
//
const admProducts = `${VITE_API}/api/${VITE_PATH}/admin/products`;

export default {
  epLogin: `${VITE_API}/admin/signin`,
  epUserCheck: `${VITE_API}/api/user/check`,
  epAdmAllProducts: `${admProducts}/all`,
  epAdmGetProductsByCatPage: admProducts,
  //
  epAllProducts: `${products}/all`,
  epAProductById: (id) => `${aProduct}/${id}`,
  // cart
  epAddToCart: `${theCart}`,
  epGetCarts: `${theCart}`,
  epUpdateCart: (id) => `${theCart}/${id}`,
  epDeleteCarts: `${carts}`,
  epDeleteACart: (id) => `${theCart}/${id}`,
  // order
  epCreateOrder: `${aOrder}`,
};
