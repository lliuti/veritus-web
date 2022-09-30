import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { useSnackbar } from "notistack";
import Tooltip from '@mui/material/Tooltip';

export function Attributes({ characterAttributes, fetchCharacter, openDialog }) {
    const [attributeRollOpen, setAttributeRollOpen] = useState(false);
    const [editAttributesOpen, setEditAttributesOpen] = useState(false);
    const [attributeRollDialogInfo, setAttributeRollDialogInfo] = useState([]);
    const [str, setStr] = useState("0");
    const [vig, setVig] = useState("0");
    const [dex, setDex] = useState("0");
    const [cha, setCha] = useState("0");
    const [int, setInt] = useState("0");
    const [attributeRollEnabled, setAttributeRollEnabled] = useState(false);
    const [strRollLoading, setStrRollLoading] = useState(false);
    const [vigRollLoading, setVigRollLoading] = useState(false);
    const [dexRollLoading, setDexRollLoading] = useState(false);
    const [intRollLoading, setIntRollLoading] = useState(false);
    const [chaRollLoading, setChaRollLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fillCharacterAttributes();
    }, [characterAttributes]);

    const fillCharacterAttributes = () => {
        setStr(characterAttributes.str);
        setVig(characterAttributes.vig);
        setDex(characterAttributes.dex);
        setCha(characterAttributes.cha);
        setInt(characterAttributes.int);
    }

    const handleEditAttributesOpen = () => {
        setEditAttributesOpen(true);
    };
    
    const handleEditAttributesClose = () => {
        setEditAttributesOpen(false);
    };

    const handleAttributeRollOpen = async (attribute) => {
        setAttributeRollEnabled(true);
        try {
            const response = await api.post(`/characters/${characterAttributes.id}/roll/attribute`, { attribute });
            setAttributeRollDialogInfo(response.data);
            setAttributeRollOpen(true);
        } catch (err) {
            enqueueSnackbar("Não foi possivel realizar a rolagem de atributo.", { 
                variant: "error"
            });
        }

        setStrRollLoading(false);
        setVigRollLoading(false);
        setDexRollLoading(false);
        setChaRollLoading(false);
        setIntRollLoading(false);
        setAttributeRollEnabled(false);
    }
    
    const handleAttributeRollClose= () => {
        setAttributeRollOpen(false);
    }

    return (
        <Grid item xs={12} sm={4} md={2} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5" color="inherit" sx={{ mb: 1}}>Atributos</Typography>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <LoadingButton 
                        onClick={() => {
                            handleAttributeRollOpen("str")
                            setStrRollLoading(true);
                        }} 
                        loading={strRollLoading}
                        disabled={attributeRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        size='medium' fullWidth>FOR: {str}
                    </LoadingButton>
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton 
                        onClick={() => {
                            handleAttributeRollOpen("vig")
                            setVigRollLoading(true);
                        }} 
                        loading={vigRollLoading}
                        disabled={attributeRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        size='medium' fullWidth>VIG: {vig}
                    </LoadingButton>
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton 
                        onClick={() => {
                            handleAttributeRollOpen("dex")
                            setDexRollLoading(true);
                        }} 
                        loading={dexRollLoading}
                        disabled={attributeRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        size='medium' fullWidth>AGI: {dex}
                    </LoadingButton>
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton 
                        onClick={() => {
                            handleAttributeRollOpen("int")
                            setIntRollLoading(true);
                        }} 
                        loading={intRollLoading}
                        disabled={attributeRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        size='medium' fullWidth>INT: {int}
                    </LoadingButton>
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton 
                        onClick={() => {
                            handleAttributeRollOpen("cha")
                            setChaRollLoading(true);
                        }} 
                        loading={chaRollLoading}
                        disabled={attributeRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        size='medium' fullWidth>PRE: {cha}
                    </LoadingButton>
                </Grid>
                <AttributeRollDialog open={attributeRollOpen} onClose={handleAttributeRollClose} attributeRollDialogInfo={attributeRollDialogInfo}/>
                <Grid item xs={6}>
                    <Button onClick={handleEditAttributesOpen} color="inherit" variant='text' size='medium' fullWidth>Editar</Button>
                    <EditAttributesDialog open={editAttributesOpen} onClose={handleEditAttributesClose} characterAttributes={characterAttributes} fetchCharacter={fetchCharacter} openDialog={openDialog}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

function EditAttributesDialog(props) {
    const { onClose, open, characterAttributes, fetchCharacter, openDialog } = props;

    const [str, setStr] = useState("0");
    const [vig, setVig] = useState("0");
    const [dex, setDex] = useState("0");
    const [cha, setCha] = useState("0");
    const [int, setInt] = useState("0");
    const [updateLoading, setUpdateLoading] = useState(false);
    const [usedPoints, setUsedPoints] = useState(0);
    const [remainingPoints, setRemainingPoints] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setStr(characterAttributes.str);
        setVig(characterAttributes.vig);
        setDex(characterAttributes.dex);
        setCha(characterAttributes.cha);
        setInt(characterAttributes.int);

        calculateAttributePoints();
    }, [characterAttributes]);

    const handleClose = () => {
        onClose();
    };

    const calculateAttributePoints = () => {
        let usedPoints = 0;
        let remainingPoints = 0;
        
        let totalPoints = parseInt(str) + parseInt(vig) + parseInt(dex) + parseInt(cha) + parseInt(int);

        if (parseInt(characterAttributes.nex) < 20) {
            remainingPoints = 4;
        } else if (parseInt(characterAttributes.nex) < 50) {
            remainingPoints = 5;
        } else if (parseInt(characterAttributes.nex) < 80) {
            remainingPoints = 6;
        } else if (parseInt(characterAttributes.nex) < 95) {
            remainingPoints = 7;
        }
        usedPoints = totalPoints - 5

        setUsedPoints(usedPoints);
        setRemainingPoints(remainingPoints);
    }

    const handleUpdateAttributes = async () => {
        // setUpdateLoading(true);
        try {
            onClose();
            openDialog();
            await api.put(`/characters/${characterAttributes.id}/attributes`, { str,vig,dex,cha,int });
            fetchCharacter();
            enqueueSnackbar("Atributos atualizados.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar os atributos.", { 
                variant: "error"
            });
        }
        // setUpdateLoading(false);
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='sm'>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5" color="inherit">Editar Atributos</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Tooltip 
                            title='Pontos a serem distribuídos baseados na % de NEX.' 
                            placement="top-start"
                        >
                            <Typography 
                                component="p" 
                                variant="body1" 
                                color="text.secondary"
                            >
                                Pontos distribuídos {usedPoints}/{remainingPoints}
                            </Typography>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="str-value" 
                            label="Força" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            type="number" 
                            value={str}
                            onChange={(event) => {
                                setStr(event.target.value);
                                // calculateAttributePoints();
                            }}
                            onBlur={calculateAttributePoints}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="vig-value" 
                            label="Vigor" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            type="number" 
                            value={vig}
                            onChange={(event) => {
                                setVig(event.target.value);
                                // calculateAttributePoints();
                            }}
                            onBlur={calculateAttributePoints}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="dex-value" 
                            label="Agilidade" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            type="number" 
                            value={dex}
                            onChange={(event) => {
                                setDex(event.target.value);
                                // calculateAttributePoints();
                            }}
                            onBlur={calculateAttributePoints}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="int-value" 
                            label="Intelecto" 
                            variant="filled" 
                            color="secondary" 
                            size="regular"
                            type="number" 
                            value={int}
                            onChange={(event) => {
                                setInt(event.target.value);
                                // calculateAttributePoints();
                            }}
                            onBlur={calculateAttributePoints}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="cha-value" 
                            label="Presença" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            type="number" 
                            value={cha}
                            onChange={(event) => {
                                setCha(event.target.value);
                                // calculateAttributePoints();
                            }}
                            onBlur={calculateAttributePoints}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'end', mt: 1}}>
                    <Grid item xs={12}>
                        <LoadingButton 
                            onClick={handleUpdateAttributes} 
                            color="secondary" 
                            variant='text' 
                            endIcon={<SaveAsIcon/>} 
                            fullWidth
                            // loading={updateLoading}
                        >
                            Atualizar Atributos
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}

function AttributeRollDialog(props) {
    const { onClose, open, attributeRollDialogInfo } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Typography component="h1" variant="h5" color="inherit" sx={{ px: 2, paddingTop: 2 }}>Rolagem de {attributeRollDialogInfo.attributeName}</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }}>
                    <Grid item xs={12}>
                        <Typography 
                            component="p" 
                            variant="body1" 
                            color="inherit"
                        >
                            Teste: {attributeRollDialogInfo.diceAmount == 0 ? "-1" : attributeRollDialogInfo.diceAmount}d20
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="p" variant="body1" color="inherit">Rolagens: {attributeRollDialogInfo.diceRolls}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="p" variant="body" color="inherit" sx={{ fontWeight: 'bold'}}>Resultado: {attributeRollDialogInfo.testResult}</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'end', mt: 1}}>
                    <Grid item xs={12}>
                        <Button onClick={handleClose} color="secondary" variant='text' endIcon={<SaveAsIcon/>} fullWidth>Fechar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}