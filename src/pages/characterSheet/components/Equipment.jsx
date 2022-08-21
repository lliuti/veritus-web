import * as React from 'react';
import { useState } from 'react';
import { AttacksTable } from "./AttacksTable";
import { InventoryTable } from "./InventoryTable";
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { api } from '../../../services/api';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
        )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function Equipment({characterEquipment, fetchCharacter}) {
    const [tabValue, setTabValue] = useState(0);
    const [addAttackOpen, setAddAttackOpen] = useState(false);
    const [addItemOpen, setAddItemOpen] = useState(false);

    const handleTabsChange = (e, newTabValue) => {
        setTabValue(newTabValue);
    }   

    const handleAddAttackOpen = () => {
        setAddAttackOpen(true)
    }
    
    const handleAddAttackClose = () => {
        setAddAttackOpen(false)
    }
    
    const handleAddItemOpen = () => {
        setAddItemOpen(true)
    }
    
    const handleAddItemClose = () => {
        setAddItemOpen(false)
    }

    return (
        <Grid item xs={12} sm={6} md={8} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5" color="inherit" sx={{ mb: 1}}>Equipamento</Typography>
            <Tabs
                value={tabValue}
                onChange={handleTabsChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="equipment tabs"
                >
                <Tab label="Ataques / Armas" {...a11yProps(0)} />
                <Tab label="Inventário" {...a11yProps(1)} />
                <Tab label="Habilidades / Poderes" {...a11yProps(2)} />
                <Tab label="Rituais" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <AttacksTable characterAttacks={characterEquipment.attacks} fetchCharacter={fetchCharacter}/>
                <Button 
                    onClick={handleAddAttackOpen} 
                    color="inherit" 
                    variant='text' 
                    fullWidth sx={{ mt: 1}}
                >
                    Adicionar Ataque/Arma
                </Button>
                <AddAttackDialog open={addAttackOpen} onClose={handleAddAttackClose} characterId={characterEquipment.id} fetchCharacter={fetchCharacter}/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <InventoryTable characterInventory={characterEquipment.inventory} fetchCharacter={fetchCharacter}/>
                <Button onClick={handleAddItemOpen} color="inherit" variant='text' fullWidth sx={{ mt: 1}}>Adicionar Item</Button>
                <AddItemDialog open={addItemOpen} onClose={handleAddItemClose} characterId={characterEquipment.id} fetchCharacter={fetchCharacter}/>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <Typography component="h2" variant="body1" color="inherit" sx={{ mb: 1}}>não ta pronto ainda aaa.</Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <Typography component="h2" variant="body1" color="inherit" sx={{ mb: 1}}>não ta pronto ainda aaa.</Typography>
            </TabPanel>
        </Grid>
    )
}

function AddAttackDialog(props) {
    const { onClose, open, characterId, fetchCharacter } = props;

    const [addToInventoryValue, setAddToInventoryValue] = useState(false)
    const [attack, setAttack] = useState("");
    const [test, setTest] = useState("");
    const [damage, setDamage] = useState("");
    const [damageType, setDamageType] = useState("");
    const [category, setCategory] = useState("");
    const [margin, setMargin] = useState("");
    const [multiplier, setMultiplier] = useState("");
    const [range, setRange] = useState("");
    const [weight, setWeight] = useState("");
    const [description, setDescription] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
    };

    const handleAddAttack = async () => {
        await api.post(`/characters/${characterId}/attack`, {
            attack,
            test,
            damage,
            damageType,
            category,
            margin,
            multiplier,
            range,
            weight,
            description,
            addToInventory: addToInventoryValue,
        });

        setAddToInventoryValue(false);
        setAttack("");
        setTest("");
        setDamage("");
        setDamageType("");
        setCategory("");
        setMargin("");
        setMultiplier("");
        setRange("");
        setWeight("");
        setDescription("");

        fetchCharacter();
        onClose();
        enqueueSnackbar("Ataque adicionado.", { 
            variant: "info"
        });
    }   

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Adicionar Ataque / Arma</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item md={3}>
                        <TextField id="attack" label="Ataque / Arma" variant="filled" color="secondary" size="regular" fullWidth value={attack} onChange={(event) => setAttack(event.target.value)}/>
                    </Grid>
                    <Grid item md={3}>
                        <TextField id="test" label="Teste (ex: 3d20+5)" variant="filled" color="secondary" size="regular" fullWidth value={test} onChange={(event) => setTest(event.target.value)}/>
                    </Grid>
                    <Grid item md={3}>
                        <TextField id="damage" label="Dano (ex: 3d6+2)" variant="filled" color="secondary" size="regular" fullWidth value={damage} onChange={(event) => setDamage(event.target.value)}/>
                    </Grid>
                    <Grid item md={3}>
                        <TextField id="damage-type" label="Tipo" variant="filled" color="secondary" size="regular" fullWidth value={damageType} onChange={(event) => setDamageType(event.target.value)}/>
                    </Grid>
                    <Grid item md={3}>
                        <TextField id="category" label="Categoria" variant="filled" color="secondary" size="regular" type="number" fullWidth value={category} onChange={(event) => setCategory(event.target.value)}/>
                    </Grid>
                    <Grid item md={3}>
                        <TextField id="margin" label="Crítico (ex: 19)" variant="filled" color="secondary" size="regular" type="number" fullWidth value={margin} onChange={(event) => setMargin(event.target.value)}/>
                    </Grid>
                    <Grid item md={3}>
                        <TextField id="multiplier" label="Multiplicador (ex: x3)" variant="filled" color="secondary" size="regular" fullWidth value={multiplier} onChange={(event) => setMultiplier(event.target.value)}/>
                    </Grid>
                    <Grid item md={3}>
                        <TextField id="range" label="Alcance" variant="filled" color="secondary" size="regular" fullWidth value={range} onChange={(event) => setRange(event.target.value)}/>
                    </Grid>
                    <Grid item md={3}>
                        <TextField id="weight" label="Espaços" variant="filled" color="secondary" size="regular" type="number" fullWidth value={weight} onChange={(event) => setWeight(event.target.value)}/>
                    </Grid>
                    <Grid item md={3}>
                        <TextField 
                            id="description" 
                            label="Descrição" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            type="number"  
                            value={description} 
                            onChange={(event) => setDescription(event.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={3}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="add-to-inventory-select-label" color="secondary">Adicionar ao Inventário?</InputLabel>
                            <Select
                                labelId="add-to-inventory-value-select-label"
                                id="add-to-inventory-value-select"
                                value={addToInventoryValue}
                                color="secondary"
                                label="Adicionar ao Inventário?"
                                onChange={(event) => setAddToInventoryValue(event.target.value)}
                            >
                                <MenuItem value={true}>Sim</MenuItem>
                                <MenuItem value={false}>Não</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <Button 
                            color="secondary" 
                            variant='text' 
                            endIcon={<SaveAsIcon/>} 
                            size="large" 
                            fullWidth
                            onClick={handleAddAttack}
                        >
                            Adicionar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}
function AddItemDialog(props) {
    const { onClose, open, fetchCharacter, characterId } = props;
    
    const [item, setItem] = useState("");
    const [weight, setWeight] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
    };

    const handleAddItem = async () => {
        await api.post(`/characters/${characterId}/inventory`, {
            item,
            description,
            category,
            weight,
        });

        setItem("");
        setWeight("");
        setDescription("");
        setCategory("");

        fetchCharacter();
        onClose();
        enqueueSnackbar("Item adicionado.", { 
            variant: "info"
        });
    }   

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Adicionar Item</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item md={2.5}>
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
                    <Grid item md={7}>
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
                    <Grid item md={1.5}>
                        <TextField 
                            id="category" 
                            label="Categoria" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            type="number" 
                            fullWidth
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />
                    </Grid>
                    <Grid item md={1}>
                        <TextField 
                            id="weight" 
                            label="Espaço" 
                            variant="filled" 
                            color="secondary" 
                            size="regular" 
                            type="number" 
                            fullWidth
                            value={weight}
                            onChange={(event) => setWeight(event.target.value)}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Button onClick={handleAddItem} color="secondary" variant='text' endIcon={<SaveAsIcon/>} size="large" fullWidth>Adicionar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}
