<script setup>
defineProps(["book"]);
</script>

<template>
  <div class="book-card">
    <div class="img-container">
      <img :src="book.image" alt="" />
    </div>
    <div class="info-container">
      <p><span>Titulo:</span> {{ book.title }}</p>
      <p><span>Subtitulo:</span> {{ book.subtitle }}</p>
      <p><span>Autores:</span> {{ book.authors }}</p>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  margin: 20px auto;
  width: 80%;
  height: 160px;
  display: flex;
  background-color: aliceblue;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid rgb(209, 209, 209);
  cursor: pointer;
}

span {
  font-weight: 700;
}

.img-container {
  width: 30%;
  background-color: antiquewhite;
  border-radius: 20px 0 0 20px;
}

.info-container {
  width: 70%;
  padding: 15px;
}

img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>
