const { Repository } = require("typeorm");
const AppDataSource = require("../database/index");
const User = require("../database/models/user");

class UserRepository extends Repository {
}

module.exports = AppDataSource.getRepository(User).extend(UserRepository.prototype);