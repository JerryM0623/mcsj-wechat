const { BaseUrl } = require('../config/request.config');

const orderApis = {
    createOrder: BaseUrl + '/order/create',
    changeOrderStatusToPaid: BaseUrl + '/order/paid'
}

module.exports = orderApis