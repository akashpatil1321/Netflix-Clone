import { useState } from 'react'
import Row from './Row'
import requests from './request';
import './App.css'
import Banner from './Banner';
import Nav from './Nav';

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className='App'>
    <Nav/>
    <Banner/>
    <Row
        title="Netflix Orignals"
        fetchUrl={requests.fetchNetflixOrignals}
        isLargeRow/>
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Crime Movies" fetchUrl={requests.fetchCrimeMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Sci-Fi" fetchUrl={requests.fetchSciFiMovies} />
     
  </div>
  );
}

export default App
