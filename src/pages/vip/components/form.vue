<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqbannerAdd,
  reqbannerInfo,
  reqbannerUpdate,
} from "../../../../utils/http";
import formVue from "../../manage/components/form.vue";
import { successAlert } from "../../../../utils/alert";
import {reqVipOne , reqVipUpdate} from '../../../../utils/http'
import path from "path";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      // bannerList: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      // reqList: "banner/reqList",
    }),
    // 取消
    cancel() {
      this.info.isshow = false;
    },
    // 数据清空
    empty() {
      this.user = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },

    // 获得一条数据
    getOne(uid) {
      reqVipOne(uid).then((res) => {
        
        this.user = res.data.list;

         this.user.password =''
      });
    },

    // 修改
    update() {

      reqVipUpdate(this.user).then((res) => {

        if (res.data.code == 200) {
          // 谈成功
          successAlert("修改成功");
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();
          // 刷新列表
          this.$emit("init");
        }
      });
    },

    //.处理消失
    closed() {
      if (this.info.title === "编辑分类") {
        this.empty();
      }
    },
  },
  data() {
    return {
      user: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
};
</script>
<style scoped>
</style>