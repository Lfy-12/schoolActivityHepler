import { Avatar, Button, Cell, Divider, Field, Image, Notify, Tag, Toast } from "@taroify/core"
import { StarOutlined, SmileCommentOutlined, Star } from "@taroify/icons"
import { View, Text, Input, Textarea } from '@tarojs/components'
import { getCurrentInstance } from "@tarojs/taro"
import { useEffect, useState } from "react"
import { request } from "../../../pages/utils/http"
import { activityListType } from "../../../pages/utils/type"
import './index.less'
import activityPic from "../../images/activity.jpg"
import { format } from "../../../pages/utils/tool"
import Taro from "@tarojs/taro"

const userPage = () => {

  const use_id = Taro.getStorageSync("userInfo").openid;

  const [collectFlag, setCollectFlag] = useState<boolean>(false);
  const [enrollFlag, setEnrollFlag] = useState<boolean>(false);
  const [activityInfo, setActivityInfo] = useState<Partial<activityListType>>({});

  useEffect(() => {
    const { router } = getCurrentInstance();
    const _id = router?.params._id;
    request({ url: "/activity", method: "GET", data: { _id } }).then(res => {
      setActivityInfo(res.data[0])
    })
  }, [])

  const collectActivity = () => {
    setCollectFlag(!collectFlag)
  }

  const enrollActivity = () => {
    const isEnroll = !enrollFlag;
    Toast.open(isEnroll ? "报名成功" : "取消报名")
    if (isEnroll) {
      request({ url: "/user/update", method: "POST", data: [{ _id: use_id }, { enroll: activityInfo._id }] }).then(res => {
        console.log(res);
      })
    }
    setEnrollFlag(isEnroll)
  }

  const postComment = () => {
    Toast.open("发布成功")
  }

  return (
    <View className="activity-info">
      <Toast id="toast" />

      <Image className="top-img" src={activityPic}></Image>
      <View className="info">

        <Text className="date">{activityInfo.time?.length ? format(activityInfo.time[0]) + '   ' + activityInfo.time[activityInfo.time.length - 1] : ''}</Text>

        <View className="middle-title">
          <View className="title">
            {activityInfo.activityType + " | " + activityInfo.title}
          </View>
          <View className="right">
            <View className="btn-box" onClick={enrollActivity}>
              <Button className={!enrollFlag ? 'btn1' : 'hide'} variant="contained" shape="round">马上报名</Button>
              <Button className={enrollFlag ? 'btn2' : 'hide'} variant="contained" shape="round">取消报名</Button>
            </View>
            <View className="collect-box" onClick={collectActivity}>
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
              <Textarea autoHeight className="input-textarea" placeholder="请输入评论" />
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
