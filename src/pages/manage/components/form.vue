<template>
  <div class="box">
    <!-- 表格 -->
    <el-dialog :title="info.title" :visible.sync="info.isshow"  @closed="closed">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加管理'" @click="add">添 加</el-button>
        <el-button type="primary" v-else
        @click="update"
        >修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleList, reqUserAdd, reqUserOne ,reqUserUpdate} from "../../../../utils/http";
import { successAlert } from "../../../../utils/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({}),
  },
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: "1",
      },
      //  11.角色列表
      roleList: [],
    };
  },
  methods: {
    ...mapActions({}),
    //.清空数据
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },

    // 取消
    cancel() {
      this.info.isshow = false;
    },
    add() {
      // 发送请求
      reqUserAdd(this.user).then((res) => {
        //  谈成功
        successAlert("添加成功");
      });
      // 弹框消失
      this.cancel();
      // 内容清空
      this.empty();

      // 刷新页面
      this.$emit("init");
    },

    // 获取一条数据
    getOne(uid) {
      reqUserOne(uid).then((res) => {
        this.user = res.data.list

        this.user.password= ''
      });
    },

    // 修改
    update(){
      reqUserUpdate(this.user).then(res=>{
        if(res.data.code == 200){
          // 谈成功
          successAlert('修改成功')
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();

          // 刷新list
          this.$emit('init')

        }
      })
    },

    // 处理消失
    closed(){
      if(this.info.title === '编辑管理'){
        this.empty()
      }
    }
  },

  mounted() {
    //   12.一进来，先获取菜单列表数据
    reqRoleList().then((res) => {
      this.roleList = res.data.list;
    });
  },
};
</script>
<style scoped>
</style>