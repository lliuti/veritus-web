import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../services/api';

import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

export const DeleteCharacterDialog = (props) => {
    const { onClose, open, characterId, characterName, fetchMyCharacters } = props;
    const [deleteCharacterLoading, setDeleteCharacterLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
    };

    const handleDelete = async () => {
        setDeleteCharacterLoading(true);
        try {
            await api.delete(`/characters/${characterId}`);
            enqueueSnackbar("Personagem deletado.", { 
                variant: "info"
            });
            fetchMyCharacters();
        } catch (err) {
            enqueueSnackbar("Não foi possível deletar esse personagem.", { 
                variant: "error"
            });
        }
        setDeleteCharacterLoading(false);
        onClose();
    }   

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
            <Grid container sx={{ p: 2 }}>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography 
                        component="h1" 
                        variant="h5" 
                        color="inherit"
                    >
                        Tem certeza?
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography 
                        component="p" 
                        variant="body" 
                        color="inherit"
                    >
                        Voce realmente quer excluir o personagem "<strong>{characterName}
                    </strong>" permanentemente?</Typography>
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography 
                        component="p" 
                        variant="body" 
                        color="inherit"
                    >
                        Essa ação é irreversível!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton 
                        color="error" 
                        variant='text' 
                        size="large" 
                        fullWidth
                        onClick={handleDelete}
                        loading={deleteCharacterLoading}
                    >
                        Deletar para sempre
                    </LoadingButton>
                </Grid>
            </Grid>
        </Dialog>
    )
}