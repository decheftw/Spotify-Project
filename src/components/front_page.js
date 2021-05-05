/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import ResultsGrid from './results';

function Page() {
  const [search, setSearch] = useState('Whiplash');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [noms, setNoms] = useState([]);
  const [data, setData] = useState({
    Search: [
      {
        Title: 'Whiplash',
        Year: '2014',
        imdbID: 'tt2582802',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      }],
  });

  useEffect(() => {
    axios.get(`http://www.omdbapi.com/?type=movie&s=${search}&page=${page}&apikey=948f4b34`)
      .then((response) => {
        console.log(response.data);
        if (response.data.Response !== 'False') {
          setData(response.data);
          setPages(Math.ceil(response.data.totalResults / 10));
        }
      });
  }, [search, page]);

  useEffect(() => {
    console.log(noms);
  }, [noms]);

  function onSearchChange(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  function handlePageChange(event, value) {
    setPage(value);
  }

  return (
    <div className="App">
      <h1>Shoppies Nominations</h1>
      <TextField id="outlined-basic" label="Search" variant="outlined" onChange={onSearchChange} />
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <pre>
          {data.Search.map((res) => (<ResultsGrid title={res.Title} poster={res.Poster} year={res.Year} key={res.imdbID} noms={noms} setNoms={setNoms} id={res.imdbID} />))}
          <Pagination count={pages} page={page} onChange={handlePageChange} />
        </pre>
      )}
    </div>
  );
}

// eslint-disable-next-line no-lone-blocks
{ /* <ResultsGrid props={res} key={res.imbdID} /> */ }

export default Page;
