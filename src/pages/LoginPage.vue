<script setup>
import { ref } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
const emits = defineEmits(["hideLogin"]);
const email = ref();
const password = ref();
async function login() {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    emits("hideLogin");
  } catch (e) {
    alert(`Ocurrió un error ${e.message}`);
  }
}

async function signup() {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    alert("Cuenta creada exitosamente");
  } catch (e) {
    alert(`Ocurrió un error ${e.message}`);
  }
}
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent>
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="text" name="email" />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" name="password" />
      </div>
      <button type="button" @click="login">Ingresar</button>
      <button type="button" @click="signup">Crear cuenta</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  width: 400px;
  margin: 100px auto;
  background-color: rgb(237, 245, 252);
  padding-block: 30px;
  border-radius: 30px;
}
.login-container > h1 {
  text-align: center;
  font-weight: 600;
}
.login-container > form {
  display: block;
  padding: 20px 40px;
}
form > div > label {
  display: block;
  font-weight: 500;
}
form > div > input {
  margin-top: 5px;
  margin-bottom: 10px;
  display: block;
  width: 100%;
  border: 0;
  padding: 12px 10px;
  border-radius: 6px;
}
form > button {
  font-family: "Poppins", sans-serif;
  margin: 40px auto auto auto;
  display: block;
  cursor: pointer;
  border: 0;
  padding: 8px 50px;
  background-color: rgb(153, 179, 243);
  color: white;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 8px;
}
</style>