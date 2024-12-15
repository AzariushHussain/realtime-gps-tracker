const { UserModel } = require('./schemaLoader');

const createUser =  async (data) => {
    try {
        const user = await UserModel.create(data);
        return await user.save();
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getUserByUsername = async (username) => {
    try{
        return await UserModel.findOne({ username });
    }
    catch (error) {
        console.log(error);
        return null
    }
}

const getUserById = async (userId) => {
    try {
        return await UserModel.findOne({ userId });
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

const getAllUsers = async () => {
    try {
        return await UserModel.find();
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

const toggleTracking = async (userId) => {
    try {
        const user = await UserModel.findAndUpdate({ userId }, { $set: { isTracking: !user.isTracking } });
        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    createUser,
    getUserById, 
    getAllUsers,
    getUserByUsername,
    toggleTracking
};