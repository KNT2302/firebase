import { create } from 'zustand'

const store = create((set, get) => ({
  type: "",
  isMessageNotify: false,
  isFriendNotify: false,
  isBoxImage: false,
  openMessage: () => {
    set((state) => ({
      ...state,
      isMessageNotify: true
    }))
  },
  openFriend: () => {
    set((state) => ({
      ...state,
      isFriendNotify: true
    }))
  },
  openBoxImage: () => {
    set((state) => ({
      ...state,
      isBoxImage: true
    }))
  },
  closePopup: () => {
    set((state) => ({
      ...state,
      isMessageNotify: false,
      isFriendNotify: false,
      isBoxImage: false
    }))
  }

}))

export default store
