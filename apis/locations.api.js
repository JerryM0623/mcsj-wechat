const { BaseUrl } = require('../config/request.config');

const locationsApis = {
    getLocationsById: BaseUrl + '/location/get',
    addNewLocation: BaseUrl + '/location/add'
}

module.exports = locationsApis;