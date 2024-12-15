const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "UserMaster",
  tableName: "user_master",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
  },
  relations: {
    users: {
      type: "one-to-many", // Um UserMaster pode ter vários Users
      target: "User", // Entidade relacionada
      inverseSide: "userMaster", // Nome do campo em User que faz a referência
      cascade: true, // Opcional, se quiser salvar usuários junto com o UserMaster
    },
  },
});
