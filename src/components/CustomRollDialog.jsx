import { useState } from 'react';
import { FaDiceD20 } from "react-icons/fa";
import { api } from "../services/api";
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';

export const CustomRollDialog = (props) => {
    const { onClose, open, characterId } = props;
    const [rollInput, setRollInput] = useState("");
    const [checked, setChecked] = useState(false);
    const [customRollLoading, setCustomRollLoading] = useState(false);
    const [rollResultDialogOpen, setRollResultDialogOpen] = useState(false);
    const [customRollInfo, setCustomRollInfo] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
        setRollInput("");
        setChecked(true);
    }

    const handleCustomRoll = async () => {
        if (!rollInput) return;

        setCustomRollLoading(true);
        try {
            if (checked) {
                const response = await api.post(`/characters/${characterId}/roll/check`, {
                    input: rollInput.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                });
                setCustomRollInfo(response.data);
                handleClose();
                setRollResultDialogOpen(true);
            } else {
                const damageArray = [];
                damageArray.push({ damage: rollInput, type: 'Custom' });

                const response = await api.post(`/characters/${characterId}/roll/damage`, {
                    attack: { 
                        damage: JSON.stringify(damageArray), 
                        attack: "Customizada", 
                        criticalDamage: "" 
                    },
                    type: "damage"
                });
                setCustomRollInfo(response.data);
                handleClose();
                setRollResultDialogOpen(true);
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar("Não foi possível realizar a rolagem customizada.", { 
                variant: "error"
            });
        }
        setCustomRollLoading(false);
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open} fullWidth>
                <Box component="div" sx={{ p: 2 }}>
                    <Typography component="h1" variant="h6" color="inherit" sx={{ mb: 1 }}>Rolagem customizada</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography 
                                component="p" 
                                variant="body" 
                                color="text.secondary"
                            >
                                Evite acentos e espaços.
                            </Typography>
                            <Typography 
                                component="p" 
                                variant="body" 
                                color="text.secondary"
                                sx={{ fontStyle: "italic" }}
                            >
                                Um exemplo de rolagem correta é: 1d20+7
                            </Typography>
                            <Typography 
                                component="p" 
                                variant="body" 
                                color="text.secondary"
                                sx={{ fontStyle: "italic" }}
                            >
                                Um exemplo de rolagem errada é: d20 + 7
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                color="secondary"
                                fullWidth
                                id="rollInput"
                                label="Rolagem"
                                name="rollInput"
                                variant="filled"
                                value={rollInput}
                                onChange={(event) => setRollInput(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Typography 
                                    component="p" 
                                    variant="body2" 
                                    color={checked == true ? "text.secondary" : "inherit"}
                                >
                                    Dano (somar dados)
                                </Typography>
                                <Switch 
                                    color="primary" 
                                    checked={checked} 
                                    onChange={(event) => setChecked(event.target.checked)} 
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <Typography 
                                    component="p" 
                                    variant="body2" 
                                    color={checked == false ? "text.secondary" : "inherit"}
                                >
                                    Teste (maior dado)
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton 
                                onClick={handleCustomRoll} 
                                fullWidth 
                                endIcon={<FaDiceD20/>} 
                                size="large"
                                loading={customRollLoading}
                            >
                                Rolar 
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
            <RollResult
                onClose={() => setRollResultDialogOpen(false)}
                open={rollResultDialogOpen}
                customRollInfo={customRollInfo}
            />
        </>
    )
};

const RollResult = (props) => {
    const { onClose, open, customRollInfo } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <Typography component="h1" variant="h6" color="inherit" sx={{ px: 2, paddingTop: 2 }}>Resultado de rolagem customizada</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }}>
                    <Grid item xs={12}>
                        <Typography 
                            component="p" 
                            variant="body1" 
                            color="inherit"
                        >
                            Dados: {customRollInfo.resultValues !== undefined ? customRollInfo.resultValues[0].damageRoll : customRollInfo.input}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="p" variant="body1" color="inherit">Rolagens: {customRollInfo.resultValues !== undefined ? customRollInfo.resultValues[0].diceRolls: customRollInfo.diceRolls}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="p" variant="body" color="inherit" sx={{ fontWeight: 'bold'}}>Resultado: {customRollInfo.resultValues !== undefined ? customRollInfo.resultValues[0].testResult : customRollInfo.testResult}</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'end', mt: 1}}>
                    <Grid item xs={12}>
                        <Button onClick={handleClose} color="secondary" variant='text' fullWidth>Fechar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}