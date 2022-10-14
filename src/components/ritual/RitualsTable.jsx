import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Bull } from "../Bull";
import { AddRitualDialog } from './AddRitualDialog';
import { useSnackbar } from 'notistack';
import { HiPlusSm } from "react-icons/hi";

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

export const RitualsTable = ({ characterEquipment, fetchCharacter }) => {
    const [addRitualDialogOpen, setAddRitualDialogOpen] = useState(false);
    const [rituals, setRituals] = useState([]);
    const [ritualToEdit, setRitualToEdit] = useState({});

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setRituals(characterEquipment.rituals);
    }, [characterEquipment]);

    const handleOpenAddRitualDialog = () => setAddRitualDialogOpen(true);
    const handleCloseAddRitualDialog = () => {
        setAddRitualDialogOpen(false);
        setRitualToEdit({});
    };

    const handleEditRitual = (ritual) => {
        setRitualToEdit(ritual);
        setAddRitualDialogOpen(true);
    }

    const handleDeleteRitual = async (ritualId) => {
        try {
            await api.delete(`/characters/${characterEquipment.id}/ritual/${ritualId}`);
            fetchCharacter();
            enqueueSnackbar("Ritual deletado.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível deletar esse ritual.", { 
                variant: "error"
            });
        }
    }

    return (
        <Container component="div">
            {rituals?.map((ritual) => (
                <Accordion key={ritual.id}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography sx={{ mr: 2 }}>{ritual.name}</Typography>
                        <Typography 
                            sx={{ display: { xs: 'none', sm: 'block' } }} 
                            color="text.secondary"
                        >
                            {(() => {
                                if (ritual.briefDescription.trim() !== "") {
                                    return ritual.briefDescription
                                } else {
                                    return (
                                        <>
                                            {ritual.element} &nbsp;
                                            <Bull/> &nbsp;
                                            {ritual.circle}° círculo
                                        </>
                                    )
                                }
                            })()}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography>{ritual.element} - {ritual.circle}° círculo</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Execução</Typography>
                                    <Typography>{ritual.execution}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Alcance</Typography>
                                    <Typography>{ritual.range}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Alvo</Typography>
                                    <Typography>{ritual.target}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Duração</Typography>
                                    <Typography>{ritual.duration}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Resistencia</Typography>
                                    <Typography>{ritual.resistance}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Descrição extensa</Typography>
                                    <Typography>{ritual.description}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Discente</Typography>
                                    <Typography>{ritual.ascended}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Verdadeiro</Typography>
                                    <Typography>{ritual.awoken}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Editar</Typography>
                                    <IconButton 
                                        onClick={() => handleEditRitual(ritual)} 
                                        aria-label="delete" 
                                        color="warning" 
                                        size="small"
                                    >
                                        <EditIcon color="warning"/>
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ mb: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <Typography color="text.secondary">Deletar</Typography>
                                    <IconButton 
                                        onClick={() => handleDeleteRitual(ritual.id)} 
                                        aria-label="delete" 
                                        color="error" 
                                        size="small"
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
                onClick={() => setAddRitualDialogOpen(true)} 
                color="inherit" 
                variant='text' 
                fullWidth sx={{ mt: 1}}
                endIcon={<HiPlusSm/>}
            >
                Adicionar Ritual
            </Button>
            <AddRitualDialog 
                onClose={handleCloseAddRitualDialog}
                open={addRitualDialogOpen}
                characterId={characterEquipment.id} 
                fetchCharacter={fetchCharacter}
                ritualToEdit={ritualToEdit}
            />
        </Container>
    )
}