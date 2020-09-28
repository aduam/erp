import { useState } from 'react'
import Router from 'next/router'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import clsx from 'clsx'
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core'
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Home,
  Store,
  Settings,
  Group,
} from '@material-ui/icons'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = ({ children, router }) => {
  const { route } = router
  const classes = useStyles()
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            {process.env.NAME_BUSINESS}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Tooltip title="Inicio">
            <ListItem button onClick={() => Router.push('/')}>
              <ListItemIcon>
                <Home color={route === '/' ? 'secondary' : ''} />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Compras">
            <ListItem button onClick={() => Router.push('/compras')}>
              <ListItemIcon>
                <Store color={route === '/compras' ? 'secondary' : ''} />
              </ListItemIcon>
              <ListItemText primary="Compras" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Proveedor">
            <ListItem button onClick={() => Router.push('/proveedor')}>
              <ListItemIcon>
                <Group color={route === '/proveedor' ? 'secondary' : ''} />
              </ListItemIcon>
              <ListItemText primary="Proveedores" />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <List>
          <Tooltip title="Configuración">
            <ListItem button onClick={() => Router.push('/configuracion')}>
              <ListItemIcon>
                <Settings color={route === '/configuracion' ? 'secondary' : ''} />
              </ListItemIcon>
              <ListItemText primary="Configuraciones" />
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default Layout