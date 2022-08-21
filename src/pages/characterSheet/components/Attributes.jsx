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

export function Attributes({ characterAttributes, fetchCharacter }) {
    const [attributeRollOpen, setAttributeRollOpen] = useState(false);
    const [editAttributesOpen, setEditAttributesOpen] = useState(false);
    const [attributeRollDialogInfo, setAttributeRollDialogInfo] = useState([]);
    const [str, setStr] = useState("0");
    const [vig, setVig] = useState("0");
    const [dex, setDex] = useState("0");
    const [cha, setCha] = useState("0");
    const [int, setInt] = useState("0");

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
        const response = await api.post(`/characters/${characterAttributes.id}/roll/attribute`, { attribute });
        setAttributeRollDialogInfo(response.data);
        setAttributeRollOpen(true);
    }
    
    const handleAttributeRollClose= () => {
        setAttributeRollOpen(false);
    }

    return (
        <Grid item xs={6} sm={4} md={2} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5" color="inherit" sx={{ mb: 1}}>Atributos</Typography>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Button onClick={() => handleAttributeRollOpen("str")} color="secondary" variant='outlined' size='medium' fullWidth>FOR: {str}</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => handleAttributeRollOpen("vig")} color="secondary" variant='outlined' size='medium' fullWidth>VIG: {vig}</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => handleAttributeRollOpen("dex")} color="secondary" variant='outlined' size='medium' fullWidth>AGI: {dex}</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => handleAttributeRollOpen("int")} color="secondary" variant='outlined' size='medium' fullWidth>INT: {int}</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => handleAttributeRollOpen("cha")} color="secondary" variant='outlined' size='medium' fullWidth>PRE: {cha}</Button>
                </Grid>
                <AttributeRollDialog open={attributeRollOpen} onClose={handleAttributeRollClose} attributeRollDialogInfo={attributeRollDialogInfo}/>
                <Grid item xs={6}>
                    <Button onClick={handleEditAttributesOpen} color="inherit" variant='text' size='medium' fullWidth>Editar</Button>
                    <EditAttributesDialog open={editAttributesOpen} onClose={handleEditAttributesClose} characterAttributes={characterAttributes} fetchCharacter={fetchCharacter}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

function EditAttributesDialog(props) {
    const { onClose, open, characterAttributes, fetchCharacter } = props;

    const [str, setStr] = useState("0");
    const [vig, setVig] = useState("0");
    const [dex, setDex] = useState("0");
    const [cha, setCha] = useState("0");
    const [int, setInt] = useState("0");
    const [updateLoading, setUpdateLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setStr(characterAttributes.str);
        setVig(characterAttributes.vig);
        setDex(characterAttributes.dex);
        setCha(characterAttributes.cha);
        setInt(characterAttributes.int);
    }, [characterAttributes]);

    const handleClose = () => {
        onClose();
    };

    const handleUpdateAttributes = async () => {
        setUpdateLoading(true);
        await api.put(`/characters/${characterAttributes.id}/attributes`, { str,vig,dex,cha,int });
        
        fetchCharacter();
        onClose();
        setUpdateLoading(false);
        enqueueSnackbar("Atributos atualizados.", { 
            variant: "info"
        });
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='sm'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Editar Atributos</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item xs={6}>
                        <TextField 
                            id="str-value" 
                            label="Força" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            type="number" 
                            value={str}
                            onChange={(event) => setStr(event.target.value)}
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
                            onChange={(event) => setVig(event.target.value)}
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
                            onChange={(event) => setDex(event.target.value)}
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
                            onChange={(event) => setInt(event.target.value)}
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
                            onChange={(event) => setCha(event.target.value)}
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
                            loading={updateLoading}
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