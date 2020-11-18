<template>
  <div class="box">
    <el-container class="small">
      <!-- 侧边栏导航 -->
      <!-- default-active="3"  默认选择第几个-->
      <!-- router  路由模式-->
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="orange"
          router
        >
          <!-- 首页 -->
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 系统设置 -->
            <el-submenu :index="item.id +''" v-if="item.children">
              <!-- 目录 -->
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 普通菜单 -->
            <el-menu-item :index="item.url" v-else>{{item.title}}</el-menu-item>
          </div>

          <!-- 商城管理 -->
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="headericon" @click="out">
            <el-avatar
            >{{userInfo.username}}</el-avatar>
          </div>
        </el-header>

        <!-- 主体 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!-- 面包屑导航 -->
            <el-breadcrumb-item class="route">
              <a href="/">{{ $route.name }}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    // 图片加载失败
    errorHandler() {
      return true;
    },

    // 退出登录
    out() {
      // 清空 vuex  本地
      this.changeUser({});
      // 跳转 页面
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.small {
  height: 100vh;
  position: relative;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.route {
  margin-bottom: 20px;
}
.headericon {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>