import { Button, Empty, SwipeCell, Tabs, Image } from '@taroify/core';
import { resetDefaultDialogOptions } from '@taroify/core/dialog/dialog.imperative';
import { View, Text, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { getCurrentInstance } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { request } from '../utils/http';
import { activityListType, userInfoType } from '../utils/type'
import './index.less'

enum TabValues {
  'collect' = 0,
  'enroll',
  'publish',
}

const userPage = () => {
  const [tab, setTab] = useState(0);
  const [userInfo, setUserInfo] = useState<userInfoType>();
  const [activityList, setActivityList] = useState<Array<activityListType>>([])

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (userInfo?._id) changeActivityList(TabValues[tab])
  }, [userInfo])

  const init = () => {
    const { router } = getCurrentInstance();
    const tab = parseInt(router?.params.type as string);
    setTab(tab);

    let openid = Taro.getStorageSync("userInfo").openid
    request({ url: "/user", method: "GET", data: { _id: openid } }).then(async (res) => {
      setUserInfo(res.data);
    })
  }

  const changeActivityList = (TabValue) => {
    let activityId = userInfo ? userInfo[TabValue] : {};
    if (activityId == undefined) {
      activityId = []
    }
    setActivityList([]);
    let promiseAll: any = []
    activityId.map(item => {
      return promiseAll.push(request({ url: "/activity", method: "GET", data: { _id: item } }))
    })
    Promise.all(promiseAll).then(res => {
      let temp: Array<activityListType> = [];
      res.map(item => {
        if (item.code == 200) temp.push(item.data[0])
      })
      setActivityList(temp)
    })

  }

  const changeTab = (tab) => {
    setTab(tab)
    changeActivityList(TabValues[tab])
    console.log(tab,TabValues[tab]);
  }



  return (
    <View className='container'>
      <Tabs value={tab} onChange={changeTab}>
        <Tabs.TabPane title="收藏列表"></Tabs.TabPane>
        <Tabs.TabPane title="报名列表"></Tabs.TabPane>

        <Tabs.TabPane title="发布管理">
          <View className="activity-lists publish">
            {
              activityList.map(item => {
                return (
                  <SwipeCell className="custom-swipe-cell">
                    <Navigator url={`/pages/add_activity/index?_id=${item._id}`} className="activity-list">
                      <View className="activity-title">
                        {item.title}
                      </View>
                      <View className="activity-content">&nbsp;&nbsp;&nbsp;&nbsp;{item.content}</View>
                      <View className="activity-bottom">
                        <Text className="people">{item.where[0] + item.peopleType}</Text>
                        <Text className="time">{item.time.join(" ")}</Text>
                      </View>
                    </Navigator>
                    <SwipeCell.Actions side="right">
                      <Button variant="contained" shape="square" color="danger">
                        删除
                      </Button>
                    </SwipeCell.Actions>
                  </SwipeCell>
                )
              })
            }
          </View>
          <Button onClick={() => Taro.navigateTo({ url: '/pages/add_activity/index' })}
            className={tab != 2 ? "hide" : "btn"}
            style={{ background: "linear-gradient(to right, #ff6034, #ee0a24)", color: "#fff" }}>+</Button>
        </Tabs.TabPane>

      </Tabs>

      <Empty className={activityList.length != 0 ? "hide" : ""}>
        <Empty.Image
          className="custom-empty__image"
          src="https://img.yzcdn.cn/vant/custom-empty-image.png"
        />
        <Empty.Description>暂无该类活动</Empty.Description>
      </Empty>

      <View className={tab == 2 ? 'hide' : 'activity-lists other'}>
        {
          activityList.map(item => {
            return (
              <Navigator url={`/pages/activity_item/index?_id=${item._id}`} className="activity-list">
                <View className="activity-title">
                  {item.title}
                </View>
                <View className="activity-content">&nbsp;&nbsp;&nbsp;&nbsp;{item.content}</View>
                <View className="activity-bottom">
                  <Text className="people">{item.where[0] + item.peopleType}</Text>
                  <Text className="time">{item.time.join(" ")}</Text>
                </View>
              </Navigator>
            )
          })
        }
      </View>

    </View>
  )
}

export default userPage;
