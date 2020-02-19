import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import store from '../store'
import { changeGroupWithType, leftNaviChange, getAllTypeArticle, changePage, getNearArticle, selectedByStr, watchDetails, setSelected } from '../store/actionCreators'
import './css/reset.css'
import './css/head.css'
import Close from '../img/叉.png'
import List from '../img/列表.png'
import TelIcon from '../img/电话.png'
// import QQIcon from '../img/QQ.png'
import WeiXinIcon from '../img/微信.png'
import linkIcon from '../img/友情链接.png'
import qqcode from '../img/qqcode.jpg'
import weixincode from '../img/weixincode.png'
import ItemList from './itemList'
import Details from './details'
import ReactLoading from 'react-loading';

const myTel = '14797992768';
let W = window.innerWidth
let H = window.innerHeight
const DetailsStr = '/details';
const myBoKeYuanLink = 'https://www.cnblogs.com/JobsOfferings/';

class MyBlog extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        store.subscribe(this.storeChange.bind(this));
    }
    componentDidMount() {
        const action = getAllTypeArticle({ page: 1, group: 0 });
        store.dispatch(action);
        const action1 = getNearArticle();
        store.dispatch(action1);

        let svg = this.refs.svg;
        let selectedIcon = this.refs.selectedIcon;
        selectedIcon.addEventListener("mouseenter", () => {
            svg.setAttribute("fill", "#0366d6");
        })
        selectedIcon.addEventListener("mouseout", () => {
            svg.setAttribute("fill", "#404248");
        })
        this.funOfWindowResize();
        window.addEventListener("resize", () => {
            this.funOfWindowResize();
        })
    }
    componentWillUnmount() {
        let selectedIcon = this.refs.selectedIcon;
        selectedIcon.removeEventListener("mouseenter", () => {
            console.log('mouseenter移除');
        });
        selectedIcon.removeEventListener("mouseout", () => {
            console.log('mouseout移除');
        });
    }
    render() {
        let { isShowNavication, isLoading, isShowSelected } = this.state;
        return (
            <div className="page">
                <div className='pageHead'>
                    <div className="pageHeadLeft">
                        <p onClick={() => { this.props.history.push('/'); }}>jobsoffering</p>
                    </div>
                    <div className="pageHeadCloseIcon">
                        <div className="closeIcon" onClick={this.handleChangeLeft.bind(this)}>
                            <img src={List} alt="List" />
                        </div>
                    </div>
                    <div className="pageHeadRight">
                        <ul>
                            {this.builderNavigation()}
                            <li onClick={this.handleControl.bind(this)}>
                                <svg ref="selectedIcon" className="selectedIcon" width="15" height="15" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path ref="svg" d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z" fill="#111111" />
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pageBody">
                    <div className="pageBodyLeft">
                        {/* {this.cuesOfSearch()} */}
                        <Route path="/" exact component={ItemList} />
                        <Route path="/details" exact component={Details} />
                        <ReactLoading className={`reactLoading ${isLoading ? 'show' : 'hide'}`} type={'spinningBubbles'} color={'#555555'} height={'6%'} width={'6%'} />
                        {this.builderPage()}
                    </div>
                    <div className="pageBodyRight">
                        <div className="pageBodyRightAdverArea">
                            {/* <img src="https://www.zhujibiji.com/wp-content/uploads/2019/03/320x100.jpg" alt="" /> */}
                        </div>
                        <div className="pageBodyRightNear">
                            <p>近期文章</p>
                            {this.builderNearArticle()}
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="footerArea">
                        <p>© CopyRight 2019 jobsofferings 赣ICP备19002928号-11</p>
                    </div>
                </div>
                <div className={isShowNavication ? "smallAreaBack" : "smallArea"}>
                    <div className="closeIconArea">
                        <div className="closeIcon" onClick={this.handleChangeLeft.bind(this)}>
                            <img src={Close} alt="Close" />
                        </div>
                    </div>
                    <ul className="smallList">
                        {this.builderNavigation()}
                    </ul>
                </div>
                <div className={isShowNavication ? "maskBack" : "mask"} onClick={this.handleChangeLeft.bind(this)}></div>
                <div className={isShowSelected ? "selectedArea" : "selectedArea selectedAreaBack"}>
                    <input className="selectedInput" type="text" onKeyUp={this.onKeyup.bind(this)} />
                    <div onClick={this.handleSearchByStr.bind(this)}>
                        <svg width="15" height="15" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z" /></svg>
                    </div>
                </div>
                <div className="pageRightFloat">
                    <div>
                        <div className="pageRightFloatImgArea">
                            <img src={TelIcon} alt="TelIcon" />
                        </div>
                        <div className="pageRightFloatTelArea">
                            <p>{myTel}</p>
                        </div>
                    </div>
                    <div>
                        <div className="pageRightFloatImgArea">
                            <img src={WeiXinIcon} alt="QQIcon" />
                        </div>
                        <div className="pageRightFloatQQArea">
                            <img src={qqcode} alt="qqcode" />
                            <div className="pageRightTriangle"></div>
                        </div>
                    </div>
                    <div>
                        <div className="pageRightFloatImgArea">
                            <img src={WeiXinIcon} alt="WeiXinIcon" />
                        </div>
                        <div className="pageRightFloatWeiXinArea">
                            <img src={weixincode} alt="weixincode" />
                            <div className="pageRightTriangle"></div>
                        </div>
                    </div>
                    <div>
                        <div className="pageRightFloatImgArea" onClick={this.handleToBoKeYuan.bind(this)}>
                            <img src={linkIcon} alt="linkIcon" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    storeChange() {
        this.setState(store.getState())
    }
    // 键盘响应selected
    onKeyup(e) {
        if (e.target.value) {
            if (e.keyCode === 13) {
                this.handleSearchByStr();
            }
        }
    }
    // 搜索提示信号
    cuesOfSearch() {
        return <div>
            <div>的搜索结果</div>
            <div>抱歉，没有符合您搜索条件的结果。请换其它关键词再试。</div>
        </div>
    }
    // 取值进行模糊查询
    handleSearchByStr() {
        let selectedInput = document.getElementsByClassName('selectedInput')[0].value;
        document.cookie = `selectedInput=${selectedInput}`
        const action = selectedByStr(selectedInput);
        store.dispatch(action);
        this.props.history.push('/');
    }
    // 控制selected显隐
    handleControl() {
        let { isShowSelected } = this.state;
        const action = setSelected(!isShowSelected);
        store.dispatch(action);
    }
    // 渲染顶部navigation及左侧伸缩的navigation
    builderNavigation() {
        let naviName = ["首页", "Node", "JavaScript", "CSS", "Python", "其他"];
        let { activePage } = this.state;
        return naviName.map((item, index) => {
            return <li onClick={this.handleChangeGroup.bind(this, index)} key={index}><p className={activePage === index ? "activePage" : "unactivePage"}>{item}</p></li>;
        });
    }
    // 渲染右侧最近文章
    builderNearArticle() {
        let { nearArticle } = this.state;
        return nearArticle.map(item => {
            return <div key={item._id} onClick={this.handleWatchDetails.bind(this, item)}>{item.title}</div>
        })
    }
    // 渲染分页
    builderPage() {
        let location = this.props.location.pathname
        return <div className={`${DetailsStr === location ? 'hide' : 'PagingArea'}`}>
            {/* 注意一下，这里会有一个没有定义class的div，但是必须需要 */}
            {this.builderPageDetails()}
        </div>
    }
    // 分页的细节
    builderPageDetails() {
        let { totalPage, page } = this.state;
        if (totalPage == 0) {
            return
        } else if (totalPage == 1) {
            return <div>
                <div className="indexPageNum">{page}</div>
            </div>
        } else if (totalPage >= 2 && totalPage <= 5) {
            return this.builderPageSame(totalPage)
        } else {
            return this.builderPageDifficult(totalPage);
        }
    }
    // 当无省略号时
    builderPageSame(num) {
        let { totalPage, page } = this.state;
        let ListTemp = [];
        for (let i = 0; i < num; i++) {
            ListTemp.push(0);
        }
        return <div>
            <div onClick={page != 1 ? () => { this.handleChangePageByWay(true) } : () => { }} className='lastPage'>{page == 1 ? '' : '上一页'}</div>
            {ListTemp.map((item, index) => {
                return <div key={index} onClick={page != index + 1 ? () => { this.handleChangePageByIndex(index + 1) } : () => { }} className={page == index + 1 ? 'indexPageNum' : 'canClickPageNum'}>{index + 1}</div>
            })}
            <div onClick={page != num ? () => { this.handleChangePageByWay(false) } : () => { }} className='nextPage'>{page == num ? '' : '下一页'}</div>
        </div>
    }
    // 当有省略号时
    builderPageDifficult(num) {
        let { totalPage, page } = this.state;
        // 左右侧的省略号是否显示
        let leftAbbreviation = (page > 4);
        let rightAbbreviation = (totalPage - page + 1 > 4);
        let leftListTemp = [];
        let rightListTemp = [];
        // 希望左右侧数字长度为2以下
        let leftListLength = page - 1 - 1 > 2 ? 2 : page - 1 - 1;
        for (let i = 0; i < leftListLength; i++) {
            leftListTemp.push(page - (i + 1));
        }
        leftListTemp.reverse();
        let rightListLength = num - page - 1 > 2 ? 2 : num - page - 1;
        for (let i = 0; i < rightListLength; i++) {
            rightListTemp.push(page + i + 1);
        }
        return <div>
            <div onClick={page != 1 ? () => { this.handleChangePageByWay(true) } : () => { }} className='lastPage'>{page == 1 ? '' : '上一页'}</div>
            <div onClick={page != 1 ? () => { this.handleChangePageByIndex(1) } : () => { }} className={page == 1 ? 'indexPageNum' : 'canClickPageNum'}>1</div>
            <div style={{ display: leftAbbreviation ? 'block' : 'none' }}>...</div>
            {leftListTemp.map((item, index) => {
                return <div key={index} onClick={page != item ? () => { this.handleChangePageByIndex(item) } : () => { }} className={page == item ? 'indexPageNum' : 'canClickPageNum'}>{item}</div>
            })}
            <div style={{ display: (page != 1 && page != num) ? 'block' : 'none' }} className="indexPageNum">{page}</div>
            {rightListTemp.map((item, index) => {
                return <div key={index} onClick={page != item ? () => { this.handleChangePageByIndex(item) } : () => { }} className={page == item ? 'indexPageNum' : 'canClickPageNum'}>{item}</div>
            })}
            <div style={{ display: rightAbbreviation ? 'block' : 'none' }}>...</div>
            <div onClick={page != num ? () => { this.handleChangePageByIndex(num) } : () => { }} className={page == num ? 'indexPageNum' : 'canClickPageNum'}>{num}</div>
            <div onClick={page != num ? () => { this.handleChangePageByWay(false) } : () => { }} className='nextPage'>{page == num ? '' : '下一页'}</div>
        </div>
    }
    // 通过页码换页
    handleChangePageByIndex(page) {
        let { activePage } = this.state;
        // 通过页码换页 和 通过上下页换页 应该走同一个reducer
        const action = changePage({ page, group: activePage });
        store.dispatch(action);
    }
    // 通过上下页换页
    handleChangePageByWay(flag) {
        let { totalPage, page, activePage } = this.state;
        // flag 代表是否向上一页
        if (flag && page > 0) {
            page--
        }
        if (!flag && page < totalPage) {
            page++;
        }
        const action = changePage({ page, group: activePage });
        store.dispatch(action);
    }
    // 查看文章详情
    handleWatchDetails(item, e) {
        // 这个地方要注意页码显隐
        const action = watchDetails(item);
        store.dispatch(action);
        this.props.history.push('/details');
    }
    // 跳转group
    handleChangeGroup(index, e) {
        const action = changeGroupWithType(index);
        store.dispatch(action);
        const action1 = leftNaviChange();
        store.dispatch(action1);
        this.props.history.push('/');
    }
    // 左侧列表拉伸，该列表只有当窗口较小时出现
    handleChangeLeft() {
        const action = leftNaviChange();
        store.dispatch(action);
    }
    // 窗口大小变动时执行的函数
    funOfWindowResize() {
        if (W > window.innerWidth || H > window.innerHeight) {
            if (window.innerWidth < 700 && this.state.isShowNavication == false) {
                this.handleChangeLeft();
            }
        }
        W = window.innerWidth
        H = window.innerHeight
        // 使得selected一直在与icon相贴的地方
        let pageHead = document.getElementsByClassName('pageHead')[0];
        let selectedArea = document.getElementsByClassName('selectedArea')[0];
        let pageHeadMarginRight = parseInt(window.getComputedStyle(pageHead, null).marginRight.split("px")[0]);
        selectedArea.style.right = `${pageHeadMarginRight + 5}px`;
        // 让右侧浮动栏始终在中间
        let pageRightFloat = document.getElementsByClassName('pageRightFloat')[0];
        let pageRightFloatHeight = parseInt(window.getComputedStyle(pageRightFloat, null).height.split("px")[0]);
        pageRightFloat.style.top = `${(H / 2) - (pageRightFloatHeight / 2)}px`;
    }
    // 跳转至博客园
    handleToBoKeYuan() {
        window.location.href = myBoKeYuanLink;
    }
}

export default MyBlog;