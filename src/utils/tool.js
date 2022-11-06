export function formatNum(num) {
  if (!num) {
    return 0
  }
  return (num * 1.0).toFixed(3)
}

export function getNumVal(key, data) {
  if (!data || !Object.prototype.hasOwnProperty.call(data, key)) {
    return 0
  }
  if (Object.prototype.hasOwnProperty.call(data[key], 'value')) {
    return this.formatNum(data[key].value)
  }
  return formatNum(data[key] || 0)
}

export function getShortcuts(hour) {
  return () => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * hour)
    return [start, end]
  }
}
