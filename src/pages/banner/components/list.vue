<template>
  <div class="box">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="轮播图标题"></el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status===1">启用</el-button>
          <el-button v-else type="danger" size="small">禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
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
import { reqbannerDel, reqbannerList } from "../../../../utils/http";
import { successAlert } from "../../../../utils/alert";

export default {
  props:['list'],
  computed: {
    ...mapGetters({
      // list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),

    // 删除
    del(id) {
      reqbannerDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");

          // 刷新页面
          this.$emit('init')
        }
      });
    },

    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },

  },
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>