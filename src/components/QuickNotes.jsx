import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { api } from '../services/api';

export function QuickNotes({ characterNotes, fetchCharacter }) {
    const [quickNotes, setQuickNotes] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setQuickNotes(characterNotes.quickNotes);
    }, [characterNotes]);

    const handleUpdateNotes = async () => {
        try {
            await api.put(`/characters/${characterNotes.id}/notes`, {
                quickNotes
             });
    
            enqueueSnackbar("Anotações atualizadas.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar as Anotações.", { 
                variant: "error"
            });
        }

    }

    return (
        // <Grid item xs={12} md={3} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6} sx={{ mt: 4 }}>
            <Typography component="h1" variant="h6" color="inherit" sx={{ mb: 0.4}}>Notas Rápidas</Typography>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        id="filled-multiline-static"
                        label="ex: Iniciei 1 turno morrendo..."
                        multiline
                        rows={4}
                        variant="filled"    
                        size="small"
                        color="secondary"
                        fullWidth
                        value={quickNotes}
                        onChange={(event) => setQuickNotes(event.target.value)}
                        onBlur={handleUpdateNotes}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}