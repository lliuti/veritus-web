import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { api } from '../services/api';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

export function ModifiersDialog({ onClose, open, characterId, modifiers, characterClass }) {
    const [hpModByNex, setHpModByNex] = useState('');
    const [epModByNex, setEpModByNex] = useState('');
    const [spModByNex, setSpModByNex] = useState('');
    const [hpMod, setHpMod] = useState('');
    const [epMod, setEpMod] = useState('');
    const [spMod, setSpMod] = useState('');
    const [transcendencias, setTranscendencias] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setHpModByNex(modifiers.hpModByNex);
        setEpModByNex(modifiers.epModByNex);
        setSpModByNex(modifiers.spModByNex);
        setHpMod(modifiers.hpMod);
        setEpMod(modifiers.epMod);
        setSpMod(modifiers.spMod);
        setTranscendencias(modifiers.transcendences);
    }, [characterId])

    const handleUpdateCharacterModifiers = async () => {
        try {
            await api.put(`/characters/${characterId}/modifiers`, {
                hpModByNex,
                epModByNex,
                spModByNex,
                hpMod,
                epMod,
                spMod,
                transcendences: parseInt(transcendencias)
            });
    
            enqueueSnackbar("Modificadores atualizados.", { 
                variant: "info"
            });

            handleClose();
        } catch (err) {
            console.log(err);
            enqueueSnackbar("Não foi possível atualizar os modificadores.", { 
                variant: "error"
            });
        }

    }

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <Grid container spacing={1} sx={{ px: 2, pb: 2}}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" color="inherit" sx={{ mt: 2}}>Editar Modificadores</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Tooltip 
                        title='O valor preenchido nesse campo será calculado para cada NEX acima de 0% (ou seja, de 5% em diante).' 
                        placement="top"
                    >
                        <TextField
                            type="number"
                            inputProps={{ min: "0", step: "1" }}
                            margin="normal"
                            id="hpModifierByNex"
                            label="Modif. PV p/ NEX"
                            name="hpModifierByNex"
                            variant="filled"
                            fullWidth
                            color='secondary'
                            value={hpModByNex || ''}
                            onChange={(event) => setHpModByNex(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Tooltip 
                        title='O valor preenchido nesse campo será calculado para cada NEX acima de 0% (ou seja, de 5% em diante).' 
                        placement="top"
                    >
                        <TextField
                            type="number"
                            inputProps={{ min: "0", step: "1" }}
                            margin="normal"
                            id="sanModifierByNex"
                            label="Modif. PS p/ NEX"
                            name="sanModifierByNex"
                            variant="filled"
                            fullWidth
                            color='secondary'
                            value={spModByNex || ''}
                            onChange={(event) => setSpModByNex(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Tooltip 
                        title='O valor preenchido nesse campo será calculado para cada NEX acima de 0% (ou seja, de 5% em diante).' 
                        placement="top"
                    >    
                        <TextField
                            type="number"
                            inputProps={{ min: "0", step: "1" }}
                            margin="normal"
                            id="epModifierByNex"
                            label="Modif. PE p/ NEX"
                            name="epModifierByNex"
                            variant="filled"
                            fullWidth
                            color='secondary'
                            value={epModByNex || ''}
                            onChange={(event) => setEpModByNex(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Tooltip 
                        title='Este campo aceita valores negativos e é aplicado após todos os outros cálculos.' 
                        placement="top"
                    >    
                        <TextField
                            margin="normal"
                            id="hpModifier"
                            label="Modif. PV geral"
                            name="hpModifier"
                            fullWidth
                            type="number"
                            variant="filled"
                            color='secondary'
                            value={hpMod || ''}
                            onChange={(event) => setHpMod(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Tooltip 
                        title='Este campo aceita valores negativos e é aplicado após todos os outros cálculos.' 
                        placement="top"
                    >
                        <TextField
                            margin="normal"
                            id="sanModifier"
                            label="Modif. PS geral"
                            name="sanModifier"
                            variant="filled"
                            fullWidth
                            type="number"
                            color='secondary'
                            value={spMod || ''}
                            onChange={(event) => setSpMod(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Tooltip 
                        title='Este campo aceita valores negativos e é aplicado após todos os outros cálculos.' 
                        placement="top"
                    >
                        <TextField
                            margin="normal"
                            id="epModifier"
                            label="Modif. PE geral"
                            name="epModifier"
                            variant="filled"
                            fullWidth
                            type="number"
                            color='secondary'
                            value={epMod || ''}
                            onChange={(event) => setEpMod(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Tooltip 
                        title='Este campo descontará a sanidade máxima do personagem com base na classe.' 
                        placement="top-start"
                    >
                        <TextField
                            margin="normal"
                            id="transcendencias"
                            label="Quantas vezes o personagem transcendeu?"
                            name="transcendencias"
                            variant="filled"
                            fullWidth
                            color='secondary'
                            type="number"
                            value={transcendencias || 0}
                            onChange={(event) => setTranscendencias(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={handleUpdateCharacterModifiers} 
                        color="secondary" 
                        variant='text'
                        size="large"
                        fullWidth
                    >
                        Atualizar
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
}