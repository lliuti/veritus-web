import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../services/api';

import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
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
import { specifications } from '../../specifications';

export const AddAttackDialog = (props) => {
    const { onClose, open, characterId, fetchCharacter, attackToEdit } = props;
    const [addToInventoryValue, setAddToInventoryValue] = useState(true);
    const [attack, setAttack] = useState("");
    const [test, setTest] = useState("");
    const [damage, setDamage] = useState("");
    const [criticalDamage, setCriticalDamage] = useState("");
    const [damageType, setDamageType] = useState("B");
    const [category, setCategory] = useState("0");
    const [margin, setMargin] = useState("-");
    const [multiplier, setMultiplier] = useState("-");
    const [range, setRange] = useState("-");
    const [weight, setWeight] = useState("0");
    const [description, setDescription] = useState("");
    const [buttonFunction, setButtonFunction] = useState("create");
    const [addAttackLoading, setAddAttackLoading] = useState(false);
    const [storedAttack, setStoredAttack] = useState([]);
    
    const [damageValues, setDamageValues] = useState([{ damage: '', type: 'B' }]);
    const [criticalDamageValues , setCriticalDamageValues ] = useState([{ damage: '', type: 'B' }]);

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
        setButtonFunction("create");
    };

    useEffect(() => {
        if (Object.keys(attackToEdit).length !== 0) {
            setAddToInventoryValue(attackToEdit.addToInventory);
            setAttack(attackToEdit.attack);
            setTest(attackToEdit.test);
            setDamage(attackToEdit.damage);
            setDamageValues(JSON.parse(attackToEdit.damage));
            setCriticalDamage(attackToEdit.criticalDamage);
            setCriticalDamageValues(JSON.parse(attackToEdit.criticalDamage));
            setDamageType(attackToEdit.damageType);
            setCategory(attackToEdit.category);
            setMargin(attackToEdit.margin);
            setMultiplier(attackToEdit.multiplier);
            setRange(attackToEdit.range);
            setWeight(attackToEdit.weight);
            setDescription(attackToEdit.description);

            setButtonFunction("update");
        };
    }, [attackToEdit])

    const handleAttack = async () => {
        setAddAttackLoading(true);
        if (!attack) {
            enqueueSnackbar("Digite pelo menos um nome para o ataque.", { 
                variant: "error"
            });
            setAddAttackLoading(false);
            return;
        }

        if (!criticalDamage) {
            setCriticalDamage("-");
        }

        if (buttonFunction == "create") {
            try {
                await api.post(`/characters/${characterId}/attack`, {
                    attack,
                    test: test.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    damage: JSON.stringify(damageValues),
                    criticalDamage: JSON.stringify(criticalDamageValues),
                    damageType,
                    category,
                    margin,
                    multiplier,
                    range,
                    weight,
                    description,
                    addToInventory: addToInventoryValue,
                });
                enqueueSnackbar("Ataque adicionado.", { 
                    variant: "info"
                });
            } catch (err) {
                enqueueSnackbar("Não foi possível criar esse ataque.", { 
                    variant: "error"
                });
            }

        } else if (buttonFunction == "update") {
            try {
                await api.put(`/characters/${characterId}/attack/${attackToEdit.id}`, {
                    attack,
                    test: test.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    damage: JSON.stringify(damageValues),
                    criticalDamage: JSON.stringify(criticalDamageValues),
                    damageType,
                    category,
                    margin,
                    multiplier,
                    range,
                    weight,
                    description,
                    addToInventory: addToInventoryValue,
                });
        
                enqueueSnackbar("Ataque atualizado.", { 
                    variant: "info"
                });
            } catch (err) {
                enqueueSnackbar("Não foi possível atualizar esse ataque.", { 
                    variant: "error"
                });
            }

        }

        setAddToInventoryValue(true);
        setAttack("");
        setTest("");
        setDamage("");
        setCriticalDamage("");
        setDamageValues([{ damage: '', type: 'B' }]);
        setCriticalDamageValues([{ damage: '', type: 'B' }]);
        setDamageType("");
        setCategory("");
        setMargin("");
        setMultiplier("");
        setRange("");
        setWeight("");
        setDescription("");

        fetchCharacter();
        setButtonFunction("create");
        setAddAttackLoading(false);
        onClose();
    }   

    const handleStoredAttackChange = (event) => {
        setStoredAttack(event.target.value);
        const storedAttack = specifications.ataques.find(specification => specification.nome === event.target.value);
        setAttack(storedAttack.nome);
        setDamage(storedAttack.dano);
        setDamageValues([{ damage: storedAttack.dano, type: storedAttack.tipoDano }]);
        setCriticalDamage(storedAttack.danoCritico);
        setCriticalDamageValues([{ damage: storedAttack.danoCritico, type: storedAttack.tipoDano }]);
        setCategory(storedAttack.categoria);
        setDamageType(storedAttack.tipoDano);
        setMargin(storedAttack.margemCritico);
        setMultiplier(storedAttack.multiplicadorCritico);
        setRange(storedAttack.alcance);
        setWeight(storedAttack.espaco);
        setDescription(storedAttack.desc);
        setAddToInventoryValue(storedAttack.adicionarAoInventario);
    }

    const handleDynamicDamageChange = (event, index) => {
        let data = [...damageValues];
        data[index][event.target.name] = event.target.value;
        setDamageValues(data);
    }
    
    const handleDynamicCriticalChange = (event, index) => {
        let data = [...criticalDamageValues];
        data[index][event.target.name] = event.target.value;
        setCriticalDamageValues(data);
    }

    const handleAddDamage = () => {
        const emptyDamage = damageValues.find(d => d.damage == "");
        if (emptyDamage) return;

        const newDamage = { damage: '', type: 'B' };
        setDamageValues([...damageValues, newDamage]);
    }
    
    const handleAddCriticalDamage = () => {
        const emptyDamage = criticalDamageValues.find(d => d.damage == "");
        if (emptyDamage) return;

        const newDamage = { damage: '', type: 'B' };
        setCriticalDamageValues([...criticalDamageValues, newDamage]);
    }

    const handleRemoveDamage = (index) => {
        if (damageValues.length == 1) {
            let data = [...damageValues];
            data[index].damage = "";
            data[index].type = "B";
            setDamageValues(data);
            return;
        };
        let data = [...damageValues];
        data.splice(index, 1)
        setDamageValues(data)
    }
    
    const handleRemoveCriticalDamage = (index) => {
        if (criticalDamageValues.length == 1) {
            let data = [...criticalDamageValues];
            data[index].damage = "";
            data[index].type = "B";
            setCriticalDamageValues(data);
            return;
        };
        let data = [...criticalDamageValues];
        data.splice(index, 1)
        setCriticalDamageValues(data)
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='md'>
            <Typography component="h1" variant="h6" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Adicionar Ataque / Arma</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item xs={12}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="stored-attack-select-label" color="secondary">Selecionar ataque cadastrado</InputLabel>
                            <Select
                                labelId="stored-attack-value-select-label"
                                id="stored-attack-value-select"
                                value={storedAttack}
                                color="secondary"
                                size="small"
                                label="Selecionar ataque cadastrado"
                                onChange={handleStoredAttackChange}
                            >
                                {
                                    specifications.ataques.map((attack, index) => {
                                        if (attack.placeholder == true) {
                                            return (
                                                <MenuItem key={index} disabled value={attack.nome}>
                                                    <em>{attack.nome}</em>
                                                </MenuItem>
                                            )
                                        } else {
                                            return (
                                                <MenuItem key={index} value={attack.nome}>{attack.nome}</MenuItem>
                                            )
                                        }
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField id="attack" label="Ataque / Arma" variant="filled" color="secondary" size="small" fullWidth value={attack} onChange={(event) => setAttack(event.target.value)}/>
                    </Grid>
                    <Grid item xs={12}  md={3}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="category-select-label" color="secondary">Categoria</InputLabel>
                            <Select
                                labelId="category-value-select-label"
                                id="category-value-select"
                                value={category}
                                color="secondary"
                                size="small"
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
                    <Grid item xs={12}  md={3}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="margin-select-label" color="secondary">Crítico</InputLabel>
                            <Select
                                labelId="margin-value-select-label"
                                id="margin-value-select"
                                value={margin}
                                color="secondary"
                                label="Crítico"
                                size="small"
                                onChange={(event) => setMargin(event.target.value)}
                            >
                                <MenuItem value="-">-</MenuItem>
                                <MenuItem value="20">20 natural</MenuItem>
                                <MenuItem value="19">19 natural</MenuItem>
                                <MenuItem value="18">18 natural</MenuItem>
                                <MenuItem value="17">17 natural</MenuItem>
                                <MenuItem value="16">16 natural</MenuItem>
                                <MenuItem value="15">15 natural</MenuItem>
                                <MenuItem value="14">14 natural</MenuItem>
                                <MenuItem value="13">13 natural</MenuItem>
                                <MenuItem value="12">12 natural</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}  md={3}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="multiplier-select-label" color="secondary">Multiplicador</InputLabel>
                            <Select
                                labelId="multiplier-value-select-label"
                                id="multiplier-value-select"
                                value={multiplier}
                                size="small"
                                color="secondary"
                                label="Multiplicador"
                                onChange={(event) => setMultiplier(event.target.value)}
                            >
                                <MenuItem value="-">-</MenuItem>
                                <MenuItem value="x2">x2</MenuItem>
                                <MenuItem value="x3">x3</MenuItem>
                                <MenuItem value="x4">x4</MenuItem>
                                <MenuItem value="x5">x5</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}  md={3}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="range-select-label" color="secondary">Alcance</InputLabel>
                            <Select
                                labelId="range-value-select-label"
                                id="range-value-select"
                                value={range}
                                color="secondary"
                                size="small"
                                label="Alcance"
                                onChange={(event) => setRange(event.target.value)}
                            >
                                <MenuItem value="-">-</MenuItem>
                                <MenuItem value="Curto">Curto (até 9m)</MenuItem>
                                <MenuItem value="Médio">Médio (até 18m)</MenuItem>
                                <MenuItem value="Longo">Longo (até 36m)</MenuItem>
                                <MenuItem value="Extremo">Extremo (até 90m)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}  md={3}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="weight-select-label" color="secondary">Espaços</InputLabel>
                            <Select
                                labelId="weight-value-select-label"
                                id="weight-value-select"
                                value={weight}
                                color="secondary"
                                label="Espaços"
                                size="small"
                                onChange={(event) => setWeight(event.target.value)}
                            >
                                <MenuItem value="0">0</MenuItem>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}  md={3}>
                        <TextField 
                            id="description" 
                            label="Descrição" 
                            variant="filled" 
                            color="secondary" 
                            size="small"
                            value={description} 
                            onChange={(event) => setDescription(event.target.value)}
                            fullWidth
                        />
                    </Grid>
                    {buttonFunction == "create" ? 
                        <Grid item xs={12} md={3}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel id="add-to-inventory-select-label" color="secondary">Adicionar ao Inventário?</InputLabel>
                                <Select
                                    labelId="add-to-inventory-value-select-label"
                                    id="add-to-inventory-value-select"
                                    value={addToInventoryValue}
                                    color="secondary"
                                    size="small"
                                    label="Adicionar ao Inventário?"
                                    onChange={(event) => setAddToInventoryValue(event.target.value)}
                                >
                                    <MenuItem value={true}>Sim</MenuItem>
                                    <MenuItem value={false}>Não</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    : <></>}

                    <Grid item xs={12}>
                        <Typography component="h1" variant="h6" color="inherit" sx={{ mt: 3 }}>Dano</Typography>
                        <Typography component="p" variant="body2" color="text.secondary" sx={{ mt: 0 }}>Evite espaços e acentos. Exemplo de rolagem: 2d6+3</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {damageValues.map((damage, index) => (
                            <Grid key={index} container spacing={1} sx={{ mb: 1 }}>
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        id="damage" 
                                        name="damage"
                                        label="Dano" 
                                        variant="filled" 
                                        color="secondary" 
                                        size="small"
                                        value={damage.damage} 
                                        onChange={(event) => handleDynamicDamageChange(event, index)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="filled" fullWidth>
                                        <InputLabel id="damageTypeLabel" name="damageTypeLabel" color="secondary">Tipo</InputLabel>
                                        <Select
                                            labelId="damageType"
                                            id="type"
                                            name="type"
                                            value={damage.type}
                                            color="secondary"
                                            label="Tipo"
                                            size="small"
                                            onChange={(event) => handleDynamicDamageChange(event, index)}
                                        >
                                            <MenuItem value="Balístico">Balístico</MenuItem>
                                            <MenuItem value="Corte">Corte</MenuItem>
                                            <MenuItem value="Eletricidade">Eletricidade</MenuItem>
                                            <MenuItem value="Fogo">Fogo</MenuItem>
                                            <MenuItem value="Frio">Frio</MenuItem>
                                            <MenuItem value="Impacto">Impacto</MenuItem>
                                            <MenuItem value="Mental">Mental</MenuItem>
                                            <MenuItem value="Conhecimento">Conhecimento</MenuItem>
                                            <MenuItem value="Morte">Morte</MenuItem>
                                            <MenuItem value="Sangue">Sangue</MenuItem>
                                            <MenuItem value="Energia">Energia</MenuItem>
                                            <MenuItem value="Perfuração">Perfuração</MenuItem>
                                            <MenuItem value="Químico">Químico</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Button onClick={() => handleRemoveDamage(index)} color="inherit" sx={{ mt: 0.8 }} fullWidth>Remover Dano</Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleAddDamage} color="inherit">Adicionar dano</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography component="h1" variant="h6" color="inherit" sx={{ mt: 2 }}>Dano Crítico</Typography>
                        <Typography component="p" variant="body2" color="text.secondary" sx={{ mt: 0 }}>Evite espaços e acentos. Exemplo de rolagem: 2d6+3</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {criticalDamageValues.map((damage, index) => (
                            <Grid key={index} container spacing={1} sx={{ mb: 1 }}>
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        id="damage" 
                                        name="damage"
                                        label="Dano" 
                                        variant="filled" 
                                        color="secondary" 
                                        size="small"
                                        value={damage.damage} 
                                        onChange={(event) => handleDynamicCriticalChange(event, index)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl variant="filled" fullWidth>
                                        <InputLabel id="criticalDamageTypeLabel" name="criticalDamageTypeLabel" color="secondary">Tipo</InputLabel>
                                        <Select
                                            labelId="criticalDamageType"
                                            id="type"
                                            name="type"
                                            value={damage.type}
                                            color="secondary"
                                            label="Tipo"
                                            size="small"
                                            onChange={(event) => handleDynamicCriticalChange(event, index)}
                                        >
                                            <MenuItem value="Balístico">Balístico</MenuItem>
                                            <MenuItem value="Corte">Corte</MenuItem>
                                            <MenuItem value="Eletricidade">Eletricidade</MenuItem>
                                            <MenuItem value="Fogo">Fogo</MenuItem>
                                            <MenuItem value="Frio">Frio</MenuItem>
                                            <MenuItem value="Impacto">Impacto</MenuItem>
                                            <MenuItem value="Mental">Mental</MenuItem>
                                            <MenuItem value="Conhecimento">Conhecimento</MenuItem>
                                            <MenuItem value="Morte">Morte</MenuItem>
                                            <MenuItem value="Sangue">Sangue</MenuItem>
                                            <MenuItem value="Energia">Energia</MenuItem>
                                            <MenuItem value="Perfuração">Perfuração</MenuItem>
                                            <MenuItem value="Químico">Químico</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Button onClick={() => handleRemoveCriticalDamage(index)} color="inherit" sx={{ mt: 0.8 }} fullWidth>Remover Dano</Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleAddCriticalDamage} color="inherit">Adicionar dano crítico</Button>
                    </Grid>

                    <Grid item xs={12}  md={12}>
                        <LoadingButton 
                            color="secondary" 
                            variant='text' 
                            endIcon={<SaveAsIcon/>} 
                            size="large" 
                            fullWidth
                            onClick={handleAttack}
                            loading={addAttackLoading}
                        >
                            {buttonFunction == "create" ? "Adicionar" : "Atualizar"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}