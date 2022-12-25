exports.home = async (req, res, next) => {
    try {

      return res.send({
        success: true,
        message: "Home fetched successfully",
      });
    } catch (error) {
      next(error);
    }
};


exports.about = async (req, res, next) => {
    try {

      return res.send({
        success: true,
        message: "About fetched successfully",
      });
    } catch (error) {
      next(error);
    }
};