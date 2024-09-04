'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      property_type: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {}
  );

  Property.associate = function (models) {
    // associations can be defined here
    Property.hasMany(models.PriceChange, { foreignKey: "property_id" });
  };

  return Property;
};
