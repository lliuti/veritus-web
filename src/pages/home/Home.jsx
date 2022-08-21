import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { api } from "../../services/api";
import { Characters } from '../../components/Characters';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export function Home() {
    const navigate = useNavigate();    
    const context = useAuth();

    const handleLogout = () => {
        context.Logout();
        navigate("/conta/entrar");
    }

    const handleCreateCharacter = async () => {
        const response = await api.post("/characters/create");
        navigate(`/personagens/${response.data.id}`);
    }

    return (
        <>
            <AppBar 
                position="static"
                elevation={0}
                color='secondary'
                sx={{ backgroundColor: '#000' }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Veritus
                    </Typography>
                    <nav>
                        <Link
                            variant="button"
                            color="inherit"
                            onClick={() => navigate("/mestre/dashboard")}
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
                            Dashboard
                        </Link>
                        <Link
                            variant="button"
                            color="inherit"
                            onClick={handleCreateCharacter}
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
                            Criar Personagem
                        </Link>
                    </nav>
                    <Button onClick={handleLogout} variant="outlined" color="secondary" sx={{ my: 1, mx: 1.5 }}>
                        Sair
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ mt: 5}}>
                <Typography component="h2" variant="h6" color="inherit">
                    Meus personagens
                </Typography>
                <Characters/>
            </Container>
        </>
    )
}