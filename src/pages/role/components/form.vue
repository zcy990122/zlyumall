<template>
  <div class="box">
    <!-- 表格 -->
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 树型节点 -->
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menulist"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children: 'children',label: 'title'}"
          ></el-tree>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加角色' ">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqMenuList,
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../../utils/http";
import { successAlert } from "../../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      // 初始化树形控件
      menulist: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    // 数据清空
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      // 清空树
      this.$refs.tree.setCheckedKeys([]);
    },

    // 取消
    cancel() {
      this.info.isshow = false;
    },

    // 添加
    add() {
      // 将树形控件的数据取出，变成字符串数组，赋值给user.menus
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      // Axios
      reqRoleAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          // 弹出成功
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();

          // 刷新页面
          this.$emit("init");
        }
      });
    },

    // 编辑数据
    getOne(id) {
      reqRoleDetail(id).then((res) => {
        // 此刻uesr没有id
        this.user = res.data.list;

        //处理树形控件的数据
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));

        // 补id
        this.user.id = id;
      });
    },
    // 修改数据
    update() {
      // 树形结构
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");

          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    },

    //处理消失
    closed() {
      if (this.info.title === "编辑角色") {
        this.empty();
      }
    },
  },

  mounted() {
    // 一进来，先获取菜单列表数据
    reqMenuList().then((res) => {
      if (res.data.code == 200) {
        this.menulist = res.data.list;
      }
    });
  },
};
</script>
<style scoped>
</style>  
 