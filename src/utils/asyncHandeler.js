const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
    Promise.resolve().catch((err) => next(err));
  };
};

export { asyncHandler };


