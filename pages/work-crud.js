import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Dashboard from '../components/dashboard';

/**
 * mateeerial-ui
 */
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/**
 * icon
 */
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

/**
 * firebase
 */
import firebase from '../firebase/clientApp';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
}));

export default function WorkCRUD() {
  const classes = useStyles();
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let unmounted = false;
    firebase
      .firestore()
      .collection('members')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => doc.data());
        if (!unmounted) {
          setListData(docs);
        }
      });

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <Dashboard>
        <Container>
          <Typography component='h2' variant='h6'>
            メンバー一覧
          </Typography>
          <Link href='/work-crud-create'>
            <Button color='primary'>新規登録</Button>
          </Link>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>UID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>gender</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>詳細</TableCell>
                  <TableCell>編集</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listData.map((member) => {
                  return (
                    <TableRow key={member.docId} style={member.gender === 'female' ? { background: '#ffe4e1' } : {}}>
                      <TableCell>{member.docId}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.gender}</TableCell>
                      <TableCell>
                        <img src={member.avatarUrl} height='30' width='30' alt='' />
                      </TableCell>
                      <TableCell>
                        <Link href={`/work-crud-show/${member.docId}`}>
                          <Button size='sm' color='primary'>
                            <MoreHorizIcon />
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/edit/${member.docId}`}>
                          <Button size='sm' color='primary'>
                            <EditIcon size='sm' />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Dashboard>
    </>
  );
}
