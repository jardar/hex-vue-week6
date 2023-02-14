<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">前台</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/home">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">
                前台產品列表
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">
                前台購物車
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/adm/orders">
                後台購物車列表
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <p>僅供學習使用</p>
  </footer>
</template>
<script></script>
<style scoped>
main {
  padding: 24px;
}
footer {
  text-align: center;
  background-color: rgb(215, 214, 214);
  padding: 8px;
  color: rgb(170, 170, 170);
}
footer p {
  margin: 0;
}
</style>
