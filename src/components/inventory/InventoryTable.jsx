import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AddItemDialog } from './AddItemDialog';
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

export function InventoryTable({ characterEquipment, fetchCharacter }) {
    const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [itemToEdit, setItemToEdit] = useState({});

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setItems(characterEquipment.inventory);
    }, [characterEquipment]);

    const handleOpenAddItemDialog = () => setAddItemDialogOpen(true);
    const handleCloseAddItemDialog = () => {
        setAddItemDialogOpen(false);
        setItemToEdit({});
    };

    const handleEditItem = (item) => {
        setItemToEdit(item);
        setAddItemDialogOpen(true);
    }

    const handleDeleteItem = async (itemId) => {
        try {
            await api.delete(`/characters/${characterEquipment.id}/inventory/${itemId}`);
            fetchCharacter();
            enqueueSnackbar("Item deletado.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível deletar esse item.", { 
                variant: "error"
            });
        }
    }

    return (
        <Container component="div">
            {
                items?.map((item) => (
                        <Accordion key={item.id}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <Typography sx={{ mr: 2 }}>{item.item}</Typography>
                                <Typography sx={{ display: { xs: 'none', sm: 'block' } }} color="text.secondary">{item.description}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                            <Typography color="text.secondary">Descrição</Typography>
                                            <Typography>{item.description}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                            <Typography color="text.secondary">Categoria</Typography>
                                            <Typography>{item.category}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                            <Typography color="text.secondary">Espaço</Typography>
                                            <Typography>{item.weight}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                            <Typography color="text.secondary">Editar</Typography>
                                            <IconButton onClick={() => handleEditItem(item)} aria-label="delete" color="warning" size="small">
                                                <EditIcon color="warning"/>
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                            <Typography color="text.secondary">Deletar</Typography>
                                            <IconButton onClick={() => handleDeleteItem(item.id)} aria-label="delete" color="error" size="small">
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
                    onClick={() => setAddItemDialogOpen(true)} 
                    color="inherit" 
                    variant='text' 
                    fullWidth sx={{ mt: 1}}
                >
                    Adicionar Item
                </Button>
                <AddItemDialog 
                    onClose={handleCloseAddItemDialog}
                    open={addItemDialogOpen}
                    characterId={characterEquipment.id} 
                    fetchCharacter={fetchCharacter}
                    itemToEdit={itemToEdit}
                />
        </Container>
    )
}

