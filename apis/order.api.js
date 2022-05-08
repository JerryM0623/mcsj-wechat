const { BaseUrl } = require('../config/request.config');

const orderApis = {
    createOrder: BaseUrl + '/order/create',
    changeOrderStatusToPaid: BaseUrl + '/order/paid',
    getOrderList: BaseUrl + '/order/list',
    getOrderDetailInfo: BaseUrl + '/order/detail',
    changeOrderStatusToReceive: BaseUrl + '/order/receive',
    changeOrderStatusToRequestRefund: BaseUrl + '/order/refund',
    deleteOrder: BaseUrl + '/order/delete',
    getRefundOrderList: BaseUrl + '/order/refund-order-list',
}

module.exports = orderApis