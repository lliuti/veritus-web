import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../services/api';
import { specifications } from '../../specifications';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
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
    const [description, setDescription] = useState("");
    const [nex, setNex] = useState(0);
    const [buttonFunction, setButtonFunction] = useState("create");
    const [addPowerLoading, setAddPowerLoading] = useState(false);
    const [storedPower, setStoredPower] = useState([]);

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
        setAddPowerLoading(true);
        if (!name) {
            enqueueSnackbar("Digite pelo menos um nome para o poder/habilidade.", { 
                variant: "error"
            });
            setAddPowerLoading(false);
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
        setAddPowerLoading(false);
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

    const handleStoredPowerChange = (event) => {
        setStoredPower(event.target.value);

        let power = [];
        if (powerType == "Poder de Origem") {
            power = specifications.origens.find(p => p.poder.nome == event.target.value);
            setNex("0");
            setName(power.poder.nome);
            setDescription(power.poder.desc);
        } else if (powerType == "Habilidade de Classe") {
            power = specifications.habilidadesDeClasse.find(p => p.nome == event.target.value);
            setName(power.nome);
            setDescription(power.desc);
            setNex("5");
        } else if (powerType == "Habilidade de Trilha") {
            power = specifications.habilidadesDeTrilha.find(p => p.nome == event.target.value);
            setName(power.nome);
            setDescription(power.desc);
            setNex("10");
        } else if (powerType == "Poder de Classe") {
            power = specifications.poderesDeClasse.find(p => p.nome == event.target.value);
            setName(power.nome);
            setDescription(power.desc);
            setNex("15");
        } else if (powerType == "Poder Paranormal") {
            power = specifications.poderParanormal.find(p => p.nome == event.target.value);
            setName(power.nome);
            setDescription(power.desc);
            setNex("15");
        }
        
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <Typography component="h1" variant="h6" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Adicionar Item</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item xs={12} md={6}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="power-type-select-label" color="secondary">Tipo</InputLabel>
                            <Select
                                labelId="power-type-value-select-label"
                                id="power-type-value-select"
                                value={powerType}
                                color="secondary"
                                label="Tipo"
                                onChange={(event) => {
                                    setNex("0");
                                    setName("");
                                    setDescription("");
                                    setPowerType(event.target.value);
                                    setStoredPower("");
                                }}
                            >
                                <MenuItem disabled value="">
                                    <em>Selecione um dos poderes abaixo</em>
                                </MenuItem>
                                <MenuItem value="Poder de Origem">Poder de Origem</MenuItem>
                                <MenuItem value="Habilidade de Classe">Habilidade de Classe</MenuItem>
                                <MenuItem value="Habilidade de Trilha">Habilidade de Trilha</MenuItem>
                                <MenuItem value="Poder de Classe">Poder de Classe</MenuItem>
                                <MenuItem value="Poder Paranormal">Poder Paranormal</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="stored-power-select-label" color="secondary">Selecionar poder cadastrado</InputLabel>
                            <Select
                                labelId="stored-power-value-select-label"
                                id="stored-power-value-select"
                                value={storedPower}
                                color="secondary"
                                label="Tipo"
                                onChange={handleStoredPowerChange}
                            >
                                {(() => {
                                    if (powerType == "Poder Paranormal") {
                                        return (
                                            specifications.poderParanormal.map((poder, index) => {
                                                if (poder.placeholder == true) {
                                                    return (
                                                        <MenuItem disabled value={index}>
                                                            <em>{poder.nome}</em>
                                                        </MenuItem>
                                                    )
                                                } else { 
                                                    return (
                                                        <MenuItem key={index} value={poder.nome}>{poder.nome}</MenuItem>
                                                    )
                                                }
                                            })
                                        )
                                    } else if (powerType == "Poder de Origem") {
                                        return (
                                            specifications.origens.map((origem, index) => (
                                                <MenuItem key={index} value={origem.poder.nome}>{origem.poder.nome} - {origem.background}</MenuItem>
                                            ))
                                        )
                                    } else if (powerType == "Habilidade de Classe") {
                                        return (
                                            specifications.habilidadesDeClasse.map((hab, index) => {
                                                if (hab.placeholder == true) {
                                                    return (
                                                        <MenuItem disabled value={index}>
                                                            <em>{hab.nome}</em>
                                                        </MenuItem>
                                                    )
                                                } else {
                                                    return (
                                                        <MenuItem key={index} value={hab.nome}>{hab.nome}</MenuItem>
                                                    )
                                                }
                                            })
                                        )
                                    } else if (powerType == "Poder de Classe") {
                                        return (
                                            specifications.poderesDeClasse.map((poder, index) => {
                                                if (poder.placeholder == true) {
                                                    return (
                                                        <MenuItem disabled value={index}>
                                                            <em>{poder.nome}</em>
                                                        </MenuItem>
                                                    )
                                                } else {
                                                    return (
                                                        <MenuItem key={index} value={poder.nome}>{poder.nome}</MenuItem>
                                                    )
                                                }
                                            })
                                        )
                                    } else if (powerType == "Habilidade de Trilha") {
                                        return (
                                            specifications.habilidadesDeTrilha.map((hab, index) => {
                                                if (hab.placeholder == true) {
                                                    return (
                                                        <MenuItem disabled value={index}>
                                                            <em>{hab.nome}</em>
                                                        </MenuItem>
                                                    )
                                                } else return (
                                                    <MenuItem key={index} value={hab.nome}>{hab.nome}</MenuItem>
                                                )
                                            })
                                        )
                                    }
                                })()}

                                {/* {poderes[powerType].map((poder) => (
                                    <MenuItem value={poder.nome}>{poder.nome}</MenuItem>
                                ))} */}
                            </Select>
                        </FormControl>
                    </Grid>
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
                            id="nex"
                            label="NEX% que poder foi obtido"
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
                    <Grid item xs={12}>
                        <TextField 
                            id="description" 
                            multiline
                            rows={3}
                            label="Descrição" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            fullWidth
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <LoadingButton 
                            onClick={handlePower} 
                            color="secondary" 
                            variant='text' 
                            endIcon={<SaveAsIcon/>} 
                            size="large" 
                            fullWidth
                            loading={addPowerLoading}
                        >
                                {buttonFunction == "create" ? "Adicionar" : "Atualizar"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}