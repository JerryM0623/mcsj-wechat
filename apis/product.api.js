const { BaseUrl }  = require('../config/request.config');

const productApis = {
    getInfomation: BaseUrl + '/product/get'
}

module.exports = productApis;