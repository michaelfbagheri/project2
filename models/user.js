module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the Author model a name of type STRING
      name:{ 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      email: {         
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
      AuthenticationId: {         
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
    }
    });

    User.associate = function(models) {
      // Associating User with guestItems
      // When an User is deleted, also delete any associated party
      User.hasMany(models.GuestItems, {
        onDelete: "cascade"
      });
    };
  
    User.associate = function(models) {
        // Associating User with party
        // When an User is deleted, also delete any associated party
        User.hasMany(models.Party, {
          onDelete: "cascade"
        });
      };

    return User;
  };
  