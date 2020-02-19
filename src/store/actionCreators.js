import { CHANGE_GROUP, LEFTNAVICHANGE, WATCHDETAILS, GET_ALL_TYPE_ARTICLE, GET_ARTICLE_BY__ID, SET_LOADING, GET_NEAR_ARTICLE, SET_SELECTED, SELECTED_BY_STR } from './actionTypes'
import { getAllTypeArticlesApi, getNearArticlesApi, getArticleBy_idApi, getArticlesByStrApi } from '../myFun/api'
import store from '../store'

// //工厂模式

// 根据_id请求文章
export const getArticleBy_id = (_id) => {
    const action = setLoading(true);
    store.dispatch(action);
    return (dispatch) => {
        getArticleBy_idApi({ _id }).then(res => {
            const action = getArticleBy_idBack(res);
            dispatch(action);
            const action1 = setLoading(false);
            dispatch(action1);
        }).catch(err => {
            console.log(err);
        })
    }
}

// 根据_id请求文章的回调
export const getArticleBy_idBack = (res) => ({
    type: GET_ARTICLE_BY__ID,
    res
})
// 改变组别回调
export const changeGroup = (index) => ({
    type: CHANGE_GROUP,
    index
})

// 根据selected里面的文本进行模糊查询文章
export const selectedByStr = (str) => {
    const action = setLoading(true);
    store.dispatch(action);
    return (dispatch) => {
        getArticlesByStrApi({ str }).then(res => {
            // 回到页面顶部
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            const action1 = selectedByStrBack(res);
            dispatch(action1);
            const action2 = setLoading(false);
            dispatch(action2);
        }).catch(err => {
            console.log(err);
        })
    }
}
// 根据selected里面的文本进行模糊查询文章的回调
export const selectedByStrBack = (data) => ({
    type: SELECTED_BY_STR,
    data
})

// 点击改变组别做的请求
export const changeGroupWithType = (index) => {
    const action = setLoading(true);
    store.dispatch(action);
    let req = {
        group: index,
        page: 1
    }
    return (dispatch) => {
        getAllTypeArticlesApi(req).then(res => {
            // 回到页面顶部
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            const action1 = getAllTypeArticleBack(res);
            dispatch(action1);
            const action2 = changeGroup(index);
            dispatch(action2);
            const action3 = setLoading(false);
            dispatch(action3);
        }).catch(err => {
            console.log(err);
        })
    }
}

// 换页的请求
export const changePage = (req) => {
    const action = setLoading(true);
    store.dispatch(action);
    return (dispatch) => {
        getAllTypeArticlesApi(req).then(res => {
            // 回到页面顶部
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            const action = getAllTypeArticleBack(res);
            dispatch(action);
            const action2 = setLoading(false);
            dispatch(action2);
        }).catch(err => {
            console.log(err);
        })
    }
}

// 获取最近的五个文章
export const getNearArticle = () => {
    return (dispatch) => {
        getNearArticlesApi().then(res => {
            const action1 = getNearArticleBack(res);
            dispatch(action1);
        }).catch(err => {
            console.log(err);
        })
    }
}

// 获取最近的五个文章的回调
export const getNearArticleBack = (data) => ({
    type: GET_NEAR_ARTICLE,
    data
})

// Loading Icon是否显示
export const setLoading = (flag) => ({
    type: SET_LOADING,
    flag
})

// Loading Icon是否显示
export const setSelected = (flag) => ({
    type: SET_SELECTED,
    flag
})

// 页面较小时，左侧navigation的伸缩
export const leftNaviChange = () => ({
    type: LEFTNAVICHANGE,
})

// 查看文章详情
export const watchDetails = (obj) => ({
    type: WATCHDETAILS,
    obj
})

// 获取所有文章的请求
export const getAllTypeArticle = (req) => {
    const action = setLoading(true);
    store.dispatch(action);
    return (dispatch) => {
        getAllTypeArticlesApi(req).then(res => {
            const action1 = getAllTypeArticleBack(res);
            dispatch(action1);
            const action2 = setLoading(false);
            store.dispatch(action2);
        }).catch(err => {
            console.log(err);
        })
    }
}

// 获取所有文章的请求的回调
export const getAllTypeArticleBack = (data) => ({
    type: GET_ALL_TYPE_ARTICLE,
    data
})