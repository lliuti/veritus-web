import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../../services/api';
import { ModifiersDialog } from '../../../components/ModifiersDialog';
// import { BuildChanger } from '../../../components/BuildChanger';
import { RiSwordFill } from "react-icons/ri";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

export function CharacterInfo({ characterInfo, fetchCharacter }) {
    const [rank, setRank] = useState('');
    const [affinity, setAffinity] = useState('');
    const [background, setBackground] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [archetype, setArchetype] = useState('');
    const [name, setName] = useState('');
    const [nex, setNex] = useState(0);
    const [movement, setMovement] = useState('');
    const [loadingRecalculate, setLoadingRecalculate] = useState(false);
    const [modifiersDialogOpen, setModifiersDialogOpen] = useState(false);
    const [recalculate, setRecalculate] = useState(false);
    const [buildChangerOpen, setBuildChangerOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fillCharacterInfo();
    }, [characterInfo]);

    const fillCharacterInfo = () => {
        setCharacterClass(characterInfo.characterClass);
        setArchetype(characterInfo.archetype);
        setBackground(characterInfo.background);
        setAffinity(characterInfo.affinity);
        setRank(characterInfo.rank);
        setMovement(characterInfo.movement);
        setNex(parseInt(characterInfo.nex));
        setName(characterInfo.name);
        setRecalculate(characterInfo.enableRecalculate);
    }

    const handleUpdateCharacterInfo = async () => {
        try {
            await api.put(`/characters/${characterInfo.id}/info`, { rank, affinity, background, characterClass, archetype, name, nex: nex.toString(), movement });
            enqueueSnackbar("Informações atualizadas.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar as informações.", { 
                variant: "error"
            });
        }
    };

    const handleNexChange = (event) => {
        if ((nex == 95 || nex == "95") && event.target.value == "100") {
            setNex("99");
        } else if ((nex == 99 || nex == "99") && event.target.value == "100") {
            setNex("99");
        } else {
            setNex(event.target.value)
        }
    }

    const handleRecalculate = async () => {
        setLoadingRecalculate(true);
        try {
            await api.post(`/characters/${characterInfo.id}/recalculate`);
            enqueueSnackbar("Estatísticas recalculadas.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possivel recalcular estatísticas.", { 
                variant: "error"
            });
        }
        setLoadingRecalculate(false);
        fetchCharacter();
    }

    return (
        <Grid item xs={12} sm={6} md={12} sx={{ mt: 3}}>
            <Typography component="h1" variant="h5" color="inherit">Informações</Typography>
            <Grid container columnSpacing={1} rowSpacing={0}>
                {/* <Grid item xs={12}>
                    <Button 
                        color="secondary" 
                        variant='outlined'  
                        size="large" 
                        sx={{ mt: 3 }}
                        onClick={() => setBuildChangerOpen(true)}
                        endIcon={<RiSwordFill/>}
                    >
                        Build
                    </Button>
                    <BuildChanger 
                        open={buildChangerOpen} 
                        onClose={() => setBuildChangerOpen(false)}
                    />
                </Grid> */}
                <Grid item xs={6} sm={6} md={2.4}>
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
                <Grid item xs={6} sm={6} md={2.4}>
                    <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                        <InputLabel id="rank-select-label" color="secondary">Patente</InputLabel>
                        <Select
                            labelId="rank-select-label"
                            id="rank-select"
                            value={rank || ''}
                            color="secondary"
                            fullWidth
                            label="Patente"
                            onChange={(event) => setRank(event.target.value)}
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
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        margin="normal"
                        id="nex"
                        label="NEX %"
                        name="nex"
                        type="number"
                        inputProps={{ min: "0", max: "100", step: "5" }}
                        fullWidth
                        variant="filled"
                        color='secondary'
                        value={nex || 0}
                        onChange={handleNexChange}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                        <InputLabel id="affinity-select-label" color="secondary">Afinidade</InputLabel>
                        <Select
                            labelId="affinity-select-label"
                            id="affinity-select"
                            value={affinity || ''}
                            fullWidth
                            label="Afinidade"
                            onChange={(event) => setAffinity(event.target.value)}
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
                <Grid item xs={6} sm={6} md={2.4} sx={{ display: { xs: "none", sm: "block" } }}>
                    <Button 
                        color="secondary" 
                        variant='outlined' 
                        fullWidth 
                        size="large" 
                        sx={{ mt: 3 }}
                        onClick={() => setModifiersDialogOpen(true)}
                    >
                        Modificadores
                    </Button>
                </Grid>
                <ModifiersDialog 
                    open={modifiersDialogOpen} 
                    onClose={() => setModifiersDialogOpen(false)}
                    characterId={characterInfo.id} 
                    modifiers={{ 
                        hpMod: characterInfo.hpMod, 
                        hpModByNex: characterInfo.hpModByNex, 
                        epMod: characterInfo.epMod, 
                        epModByNex: characterInfo.epModByNex, 
                        spMod: characterInfo.spMod, 
                        spModByNex: characterInfo.spModByNex,
                        transcendences: characterInfo.transcendences,
                    }}
                />
                <Grid item xs={6} sm={6} md={2.4}>
                    <Tooltip 
                        title='As origens "Desgarrado", "Vítima", "Universitário" e "Cultista Arrependido" são calculadas automaticamente, sem a necessidade de utilizar os modificadores manuais.' 
                        placement="top"
                    >
                        <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                            <InputLabel id="background-select-label" color="secondary">Origem</InputLabel>
                            <Select
                                labelId="background-select-label"
                                id="background-select"
                                value={background || ''}
                                label="Origem"
                                fullWidth
                                onChange={(event) => setBackground(event.target.value)}
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
                    </Tooltip>
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <FormControl variant="filled" fullWidth sx={{ mt: 2}}>
                        <InputLabel id="class-select-label" color="secondary">Classe</InputLabel>
                        <Select
                            labelId="class-select-label"
                            id="class-select"
                            value={characterClass || ''}
                            label="Classe"
                            fullWidth
                            onChange={(event) => setCharacterClass(event.target.value)}
                            onBlur={handleUpdateCharacterInfo}
                            color="secondary"
                        >
                            <MenuItem value={"Combatente"}>Combatente</MenuItem>
                            <MenuItem value={"Especialista"}>Especialista</MenuItem>
                            <MenuItem value={"Ocultista"}>Ocultista</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
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
                                            onChange={(event) => setArchetype(event.target.value)}
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
                                            onChange={(event) => setArchetype(event.target.value)}
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
                                            onChange={(event) => setArchetype(event.target.value)}
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
                <Grid item xs={6} sm={6} md={2.4}>
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
                <Grid item xs={6} sm={6} md={2.4}>
                    <LoadingButton 
                        loading={loadingRecalculate}
                        onClick={handleRecalculate} 
                        color="secondary" 
                        variant='outlined' 
                        endIcon={<RotateLeftIcon/>}
                        size="large"
                        fullWidth
                        sx={{ mt: 3}}
                    >
                        Recalcular
                    </LoadingButton>
                </Grid>
                <Grid item xs={6} sm={6} md={2.4} sx={{ display: { xs: "block", sm: "none" } }}>
                    <Button 
                        color="secondary" 
                        variant='outlined' 
                        fullWidth 
                        size="large" 
                        sx={{ mt: 3 }}
                        onClick={() => setModifiersDialogOpen(true)}
                    >
                        Modificadores
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}