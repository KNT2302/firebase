import { create } from 'zustand'

const store = create((set, get) => ({
  type: "",
  isMessageNotify: false,
  isFriendNotify: false,
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
  closePopup: () => {
    set((state) => ({
      ...state,
      isMessageNotify: false,
      isFriendNotify: false
    }))
  }

}))

export default store
