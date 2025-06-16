import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    login: (user) => {
        localStorage.getItem('user', JSON.stringify(user))
    },
    logout: () => {
        localStorage.removeItem('user'),
            set({ user: null })
    }
}));

export default useAuthStore