import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../services/api';

import Grid from '@mui/material/Grid';
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

export const AddAttackDialog = (props) => {
    const { onClose, open, characterId, fetchCharacter, attackToEdit } = props;
    const [addToInventoryValue, setAddToInventoryValue] = useState(true);
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
    const [buttonFunction, setButtonFunction] = useState("create");

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
        if (!attack) {
            enqueueSnackbar("Digite pelo menos um nome para o ataque.", { 
                variant: "error"
            });
            return;
        }

        if (!test || !damage) {
            enqueueSnackbar("Todo ataque precisa de um valor para Teste e Dano.", { 
                variant: "error"
            });
            return;
        }

        if (buttonFunction == "create") {
            try {
                await api.post(`/characters/${characterId}/attack`, {
                    attack,
                    test: test.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    damage: damage.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
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
                    damage: damage.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
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
        setDamageType("");
        setCategory("");
        setMargin("");
        setMultiplier("");
        setRange("");
        setWeight("");
        setDescription("");

        fetchCharacter();
        onClose();
        setButtonFunction("create");
    }   

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Adicionar Ataque / Arma</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }} spacing={1}>
                    <Grid item xs={12} md={3}>
                        <TextField id="attack" label="Ataque / Arma" variant="filled" color="secondary" size="regular" fullWidth value={attack} onChange={(event) => setAttack(event.target.value)}/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Tooltip 
                            title='Exemplo de teste: "3d20+5". Evite espaços e acentos.' 
                            placement="top"
                        >
                            <TextField id="test" label="Teste" variant="filled" color="secondary" size="regular" fullWidth value={test} onChange={(event) => setTest(event.target.value)}/>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12}  md={3}>
                        <Tooltip 
                            // title='Exemplo de teste dinâmico: "2d6+[AGI]". Exemplo de teste simples: "2d6+3".' 
                            title='Exemplo de teste: "2d6+3+1d8". Evite espaços e acentos.'
                            placement="top"
                        >
                            <TextField id="damage" label="Dano" variant="filled" color="secondary" size="regular" fullWidth value={damage} onChange={(event) => setDamage(event.target.value)}/>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12}  md={3}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="damage-type-select-label" color="secondary">Tipo</InputLabel>
                            <Select
                                labelId="damage-type-value-select-label"
                                id="damage-type-value-select"
                                value={damageType}
                                color="secondary"
                                label="Tipo"
                                onChange={(event) => setDamageType(event.target.value)}
                            >
                                <MenuItem value="B">Balístico</MenuItem>
                                <MenuItem value="C">Corte</MenuItem>
                                <MenuItem value="Eletricidade">Eletricidade</MenuItem>
                                <MenuItem value="Fogo">Fogo</MenuItem>
                                <MenuItem value="Frio">Frio</MenuItem>
                                <MenuItem value="I">Impacto</MenuItem>
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
                    <Grid item xs={12}  md={3}>
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
                    <Grid item xs={12}  md={3}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="margin-select-label" color="secondary">Crítico</InputLabel>
                            <Select
                                labelId="margin-value-select-label"
                                id="margin-value-select"
                                value={margin}
                                color="secondary"
                                label="Crítico"
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
                            size="regular"
                            value={description} 
                            onChange={(event) => setDescription(event.target.value)}
                            fullWidth
                        />
                    </Grid>
                    {buttonFunction == "create" ? 
                        <Grid item xs={12}  md={3}>
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
                    : <></>}
                    <Grid item xs={12}  md={12}>
                        <Button 
                            color="secondary" 
                            variant='text' 
                            endIcon={<SaveAsIcon/>} 
                            size="large" 
                            fullWidth
                            onClick={handleAttack}
                        >
                            {buttonFunction == "create" ? "Adicionar" : "Atualizar"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}