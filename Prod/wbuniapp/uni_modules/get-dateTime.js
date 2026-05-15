export function getDateTime() {
    const yy = new Date().getFullYear()
    const mm = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
    const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
    const hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
    const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
    const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
    const dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
    return dateTime
}

export function getDate() {
    const yy = new Date().getFullYear()
    const mm = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
    const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
    const dateTime = yy + '-' + mm + '-' + dd
    return dateTime
}