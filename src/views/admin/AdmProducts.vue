<template>
  <my-loading :active="isLoading" />
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th>評價</th>
          <th width="72">產品圖</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="Array.isArray(items) && items.length > 0">
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>
              {{
                item.rate
                  ? item.rate == 3
                    ? "✭✭✭"
                    : item.rate == 2
                    ? "✭✭"
                    : (item.rate = 1 ? "✭" : "")
                  : ""
              }}
            </td>
            <td>
              <img
                :src="item.imageUrl"
                alt="product"
                width="48"
                class="img-thumbnail"
              />
            </td>
            <td class="text-end">{{ item.origin_price }}</td>
            <td class="text-end">{{ item.price }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="7">
              <p style="text-align: center; padding: 30px">產品列表為空</p>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <page-comp :page="page" @change="handlePageChange"></page-comp>
  </div>
</template>
<script>
import axios from "axios";
import hex from "@/utils/hex-api.js";
import PageComp from "@/components/PageComp.vue";
export default {
  components: {
    PageComp,
  },
  data() {
    return {
      items: [],
      page: {},
      isLoading: false,
    };
  },
  methods: {
    handlePageChange(pageIdx) {
      // console.log(pageIdx);
      if (this.page.current_page === pageIdx) {
        return;
      }
      this.doGetAdminProductsByPage(pageIdx);
    },
    doGetAdminAllProducts() {
      axios
        .get(`${hex.epAdmAllProducts}`)
        .then((res) => {
          // // console.log(res.data);
          const products = res.data.products;
          this.items = products ? Object.values(products) : [];
        })
        .catch((err) => {
          // // console.log(err);
          alert(err.response.data.message || "error");
        });
    },
    doGetAdminProductsByPage(pageNum = 1) {
      this.isLoading = true;
      axios
        .get(`${hex.epAdmGetProductsByCatPage}?page=${pageNum}`)
        .then((res) => {
          this.page = res.data.pagination;
          const products = res.data.products;
          this.items = products ? Object.values(products) : [];
        })
        .catch((err) => {
          // // console.log(err);
          alert(`產品列表：${err.response.data.message || "error"}`);
          this.$router.replace("/login");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.doGetAdminProductsByPage();
  },
};
</script>
