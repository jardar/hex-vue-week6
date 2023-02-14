<template>
  <h1>{{ product.title }}</h1>
  <my-loading :active="isLoading" />

  <div class="row">
    <div class="col-sm-6">
      <img class="img-fluid" :src="product.imageUrl" alt="" />
    </div>
    <div class="col-sm-6">
      <span class="badge bg-primary rounded-pill">{{}}</span>
      <p>商品描述：{{ product.description }}</p>
      <p>商品內容：{{ product.content }}</p>
      <del class="h6">原價 {{ product.origin_price }} 元</del>
      <div class="h5">現在只要 {{ product.price }} 元</div>
      <div>
        <div class="input-group">
          <input type="number" class="form-control" min="1" v-model="qty" />
          <button
            type="button"
            class="btn btn-primary"
            @click="handleAdd"
            :disabled="isAddLoading"
          >
            <i class="fas fa-spinner fa-pulse" v-if="isAddLoading"></i>
            加入購物車
          </button>
        </div>
      </div>
    </div>
    <!-- col-sm-6 end -->
  </div>
</template>

<script>
import hex from "@/utils/hex-api.js";
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      isLoading: false,
      isAddLoading: false,
      product: {},
      qty: 1,
    };
  },
  methods: {
    handleAdd() {
      this.isAddLoading = true;
      axios
        .post(hex.epAddToCart, {
          data: {
            product_id: this.product.id,
            qty: this.qty,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          alert("加入購物車成功");
          this.$router.replace("/products");
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.isAddLoading = false;
        });
    },
  },
  mounted() {
    this.isLoading = true;
    axios
      .get(hex.epAProductById(this.id))
      .then((res) => {
        this.product = res.data.product;
      })
      .catch((err) => {
        alert(`失敗:${err.response.data.message || "error"}`);
        this.$router.back();
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>
