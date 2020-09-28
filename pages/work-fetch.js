import React, { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'node-fetch';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
}));

const sampleText =
  'It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.';

export default function WorkFetch() {
  const classes = useStyles();
  const [result, setResult] = useState([]);

  const allPostIds = async () => {
    const res = await fetch('https://api.github.com/repositories/70107786');
    const json = await res.json();

    return {
      stars: json.stargazers_count,
    };
  };

  useEffect(() => {
    allPostIds().then((v) => {
      setResult(v.stars);
    });
  }, []);

  return (
    <>
      <Dashboard>
        <Box>
          <Paper className={classes.paper}>{result}</Paper>
        </Box>
      </Dashboard>
    </>
  );
}
