module.exports = function(sequelize, DataTypes) {
  var GuestItems = sequelize.define("GuestItems", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    itemQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  GuestItems.associate = function(models) {
    Event.hasOne(models.User, {
      onDelete: "cascade"
    });
  };

  GuestItems.associate = function(models) {
    GuestItems.hasOne(models.Party, {
      onDelete: "cascade"
    });
  };

  return GuestItems;
};
