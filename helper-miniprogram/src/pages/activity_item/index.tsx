import { Button } from "@taroify/core"
import { StarOutlined, ChatOutlined, Star } from "@taroify/icons"
import { View, Text } from '@tarojs/components'
import { useState } from "react"
import { activityListType } from "../utils/type"
import './index.less'

const userPage = () => {

  const [collectFlag, setCollectFlag] = useState<boolean>(false);
  const [enrollFlag, setEnrollFlag] = useState<boolean>(false);
  const [activityInfo,setActivityInfo] = useState<activityListType>();

  const collectActivity = () => {
    setCollectFlag(!collectFlag)
  }

  const enrollActivity = () => {
    setEnrollFlag(!enrollFlag)
  }

  return (
    <View className="container">

      <View className="activity-info">

      </View>



      {/* 底部导航栏 */}
      <View className="bottom">
        <View className="item">
          <ChatOutlined size="25" />
          <Text>客服</Text>
        </View>
        <View className="item" onClick={collectActivity}>
          <View className="collect-box" >
            <StarOutlined className={!collectFlag ? '' : 'hide'} size="25" />
            <Star className={collectFlag ? '' : 'hide'} size="25" style={{ color: "red" }} />
          </View>
          <Text>收藏</Text>
        </View>
        <View className="btn-box" onClick={enrollActivity}>
          <Button className={!enrollFlag ? 'btn1' : 'hide'}  variant="contained" shape="round">立即报名</Button>
          <Button className={enrollFlag ? 'btn2' : 'hide'}  variant="contained" shape="round">取消报名</Button>
        </View>
      </View>
    </View>
  )
}

export default userPage;
