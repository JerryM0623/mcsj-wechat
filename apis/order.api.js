const { BaseUrl } = require('../config/request.config');

const orderApis = {
    createOrder: BaseUrl + '/order/create',
    changeOrderStatusToPaid: BaseUrl + '/order/paid',
    getOrderList: BaseUrl + '/order/list'
}

module.exports = orderApis