<template>
  <div class="box">
    <!-- 表格 -->
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed='closed'>
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" label-width="120px" v-if="form.type === 1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title ==='添加菜单'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import axios from "axios";
import { reqAdd, reqOne ,reqUpdate} from "../../../../utils/http";
import { successAlert, errorAlert } from "../../../../utils/alert";
export default {
  //4.接收 isshow
  props: ["info", "list"],
  data() {
    return {
      //   弹窗的状态
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-help",
        "el-icon-s-operation",
      ],
      // 11.初始化 form   双向绑定数据
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: "1",
      },
      routes: routes,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    // 上级菜单发生了修改  如果是顶级的菜单  form===1
    changePid() {
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 6.点击了取消
    cancel() {
      this.info.isshow = false;
    },
    // 13.form置空
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },

    // 点击添加按钮  发送axios请求
    add() {
      reqAdd(this.form).then((res) => {
        //  判断是否成功
        if (res.data.code === 200) {
          successAlert("添加成功");
          //弹框消失
          this.cancel();

          //from置空
          this.empty();

          //列表刷新  通知父级刷新列表数据
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      reqOne(id).then((res) => {
        this.form = res.data.list;
        // 补id
        this.form.id = id;
      });
    },

    // 更新 修改
    update() {
      reqUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert("修改成功");

          //弹框消失
          this.cancel(); 

          //from置空
          this.empty();

          //列表刷新  通知父级刷新列表数据
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },

    // 弹框消失置空
    closed(){
        if(this.info.title ==='编辑菜单'){
            this.empty()
        }
    }
  },
};
</script>
<style scoped>
</style>