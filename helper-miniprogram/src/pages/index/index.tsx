import { View } from "@tarojs/components";
import { Swiper, Image, Avatar } from "@taroify/core";
import "./index.less";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import avatarPng from '../images/avatar.png'
import { request } from "../utils/http";


const indexPage = () => {

  const [avatarUrl, setAvatarUrl] = useState<string>()
  const today: Array<String> = new Date().toDateString().split(" ");   //["Wed", "Mar", "16", "2022"]

  useEffect(()=>{
    if(Taro.getStorageSync("userInfo")) setAvatarUrl(Taro.getStorageSync("userInfo").avatarUrl)
  },[])

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
        <Avatar src={avatarUrl || avatarPng} onClick={getUserInfo}/>
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
    </View>
  );
};

export default indexPage;
