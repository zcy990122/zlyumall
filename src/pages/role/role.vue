<template>
  <div class="box">
    <!-- 添加按钮 -->
    <el-button type="primary" size="medium" class="btn" @click="addRole">添加</el-button>

    <!-- 表格 table  list -->
    <v-list :list="list"  @init='init' @edit='edit' ></v-list>

    <!-- 弹框 -->
    <v-form :info="info" @init='init' ref="form"> </v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqRoleList } from "../../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加角色",
      },
      //列表数据初始值
      list:[],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //发请求
    init() {
      reqRoleList().then((res) => {
        // 三元如果有数据就有数据  没有的话就是[]
        this.list = res.data.list?res.data.list:[]
      });
    },

    //  添加
    addRole() {
      this.info = {
        isshow: true,
        title: "添加角色",
      };
    },

    // 修改
    edit(id){
      this.info={
        isshow:true,
        title:'编辑角色'
      }
      this.$refs.form.getOne(id)
    }
  },
  components: {
    vList,
    vForm,
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