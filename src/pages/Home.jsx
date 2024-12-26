import { useState } from "react"
import MovieCard from "../components/MovieCard"
import React from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
import { useEffect } from "react";

function Home(){

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const PopularMovies = await getPopularMovies()
                setMovies(PopularMovies)
            }catch (err) {
                console.log(err)
                setError("failed to load movies....")
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])


    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return
    
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
      };
    

    return <div className="home">

        <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="search for movies" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-button">Search</button>


        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? <div className="loading">Loading...</div> : (
        <div className="movies-grid">
            {movies.map((movie) => 
            
               (
                 <MovieCard movie={movie} key={movie.id}/>
                ) 
                )}
                
        </div>
        )

        }
        {/* <div className="movie-grid">
            {movies.map((movie) => 
            
                movie.title.toLowerCase().startsWith(searchQuery) && (
                 <MovieCard movie={movie} key={movie.id}/>
                ) 
                )}
                
        </div> */}
    </div>
}



export default Home;







// import { useState } from "react"
// import MovieCard from "../components/MovieCard"
// import React from "react";
// import "../css/Home.css";

// function Home(){

//     const [searchQuery, setSearchQuery] = useState("");

//     const movies = [
//         {id:1, title:"john wick", release_date:"2024"},
//         {id:2, title:"Venom", release_date:"2024"},
//         {id:3, title:"Terminator", release_date:"2024"},

//     ]

//     const handleSearch = (e) =>{
//         // to prevent default beaviour from reloading
//         e.preventDefault();
//         alert(searchQuery);
//         setSearchQuery();
//     }

//     return <div className="home">

//         <form onSubmit={handleSearch} className="search-form">
//             <input type="text" placeholder="search for movies" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
//             <button type="submit" className="search-button">Search</button>


//         </form>

//         <div className="movie-grid">
//             {movies.map((movie) => 
            
//                (
//                  <MovieCard movie={movie} key={movie.id}/>
//                 ) 
//                 )}
                
//         </div>
//         {/* <div className="movie-grid">
//             {movies.map((movie) => 
            
//                 movie.title.toLowerCase().startsWith(searchQuery) && (
//                  <MovieCard movie={movie} key={movie.id}/>
//                 ) 
//                 )}
                
//         </div> */}
//     </div>
// }



// export default Home;