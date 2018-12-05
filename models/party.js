module.exports = function (sequelize, DataTypes) {
  var Party = sequelize.define("Party", {
    // Giving the Author model a name of type STRING
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eventAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eventDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eventTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Party.associate = function (models) {
    // Associating party with User
    // When an Party is deleted, also delete any associated User
    Event.hasOne(models.User, {
      onDelete: "cascade"
    });
  };


  return Party;
};