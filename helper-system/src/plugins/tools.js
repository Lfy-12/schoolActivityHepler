export const format = (date) => {
    //shijianchuo是整数，否则要parseInt转换
    let time = new Date(parseInt(date))
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    return y + '.' + m + '.' + d;
}