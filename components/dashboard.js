import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Link from 'next/link';
import navList from './navList';

/**
 * material-ui
 */
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Zoom from '@material-ui/core/Zoom';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

/**
 * material-ui-icons
 */
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  bar: {
    boxShadow: 'none',
  },
}));

/**
 * Component スクロールトップボタン
 */
const ScrollTop = (props) => {
  const classes = useStyles();
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} position='fixed' bottom={20} right={20}>
        {children}
      </Box>
    </Zoom>
  );
};

/**
 * Component スクロールによる表示機能搭載したAppBar
 */
const HideOnScrollAppBar = (props) => {
  const classes = useStyles();
  const { children, window } = props;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  // storeから取り出し
  const sideBarVisible = useSelector((state) => state.sideBarVisible, shallowEqual);

  //storeに書き込み
  const toggleDrawer = () => {
    dispatch({
      type: 'SIDEBAR_VISIBLE',
      sideBarVisible: !sideBarVisible,
    });
  };

  // スクロールダウン時のトリガー
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 1000,
  });

  //#region アカウントメニュー
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  //#endregion

  //#region モバイルメニュー
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  //#endregion

  return (
    <>
      <AppBar className={classes.bar} color='default' position='fixed'>
        <ToolBar>
          <Hidden mdUp>
            <IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Box flexGrow={1}>
            <Link href='/'>
              <Button>
                <Typography variant='h6'>{props.title}</Typography>
              </Button>
            </Link>
          </Box>
          <Box display={{ xs: 'none', sm: 'block' }}>
            <Tooltip title='Mail'>
              <IconButton aria-label='show 4 new mails' color='inherit'>
                <Badge badgeContent={4} color='secondary'>
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title='Account'>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'>
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Box>
          <Box display={{ xs: 'block', sm: 'none' }}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'>
              <MoreIcon />
            </IconButton>
          </Box>
        </ToolBar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <ToolBar id='back-to-top-anchor' />
    </>
  );
};

export default function Dashboard(props) {
  const classes = useStyles();
  const { children } = props;
  const dispatch = useDispatch();

  // storeから取り出し
  const sideBarVisible = useSelector((state) => state.sideBarVisible, shallowEqual);

  /**
   * サイドバーの開閉
   */
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    // storeにサイドバーの状態を書き込み
    dispatch({
      type: 'SIDEBAR_VISIBLE',
      sideBarVisible: open,
    });
  };

  /**
   * サイドバーのリスト
   */
  const sideBarList = () => (
    <div role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {navList.map((list, index) => (
          <Link href={list.href} passHref key={index}>
            <ListItem button component='a'>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText primary={list.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
      <Box>
        <HideOnScrollAppBar {...props} title='test' />
        <Box display='flex'>
          {/* サイドバー */}
          <Box width={250} display={{ xs: 'none', sm: 'none', md: 'block' }}>
            <Box position='fixed'>{sideBarList()}</Box>
          </Box>
          {/* メイン */}
          <Box flexGrow={1}>
            <Container maxWidth='md' className={classes.container}>
              {children}
            </Container>
          </Box>
        </Box>
        <ScrollTop {...props}>
          <Fab color='secondary' size='small' aria-label='scroll back to top'>
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
      {/* サイドバー（トグル起動） */}
      <Drawer anchor='left' open={sideBarVisible} onClose={toggleDrawer(false)}>
        {sideBarList()}
      </Drawer>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
            Droid Sans, Helvetica Neue, sans-serif;
        }
      `}</style>
    </>
  );
}
