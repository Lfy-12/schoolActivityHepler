import { Tabs, Calendar, TreeSelect, DropdownMenu } from "@taroify/core"
import { View, Text, ScrollView } from "@tarojs/components";
import { useEffect, useState } from "react";
import './index.less'
import { BullhornOutlined } from "@taroify/icons"
import { request } from '../utils/http'
import Taro from "@tarojs/taro";

type activityListType = {
  _id: number,
  title: string,
  type: string,
  content: string,
  startDate: string,
  endDate: string,
  num: number,
  community: string,
  where: string,
  // comment:[],
}

type categoryType = {
  _id: number,
  value: string,
  children?: Array<categoryType>
}

type request = {
  code: number,
  data: Array<activityListType | categoryType>
}

const categoryPage = () => {
  const [value, setValue] = useState<number>(0)
  const [category, setCategory] = useState<Array<categoryType>>([])
  const [activityList, setActivityList] = useState<Array<activityListType>>([])
  const [partActivityList, setPartActivityList] = useState<Array<activityListType>>([])


  useEffect(() => {
    initData()
  }, [])

  const initData = () => {
    request({ url: "/category", method: "GET" }).then(res => {
      setCategory(res.data)
    })
    request({ url: "/activity", method: "GET" }).then(res => {
      setActivityList(res.data)
    })
  }

  const changeActivityList = (date) => {
    console.log(date);
    // setActivityList
  }

  return (
    <Tabs value={value} onChange={setValue}>

      {/* 分类栏 */}
      <Tabs.TabPane title="TYPE">
        <View className="cates_container">
          <ScrollView className="left_menu" scrollY>
            {
              category.map(item => {
                return (
                  <View className="menu_type" key={item._id}>
                    <Text>/ {item.value} /</Text>
                    <View className="menu_items">
                      {
                        item.children?.map(type => {
                          return (
                            <View className="menu_item" key={type._id}>{type.value}</View>
                          )
                        })
                      }
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
          <ScrollView className="right_menu" scrollY>

          </ScrollView>
        </View>
      </Tabs.TabPane>

      {/* 活动日历栏 */}
      <Tabs.TabPane title="CALENDAR">
        {/* 日历 */}
        <Calendar style={{ height: "400px" }} onChange={changeActivityList} title="" defaultValue={new Date()} max={new Date(new Date().setDate(new Date().getDate() + 14))} />
        {/* 活动列表 */}
        <View className="lists">
          <View className="list">
            <View className="left">
              <BullhornOutlined />
              <Text className="title">Title</Text>
            </View>
            <Text className="community">Community &gt;</Text>
          </View>
        </View>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default categoryPage;
