const { mockBaseUrl, developBaseUrl } = require('../config/request.config');

const indexApis = {
    getSwiperListMock: mockBaseUrl + '/index/carousel',
    getSwiperListDev: developBaseUrl + '/index/swiperList',

    getRecommendListMock: mockBaseUrl + '/index/recommend',
    getRecommendListDev: developBaseUrl + '/index/recommendList'
}

module.exports = indexApis;