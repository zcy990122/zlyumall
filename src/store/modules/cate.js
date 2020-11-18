import {reqCateList} from '../../../utils/http'

const state = {
    // 分类list
    list:[]
}

const mutations = {
    changeList(state,list){
        state.list=list
    }
}

const actions = {
    // 发起请求
    reqList(context){
        // 发请求成功之后  修改list 
        reqCateList({istree:true}).then(res=>{
            context.commit('changeList',res.data.list)
        }) 
    }
}

const getters = {
    list(state){
        return state.list
    }
}

export default {
    state,
    
    mutations,
    
    actions,
    
    getters,

    // 命名空间  
    namespaced: true
}