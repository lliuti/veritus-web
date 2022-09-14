import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../services/api';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SaveAsIcon from '@mui/icons-material/SaveAs';

export const AddPowerDialog = (props) => {
    const { onClose, open, fetchCharacter, characterId, powerToEdit } = props;
    
    const [name, setName] = useState("");
    const [powerType, setPowerType] = useState("Poder de Origem");
    // const [powerOrigin, setPowerOrigin] = useState("");
    const [description, setDescription] = useState("");
    const [nex, setNex] = useState(0);
    const [buttonFunction, setButtonFunction] = useState("create");

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
        setButtonFunction("create");
    };

    useEffect(() => {
        if (Object.keys(powerToEdit).length !== 0) {
            setButtonFunction("update");
            setName(powerToEdit.name)
            setPowerType(powerToEdit.powerType)
            // setPowerOrigin(powerToEdit.powerOrigin)
            setDescription(powerToEdit.description)
            setNex(powerToEdit.nex);
        };
    }, [powerToEdit])


    const handlePower = async () => {
        if (!name) {
            enqueueSnackbar("Digite pelo menos um nome para o poder/habilidade.", { 
                variant: "error"
            });
            return;
        }

        if (buttonFunction == "create") {
            try {
                await api.post(`/characters/${characterId}/power`, {
                    name,
                    description,
                    powerType,
                    // powerOrigin,
                    nex: nex.toString()
                });
        
                enqueueSnackbar("Poder adicionado.", { 
                    variant: "info"
                });
            } catch (err) {
                enqueueSnackbar("Não foi possível adicionar esse poder.", { 
                    variant: "error"
                });
            }
        } else if (buttonFunction == "update") {
            try {
                await api.put(`/characters/${characterId}/power/${powerToEdit.id}`, {
                    name,
                    description,
                    powerType,
                    // powerOrigin,
                    nex: nex.toString()
                });
        
                enqueueSnackbar("Poder atualizado.", { 
                    variant: "info"
                });
            } catch (err) {
                enqueueSnackbar("Não foi possível atualizar esse poder.", { 
                    variant: "error"
                });
            }
        }


        setName("")
        setPowerType("")
        // setPowerOrigin("")
        setDescription("")
        setNex(0);
        fetchCharacter();
        onClose();
        setButtonFunction("create");
    }   

    const handleNexChange = (event) => {
        if ((nex == 95 || nex == "95") && event.target.value == "100") {
            setNex("99");
        } else if ((nex == 99 || nex == "99") && event.target.value == "100") {
            setNex("99");
        } else {
            setNex(event.target.value)
        }
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Adicionar Item</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            id="name" 
                            label="Nome" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            fullWidth
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            id="description" 
                            label="Descrição" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            fullWidth
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="power-type-select-label" color="secondary">Tipo</InputLabel>
                            <Select
                                labelId="power-type-value-select-label"
                                id="power-type-value-select"
                                value={powerType}
                                color="secondary"
                                label="Tipo"
                                onChange={(event) => setPowerType(event.target.value)}
                            >
                                <MenuItem value="Poder de Origem">Poder de Origem</MenuItem>
                                <MenuItem value="Habilidade de Classe">Habilidade de Classe</MenuItem>
                                <MenuItem value="Habilidade de Trilha">Habilidade de Trilha</MenuItem>
                                <MenuItem value="Poder de Classe">Poder de Classe</MenuItem>
                                <MenuItem value="Poder Paranormal">Poder Paranormal</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="nex"
                            label="NEX %"
                            name="nex"
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "5" }}
                            fullWidth
                            variant="filled"
                            color='secondary'
                            value={nex || 0}
                            onChange={handleNexChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Button onClick={handlePower} color="secondary" variant='text' endIcon={<SaveAsIcon/>} size="large" fullWidth>{buttonFunction == "create" ? "Adicionar" : "Atualizar"}</Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}