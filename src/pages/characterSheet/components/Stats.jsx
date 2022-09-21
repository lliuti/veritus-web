import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../../services/api';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Dialog from '@mui/material/Dialog';

export function Stats({ characterStatus, fetchCharacter }) {
    const [hpDialogOpen, setHpDialogOpen] = useState(false);
    const [sanDialogOpen, setSanDialogOpen] = useState(false);
    const [epDialogOpen, setEpDialogOpen] = useState(false);
    const [currentHp, setCurrentHp] = useState("");
    const [currentEp, setCurrentEp] = useState("");
    const [currentSp, setCurrentSp] = useState("");
    const [maxHp, setMaxHp] = useState("");
    const [maxEp, setMaxEp] = useState("");
    const [maxSp, setMaxSp] = useState("");

    useEffect(() => {
        fillCharacterStatus();
    }, [characterStatus]);

    const fillCharacterStatus = () => {
        setCurrentHp(characterStatus.currentHp);
        setCurrentEp(characterStatus.currentEp);
        setCurrentSp(characterStatus.currentSp);
        setMaxHp(characterStatus.maxHp);
        setMaxEp(characterStatus.maxEp);
        setMaxSp(characterStatus.maxSp);
    }

    const handleHpClickOpen = () => {
        setHpDialogOpen(true);
    };
    
    const handleHpClose = () => {
        setHpDialogOpen(false);
    };
    
    const handleSanClickOpen = () => {
        setSanDialogOpen(true);
    };
    
    const handleSanClose = () => {
        setSanDialogOpen(false);
    };
    
    const handleEpClickOpen = () => {
        setEpDialogOpen(true);
    };
    
    const handleEpClose = () => {
        setEpDialogOpen(false);
    };

    return (
        <Grid item xs={6} sm={4} md={2} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5" color="inherit" sx={{ mb: 1}}>Saúde</Typography>
            <Button onClick={handleHpClickOpen} color="secondary" variant='outlined' endIcon={<FavoriteIcon/>} fullWidth sx={{ my: 0.4 }}>
                PV {currentHp}/{maxHp}
            </Button>
            <HpDialog 
                open={hpDialogOpen} 
                onClose={handleHpClose} 
                currentHp={currentHp} 
                maxHp={maxHp} 
                fetchCharacter={fetchCharacter}
                characterId={characterStatus.id}
                setCurrentHp={setCurrentHp}
                setMaxHp={setMaxHp}
            />

            <Button onClick={handleSanClickOpen} color="secondary" variant='outlined' endIcon={<EmojiEmotionsIcon/>} fullWidth sx={{ my: 0.4 }}>
                PS {currentSp}/{maxSp}
            </Button>
            <SanDialog 
                open={sanDialogOpen} 
                onClose={handleSanClose} 
                currentSp={currentSp} 
                maxSp={maxSp} 
                fetchCharacter={fetchCharacter}
                characterId={characterStatus.id}
                setCurrentSp={setCurrentSp}
                setMaxSp={setMaxSp}
            />

            <Button onClick={handleEpClickOpen} color="secondary" variant='outlined' endIcon={<BatteryCharging90Icon/>} fullWidth sx={{ my: 0.4 }}>
                PE {currentEp}/{maxEp}
            </Button>
            <EpDialog 
                open={epDialogOpen} 
                onClose={handleEpClose} 
                currentEp={currentEp} 
                maxEp={maxEp} 
                fetchCharacter={fetchCharacter}
                characterId={characterStatus.id}
                setCurrentEp={setCurrentEp}
                setMaxEp={setMaxEp}
            />
        </Grid>
    )
}

function HpDialog(props) {
    const { onClose, open, currentHp, maxHp, characterId, setCurrentHp, setMaxHp } = props;

    const [currentHpDialog, setCurrentHpDialog] = useState(0);
    const [maxHpDialog, setMaxHpDialog] = useState(0);
    const [subtractCurrentHpValue, setSubtractCurrentHpValue] = useState(0);
    const [subtractMaxHpValue, setSubtractMaxHpValue] = useState(0);
    const [increaseCurrentHpValue, setIncreaseCurrentHpValue] = useState(0);
    const [increaseMaxHpValue, setIncreaseMaxHpValue] = useState(0);
    const [updateStatusLoading, setUpdateStatusLoading] = useState(false);
    
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setCurrentHpDialog(parseInt(currentHp));
        setMaxHpDialog(parseInt(maxHp));
        setSubtractCurrentHpValue(0);
        setSubtractMaxHpValue(0);
        setIncreaseCurrentHpValue(0);
        setIncreaseMaxHpValue(0);
    }, [currentHp, maxHp])

    const handleHpUpdate = async () => {
        setUpdateStatusLoading(true);
        let newCurrentHp = currentHpDialog;
        let newMaxHp = maxHpDialog;

        if (subtractCurrentHpValue > 0 && increaseCurrentHpValue == 0) {
            newCurrentHp = currentHpDialog - parseInt(subtractCurrentHpValue);
        } else if (subtractCurrentHpValue == 0 && increaseCurrentHpValue > 0) {
            newCurrentHp = currentHpDialog + parseInt(increaseCurrentHpValue);
        };
        
        if (subtractMaxHpValue > 0 && increaseMaxHpValue == 0) {
            newMaxHp = maxHpDialog - parseInt(subtractMaxHpValue);
        } else if (subtractMaxHpValue == 0 && increaseMaxHpValue > 0) {
            newMaxHp = maxHpDialog + parseInt(increaseMaxHpValue);
        };

        try {
            await api.put(`/characters/${characterId}/stats/hp`, {
                current: newCurrentHp,
                max: newMaxHp
            });
            
            setCurrentHp(newCurrentHp);
            setMaxHp(newMaxHp);

            onClose();
            enqueueSnackbar("Pontos de Vida atualizados.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar a vida.", { 
                variant: "error"
            });
        }

        setUpdateStatusLoading(false);
    };
    
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='sm'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Pontos de Vida</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="subtitle1" color="inherit">PV's atuais</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="subtract-current-pv-value" 
                            label="Subtrair de PV atual" 
                            variant="filled" 
                            color="error" 
                            size="small"
                            value={subtractCurrentHpValue}
                            onChange={(event) => {
                                setSubtractCurrentHpValue(event.target.value);
                                setIncreaseCurrentHpValue(0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="change-current-pv-value" 
                            label="PV atual" 
                            variant="filled" 
                            color="error" 
                            size="small" 
                            value={currentHpDialog} 
                            onChange={(event) => setCurrentHpDialog(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="add-current-pv-value" 
                            label="Adicionar em PV atual" 
                            variant="filled" 
                            color="error" 
                            size="small" 
                            value={increaseCurrentHpValue}
                            onChange={(event) => {
                                setIncreaseCurrentHpValue(event.target.value);
                                setSubtractCurrentHpValue(0);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'center', my: 2 }} spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="subtitle1" color="inherit">PV's máximos</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="subtract-max-pv-value" 
                            label="Subtrair de PV máximo" 
                            variant="filled" 
                            color="error" 
                            size="small"
                            value={subtractMaxHpValue}
                            onChange={(event) => {
                                setSubtractMaxHpValue(event.target.value);
                                setIncreaseMaxHpValue(0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="change-max-pv-value" 
                            label="PV máximo" 
                            variant="filled" 
                            color="error" 
                            size="small" 
                            value={maxHpDialog} 
                            onChange={(event) => setMaxHpDialog(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="add-max-pv-value" 
                            label="Adicionar em PV máximo" 
                            variant="filled" 
                            color="error" 
                            size="small"
                            value={increaseMaxHpValue}
                            onChange={(event) => {
                                setIncreaseMaxHpValue(event.target.value);
                                setSubtractMaxHpValue(0);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'end'}}>
                    <Grid item xs={12}>
                        <LoadingButton loading={updateStatusLoading} onClick={handleHpUpdate} color="error" variant='text' endIcon={<SaveAsIcon/>} fullWidth>Atualizar Vida</LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}

function SanDialog(props) {
    const { onClose, open, currentSp, maxSp, characterId, setCurrentSp, setMaxSp } = props;

    const [currentSpDialog, setCurrentSpDialog] = useState(0);
    const [maxSpDialog, setMaxSpDialog] = useState(0);
    const [subtractCurrentSpValue, setSubtractCurrentSpValue] = useState(0);
    const [subtractMaxSpValue, setSubtractMaxSpValue] = useState(0);
    const [increaseCurrentSpValue, setIncreaseCurrentSpValue] = useState(0);
    const [increaseMaxSpValue, setIncreaseMaxSpValue] = useState(0);
    const [updateStatusLoading, setUpdateStatusLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setCurrentSpDialog(parseInt(currentSp));
        setMaxSpDialog(parseInt(maxSp));
        setSubtractCurrentSpValue(0);
        setSubtractMaxSpValue(0);
        setIncreaseCurrentSpValue(0);
        setIncreaseMaxSpValue(0);
    }, [currentSp, maxSp])

    const handleSpUpdate = async () => {
        setUpdateStatusLoading(true);
        let newCurrentSp = currentSpDialog;
        let newMaxSp = maxSpDialog;

        if (subtractCurrentSpValue > 0 && increaseCurrentSpValue == 0) {
            newCurrentSp = currentSpDialog - parseInt(subtractCurrentSpValue);
        } else if (subtractCurrentSpValue == 0 && increaseCurrentSpValue > 0) {
            newCurrentSp = currentSpDialog + parseInt(increaseCurrentSpValue);
        };
        
        if (subtractMaxSpValue > 0 && increaseMaxSpValue == 0) {
            newMaxSp = maxSpDialog - parseInt(subtractMaxSpValue);
        } else if (subtractMaxSpValue == 0 && increaseMaxSpValue > 0) {
            newMaxSp = maxSpDialog + parseInt(increaseMaxSpValue);
        };

        
        try {
            await api.put(`/characters/${characterId}/stats/sp`, {
                current: newCurrentSp,
                max: newMaxSp
            });

            setCurrentSp(newCurrentSp);
            setMaxSp(newMaxSp);

            onClose();
            enqueueSnackbar("Pontos de Sanidade atualizados.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar a sanidade.", { 
                variant: "error"
            });
        }

        setUpdateStatusLoading(false);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='sm'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Pontos de Sanidade</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="subtitle1" color="inherit">PS's atuais</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="subtract-current-ps-value" 
                            label="Subtrair PS" 
                            variant="filled" 
                            color="primary" 
                            size="small"
                            value={subtractCurrentSpValue}
                            onChange={(event) => {
                                setSubtractCurrentSpValue(event.target.value);
                                setIncreaseCurrentSpValue(0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="change-current-ps-value" 
                            label="PS atual" 
                            variant="filled" 
                            color="primary" 
                            size="small"
                            value={currentSpDialog} 
                            onChange={(event) => setCurrentSpDialog(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="add-current-ps-value" 
                            label="Adicionar PS" 
                            variant="filled" 
                            color="primary" 
                            size="small" 
                            value={increaseCurrentSpValue}
                            onChange={(event) => {
                                setIncreaseCurrentSpValue(event.target.value);
                                setSubtractCurrentSpValue(0);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'center', my: 2 }} spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="subtitle1" color="inherit">PS's máximos</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="subtract-max-ps-value" 
                            label="Subtrair PS" 
                            variant="filled" 
                            color="primary" 
                            size="small"
                            value={subtractMaxSpValue}
                            onChange={(event) => {
                                setSubtractMaxSpValue(event.target.value);
                                setIncreaseMaxSpValue(0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="change-max-ps-value" 
                            label="PS máximo" 
                            variant="filled" 
                            color="primary" 
                            size="small"
                            value={maxSpDialog} 
                            onChange={(event) => setMaxSpDialog(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="add-max-ps-value" 
                            label="Adicionar PS" 
                            variant="filled" 
                            color="primary" 
                            size="small"
                            value={increaseMaxSpValue}
                            onChange={(event) => {
                                setIncreaseMaxSpValue(event.target.value);
                                setSubtractMaxSpValue(0);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'end'}}>
                    <Grid item xs={12}>
                        <LoadingButton loading={updateStatusLoading} onClick={handleSpUpdate} color="primary" variant='text' endIcon={<SaveAsIcon/>} fullWidth>Atualizar Sanidade</LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}

function EpDialog(props) {
    const { onClose, open, currentEp, maxEp, characterId, setCurrentEp, setMaxEp } = props;

    const [currentEpDialog, setCurrentEpDialog] = useState(0);
    const [maxEpDialog, setMaxEpDialog] = useState(0);
    const [subtractCurrentEpValue, setSubtractCurrentEpValue] = useState(0);
    const [subtractMaxEpValue, setSubtractMaxEpValue] = useState(0);
    const [increaseCurrentEpValue, setIncreaseCurrentEpValue] = useState(0);
    const [increaseMaxEpValue, setIncreaseMaxEpValue] = useState(0);
    const [updateStatusLoading, setUpdateStatusLoading] = useState(false);
    
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setCurrentEpDialog(parseInt(currentEp));
        setMaxEpDialog(parseInt(maxEp));
        setSubtractCurrentEpValue(0);
        setSubtractMaxEpValue(0);
        setIncreaseCurrentEpValue(0);
        setIncreaseMaxEpValue(0);
    }, [currentEp, maxEp])

    const handleEpUpdate = async () => {
        setUpdateStatusLoading(true);
        let newCurrentEp = currentEpDialog;
        let newMaxEp = maxEpDialog;

        if (subtractCurrentEpValue > 0 && increaseCurrentEpValue == 0) {
            newCurrentEp = currentEpDialog - parseInt(subtractCurrentEpValue);
        } else if (subtractCurrentEpValue == 0 && increaseCurrentEpValue > 0) {
            newCurrentEp = currentEpDialog + parseInt(increaseCurrentEpValue);
        };
        
        if (subtractMaxEpValue > 0 && increaseMaxEpValue == 0) {
            newMaxEp = maxEpDialog - parseInt(subtractMaxEpValue);
        } else if (subtractMaxEpValue == 0 && increaseMaxEpValue > 0) {
            newMaxEp = maxEpDialog + parseInt(increaseMaxEpValue);
        };

        
        try {
            await api.put(`/characters/${characterId}/stats/ep`, {
                current: newCurrentEp,
                max: newMaxEp
            });

            setCurrentEp(newCurrentEp);
            setMaxEp(newMaxEp);
            
            onClose();
            enqueueSnackbar("Pontos de Esforço atualizados.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar o esforço.", { 
                variant: "error"
            });
        }

        setUpdateStatusLoading(false);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='sm'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Pontos de Esforço</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="subtitle1" color="inherit">PE's atuais</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="subtract-current-ep-value" 
                            label="Subtrair PE" 
                            variant="filled" 
                            color="warning" 
                            size="small"
                            value={subtractCurrentEpValue}
                            onChange={(event) => {
                                setSubtractCurrentEpValue(event.target.value);
                                setIncreaseCurrentEpValue(0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="change-current-ep-value" 
                            label="PE atual" 
                            variant="filled" 
                            color="warning" 
                            size="small"
                            value={currentEpDialog} 
                            onChange={(event) => setCurrentEpDialog(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="add-current-ep-value" 
                            label="Adicionar PE" 
                            variant="filled" 
                            color="warning" 
                            size="small" 
                            value={increaseCurrentEpValue}
                            onChange={(event) => {
                                setIncreaseCurrentEpValue(event.target.value);
                                setSubtractCurrentEpValue(0);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'center', my: 2 }} spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="subtitle1" color="inherit">PE's máximos</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="subtract-max-ep-value" 
                            label="Subtrair PE" 
                            variant="filled" 
                            color="warning" 
                            size="small"
                            value={subtractMaxEpValue}
                            onChange={(event) => {
                                setSubtractMaxEpValue(event.target.value);
                                setIncreaseMaxEpValue(0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="change-max-ep-value" 
                            label="PE máximo" 
                            variant="filled" 
                            color="warning" 
                            size="small"
                            value={maxEpDialog} 
                            onChange={(event) => setMaxEpDialog(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="add-max-ep-value" 
                            label="Adicionar PE" 
                            variant="filled" 
                            color="warning" 
                            size="small"
                            value={increaseMaxEpValue}
                            onChange={(event) => {
                                setIncreaseMaxEpValue(event.target.value);
                                setSubtractMaxEpValue(0);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'end'}}>
                    <Grid item xs={12}>
                        <LoadingButton loading={updateStatusLoading} onClick={handleEpUpdate} color="warning" variant='text' endIcon={<SaveAsIcon/>} fullWidth>Atualizar Esforço</LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}
