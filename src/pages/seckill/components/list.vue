<template>
  <div class="box">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="活动名称"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status===1">启用</el-button>
          <el-button v-else type="danger" size="small">禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" :width='800'>
        <template slot-scope="scope">
          <el-button type="primary" size="medium" @click="edit(scope.row.id)">编辑</el-button>

          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqspecsDel } from "../../../../utils/http";
import { successAlert } from "../../../../utils/alert";

export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
    }),

    // 删除
    del(id) {
      reqspecsDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");

          // 刷新页面
          this.reqList();

          // 请求总数
          this.reqCount();
        }
      });
    },

    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    // 一进来就发请求
    this.reqList();
  },
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>