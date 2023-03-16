import { create } from 'zustand'

const store = create((set, get) => ({
  count: 0,
  roomCurrent:"",
  roomReceive:"",
  messageReceive:"",
  isUseChat:false,
  isLinkNotify:false,
  openPopupByClick: true,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),

  setChatRoomCurrent: (room)=>set((state)=>({
    ...state,
    roomCurrent:room
  })),
  receiveMessage: (notify) => set((state)=>({
    ...state,
    messageReceive: notify.message,
    roomReceive: notify.room
  })),
  toggleClickChat: (value)=>{
    console.log(get().isUseChat)
    set((state)=>(
      {
      ...state,
      isUseChat: value
    }))
  },
  toggleClickLink: () => {
    set((state)=>(
      {
      ...state,
      isLinkNotify: !get().isLinkNotify
    }))
  }
}))

export default store
