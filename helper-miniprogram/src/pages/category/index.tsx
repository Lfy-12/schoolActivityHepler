import { Tabs, Calendar, DropdownMenu, Search, Empty, Divider, Button } from "@taroify/core"
import { View, Text, Navigator } from "@tarojs/components";
import { useEffect, useState } from "react";
import './index.less'
import { VolumeOutlined } from "@taroify/icons"
import { request } from '../utils/http'
import { activityListType } from "../utils/type";
import { useReachBottom } from "@tarojs/taro";
import { format } from "../utils/tool";

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


  const formatDate = (d) => {
    return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + ''

  }

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

    request({ url: "/activity", method: "GET", data: { time: new Date().getTime() } }).then(res => {
      setActivityList2(res.data)
    })
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
  request({ url: "/activity", method: "GET", data: { time: date.getTime() } }).then(res => {
    setActivityList2(res.data)
  })
}

  return (
    <Tabs value={tab} onChange={setTab}>

      {/* ??????????????? */}
      <Tabs.TabPane title="TYPE">

        <Search
          value={inputValue}
          placeholder="????????????????????????"
          onChange={(e) => setInputValue(e.detail.value)}
          action={<Button onClick={searchActivity} variant="outlined" color="danger" hairline style={{ width: "60px", height: "35px" }}>??????</Button>}
        />

        <DropdownMenu>
          <DropdownMenu.Item value={activityTypeValue} onChange={setActivityTypeValue}>
            <DropdownMenu.Option value={''}>?????????????????????</DropdownMenu.Option>
            {
              activityType.map(item => <DropdownMenu.Option value={item.value}>{item.value}</DropdownMenu.Option>)
            }
          </DropdownMenu.Item>
          <DropdownMenu.Item value={sutuoTypeValue} onChange={setSutuoTypeValue}>
            <DropdownMenu.Option value={''}>?????????????????????</DropdownMenu.Option>
            {
              sutuoType.map(item => <DropdownMenu.Option value={item.value}>{item.value}</DropdownMenu.Option>)
            }
          </DropdownMenu.Item>
          <DropdownMenu.Item value={schoolArea} onChange={setSchoolArea}>
            <DropdownMenu.Option value={''}>???????????????</DropdownMenu.Option>
            <DropdownMenu.Option value={'????????????'}>????????????</DropdownMenu.Option>
            <DropdownMenu.Option value={'????????????'}>????????????</DropdownMenu.Option>
          </DropdownMenu.Item>
          <DropdownMenu.Item value={peopleTypeValue} onChange={setPeopleTypeValue}>
            <DropdownMenu.Option value={''}>?????????????????????</DropdownMenu.Option>
            {
              peopleType.map(item => <DropdownMenu.Option value={item.value}>{item.value}</DropdownMenu.Option>)
            }
          </DropdownMenu.Item>
        </DropdownMenu>

        <Divider style={{ color: "#ee0a24", borderColor: "#ee0a24", padding: "0 8px", marginBottom: "8px" }}>
          ?????????????????????
        </Divider>
        <View className="lists">
          {
            activityList1.map(item => {
              return (
                <Navigator url={"/pageA/pages/activity_item/index?_id=" + item._id} className="list">
                  <View className="left">
                    <VolumeOutlined style={{ color: "#ee0a24" }} />
                    <Text className="title">{item.title}</Text>
                  </View>
                  <View className="right">
                    <Text className="community">{format(item.time[0])} </Text>&gt;
                  </View>
                </Navigator>
              )
            }
            )
          }
        </View>

        <Empty className={activityList1.length != 0 ? "hide" : ""}>
          <Empty.Image
            className="custom-empty__image"
            src="https://img.yzcdn.cn/vant/custom-empty-image.png"
          />
          <Empty.Description>????????????</Empty.Description>
        </Empty>

      </Tabs.TabPane>

      {/* ??????????????? */}
      <Tabs.TabPane title="CALENDAR" className="calendar">
        {/* ?????? */}
        <Calendar style={{ height: "400px" }} onChange={changeActivityList} title="" defaultValue={new Date()} max={new Date(new Date().setDate(new Date().getDate() + 30))} />
        {/* ???????????? */}
        <View className="lists">
          {
            activityList2.map(item => {
              return (
                <Navigator url={"/pageA/pages/activity_item/index?_id=" + item._id} className="list">
                  <View className="left">
                    <VolumeOutlined style={{ color: "#ee0a24" }} />
                    <Text className="title">{item.title}</Text>
                  </View>
                  <View className="right">
                    <Text className="community">{item.community} </Text>&gt;
                  </View>

                </Navigator>
              )
            }
            )
          }
        </View>

        <Empty className={activityList2.length != 0 ? "hide" : ""}>
          <Empty.Image
            className="custom-empty__image"
            src="https://img.yzcdn.cn/vant/custom-empty-image.png"
            style={{ width: "50px", height: "50px" }}
          />
          <Empty.Description>??????????????????</Empty.Description>
        </Empty>

      </Tabs.TabPane>

    </Tabs>
  )
}

export default categoryPage;
