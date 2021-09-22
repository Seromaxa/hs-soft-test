export const open = (arr, id, id2, changeFild) => {
  return arr.map((item) => {
    if (item[id] === id2) {
      item = { ...item, [changeFild]: !item[changeFild] }
    } else {
      Object.keys(item).map((key) => {
        if (Array.isArray(item[key])) {
          item[key] = open(item[key], id, id2, changeFild)
        }
        return item
      })
    }
    return item
  })
}

export const close = (arr, fild) => {
  return arr.map((item) => {
    item = { ...item, [fild]: false }
    for (let name in item) {
      if (Array.isArray(item[name])) {
        item[name] = close(item[name], fild)
      }
    }
    return item
  })
}

export function setLevelAndActiv(item) {
  let level = 0
  function setObj(obj, l) {
    l++
    let buf = { ...obj }
    let activity = false
    for (let name in buf) {
      if (Array.isArray(buf[name])) {
        if (buf[name].length) {
          activity = true
        }
        buf[name] = buf[name].map((it) => setObj(it, l))
      }
    }
    return {
      ...buf,
      level: l,
      opener: activity,
      active: false,
      id: Date.now() + Math.random() + buf.name,
    }
  }

  item = setObj(item, level)
  return item
}

const makeName = () => {
  let str = []
  let lengthOfString = Math.floor(Math.random() * (10 - 3) + 3)

  for (let i = 0; i < lengthOfString; i++) {
    let first = Math.floor(Math.random() * (45 - 43) + 43)
    let second = Math.floor(Math.random() * 16)
    if (second > 9) {
      switch (second) {
        case 10:
          second = "A"
          break
        case 11:
          second = "B"
          break
        case 12:
          second = "C"
          break
        case 13:
          second = "D"
          break
        case 14:
          second = "E"
          break
        case 15:
          second = "F"
          break
        default:
          second = 1
      }
    }

    str.push(String.fromCharCode(`0x${first}${second}`))
  }
  str[0] = str[0].toUpperCase()
  return str.join("")
}

export function createData(num, arr, max, ev) {
  if (ev) {
    arr = arr.map((item) => {
      if (item.level >= +max) {
        return item
      } else {
        if (item.id === ev) {
          if (item.child.length > 0) {
            item = { ...item, active: !item.active }
          } else {
            for (let i = 0; i < num; i++) {
              let n = makeName()
              let obj = {
                id: `${n}${Math.random()}`,
                name: n,
                active: false,
                level: item.level + 1,
                opener: item.level + 1 === +max ? false : true,
                child: [],
              }
              item.child.push(obj)
            }
            item = { ...item, active: !item.active }
          }
        } else {
          item.child = createData(num, item.child, max, ev)
        }
      }
      return item
    })
  } else {
    for (let i = 0; i < num; i++) {
      let n = makeName()
      let obj = {
        id: `${n}${Math.random()}`,
        name: n,
        active: false,
        level: 1,
        opener: true,
        child: [],
      }
      arr.push(obj)
    }
  }
  return arr
}
