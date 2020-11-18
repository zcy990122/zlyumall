<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button v-if="index === 0" type="primary" @click="addAttr">添加规格属性</el-button>

            <el-button v-else type="danger" @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title ==='添加规格'">添 加</el-button>
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
  reqspecsAdd,
  reqspecsOne,
  reqspecsUpdate,
} from "../../../../utils/http";
import formVue from "../../manage/components/form.vue";
import { successAlert } from "../../../../utils/alert";
import path from "path";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "specs/list",
      total: "specs/total",
      size: "specs/size",
    }),
  },
  methods: {
    ...mapActions({
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
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },
    // 新增规格属性
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    // 删除规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    // 添加
    add() {
      //  取出attrArr 放入 attrs
      this.user.attrs = JSON.stringify(this.attrArr.map((item) => item.value));

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
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [{ value: "" }],
    };
  },
  mounted() {
    this.reqCount();
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