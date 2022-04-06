import { View, Text } from "@tarojs/components";
import { Swiper, Image, Avatar } from "@taroify/core";
import "./index.less";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import avatarPng from '../images/avatar.png'
import categoryPng from '../images/category-floor.png'
import yesterdayPng from '../images/yesterday.png'
import todayPng from '../images/today.png'
import futurePng from '../images/future.png'
import likePng from '../images/like.png'
import imagePng from '../images/image1.jpg'
import imagePng2 from '../images/image2.jpg'
import { request } from "../utils/http";


const indexPage = () => {

  const activityInfo = [
    {
      "_id": "6240695728610ace8819578e",
      "title": "“廉”手共绘，书写风采",
      "content": "桂花飘香，一年一度的“廉洁文化展”它来啦！古话说得好：“公生明，廉生威。”\n无论时代如何发展、变迁，保持清廉公正是我们每个人忠贞不渝的信念。\n响应时代的号召，不负青春韶华，让我们一起积极投身于清正廉洁的建设事业中吧！\n征集作品，作品要求为：\n（一） 所有作品要求符合本次廉洁文化展的主题。主题突出，观点正确，立意深刻。\n（二） 本次作品征集类型不限，可采用书法、绘画、诗文、数字的作品类型。\n书 法 类：字体不限，硬笔书法的纸张尺寸不超过A4，软笔书法的纸张尺寸不超过四尺六开（34cm×46cm）\n绘画类：纸张尺寸不超四尺六开（34cm×46cm）\n诗 文 类：体裁不限\n数 字 类：不限拍照设备，单照、组照（每组不超过四幅）均可；单张照片的分辨率为1600×1200（即大于10M）；不可对作品做亮度、对比度、饱和度等适当调整外的其他创意做法\n（三）投稿要保证原创和事迹真实，抄袭、剽窃他人作品或者弄虚作假的，一经发现，将取消其作品参赛资格。",
      "time": ["2022.3.27", "2022.3.30", "18:00-21:00"],
      "where": ["广州校区", "图书馆6楼"],
      "num": 0,
      "community": "图学委",
      "peopleType": "全体学生",
      "activityType": "文娱类",
      "sutuoType": "文化艺术素拓"
    },
    {
      "_id": "624bdf65e93d3b6861e6c39f",
      "title": "信息学院第22届IT文化节系列活动之开幕式",
      "content": "邀请学校的老师、领导和学生参加此次会议，由领导和学生对于此次活动发出期望，并呼吁学生踊跃参加，宣告此次IT文化节正式开始。",
      "time": ["2022.4.23", "2022.4.23"],
      "where": ["", "厚德楼"],
      "num": 0,
      "community": "信息学院团委学生会",
      "peopleType": "全体学生",
      "activityType": "文娱类",
      "sutuoType": "创新创业素拓"
    }
  ]

  const [avatarUrl, setAvatarUrl] = useState<string>()
  const today: Array<String> = new Date().toDateString().split(" ");   //["Wed", "Mar", "16", "2022"]

  useEffect(() => {
    if (Taro.getStorageSync("userInfo")) setAvatarUrl(Taro.getStorageSync("userInfo").avatarUrl)
  }, [])

  const getUserInfo = () => {
    if (!avatarUrl) {
      let openid;
      Taro.login({
        success: (res) => {
          request({
            url: '/onLogin',
            method: 'GET',
            data: { code: res.code }
          }).then(res => {
            openid = res.data.openid
          })
        }
      })
      Taro.getUserProfile({
        desc: "获取您的用户头像和个人信息",
        success: (res) => {
          console.log(res);
          let userInfo = {
            openid,
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          }
          Taro.setStorage({
            key: "userInfo",
            data: userInfo
          });
          setAvatarUrl(res.userInfo.avatarUrl);
          // 存储user数据到数据库
          request({
            url: '/user',
            method: 'POST',
            data: userInfo
          }).then(res => {
            console.log(res);
          })
        },
      });
    }
  }

  return (
    <View className="contianer">
      {/* 搜索框 */}
      {/* <View className="search_input">
        <Navigator url="/pages/search/index">搜索</Navigator>
      </View> */}
      <View className="top-info">
        <View className="left">
          <View className="date">
            {today[1]} {today[2]} · {today[3]}
          </View>
          <View className="today">TODAY</View>
        </View>
        <Avatar src={avatarUrl || avatarPng} onClick={getUserInfo} />
      </View>

      {/* 轮播 */}
      <Swiper className="image-swiper" lazyRender autoplay={4000}>
        <Swiper.Indicator />
        <Swiper.Item>
          <Image
            className="image"
            mode="scaleToFill"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </Swiper.Item>
        <Swiper.Item>
          <Image className="image" src="https://joeschmoe.io/api/v1/random" />
        </Swiper.Item>
        <Swiper.Item>
          <Image className="image" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </Swiper.Item>
        <Swiper.Item>
          <Image
            className="image"
            src="https://img01.yzcdn.cn/vant/apple-4.jpg"
          />
        </Swiper.Item>
      </Swiper>

      <View className="floor">
        <View className="item">
          <Image className="image" src={categoryPng} />
          <Text className="text">分类</Text>
        </View>
        <View className="item">
          <Image className="image" src={todayPng} />
          <Text className="text">今日活动</Text>
        </View>
        <View className="item">
          <Image className="image" src={futurePng} />
          <Text className="text">即将开始</Text>
        </View>
        <View className="item">
          <Image className="image" src={yesterdayPng} />
          <Text className="text">往期精彩</Text>
        </View>
      </View>

      <View className="like-box">
        <View className="like-title">
          <Image className="image" src={likePng} />
          <Text className="text">猜你喜欢</Text>
        </View>
        <View className="items">

          <View className="item">
            <Image className="left" src={imagePng} />
            <View className="right">
              <View className="title">{activityInfo[0].title}</View>
              <View className="content">{activityInfo[0].content}</View>
              <View className="bottom">
                <View className="community">{activityInfo[0].community}</View>
                <View className="time">{activityInfo[0].time[0]}</View>
              </View>
            </View>
          </View>

          <View className="item">
            <Image className="left" src={imagePng2} />
            <View className="right">
              <View className="title">{activityInfo[1].title}</View>
              <View className="content">{activityInfo[1].content}</View>
              <View className="bottom">
                <View className="community">{activityInfo[1].community}</View>
                <View className="time">{activityInfo[1].time[0]}</View>
              </View>
            </View>
          </View>

        </View>
      </View>

    </View>
  );
};

export default indexPage;
