import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { api } from '../../../services/api';

export function Notes({ characterNotes, fetchCharacter }) {
    const [resistances, setResistances] = useState("");
    const [quickNotes, setQuickNotes] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setResistances(characterNotes.resistances);
        setQuickNotes(characterNotes.quickNotes);
    }, [characterNotes]);

    const handleUpdateNotes = async () => {
        try {
            await api.put(`/characters/${characterNotes.id}/notes`, { 
                resistances,
                quickNotes
             });
    
            fetchCharacter();
            enqueueSnackbar("Anotações/Resistencias atualizadas.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar as Resistencias/Anotações.", { 
                variant: "error"
            });
        }

    }

    return (
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h5" color="inherit" sx={{ mb: 1}}>Resistencias</Typography>
                    <TextField
                        id="filled-multiline-static"
                        label="ex: RD balístico 5, sangue 3..."
                        multiline
                        rows={4}
                        variant="filled"    
                        size='large'
                        color="secondary"
                        fullWidth
                        value={resistances}
                        onChange={(event) => setResistances(event.target.value)}
                        onBlur={handleUpdateNotes}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h5" color="inherit" sx={{ mb: 1}}>Notas Rápidas</Typography>
                    <TextField
                        id="filled-multiline-static"
                        label="ex: Iniciei 1 turno morrendo..."
                        multiline
                        rows={4}
                        variant="filled"    
                        size='large'
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