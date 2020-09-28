import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Dashboard from '../../components/dashboard';
import { useRouter } from 'next/router';
import moment from 'moment';

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
import firebase from '../../firebase/clientApp';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
}));

export default function WorkCRUDShow(props) {
  const router = useRouter();
  const classes = useStyles();
  const [member, setMember] = useState({});

  console.log(router.query.uid);

  const getMember = useCallback(async () => {
    const docRef = firebase.firestore().collection('members').doc(router.query.uid);
    const doc = await docRef.get();
    if (doc.exists) {
      setMember(doc.data());
    } else {
      alert('メンバーが見つかりませんでした。');
    }
  }, [router.query.uid]);

  useEffect(() => {
    getMember();
  }, [getMember]);

  if (member.createdAt === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Dashboard>
        <Box>UID:{member.docId}</Box>
        <Box>Email:{member.email}</Box>
        <Box>居住地域:{member.area}</Box>
        <Box>
          <img src={member.avatarUrl} width='200' alt='' />
        </Box>
        <Box>性別:{member.gender}</Box>
        <Box>詳細: {moment(member.birthday.seconds * 1000).format('YYYY/MM/DD')}</Box>
        <Box>同意:{String(member.agree)}</Box>
        <Box>登録日時:{moment(member.createdAt.seconds * 1000).format('YYYY-MM-DD HH:mm:dd:ss')}</Box>
        <Box></Box>
      </Dashboard>
    </>
  );
}
