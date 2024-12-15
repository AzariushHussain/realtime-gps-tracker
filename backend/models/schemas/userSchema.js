// const { Sequelize, DataTypes } = require('sequelize');;
const mongoose = require('mongoose');
const { ENUM } = require('sequelize');

// const userSchema = {
//     id: { type: DataTypes.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
//     username: { type: DataTypes.STRING, unique: true, allowNull: false },
//     password: { type: DataTypes.STRING, allowNull: false },
//     role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
//     isTracking: { type: DataTypes.BOOLEAN, defaultValue: true },
// }
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum:['admin', 'user'], default: 'user', required: true },
});

module.exports = {userSchema}