import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入 根目录下的
import actions from './actions'
import {state,mutations,getters} from './mutations'

// 其他模块
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'

export default new Vuex.Store({
    state,
    
    mutations,
    
    actions,
    
    getters,
    
    // 模块 modules
    modules:{
        cate,
        specs,
        goods
    }
})