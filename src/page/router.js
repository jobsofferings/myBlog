import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Head from './head'

const MyRouter = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={Head} />
        </Router>
    </Provider>
)

export default MyRouter