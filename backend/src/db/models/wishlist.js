"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      Wishlist.belongsTo(models.User, { foreignKey: "userId", as: "user" });

      Wishlist.belongsTo(models.Listing, { foreignKey: "listingId", as: "listing" });
    }
  }

  Wishlist.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      listingId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Wishlist",
      tableName: "Wishlists",
      updatedAt: false,
    }
  );

  return Wishlist;
};