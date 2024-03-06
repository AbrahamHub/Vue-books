<script setup>
import { computed, onMounted, ref } from "vue";
import LoginPage from "./pages/LoginPage.vue";
import NavBar from "./components/NavBar.vue";
import AboutUsPage from "./pages/AboutUsPage.vue";
import ExplorePage from "./pages/ExplorePage.vue";
import { auth } from "@/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import './assets/base.css'

const user = ref(null);
const isLoginShown = computed(() => user.value === null);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});
const pageShown = ref("about-us");
function changePage(page) {
  pageShown.value = page;
}
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser !== null) {
      user.value = currentUser;
    } else user.value = null;
  });
});
</script>
<template>
  <LoginPage @hide-login="isLoginShown = false" v-if="isLoginShown === true" />
  <div v-else>
    <NavBar @change-page="changePage" @hide-login="isLoginShown = true" />
    <AboutUsPage v-if="pageShown === 'about-us'" />
    <ExplorePage v-if="pageShown === 'explore'" />
    <section v-if="pageShown === 'reviews'">
      <h2>Reseñas</h2>
    </section>
  </div>
</template>
<style scoped></style>