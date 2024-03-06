<script setup>
import { onMounted, ref } from "vue";
import { firestore, auth } from "@/firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const emits = defineEmits(["hideDetail"]);
const props = defineProps(["selectedBookId"]);
const book = ref();
async function getBook() {
  const request = await fetch(
    "https://www.dbooks.org/api/book/" + props.selectedBookId,
  );
  book.value = await request.json();
}
onMounted(() => {
  getBook();
  getReviews();
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});

const reviews = ref([]);
const newReview = ref("");
const user = ref(null);

async function getReviews() {
    try {
        const reviewsCollection = collection(firestore, "reviews");
        const reviewsSnapshot = await getDocs(reviewsCollection);
        reviews.value = reviewsSnapshot.docs.map((doc) => doc.data());
    } catch (e) {
        alert(`Ocurrió un error ${e.message}`);
    }
}

async function submitReview() {
  try {
    const reviewsCollection = collection(firestore, "reviews");
    await addDoc(reviewsCollection, {
      userId: user.value.uid,
      userEmail: user.value.email,
      content: newReview.value,
      bookId: props.selectedBookId,
    });
    alert("Reseña enviada exitosamente");
    newReview.value = "";
    await getReviews();
  } catch (e) {
    alert(`Ocurrió un error ${e.message}`);
  }
}
</script>

<template>
  <section>
    <button @click="emits('hideDetail')" type="button" class="go-back-btn">
      Atrás
    </button>
    <h2>Detalle del Libro</h2>
    <div class="detail-container">
      <img :src="book?.image" alt="" />
      <div>
        <p><span>Titulo: </span> {{ book?.title }}</p>
        <p><span>Subtitulo: </span> {{ book?.subtitle }}</p>
        <p><span>Autores: </span> {{ book?.authors }}</p>
        <p><span>Páginas: </span> {{ book?.pages }}</p>
        <p><span>Año de publicación: </span> {{ book?.year }}</p>
        <p><span>Editorial: </span> {{ book?.publisher }}</p>
        <a :href="book?.download" type="button"
          ><button type="button">Descargar</button></a
        >
        <button type="button">Crear Reseña</button>
      </div>
    </div>
    <div class="description-container">
      <span>Descripción: </span>
      <p>{{ book?.description }}</p>
    </div>
    <div>
      <h2>Reseñas</h2>
      <div
        v-for="review in reviews"
        :key="review.id"
        v-show="reviews.length"
        class="review"
      >
        <p>{{ review.userEmail }}</p>
        <p>{{ review.content }}</p>
      </div>
      <div v-show="!reviews.length">No hay reseñas</div>
      <form @submit.prevent="submitReview">
        <textarea
          :placeholder="`Escribe una reseña para ${book?.title}`"
          v-model="newReview"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
section {
  max-width: 700px !important;
}
.go-back-btn {
  border: 0;
  width: 100px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
h2 {
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
}
.detail-container {
  margin-top: 30px;
  display: flex;
}
img {
  width: 30%;
  padding: 5px;
  border-radius: 30px;
  object-fit: contain;
}
.detail-container > div {
  width: 70%;
  padding: 25px;
}
span {
  font-weight: 600;
}
a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}
div > button {
  cursor: pointer;
  display: block;
  margin-bottom: 5px;
  border: 0;
  width: 250px;
  padding: 8px 20px;
  border-radius: 5px;
  font-weight: bold;
}
div > a > button {
  cursor: pointer;
  display: block;
  margin-bottom: 5px;
  border: 0;
  width: 250px;
  padding: 8px 20px;
  border-radius: 5px;
  font-weight: bold;
}
div > a:first-of-type > button {
  margin-top: 15px;
  background-color: rgb(69, 146, 247);
  color: white;
}
div > button:last-of-type {
  background-color: rgb(255, 179, 65);
  color: white;
}
.description-container {
  margin-top: 20px;
}
.description-container > span {
  padding-left: 10px;
}
.description-container > p {
  margin-top: 5px;
  background-color: rgb(242, 242, 242);
  padding: 10px;
  border-radius: 15px;
}
form {
  margin-top: 20px;
}
form > textarea {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgb(209, 209, 209);
  margin-bottom: 10px;
  font-family: "Poppins", sans-serif;
}
form > button {
  cursor: pointer;
  border: 0;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgb(69, 146, 247);
  color: white;
  font-weight: bold;
}
.review {
  margin-top: 20px;
  padding: 10px;
  background-color: rgb(242, 242, 242);
  border-radius: 10px;
}
.review > p {
  margin-bottom: 5px;
}
.review > p:first-of-type {
  font-weight: bold;
  font-size: small;
}
</style>
