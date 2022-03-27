import { Tabs, Calendar, TreeSelect, DropdownMenu } from "@taroify/core"
import { View, Text, ScrollView } from "@tarojs/components";
import { useState } from "react";
import './index.less'
import { BullhornOutlined } from "@taroify/icons"

type listType = {
  id: number,
  title: string,
  type: string,
  content: string,
  pic: string,
  startDate: string,
  endDate: string,
  num: number,
  comment: Array<string>,
  community: string
}

const categoryPage = () => {
  const [value, setValue] = useState<number>(0)
  const [activityList, setActivityList] = useState<Array<listType>>()

  const changeActivityList = (date) => {
    console.log(date);
    // setActivityList
  }
  return (
    <>
      <Tabs value={value} onChange={setValue}>
        {/* 分类栏 */}
        <Tabs.TabPane title="TYPE">
          <View className="cates_container">
            <ScrollView className="left_menu" scrollY>
              <View className="menu_type">
                <Text>/ 活动类别 /</Text>
                <View className="menu_item" >
                  
                </View>
              </View>
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

    </>
  )
}

export default categoryPage;
