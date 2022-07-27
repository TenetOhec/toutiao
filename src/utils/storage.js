// export const getItem = name => {
//     const data = window.localStorage.getItem(name)
//     try {
//       return JSON.parse(data)
//     } catch (err) {
//       return data
//     }
//   }
  
//   export const setItem = (name, value) => {
//     if (typeof value === 'object') {
//       value = JSON.stringify(value)
//     }
//     window.localStorage.setItem(name, value)
//   }
  
//   export const removeItem = name => {
//     window.localStorage.removeItem(name)
//   }
  
  


//本地存储设置值
export const setItem = (name, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
}
//本地存储获取值
export const getItem = name => {
    const data = window.localStorage.getItem(name)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}
//本地存储删除值
export const removeItem = name => {
    window.localStorage.removeItem(name)

}