import React, { Component } from 'react'
import store from '../store'
import { } from '../store/actionCreators'


class MyBlog extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        store.subscribe(this.storeChange.bind(this));
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div>five</div>
        )
    }
    storeChange() {
        this.setState(store.getState())
    }
}

export default MyBlog