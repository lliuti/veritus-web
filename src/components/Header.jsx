import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { api } from "../services/api";
import { useSnackbar } from 'notistack';
import { ColorModeContext } from '../contexts/colorMode/mode';
import { FaSignInAlt } from "react-icons/fa";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

export const Header = ({ variant }) => {
    const [anchorNav, setAnchorNav] = useState(null);
    
    const navigate = useNavigate();    
    const context = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const colorMode = useContext(ColorModeContext);

    const handleCreateCharacter = async () => {
        try {
            const response = await api.post("/characters/create");
            navigate(`/personagens/${response.data.id}`);
        } catch (err) {
            enqueueSnackbar("Não foi possível criar um personagem.", { 
                variant: "error"
            });
        }
    }

    const handleLogout = () => {
        context.Logout();
        navigate("/conta/entrar");
    }

    if (variant === "home") {
        return (
            <AppBar 
                    position="static"
                    elevation={3}
                    color='secondary'
                >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={(event) => setAnchorNav(event.currentTarget)}
                        color="inherit"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorNav)}
                        onClose={() => setAnchorNav(null)}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                            <MenuItem onClick={() => { 
                                setAnchorNav(null);
                                navigate(`/conta/${context.userId}/perfil`)
                            }}>
                                <Typography textAlign="center">Perfil</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { 
                                setAnchorNav(null);
                                navigate("/mestre/dashboard")
                            }}>
                                <Typography textAlign="center">Área do Mestre</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { 
                                setAnchorNav(null);
                                handleCreateCharacter();
                            }}>
                                <Typography textAlign="center">Criar Personagem</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorNav(null);
                                localStorage.setItem("mode", colorMode.mode == "light" ? "dark" : "light");
                                colorMode.toggleColorMode();
                            }}>
                                { colorMode.mode == "dark" ? <LightModeIcon fontSize="small"/> : <NightlightIcon fontSize="small"/> }
                            </MenuItem>
                    </Menu>
                    <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1, fontFamily: "Holtwood One SC, serif" }}>
                        VERITUS
                    </Typography>
                    <Box sx={{ display: { xs: "none", md: "flex"}, mr: { md: 1 } }}>
                        <Button
                            variant="button"
                            color="inherit"
                            onClick={() => navigate(`/conta/${context.userId}/perfil`)}
                            sx={{ 
                                my: 1, 
                                mx: 1, 
                                transition: "200ms all",
                                textDecoration: "none", 
                                ":hover": {
                                    cursor: "pointer",
                                    opacity: 0.90,
                                }
                            }}
                        >
                            Perfil
                        </Button>
                        <Button
                            variant="button"
                            color="inherit"
                            onClick={() => navigate("/mestre/dashboard")}
                            sx={{ 
                                my: 1, 
                                mx: 1, 
                                transition: "200ms all",
                                textDecoration: "none", 
                                ":hover": {
                                    cursor: "pointer",
                                    opacity: 0.90,
                                }
                            }}
                        >
                            Área do Mestre
                        </Button>
                        <Button
                            variant="button"
                            color="inherit"
                            onClick={handleCreateCharacter}
                            sx={{ 
                                my: 1, 
                                mx: 1, 
                                transition: "200ms all",
                                textDecoration: "none", 
                                ":hover": {
                                    cursor: "pointer",
                                    opacity: 0.90,
                                }
                            }}
                        >
                            Criar Personagem
                        </Button>
                        <Button onClick={() => {
                            localStorage.setItem("mode", colorMode.mode == "light" ? "dark" : "light");
                            colorMode.toggleColorMode();
                        }} variant="text" color="inherit" size="small">
                            { colorMode.mode == "dark" ? <LightModeIcon fontSize="small"/> : <NightlightIcon fontSize="small"/> }
                        </Button>
                    </Box>
                    <Button onClick={handleLogout} variant="outlined" color="inherit" sx={{ my: 1, mx: 1 }}>
                        Sair
                    </Button>
                </Toolbar>
            </AppBar>
        ) 
    } else {
        return (
            <AppBar 
                position="static"
                elevation={3}
                color='secondary'
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Link
                        variant="button"
                        color="inherit"
                        onClick={() => navigate("/home")}
                        sx={{ 
                            my: 1, 
                            mx: 2, 
                            transition: "200ms all",
                            textDecoration: "none", 
                            ":hover": {
                                cursor: "pointer",
                                opacity: 0.90,
                            }
                        }}
                    >
                        Voltar
                    </Link>
                </Toolbar>
            </AppBar>
        )
    }
}