<template>
  <div class="box">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-if="scope.row.isnew===1">是</el-button>
          <el-button v-else type="danger" size="mini">否</el-button>
        </template>
      </el-table-column>

      
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-if="scope.row.ishot===1">是</el-button>
          <el-button v-else type="danger" size="mini">否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-if="scope.row.status===1">启用</el-button>
          <el-button v-else type="danger" size="mini">禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" :width='160'>
        <template slot-scope="scope" >
          <el-button type="primary" size="small" @click="edit(scope.row.id)">编辑</el-button>

          <v-btn @confirm="del(scope.row.id)"></v-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqgoodsDel } from "../../../../utils/http";
import { successAlert } from "../../../../utils/alert";

export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
       reqList: "goods/reqList",
       reqCount:'goods/reqCount'
    }),

    // 删除
    del(id) {
      reqgoodsDel(id).then((res) => {
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