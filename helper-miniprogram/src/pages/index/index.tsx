import { View } from "@tarojs/components";
import { Swiper, Image, Avatar } from "@taroify/core";
import "./index.less";

const indexPage = () => {
  const today: Array<String> = new Date().toDateString().split(" "); //["Wed", "Mar", "16", "2022"]
  console.log(today);

  return (
    <View className="contianer">
      {/* 搜索框 */}
      {/* <View className="search_input">
        <Navigator url="/pages/search/index">搜索</Navigator>
      </View> */}
      <View className="top-info">
        <View className="left">
          <View>
            {today[1]} {today[2]} · {today[3]}
          </View>
          <View>TODAY</View>
        </View>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
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
