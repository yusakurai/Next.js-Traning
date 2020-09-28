import Dashboard from '../components/dashboard';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

/**
 * DOMの色や属性などをアニメーション化すためのReactコンポーネント
 */
import { useSpring, animated } from 'react-spring';

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

export default function WorkAnimation() {
  const classes = useStyles();
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <>
      <ReactGenieAnimations />
      <Dashboard>
        <animated.div style={props}>
          <div>test</div>
        </animated.div>
        <Reveal animation={Animation.FadeInUp}>
          <h1>🤯 Revealing this</h1>
        </Reveal>
        <Reveal animation={Animation.SlideInLeft}>
          <h1>🕵️‍♀️ From The Left</h1>
        </Reveal>
        <Reveal animation={Animation.SlideInRight}>
          <h1>🕵️‍♂️ From The Right</h1>
        </Reveal>
        <Reveal animation={Animation.FadeIn}>
          <h1>☁️ Fade In</h1>
        </Reveal>

        {[...new Array(30)].map((d, i) => {
          return (
            <Reveal animation={Animation.FadeInUp} delay={400} key={i}>
              <Paper className={classes.paper}>{sampleText}</Paper>
            </Reveal>
          );
        })}
      </Dashboard>
    </>
  );
}
