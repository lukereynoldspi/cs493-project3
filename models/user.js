const { DataTypes } = require('sequelize')

const sequelize = require('../lib/sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true,primaryKey: true, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false },
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    admin: {type: DataTypes.STRING, allowNull: false}
})

exports.User = User
exports.UserClientFields = [
    'id',
    'username',
    'email',
    'password',
    'admin'
]