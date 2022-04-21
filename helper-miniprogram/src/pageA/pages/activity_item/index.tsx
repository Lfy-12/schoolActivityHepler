import { Avatar, Button, Dialog, Field, Image, Tag, Toast } from "@taroify/core"
import { StarOutlined, SmileCommentOutlined, Star } from "@taroify/icons"
import { View, Text, Textarea } from '@tarojs/components'
import { getCurrentInstance } from "@tarojs/taro"
import { useEffect, useRef, useState } from "react"
import { request } from "../../../pages/utils/http"
import { activityListType, userInfoType } from "../../../pages/utils/type"
import './index.less'
import activityPic from "../../images/activity.jpg"
import { format } from "../../../pages/utils/tool"
import Taro from "@tarojs/taro"

interface commentType {
  avatarUrl: string,
  nickName: string,
  content: string
}

const userPage = () => {
  let inputValue: string = "";

  const openid = Taro.getStorageSync("userInfo").openid;

  const [collectFlag, setCollectFlag] = useState<boolean>();
  const [enrollFlag, setEnrollFlag] = useState<boolean>();
  const [activityInfo, setActivityInfo] = useState<Partial<activityListType>>({});
  const [userInfo, setUserInfo] = useState<userInfoType>();

  useEffect(() => {
    const { router } = getCurrentInstance();
    const _id = router?.params._id;
    let activityPromise = request({ url: "/activity", method: "GET", data: { _id } }).then(res => {
      return res.data[0]
    })
    let userPromise = request({ url: "/user", method: "GET", data: { _id: openid } }).then(async (res) => {
      return res.data
    })
    Promise.all([activityPromise, userPromise]).then(res => {
      setActivityInfo(res[0])
      setUserInfo(res[1])
      let enrollFlag = res[1].enroll.includes(res[0]._id)
      setEnrollFlag(enrollFlag)
      let collectFlag = res[1].collect.includes(res[0]._id)
      setCollectFlag(collectFlag)
    })
  }, [])

  // 报名、收藏按钮的触发事件
  const flagActivity = (flag, key, name) => {
    let obj = {};
    obj[key] = activityInfo._id;

    if (!flag) {
      // 更新用户信息的收藏/报名列表
      request({ url: "/user/update", method: "POST", data: [{ _id: openid }, obj] }).then(res => {
        if (res.code == 200) {
          Toast.open(`${name}成功`);
          key == "enroll" ? setEnrollFlag(!flag) : setCollectFlag(!flag);
          // 点击报名时，报名人数加1
          if (key == "enroll") {
            request({ url: "/activity/update", method: "POST", data: [{ _id: activityInfo._id }, { num: activityInfo.num as number + 1 }] }).then(res => {
              if (res.code == 200) {
                const temp = { ...activityInfo, num: activityInfo.num as number + 1 }
                setActivityInfo(temp)
              }
            })
          }
        }
      })
    } else {
      Dialog.confirm({
        title: "提示",
        message: `是否确认取消${name}`,
        onConfirm: function () {
          request({ url: "/user/delete", method: "POST", data: { _id: openid, ...obj } }).then(res => {
            if (res.code == 200) {
              Toast.open(`取消${name}`);
              key == "enroll" ? setEnrollFlag(!flag) : setCollectFlag(!flag);
              if (key == "enroll") {
                request({ url: "/activity/update", method: "POST", data: [{ _id: activityInfo._id }, { num: activityInfo.num as number - 1 }] }).then(res => {
                  if (res.code == 200) {
                    const temp = { ...activityInfo, num: activityInfo.num as number - 1 }
                    setActivityInfo(temp)
                  }
                })
              }
            }
          })
        }
      })
    }
  }

  const postComment = () => {
    if (inputValue == "") {
      Toast.open("请输入评论内容");
      return true;
    }
    let commentObj: commentType = {
      avatarUrl: "",
      nickName: "",
      content: inputValue
    };
    commentObj.avatarUrl = Taro.getStorageSync("userInfo").avatarUrl;
    commentObj.nickName = userInfo?.nickName as string;
    request({ url: "/activity/update", method: "POST", data: [{ _id: activityInfo._id }, { comment: commentObj }] }).then(res => {
      if (res.code == 200) {
        Toast.open("发布成功");
        // 更新activityInfo
        const commentArr = activityInfo.comment;
        commentArr?.push(commentObj)
        setActivityInfo({ ...activityInfo, comment: commentArr })
      }
    })
  }

  return (
    <View className="activity-info">
      <Toast id="toast" />
      <Dialog id="dialog" />

      <Image className="top-img" src={activityPic}></Image>
      <View className="info">

        <Text className="date">{activityInfo.time?.length ? format(activityInfo.time[0]) + '   ' + activityInfo.time[activityInfo.time.length - 1] : ''}</Text>

        <View className="middle-title">
          <View className="title">
            {activityInfo.activityType + " | " + activityInfo.title}
          </View>
          <View className="right">
            <View className="btn-box" onClick={() => flagActivity(enrollFlag, 'enroll', "报名")}>
              <Button className={!enrollFlag ? 'btn1' : 'hide'} variant="contained" shape="round">马上报名</Button>
              <Button className={enrollFlag ? 'btn2' : 'hide'} variant="contained" shape="round">取消报名</Button>
            </View>
            <View className="collect-box" onClick={() => flagActivity(collectFlag, 'collect', "收藏")}>
              <StarOutlined className={!collectFlag ? '' : 'hide'} size="33" style={{ color: "#ff8917" }} />
              <Star className={collectFlag ? '' : 'hide'} size="33" style={{ color: "#ff8917" }} />
            </View>
          </View>

        </View>

        <View className="content">
          <Text> &nbsp;&nbsp;&nbsp;&nbsp;{activityInfo.content}</Text>
          <Tag color="warning">已有{activityInfo.num}人报名</Tag>
          <View className="where">
            &nbsp;&nbsp;&nbsp;&nbsp;邀请您届时到&nbsp;
            <Text style={{ fontWeight: "bold" }}>{activityInfo.where ? activityInfo.where.join('') : ''}</Text>
            &nbsp;参与活动！
          </View>
        </View>

        <View className="comment">
          <View className="comment-top"> ———— 评论列表 ————</View>
          <View className="comment-lists">
            {
              activityInfo.comment?.map(item => {
                return (
                  <View className="list">
                    <Avatar className="avatar" src={item.avatarUrl} />
                    <View className="right">
                      <View className="nickname">{item.nickName}</View>
                      <View className="content">{item.content}</View>
                    </View>
                  </View>
                )
              })
            }
          </View>

          <View className="bottom">
            <Field className="input" icon={<SmileCommentOutlined size="25px" />}>
              <Textarea
                onInput={(value) => {
                  inputValue = value.detail.value
                }}
                autoHeight
                className="input-textarea"
                placeholder="请输入评论" />
            </Field>
            <Button className="btn" shape="round" color="primary" onClick={postComment}>
              发表
            </Button>
          </View>

        </View>

      </View>
    </View>
  )
}

export default userPage;
