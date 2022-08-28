import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';


function App() {
  const [name, setNewName] = useState('')
  const [genre, setNewGenre] = useState('')
  const [image, setNewImage] = useState('')
  const [year, setNewYear] = useState()
  const [rating, setNewRating] = useState()
  const [movie, setNewMovie] = useState([])

//___________________________________________________________________

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const genreChange = (event) => {
    setNewGenre(event.target.value)
  }

  const imageChange = (event) => {
    setNewImage(event.target.value)
  }

  const yearChange = (event) => {
    setNewYear(event.target.value)
  }

  const ratingChange = (event) => {
    setNewRating(event.target.value)
  }

//___________________________________________________________________

const handleDelete = (movieDelete) => {
  axios.delete(`http://localhost:3000/movies/${movieDelete._id}`).then(() => {
    axios.get("http://localhost:3000/movies").then((response) => {
      setNewMovie(response.data);
    });
  });
};

const newMovieSubmit = (event) => {
  event.preventDefault()
  axios.post(
    'http://localhost:3000/movies', 
    {
        name: name,
        genre: genre,
        image: image,
        year: year,
        rating: rating,
    }
  ).then(() => {
    axios.get('http://localhost:3000/movies').then((response) => {
      setNewMovie(response.data)
    })
  })
}

const movieUpdate = (movieData) => {
  axios
    .put(
      `http://localhost:3000/movies/${movieData._id}`, 
      {
        name: name,
        genre: genre,
        image: image,
        year: year,
        rating: rating,
      }
    ).then((response) => {
      axios
      .get('http://localhost:3000/movies')
      .then((response) => {
        setNewMovie(response.data);
      });
    });
};

//___________________________________________________________________

  useEffect(() => {
    // this is pulling out from database and rendering into the page
    axios
      .get('http://localhost:3000/movies')
      .then((response)=> {
        setNewMovie(response.data)
      })
  },[])

//___________________________________________________________________

  return (
    <div className="App">
      <h1>Movie World!</h1>
      <section>
          <form onSubmit={newMovieSubmit}>
            <h2>
              Name: <input type="text" onChange={nameChange}/><br/>
              Genre: <input type="text" onChange={genreChange}/><br/>
              Image: <input type="text" onChange={imageChange}/><br/>
              Year: <input type="number" onChange={yearChange}/><br/>
              Rating: <input type="number" onChange={ratingChange}/><br/>
              <input type="submit" value="Add a Movie"/>
            </h2>
          </form>
        </section>
        <section>
          <ul className="flexCard">
          {movie.map((m) => {
              return (
                <div className="movieItem">
                    Name: {m.name}
                    <p>Genre: {m.genre}</p>
                    <p><img src={m.image}/></p>
                    <p>Year: {m.year}</p>
                    <p>Rating: {m.rating}</p>
                    Update Movie Info Below:<br/>
                    <form onSubmit= {() => {
                      movieUpdate(m)}}>
                    Name: <input type="text" onChange={nameChange}/><br/>
                    Genre: <input type="text" onChange={genreChange}/><br/>
                    Image: <input type="text" onChange={imageChange}/><br/>
                    Year: <input type="number" onChange={yearChange}/><br/>
                    Rating: <input type="number" onChange={ratingChange}/><br/>
                    <input type="submit" value="Update Info"/>
                    </form>
                    <button onClick={(event) => {
                      handleDelete(m);
                    }}
                    >
                      Delete Movie
                    </button>
                </div>
            )
          })}
          </ul>
        </section>
    </div>
  );
}

export default App;
