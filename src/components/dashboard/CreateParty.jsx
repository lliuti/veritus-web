import { useState } from "react";
import { api } from "../../services/api";
import { useSnackbar } from 'notistack';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const CreateParty = ({ fetchParties }) => {
    const [partyName, setPartyName] = useState("");
    const [partyType, setPartyType] = useState("");
    const [partyDescription, setPartyDescription] = useState("");
    const [partyDescriptionCharacters, setPartyDescriptionCharacters] = useState(0);
    const [partyRules, setPartyRules] = useState("");
    const [createPartyLoading, setCreatePartyLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleCreateParty = async () => {
        setCreatePartyLoading(true);

        if (partyDescriptionCharacters > 155) {
            setCreatePartyLoading(false);
            return;
        };

        try {
            await api.post("/parties", {
                name: partyName, 
                type: partyType, 
                description: partyDescription, 
                rules: partyRules
            });
    
            setPartyName("");
            setPartyType("");
            setPartyDescription("");
            setPartyDescriptionCharacters(0);;
            setPartyRules("");
    
            enqueueSnackbar("Mesa criada.", { 
                variant: "info"
            });

            fetchParties();
        } catch (err) {
            enqueueSnackbar("Não foi possível criar essa mesa.", { 
                variant: "error"
            });
        }

        setCreatePartyLoading(false);
    }

    const handlePartyDescriptionChange = (event) => {
        setPartyDescription(event.target.value);
        setPartyDescriptionCharacters(event.target.value.length);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <TextField
                    margin="normal"
                    variant="filled"
                    fullWidth
                    color="secondary"
                    id="partyName"
                    label="Título da mesa"
                    type="text"
                    name="partyName"
                    value={partyName}
                    onChange={(event) => setPartyName(event.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                    <InputLabel id="party-model-select-label" color="secondary">Modelo</InputLabel>
                    <Select
                        labelId="party-model-select-label"
                        id="party-model-select"
                        value={partyType || ''}
                        color="secondary"
                        fullWidth
                        label="Modelo"
                        onChange={(event) => setPartyType(event.target.value)}
                    >
                        <MenuItem value={"Sessão única"}>Sessão única</MenuItem>
                        <MenuItem value={"Série curta"}>Série curta (entre 2 e 6 sessões)</MenuItem>
                        <MenuItem value={"Série longa"}>Série longa (mais de 6 sessões)</MenuItem>
                        <MenuItem value={"Playtest"}>Playtest</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    margin="normal"
                    variant="filled"
                    fullWidth
                    color={partyDescriptionCharacters > 155 ? "error" : "secondary"}
                    id="partyDescription"
                    label="Resumo"
                    type="text"
                    name="partyDescription"
                    value={partyDescription}
                    onChange={handlePartyDescriptionChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{partyDescriptionCharacters}/155</InputAdornment>
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                    <InputLabel id="party-rules-select-label" color="secondary">Regras</InputLabel>
                    <Select
                        labelId="party-rules-select-label"
                        id="party-rules-select"
                        value={partyRules || ''}
                        color="secondary"
                        fullWidth
                        label="Regras"
                        onChange={(event) => setPartyRules(event.target.value)}
                    >
                        <MenuItem value={"Apenas regras mandatórias"}>Apenas regras mandatórias</MenuItem>
                        <MenuItem value={"Com regras opcionais"}>Com regras opcionais</MenuItem>
                        <MenuItem value={"Com regras da casa"}>Com regras da casa</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <LoadingButton
                    loading={createPartyLoading}
                    fullWidth
                    color="secondary"
                    variant="outlined"
                    onClick={handleCreateParty}
                    size="large"
                >
                    Criar mesa
                </LoadingButton>
            </Grid>
        </Grid>
    );
}