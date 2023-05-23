const { DataTypes } = require('sequelize')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sequelize = require('../lib/sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true,primaryKey: true, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false },
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false, set(value) {
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(value, salt)
        this.setDataValue('password', hash);
      }},
    admin: {type: DataTypes.BOOLEAN, defaultValue: false}
})

exports.User = User
exports.UserClientFields = [
    'id',
    'username',
    'email',
    'password',
    'admin'
]