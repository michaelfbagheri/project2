module.exports = function(sequelize, DataTypes) {
  var HostItems = sequelize.define("HostItems", {
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

  HostItems.associate = function (models) {
    // Associating HostItems with Party
    // When an HostItems is deleted, also delete any associated Party
    HostItems.hasOne(models.Party, {
      onDelete: "cascade"
    });
  };

  
  return HostItems;
};