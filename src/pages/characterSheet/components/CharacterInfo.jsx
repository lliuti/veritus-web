import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../../services/api';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export function CharacterInfo({ characterInfo, fetchCharacter }) {
    const [rank, setRank] = useState('');
    const [affinity, setAffinity] = useState('');
    const [background, setBackground] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [archetype, setArchetypeClass] = useState('');
    const [name, setName] = useState('');
    const [nex, setNex] = useState('');
    const [movement, setMovement] = useState('');

    const [hpModByNex, setHpModByNex] = useState('');
    const [epModByNex, setEpModByNex] = useState('');
    const [spModByNex, setSpModByNex] = useState('');
    const [hpMod, setHpMod] = useState('');
    const [epMod, setEpMod] = useState('');
    const [spMod, setSpMod] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fillCharacterInfo();
    }, [characterInfo]);

    const fillCharacterInfo = () => {
        setCharacterClass(characterInfo.characterClass);
        setArchetypeClass(characterInfo.archetype);
        setBackground(characterInfo.background);
        setAffinity(characterInfo.affinity);
        setRank(characterInfo.rank);
        setMovement(characterInfo.movement);
        setNex(characterInfo.nex);
        setName(characterInfo.name);
        setHpModByNex(characterInfo.hpModByNex);
        setEpModByNex(characterInfo.epModByNex);
        setSpModByNex(characterInfo.spModByNex);
        setHpMod(characterInfo.hpMod);
        setEpMod(characterInfo.epMod);
        setSpMod(characterInfo.spMod);
    }


    const handleRankChange = (event) => {
        setRank(event.target.value);
    };

    const handleAffinityChange = (event) => {
        setAffinity(event.target.value);
    };
    
    const handleBackgroundChange = (event) => {
        setBackground(event.target.value);
    };
   
    const handleClassChange = (event) => {
        setCharacterClass(event.target.value);
    };
    
    const handleArchetypeChange = (event) => {
        setArchetypeClass(event.target.value);
    };

    const handleUpdateCharacterInfo = async () => {
        await api.put(`/characters/${characterInfo.id}/info`, { rank, affinity, background, characterClass, archetype, name, nex, movement });

        fetchCharacter();
        enqueueSnackbar("Informações atualizadas.", { 
            variant: "info"
        });
    };

    return (
        <Grid item xs={12} sm={6} md={12}>
            <Typography component="h1" variant="h5" color="inherit">Informacões</Typography>
            <Grid container spacing={1}>
                <Grid item xs={6} md={1.714285714285714} sm={3}>
                    <TextField
                        margin="normal"
                        id="name"
                        label="Nome"
                        name="name"
                        fullWidth
                        variant="filled"
                        color='secondary'
                        value={name || ''}
                        onChange={(event) => setName(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                        <InputLabel id="rank-select-label" color="secondary">Patente</InputLabel>
                        <Select
                            labelId="rank-select-label"
                            id="rank-select"
                            value={rank || ''}
                            color="secondary"
                            fullWidth
                            label="Patente"
                            onChange={handleRankChange}
                            onBlur={handleUpdateCharacterInfo}
                        >
                            <MenuItem value={"Recruta"}>Recruta</MenuItem>
                            <MenuItem value={"Operador"}>Operador</MenuItem>
                            <MenuItem value={"Agente especial"}>Agente especial</MenuItem>
                            <MenuItem value={"Oficial de operações"}>Oficial de operações</MenuItem>
                            <MenuItem value={"Agente de elite"}>Agente de elite</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <TextField
                        margin="normal"
                        id="nex"
                        label="NEX %"
                        name="nex"
                        type="number"
                        fullWidth
                        variant="filled"
                        color='secondary'
                        value={nex || ''}
                        onChange={(event) => setNex(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                        <InputLabel id="affinity-select-label" color="secondary">Afinidade</InputLabel>
                        <Select
                            labelId="affinity-select-label"
                            id="affinity-select"
                            value={affinity || ''}
                            fullWidth
                            label="Afinidade"
                            onChange={handleAffinityChange}
                            onBlur={handleUpdateCharacterInfo}
                            color="secondary"
                        >
                            <MenuItem value={"Nenhuma"}>Nenhuma</MenuItem>
                            <MenuItem value={"Conhecimento"}>Conhecimento</MenuItem>
                            <MenuItem value={"Energia"}>Energia</MenuItem>
                            <MenuItem value={"Morte"}>Morte</MenuItem>
                            <MenuItem value={"Sangue"}>Sangue</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <TextField
                        margin="normal"
                        id="hpModifierByNex"
                        label="Modif. PV p/ NEX"
                        name="hpModifierByNex"
                        variant="filled"
                        fullWidth
                        disabled
                        color='secondary'
                        value={hpModByNex || ''}
                        onChange={(event) => setHpModByNex(event.target.value)}
                    />
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <TextField
                        margin="normal"
                        id="epModifierByNex"
                        label="Modif. PE p/ NEX"
                        name="epModifierByNex"
                        variant="filled"
                        disabled
                        fullWidth
                        color='secondary'
                        value={epModByNex || ''}
                        onChange={(event) => setEpModByNex(event.target.value)}
                    />
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={12}>
                    <TextField
                        margin="normal"
                        id="sanModifierByNex"
                        label="Modif. PS p/ NEX"
                        name="sanModifierByNex"
                        variant="filled"
                        disabled
                        fullWidth
                        color='secondary'
                        value={spModByNex || ''}
                        onChange={(event) => setSpModByNex(event.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                        <InputLabel id="background-select-label" color="secondary">Origem</InputLabel>
                        <Select
                            labelId="background-select-label"
                            id="background-select"
                            value={background || ''}
                            label="Origem"
                            fullWidth
                            onChange={handleBackgroundChange}
                            onBlur={handleUpdateCharacterInfo}
                            color="secondary"
                        >
                            <MenuItem value={"Acadêmico"}>Acadêmico</MenuItem>
                            <MenuItem value={"Agente de Saúde"}>Agente de Saúde</MenuItem>
                            <MenuItem value={"Amnésico"}>Amnésico</MenuItem>
                            <MenuItem value={"Artista"}>Artista</MenuItem>
                            <MenuItem value={"Atleta"}>Atleta</MenuItem>
                            <MenuItem value={"Chef"}>Chef</MenuItem>
                            <MenuItem value={"Criminoso"}>Criminoso</MenuItem>
                            <MenuItem value={"Cultista Arrependido"}>Cultista Arrependido</MenuItem>
                            <MenuItem value={"Desgarrado"}>Desgarrado</MenuItem>
                            <MenuItem value={"Engenheiro"}>Engenheiro</MenuItem>
                            <MenuItem value={"Executivo"}>Executivo</MenuItem>
                            <MenuItem value={"Investigador"}>Investigador</MenuItem>
                            <MenuItem value={"Lutador"}>Lutador</MenuItem>
                            <MenuItem value={"Magnata"}>Magnata</MenuItem>
                            <MenuItem value={"Mercenário"}>Mercenário</MenuItem>
                            <MenuItem value={"Militar"}>Militar</MenuItem>
                            <MenuItem value={"Operário"}>Operário</MenuItem>
                            <MenuItem value={"Policial"}>Policial</MenuItem>
                            <MenuItem value={"Religioso"}>Religioso</MenuItem>
                            <MenuItem value={"Servidor Público"}>Servidor Público</MenuItem>
                            <MenuItem value={"Teórico da Conspiração"}>Teórico da Conspiração</MenuItem>
                            <MenuItem value={"T.I."}>T.I.</MenuItem>
                            <MenuItem value={"Trabalhador Rural"}>Trabalhador Rural</MenuItem>
                            <MenuItem value={"Trambiqueiro"}>Trambiqueiro</MenuItem>
                            <MenuItem value={"Universitário"}>Universitário</MenuItem>
                            <MenuItem value={"Vítima"}>Vítima</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                        <InputLabel id="class-select-label" color="secondary">Classe</InputLabel>
                        <Select
                            labelId="class-select-label"
                            id="class-select"
                            value={characterClass || ''}
                            label="Classe"
                            fullWidth
                            onChange={handleClassChange}
                            onBlur={handleUpdateCharacterInfo}
                            color="secondary"
                        >
                            <MenuItem value={"Combatente"}>Combatente</MenuItem>
                            <MenuItem value={"Especialista"}>Especialista</MenuItem>
                            <MenuItem value={"Ocultista"}>Ocultista</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                        <InputLabel id="archetype-select-label" color="secondary">Trilha</InputLabel>
                            {(() => {
                                if (characterClass == "Combatente") {
                                    return (
                                        <Select
                                            labelId="archetype-select-label"
                                            id="archetype-select"
                                            value={archetype || ''}
                                            label="Trilha"
                                            fullWidth
                                            onChange={handleArchetypeChange}
                                            onBlur={handleUpdateCharacterInfo}
                                            color="secondary"
                                        >
                                            <MenuItem value={"Aniquilador"}>Aniquilador</MenuItem>
                                            <MenuItem value={"Comandante de Campo"}>Comandante de Campo</MenuItem>
                                            <MenuItem value={"Guerreiro"}>Guerreiro</MenuItem>
                                            <MenuItem value={"Operações Especiais"}>Operações Especiais</MenuItem>
                                            <MenuItem value={"Tropa de Choque"}>Tropa de Choque</MenuItem>
                                        </Select>
                                    )
                                } else if (characterClass == "Especialista") {
                                    return (
                                        <Select
                                            labelId="archetype-select-label"
                                            id="archetype-select"
                                            value={archetype || ''}
                                            label="Trilha"
                                            fullWidth
                                            onChange={handleArchetypeChange}
                                            onBlur={handleUpdateCharacterInfo}
                                            color="secondary"
                                        >
                                            <MenuItem value={"Atirador de Elite"}>Atirador de Elite</MenuItem>
                                            <MenuItem value={"Infiltrador"}>Infiltrador</MenuItem>
                                            <MenuItem value={"Médico de Campo"}>Médico de Campo</MenuItem>
                                            <MenuItem value={"Negociador"}>Negociador</MenuItem>
                                            <MenuItem value={"Técnico"}>Técnico</MenuItem>
                                        </Select>
                                    )
                                } else if (characterClass == "Ocultista") {
                                    return (
                                        <Select
                                            labelId="archetype-select-label"
                                            id="archetype-select"
                                            value={archetype || ''}
                                            label="Trilha"
                                            fullWidth
                                            onChange={handleArchetypeChange}
                                            onBlur={handleUpdateCharacterInfo}
                                            color="secondary"
                                        >
                                            <MenuItem value={"Conduíte"}>Conduíte</MenuItem>
                                            <MenuItem value={"Flagelador"}>Flagelador</MenuItem>
                                            <MenuItem value={"Graduado"}>Graduado</MenuItem>
                                            <MenuItem value={"Intuitivo"}>Intuitivo</MenuItem>
                                            <MenuItem value={"Lâmina Paranormal"}>Lâmina Paranormal</MenuItem>
                                        </Select>
                                    )
                                }
                            })()}
                    </FormControl>
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <TextField
                        margin="normal"
                        id="movement"
                        label="Deslocamento"
                        name="movement"
                        fullWidth
                        variant="filled"
                        color='secondary'
                        value={movement || ''}
                        onChange={(event) => setMovement(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <TextField
                        margin="normal"
                        id="hpModifier"
                        label="Modif. PV geral"
                        name="hpModifier"
                        fullWidth
                        variant="filled"
                        disabled
                        color='secondary'
                        value={hpMod || ''}
                        onChange={(event) => setHpMod(event.target.value)}
                    />
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={6}>
                    <TextField
                        margin="normal"
                        id="epModifier"
                        label="Modif. PE geral"
                        name="epModifier"
                        variant="filled"
                        fullWidth
                        disabled
                        color='secondary'
                        value={epMod || ''}
                        onChange={(event) => setEpMod(event.target.value)}
                    />
                </Grid>
                <Grid item md={1.714285714285714} sm={3} xs={12}>
                    <TextField
                        margin="normal"
                        id="sanModifier"
                        label="Modif. PS geral"
                        name="sanModifier"
                        variant="filled"
                        fullWidth
                        disabled
                        color='secondary'
                        value={spMod || ''}
                        onChange={(event) => setSpMod(event.target.value)}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}