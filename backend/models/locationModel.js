const { LocationModel } = require('./schemaLoader');

const createNewLocation = async (data) => {
    try {
        const location = await LocationModel.create(data);
        return await location.save();
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getLastLocation = async (userId) => {
    try {
        return await Location.findOne({ userId}).sort({ timestamp: -1 });
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

const getLastNLocationOfUser = async (userId, count=10) => {
    try{
        return await LocationModel.find({ userId})
        .sort({createdAt: -1})
        .limit(count);
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

const getLatestLocationAllUsers = async () => {
    try {
        return await LocationModel.find.sort({ timestamp: -1 });
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    createNewLocation,
    getLastLocation,
    getLastNLocationOfUser,
    getLatestLocationAllUsers
}