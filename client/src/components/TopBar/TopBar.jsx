import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { Context } from "../../context/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const pages = ["Home Page", "My Blog", "Write Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, dispatch, isGoogle } = useContext(Context);
  const navigate = useNavigate();

  console.log(user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickNav = (page) => {
    // click to home page -> redirect to home page with path "/"
    // click to my blog -> redirect to my blog page with path "/my-blog"
    // click to write blog -> redirect to write blog page with path "/write-blog"
    if (page === "Home Page") {
      // window.location.href = "/";
      navigate("/");
    } else if (page === "My Blog") {
      // window.location.href = `/my-posts/${user?._id}`;
      if (!user) {
        // window.location.href = "/";
        navigate("/login");
      } else navigate(`/my-posts/${user?._id}`);
    } else if (page === "Write Blog") {
      // window.location.href = "/write";
      if (!user) {
        // window.location.href = "/";
        navigate("/login");
      } else navigate("/write");
    }
  };

  const handleCickSetting = (setting) => {
    // click to profile -> redirect to profile page with path "/profile"
    // click to account -> redirect to account page with path "/account"
    // click to dashboard -> redirect to dashboard page with path "/dashboard"
    // click to logout -> logout and redirect to home page with path "/"
    if (setting === "Profile") {
      // window.location.href = `/profile/${user?._id}`;
      if (!user) {
        // window.location.href = "/";
        navigate("/login");
      } else navigate(`/settings`);
    } else if (setting === "Account") {
      // window.location.href = `/account/${user?._id}`;
      if (!user) {
        // window.location.href = "/";
        navigate("/login");
      } else navigate(`/account/${user?._id}`);
    } else if (setting === "Dashboard") {
      // window.location.href = `/dashboard/${user?._id}`;
      if (!user) {
        // window.location.href = "/";
        navigate("/login");
      } else navigate(`/dashboard/${user?._id}`);
    } else if (setting === "Logout") {
      // window.location.href = "/";
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }

    console.log(setting);
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickRegister = () => {
    navigate("/register");
  };

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClickNav(page)}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {!user && (
            <>
              <Button color="inherit" onClick={handleClickLogin} sx={{ mr: 5 }}>
                Login
              </Button>

              <Button
                color="inherit"
                onClick={handleClickRegister}
                sx={{ mr: 5 }}
              >
                Register
              </Button>
            </>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user?.profilePic || "/static/images/avatar/2.jpg"}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCickSetting(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography sx={{ ml: 2 }}>{user?.username}</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
