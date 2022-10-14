import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Bull } from "../Bull";
import { AddPowerDialog } from './AddPowerDialog';
import { HiPlusSm } from "react-icons/hi";
import { useSnackbar } from 'notistack';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const PowersTable = ({ characterEquipment, fetchCharacter }) => {
    const [addPowerDialogOpen, setAddPowerDialogOpen] = useState(false);
    const [powers, setPowers] = useState([]);
    const [powerToEdit, setPowerToEdit] = useState({});
    const [deletePowerDisabled, setDeletePowerDisabled] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setPowers(characterEquipment.powers);
    }, [characterEquipment]);

    const handleOpenAddPowerDialog = () => setAddPowerDialogOpen(true);
    const handleCloseAddPowerDialog = () => {
        setAddPowerDialogOpen(false);
        setPowerToEdit({});
    };

    const handleEditPower = (power) => {
        setPowerToEdit(power);
        setAddPowerDialogOpen(true);
    }

    const handleDeletePower = async (powerId) => {
        setDeletePowerDisabled(true);
        try {
            await api.delete(`/characters/${characterEquipment.id}/power/${powerId}`);
            fetchCharacter();
            enqueueSnackbar("Poder deletado.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível deletar esse poder.", { 
                variant: "error"
            });
        }
        setDeletePowerDisabled(false);
    }

    return (
        <Container component="div">
            {powers?.map((power) => (
                <Accordion key={power.id}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography sx={{ mr: 2 }}>{power.name}</Typography>
                        <Typography 
                            sx={{ display: { xs: 'none', sm: 'block' } }} 
                            color="text.secondary"
                        >
                            NEX {power.nex}% <Bull/> {power.powerType}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Descrição</Typography>
                                    <Typography>{power.description}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Tipo</Typography>
                                    <Typography>{power.powerType}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Editar</Typography>
                                    <IconButton 
                                        onClick={() => handleEditPower(power)} 
                                        aria-label="delete" 
                                        color="warning" 
                                        size="small"
                                    >
                                        <EditIcon color="warning"/>
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Deletar</Typography>
                                    <IconButton 
                                        onClick={() => handleDeletePower(power.id)} 
                                        aria-label="delete" 
                                        color="error" 
                                        size="small"
                                        disabled={deletePowerDisabled}
                                    >
                                        <DeleteForeverIcon color="error"/>
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
                <Button 
                    onClick={() => setAddPowerDialogOpen(true)} 
                    color="inherit" 
                    variant='text' 
                    fullWidth sx={{ mt: 1}}
                    endIcon={<HiPlusSm/>}
                >
                    Adicionar Habilidade / Poder
                </Button>
                <AddPowerDialog 
                    onClose={handleCloseAddPowerDialog}
                    open={addPowerDialogOpen}
                    characterId={characterEquipment.id} 
                    fetchCharacter={fetchCharacter}
                    powerToEdit={powerToEdit}
                />
        </Container>
    )
}