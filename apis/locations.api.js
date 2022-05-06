const { BaseUrl } = require('../config/request.config');

const locationsApis = {
    getLocationsById: BaseUrl + '/location/get',
    addNewLocation: BaseUrl + '/location/add',
    getLocationByLocationId: BaseUrl + '/location/one',
    editLocationByLocationId: BaseUrl + '/location/edit'
}

module.exports = locationsApis;