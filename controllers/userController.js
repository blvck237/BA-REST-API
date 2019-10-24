const User = require('../models/User');

exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logout = (req, res) => {
  const data = req.body;
  try {
    return res.status(200).json({ data });
  } catch (error) {
    console.log('Error::userController::logout', error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
