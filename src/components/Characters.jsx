import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { api } from '../services/api';
import { useAuth } from "../contexts/useAuth";
import { Bull } from "../components/Bull";
import { useSnackbar } from 'notistack';
import { DeleteCharacterDialog } from "../components/DeleteCharacterDialog";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export function Characters() {
    const [characters, setCharacters] = useState([]);
    const [deleteCharacterLoading, setDeleteCharacterLoading] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [characterId, setCharacterId] = useState("");
    const [characterName, setCharacterName] = useState("");

    const navigate = useNavigate();
    const context = useAuth();
    
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchMyCharacters();
    }, []);

    const fetchMyCharacters = async () => {
        setOpenBackdrop(true);
        try {
            const response = await api.get("/characters/list");
            setCharacters(response.data);
        } catch (err) {
            context.Logout();
            navigate("/conta/entrar");
        }
        setOpenBackdrop(false);
    };

    const handleDeleteCharacter = async (id, name) => {
        setCharacterId(id);
        setCharacterName(name);
        setDeleteDialogOpen(true);
    }

    return (
        <Grid container spacing={{ xs: 1, md: 2 }}>
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
                                    {character.characterClass} <Bull/> {character.archetype}
                                </Typography>
                                <Typography color="text.secondary">
                                    Nex {character.nex}% <Bull/> {character.rank}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-start' }}>
                                <LoadingButton 
                                    onClick={() => handleDeleteCharacter(character.id, character.name)} 
                                    size="small" 
                                    color="error" 
                                    variant="text"
                                    loading={deleteCharacterLoading}
                                >
                                    Deletar
                                </LoadingButton>
                                <DeleteCharacterDialog 
                                    characterId={characterId}
                                    characterName={characterName}
                                    onClose={() => setDeleteDialogOpen(false)}
                                    open={deleteDialogOpen}
                                    fetchMyCharacters={fetchMyCharacters}
                                />
                                <Button 
                                    onClick={() => navigate(`/personagens/${character.id}`)} 
                                    size="small" 
                                    color="secondary" 
                                    variant="outlined"
                                >
                                    Visualizar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    )
}