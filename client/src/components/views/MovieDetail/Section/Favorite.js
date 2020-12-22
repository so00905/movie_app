import Axios from "axios";
import React, { useEffect, useState } from "react";
import MovieInfo from "./MovieInfo";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.MovieInfo.title;
  const moviePost = props.MovieInfo.backdrop_path;
  const movieRunTime = props.MovieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };

  //dom이 켜지면 어떤 액션을 실행할 것인지 적는 구간
  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      setFavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
        console.log("favoriteNumber==>>" + response.data);
      } else {
        alert("favorite 숫자정보를 가져오는데 실패했습니다.");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        console.log("favorited==>>" + response.data);
        setFavorited(response.data.favorited);
      } else {
        alert("정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post("/api/favorite/removeFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("favorite 리스트에서 삭제실패");
        }
      });
    } else {
      Axios.post("/api/favorite/addFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("favorite 리스트에서 추가실패");
        }
      });
    }
  };
  return (
    <div>
      <button onClick={onClickFavorite}>
        {Favorited ? "Not Favirite" : "Add to Favorite"}
        {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
