const { Repository } = require("typeorm");
const AppDataSource = require("../database/index");
const UserMaster = require("../database/models/user-master");

class UserRepository extends Repository {
}

module.exports = AppDataSource.getRepository(UserMaster).extend(UserRepository.prototype);