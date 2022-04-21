<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>审核身份</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="activityList" border align="center" resizable="true">
        <el-table-column type="expand" >
            <p style="margin-left:20px">认证资料：</p>
            <img src="../../assets/student.jpg" alt="" srcset="" style="width:300px;margin-left:20px">
        </el-table-column>
        <el-table-column prop="real_name" label="姓名"></el-table-column>
        <el-table-column prop="sno" label="学号"></el-table-column>
        <el-table-column prop="community" label="认证社团名称"></el-table-column>
        <el-table-column prop="time" label="有效期"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
            >通过</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="removeGoodById(scope.row._id)"
            >驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activityList: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 获取商品列表数据
    // get方法都要｛params：｝
    async getGoodsList() {
      const { data: res } = await this.$http.get("/user/community");
      if (res.code !== 200) {
        return this.$message.error("获取身份认证信息列表失败");
      }
      this.activityList = res.data;
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

