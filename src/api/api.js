import * as axios from 'axios';

const instance = axios
    .create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': '37f1e37a-0e51-4716-be38-03fd5178fb05'
        }
    });

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data);
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`);
    },
    follow(userId) {
        return instance.post(`follow/${userId}`);
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get('profile/' + userId);
    },
    getStatus(userId) {
        return instance.get('profile/status/' + userId);
    },
    updateStatus(status) {
        return instance.put('profile/status/', { status: status });
    }
}

export const authAPI = {
    me() {
        return instance.get('auth/me');
    },
    login(email, password, rememberMe = false) {
        return instance.post('auth/login', { email, password, rememberMe });
    },
    logout() {
        return instance.delete('auth/login');
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}