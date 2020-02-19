import React, { Component } from 'react'
import HeadBody from '../page/HeadBody'
import OpenUpManag from '../page/Table/OpenUpManag'
import AddEdgService from '../page/Table/AddEdgService'
import CheckoutService from '../page/Table/CheckoutService'
import ServicePerson from '../page/Table/ServicePerson'
import FindExpense from '../page/SelectEdg/FindExpense'
import FindEdg from '../page/SelectEdg/FindEdg'
import CourseEdgManag from '../page/TypesEdg/CourseEdgManag'
import TypesEdgManag from '../page/TypesEdg/TypesEdgManag'
import TableFind from '../page/Find/TableFind'
import ExpenseFind from '../page/Find/ExpenseFind'
import MenuFind from '../page/Find/MenuFind'
import InfoManag from '../page/Workers/InfoManag'
import ServiceArea from '../page/Workers/ServiceArea'
import SetPassword from '../page/System/SetPassword'
import PowerManag from '../page/System/PowerManag'
import SystemReset from '../page/System/SystemReset'
import SystemBackUp from '../page/System/SystemBackUp'

const PageRouterControl = (id, state, routerFunctionToProps) => {
    switch (id) {
        case 0:
            return <HeadBody state={state} func={routerFunctionToProps.HeadBody} publicFunc={routerFunctionToProps.publicFunc}/>
        case '1':
            return <OpenUpManag state={state} func={routerFunctionToProps.OpenUpManag}/>
        case '2':
            return < AddEdgService state={state} />
        case '3':
            return < CheckoutService state={state} />
        case '4':
            return < ServicePerson state={state} />
        case '5':
            return < FindExpense state={state} />
        case '6':
            return < FindEdg state={state} />
        case '7':
            return < CourseEdgManag state={state} />
        case '8':
            return < TypesEdgManag state={state} />
        case '9':
            return < TableFind state={state} />
        case '10':
            return < ExpenseFind state={state} />
        case '11':
            return < MenuFind state={state} />
        case '12':
            return < InfoManag state={state} />
        case '13':
            return < ServiceArea state={state} />
        case '14':
            return < SetPassword state={state} />
        case '15':
            return < PowerManag state={state} />
        case '16':
            return < SystemReset state={state} />
        case '17':
            return < SystemBackUp state={state} />
    }
};

export default PageRouterControl