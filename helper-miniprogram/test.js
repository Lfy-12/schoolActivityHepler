const activityInfo =
{
    "_id": "活动id",
    "title": "活动标题",
    "content": "活动内容",
    "time": ["开始日期","结束日期","具体时间"],
    "where": ["校区", "具体地点"],
    "num": 报名人数,
    "people": "面向对象",
    "community": "发布社团单位",
    "activityType_id": "活动类型id",
    "sutuo_id": "素拓类型id",
    "comment": [
        { "_id": "评论用户id", "content": "评论内容", "date": "评论时间" },
    ]
}

const userInfo =
{
    "cloudID": "用户id",
    "avatarUrl": "用户头像",
    "nickName": "用户昵称",
    "collect": ["收藏活动id"],
    "enroll": ["报名活动id"],
    "community": ["认证的发布社团单位"],
    "publish": ["发布活动id"]
}

const activityType =
{
    _id: "活动类型id",
    activityType_name: "活动类型"
}

const sutuo =
{
    _id: "素拓类型id",
    sutuo_name: "素拓类型"
}