<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed" @opened="opened">
      <el-form :model="user" :rules="rules">
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="user.first_cateid" placeholder="请选择" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="user.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <el-input v-model="user.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="user.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="120px" prop="market_price">
          <el-input v-model="user.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" label-width="120px" v-if="user.pid !== 0">
          <!-- 源生js -->
          <div class="myupload">
            <h3>+</h3>
            <img class="img" :src="imgUrl" alt v-if="imgUrl" />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeImg" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" label-width="120px" prop="specsid">
          <el-select v-model="user.specsid" placeholder="请选择" @change="changeSpecs">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :value="item.id"
              :label="item.specsname"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px" prop="specsattr">
          <el-select v-model="user.specsattr" placeholder="请选择" multiple>
            <el-option v-for="item in attrsList" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <!-- 富文本编辑器 -->
        <!-- <el-form-item label="状态" label-width="120px">
          <textarea cols="30" rows="10" v-model="user.description"></textarea>
        </el-form-item>-->
        <el-form-item label="描述" label-width="120px">
          <div id="edit" v-if="info.isshow"></div>
        </el-form-item>
        <!-- 商品描述 -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title ==='添加商品'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>编 辑</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqgoodsAdd,
  reqgoodsInfo,
  reqgoodsUpdate,
  reqgoodsList,
  reqCateList,
} from "../../../../utils/http";
import formVue from "../../manage/components/form.vue";
import { errorAlert, successAlert } from "../../../../utils/alert";
import path from "path";
import E from "wangeditor";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      // 一级
      cateList: "cate/list",

      // 规格
      specsList: "specs/list",
      // 分页
      total: "goods/total",
      size: "goods/size",
    }),
  },
  data() {
    return {
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //此时是数组，后端要的是 "[]"
        isnew: 1,
        ishot: 2,
        status: 1,
      },
      // 图片地址
      imgUrl: "",
      // 二级分类的列表
      secondCateList: [],
      // 二级规格的列表
      attrsList: [],

      // 验证
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入商品市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigger: "change" },
        ],
        specsattr: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个规格属性",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      // 一级
      reqCateList: "cate/reqList",
      // 规格
      reqSpecsList: "specs/reqList",

      //商品list和总数
      reqgoodsList: "goods/reqList",
      reqCount: "goods/reqCount",
      changePage: "goods/changePage",
    }),
    // 取消
    cancel() {
      this.info.isshow = false;
    },
    // 数据清空
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 2,
        status: 1,
      };
      this.imgUrl = "";
      // 二级分类的列表
      this.secondCateList = [];
      // 二级规格的列表
      this.attrsList = [];
    },
    // 根据一级分类id 得到二级分类
    changeFirst() {
      // 再发起请求前先重置id
      this.user.second_cateid = "";
      this.getsecoundList();
    },
    getsecoundList() {
      // 二级分类list
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },

    // 根据一级 来计算出二级规格属性的list
    changeSpecs() {
      //先将specsattr 置空
      this.user.specsattr = [];
      this.getAttrs();
    },
    getAttrs() {
      // 取出 specsList ,哪条数据的id和this.user.specsid是一样的
      let obj = this.specsList.find((item) => item.id === this.user.specsid);

      //就将这条数据的attrs取出来，赋值给attrsList
      this.attrsList = obj.attrs;
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

    // 添加前验证
    check() {
      return new Promise((resolve, reject) => {
        // 添加之前验证
        if (this.user.first_cateid === "") {
          errorAlert("请选择一级分类");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("请选择二级分类");
          return;
        }
        if (this.user.goodsname === "") {
          errorAlert("请输入商品名称");
          return;
        }
        if (this.user.price === "") {
          errorAlert("请输入商品价格");
          return;
        }
        if (this.user.market_price === "") {
          errorAlert("请输入商品市场价格");
          return;
        }
        if (this.user.img === null) {
          errorAlert("请选择图片");
          return;
        }
        if (this.user.specsid === "") {
          errorAlert("请选择商品规格");
          return;
        }
        if (this.user.specsattr.length === 0) {
          errorAlert("请选择商品属性");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("请输入商品描述");
          return;
        }
        resolve();
      });
    },

    // 添加
    add() {
      // 添加前验证
      this.check().then(() => {
        // 富文本编辑器的内容取出 给user.description
        // 取值
        this.user.description = this.editor.txt.html();

        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);

        console.log(d);
        reqgoodsAdd(d).then((res) => {
          if (res.data.code == 200) {
            // 谈成功
            successAlert("添加成功");
            // 弹框消失
            this.cancel();
            // 数据清空
            this.empty();
            // 刷新列表
            this.reqgoodsList();
            // 请求总数
            this.reqCount();
          }
        });
      });
    },

    // 获得一条数据
    getOne(id) {
      reqgoodsInfo(id).then((res) => {
        this.user = res.data.list;
        // 补id
        this.user.id = id;
        // 请求二级list
        this.getsecoundList();
        // 图片     给imgUrl 赋值     $imgPre前置
        this.imgUrl = this.$imgPre + this.user.img;
        // 属性
        this.user.specsattr = JSON.parse(this.user.specsattr);
        // 计算规格属性的list
        this.getAttrs();

        if (this.editor) {
          // 给编辑器赋值
          this.editor.txt.html(this.user.description);
        }
      });
    },

    // 修改
    update() {
      // 修改前验证
      this.check().then(() => {
        this.user.description = this.editor.txt.html();

        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);

        console.log(this.user);
        reqgoodsUpdate(d).then((res) => {
          if (res.data.code == 200) {
            // 谈成功
            successAlert("修改成功");
            // 弹框消失
            this.cancel();
            // 数据清空
            this.empty();
            // 刷新列表
            this.reqgoodsList();
          }
        });
      });
    },

    //.处理消失
    closed() {
      if (this.info.title === "编辑商品") {
        this.empty();
      }
    },
    // 弹框打开时  并且动画结束了 爱声明不声明
    opened() {
      this.editor = new E("#edit");
      this.editor.create();

      // 给编辑器赋值
      this.editor.txt.html(this.user.description);
    },
  },
  mounted() {
    // 请求一级列表
    this.reqCateList();

    // 请求商品规格
    this.reqSpecsList(true);

    // 请求总数
    this.reqCount();
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