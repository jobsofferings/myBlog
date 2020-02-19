import React, { Component } from 'react'
import store from '../store'
import { watchDetails, changeGroupWithType, leftNaviChange } from '../store/actionCreators'
const IP = 'http://134.175.103.75:4397/';

class MyBlog extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        store.subscribe(this.storeChange.bind(this));
    }
    componentDidMount() {
    }
    componentDidUpdate() {
        let { pageData } = this.state;
        let img = document.getElementsByClassName('pageBodyItemImg')
    }
    render() {
        let { pageData } = this.state;
        return (
            <div>
                {this.builderPageList(pageData)}
            </div>
        )
    }
    builderPageList(pageData) {
        return pageData.map(item => {
            let newContent = "";
            item.description.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
                newContent = capture;
            });
            newContent = newContent === "" ? IP + 'default.jpg' : newContent;
            return <div className="pageBodyItem" key={item._id}>
                <div className="pageBodyItemImgArea">
                    <img className="pageBodyItemImg" onClick={this.handleWatchDetails.bind(this, item)} src={newContent} alt="" />
                </div>
                <div className="pageBodyItemDes">
                    <p className="pageTitle" onClick={this.handleWatchDetails.bind(this, item)}>{item.title}</p>
                    <div className="pageTime">by <span>{item.author}</span>  /  <span onClick={this.handleChangeGroup.bind(this, item.type)}>{item.group}</span>  /  <span>{item.time}</span></div>
                    <p className="pageDes">{item.description.replace(/<[^>]+>/g, "").substring(0, 70)}... <span onClick={this.handleWatchDetails.bind(this, item)}>更多</span></p>
                </div>
            </div>
        })
    }
    // 跳转group
    handleChangeGroup(index, e) {
        const action = changeGroupWithType(index);
        store.dispatch(action);
        const action1 = leftNaviChange();
        store.dispatch(action1);
    }
    // 查看文章详情
    handleWatchDetails(item, e) {
        // 回到页面顶部
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // 这个地方要注意页码显隐
        const action = watchDetails(item);
        store.dispatch(action);
        this.props.history.push('/details');
    }
    storeChange() {
        this.setState(store.getState())
    }
}

export default MyBlog