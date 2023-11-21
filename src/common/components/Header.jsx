import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useAuth } from "../../context/auth/auth-context";
import { Search, SearchIconWrapper, StyledInputBase } from "./Search";
import SearchIcon from '@mui/icons-material/Search';
import { ROUTES, USER_ROLES } from "../../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  const {user, logout} = useAuth();

  const isUserLoggedIn = !!user;
  const isAdmin = user?.roles?.includes(USER_ROLES.ADMIN);

  return (
    <AppBar component="nav" position="sticky" px="md" sx={{
      backgroundColor: "#3f51b5",
    }}>
      <Toolbar disableGutters sx={{px: 4}}>
        <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
          <Link to={ROUTES.HOME}>
            <Stack spacing={1} direction="row" alignItems="center">
              <ShoppingCart/>
              <Typography variant="h6" noWrap>
                upGrad E-Shop
              </Typography>
            </Stack>
          </Link>

          {isUserLoggedIn && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
              />
            </Search>
          )}

          {isUserLoggedIn && (
            <Stack direction="row" alignItems="center" spacing={6}>
              <Link to={ROUTES.HOME}>
                <Typography noWrap variant="subtitle1" sx={{
                  textDecoration: "underline",
                }}>
                  Home
                </Typography>
              </Link>
              {isAdmin && (
                <Link to={ROUTES.ADMIN.ADD_PRODUCT}>
                  <Typography noWrap variant="subtitle1" sx={{
                    textDecoration: "underline",
                  }}>
                    Add Product
                  </Typography>
                </Link>
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
              <Link to={ROUTES.LOGIN}>
                <Typography noWrap variant="subtitle1" sx={{
                  textDecoration: "underline",
                }}>
                  Login
                </Typography>
              </Link>
              <Link to={ROUTES.SIGNUP}>
                <Typography noWrap variant="subtitle1" sx={{
                  textDecoration: "underline",
                }}>
                  Sign Up
                </Typography>
              </Link>
            </Stack>
          )}

        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
