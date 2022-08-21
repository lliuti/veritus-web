import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { api } from '../services/api';
import { useAuth } from "../contexts/useAuth";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
);

export function Characters() {
    const [characters, setCharacters] = useState([]);

    const navigate = useNavigate();
    const context = useAuth();

    useEffect(() => {
        fetchMyCharacters();
    }, []);

    const fetchMyCharacters = async () => {
        try {
            const response = await api.get("/characters/list");
            setCharacters(response.data);
        } catch (err) {
            context.Logout();
            navigate("/conta/entrar");
        }
    };

    const handleDeleteCharacter = async (id) => {
        await api.delete(`/characters/${id}`)
    }

    return (
        <Grid container sx={{ mt: 2 }}>
            {
                characters.map((character) => (
                    <Grid item key={character.id}>
                        <Card sx={{ py: 1, px: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                                    {character.name}
                                </Typography>
                                <Typography sx={{ mb: 1 }} color="text.secondary">
                                    {character.background}
                                </Typography>
                                <Typography sx={{ mb: 1 }} color="text.secondary">
                                    {character.characterClass} {bull} {character.archetype}
                                </Typography>
                                <Typography color="text.secondary">
                                    Nex {character.nex}% {bull} {character.rank}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-start' }}>
                                <Button onClick={() => handleDeleteCharacter(character.id)} size="small" color="error" variant="text">Deletar</Button>
                                <Button onClick={() => navigate(`/personagens/${character.id}`)} size="small" color="secondary" variant="outlined">Visualizar</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}