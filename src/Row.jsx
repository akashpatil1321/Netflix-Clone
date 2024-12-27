import React from 'react'
import react ,{useState,useEffect} from 'react'
import axiosinstance from './axiosconfig';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const imgBaseUrl = "https://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl,isLargeRow}) {
    const [movies , setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl]=useState("");

    useEffect(()=>{
        async function fetchData(){
          try{
            const request = await axiosinstance.get(fetchUrl);
            // console.log(request);
            //  console.log(request.data.results);
            setMovies(request.data.results);
           
            return request;
            
          }
          catch(error){
            console.log(error);
          }
        }
        fetchData();

    },[fetchUrl]);
// console.table(movies);
const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
const handleClick = async(movie)=>{
  if (trailerUrl) {
    setTrailerUrl("");
  } else {
    try {
      const movietype = (movie) => {
        return movie.title ? "movie" : "tv"; // Corrected to properly check for movie vs tv
      };
    const content_type=movietype(movie);
    // console.log(content_type);
      
      const response = await axiosinstance.get(
        `/${content_type}/${movie.id}/videos?api_key=993f299a5fb9b7cd2c18343292c74eda`
      );
      const trailer = response.data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerUrl(trailer.key);
      } else {
        console.warn("No trailer found for:", movie.name || movie.title);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  }

 };


  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_poster">
        {movies.map(movie =>(
          <img
          onClick={() => handleClick(movie)}
          key={movie.id}
          className={`row_posters ${isLargeRow && "row_posterLarge"}`}
           src={`${imgBaseUrl}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.title} />
        ))}
      </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
};

export default Row;
