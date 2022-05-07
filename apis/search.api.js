const { BaseUrl } = require('../config/request.config');

const searchApis = {
    search: BaseUrl + '/search/search',
}

module.exports = searchApis;