<template>
  <div class="box">
    <!-- 添加按钮 -->
    <el-button type="primary" size="medium" class="btn" @click="Add">添加</el-button>

    <!-- 表格 -->
    <v-list @edit="edit" :list='list' @init='init'></v-list>

    <!-- 弹框 -->
    <v-form :info="info" ref="form" @init='init'></v-form>
  </div>
</template>
<script>
import vList from "./components/list";
import vForm from "./components/form";
import { mapGetters, mapActions } from "vuex";
import {reqseckList} from '../../../utils/http'
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "添加活动",
      },
      list:[]
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    //  添加
    Add() {
      this.info = {
        isshow: true,
        title: "添加活动",
      };
    },

    // 编辑
    edit(id) {
      this.info = {
        isshow: true,
        title: "编辑活动",
      };
      this.$refs.form.getOne(id)
    },

    init(){
      reqseckList().then(res=>{
        this.list = res.data.list
      })
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.btn {
  margin-bottom: 10px;
}
</style>