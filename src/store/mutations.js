//根级别mutations state getters

export const state = {
    userInfo: sessionStorage.getItem('userInfo') ?
        JSON.parse(sessionStorage.getItem('userInfo')) : {}
}

export const mutations = {
    changeUserInfo(state, obj) {
        state.userInfo = obj
        // 如果有token 就存  没有的话 就清空 
        if (obj.token) {
            // 存本地
            sessionStorage.setItem('userInfo', JSON.stringify(obj))
        }else{
            // sessionStorage.clear()
            sessionStorage.removeItem('userInfo')
        }

    }
}

export const getters = {
    userInfo(state) {
        return state.userInfo
    }
}