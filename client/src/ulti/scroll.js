const scroll = (tabBarWidth, tabMount, tabWidth) => {
  console.log(tabBarWidth, tabMount, tabWidth)
  let timeScroll = 0
  const totalTimeScroll = (tabMount * tabWidth) / tabBarWidth - 1
  const next = () => {
    if (timeScroll !== totalTimeScroll) {
      if (totalTimeScroll - timeScroll < 1) {
        timeScroll += (totalTimeScroll - timeScroll)
      } else {
        timeScroll += 1
      }
      return timeScroll
    } else {
      timeScroll = 0
      return 0
    }
  }
  const back = () => {
    if (timeScroll === 0) {
      timeScroll = totalTimeScroll
      return totalTimeScroll
    } else {
      if (timeScroll < 1) {
        timeScroll = 0
        return 0
      } else {
        timeScroll -= 1
        return timeScroll
      }
    }
  }
  return { next, back }
}

export default scroll
