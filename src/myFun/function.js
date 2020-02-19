export const NumAutoPlusAnimation = (ref, finalNum, unit) => {
    ref.innerHTML = finalNum + unit;
    let time = 500 //总时间--毫秒为单位
    let regulator = 30 //调速器，改变regulator的数值可以调节数字改变的速度
    let step = finalNum / (time / regulator);   /*每50ms增加的数值--*/
    let count = 0 //计数器
    let initial = 0;
    let timer = setInterval(function () {
        count += step;
        if (count >= finalNum) {
            clearInterval(timer);
            count = finalNum;
        }
        let t = Math.floor(count);
        if (t == initial) {
            clearInterval(timer);
            return
        };
        initial = t;
        ref.innerHTML = initial + unit;
    }, regulator);
};
// 判断两对象是否相同
export const isObjectValueEqual = (a, b) => {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        let propName = aProps[i]
        let propA = a[propName]
        let propB = b[propName]
        if ((typeof (propA) === 'object')) {
            if (!isObjectValueEqual(propA, propB)) {
                return false
            }
        }
        else if (propA !== propB) {
            return false
        }
    }
    return true
}