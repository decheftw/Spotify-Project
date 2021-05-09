/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import ResultsGrid from './results';
import NomsList from './nominations';
import { getNominationLeaders, submitNoms } from '../services/firebase';
import LeaderboardComp from './leaderboard';

const useStyles = makeStyles(() => ({
  pagination: {
    float: 'flex-end',
  },
}));

function Page() {
  const classes = useStyles();
  const [search, setSearch] = useState('Whiplash');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submittedOpen, setSubmittedOpen] = useState(false);
  const [noms, setNoms] = useState([]);
  const [openBanner, setOpenBanner] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState();
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
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
    axios.get(`https://www.omdbapi.com/?type=movie&s=${search}&page=${page}&apikey=948f4b34`)
      .then((response) => {
        console.log(response.data);
        if (response.data.Response !== 'False') {
          setData(response.data);
          setPages(Math.ceil(response.data.totalResults / 10));
        }
      });
  }, [search, page]);

  useEffect(() => {
    if (noms.length === 5) {
      setOpenBanner(true);
    }
  }, [noms]);

  useEffect(() => {
    const tempLeaderboard = [];
    console.log(leaderboardData);
    // eslint-disable-next-line guard-for-in
    for (const key in leaderboardData) {
      tempLeaderboard.push(leaderboardData[key]);
    }
    tempLeaderboard.sort((a, b) => {
      return b.votes - a.votes;
    });
    setLeaderboard(tempLeaderboard.splice(0, 5));
  }, [leaderboardData]);

  useEffect(() => {
    console.log(leaderboard);
  }, [leaderboard]);

  useEffect(() => {
    getNominationLeaders().then((res) => setLeaderboardData(res));
  }, []);

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

  function closeBanner() {
    setOpenBanner(false);
  }

  function viewNomsButton() {
    closeBanner();
    openDrawer();
  }

  function generateModalBody() {
    return (
      <div>
        <h1>That&aposs your 5th nomination!</h1>
        <Button variant="contained" onClick={closeBanner}>Cool!</Button>
        <Button variant="contained" onClick={viewNomsButton}>View my nominations</Button>
      </div>
    );
  }

  function onSubmitClick() {
    const tempData = JSON.parse(JSON.stringify(leaderboardData));
    noms.forEach((nom) => {
      if (nom.id in tempData) {
        const count = tempData[nom.id].votes + 1;
        tempData[nom.id].votes = count;
      } else {
        tempData[nom.id] = nom;
        tempData[nom.id].votes = 1;
      }
    });
    setLeaderboardData(tempData);
    submitNoms(tempData);
    setNoms([]);
    setDrawerOpen(false);
    setSubmittedOpen(true);
  }

  function populateNomsList() {
    if (noms.length < 1) {
      return (
        <h1>No nominations yet!</h1>
      );
    } else {
      console.log(noms);
      if (noms.length === 5) {
        return (
          <div>
            <IconButton aria-label="delete" onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
            <Button variant="contained" onClick={onSubmitClick}>Submit</Button>
            <div>
              {noms.map((nom) => (<NomsList title={nom.title} poster={nom.poster} year={nom.year} key={nom.id} noms={noms} setNoms={setNoms} id={nom.id} />))}
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <IconButton aria-label="delete" onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
            <Button variant="disabled">{`Nominations: ${noms.length}/5`}</Button>
            <div>
              {noms.map((nom) => (<NomsList title={nom.title} poster={nom.poster} year={nom.year} key={nom.id} noms={noms} setNoms={setNoms} id={nom.id} />))}
            </div>
          </div>
        );
      }
    }
  }

  function openSubmitted() {
    setSubmittedOpen(true);
  }

  function closeSubmitted() {
    setSubmittedOpen(false);
  }

  function openLeaderboard() {
    setLeaderboardOpen(true);
  }

  function closeLeaderboard() {
    setLeaderboardOpen(false);
  }

  return (
    <div className="App">
      <h1>Shoppies Nominations</h1>
      <TextField id="outlined-basic" label="Search" variant="outlined" onChange={onSearchChange} />
      <Button variant="contained" onClick={openDrawer}>{`Nominations: ${noms.length}/5`}</Button>
      <Button variant="contained" onClick={openLeaderboard}>Leaderboard</Button>

      <Modal
        open={openBanner}
        onClose={closeBanner}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {generateModalBody()}
      </Modal>
      <SwipeableDrawer
        anchor="top"
        open={drawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        {populateNomsList()}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="top"
        open={submittedOpen}
        onClose={closeSubmitted}
        onOpen={openSubmitted}
      >
        <h1>
          Submission received!
        </h1>
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="top"
        open={leaderboardOpen}
        onClose={closeLeaderboard}
        onOpen={openLeaderboard}
      >
        <IconButton aria-label="delete" onClick={closeLeaderboard}>
          <CloseIcon />
        </IconButton>
        {leaderboard.map((nom) => (<LeaderboardComp title={nom.title} poster={nom.poster} year={nom.year} key={nom.id} id={nom.id} votes={nom.votes} />))}
      </SwipeableDrawer>
      <div>
        <div className={classes.pagination}>
          <Pagination count={pages} page={page} onChange={handlePageChange} />
        </div>
        {data.Search.map((res) => (<ResultsGrid title={res.Title} poster={res.Poster} year={res.Year} key={res.imdbID} noms={noms} setNoms={setNoms} id={res.imdbID} />))}
      </div>
    </div>
  );
}

// eslint-disable-next-line no-lone-blocks
{ /* <ResultsGrid props={res} key={res.imbdID} /> */ }

export default Page;
