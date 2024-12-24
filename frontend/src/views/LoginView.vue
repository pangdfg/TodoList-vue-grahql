<script>
import { login } from '@/stores/auth';
import UserLayout from '@/layouts/UserLayout.vue'


export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async handleLogin() {
            try {
                const result = await login(this.username, this.password);
                console.log('Login successful:', result);
            } catch (error) {
                console.error('Login failed:', error);
            }
        }
    }
};
</script>

<template>
 <UserLayout>
    <form @submit.prevent="handleLogin">
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
    </form>
     </UserLayout>
</template>
