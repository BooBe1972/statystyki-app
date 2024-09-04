'use strict';
module.exports = (sequelize, DataTypes) => {
  const PriceChange = sequelize.define(
    "PriceChange",
    {
      property_id: DataTypes.INTEGER,
      old_price: DataTypes.DECIMAL,
      new_price: DataTypes.DECIMAL,
      change_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {}
  );

  PriceChange.associate = function (models) {
    // associations can be defined here
    PriceChange.belongsTo(models.Property, { foreignKey: "property_id" });
  };

  return PriceChange;
};
