import { defineStore } from "pinia";
import axios from "axios";
import hex from "../utils/hex-api.js";

export const useCartStore = defineStore("cart", {
  state() {
    return {
      cart: {},
    };
  },
  getters: {
    getExistCart(productId) {
      return this.cart.carts.find((item) => item.product_id === productId);
    },
    getCart() {
      return { ...this.cart };
    },
  },
  actions: {
    refreshCarts() {
      return axios
        .get(hex.epGetCarts)
        .then((res) => {
          console.log(res.data.data);
          this.cart = res.data.data;
          return this.cart;
        })
        .catch((err) => {
          return err.response.data.message || "error";
        });
    },
    addToCart(productId, qty = 1) {
      axios
        .post(hex.epAddToCart, {
          data: {
            product_id: productId,
            qty: qty,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          alert("加入購物車成功");
          this.refreshCarts();
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {});
    },
  },
});
