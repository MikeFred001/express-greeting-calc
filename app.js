/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function(req, res) {
  console.log("query>>>>>", req.query.nums);

  if (!req.query.nums) {
    throw new BadRequestError("nums are required");
  }

  let numsArr = req.query.nums.split(',');
  console.log(numsArr);
  let total = numsArr.map(Number).reduce((curr, next) => curr + next);
  console.log(total);

  return res.json({operation: 'mean', mean: total / numsArr.length});
})


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median/:nums", function(req, res) {
  let nums = req.params.nums.split(',');
  console.log(nums);
  let total = nums.map(Number).reduce((curr, next) => curr + next);
  console.log(total);

  return res.send({mean: total / nums.length});
})

/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;