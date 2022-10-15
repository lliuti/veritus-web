import { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import { api } from "../../services/api";
import { specifications } from "../../specifications";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function EditSkillsDialog(props) {
    const { onClose, open, characterSkills, fetchCharacter, build } = props;

    const [acrobacia, setAcrobacia] = useState(""); 
    const [adestramento, setAdestramento] = useState(""); 
    const [artes, setArtes] = useState(""); 
    const [atletismo, setAtletismo] = useState(""); 
    const [atualidades, setAtualidades] = useState(""); 
    const [ciencias, setCiencias] = useState(""); 
    const [crime, setCrime] = useState(""); 
    const [diplomacia, setDiplomacia] = useState(""); 
    const [enganacao, setEnganacao] = useState(""); 
    const [fortitude, setFortitude] = useState(""); 
    const [furtividade, setFurtividade] = useState(""); 
    const [iniciativa, setIniciativa] = useState(""); 
    const [intimidacao, setIntimidacao] = useState(""); 
    const [intuicao, setIntuicao] = useState(""); 
    const [investigacao, setInvestigacao] = useState(""); 
    const [luta, setLuta] = useState(""); 
    const [medicina, setMedicina] = useState(""); 
    const [ocultismo, setOcultismo] = useState(""); 
    const [percepcao, setPercepcao] = useState(""); 
    const [pilotagem, setPilotagem] = useState(""); 
    const [pontaria, setPontaria] = useState(""); 
    const [profissao, setProfissao] = useState(""); 
    const [reflexos, setReflexos] = useState(""); 
    const [religiao, setReligiao] = useState(""); 
    const [sobrevivencia, setSobrevivencia] = useState(""); 
    const [tatica, setTatica] = useState(""); 
    const [tecnologia, setTecnologia] = useState(""); 
    const [vontade, setVontade] = useState(""); 
    const [updateLoading, setUpdateLoading] = useState(false);
    const [backgroundSkills, setBackgroundSkills] = useState("");
    const [classSkills, setClassSkills] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setAcrobacia(characterSkills.acrobacia);
        setAdestramento(characterSkills.adestramento);
        setArtes(characterSkills.artes);
        setAtletismo(characterSkills.atletismo);
        setAtualidades(characterSkills.atualidades);
        setCiencias(characterSkills.ciencias);
        setCrime(characterSkills.crime);
        setDiplomacia(characterSkills.diplomacia);
        setEnganacao(characterSkills.enganacao);
        setFortitude(characterSkills.fortitude);
        setFurtividade(characterSkills.furtividade);
        setIniciativa(characterSkills.iniciativa);
        setIntimidacao(characterSkills.intimidacao);
        setIntuicao(characterSkills.intuicao);
        setInvestigacao(characterSkills.investigacao);
        setLuta(characterSkills.luta);
        setMedicina(characterSkills.medicina);
        setOcultismo(characterSkills.ocultismo);
        setPercepcao(characterSkills.percepcao);
        setPilotagem(characterSkills.pilotagem);
        setPontaria(characterSkills.pontaria);
        setProfissao(characterSkills.profissao);
        setReflexos(characterSkills.reflexos);
        setReligiao(characterSkills.religiao);
        setSobrevivencia(characterSkills.sobrevivencia);
        setTatica(characterSkills.tatica);
        setTecnologia(characterSkills.tecnologia);
        setVontade(characterSkills.vontade);

        setBackgroundSkills(specifications.origens.find(x => x.background == build.background)?.pericias)
        setClassSkills(specifications.classes[build.class]?.pericias);
    }, [characterSkills]);

    const handleClose = () => {
        onClose();
    };
    
    const handleUpdateSkills = async () => {
        try {
            // setUpdateLoading(true);
            onClose();
            await api.put(`/characters/${characterSkills.id}/skills`, {
                acrobacia, adestramento, artes, atletismo, atualidades, ciencias, crime, diplomacia, enganacao, fortitude, furtividade, iniciativa, intimidacao, intuicao, investigacao, luta, medicina, ocultismo, percepcao, pilotagem, pontaria, profissao, reflexos, religiao, sobrevivencia, tatica, tecnologia, vontade, 
            });
            fetchCharacter();
            // setUpdateLoading(false);
            enqueueSnackbar("Perícias atualizadas.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar as perícias.", { 
                variant: "error"
            });
        }
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Editar Perícias</Typography>
            <Typography component="p" variant="body" color="text.secondary" sx={{ paddingLeft: 2, mt: 1 }}>Origem: {backgroundSkills}</Typography>
            <Typography component="p" variant="body" color="text.secondary" sx={{ paddingLeft: 2 }}>Classe: {classSkills}</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container spacing={{ xs: 0.5, sm: 1}}>
                    <Grid item xs={12} sm={3}>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="acrobacia-select-label" color="success">Acrobacia</InputLabel>
                            <Select
                                labelId="acrobacia-select-label"
                                id="acrobacia-select"
                                value={acrobacia}
                                color="success"
                                label="Perícia"
                                onChange={(event) => setAcrobacia(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="adestramento-select-label" color="secondary">Adestramento</InputLabel>
                            <Select
                                labelId="adestramento-select-label"
                                id="adestramento-select"
                                value={adestramento}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setAdestramento(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="artes-select-label" color="secondary">Artes</InputLabel>
                            <Select
                                labelId="artes-select-label"
                                id="artes-select"
                                value={artes}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setArtes(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="atletismo-select-label" color="secondary">Atletismo</InputLabel>
                            <Select
                                labelId="atletismo-select-label"
                                id="atletismo-select"
                                value={atletismo}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setAtletismo(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="atualidades-select-label" color="secondary">Atualidades</InputLabel>
                            <Select
                                labelId="atualidades-select-label"
                                id="atualidades-select"
                                value={atualidades}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setAtualidades(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="ciencias-select-label" color="secondary">Ciencias</InputLabel>
                            <Select
                                labelId="ciencias-select-label"
                                id="ciencias-select"
                                value={ciencias}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setCiencias(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="crime-select-label" color="secondary">Crime</InputLabel>
                            <Select
                                labelId="crime-select-label"
                                id="crime-select"
                                value={crime}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setCrime(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="diplomacia-select-label" color="secondary">Diplomacia</InputLabel>
                            <Select
                                labelId="diplomacia-select-label"
                                id="diplomacia-select"
                                value={diplomacia}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setDiplomacia(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="enganacao-select-label" color="secondary">Enganação</InputLabel>
                            <Select
                                labelId="enganacao-select-label"
                                id="enganacao-select"
                                value={enganacao}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setEnganacao(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="fortitude-select-label" color="secondary">Fortitude</InputLabel>
                            <Select
                                labelId="fortitude-select-label"
                                id="fortitude-select"
                                value={fortitude}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setFortitude(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="furtividade-select-label" color="secondary">Furtividade</InputLabel>
                            <Select
                                labelId="furtividade-select-label"
                                id="furtividade-select"
                                value={furtividade}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setFurtividade(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="iniciativa-select-label" color="secondary">Iniciativa</InputLabel>
                            <Select
                                labelId="iniciativa-select-label"
                                id="iniciativa-select"
                                value={iniciativa}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setIniciativa(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="intimidacao-select-label" color="secondary">Intimidação</InputLabel>
                            <Select
                                labelId="intimidacao-select-label"
                                id="intimidacao-select"
                                value={intimidacao}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setIntimidacao(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="intuicao-select-label" color="secondary">Intuição</InputLabel>
                            <Select
                                labelId="intuicao-select-label"
                                id="intuicao-select"
                                value={intuicao}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setIntuicao(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="investigacao-select-label" color="secondary">Investigação</InputLabel>
                            <Select
                                labelId="investigacao-select-label"
                                id="investigacao-select"
                                value={investigacao}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setInvestigacao(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="luta-select-label" color="secondary">Luta</InputLabel>
                            <Select
                                labelId="luta-select-label"
                                id="luta-select"
                                value={luta}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setLuta(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="medicina-select-label" color="secondary">Medicina</InputLabel>
                            <Select
                                labelId="medicina-select-label"
                                id="medicina-select"
                                value={medicina}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setMedicina(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="ocultismo-select-label" color="secondary">Ocultismo</InputLabel>
                            <Select
                                labelId="ocultismo-select-label"
                                id="ocultismo-select"
                                value={ocultismo}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setOcultismo(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="percepcao-select-label" color="secondary">Percepção</InputLabel>
                            <Select
                                labelId="percepcao-select-label"
                                id="percepcao-select"
                                value={percepcao}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setPercepcao(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="pilotagem-select-label" color="secondary">Pilotagem</InputLabel>
                            <Select
                                labelId="pilotagem-select-label"
                                id="pilotagem-select"
                                value={pilotagem}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setPilotagem(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="pontaria-select-label" color="secondary">Pontaria</InputLabel>
                            <Select
                                labelId="pontaria-select-label"
                                id="pontaria-select"
                                value={pontaria}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setPontaria(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="profissao-select-label" color="secondary">Profissão</InputLabel>
                            <Select
                                labelId="profissao-select-label"
                                id="profissao-select"
                                value={profissao}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setProfissao(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="reflexos-select-label" color="secondary">Reflexos</InputLabel>
                            <Select
                                labelId="reflexos-select-label"
                                id="reflexos-select"
                                value={reflexos}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setReflexos(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="religiao-select-label" color="secondary">Religião</InputLabel>
                            <Select
                                labelId="religiao-select-label"
                                id="religiao-select"
                                value={religiao}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setReligiao(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="sobrevivencia-select-label" color="secondary">Sobrevivencia</InputLabel>
                            <Select
                                labelId="sobrevivencia-select-label"
                                id="sobrevivencia-select"
                                value={sobrevivencia}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setSobrevivencia(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="tatica-select-label" color="secondary">Tática</InputLabel>
                            <Select
                                labelId="tatica-select-label"
                                id="tatica-select"
                                value={tatica}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setTatica(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="tecnologia-select-label" color="secondary">Tecnologia</InputLabel>
                            <Select
                                labelId="tecnologia-select-label"
                                id="tecnologia-select"
                                value={tecnologia}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setTecnologia(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="vontade-select-label" color="secondary">Vontade</InputLabel>
                            <Select
                                labelId="vontade-select-label"
                                id="vontade-select"
                                value={vontade}
                                color="secondary"
                                label="Perícia"
                                onChange={(event) => setVontade(event.target.value)}
                            >
                                <MenuItem value={"0"}>Leigo: +0</MenuItem>
                                <MenuItem value={"5"}>Treinado: +5</MenuItem>
                                <MenuItem value={"10"}>Veterano: +10</MenuItem>
                                <MenuItem value={"15"}>Expert: +15</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton 
                            onClick={handleUpdateSkills} 
                            color="secondary" 
                            variant='text' 
                            endIcon={<SaveAsIcon/>} 
                            fullWidth
                            // loading={updateLoading}
                        >
                                Atualizar
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}