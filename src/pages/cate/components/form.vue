<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="user.pid" placeholder="请选择角色">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <!-- <el-form-item label="图片" label-width="120px"
        v-if="user.pid !== 0"
        >-->
        <el-form-item label="图片" label-width="120px">
          <!-- 源生js -->
          <div class="myupload">
            <h3>+</h3>
            <img class="img" :src="imgUrl" alt v-if="imgUrl" />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeImg" />
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title ==='添加商品'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqCateAdd, reqCateInfo, reqcateUpdate } from "../../../../utils/http";
import formVue from "../../manage/components/form.vue";
import { successAlert } from "../../../../utils/alert";
import path from "path";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    // 取消
    cancel() {
      this.info.isshow = false;
    },
    // 数据清空
    empty() {
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    // 选择文件
    changeImg(e) {
      // 取得图片地址
      let file = e.target.files[0];
      // console.log(file);

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
      //给user.img赋值
      this.user.img = file;
      // console.log(this.user);
    },
    // 添加
    add() {
      reqCateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          // 谈成功
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();
          // 刷新列表
          this.reqList();
        }
      });
    },

    // 获得一条数据
    getOne(id) {
      reqCateInfo(id).then((res) => {
        this.user = res.data.list;

        // 给imgUrl 赋值     $imgPre前置
        this.imgUrl = this.$imgPre + this.user.img;

        // 补id
        this.user.id = id;
      });
    },

    // 修改
    update() {
      reqcateUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          // 谈成功
          successAlert("修改成功");
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();
          // 刷新列表
          this.reqList();
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
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      // 图片地址
      imgUrl: "",
    };
  },
};
</script>
<style scoped>
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}
.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}
.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>