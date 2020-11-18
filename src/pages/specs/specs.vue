<template>
  <div class="box">
    <!-- 添加按钮 -->
    <el-button type="primary" size="medium" class="btn" @click="Add">添加</el-button>

    <!-- 表格 -->
    <v-list @edit="edit"></v-list>

    <!-- 弹框 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>
<script>
import vList from "./components/list";
import vForm from "./components/form";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "添加规格",
      },
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
        title: "添加规格",
      };
    },

    // 编辑
    edit(id) {
      this.info = {
        isshow: true,
        title: "编辑规格",
      };
      this.$refs.form.getOne(id)
    },
  },
};
</script>

<style scoped>
.btn {
  margin-bottom: 10px;
}
</style>