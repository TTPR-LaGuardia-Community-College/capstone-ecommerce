'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false }
  }, { timestamps: false });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User,    { foreignKey: 'userId' });
    Cart.belongsTo(models.Listing, { foreignKey: 'productId', as: 'listing' });
  };

  return Cart;
};
