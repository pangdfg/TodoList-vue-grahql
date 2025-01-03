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

export const deleteTodo = async (id) => {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        deleteTodo(id: "${id}") {
                            id
                            title
                            checked
                            userId
                        }
                    }
                `
            })
        });
        if (!response.ok) {
            throw new Error('Delete todo failed');
        }
        const data = await response.json();
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }
        return data.data.deleteTodo;
    } catch (error) {
        console.error('Error during delete todo:', error);
        throw error;
    }
};

export const updateUsername = async (newUsername) => {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        updateUsername(newUsername: "${newUsername}") {
                            id
                            username
                            profileImage
                        }
                    }
                `
            })
        });
        if (!response.ok) {
            throw new Error('Update username failed');
        }
        const data = await response.json();
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }
        return data.data.updateUsername;
    } catch (error) {
        console.error('Error during update username:', error);
        throw error;
    }
};

export const updateProfileImage = async (profileImage) => {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        updateProfileImage(profileImage: "${profileImage}") {
                            id
                            username
                            profileImage
                        }
                    }
                `
            })
        });
        if (!response.ok) {
            throw new Error('Update profile image failed');
        }
        const data = await response.json();
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }
        return data.data.updateProfileImage;
    } catch (error) {
        console.error('Error during update profile image:', error);
        throw error;
    }
};

export const createTodo = async (title) => {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        createTodo(title: "${title}") {
                            id
                            title
                            checked
                            userId
                        }
                    }
                `
            })
        });
        if (!response.ok) {
            throw new Error('Create todo failed');
        }
        const data = await response.json();
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }
        return data.data.createTodo;
    } catch (error) {
        console.error('Error during create todo:', error);
        throw error;
    }
};

export const editTodo = async (id, title, checked) => {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        editTodo(id: "${id}", title: "${title}", checked: ${checked}) {
                            id
                            title
                            checked
                            userId
                        }
                    }
                `
            })
        });
        if (!response.ok) {
            throw new Error('Edit todo failed');
        }
        const data = await response.json();
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }
        return data.data.editTodo;
    } catch (error) {
        console.error('Error during edit todo:', error);
        throw error;
    }
};