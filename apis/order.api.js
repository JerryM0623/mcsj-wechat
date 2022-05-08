const { BaseUrl } = require('../config/request.config');

const orderApis = {
    createOrder: BaseUrl + '/order/create',
    changeOrderStatusToPaid: BaseUrl + '/order/paid',
    getOrderList: BaseUrl + '/order/list',
    getOrderDetailInfo: BaseUrl + '/order/detail',
}


module.exports = orderApis