const scroll = (tabBarWidth, tabMount, tabWidth) => {

  console.log(tabBarWidth, tabMount, tabWidth)
  const totalTimeScroll = (tabMount * tabWidth) / tabBarWidth - 1

  let remaingTimeScroll = totalTimeScroll
  let timeScroll = 0
  const next = () => {
    if (remaingTimeScroll >= 1) {
      timeScroll += 1
      remaingTimeScroll -= 1
      return timeScroll
    } else if (remaingTimeScroll > 0 && remaingTimeScroll < 1) {
      remaingTimeScroll = 0
      return totalTimeScroll
    } else {
      remaingTimeScroll = totalTimeScroll
      timeScroll = 0
      return 0
    }
  }
  return next
}

export default scroll
