import Vue from 'vue'
let vm = new Vue()

// 成功alert
export const successAlert= (msg)=>{
    vm.$message({
        message: msg,
        type: "success",
      });
}

//失败alert
export const errorAlert= (msg)=>{
    vm.$message({
        message: msg,
        type: "warning",
      });
}