<script setup>
    import { ref } from 'vue';
    import { retrieveUserData } from './services/api';

    const count = ref(0)
    const username = ref('')
    const profile = ref([])


    function increment() {
        count.value++;
    }

    function resetCount(){
        count.value=0;
    }

    async function consultar(){
        if (!username.value) {
            console.log('Nenhum username informado');
            return;
        }

        try {
            const responseProfile = await retrieveUserData(username.value);
            profile.value = responseProfile;
        } catch(error){
            console.log('Xi', error);
            profile.value = [];
        }
    }
</script>

<template>
  <div>
    <button @click="increment">Count is: {{ count }}</button>
    <button @click="resetCount"> Reset Count</button>
  </div>

  <p> O usuário a ser procurado será: {{ username }}</p>
  <input type="text" v-model="username" placeholder="GitHub Username">

  <button type="submit" @click="consultar"> Consultar</button>

  <div v-if="profile.login">
    <img :src="profile.avatar_url" alt="Avatar do usuário">
    <h2>{{ profile.name }}</h2>
    <p>@{{ profile.login }}</p>
    <p>{{ profile.bio }}</p>

    <div>
        <span> Seguidores: {{ profile.followers }}</span>
        <span> Seguindo: {{ profile.following }}</span>
        <span> Repositórios: {{ profile.public_repos }}</span>
    </div>
  </div>
</template>

<style scoped>
    button {
        font-weight: bold;
    }
</style>