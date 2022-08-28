import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from "../../../services/api";
import { useAuth } from "../../../contexts/useAuth";
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Verissimo from '../../../assets/verissimo-agatha-marc.jpg';

export const CreateAccount = () => {  
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();
    const context = useAuth();

    const handleSubmit = async () => {
        setIsLoading(true);

        if (name == "" || username == "" || email == "" || password == "") {
            setIsLoading(false);
            return;
        }

        try {
            await api.post("/users/create", {
                name,
                username,
                email,
                password
            });
    
            context.Login(username, password);
    
            navigate("/");
        } catch (err) {
            enqueueSnackbar("Não foi possível criar uma conta.", { 
                variant: "error"
            });
        }

        setIsLoading(false);
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box component="div" sx={{
                mt: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img alt="logo" src={Verissimo} width="200px" style={{ borderRadius: '50%', border: '2px solid #78909c' }}/>
                <Typography component="h1" variant="h4" sx={{ my: 2}}>
                    Criar uma nova conta
                </Typography>
                <Typography component="h3" variant="subtitle1" sx={{ mb: 2}}>
                    Lembre-se do usuário e senha pois mó preg redefinir
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            id="name"
                            label="Nome do Jogador"
                            name="name"
                            autoFocus
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
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
                            margin="normal"
                            required
                            fullWidth
                            color="secondary"
                            id="email"
                            label="E-mail do Jogador"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
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
                    <Grid item md={6}>
                        <Button
                            type="submit"
                            fullWidth
                            color="secondary"
                            variant="text"
                            onClick={() => navigate("/conta/entrar")}
                        >
                            Fazer Login
                        </Button>
                    </Grid>
                    <Grid item md={6}>
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={handleSubmit}
                        >
                            Cadastrar
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}