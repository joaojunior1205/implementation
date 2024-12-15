const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Token",
  tableName: "tokens",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    active: {
      type: "boolean",
      default: true,
      nullable: false,
    },
    token: {
      type: "varchar",
      length: 250,
      nullable: false,
    },
    type: {
      type: "int",
      nullable: false,
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
    revokedAt: {
      type: "timestamp",
      nullable: true,
    },
    expiresAt: {
      type: "timestamp",
      nullable: true,
    },
    userId: {
      name: "user_id",
      type: "integer",
      nullable: false,
    }
  },
  relations: {
    user: {
      type: "many-to-one", // Cada Token pertence a apenas um User
      target: "User", // Entidade relacionada
      joinColumn: {
        name: "user_id", // Nome da coluna de junção no banco de dados
      },
      nullable: false, // Não permite Tokens sem um User associado
    },
  },
});
