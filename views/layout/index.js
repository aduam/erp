import { useState } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import clsx from 'clsx'
import { destroyCookie } from 'nookies'
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
  MenuItem,
  Button,
} from '@material-ui/core'
import Logout from '@material-ui/core/Menu'
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Home,
  Store,
  Settings,
  Group,
  ImportContacts,
  AssignmentTurnedIn,
  TrendingUp,
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

const InnerAppBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const Layout = ({ children, router, me }) => {
  const { route } = router
  const classes = useStyles()
  const theme = useTheme();
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(null);

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)
  const handleOpenMenu = (e) => setMenu(e.currentTarget)
  const handleCloseMenu = () => setMenu(false)

  const handleLogout = () => {
    destroyCookie(null, 'authorization', null)
    destroyCookie(null, "refresh_token", null)
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <InnerAppBar>
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
          <Tooltip title={me && me.names ? `${me.names} ${me.surnames}` : ''}>
            <Typography variant="h6" noWrap>{me && me.names ? `${me.names} ${me.surnames}` : ''}</Typography>
          </Tooltip>
          <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenMenu} variant="text">
              <Settings />
            </Button>
            <Logout
              id="simple-menu"
              anchorEl={menu}
              keepMounted
              open={Boolean(menu)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Logout>
          </div>
        </InnerAppBar>
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
                <Home color={route === '/' ? 'secondary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Compras">
            <ListItem button onClick={() => Router.push('/compras')}>
              <ListItemIcon>
                <Store color={route === '/compras' ? 'secondary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Compras" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Proveedor">
            <ListItem button onClick={() => Router.push('/proveedor')}>
              <ListItemIcon>
                <Group color={route === '/proveedor' ? 'secondary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Proveedores" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Productos">
            <ListItem button onClick={() => Router.push('/producto')}>
              <ListItemIcon>
                <ImportContacts color={route === '/producto' ? 'secondary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Productos" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Venta">
            <ListItem button onClick={() => Router.push('/venta')}>
              <ListItemIcon>
                <AssignmentTurnedIn color={route === '/venta' ? 'secondary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Ventas" />
            </ListItem>
          </Tooltip>
          <Tooltip title="Reportes">
            <ListItem button onClick={() => Router.push('/reportes')}>
              <ListItemIcon>
                <TrendingUp color={route === '/reportes' ? 'secondary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Reportes" />
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
        <List>
          {/* <Tooltip title="Configuración">
            <ListItem button onClick={() => Router.push('/configuracion')}>
              <ListItemIcon>
                <Settings color={route === '/configuracion' ? 'secondary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Configuraciones" />
            </ListItem>
          </Tooltip> */}
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