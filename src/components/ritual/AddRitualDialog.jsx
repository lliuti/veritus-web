import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../services/api';
import { ritualsJSON } from "../../rituals.js";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SaveAsIcon from '@mui/icons-material/SaveAs';

export const AddRitualDialog = (props) => {
    const { onClose, open, fetchCharacter, characterId, ritualToEdit } = props;
    
    const [buttonFunction, setButtonFunction] = useState("create");
    const [name, setName] = useState("");
    const [element, setElement] = useState("");
    const [circle, setCircle] = useState("");
    const [execution, setExecution] = useState("");
    const [range, setRange] = useState("");
    const [target, setTarget] = useState("");
    const [duration, setDuration] = useState("");
    const [resistance, setResistance] = useState("");
    const [description, setDescription] = useState("");
    const [briefDescription, setBriefDescription] = useState("");
    const [ascended, setAscended] = useState("");
    const [awoken, setAwoken] = useState("");
    const [addRitualLoading, setAddRitualLoading] = useState(false);

    const [storedRitual, setStoredRitual] = useState([]);

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
        setButtonFunction("create");
    };

    useEffect(() => {
        if (Object.keys(ritualToEdit).length !== 0) {
            setButtonFunction("update");
            setName(ritualToEdit.name)
            setElement(ritualToEdit.element)
            setCircle(ritualToEdit.circle)
            setExecution(ritualToEdit.execution)
            setRange(ritualToEdit.range)
            setTarget(ritualToEdit.target)
            setDuration(ritualToEdit.duration)
            setResistance(ritualToEdit.resistance)
            setDescription(ritualToEdit.description)
            setBriefDescription(ritualToEdit.briefDescription)
            setAscended(ritualToEdit.ascended)
            setAwoken(ritualToEdit.awoken)
        };
    }, [ritualToEdit])


    const handleRitual = async () => {
        setAddRitualLoading(true);
        if (!name || !element || !circle) {
            enqueueSnackbar("Todo ritual precisa de um Nome, Elemento e Círculo.", { 
                variant: "error"
            });
            setAddRitualLoading(false);
            return;
        }

        if (buttonFunction == "create") {
            await api.post(`/characters/${characterId}/ritual`, {
                name,
                element,
                circle,
                execution,
                range,
                target,
                duration,
                resistance,
                description,
                briefDescription,
                ascended,
                awoken,
            });
    
            enqueueSnackbar("Ritual adicionado.", { 
                variant: "info"
            });
        } else if (buttonFunction == "update") {
            await api.put(`/characters/${characterId}/ritual/${ritualToEdit.id}`, {
                name,
                element,
                circle,
                execution,
                range,
                target,
                duration,
                resistance,
                description,
                briefDescription,
                ascended,
                awoken,
            });
    
            enqueueSnackbar("Ritual atualizado.", { 
                variant: "info"
            });
        }

        setName("")
        setElement("")
        setCircle("")
        setExecution("")
        setRange("")
        setTarget("")
        setDuration("")
        setResistance("")
        setDescription("")
        setBriefDescription("")
        setAscended("")
        setAwoken("")
        fetchCharacter();
        onClose();
        setButtonFunction("create");
        setAddRitualLoading(false);
    }   

    const handleStoredRitualChange = (event) => {
        setStoredRitual(event.target.value);
        const ritual = ritualsJSON.find(r => r.name == event.target.value);
        setName(ritual.name)
        setElement(ritual.element)
        setCircle(ritual.circle)
        setExecution(ritual.execution)
        setRange(ritual.range)
        setTarget(ritual.target)
        setDuration(ritual.duration)
        setResistance(ritual.resistance)
        setDescription(ritual.description)
        setBriefDescription(ritual.briefDescription)
        setAscended(ritual.ascended)
        setAwoken(ritual.awoken)
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Adicionar Ritual</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item xs={12}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="pre-existing" color="secondary">Selecionar ritual cadastrado</InputLabel>
                            <Select
                                labelId="element-value-select-label"
                                id="element-value-select"
                                value={storedRitual}
                                color="secondary"
                                label="Selecionar ritual cadastrado"
                                onChange={handleStoredRitualChange}
                            >
                                <MenuItem disabled value="">
                                    <em>Selecione um dos rituais abaixo</em>
                                </MenuItem>
                                {ritualsJSON.map((ritual) => (
                                    <MenuItem key={ritual.name} value={ritual.name}>{ritual.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="name" 
                            label="Nome do Ritual" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            fullWidth
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="element-select-label" color="secondary">Elemento</InputLabel>
                            <Select
                                labelId="element-value-select-label"
                                id="element-value-select"
                                value={element}
                                color="secondary"
                                label="Elemento"
                                onChange={(event) => setElement(event.target.value)}
                            >
                                <MenuItem value="Conhecimento">Conhecimento</MenuItem>
                                <MenuItem value="Energia">Energia</MenuItem>
                                <MenuItem value="Morte">Morte</MenuItem>
                                <MenuItem value="Sangue">Sangue</MenuItem>
                                <MenuItem value="Medo">Medo</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="circle-select-label" color="secondary">Círculo</InputLabel>
                            <Select
                                labelId="circle-value-select-label"
                                id="circle-value-select"
                                value={circle}
                                color="secondary"
                                label="Círculo"
                                onChange={(event) => setCircle(event.target.value)}
                            >
                                <MenuItem value="1">1° círculo</MenuItem>
                                <MenuItem value="2">2° círculo</MenuItem>
                                <MenuItem value="3">3° círculo</MenuItem>
                                <MenuItem value="4">4° círculo</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                        <Tooltip 
                            title='Resumo do ritual, como os da página 122 do Livro de Regras.' 
                            placement="top-start"
                        >
                            <TextField 
                                id="brief-description" 
                                label="Resumo" 
                                variant="filled" 
                                color="secondary" 
                                size="regular" 
                                fullWidth
                                value={briefDescription}
                                onChange={(event) => setBriefDescription(event.target.value)}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <TextField 
                            id="execution" 
                            label="Execução" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            fullWidth
                            value={execution}
                            onChange={(event) => setExecution(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <TextField 
                            id="range" 
                            label="Alcance" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            fullWidth
                            value={range}
                            onChange={(event) => setRange(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <TextField 
                            id="target" 
                            label="Alvo" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            fullWidth
                            value={target}
                            onChange={(event) => setTarget(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <TextField 
                            id="duration" 
                            label="Duração" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            fullWidth
                            value={duration}
                            onChange={(event) => setDuration(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <TextField 
                            id="resistance" 
                            label="Resistencia" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            fullWidth
                            value={resistance}
                            onChange={(event) => setResistance(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Tooltip 
                            title='Descrição completa do ritual, como os da página 124 do Livro de Regras.' 
                            placement="top-start"
                        >
                            <TextField 
                                id="description" 
                                label="Descrição extensa" 
                                variant="filled" 
                                color="secondary" 
                                size="regular" 
                                multiline
                                rows={3}
                                fullWidth
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                        <Tooltip
                            title='Efeito discente, por exemplo "(+2 PE): muda a duração para 1 dia."'
                            placement='top-start'
                        >
                            <TextField 
                                id="ascended" 
                                label="Discente" 
                                variant="filled" 
                                color="secondary" 
                                size="regular" 
                                multiline
                                rows={2}
                                fullWidth
                                value={ascended}
                                onChange={(event) => setAscended(event.target.value)}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                        <Tooltip
                            title='Efeito verdadeiro, por exemplo "(+5 PE): muda o alcance para curto e o 
                            alvo para pessoas ou animais escolhidos."'
                            placement='top-start'
                        >
                            <TextField 
                                id="awoken" 
                                label="Verdadeiro" 
                                variant="filled" 
                                color="secondary" 
                                size="regular" 
                                multiline
                                rows={2}
                                fullWidth
                                value={awoken}
                                onChange={(event) => setAwoken(event.target.value)}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <LoadingButton 
                            onClick={handleRitual} 
                            color="secondary" variant='text' endIcon={<SaveAsIcon/>} 
                            size="large" 
                            fullWidth
                            loading={addRitualLoading}
                        >
                            {buttonFunction == "create" ? "Adicionar" : "Atualizar"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}