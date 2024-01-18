const asyncHandler = () => {
  (req, res, next) => {
    Promise.resolve().catch((err) => next(err));
  };
};

export { asyncHandler };

