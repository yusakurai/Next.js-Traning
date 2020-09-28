import Dashboard from '../components/dashboard';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

/**
 * ビューポートにスクロールする要素をアニメーション化するためのReactコンポーネント
 */
import { ReactGenieAnimations } from 'react-genie-styled-components';
import { Reveal } from 'react-genie';
import { Animation } from 'react-genie-styled-components';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

const sampleText =
  'It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.It can transform into a contextual action bar or be used as a navbar.';

export default function Index() {
  const classes = useStyles();
  return (
    <>
      <ReactGenieAnimations />
      <Dashboard>
        {[...new Array(10)].map((d, i) => {
          return (
            <Reveal animation={Animation.FadeInUp} delay={400} key={i}>
              <Paper className={classes.paper}>
                <Box>{sampleText}</Box>
              </Paper>
            </Reveal>
          );
        })}
      </Dashboard>
    </>
  );
}
