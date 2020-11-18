<template>
  <div class="box">
    <!-- 添加按钮 -->
    <el-button type="primary" size="medium" class="btn" @click="addManage">添加</el-button>
    <!-- 表 -->
    <v-list :list="list" @init="NewInit" @edit="edit"></v-list>

    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>

    <!-- 弹框 -->
    <!-- 添加完成多数据   重新请求总数 -->
    <v-form :info="info" @init="NewInit" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form";
import vList from "./components/list";
import { reqUserList, reqUserOne, reqUserMax } from "../../../utils/http";
export default {
  computed: {
    ...mapGetters({}),
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "添加管理",
      },
      // 初始化list
      list: [],
      // 51.初始化数据
      total: 0, //总数
      size: 2, //一页的数量
      page: 1, //页码
    };
  },
  methods: {
    ...mapActions({}),

    addManage() {
      this.info = {
        isshow: true,
        title: "添加管理",
      };
    },

    // 刷新列表
    init() {
      reqUserList({ page: this.page, size: this.size }).then((res) => {
        let list = res.data.list ? res.data.list : [];

        // 如果取得的list为[]的话 并且page不为1 page--
        if (list.length === 0 && this.page > 1) {
          this.page--;
          this.init();
          return;
        }

        this.list = list;
      });
    },

    // 获取一条数据
    edit(uid) {
      // 弹出弹框
      this.info = {
        isshow: true,
        title: "修改管理",
      };
      this.$refs.form.getOne(uid);
    },

    // 总数
    Max() {
      reqUserMax().then((res) => {
        this.total = res.data.list[0].total;
      });
    },

    // 切换页码
    changePage(page) {
      this.page = page;

      this.init();
    },

    // 新NewInit
    NewInit() {
      this.init();

      this.Max();
    },
  },
  mounted() {
    this.init();

    //  进来就获取总数
    this.Max();
  },
  components: {
    vForm,
    vList,
  },
};
</script>
<style scoped>
</style>