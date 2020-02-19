import React, { Component } from 'react'
import store from '../store'
import './css/details.css'
import { changeGroupWithType, leftNaviChange, getArticleBy_id } from '../store/actionCreators'

class MyBlog extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        store.subscribe(this.storeChange.bind(this));
    }
    componentDidMount() {
        let _id = this.get_cookie("isReadingDetails_id");
        const action = getArticleBy_id(_id);
        store.dispatch(action);
    }
    componentWillUnmount() {
        this.props.history.push('/');
    }
    render() {
        let { isReadingDetails } = this.state;
        let { title, author, group, time } = isReadingDetails;
        return (
            <div className='detailsArea'>
                <div className="detailsTitle">{title}</div>
                <div className={`${Object.keys(isReadingDetails).length == 0 ? 'hide detailsInfo' : 'detailsInfo'}`}>by <span className="detailsInfoCanHover">{author}</span>  /  <span onClick={this.handleChangeGroup.bind(this, 1)} className="detailsInfoCanHover">{group}</span>  /  <span>{time}</span></div>
                <div className="detailsDescription" dangerouslySetInnerHTML={this.createMarkupHTML()}></div>
            </div>
        )
    }
    // 将str中的html代码转为html显示
    createMarkupHTML() {
        let { isReadingDetails } = this.state;
        let { description } = isReadingDetails;
        return { __html: description };
    }
    // 获得cookie的小封装 传入示例 formatCooValue(obj, "obj")
    formatCooValue(obj, name) {
        return obj = obj ? obj : this.get_cookie(name);
    }
    // 获得cookie
    get_cookie(Name) {
        var search = Name + "="//查询检索的值
        var returnvalue = "";//返回值
        if (document.cookie.length > 0) {
            let sd = document.cookie.indexOf(search);
            if (sd != -1) {
                sd += search.length;
                let end = document.cookie.indexOf(";", sd);
                if (end == -1)
                    end = document.cookie.length;
                //unescape() 函数可对通过 escape() 编码的字符串进行解码。
                returnvalue = document.cookie.substring(sd, end)
            }
        }
        return returnvalue;
    }
    // 跳转group
    handleChangeGroup(index, e) {
        const action = changeGroupWithType(index);
        store.dispatch(action);
        const action1 = leftNaviChange();
        store.dispatch(action1);
        this.props.history.push('/');
    }
    storeChange() {
        this.setState(store.getState())
    }
}

export default MyBlog