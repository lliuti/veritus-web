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
        await api.put(`/characters/${characterNotes.id}/notes`, { 
            resistances,
            quickNotes
         });

        fetchCharacter();
        enqueueSnackbar("Anotações atualizadas.", { 
            variant: "info"
        });
    }

    return (
        <Grid item xs={12} sm={12} md={6} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
                <Grid item md={6}>
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
                <Grid item md={6}>
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