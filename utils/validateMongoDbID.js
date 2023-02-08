const { ObjectID } = require("mongodb");

const validateId = (id) => {
  const isValid = ObjectID.isValid(id);
  if (!isValid) throw new Error("This is invalid id or not found");
};

module.exports = { validateId };
