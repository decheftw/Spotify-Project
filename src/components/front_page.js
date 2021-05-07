/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ResultsGrid from './results';
import NomsList from './nominations';

function Page() {
  const [search, setSearch] = useState('Whiplash');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  function populateNomsList() {
    if (noms.length < 1) {
      return (
        <h1>No nominations yet!</h1>
      );
    } else {
      console.log(noms);
      return (
        <div>
          {noms.map((nom) => (<NomsList title={nom.title} poster={nom.poster} year={nom.year} key={nom.id} noms={noms} setNoms={setNoms} id={nom.id} />))}
        </div>
      );
    }
  }

  return (
    <div className="App">
      <h1>Shoppies Nominations</h1>
      <TextField id="outlined-basic" label="Search" variant="outlined" onChange={onSearchChange} />
      <Button variant="contained" onClick={openDrawer}>{`Nominations: ${noms.length}/5`}</Button>
      <SwipeableDrawer
        anchor="top"
        open={drawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <IconButton aria-label="delete" onClick={closeDrawer}>
          <CloseIcon />
        </IconButton>
        {populateNomsList()}
      </SwipeableDrawer>
      <pre>
        {data.Search.map((res) => (<ResultsGrid title={res.Title} poster={res.Poster} year={res.Year} key={res.imdbID} noms={noms} setNoms={setNoms} id={res.imdbID} />))}
        <Pagination count={pages} page={page} onChange={handlePageChange} />
      </pre>
    </div>
  );
}

// eslint-disable-next-line no-lone-blocks
{ /* <ResultsGrid props={res} key={res.imbdID} /> */ }

export default Page;
