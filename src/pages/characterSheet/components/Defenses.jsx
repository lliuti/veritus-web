import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { api } from '../../../services/api';

export function Defenses({ characterDefenses, fetchCharacter }) {
    const [passive, setPassive] = useState('');
    const [dodging, setDodging] = useState('');
    
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fillCharacterDefenses();
    }, [characterDefenses]);

    const fillCharacterDefenses = () => {
        setPassive(characterDefenses.passive);
        setDodging(characterDefenses.dodging);
    }

    const handleUpdateDefenses = async () => {
        try {
            await api.put(`/characters/${characterDefenses.id}/defenses`, { 
                passive,
                dodging
             });

            enqueueSnackbar("Defesas atualizadas.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar as defesas.", { 
                variant: "error"
            });
        }

    }

    return (
        <Grid item xs={12} sm={4} md={1} sx={{ mt: 5 }}>
            <Typography component="h1" variant="h6" color="inherit" sx={{ mb: 1}}>Defesa</Typography>
            <Grid container spacing={1}>
                <Grid item xs={6} md={12}>
                    <Tooltip 
                        title='10 + Agi + Outros' 
                        placement="top-start"
                    >
                        <TextField
                            size='small'
                            id="passive"
                            label="Passiva"
                            name="passive"
                            variant="filled"
                            color='secondary'
                            fullWidth
                            value={passive || ''}
                            onChange={(event) => setPassive(event.target.value)}
                            onBlur={handleUpdateDefenses}
                            sx={{ mb: 1, mt: 0}}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={6} md={12}>
                    <Tooltip 
                        title='Passiva + Reflexos' 
                        placement="top-start"
                    >
                        <TextField
                            size='small'
                            id="dodging"
                            label="Esquivando"
                            name="dodging"
                            variant="filled"
                            color='secondary'
                            value={dodging || ''}
                            onChange={(event) => setDodging(event.target.value)}
                            onBlur={handleUpdateDefenses}
                            fullWidth
                            sx={{ mb: 1, mt: 0}}
                        />
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    )
}