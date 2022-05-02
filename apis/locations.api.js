const { BaseUrl } = require('../config/request.config');

const locationsApis = {
    getLocationsById: BaseUrl + '/location/get'
}

module.exports = locationsApis;