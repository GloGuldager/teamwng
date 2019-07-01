const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Reviews collection and inserts the reviews below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/featurereview"
), { useNewUrlParser: true };

const reviewSeed = [
{"reviewerID": "A2IBPI20UZIR0U", "asin": "1384719342", "reviewerName": "cassandra tu \"Yeah, well, that's just like, u...", "helpful": [0, 0], "reviewText": "Not much to write about here, but it does exactly what it's supposed to. filters out the pop sounds. now my recordings are much more crisp. it is one of the lowest prices pop filters on amazon so might as well buy it, they honestly work the same despite their pricing,", "overall": 5.0, "summary": "good", "unixReviewTime": 1393545600, "reviewTime": "02 28, 2014"},
{"reviewerID": "A14VAT5EAX3D9S", "asin": "1384719342", "reviewerName": "Jake", "helpful": [13, 14], "reviewText": "The product does exactly as it should and is quite affordable.I did not realized it was double screened until it arrived, so it was even better than I had expected.As an added bonus, one of the screens carries a small hint of the smell of an old grape candy I used to buy, so for reminiscent's sake, I cannot stop putting the pop filter next to my nose and smelling it after recording. :DIf you needed a pop filter, this will work just as well as the expensive ones, and it may even come with a pleasing aroma like mine did!Buy this product! :]", "overall": 5.0, "summary": "Jake", "unixReviewTime": 1363392000, "reviewTime": "03 16, 2013"},

];

db.Review
  .remove({})
  .then(() => db.Review.collection.insertMany(reviewSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
