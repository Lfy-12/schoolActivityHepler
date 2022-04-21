import { Empty, Tabs } from '@taroify/core'
import { View, Text, Navigator } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { request } from '../../../pages/utils/http'
import { format } from '../../../pages/utils/tool';
import { activityListType } from '../../../pages/utils/type'
import './index.less'

const userPage = () => {
  const [tab, setTab] = useState(0)
  const [activityList, setActivityList] = useState<Array<activityListType>>([])

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    const date = new Date().getTime()
    let data;
    if (tab == 0) {
      data = { time: date, dateType: 'today' }
    } else if (tab == 1) {
      data = { time: date, dateType: 'future' }
    } else {
      data = { time: date, dateType: 'yesterday' }
    }
    request({ url: "/activity", method: "GET", data }).then(res => {
      console.log(res);
      setActivityList(res.data)
    })
  }, [tab])

  const init = () => {
    const { router } = getCurrentInstance();
    const tab = parseInt(router?.params.type as string);
    setTab(tab);
  }

  return (
    <>
      <Tabs value={tab} onChange={setTab}>
        <Tabs.TabPane title="今日活动"></Tabs.TabPane>
        <Tabs.TabPane title="即将开始"></Tabs.TabPane>
        <Tabs.TabPane title="往期精彩"></Tabs.TabPane>
      </Tabs>

      <Empty className={activityList.length != 0 ? "hide" : ""}>
        <Empty.Image
          className="custom-empty__image"
          src="https://img.yzcdn.cn/vant/custom-empty-image.png"
        />
        <Empty.Description>暂无该类活动</Empty.Description>
      </Empty>

      <View className='activity-lists'>
        {
          activityList.map(item => {
            return (
              <Navigator url={`/pageA/pages/activity_item/index?_id=${item._id}`} className="activity-list">
                <View className="activity-title">
                  {item.title}
                </View>
                <View className="activity-content">&nbsp;&nbsp;&nbsp;&nbsp;{item.content}</View>
                <View className="activity-bottom">
                  <Text className="people">{item.where[0] + item.peopleType}</Text>
                  <Text className="time">{format(item.time[0]) +'  ' + item.time[item.time.length - 1]}</Text>
                </View>
              </Navigator>
            )
          })
        }
      </View>
    </>



  )
}

export default userPage;
