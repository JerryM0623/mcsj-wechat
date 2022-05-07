const { BaseUrl } = require('../config/request.config');
const categoryApis = {
    getSeries: BaseUrl + '/category/series',
    getTypes: BaseUrl + '/category/types',
    getSeriesTypeProductInfo: BaseUrl + '/category/series-type'

}
module.exports = categoryApis;