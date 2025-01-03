import { useRouter } from 'vue-router';

const router = useRouter();

export const isLoggedIn = () => {
    return !!checkAuth();
};

export const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push({ name: 'login' });
        return false;
    }
    return true;
};