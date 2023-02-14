<template>
  <my-loading :active="isLoading" />

  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="Array.isArray(products) && products.length > 0">
        <tr v-for="prod in products" :key="prod.id">
          <td style="width: 200px">
            <img
              :src="prod.imageUrl"
              alt="prod.title"
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
            />
          </td>
          <td>{{ prod.title }}</td>
          <td>
            <del class="h6">原價 {{ prod.origin_price }} 元</del>
            <div class="h5">現在只要 {{ prod.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <router-link
                :to="`/product/${prod.id}`"
                class="btn btn-outline-secondary"
                >查看更多</router-link
              >
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="handleAddToCart(prod.id)"
                :disabled="isAddLoading === prod.id"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="isAddLoading === prod.id"
                ></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="4">
            <p style="text-align: center; padding: 30px">產品列表為空</p>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script>
import hex from "@/utils/hex-api.js";
import axios from "axios";
export default {
  data() {
    return {
      products: [],
      isLoading: false,
      isAddLoading: "",
    };
  },
  methods: {
    handleAddToCart(productId, qty = 1) {
      this.isAddLoading = productId;
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
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.isAddLoading = "";
        });
    },
  },
  mounted() {
    this.isLoading = true;
    axios
      .get(`${hex.epAllProducts}`)
      .then((res) => {
        // console.log(res.data.products);
        this.products = res.data.products;
      })
      .catch((err) => {
        alert(`失敗:${err.response.data.message || "error"}`);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>
