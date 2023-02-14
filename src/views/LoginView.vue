<template>
  <div id="app">
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="col-8">
          <form id="form" class="form-signin">
            <div class="form-floating mb-3">
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                autofocus
              />
              <label for="username">Email address</label>
            </div>

            <div class="form-floating">
              <input
                v-model="pass"
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
              />
              <label for="password">Password</label>
            </div>
            <button
              @click="handleLogin"
              class="btn btn-lg btn-primary w-100 mt-3"
              type="button"
            >
              登入
            </button>
          </form>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import hex from "@/utils/hex-api.js";
const { VITE_API_EMAIL, VITE_API_PASS } = import.meta.env;
export default {
  data() {
    return {
      email: VITE_API_EMAIL,
      pass: VITE_API_PASS,
    };
  },
  methods: {
    handleLogin() {
      if (this.email == "" || this.pass == "") {
        alert("請輸入帳密");
      }
      axios
        .post(`${hex.epLogin}`, {
          username: this.email,
          password: this.pass,
        })
        .then((res) => {
          // console.log(res.data);
          document.cookie = `myToken=${res.data.token}; expires=${new Date(
            res.data.expires
          )};`;
          axios.defaults.headers.common["Authorization"] = res.data.token;
          this.$router.replace("/adm/products");
        })
        .catch((err) => {
          alert(err.response.data.message || "error");
        });
    },
  },
};
</script>
