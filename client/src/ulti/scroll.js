const scroll = (tabBarWidth, tabMount, tabWidth) => {

  console.log(tabBarWidth, tabMount, tabWidth)

  const totalTimeScroll = (tabMount * tabWidth) / tabBarWidth - 1

  let timeScroll = 0
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
  return next
}

export default scroll
