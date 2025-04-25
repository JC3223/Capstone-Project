<template>
  <v-main class="footer-container">
    <div class="left-content">
      Ngam AI <br />
      COPYRIGHT © 2025 QUOTEMATE.<br />
      All rights reserved.
    </div>
    <div class="right-content">
      <div class="products">
        <div class="title"><strong>Products</strong></div>
        <div class="links">
          <router-link class="footer-link" to="/quotation"
            >Quotation Generator</router-link
          >
        </div>
      </div>
      <div class="legal">
        <div class="title"><strong>Legal</strong></div>
        <div class="links">Privacy Policy</div>
        <div class="links">Terms &amp; Conditions</div>
      </div>
      <div class="about">
        <div class="title"><strong>About</strong></div>
        <div class="links">About QuoteMate</div>
        <div class="links">Investor Relations</div>
      </div>
    </div>
  </v-main>
</template>

<style scoped>
.footer-container {
  background: linear-gradient(to bottom, #00bfa5, #5b78b1);
  padding: 30px 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-sections {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 30px;
}

.section-column {
  flex: 1;
}
.title {
  font-family: "Courier Prime", serif;
  color: #fff;
  font-size: 18px;
  margin-bottom: 15px;
}

.left-content {
  font-family: "Courier Prime", serif;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
}

.right-content {
  display: flex;
  font-family: "Courier Prime", serif;
  color: #fff;
  justify-content: space-around;
  align-items: flex-start;

  gap: 50px;
  cursor: pointer;
}

.right-content .title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
  font-family: "Inter", serif;
}

.right-content .links {
  font-size: 18px;
}

.footer-link {
  text-decoration: none;
  color: #fff;
}
</style>
