import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AttackRollDialog } from './AttackRollDialog';
import { DamageRollDialog } from './DamageRollDialog';
import { AddAttackDialog } from './AddAttackDialog';
import { Bull } from '../Bull';
import { useSnackbar } from 'notistack';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export function AttacksTable({ characterEquipment, fetchCharacter }) {
    const [attacks, setAttacks] = useState([]);
    const [attackRollInfo, setAttackRollInfo] = useState([]);
    const [damageRollInfo, setDamageRollInfo] = useState([]);
    const [addAttackDialogOpen, setAddAttackDialogOpen] = useState(false);
    const [attackRollDialogOpen, setAttackRollDialogOpen] = useState(false);
    const [damageRollDialogOpen, setDamageRollDialogOpen] = useState(false);
    const [attackToEdit, setAttackToEdit] = useState({});
    const [deleteAttackDisabled, setDeleteAttackDisabled] = useState(false);
    const [criticalDamageLoading, setCriticalDamageLoading] = useState(false);
    const [damageLoading, setDamageLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setAttacks(characterEquipment.attacks);
    }, [characterEquipment]);

    const handleCloseAttackRollDialog = () => setAttackRollDialogOpen(false);
    const handleCloseDamageRollDialog = () => setDamageRollDialogOpen(false);
    const handleCloseAddAttackDialog = () => {
        setAddAttackDialogOpen(false);
        setAttackToEdit({});
    };

    const handleEditAttack = (attack) => {
        setAttackToEdit(attack);
        setAddAttackDialogOpen(true);
    }

    const handleDeleteAttack = async (attackId) => {
        setDeleteAttackDisabled(true);
        try {
            await api.delete(`/characters/${characterEquipment.id}/attacks/${attackId}`);
            fetchCharacter();
            enqueueSnackbar("Ataque deletado.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível deletar esse ataque.", { 
                variant: "error"
            });
        }
        setDeleteAttackDisabled(false)
    }

    const handleDamageRoll = async (attack, type) => {
        type == "damage" ? setDamageLoading(true) : setCriticalDamageLoading(true);

        try {
            const response = await api.post(`/characters/${characterEquipment.id}/roll/damage`, {
                attack,
                type
            });
            setDamageRollInfo(response.data);
            setDamageRollDialogOpen(true);
        } catch (err) {
            enqueueSnackbar("Não foi possível realizar a rolagem de dano.", { 
                variant: "error"
            });
        }

        type == "damage" ? setDamageLoading(false) : setCriticalDamageLoading(false);
    }

    return (
        <Container component="div">
            {
                attacks?.map((attack) => (
                    <Accordion key={attack.id}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography sx={{ mr: 2 }}>{attack.attack}</Typography>
                            <Typography 
                                sx={{ display: { xs: 'none', sm: 'block' } }} 
                                color="text.secondary"
                            >       
                                {attack.damage}
                                &nbsp;
                                <Bull/>
                                &nbsp;
                                {attack.margin}/{attack.multiplier}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={4} md={4} lg={3}>
                                    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <Typography color="text.secondary">Dano</Typography>
                                        <LoadingButton loading={damageLoading} onClick={() => handleDamageRoll(attack, "damage")} color="secondary" variant='outlined' size="small" sx={{ textTransform: "lowercase" }}>{attack.damage}</LoadingButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3}>
                                    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <Typography color="text.secondary">Dano Crítico</Typography>
                                        <LoadingButton loading={criticalDamageLoading} onClick={() => handleDamageRoll(attack, "criticalDamage")} color="secondary" variant='outlined' size="small" sx={{ textTransform: "lowercase" }}>{attack.criticalDamage}</LoadingButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3}>
                                    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <Typography color="text.secondary">Crítico</Typography>
                                        <Typography>{attack.margin}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3}>
                                    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <Typography color="text.secondary">Multiplicador</Typography>
                                        <Typography>{attack.multiplier}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3}>
                                    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <Typography color="text.secondary">Alcance</Typography>
                                        <Typography>{attack.range}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3}>
                                    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <Typography color="text.secondary">Tipo</Typography>
                                        <Typography>{attack.damageType}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3}>
                                    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <Typography color="text.secondary">Editar</Typography>
                                        <IconButton onClick={() => handleEditAttack(attack)} aria-label="delete" color="warning" size="small">
                                            <EditIcon color="warning"/>
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3}>
                                    <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <Typography color="text.secondary">Deletar</Typography>
                                        <IconButton disabled={deleteAttackDisabled} onClick={() => handleDeleteAttack(attack.id)} aria-label="delete" color="error" size="small">
                                            <DeleteForeverIcon color="error"/>
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
            <Button 
                onClick={() => setAddAttackDialogOpen(true)} 
                color="inherit" 
                variant='text' 
                fullWidth sx={{ mt: 1}}
            >
                Adicionar Ataque/Arma
            </Button>
            <AddAttackDialog 
                onClose={handleCloseAddAttackDialog}
                open={addAttackDialogOpen}
                characterId={characterEquipment.id} 
                fetchCharacter={fetchCharacter}
                attackToEdit={attackToEdit}
            />
            <AttackRollDialog
                onClose={handleCloseAttackRollDialog}
                open={attackRollDialogOpen}
                attackRollInfo={attackRollInfo}
            />
            <DamageRollDialog
                onClose={handleCloseDamageRollDialog}
                open={damageRollDialogOpen}
                damageRollInfo={damageRollInfo}
            />
        </Container>
    )
}