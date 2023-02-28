import { create } from 'zustand'

const store = create((set, get) => ({
  count: 0,
  roomCurrent:"",
  roomReceive:"",
  messageReceive:"",
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
  }))
}))

export default store
