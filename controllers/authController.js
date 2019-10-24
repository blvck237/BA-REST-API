exports.signin = (req, res) => {
  const data = req.body;
  try {
    return res.status(200).json({ data });
  } catch (error) {
    console.log('Error::authController::signin', error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

exports.signout = (req, res) => {
  const data = req.body;
  try {
    return res.status(200).json({ data });
  } catch (error) {
    console.log('Error::authController::signin', error);
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
