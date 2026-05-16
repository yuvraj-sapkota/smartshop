const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return next(new AppError(result.error.errors[0].message, 400));
  }
  req.body = result.data;
  next();
};

export default validate;
