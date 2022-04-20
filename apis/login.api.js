const { BaseUrl } = require('../config/request.config');

const loginApis = {
    login: BaseUrl + '/login/login'
}

module.exports = loginApis;