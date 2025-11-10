<script setup>
    import { ref } from 'vue';
    import { retrieveUserData } from './services/api';

    const count = ref(0)
    const username = ref('')
    const profile = ref([])
    const erroMensagem = ref('')

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

        erroMensagem.value = ''
        profile.value = []

        try {
            const responseProfile = await retrieveUserData(username.value);
            profile.value = responseProfile;
        } catch(error){
            console.log('Erro ao consultar GitHub Profile', error);

            if (error.response && error.response.status === 404){
                erroMensagem.value = `Não foi encontrado nenhum GitHub Profile para: ${username.value}`
            } else {
                errorMensagem.value = 'Erro ao consultar GitHub Profile. Tente novamente.'
            }
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

  <p v-if="erroMensagem" class="error-message">
    {{ erroMensagem }}
  </p>

  <div v-if="profile.login" class="profile-card">
    <img :src="profile.avatar_url" alt="Avatar do usuário">
    <h2>{{ profile.name }}</h2>
    <p class="username">@{{ profile.login }}</p>
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

    .error-message {
        color: #D8000C; /* Vermelho */
        background-color: #FFD2D2; /* Fundo vermelho claro */
        border: 1px solid #D8000C;
        padding: 10px;
        border-radius: 5px;
        margin-top: 15px;
    }

    .profile-card {
        border: 1px solid #c8d7f3;
        border-radius: 8px;
        padding: 16px;
        margin-top: 20px;
        max-width: 400px;
        text-align: center;
        background-color: #dceaf0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .profile-card img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid #000000;
    }

    .profile-card h2 {
        margin: 10px 0 0;
    }

    .profile-card .username {
        color: #666;
        margin-top: 0;
    }

    .profile-card div {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
        font-size: 0.9em;
    }
</style>