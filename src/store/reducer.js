import { CHANGE_GROUP, LEFTNAVICHANGE, WATCHDETAILS, GET_ALL_TYPE_ARTICLE, GET_ARTICLE_BY__ID, SET_LOADING, SET_SELECTED, GET_NEAR_ARTICLE, SELECTED_BY_STR } from './actionTypes'
// import { ConvertPinyin } from '../myFun/transChinese'
const defaultState = {
    activePage: 0,
    // 文章数据，暂设长度为5
    pageData: [],
    // 当小页面时，是否点开了左侧拉框
    isShowNavication: true,
    // 正在阅读的文章对象
    isReadingDetails: {},
    // 该类的总文章数
    articleSum: 0,
    // 该类的总页数
    totalPage: 0,
    // 该类当前的页码
    page: 1,
    // 当前页面的文章个数
    thePageLength: 0,
    // 当前loading显隐
    isLoading: false,
    // 当前selected显隐
    isShowSelected: false,
    // 最近的,不大于五篇的文章
    nearArticle: []
};
export default (state = defaultState, action) => {
    let newState;
    switch (action.type) {
        // 获取首页所有文章 长度小于等于5
        case GET_ALL_TYPE_ARTICLE:
            newState = JSON.parse(JSON.stringify(state));
            let { pageData, articleSum, totalPage, thePageLength, page } = action.data;
            newState = { ...newState, pageData, articleSum, totalPage, thePageLength, page }
            return newState;
        case CHANGE_GROUP:
            newState = JSON.parse(JSON.stringify(state));
            newState.activePage = action.index;
            return newState;
        case LEFTNAVICHANGE:
            newState = JSON.parse(JSON.stringify(state));
            newState.isShowNavication = !newState.isShowNavication
            return newState;
        case SET_LOADING:
            newState = JSON.parse(JSON.stringify(state));
            newState.isLoading = action.flag;
            return newState;
        case SET_SELECTED:
            newState = JSON.parse(JSON.stringify(state));
            newState.isShowSelected = action.flag;
            return newState;
        case WATCHDETAILS:
            newState = JSON.parse(JSON.stringify(state));
            // 如果这里有TS就好了
            newState.isReadingDetails = action.obj;
            let { _id } = action.obj;
            document.cookie = `isReadingDetails_id=${_id}`
            // 去除回车，因为回车cookie不识别
            return newState;
        case GET_NEAR_ARTICLE:
            newState = JSON.parse(JSON.stringify(state));
            newState.nearArticle = action.data.nearArticle
            return newState;
        case GET_ARTICLE_BY__ID:
            newState = JSON.parse(JSON.stringify(state));
            // 若正在reading的文章为空，则使用cookie
            if (Object.keys(newState.isReadingDetails).length == 0) {
                newState.isReadingDetails = action.res.data
            }
            return newState;
        case SELECTED_BY_STR:
            newState = JSON.parse(JSON.stringify(state));
            for (let item of Object.keys(action.data)) {
                for (let item1 of Object.keys(newState)) {
                    if (item === item1) {
                        newState[item1] = action.data[item];
                    }
                }
            }
            return newState;
    }
    return state;
}

