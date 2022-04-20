const { BaseUrl } = require('../config/request.config');

const indexApis = {
    getSwiperList: BaseUrl + '/index/swiperList',
    getRecommendList: BaseUrl + '/index/recommendList'
}

module.exports = indexApis;