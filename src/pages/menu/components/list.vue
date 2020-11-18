<template>
  <div class="box">
    <!-- 表格 -->
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status===1">启用</el-button>
          <el-button v-else type="danger" size="small">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="medium"
          @click="edit(scope.row.id)"
          >编辑</el-button>
          <el-button type="danger" size="medium" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqDel  } from "../../../../utils/http";
import { successAlert, errorAlert } from "../../../../utils/alert";
export default {
  props: ["list"],

  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

   // 删除 
    del(id) {
      this.$confirm("确定删除?", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          reqDel(id).then((res) => {
            if (res.data.code==200) {
              //成功的弹框
              successAlert(res.data.msg);

              //29.通知父组件刷新list
              this.$emit("init");

            } else {
              errorAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
         console.log("发生了错误");
        });
    },

  // 修改 编辑
   edit(id){
     this.$emit('edit',id)
   }
  },
};
</script>
<style scoped>
.start {
  width: 50px;
  height: 30px;
  text-align: center;
}
</style>