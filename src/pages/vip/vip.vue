<template>
  <div class="box">
    <!-- 表格 -->
    <v-list @edit="edit" :list='list' @init='init'></v-list>

    <!-- 弹框 -->
    <v-form :info="info" ref="form" :list='list' @init='init'></v-form>
  </div>
</template>
<script>
import vList from "./components/list";
import vForm from "./components/form";
import { mapGetters, mapActions } from "vuex";
import { reqVipList } from "../../../utils/http";
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "",
      },
       list:[]
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    // 编辑
    edit(uid) {
      this.info = {
        isshow: true,
        title: "编辑会员",
      };

      this.$refs.form.getOne(uid);
    },

    // 刷新列表
    init() {
      reqVipList().then((res) => {
        this.list = res.data.list;
      });
    },
  },

  mounted() {
    // 一进来就获取数据
    this.init()
  },
};
</script>

<style scoped>
.btn {
  margin-bottom: 10px;
}
</style>