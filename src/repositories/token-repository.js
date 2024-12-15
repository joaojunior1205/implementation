const { Repository } = require("typeorm");
const AppDataSource = require("../database/index");
const Token = require("../database/models/token");

class TokenRepository extends Repository { 
}

module.exports = AppDataSource.getRepository(Token).extend(TokenRepository.prototype);