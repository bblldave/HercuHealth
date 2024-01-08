import { create } from 'zustand';

const useUserStore = create((set) => ({
  isLoggedIn: false,
  userProfile: null,
  setIsLoggedIn: () => set({isLoggedIn: true}),
  clearIsLoggedIn: () => set({isLoggedIn: false}),
  setUserProfile: (profile) => set({userProfile: profile}),
  clearUserProfile: () => set({userProfile: null})
}));

export default useUserStore;