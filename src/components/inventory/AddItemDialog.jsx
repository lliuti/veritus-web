import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../services/api';

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

export const AddItemDialog = (props) => {
    const { onClose, open, fetchCharacter, characterId, itemToEdit } = props;
    
    const [item, setItem] = useState("");
    const [weight, setWeight] = useState("0");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("0");
    const [buttonFunction, setButtonFunction] = useState("create");
    const [addItemLoading, setAddItemLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
        setButtonFunction("create");
    };

    useEffect(() => {
        if (Object.keys(itemToEdit).length !== 0) {
            setItem(itemToEdit.item);
            setDescription(itemToEdit.description);
            setCategory(itemToEdit.category);
            setWeight(itemToEdit.weight);
            setButtonFunction("update");
        };
    }, [itemToEdit])


    const handleItem = async () => {
        setAddItemLoading(true);
        if (!item) {
            enqueueSnackbar("Digite pelo menos um nome para o item.", { 
                variant: "error"
            });
            setAddItemLoading(false);
            return;
        }

        if (buttonFunction == "create") {
            try {
                await api.post(`/characters/${characterId}/inventory`, {
                    item,
                    description,
                    category,
                    weight,
                });
        
                enqueueSnackbar("Item adicionado.", { 
                    variant: "info"
                });
            } catch (err) {
                enqueueSnackbar("Não foi possível adicionar esse item.", { 
                    variant: "error"
                });
            }
        } else if (buttonFunction == "update") {
            try {
                await api.put(`/characters/${characterId}/inventory/${itemToEdit.id}`, {
                    item,
                    description,
                    category,
                    weight,
                });
        
                enqueueSnackbar("Item atualizado.", { 
                    variant: "info"
                });
            } catch (err) {
                enqueueSnackbar("Não foi possível atualizar esse ataque.", { 
                    variant: "error"
                });
            }
        }
        
        setItem("");
        setWeight("");
        setDescription("");
        setCategory("");
        fetchCharacter();
        onClose();
        setButtonFunction("create");
        setAddItemLoading(false);
    }   

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Adicionar Item</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item xs={12} md={2.5}>
                        <TextField 
                            id="item" 
                            label="Item" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            fullWidth
                            value={item}
                            onChange={(event) => setItem(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={7}>
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
                    <Grid item xs={12} md={1.5}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="category-select-label" color="secondary">Categoria</InputLabel>
                            <Select
                                labelId="category-value-select-label"
                                id="category-value-select"
                                value={category}
                                color="secondary"
                                label="Categoria"
                                onChange={(event) => setCategory(event.target.value)}
                            >
                                <MenuItem value="0">0</MenuItem>
                                <MenuItem value="I">I</MenuItem>
                                <MenuItem value="II">II</MenuItem>
                                <MenuItem value="III">III</MenuItem>
                                <MenuItem value="IV">IV</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="weight-select-label" color="secondary">Espaços</InputLabel>
                            <Select
                                labelId="weight-value-select-label"
                                id="weight-value-select"
                                value={weight}
                                color="secondary"
                                label="Espaços"
                                onChange={(event) => setWeight(event.target.value)}
                            >
                                <MenuItem value="0">0</MenuItem>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                                <MenuItem value="6">6</MenuItem>
                                <MenuItem value="7">7</MenuItem>
                                <MenuItem value="8">8</MenuItem>
                                <MenuItem value="9">9</MenuItem>
                                <MenuItem value="10">10</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <LoadingButton 
                            onClick={handleItem} 
                            color="secondary" 
                            variant='text' 
                            endIcon={<SaveAsIcon/>} 
                            loading={addItemLoading}
                            size="large" 
                            fullWidth>
                                {buttonFunction == "create" ? "Adicionar" : "Atualizar"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}