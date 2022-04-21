import _ from "lodash"

export const formatTime = (date: any) => {
    if (date) {
        const hours = _.padStart(_.toString(date?.getHours()), 2, "0")
        const minutes = _.padStart(_.toString(date?.getMinutes()), 2, "0")
        return `${hours}:${minutes}`
    }
}

export const formatDate = (date: any) => {
    if (date) {
        const years = _.padStart(_.toString(date?.getFullYear()), 4, "0")
        const months = _.padStart(_.toString(date?.getMonth() + 1), 2, "0")
        const days = _.padStart(_.toString(date?.getDate()), 2, "0")
        return `${years}.${months}.${days}`
    }
}

export const format = (date) => {
    // 时间戳是整数，否则要parseInt转换
    let time = new Date(date)
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    return y + '.' + m + '.' + d;
}