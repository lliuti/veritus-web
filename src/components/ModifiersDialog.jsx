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
    const [hpModByNex, setHpModByNex] = useState('0');
    const [epModByNex, setEpModByNex] = useState('0');
    const [spModByNex, setSpModByNex] = useState('0');
    const [hpMod, setHpMod] = useState('0');
    const [epMod, setEpMod] = useState('0');
    const [spMod, setSpMod] = useState('0');
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
                    <Typography component="h1" variant="h6" color="inherit" sx={{ mt: 2}}>Editar Modificadores</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Tooltip 
                        title='O valor preenchido nesse campo será calculado para cada NEX acima de 0% (ou seja, de 5% em diante).' 
                        placement="top"
                    >
                        <TextField
                            type="number"
                            inputProps={{ min: "0", step: "1" }}
                            id="hpModifierByNex"
                            label="Modif. PV p/ NEX"
                            name="hpModifierByNex"
                            variant="filled"
                            fullWidth
                            color='secondary'
                            value={hpModByNex || '0'}
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
                            id="sanModifierByNex"
                            label="Modif. PS p/ NEX"
                            name="sanModifierByNex"
                            variant="filled"
                            fullWidth
                            color='secondary'
                            value={spModByNex || '0'}
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
                            id="epModifierByNex"
                            label="Modif. PE p/ NEX"
                            name="epModifierByNex"
                            variant="filled"
                            fullWidth
                            color='secondary'
                            value={epModByNex || '0'}
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
                            id="hpModifier"
                            label="Modif. PV geral"
                            name="hpModifier"
                            fullWidth
                            type="number"
                            variant="filled"
                            color='secondary'
                            value={hpMod || '0'}
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
                            id="sanModifier"
                            label="Modif. PS geral"
                            name="sanModifier"
                            variant="filled"
                            fullWidth
                            type="number"
                            color='secondary'
                            value={spMod || '0'}
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
                            id="epModifier"
                            label="Modif. PE geral"
                            name="epModifier"
                            variant="filled"
                            fullWidth
                            type="number"
                            color='secondary'
                            value={epMod || '0'}
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