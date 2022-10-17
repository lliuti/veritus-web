import { useState } from 'react';
import { useAuth } from "../../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Agatha from '../../../assets/agatha.jpg';

export const Login = () => {    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const context = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async () => {
        setIsLoading(true);

        if (username == "" || password == "") {
            enqueueSnackbar("Preencha os campos.", { 
                variant: "error"
            });
            setIsLoading(false);
            return;
        }

        const response = await context.Login(username, password);

        if (response && response.code == "ERR_BAD_REQUEST") {
            setUsername("");
            setPassword("");
            enqueueSnackbar("Não foi possível entrar.", { 
                variant: "error"
            });

            setIsLoading(false);
            return;
        }
        
        navigate("/home");
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box component="div" sx={{
                mt: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <img alt="logo" src={Agatha} width="200px" style={{ borderRadius: '50%', border: '2px solid #78909c' }}/>
                <Typography component="h1" variant="h4" sx={{ my: 2}}>
                    Entrar em minha conta
                </Typography>
                <Typography component="h3" variant="subtitle1" sx={{ mb: 2}}>
                    Faça Login para acessar a plataforma    
                </Typography>
                <Grid container spacing={1} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            color="secondary"
                            label="Nome de usuário"
                            name="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            fullWidth
                            color="secondary"
                            id="password"
                            label="Senha"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            color="secondary"
                            variant="text"
                            onClick={() => navigate("/conta/criar")}
                        >
                            Cadastrar
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            loading={isLoading}
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={handleSubmit}
                        >
                            Entrar
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}