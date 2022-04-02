"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dictionary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dictionary.init({
    trieJSON: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: { notNull: { msg: "trieJSON cannot be empty" } }
    }
  }, {
    sequelize,
    tableName: "dictionary",
    modelName: "Dictionary",
    timestamps: false
  });
  return Dictionary;
};