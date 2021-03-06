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
    // ????????????
    request({ url: "/activity/add", method: "POST", data }).then(res => {
      if (res.code == 200) {
        Toast.open("????????????");
        // ??????????????????????????????id????????????user????????????
        request({ url: "/user/update", method: "POST", data: [{ _id: openid }, { publish: res.data.insertedId }] }).then(res => {
          console.log(res);
        })
        Taro.navigateTo({
          url: '/pageA/pages/my_activity/index?type=2',
        })
      }
      else Toast.open("????????????")
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

    // setFormDefaultDate({title:'lfy',date:new Date('2022-4-6'),where1:"????????????",time:new Date("2012-1-1 14:05")})
  }

  return (
    <>
      <View className='title'>??????????????????</View>
      <Form onSubmit={onSubmit} values={formDefaultDate}>
        <Toast id="toast" />
        <Cell.Group inset>

          <Form.Item name="title" rules={[{ required: true, message: "?????????????????????" }]}>
          
            <Form.Label><Idcard />????????????</Form.Label>
            <Form.Control>
              <Input placeholder="?????????????????????" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="content" rules={[{ required: true, message: "?????????????????????" }]}>
            <Form.Label><Records />????????????</Form.Label>
            <Form.Control>
              <Textarea autoHeight placeholder="?????????????????????" />
            </Form.Control>
          </Form.Item>

          {/* ???????????? */}
          <Form.Item ref={whereRef} name="where1" clickable rightIcon={<ArrowRight />} >
            <Form.Label><ClusterOutlined />??????</Form.Label>
            <Form.Control>
              <Input placeholder="??????????????????" onClick={() => setWhereOpen(true)} />
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
                <Picker.Button>??????</Picker.Button>
                <Picker.Button>??????</Picker.Button>
              </Picker.Toolbar>
              <Picker.Column>
                <Picker.Option>????????????</Picker.Option>
                <Picker.Option>????????????</Picker.Option>
                <Picker.Option>???????????????????????????</Picker.Option>
              </Picker.Column>
            </Picker>
          </Popup>

          <Form.Item name="where2" rules={[{ required: true, message: "???????????????????????????" }]}>
            <Form.Label><Logistics />??????</Form.Label>
            <Form.Control>
              <Input placeholder="?????????????????????" />
            </Form.Control>
          </Form.Item>

          {/* ??????????????? */}
          <Form.Item ref={dateRef} name="date" clickable rightIcon={<ArrowRight />} >
            <Form.Label><CalendarOutlined />????????????</Form.Label>
            <Form.Control>
              {(controller) => (
                <Input
                  value={formatDate(controller.value)}
                  placeholder="????????????????????????"
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
                <Calendar.Button type="confirm">??????</Calendar.Button>
              </Calendar.Footer>
            </Calendar>
          </Popup>

          {/* ??????????????? */}
          <Form.Item ref={timeRef} name="time" clickable rightIcon={<ArrowRight />} >
            <Form.Label><UnderwayOutlined />????????????</Form.Label>
            <Form.Control>
              {(controller) => (
                <Input
                  value={formatTime(controller.value)}
                  placeholder="????????????????????????"
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
                <Picker.Button>??????</Picker.Button>
                <Picker.Button>??????</Picker.Button>
              </Picker.Toolbar>
            </DatetimePicker>
          </Popup>

          {/* ?????????????????? */}
          <Form.Item ref={communityRef} name="community" clickable rightIcon={<ArrowRight />} >
            <Form.Label><ManagerOutlined />????????????</Form.Label>
            <Form.Control>
              <Input placeholder="????????????????????????" onClick={() => setCommunityOpen(true)} />
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
                <Picker.Button>??????</Picker.Button>
                <Picker.Button>??????</Picker.Button>
              </Picker.Toolbar>
              <Picker.Column>
                {
                  community.map(item => <Picker.Option>{item}</Picker.Option>)
                }
              </Picker.Column>
            </Picker>
          </Popup>

          {/* ?????????????????? */}
          <Form.Item ref={sutuoRef} name="sutuoType" clickable rightIcon={<ArrowRight />}>
            <Form.Label><PointGiftOutlined />????????????</Form.Label>
            <Form.Control>
              <Input placeholder="????????????????????????" onClick={() => setSutuoOpen(true)} />
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
                <Picker.Button>??????</Picker.Button>
                <Picker.Button>??????</Picker.Button>
              </Picker.Toolbar>
              <Picker.Column>
                {
                  sutuoType.map(item => <Picker.Option>{item.value}</Picker.Option>)
                }
              </Picker.Column>
            </Picker>
          </Popup>

          {/* ?????????????????? */}
          <Form.Item ref={activityRef} name="activityType" clickable rightIcon={<ArrowRight />} >
            <Form.Label><GuideOutlined />??????</Form.Label>
            <Form.Control>
              <Input placeholder="????????????????????????" onClick={() => setActivityOpen(true)} />
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
                <Picker.Button>??????</Picker.Button>
                <Picker.Button>??????</Picker.Button>
              </Picker.Toolbar>
              <Picker.Column>
                {
                  activityType.map(item => <Picker.Option>{item.value}</Picker.Option>)
                }
              </Picker.Column>
            </Picker>
          </Popup>

          {/* ?????????????????? */}
          <Form.Item ref={peopleRef} name="peopleType" clickable rightIcon={<ArrowRight />}>
            <Form.Label><FriendsOutlined />????????????</Form.Label>
            <Form.Control>
              <Input placeholder="????????????????????????" onClick={() => setpeopleOpen(true)} />
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
                <Picker.Button>??????</Picker.Button>
                <Picker.Button>??????</Picker.Button>
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
            ??????
          </Button>
        </View>
      </Form>
    </>
  )
}

export default userPage;
