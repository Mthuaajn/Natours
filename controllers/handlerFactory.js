const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const Obj = await Model.findByIdAndDelete(req.params.id);
    if (!Obj) {
      return next(new AppError('no object that found id ', 404));
    }
    res.status(204).json({
      status: 'success',
      message: 'delete success',
    });
  });
