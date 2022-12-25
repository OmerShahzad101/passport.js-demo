exports.add = async (req, res, next) => {
    try {

      console.log("req.body",  req.body)
      let payload = req.body;
      console.log("file", req);

      return res.send({
        success: true,
        payload,
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
};


exports.list = async (req, res, next) => {
    try {
      console.log("token", req.token);

      return res.send({
        success: true,
        message: "list fetched successfully",
      });
    } catch (error) {
      next(error);
    }
};

exports.err = async (req, res, next) => {
  try {
      console.log("error");
      let error = new Error(`processing error in request at ${req.url}`)
      error.statusCode = 400
      throw error
  } catch (error) {
    next(error);
  }
};
