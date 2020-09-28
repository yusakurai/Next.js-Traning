import React, { useState } from 'react';
import User from '../lib/User';
import Dashboard from '../components/dashboard';

/**
 * material-ui
 */
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/**
 * icon
 */
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function WorkLogin(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleTryLogin = async () => {
    try {
      await User.login(email, password);
      props.history.push({ pathname: 'list1' });
    } catch (e) {
      setErrMessage(e.message);
    }
  };

  return (
    <Dashboard>
      <Container maxWidth='xs'>
        <CssBaseline />
        <Box className={classes.root}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            LOG IN
          </Typography>
          <FormControl className={classes.form} noValidate>
            <TextField
              id='username'
              label='ID'
              name='username'
              autoComplete='username'
              variant='outlined'
              margin='normal'
              fullWidth
              required
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='パスワード'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="アカウントを記憶"
          /> */}
            <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={handleTryLogin}>
              LOG IN
            </Button>
            {errMessage && <Box textAlign='center'>{errMessage}</Box>}
          </FormControl>
        </Box>
        <Box mt={8}>
          <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            {'Sample'}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Dashboard>
  );
}
