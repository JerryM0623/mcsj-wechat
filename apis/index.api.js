const { mockBaseUrl } = require('../config/request.config');

const indexApis = {
    getSwiperList: mockBaseUrl + '/index/carousel',
    getRecommendList: mockBaseUrl + '/index/recommend'
}

module.exports = indexApis;