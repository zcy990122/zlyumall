<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 显示类型 type="datetimerange" -->
        <el-form-item label="活动期限" label-width="120px">
          <el-date-picker
            v-model="allTime"
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
          <el-select v-model="user.second_cateid" placeholder="请选择" @change="changeTwo">
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
              v-for="item in newid"
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
  reqseckAdd,
  reqseckOne,
  reqseckUpdate,
  reqCateList,
  reqseckList,
  reqgoodsList,
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
    }),
  },
  methods: {
    ...mapActions({
      // 一级
      reqCateList: "cate/reqList",
      // reqGoodsList: "goods/reqList",

      goodsCount: "goods/reqCount",
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
      this.secondCateid = [];

      this.newid = [];

      this.allTime = [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10),
      ];
    },

    // 根据一级来请求二级
    changeOne() {
      // 发起请求前先重置一级id
      this.user.second_cateid = "";
      this.getChangeList();
    },
    getChangeList() {
      // 二及分类list
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateid = res.data.list;

        // console.log(this.secondCateid);
      });
    },

    // 商品
    changeTwo() {
      this.user.goodsid = "";
      this.getChangeTwo();
    },

    getChangeTwo() {
      reqgoodsList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        this.newid = res.data.list;
      });
    },

    TimeCC() {
      //取出allTime 中的时间  添加给 begintime: "" endtime: "",
      // new Date('Fri Nov 10 2000 10:10:00 GMT+0800').getTime()

      // 将其转换为时间戳 转换为字符串

      let newTime1 = JSON.stringify(
        new Date(this.allTime.slice(0, 1).join("")).getTime()
      );

      let newTime2 = JSON.stringify(
        new Date(this.allTime.slice(1, 2).join("")).getTime()
      );

      // let newTime1 = new Date(this.allTime.slice(0, 1).join("")).getTime();
      // let newTime2 = new Date(this.allTime.slice(1, 2).join("")).getTime();
      console.log(newTime1);
      console.log(newTime2);

      // 放入 begintime: "" endtime: "",
      this.user.begintime = newTime1;
      this.user.endtime = newTime2;

      console.log(this.begintime);
      console.log(this.endtime);

      console.log(this.user);
    },
    // 添加
    add() {
      this.TimeCC();
      reqseckAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          // 谈成功
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 数据清空
          this.empty();
          // 刷新列表
          this.$emit("init");
        }
      });
    },

    // 获得一条数据
    getOne(id) {
      reqseckOne(id).then((res) => {
        // console.log(id);
        // 转换为时间戳
        let oldTime1 = new Date(JSON.parse(res.data.list.begintime));
        let oldTime2 = new Date(JSON.parse(res.data.list.endtime));
        console.log(oldTime1);
        console.log(oldTime2);

        //  将其赋值给 this.allTime
        this.allTime = [new Date(oldTime1), new Date(oldTime2)];

        this.user = res.data.list;

        // console.log(this.user);
        // 该变格式
        this.getChangeTwo();
        this.getChangeList();
        // 补id
        this.user.id = id;
      });
    },

    // 修改
    update() {
      this.TimeCC();
      reqseckUpdate(this.user).then((res) => {
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
      if (this.info.title === "编辑活动") {
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
      secondCateid: [],

      newid: [],
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
      allTime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    };
  },
  mounted() {
    // 进来就请求一级列表
    this.reqCateList();

    // 商品列表
    // this.reqGoodsList();

    // 总数
    this.goodsCount();
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