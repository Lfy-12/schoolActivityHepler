import { Button, Calendar, Cell, DatetimePicker, Form, Picker, Popup, Textarea, Toast } from '@taroify/core';
import { FormItemInstance } from '@taroify/core/form';
import { View, Input, BaseEventOrig, FormProps } from '@tarojs/components'
import { ArrowRight,Idcard,Records,ClusterOutlined,Logistics,CalendarOutlined,UnderwayOutlined,FriendsOutlined,PointGiftOutlined,GuideOutlined,ManagerOutlined} from "@taroify/icons"
import { useEffect, useRef, useState } from 'react';
import './index.less'
import { request } from '../../../pages/utils/http';
import Taro from '@tarojs/taro';
import { formatDate, formatTime } from '../../../pages/utils/tool';

const userPage = () => {

  const [formDefaultDate,setFormDefaultDate] = useState({})
  // const formDefaultDate = {title:'lfy'}

  const timeRef = useRef<FormItemInstance>()
  const [timeOpen, setTimeOpen] = useState(false)

  const dateRef = useRef<FormItemInstance>()
  const [dateOpen, setDateOpen] = useState(false)

  const sutuoRef = useRef<FormItemInstance>()
  const [sutuoOpen, setSutuoOpen] = useState(false)

  const activityRef = useRef<FormItemInstance>()
  const [activityOpen, setActivityOpen] = useState(false)

  const peopleRef = useRef<FormItemInstance>()
  const [peopleOpen, setpeopleOpen] = useState(false)

  const communityRef = useRef<FormItemInstance>()
  const [communityOpen, setCommunityOpen] = useState(false)

  const whereRef = useRef<FormItemInstance>()
  const [whereOpen, setWhereOpen] = useState(false)

  const [activityType, setActivityType] = useState<Array<type>>([]);
  const [sutuoType, setSutuoType] = useState<Array<type>>([]);
  const [peopleType, setPeopleType] = useState<Array<type>>([]);

  const [community, setCommunity] = useState<Array<string>>([]);

  const [openid, setOpenid] = useState<string>();

  type type = {
    _id: number,
    value: string,
  }

  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    let data = {
      title: event.detail.value?.title,
      content: event.detail.value?.content,
      time: [event.detail.value?.date.getTime(), formatTime(event.detail.value?.time)],
      where: [event.detail.value?.where1[0], event.detail.value?.where2],
      num: 0,
      community: event.detail.value?.community[0],
      peopleType: event.detail.value?.peopleType[0],
      activityType: event.detail.value?.activityType[0],
      sutuoType: event.detail.value?.sutuoType[0]
    }
    // 发布信息
    request({ url: "/activity/add", method: "POST", data }).then(res => {
      if (res.code == 200) {
        Toast.open("发布成功");
        // 发布成功后，获取活动id，记录到user数据库中
        request({ url: "/user/update", method: "POST", data: [{ _id: openid }, { publish: res.data.insertedId }] }).then(res => {
          console.log(res);
        })
        Taro.navigateTo({
          url: '/pageA/pages/my_activity/index?type=3',
        })
      }
      else Toast.open("发布失败")
    })
  }

  useEffect(() => {
    initData()
  }, [])

  const initData = () => {
    let openid = Taro.getStorageSync("userInfo").openid
    setOpenid(openid)
    request({ url: "/user", method: "GET", data: { _id: openid } }).then(res => {
      setCommunity(res.data.community)
    })

    request({ url: "/activityType", method: "GET" }).then(res => {
      setActivityType(res.data)
    })
    request({ url: "/sutuotype", method: "GET" }).then(res => {
      setSutuoType(res.data)
    })
    request({ url: "/peopleType", method: "GET" }).then(res => {
      setPeopleType(res.data)
    })

    setFormDefaultDate({title:'lfy',date:new Date('2022-4-6'),where1:"广州校区",time:new Date("2012-1-1 14:05")})
  }

  return (
    <>
      <View className='title'>发布活动信息</View>
      <Form onSubmit={onSubmit} values={formDefaultDate}>
        <Toast id="toast" />
        <Cell.Group inset>

          <Form.Item name="title" rules={[{ required: true, message: "请输入活动标题" }]}>
          
            <Form.Label><Idcard />活动标题</Form.Label>
            <Form.Control>
              <Input placeholder="请输入活动标题" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="content" rules={[{ required: true, message: "请描述活动内容" }]}>
            <Form.Label><Records />活动内容</Form.Label>
            <Form.Control>
              <Textarea autoHeight placeholder="请描述活动内容" />
            </Form.Control>
          </Form.Item>

          {/* 选择校区 */}
          <Form.Item ref={whereRef} name="where1" clickable rightIcon={<ArrowRight />} >
            <Form.Label><ClusterOutlined />校区</Form.Label>
            <Form.Control>
              <Input placeholder="点击选择校区" onClick={() => setWhereOpen(true)} />
            </Form.Control>
          </Form.Item>
          <Popup mountOnEnter={false} open={whereOpen} rounded placement="bottom" onClose={setWhereOpen}>
            <Picker
              onCancel={() => setWhereOpen(false)}
              onConfirm={(newValue) => {
                whereRef.current?.setValue(newValue)
                setWhereOpen(false)
              }}
            >
              <Picker.Toolbar>
                <Picker.Button>取消</Picker.Button>
                <Picker.Button>确认</Picker.Button>
              </Picker.Toolbar>
              <Picker.Column>
                <Picker.Option>广州校区</Picker.Option>
                <Picker.Option>佛山校区</Picker.Option>
                <Picker.Option>广州校区和佛山校区</Picker.Option>
              </Picker.Column>
            </Picker>
          </Popup>

          <Form.Item name="where2" rules={[{ required: true, message: "请输入活动举办地点" }]}>
            <Form.Label><Logistics />地点</Form.Label>
            <Form.Control>
              <Input placeholder="请输入活动地点" />
            </Form.Control>
          </Form.Item>

          {/* 日历选择器 */}
          <Form.Item ref={dateRef} name="date" clickable rightIcon={<ArrowRight />} >
            <Form.Label><CalendarOutlined />举办日期</Form.Label>
            <Form.Control>
              {(controller) => (
                <Input
                  value={formatDate(controller.value)}
                  placeholder="点击选择活动日期"
                  onClick={() => setDateOpen(true)}
                />
              )}
            </Form.Control>
          </Form.Item>
          <Popup
            mountOnEnter={false}
            style={{ height: "80%" }}
            open={dateOpen}
            rounded
            placement="bottom"
            onClose={setDateOpen}
          >
            <Popup.Close />
            <Calendar
              type="single"
              onConfirm={(newValue) => {
                dateRef.current?.setValue(newValue)
                setDateOpen(false)
              }}
            >
              <Calendar.Footer>
                <Calendar.Button type="confirm">确定</Calendar.Button>
              </Calendar.Footer>
            </Calendar>
          </Popup>

          {/* 时间选择器 */}
          <Form.Item ref={timeRef} name="time" clickable rightIcon={<ArrowRight />} >
            <Form.Label><UnderwayOutlined />开始时间</Form.Label>
            <Form.Control>
              {(controller) => (
                <Input
                  value={formatTime(controller.value)}
                  placeholder="点击选择活动时间"
                  onClick={() => setTimeOpen(true)}
                />
              )}
            </Form.Control>
          </Form.Item>
          <Popup mountOnEnter={false} open={timeOpen} rounded placement="bottom" onClose={setTimeOpen}>
            <DatetimePicker
              type="hour-minute"
              onCancel={() => setTimeOpen(false)}
              onConfirm={(newValue) => {
                timeRef.current?.setValue(newValue)
                setTimeOpen(false)
              }}
            >
              <Picker.Toolbar>
                <Picker.Button>取消</Picker.Button>
                <Picker.Button>确认</Picker.Button>
              </Picker.Toolbar>
            </DatetimePicker>
          </Popup>

          {/* 选择发布单位 */}
          <Form.Item ref={communityRef} name="community" clickable rightIcon={<ArrowRight />} >
            <Form.Label><ManagerOutlined />发布单位</Form.Label>
            <Form.Control>
              <Input placeholder="点击选择发布单位" onClick={() => setCommunityOpen(true)} />
            </Form.Control>
          </Form.Item>
          <Popup mountOnEnter={false} open={communityOpen} rounded placement="bottom" onClose={setCommunityOpen}>
            <Picker
              onCancel={() => setCommunityOpen(false)}
              onConfirm={(newValue) => {
                communityRef.current?.setValue(newValue)
                setCommunityOpen(false)
              }}
            >
              <Picker.Toolbar>
                <Picker.Button>取消</Picker.Button>
                <Picker.Button>确认</Picker.Button>
              </Picker.Toolbar>
              <Picker.Column>
                {
                  community.map(item => <Picker.Option>{item}</Picker.Option>)
                }
              </Picker.Column>
            </Picker>
          </Popup>

          {/* 选择素拓类型 */}
          <Form.Item ref={sutuoRef} name="sutuoType" clickable rightIcon={<ArrowRight />}>
            <Form.Label><PointGiftOutlined />素拓类型</Form.Label>
            <Form.Control>
              <Input placeholder="点击选择素拓类型" onClick={() => setSutuoOpen(true)} />
            </Form.Control>
          </Form.Item>
          <Popup mountOnEnter={false} open={sutuoOpen} rounded placement="bottom" onClose={setSutuoOpen}>
            <Picker
              onCancel={() => setSutuoOpen(false)}
              onConfirm={(newValue) => {
                sutuoRef.current?.setValue(newValue)
                setSutuoOpen(false)
              }}
            >
              <Picker.Toolbar>
                <Picker.Button>取消</Picker.Button>
                <Picker.Button>确认</Picker.Button>
              </Picker.Toolbar>
              <Picker.Column>
                {
                  sutuoType.map(item => <Picker.Option>{item.value}</Picker.Option>)
                }
              </Picker.Column>
            </Picker>
          </Popup>

          {/* 选择活动类型 */}
          <Form.Item ref={activityRef} name="activityType" clickable rightIcon={<ArrowRight />} >
            <Form.Label><GuideOutlined />类型</Form.Label>
            <Form.Control>
              <Input placeholder="点击选择活动类型" onClick={() => setActivityOpen(true)} />
            </Form.Control>
          </Form.Item>
          <Popup mountOnEnter={false} open={activityOpen} rounded placement="bottom" onClose={setActivityOpen}>
            <Picker
              onCancel={() => setActivityOpen(false)}
              onConfirm={(newValue) => {
                activityRef.current?.setValue(newValue)
                setActivityOpen(false)
              }}
            >
              <Picker.Toolbar>
                <Picker.Button>取消</Picker.Button>
                <Picker.Button>确认</Picker.Button>
              </Picker.Toolbar>
              <Picker.Column>
                {
                  activityType.map(item => <Picker.Option>{item.value}</Picker.Option>)
                }
              </Picker.Column>
            </Picker>
          </Popup>

          {/* 选择面向对象 */}
          <Form.Item ref={peopleRef} name="peopleType" clickable rightIcon={<ArrowRight />}>
            <Form.Label><FriendsOutlined />面向对象</Form.Label>
            <Form.Control>
              <Input placeholder="点击选择面向对象" onClick={() => setpeopleOpen(true)} />
            </Form.Control>
          </Form.Item>
          <Popup mountOnEnter={false} open={peopleOpen} rounded placement="bottom" onClose={setpeopleOpen}>
            <Picker
              onCancel={() => setpeopleOpen(false)}
              onConfirm={(newValue) => {
                peopleRef.current?.setValue(newValue)
                setpeopleOpen(false)
              }}
            >
              <Picker.Toolbar>
                <Picker.Button>取消</Picker.Button>
                <Picker.Button>确认</Picker.Button>
              </Picker.Toolbar>
              <Picker.Column>
                {
                  peopleType.map(item => <Picker.Option>{item.value}</Picker.Option>)
                }
              </Picker.Column>
            </Picker>
          </Popup>

        </Cell.Group>
        <View style={{ margin: "16px" }}>
          <Button shape="round" block style={{ background: "linear-gradient(to right, #ff6034, #ee0a24)", color: "#fff" }} formType="submit">
            提交
          </Button>
        </View>
      </Form>
    </>
  )
}

export default userPage;
