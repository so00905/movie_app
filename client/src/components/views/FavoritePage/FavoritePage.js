import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./Favorite.css";
import { Popover } from "antd";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  useEffect(() => {
    fetchFavoriteMovie();
  }, []);

  const fetchFavoriteMovie = () => {
    Axios.post("api/favorite/getFavoritedMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        console.log("영화정보가져오기==>>" + response.data);
        setFavorites(response.data.favorites);
      } else {
        alert("영화정보가져오기실패");
      }
    });
  };

  const removeMovieButton = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    Axios.post("/api/favorite/removeMovieButton", variables).then(
      (response) => {
        if (response.data.success) {
          fetchFavoriteMovie();
        } else {
          alert("favorite리스트에서 삭제실패");
        }
      }
    );
  };
  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          "이미지없음"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>
        <td>
          <button
            onClick={() =>
              removeMovieButton(favorite.movieId, favorite.userFrom)
            }
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
