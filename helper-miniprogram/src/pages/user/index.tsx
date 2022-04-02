import { View, Text, Image, Navigator } from "@tarojs/components";
import "./index.less";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import {
  LikeOutlined,
  FriendsOutlined,
  BarChartOutlined,
} from "@taroify/icons";

const indexPage = () => {
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    if (Taro.getStorageSync("userInfo"))
      setUserInfo(Taro.getStorageSync("userInfo"));
  }, []);

  const getUserInfo = () => {
    if (!userInfo.avatarUrl) {
      Taro.getUserProfile({
        desc: "获取您的用户头像和个人信息",
        success: (res) => {
          Taro.setStorage({
            key: "userInfo",
            data: res.userInfo,
          });
          setUserInfo(res.userInfo);
        },
      });
    }
  };

  return (
    <View className="contianer">
      {/* 头部 登录信息 */}
      <View className="user_info_wrap">
        <View className={userInfo.avatarUrl ? "user_img_wrap" : "hide"}>
          <Image className="user_bg" src={userInfo.avatarUrl} />
          <View className="user_info">
            <Image className="user_icon" src={userInfo.avatarUrl}></Image>
            <View className="user_name">{userInfo.nickName}</View>
          </View>
        </View>
        <View
          className={!userInfo.avatarUrl ? "user_btn" : "hide"}
          onClick={getUserInfo}
        >
          登录
        </View>
      </View>

      <View className="user_content">
        <View className="user_main">
          <View className="history_wrap">
            <Navigator url="/pages/my_activity/index?type=1">
              <LikeOutlined size="18" style={{ color: "red" }} />
              <View className="his_name">收藏列表</View>
            </Navigator >
            <Navigator url="/pages/my_activity/index?type=2">
              <FriendsOutlined size="18" style={{ color: "red" }} />
              <View className="his_name">报名列表</View>
            </Navigator>
            <Navigator url="/pages/my_activity/index?type=3">
              <BarChartOutlined size="18" style={{ color: "red" }} />
              <View className="his_name">发布管理</View>
            </Navigator>
          </View>

          <Navigator className="address_wrap" url="/pages/apply/index">申请认证信息</Navigator>

          <View className="app_info_wrap">
            <View className="app_info_item app_info_contact">
              <Text>联系客服</Text>
              <Text>400-618-4000</Text>
            </View>
            <Navigator url="/pages/feedback/index" className="app_info_item">
              意见反馈
            </Navigator>
            <Navigator url="/pages/about/index" className="app_info_item">关于我们</Navigator>
          </View>

          <View className="recommend_wrap">把应用推荐给其他人</View>
        </View>
      </View>
    </View>
  );
};

export default indexPage;
