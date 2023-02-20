const { ObjectID } = require("mongodb");

const validateMongoDbId = (id) => {
  const isValid = ObjectID.isValid(id);
  if (!isValid) throw new Error("This is invalid id or not found");
};

module.exports =  validateMongoDbId ;
