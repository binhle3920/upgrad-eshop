import {AppBar, Button, Stack, Toolbar, Typography} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";
import {useAuth} from "../context/auth/auth-context";
import {Search, SearchIconWrapper, StyledInputBase} from "./Search";
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const { user, logout } = useAuth();

  const isUserLoggedIn = !!user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <AppBar component="nav" position="sticky" px="md" sx={{
      backgroundColor: "#3f51b5",
    }}>
      <Toolbar disableGutters sx={{ px: 4 }}>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Stack spacing={1} direction="row" alignItems="center">
            <ShoppingCart />
            <Typography variant="h6" noWrap component="a" href="/">
              upGrad E-Shop
            </Typography>
          </Stack>

          {isUserLoggedIn && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}

          {isUserLoggedIn && (
            <Stack direction="row" alignItems="center" spacing={6}>
              <Typography noWrap component="a" variant="subtitle1" href="/" sx={{
                textDecoration: "underline",
              }}>
                Home
              </Typography>
              {isAdmin && (
                <Typography noWrap component="a" variant="subtitle1" href="/admin" sx={{
                  textDecoration: "underline",
                }}>
                  Add Product
                </Typography>
              )}
              <Button onClick={logout} sx={{
                backgroundColor: "#f50057",
                color: "#fff",
                px: 2,

                '&:hover': {
                  backgroundColor: "#d20149",
                },
              }}>
                Logout
              </Button>
            </Stack>
          )}

          {!isUserLoggedIn && (
            <Stack direction="row" alignItems="center" spacing={6}>
              <Typography noWrap component="a" variant="subtitle1" href="/login" sx={{
                textDecoration: "underline",
              }}>
                Login
              </Typography>
              <Typography noWrap component="a" variant="subtitle1" href="/signup" sx={{
                textDecoration: "underline",
              }}>
                Sign Up
              </Typography>
            </Stack>
          )}

        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header;