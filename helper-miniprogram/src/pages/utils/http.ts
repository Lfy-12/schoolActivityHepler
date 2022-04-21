import Taro from "@tarojs/taro";

let ajaxTimes:number = 0;

type promiseType = {
    code:number,
    data:any
}

export const request = (params) => {
    ajaxTimes++;
    // 显示加载中 效果
    Taro.showLoading({
        title: "加载中",
        mask: true
    });

    const baseUrl = 'http://localhost:3000'

    // params包括url、method、data
    return new Promise((resolve: (value: promiseType) => void, reject) => {
        Taro.request({
            ...params,
            url: baseUrl + params.url,
            success: res => resolve(res.data),
            fail: err => reject(err),
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    Taro.hideLoading()
                }
            }
        })
    })
}

