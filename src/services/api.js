import axios from 'axios';

const API_USERS = 'https://api.github.com/users/';

export const retrieveUserData = async (username) => {
    try {
        const responseProfile = await axios.get(`${API_USERS}${username}`);
        return responseProfile.data;
    } catch (error) {
        console.log("Erro ao buscar dados: ". error);
        throw error;
    }
};