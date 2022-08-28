import { useState, useEffect } from "react";
import { api } from "../../../services/api"; 
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export const ActiveParty = ({ characterSettings, fetchCharacter }) => {
    const [activeParty, setActiveParty] = useState("");
    const [recalculate, setRecalculate] = useState(false);
    const [loadingRecalculate, setLoadingRecalculate] = useState(false);
    const [parties, setParties] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setActiveParty(characterSettings.activeParty);
        setRecalculate(characterSettings.enableRecalculate);
        fetchParties();
    }, [characterSettings]);

    const fetchParties = async () => {
        try {
            const response = await api.get("/parties/list/invited", {
                params: {
                    status: "accepted"
                }
            });
            setParties(response.data);
        } catch (err) {
            enqueueSnackbar("Não foi possivel carregar as mesas.", { 
                variant: "error"
            });
        }
    }

    const handleUpdateActiveParty = async () => {
        try {
            await api.put(`/characters/${characterSettings.id}/info`, {
                activeParty,
            }); 
    
            fetchCharacter();
            enqueueSnackbar("Mesa ativa atualizada.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possivel alterar mesa ativa.", { 
                variant: "error"
            });
        }

        return;
    }
    
    const handleRecalculate = async () => {
        try {
            setLoadingRecalculate(true);
            await api.post(`/characters/${characterSettings.id}/recalculate`);
            fetchCharacter();
        } catch (err) {
            enqueueSnackbar("Não foi possivel recalcular estatísticas.", { 
                variant: "error"
            });
        }

        setLoadingRecalculate(false);
    }

    return (
        <Grid container spacing={{ xs: 1, md: 2 }}>
            {
                parties.length > 0 ? 
                <Grid item xs={12} sm={6}>
                    <FormControl variant="filled" fullWidth>
                        <InputLabel id="active-party-select-label" color="secondary">Mesa ativa</InputLabel>
                        <Select
                            labelId="active-party-select-label"
                            id="active-party-select"
                            value={activeParty || ''}
                            color="secondary"
                            fullWidth
                            label="Mesa ativa"
                            onChange={(event) => setActiveParty(event.target.value)}
                            onBlur={handleUpdateActiveParty}
                        >
                            {parties.map((p) => (
                                <MenuItem key={p.party.id} value={p.party.id}>{p.party.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            : <></>}
            <Grid item xs={12} sm={6}>
                <LoadingButton 
                    loading={loadingRecalculate}
                    onClick={handleRecalculate} 
                    color="secondary" 
                    variant='outlined' 
                    endIcon={<RotateLeftIcon/>} 
                    size="large"
                    sx={{ mt: 1}}
                >
                    Recalcular Ficha
                </LoadingButton>
            </Grid>
        </Grid>
    )

}