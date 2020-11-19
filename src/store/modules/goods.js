import { reqgoodsList, reqgoodsCount } from '../../../utils/http'

const state = {
    // 分类list
    list: [],
    total: 0,
    size: 2,
    page: 1
}

const mutations = {
    changeList(state, list) {
        state.list = list
    },

    changeTotal(state, total) {
        state.total = total
    },

    changePage(state, page) {
        state.page = page
    }
}

const actions = {
    // 发起请求
    reqList(context) {
        // 发请求成功之后  修改list 
        reqgoodsList({page:context.state.page,size:context.state.size}).then(res => {

            // 如果取到了数据
            let list = res.data.list ? res.data.list : []

            //  如果没有取到值且不是第一页           
            if (list.length == 0 && context.state.page > 1) {
                // 只有mutations才能修改仓库的值
                context.commit('changePage',context.state.page - 1);
                context.dispatch('reqList')
                return
            }


            context.commit('changeList', list)
        })
    },
    // 取总数
    reqCount(context) {
        reqgoodsCount().then(res => {
            context.commit('changeTotal', res.data.list[0].total)
        })
    },

    // 修改页面
    changePage(context, page) {
        // 修改页码
        context.commit('changePage', page)
        // 重新请求数据
        context.dispatch('reqList')
    }
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
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