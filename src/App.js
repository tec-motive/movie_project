import React, { useEffect, useState } from 'react';
import Movie from "./components/Movie";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=311cac09443e5649e1e367326d252e77&page=1"

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=311cac09443e5649e1e367326d252e77&query="


function App() {
  const [ movies, setMovies ] = useState([]);
  const [searchTerm, setSearchTerm ] = useState('');
  
  useEffect(() => {
    getMovie(FEATURED_API);
  }, [])

  const getMovie = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
    getMovie(SEARCH_API + searchTerm);
  
    setSearchTerm('');
   }
  };

    


  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }; 

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input 
          className="search" 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) =>
          <Movie key={movie.id} {...movie} />
        )}
      </div>
    </>
  );
}

  export default App;
