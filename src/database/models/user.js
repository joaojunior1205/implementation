const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    picture: {
      type: "varchar",
      nullable: true,
    },
    login: {
      type: "varchar",
      length: 100,
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      length: 100,
      nullable: false,
      select: false,
    },
    userMasterId: {
      name: "user_master_id",
      type: "int",
      nullable: false
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    lastAccessAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
  },
  relations: {
    userMaster: {
      type: "many-to-one",
      target: "UserMaster",
      joinColumn: {
        name: "user_master_id",
      },
      nullable: false,
    },
    tokens: {
      type: "one-to-many", // Um User pode ter vários Tokens
      target: "Token", // Entidade relacionada
      inverseSide: "user", // Nome do campo no Token que faz a referência
      cascade: true, // Opcional, para salvar tokens junto com o User
    },
  },
});
