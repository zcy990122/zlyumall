<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <!-- element-ui 图片上传 -->

        <el-form-item label="图片" label-width="120px">
          <el-upload
            action="#"
            list-type="picture-card"
            :multiple="multiple"
            :on-change='changeImg'
          >
            <img v-if="imgUrl" :src="imgUrl" alt="">
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title ==='添加图片'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqbannerAdd, reqbannerInfo, reqbannerUpdate } from "../../../../utils/http";
import formVue from "../../manage/components/form.vue";
import { successAlert } from "../../../../utils/alert";
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
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    // 选择文件
    changeImg(e) {
      // console.log(e);
      // 取得图片地址
      let file = e.raw;
      // 判断文件大小
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2M");
        return;
      }

      // 判断文件类型是否正确
      let extname = path.extname(file.name);

      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      // 如果后缀名不正确
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }

      // 限定图片格式

      // 将文件变为地址   URL.createObjectURL()
      this.imgUrl = URL.createObjectURL(file);
      // this.imgUrl = e.url;
      //给user.img赋值
      this.user.img = file;
    },
    // 添加
    add() {
      reqbannerAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          // 谈成功
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();
          // 刷新列表
          this.$emit('init')
        }
      });
    },

    // 获得一条数据
    getOne(id) {
      reqbannerInfo(id).then((res) => {
        this.user = res.data.list;

        // 给imgUrl 赋值     $imgPre前置
        this.imgUrl = this.$imgPre + this.user.img;

        // 补id
        this.user.id = id;
      });
    },

    // 修改
    update() {
      reqbannerUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          // 谈成功
          successAlert("修改成功");
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();
          // 刷新列表
         this.$emit('init')
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
        title: "",
        img: null,
        status: 1,
      },
      // 图片地址
      imgUrl: "",
      multiple:true
    };
  },
};
</script>
<style scoped>

</style>