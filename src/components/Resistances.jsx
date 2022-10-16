import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { api } from '../services/api';

export function Resistances({ characterNotes, fetchCharacter }) {
    const [resistances, setResistances] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setResistances(characterNotes.resistances);
    }, [characterNotes]);

    const handleUpdateNotes = async () => {
        try {
            await api.put(`/characters/${characterNotes.id}/notes`, { 
                resistances,
             });
    
            enqueueSnackbar("Resistencias atualizadas.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar as Resistencias.", { 
                variant: "error"
            });
        }
    }

    return (
        <Grid item xs={12} md={3} sx={{ mt: 5 }}>
            <Typography component="h1" variant="h6" color="inherit" sx={{ mb: 0.4 }}>Resistencias</Typography>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        id="filled-multiline-static"
                        label="ex: RD balístico 5, sangue 3..."
                        multiline
                        rows={4}
                        variant="filled"    
                        size='small'
                        color="secondary"
                        fullWidth
                        value={resistances}
                        onChange={(event) => setResistances(event.target.value)}
                        onBlur={handleUpdateNotes}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}