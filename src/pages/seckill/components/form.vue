<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        {{user}}
        <!-- 显示类型 type="datetimerange" -->
        <el-form-item label="活动期限" label-width="120px">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            :start-placeholder="user.begintime"
            :end-placeholder="user.endtime"
            unlink-panels
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="user.first_cateid" placeholder="请选择" @change="changeOne">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="user.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCateid"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="120px">
          <el-select v-model="user.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :value="item.id"
              :label="item.goodsname"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title ==='添加活动'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqspecsAdd,
  reqspecsOne,
  reqspecsUpdate,
  reqCateList
} from "../../../../utils/http";
import formVue from "../../manage/components/form.vue";
import { successAlert } from "../../../../utils/alert";
import path from "path";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      // 一级
      cateList: "cate/list",
      // 商品列表 一级
      goodsList: "goods/list",

      // cateList: "specs/list",
      total: "specs/total",
      size: "specs/size",
    }),
  },
  methods: {
    ...mapActions({
      // 一级
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList",

      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
      changePage: "specs/changePage",
    }),
    // 取消
    cancel() {
      this.info.isshow = false;
    },
    // 数据清空
    empty() {
      this.user = {
        id: "",
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },

    // 根据一级来请求二级
    changeOne() {
        // 发起请求前先重置一级id
        this.user.second_cateid = '';
        this.getChangeList();
    },
    getChangeList(){
      // 二及分类list
      reqCateList({pid:this.user.first_cateid}).then(res=>{
        this.secondCateid = res.data.list
      })
    },
    // 添加
    add() {
      //  取出attrArr 放入 attrs
      reqspecsAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          // 谈成功
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();
          // 刷新列表
          this.reqList();
          // 请求总数
          this.reqCount();
        }
      });
    },

    // 获得一条数据
    getOne(id) {
      reqspecsOne(id).then((res) => {
        this.user = res.data.list[0];

        // 该变格式
        this.attrArr = JSON.parse(this.user.attrs).map((item) => ({
          value: item,
        }));

        // 补id
        // this.user.id = id;
      });
    },

    // 修改
    update() {
      //  取出attrArr 放入 attrs
      this.user.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqspecsUpdate(this.user).then((res) => {
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
      if (this.info.title === "编辑规格") {
        this.empty();
      }
    },
  },
  data() {
    return {
      user: {
        id: "",
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondCateid:[],
      attrArr: [{ value: "" }],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
    };
  },
  mounted() {
    this.reqCount();

    // 进来就请求一级列表
    this.reqCateList();

    // 商品列表
    this.reqGoodsList();
  },
};
</script>
<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
.el-pagination {
  margin-top: 10px;
}
</style>