import { Tabs, Calendar, DropdownMenu, Search, Empty } from "@taroify/core"
import { View, Text, Navigator } from "@tarojs/components";
import { useEffect, useState } from "react";
import './index.less'
import { BullhornOutlined } from "@taroify/icons"
import { request } from '../utils/http'
import { activityListType } from "../utils/type";

type type = {
  _id: number,
  value: string,
}

type request = {
  code: number,
  data: Array<activityListType | type>
}

const categoryPage = () => {
  const [activityType, setActivityType] = useState<Array<type>>([]);
  const [sutuoType, setSutuoType] = useState<Array<type>>([]);
  const [peopleType, setPeopleType] = useState<Array<type>>([]);

  const [activityTypeValue, setActivityTypeValue] = useState('');
  const [sutuoTypeValue, setSutuoTypeValue] = useState('');
  const [peopleTypeValue, setPeopleTypeValue] = useState('');
  const [schoolArea, setSchoolArea] = useState('');

  const [tab, setTab] = useState<number>(0)
  const [inputValue, setInputValue] = useState("")
  const [activityList1, setActivityList1] = useState<Array<activityListType>>([])
  const [activityList2, setActivityList2] = useState<Array<activityListType>>([])
  const [partActivityList, setPartActivityList] = useState<Array<activityListType>>([])

  useEffect(() => {
    initData()
  }, [])

  const initData = () => {
    request({ url: "/activityType", method: "GET" }).then(res => {
      setActivityType(res.data)
    })
    request({ url: "/sutuotype", method: "GET" }).then(res => {
      setSutuoType(res.data)
    })
    request({ url: "/peopleType", method: "GET" }).then(res => {
      setPeopleType(res.data)
    })
    request({ url: "/activity", method: "GET" }).then(res => {
      setActivityList1(res.data)
    })
    // request({ url: "/activity", method: "GET" }).then(res => {
    //   setActivityList2(res.data)
    // })
  }

  const searchActivity = () => {
    const data: any = {};
    if (inputValue) data.title = inputValue
    if (activityTypeValue) data.activityType = activityTypeValue
    if (sutuoTypeValue) data.sutuoType = sutuoTypeValue
    if (peopleTypeValue) data.peopleType = peopleTypeValue
    if (schoolArea) data.where = schoolArea
    request({ url: "/activity", method: "GET", data }).then(res => {
      setActivityList1(res.data)
    })
  }

  const changeActivityList = (date) => {
    console.log(date);
    // setActivityList1
  }

  return (
    <Tabs value={tab} onChange={setTab}>

      {/* 分类标签栏 */}
      <Tabs.TabPane title="TYPE">

        <Search
          value={inputValue}
          placeholder="请输入搜索关键词"
          onChange={(e) => setInputValue(e.detail.value)}
          action={<View onClick={searchActivity}>搜索</View>}
        />

        <DropdownMenu>
          <DropdownMenu.Item value={activityTypeValue} onChange={setActivityTypeValue}>
            <DropdownMenu.Option value={''}>请选择活动类型</DropdownMenu.Option>
            {
              activityType.map(item => <DropdownMenu.Option value={item.value}>{item.value}</DropdownMenu.Option>)
            }
          </DropdownMenu.Item>
          <DropdownMenu.Item value={sutuoTypeValue} onChange={setSutuoTypeValue}>
            <DropdownMenu.Option value={''}>请选择素拓类型</DropdownMenu.Option>
            {
              sutuoType.map(item => <DropdownMenu.Option value={item.value}>{item.value}</DropdownMenu.Option>)
            }
          </DropdownMenu.Item>
          <DropdownMenu.Item value={schoolArea} onChange={setSchoolArea}>
            <DropdownMenu.Option value={''}>请选择校区</DropdownMenu.Option>
            <DropdownMenu.Option value={'广州校区'}>广州校区</DropdownMenu.Option>
            <DropdownMenu.Option value={'佛山校区'}>佛山校区</DropdownMenu.Option>
          </DropdownMenu.Item>
          <DropdownMenu.Item value={peopleTypeValue} onChange={setPeopleTypeValue}>
            <DropdownMenu.Option value={''}>请选择活动对象</DropdownMenu.Option>
            {
              peopleType.map(item => <DropdownMenu.Option value={item.value}>{item.value}</DropdownMenu.Option>)
            }
          </DropdownMenu.Item>
        </DropdownMenu>

        <Empty className={activityList1.length != 0 ? "hide":""}>
          <Empty.Image
            className="custom-empty__image"
            src="https://img.yzcdn.cn/vant/custom-empty-image.png"
          />
          <Empty.Description>暂无活动</Empty.Description>
        </Empty>

        <View className="activity-lists">
          {
            activityList1.map(item => {
              return (
                <Navigator url={"/pages/activity_item/index?_id=" + item._id} className="activity-list">
                  <View className="activity-title">
                    {item.title}
                  </View>
                  <View className="activity-content">{item.content}</View>
                  <View className="activity-bottom">
                    <Text className="people">{item.where[0] + item.peopleType}</Text>
                    <Text className="time">{item.time[0] + '-' + item.time[1]}</Text>
                  </View>
                </Navigator>
              )
            })
          }
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
