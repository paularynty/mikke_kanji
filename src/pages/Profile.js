import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Profile = () => {
  const { userId } = useParams();
  const [favoriteKanji, setfavoriteKanji] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState("");
  const [decodedToken, setDecodedToken] = useState({});

  useEffect(() => {
    if (!userId) {
      setError("User ID is not defined.");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/likes/user/${encodeURIComponent(userId)}`
        );
        const likes = response.data;

        const favoriteKanji = await Promise.all(
          likes.map(async (p) => {
            try {
              const res = await axios.get(
                `http://localhost:5001/kanji/${p.kanji_id}`
              );
              return { ...p, kanjiData: res.data };
            } catch (error) {
              console.log("Error fetching kanji data:", error);
              return { ...p, kanjiData: "Unknown" };
            }
          })
        );

        setfavoriteKanji(favoriteKanji);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [userId]);

  useEffect(() => {
	const token = localStorage.getItem("auth_token");
	if (token) {
	  if (token.split(".").length === 3) {
		setAuthToken(token);
		const decodedToken = jwtDecode(token);
		setDecodedToken(decodedToken);
		console.log(decodedToken);
	  } else {
		console.error("Invalid token format:", token);
	  }
	} else {
	  console.error("Token is null or missing");
	}
  }, []);

  const unLikeKanji = async (kanjiId, userId) => {
	if (!userId) return; // Ensure userId is valid
  
	const likesResponse = await axios.get(`http://localhost:5001/likes/user/${userId}`);
	const userFavorites = likesResponse.data;
	const likeToDelete = userFavorites.find(like => like.kanji_id === kanjiId);
	
	if (likeToDelete) {
	  try {
		await axios.delete(`http://localhost:5001/likes/delete/${likeToDelete.id}`, {
		  headers: {
			'Authorization': `Bearer ${authToken}`
		  },
		});
  
		const newfavoriteKanji = favoriteKanji.filter((p) => p.kanjiData.id !== kanjiId);
		setfavoriteKanji(newfavoriteKanji);
	  } catch (err) {
		console.error("Failed to delete like:", err);
	  }
	}
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="container text-center" style={{ paddingBottom: "80px" }}>
      <h1>Liked Kanji</h1>
      {favoriteKanji.length === 0 ? (
        <p>Nothing liked yet.</p>
      ) : (
        <ul className="d-flex flex-wrap ">
          {favoriteKanji.map(
            (p) =>
              p.kanjiData !== "Unknown" && (
                <li className="list-group-item p-3">
                  <div className="container vstack border border-secondary rounded">
                    <h3
                      className="text text-capitalize my-3"
                      style={{ height: "2em", width: "8em" }}
                    >
                      {p.kanjiData.name}
                    </h3>
                    <Link
                      className="text text-capitalize"
                      to={`/kanji/${p.kanjiData.name}`}
                    >
                      <img
                        src={
                          p.kanjiData.sprites.other["official-artwork"]
                            .front_default
                        }
                        alt={`${p.kanjiData.name}`}
                        width={200}
                        height={200}
                      />
                    </Link>
                    {decodedToken?.id &&
                      Number(decodedToken.id) === Number(userId) && (
                        <button
                          className="btn btn-outline-danger btn-sm mb-3 mt-3"
                          onClick={() => unLikeKanji(p.kanjiData.id, userId)}
                        >
                          Unlike
                        </button>
                      )}
                  </div>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default Profile;
