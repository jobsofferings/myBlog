import React, { Component } from 'react'
import { Alert } from 'antd';
import '../page/css/Alert.css'
class AlertControl extends Component {
    constructor(props) {
        super(props);
    }
    // 关闭alert的回调函数
    onClose(event) {
        this.props.onChangeAlert();
    };
    render() {
        const { showAlertContent, alertType } = this.props.theAlert;
        let message;
        switch (alertType) {
            case 'error':
                message = '错误';
                break;
            case 'success':
                message = '成功';
                break;
            case 'warning':
                message = '警告';
                break;
        }
        return (
            <Alert
                message={message}
                description={showAlertContent}
                type={alertType}
                closable
                onClose={this.onClose.bind(this)} />
        )
    }
}

export default AlertControl