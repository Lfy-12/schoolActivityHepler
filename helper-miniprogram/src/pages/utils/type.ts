export type activityListType = {
    _id: number,
    title: string,
    content: string,
    time: Array<string>,
    where: Array<string>,
    num: number,
    community: string,
    peopleType: string,
    activityType: string,
    sutuoType: string
    comment?: Array<commentObj>,
}

type commentObj = {
    _id: string,
    openid: string,
    content: string,
    date: string
}

export type userInfoType = {
    _id: string,
    nickName: string,
    collect: Array<string>,
    enroll: Array<string>,
    community: Array<string>,
    publish: Array<string>
}