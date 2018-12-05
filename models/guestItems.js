module.exports = function (sequelize, DataTypes) {
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
  
    GuestItems.associate = function (models) {
        // Associating GuestItems with User
        // When an GuestItems is deleted, also delete any associated User
        Event.hasOne(models.User, {
          onDelete: "cascade"
        });
      };

    GuestItems.associate = function (models) {
      // Associating GuestItems with Party
      // When an GuestItems is deleted, also delete any associated Party
      Event.hasOne(models.Party, {
        onDelete: "cascade"
      });
    };
  
  
    return GuestItems;
  };