export const login = async (username, password) => {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        login(username: "${username}", password: "${password}") {
                            status
                            token
                            user {
                                id
                                username
                                profileImage
                            }
                        }
                    }
                `
            })
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }
        localStorage.setItem('token', data.data.login.token);
        return data.data.login;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const register = async (username, password) => {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        register(username: "${username}", password: "${password}") {
                            status
                            token
                            user {
                                id
                                username
                                profileImage
                            }
                        }
                    }
                `
            })
        });
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        const data = await response.json();
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }
        localStorage.setItem('token', data.data.register.token);
        return data.data.register;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};