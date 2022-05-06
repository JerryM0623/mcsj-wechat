const { BaseUrl } = require('../config/request.config');

const locationsApis = {
    getLocationsById: BaseUrl + '/location/get',
    addNewLocation: BaseUrl + '/location/add',
    getLocationByLocationId: BaseUrl + '/location/one',
    editLocationByLocationId: BaseUrl + '/location/edit',
    deleteLocationByLocationId: BaseUrl + '/location/delete'
}

module.exports = locationsApis;