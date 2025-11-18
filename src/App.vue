<script setup>
    import { ref, computed } from 'vue';
    import { retrieveUserData } from './services/api';

    const count = ref(0)
    const username = ref('')
    const profile = ref([])
    const erroMensagem = ref('')

    // --- LÓGICA DO TEMA ---
    const isDarkMode = ref(false); // 2. Estado do tema

    // 3. Função para alternar
    function toggleTheme() {
        isDarkMode.value = !isDarkMode.value;
    }

    // 4. Texto dinâmico para o botão (opcional, mas legal)
    const themeButtonText = computed(() => {
        return isDarkMode.value ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    });
    // --- FIM DA LÓGICA DO TEMA ---

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
    <!-- <div>
        <button @click="increment">Count is: {{ count }}</button>
        <button @click="resetCount"> Reset Count</button>
    </div> -->

    <!-- <p> O usuário a ser procurado será: {{ username }}</p> -->

    <div class="app-container" :class="{ 'dark-theme': isDarkMode }">

        <button @click="toggleTheme" class="theme-toggle">
            {{ themeButtonText }}
        </button>

        <div class="search-box">
            <input type="text" v-model="username" placeholder="GitHub Username">
            <button type="submit" @click="consultar"> Consultar</button>
        </div>
        <p v-if="erroMensagem" class="error-message">
            {{ erroMensagem }}
        </p>

        <div v-if="profile.login" class="profile-card">
            <img :src="profile.avatar_url" alt="Avatar do usuário">
            <h2>{{ profile.name }}</h2>
            <p class="username">@{{ profile.login }}</p>
            <p>{{ profile.bio }}</p>

            <div class="stats-container">
                <span> Seguidores: {{ profile.followers }} </span>
                <span> Seguindo: {{ profile.following }} </span>
                <span> Repositórios: {{ profile.public_repos }} </span>
            </div>
    </div>
  </div>
</template>

<style scoped>
    .app-container {
        display: flex; /* Ativa o Flexbox */
        flex-direction: column; /* Empilha os itens verticalmente */
        align-items: center; /* Centraliza horizontalmente */
        justify-content: center; /* Centraliza verticalmente */
        min-height: 100vh; /* Faz o contêiner ocupar 100% da altura da tela */
        padding: 20px; /* Um respiro para não grudar nas bordas */
        box-sizing: border-box; /* Garante que o padding não estoure a altura */
    }
    button {
        font-weight: bold;
    }

    .error-message {
        color: #D8000C;
        background-color: #FFD2D2;
        border: 1px solid #D8000C;
        padding: 10px;
        border-radius: 5px;
        margin-top: 15px;
        max-width: 400px;
        width: 100%;
        box-sizing: border-box;
    }

    .search-box {
        max-width: 400px;
        text-align: center;
        background-color: #dceaf0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 20px;
        border-radius: 8px; /* Para combinar com o card */
        box-sizing: border-box;
    }

    .profile-card {
        border: 1px solid #c8d7f3;
        border-radius: 8px;
        padding: 100px;
        margin-top: 20px;
        max-width:600px;
        text-align: center;
        background-color: #dceaf0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .profile-card img {
        width: 225px;
        height: 225px;
        /* border-radius: 50%; */
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

    .stats-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
        margin-top: 15px;
        font-size: 0.9em;
    }

    /* --- Estilo do Botão de Tema --- */
    .theme-toggle {
        /* Posiciona o botão no canto */
        position: absolute;
        top: 20px;
        right: 20px;

        /* Estilo */
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;

        /* Estilo Claro (Default) */
        background-color: #f0f4f8;
        color: #333;
        border: 1px solid #c8d7f3;
    }

    /* --- Transições Suaves --- */
    .app-container, .profile-card, .search-box, .theme-toggle {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    .search-box input, .search-box button {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    /* --- ESTILOS DO MODO ESCURO (SOBRESCRITAS) --- */

    /* Fundo e Texto Gerais */
    .app-container.dark-theme {
        background-color: #1a202c; /* Fundo geral escuro */
        color: #e2e8f0; /* Texto geral claro */
    }

    /* Search Box */
    .app-container.dark-theme .search-box {
        background-color: #2d3748; /* Fundo da caixa escuro */
    }

    .app-container.dark-theme .search-box input {
        background-color: #4a5568;
        color: #e2e8f0;
        border-color: #718096;
    }

    .app-container.dark-theme .search-box button {
        background-color: #4a5568;
        color: #e2e8f0;
    }

    /* Profile Card */
    .app-container.dark-theme .profile-card {
        background-color: #2d3748;
        border-color: #4a5568;
    }

    .app-container.dark-theme .profile-card img {
        border-color: #e2e8f0; /* Borda da imagem clara */
    }

    .app-container.dark-theme .profile-card .username {
        color: #a0aec0; /* Cor secundária */
    }

    /* Mensagem de Erro */
    .app-container.dark-theme .error-message {
        background-color: #c53030; /* Vermelho escuro */
        color: #fed7d7; /* Texto claro */
        border-color: #c53030;
    }

    /* Botão de Tema (Modo Escuro) */
    .app-container.dark-theme .theme-toggle {
        background-color: #2d3748;
        color: #e2e8f0;
        border-color: #4a5568;
    }
</style>