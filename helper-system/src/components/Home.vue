<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/admin.png" alt />
        <span>校园活动后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '70px' : '250px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i class="el-icon-s-fold" v-if="!isCollapse"></i>
          <i class="el-icon-s-unfold" v-else></i>
        </div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409BFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span >{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState(subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      // lt
      menulist: [
        {
          id: 125,
          authName: "活动管理",
          children: [{
            id: 1,
            authName: "活动列表",
            path: "/activity/list",
          },
          {
            id: 2,
            path: '/activity/add',
            authName: '添加活动'
          }]
        },
        {
          id: 103,
          authName: "用户信息",
          children: [{
            id: 6,
            path: '/user/list',
            authName: '用户列表'
          },{
            id: 7,
            path: '/user/add',
            authName: '审核身份'
          }]
        }
      ],
      iconsObj: {
        125: 'iconfont el-icon-s-help',
        103: 'iconfont el-icon-s-custom',
      },
      // 是否折叠，false代表不折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有菜单
    async getMenuList() {
      // lt
      // const { data: res } = await this.$http.get('menus')
      // if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // this.menulist = res.data
      // console.log(res)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  height: 70px !important;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  > div {
    display: flex;
    align-items: center;
    margin: 20px;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: 0;
    span {
      font-size: 16px;
    }
  }
}
.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
  font-size: 25px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.toggle-button {
  background-color: #4a5064;
  color: white;
  font-size: 20px;
  line-height: 38px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
