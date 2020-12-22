const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================
router.post("/favoriteNumber", (req, res) => {
  //mongoDB에서 favorite숫자를 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) {
      return res.status(400).send(err);
    }
    //그다음에 프론트로 다시 숫자정보뿌리기
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

//내가 이 영화를 favorite리스트안에 넣었는지의 정보를 DB에서 가져오기
router.post("/favorited", (req, res) => {
  //mongoDB에서 favorite숫자를 가져오기
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) {
      return res.status(400).send(err);
    }
    //그다음에 프론트로 다시 숫자정보뿌리기
    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
});

//favorite리스트안에서 삭제
router.post("/removeFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

//favorite리스트안에 넣기
router.post("/addFavorite", (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

//프론트에 좋아요 누른 영화목록 가져오기
router.post("/getFavoritedMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

//프론트에 좋아요 누른 영화목록 가져오기
router.post("/removeMovieButton", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});
module.exports = router;
