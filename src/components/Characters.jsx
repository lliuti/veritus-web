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
import CardMedia from '@mui/material/CardMedia';
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
        <Grid container spacing={{ xs: 3, md: 1 }}>
            <Grid item xs={12}>
                <Typography component="h2" variant="h6" color="inherit">
                    Meus personagens
                </Typography>
            </Grid>
            {
                characters.length > 0 ? characters.map((character) => (
                    <Grid item xs={12} sm={6} md={3} key={character.id}>
                        <Card sx={[ { '&:hover': { cursor: "pointer", transform: "scale(1.01)", transition: "0ms all" } } ]}>
                            <CardMedia
                                component="img"
                                image={character.pictureUrl}
                                alt="Character picture"
                                height="200px"
                                width="200px"
                                onClick={() => navigate(`/personagens/${character.id}`)}
                            />
                            <CardContent onClick={() => navigate(`/personagens/${character.id}`)}>
                                <Typography component="h1" variant="h6" sx={{ my: 1, textAlign: "center" }}>
                                    {character.name.length > 21 ? character.name.substring(0, 22) + "..." : character.name}
                                </Typography>
                                <Typography component="p" variant="body1" sx={{ mb: 1, textAlign: "center" }} color="text.secondary">
                                    {character.background}
                                </Typography>
                                <Typography component="p" variant="body1" sx={{ mb: 1, textAlign: "center" }} color="text.secondary">
                                    {character.characterClass}
                                </Typography>
                                <Typography component="p" variant="body1" sx={{ mb: 1, textAlign: "center" }} color="text.secondary">
                                    Nex {character.nex}%
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between' }}>
                                <LoadingButton 
                                    onClick={() => handleDeleteCharacter(character.id, character.name)} 
                                    size="regular" 
                                    color="error" 
                                    variant="text"
                                    fullWidth
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
                            </CardActions>
                        </Card>
                    </Grid>
                )) : 
                <Grid item xs={12}>
                    <Typography component="p" variant="body1" sx={{ mb: 1 }} color="text.secondary">
                        Voce ainda não criou nenhum personagem.
                    </Typography>
                    <Typography component="p" variant="body1" sx={{ mb: 0 }} color="text.secondary">
                        Faça isso clicando no botão do menu superior.
                    </Typography>
                </Grid>
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