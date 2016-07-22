export const getOffset = (element) => {
  let computedStyle = getComputedStyle(element, "");
  return {
    x: Number(computedStyle.left.match(/(\d*(\.\d*)?)px/)[1]),
    y: Number(computedStyle.top.match(/(\d*(\.\d*)?)px/)[1])
  }
}