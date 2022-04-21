<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <!-- gutter是指栅格间间隔 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加活动</el-button>
        </el-col>
      </el-row>

      <!-- 活动列表区 -->
      <el-table :data="activityList" border align="center" resizable="true">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="活动内容：" style="padding:10px;margin:0">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="活动标题"></el-table-column>
        <el-table-column label="活动时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              format(scope.row.time[0]) + " " + scope.row.time[1]
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="where" label="活动地点"></el-table-column>
        <el-table-column prop="community" label="发布单位"></el-table-column>
        <el-table-column label="活动类别" width="275px">
          <template slot-scope="scope">
            <el-tag>{{scope.row.activityType}}</el-tag>&nbsp;
            <el-tag type="success">{{scope.row.sutuoType}}</el-tag>&nbsp;
            <el-tag type="warning">{{scope.row.peopleType}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeGoodById(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import { format } from "../../plugins/tools.js";
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10,
      },
      // 商品列表总条数
      total: 0,
      activityList: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    format(date) {
      //shijianchuo是整数，否则要parseInt转换
      let time = new Date(parseInt(date));
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      return y + "." + m + "." + d;
    },

    // 获取商品列表数据
    // get方法都要｛params：｝
    async getGoodsList() {
      const { data: res } = await this.$http.get("/activity");
      if (res.code !== 200) {
        return this.$message.error("获取活动列表失败");
      }
      this.activityList = res.data;
      console.log(format(this.activityList[0].time[0]));
      this.total = res.data.length;
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    // 监听pagenum改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    // 删除商品
    async removeGoodById(GoodId) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该商品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消该操作");
      }
      //   lt
      //   const {data:res} = await this.$http.delete('goods/'+ GoodId)
      //   if(res.meta.status !== 200){
      //     return this.$message.error('删除商品失败')
      //   }
      this.$message.success("删除商品成功");
      this.getGoodsList();
    },
    //
    goAddpage() {
      this.$router.push("/goods/add");
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>

