import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AddItemDialog } from './AddItemDialog';
import { useSnackbar } from 'notistack';
import { Bull } from "../../components/Bull";
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

export function InventoryTable({ characterEquipment, fetchCharacter }) {
    const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [itemToEdit, setItemToEdit] = useState({});
    const [deleteItemDisabled, setDeleteItemDisabled] = useState(false);

    const [weightCapacity, setWeightCapacity] = useState(0);
    const [weight, setWeight] = useState(0);
    const [itemsCatZero, setItemsCatZero] = useState(0);
    const [itemsCatOne, setItemsCatOne] = useState(0);
    const [itemsCatTwo, setItemsCatTwo] = useState(0);
    const [itemsCatThree, setItemsCatThree] = useState(0);
    const [itemsCatFour, setItemsCatFour] = useState(0);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setItems(characterEquipment.inventory);
        calculateWeightAndCategories();
    }, [characterEquipment]);
    
    const calculateWeightAndCategories = () => {
        let itemsCatZero = 0;
        let itemsCatOne = 0;
        let itemsCatTwo = 0;
        let itemsCatThree = 0;
        let itemsCatFour = 0;
        let totalWeight = 0;
        for (let i = 0; i < characterEquipment.inventory.length; i++) {
            totalWeight += parseInt(characterEquipment.inventory[i].weight);
            switch (characterEquipment.inventory[i].category) {
                case "I":
                    itemsCatOne++;
                    break;
                case "II":
                    itemsCatTwo++;
                    break;
                case "III":
                    itemsCatThree++;
                    break;
                case "IV":
                    itemsCatFour++;
                    break;
                case "0":
                    itemsCatZero++;
                    break;
            } 
        }

        setWeight(totalWeight);
        setWeightCapacity(characterEquipment.weightCapacity);
        setItemsCatZero(itemsCatZero);
        setItemsCatOne(itemsCatOne);
        setItemsCatTwo(itemsCatTwo);
        setItemsCatThree(itemsCatThree);
        setItemsCatFour(itemsCatFour);
    }

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
        setDeleteItemDisabled(true);
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
        setDeleteItemDisabled(false);
    }

    return (
        <Container component="div">
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography sx={{ mr: 2 }}>Carga</Typography>
                    <Typography color="text.secondary">{weight}/{weightCapacity}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                            <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <Typography color="text.secondary">Itens Cat. I</Typography>
                                <Typography>
                                    {itemsCatOne}/
                                    {(() => {
                                        switch (characterEquipment.rank) {
                                            case "Recruta":
                                                return "2"
                                                break;
                                            default:
                                                return "3"
                                            break;
                                        }
                                    })()}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <Typography color="text.secondary">Itens Cat. II</Typography>
                                <Typography>
                                    {itemsCatTwo}/
                                    {(() => {
                                        switch (characterEquipment.rank) {
                                            case "Recruta":
                                                return "-"
                                                break;
                                            case "Operador":
                                                return "1"
                                                break;
                                            case "Agente especial":
                                                return "2"
                                                break;
                                            default:
                                                return "3"
                                                break;
                                        }
                                    })()}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <Typography color="text.secondary">Itens Cat. III</Typography>
                                <Typography>
                                    {itemsCatThree}/
                                    {(() => {
                                        switch (characterEquipment.rank) {
                                            case "Recruta":
                                                return "-"
                                                break;
                                            case "Operador":
                                                return "-"
                                                break;
                                            case "Agente especial":
                                                return "1"
                                                break;
                                            case "Oficial de operações":
                                                return "2"
                                                break;
                                            case "Agente de elite":
                                                return "3"
                                                break;
                                        }
                                    })()}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <Typography color="text.secondary">Itens Cat. IV</Typography>
                                <Typography>
                                    {itemsCatFour}/
                                    {(() => {
                                        switch (characterEquipment.rank) {
                                            case "Recruta":
                                                return "-"
                                                break;
                                            case "Operador":
                                                return "-"
                                                break;
                                            case "Agente especial":
                                                return "-"
                                                break;
                                            case "Oficial de operações":
                                                return "1"
                                                break;
                                            case "Agente de elite":
                                                return "2"
                                                break;
                                        }
                                    })()}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            {
                items?.map((item) => (
                    <Accordion key={item.id}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography sx={{ mr: 2 }}>{item.item}</Typography>
                            <Typography sx={{ display: { xs: 'none', sm: 'block' } }} color="text.secondary">
                                {(() => {
                                    if (item.description.trim() !== "" && item.description.trim().length < 30) {
                                        return item.description
                                    } else {
                                        return (
                                            <>
                                                Categoria {item.category} &nbsp;
                                                <Bull/> &nbsp;
                                                Espaço {item.weight}
                                            </>
                                        )
                                    }
                                })()}
                            </Typography>
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
                                        <IconButton disabled={deleteItemDisabled} onClick={() => handleDeleteItem(item.id)} aria-label="delete" color="error" size="small">
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
                endIcon={<HiPlusSm/>}
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

