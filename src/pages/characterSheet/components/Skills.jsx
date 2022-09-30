import { useSnackbar } from "notistack";
import { useEffect, useState } from 'react';
import { api } from "../../../services/api";
import { Bull } from "../../../components/Bull";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { VscCircleFilled } from "react-icons/vsc";

export function Skills({ characterSkills, fetchCharacter, openDialog }) {
    const [editSkillsOpen, setEditSkillsOpen] = useState(false);
    const [skillRollOpen, setSkillRollOpen] = useState(false);
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
    const [skillRollDialogInfo, setSkillRollDialogInfo] = useState([]);
    const [skillRollEnabled, setSkillRollEnabled] = useState(false);
    
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fillCharacterSkills();
    }, [characterSkills]);

    const fillCharacterSkills = () => {
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
    };

    const handleEditSkillsOpen = () => {
        setEditSkillsOpen(true);
    };
    
    const handleEditSkillsClose = () => {
        setEditSkillsOpen(false);
    };
    
    const handleSkillRollOpen = async (skill) => {
        setSkillRollEnabled(true);
        try {
            const response = await api.post(`/characters/${characterSkills.id}/roll/skill`, { skill });
            setSkillRollDialogInfo(response.data);
            setSkillRollOpen(true);
        } catch (err) {
            enqueueSnackbar("Não foi possível realizar a rolagem de perícia.", { 
                variant: "error"
            });
        }
        setSkillRollEnabled(false);
    };
    
    const handleSkillRollClose = () => {
        setSkillRollOpen(false);
    };

    return (
        <Grid item xs={12} md={4} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5" color="inherit" sx={{ mb: 1}}>Perícias</Typography>
            <Grid container spacing={{ xs: 0.8, sm: 1 }}>
                <Grid item xs={12} lg={6}>
                    <Button 
                        onClick={() => handleSkillRollOpen("acrobacia")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">AGI</Typography>
                            <Typography component="span" variant="inherit">Acrobacia</Typography>
                            <Typography component="span" variant="inherit">{acrobacia != "0" ? `+${acrobacia}` : "0"}</Typography>
                            {/* AGI <Bull/> Acrobacia {acrobacia != "0" ? `+${acrobacia}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("adestramento")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">PRE</Typography>
                            <Typography component="span" variant="inherit">Adestramento</Typography>
                            <Typography component="span" variant="inherit">{adestramento != "0" ? `+${adestramento}` : "0"}</Typography>
                            {/* PRE <Bull/> Adestramento {adestramento != "0" ? `+${adestramento}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("artes")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">PRE</Typography>
                            <Typography component="span" variant="inherit">Artes</Typography>
                            <Typography component="span" variant="inherit">{artes != "0" ? `+${artes}` : "0"}</Typography>
                            {/* PRE <Bull/> Artes {artes != "0" ? `+${artes}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("atletismo")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">FOR</Typography>
                            <Typography component="span" variant="inherit">Atletismo</Typography>
                            <Typography component="span" variant="inherit">{atletismo != "0" ? `+${atletismo}` : "0"}</Typography>
                            {/* FOR <Bull/> Atletismo {atletismo != "0" ? `+${atletismo}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("atualidades")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">INT</Typography>
                            <Typography component="span" variant="inherit">Atualidades</Typography>
                            <Typography component="span" variant="inherit">{atualidades != "0" ? `+${atualidades}` : "0"}</Typography>
                            {/* INT <Bull/> Atualidades {atualidades != "0" ? `+${atualidades}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("ciencias")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">INT</Typography>
                            <Typography component="span" variant="inherit">Ciencias</Typography>
                            <Typography component="span" variant="inherit">{ciencias != "0" ? `+${ciencias}` : "0"}</Typography>
                            {/* INT <Bull/> Ciencias {ciencias != "0" ? `+${ciencias}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("crime")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">AGI</Typography>
                            <Typography component="span" variant="inherit">Crime</Typography>
                            <Typography component="span" variant="inherit">{crime != "0" ? `+${crime}` : "0"}</Typography>
                            {/* AGI <Bull/> Crime {crime != "0" ? `+${crime}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("diplomacia")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">PRE</Typography>
                            <Typography component="span" variant="inherit">Diplomacia</Typography>
                            <Typography component="span" variant="inherit">{diplomacia != "0" ? `+${diplomacia}` : "0"}</Typography>
                            {/* PRE <Bull/> Diplomacia {diplomacia != "0" ? `+${diplomacia}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("enganacao")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">PRE</Typography>
                            <Typography component="span" variant="inherit">Enganação</Typography>
                            <Typography component="span" variant="inherit">{enganacao != "0" ? `+${enganacao}` : "0"}</Typography>
                            {/* PRE <Bull/> Enganação {enganacao != "0" ? `+${enganacao}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("fortitude")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">VIG</Typography>
                            <Typography component="span" variant="inherit">Fortitude</Typography>
                            <Typography component="span" variant="inherit">{fortitude != "0" ? `+${fortitude}` : "0"}</Typography>
                            {/* VIG <Bull/> Fortitude {fortitude != "0" ? `+${fortitude}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("furtividade")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">AGI</Typography>
                            <Typography component="span" variant="inherit">Furtividade</Typography>
                            <Typography component="span" variant="inherit">{furtividade != "0" ? `+${furtividade}` : "0"}</Typography>
                            {/* AGI <Bull/> Furtividade {furtividade != "0" ? `+${furtividade}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("iniciativa")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">AGI</Typography>
                            <Typography component="span" variant="inherit">Iniciativa</Typography>
                            <Typography component="span" variant="inherit">{iniciativa != "0" ? `+${iniciativa}` : "0"}</Typography>
                            {/* AGI <Bull/> Iniciativa {iniciativa != "0" ? `+${iniciativa}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("intimidacao")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">PRE</Typography>
                            <Typography component="span" variant="inherit">Intimidação</Typography>
                            <Typography component="span" variant="inherit">{intimidacao != "0" ? `+${intimidacao}` : "0"}</Typography>
                            {/* PRE <Bull/> Intimidação {intimidacao != "0" ? `+${intimidacao}` : ""} */}
                    </Button>
                    <Button 
                        onClick={() => handleSkillRollOpen("intuicao")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">PRE</Typography>
                            <Typography component="span" variant="inherit">Intuição</Typography>
                            <Typography component="span" variant="inherit">{intuicao != "0" ? `+${intuicao}` : "0"}</Typography>
                            {/* PRE <Bull/> Intuição {intuicao != "0" ? `+${intuicao}` : ""} */}
                    </Button>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Button
                        onClick={() => handleSkillRollOpen("investigacao")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">INT</Typography>
                            <Typography component="span" variant="inherit">Investigação</Typography>
                            <Typography component="span" variant="inherit">{investigacao != "0" ? `+${investigacao}` : "0"}</Typography>
                            {/* INT <Bull/> Investigação {investigacao != "0" ? `+${investigacao}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("luta")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">FOR</Typography>
                            <Typography component="span" variant="inherit">Luta</Typography>
                            <Typography component="span" variant="inherit">{luta != "0" ? `+${luta}` : "0"}</Typography>
                            {/* FOR <Bull/> Luta {luta != "0" ? `+${luta}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("medicina")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">INT</Typography>
                            <Typography component="span" variant="inherit">Medicina</Typography>
                            <Typography component="span" variant="inherit">{medicina != "0" ? `+${medicina}` : "0"}</Typography>
                            {/* INT <Bull/> Medicina {medicina != "0" ? `+${medicina}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("ocultismo")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">INT</Typography>
                            <Typography component="span" variant="inherit">Ocultismo</Typography>
                            <Typography component="span" variant="inherit">{ocultismo != "0" ? `+${ocultismo}` : "0"}</Typography>
                            {/* INT <Bull/> Ocultismo {ocultismo != "0" ? `+${ocultismo}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("percepcao")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">PRE</Typography>
                            <Typography component="span" variant="inherit">Percepção</Typography>
                            <Typography component="span" variant="inherit">{percepcao != "0" ? `+${percepcao}` : "0"}</Typography>
                            {/* PRE <Bull/> Percepção {percepcao != "0" ? `+${percepcao}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("pilotagem")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">AGI</Typography>
                            <Typography component="span" variant="inherit">Pilotagem</Typography>
                            <Typography component="span" variant="inherit">{pilotagem != "0" ? `+${pilotagem}` : "0"}</Typography>
                            {/* AGI <Bull/> Pilotagem {pilotagem != "0" ? `+${pilotagem}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("pontaria")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">AGI</Typography>
                            <Typography component="span" variant="inherit">Pontaria</Typography>
                            <Typography component="span" variant="inherit">{pontaria != "0" ? `+${pontaria}` : "0"}</Typography>
                            {/* AGI <Bull/> Pontaria {pontaria != "0" ? `+${pontaria}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("profissao")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">INT</Typography>
                            <Typography component="span" variant="inherit">Profissão</Typography>
                            <Typography component="span" variant="inherit">{profissao != "0" ? `+${profissao}` : "0"}</Typography>
                            {/* INT <Bull/> Profissão {profissao != "0" ? `+${profissao}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("reflexos")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">AGI</Typography>
                            <Typography component="span" variant="inherit">Reflexos</Typography>
                            <Typography component="span" variant="inherit">{reflexos != "0" ? `+${reflexos}` : "0"}</Typography>
                            {/* AGI <Bull/> Reflexos {reflexos != "0" ? `+${reflexos}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("religiao")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">PRE</Typography>
                            <Typography component="span" variant="inherit">Religião</Typography>
                            <Typography component="span" variant="inherit">{religiao != "0" ? `+${religiao}` : "0"}</Typography>
                            {/* PRE <Bull/> Religião {religiao != "0" ? `+${religiao}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("sobrevivencia")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">INT</Typography>
                            <Typography component="span" variant="inherit">Sobrevivência</Typography>
                            <Typography component="span" variant="inherit">{sobrevivencia != "0" ? `+${sobrevivencia}` : "0"}</Typography>
                            {/* INT <Bull/> Sobrevivência {sobrevivencia != "0" ? `+${sobrevivencia}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("tatica")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">INT</Typography>
                            <Typography component="span" variant="inherit">Tática</Typography>
                            <Typography component="span" variant="inherit">{tatica != "0" ? `+${tatica}` : "0"}</Typography>
                            {/* INT <Bull/> Tática {tatica != "0" ? `+${tatica}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("tecnologia")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">INT</Typography>
                            <Typography component="span" variant="inherit">Tecnologia</Typography>
                            <Typography component="span" variant="inherit">{tecnologia != "0" ? `+${tecnologia}` : "0"}</Typography>
                            {/* INT <Bull/> Tecnologia {tecnologia != "0" ? `+${tecnologia}` : ""} */}
                    </Button>
                    <Button
                        onClick={() => handleSkillRollOpen("vontade")} 
                        disabled={skillRollEnabled}
                        color="secondary" 
                        variant='outlined' 
                        fullWidth
                        size="small"
                        sx={{ my: 0.4, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="span" variant="inherit">PRE</Typography>
                            <Typography component="span" variant="inherit">Vontade</Typography>
                            <Typography component="span" variant="inherit">{vontade != "0" ? `+${vontade}` : "0"}</Typography>
                            {/* PRE <Bull/> Vontade {vontade != "0" ? `+${vontade}` : ""} */}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleEditSkillsOpen} color="inherit" variant='text' fullWidth sx={{ my: 0.4}}>Editar Perícias</Button>
                </Grid>
                <EditSkillsDialog open={editSkillsOpen} onClose={handleEditSkillsClose} characterSkills={characterSkills} fetchCharacter={fetchCharacter} openDialog={openDialog}/>
                <SkillRollDialog open={skillRollOpen} onClose={handleSkillRollClose} characterId={characterSkills.id} skillRollDialogInfo={skillRollDialogInfo}/>
            </Grid>

        </Grid>
    )
}

function SkillRollDialog(props) {
    const { onClose, open, skillRollDialogInfo } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Typography component="h1" variant="h5" color="inherit" sx={{ px: 2, paddingTop: 2 }}>Rolagem de {skillRollDialogInfo.skill} com {skillRollDialogInfo.attributeName}</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }}>
                    <Grid item xs={12}>
                        <Typography 
                            component="p" 
                            variant="body1" 
                            color="inherit"
                        >
                            Teste {skillRollDialogInfo.diceAmount == 0 ? "-1" : skillRollDialogInfo.diceAmount}d20{skillRollDialogInfo.skillModifier !== 0 ? `+${skillRollDialogInfo.skillModifier}` : ""}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography 
                            component="p" 
                            variant="body1" 
                            color="inherit"
                        >
                            Rolagens {skillRollDialogInfo.diceRolls}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography 
                            component="p" 
                            variant="body" 
                            color="inherit" 
                            sx={{ fontWeight: 'bold'}}
                        >
                            Resultado {skillRollDialogInfo.testResult}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'end', mt: 1}}>
                    <Grid item md={12}>
                        <Button onClick={handleClose} color="secondary" variant='text' endIcon={<SaveAsIcon/>} fullWidth>Fechar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}

function EditSkillsDialog(props) {
    const { onClose, open, characterSkills, fetchCharacter, openDialog } = props;

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
    }, [characterSkills]);

    const handleClose = () => {
        onClose();
    };
    
    const handleUpdateSkills = async () => {
        try {
            // setUpdateLoading(true);
            onClose();
            openDialog();
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
            <Box component="div" sx={{ p: 2 }}>
                <Grid container spacing={{ xs: 0.5, sm: 1}}>
                    <Grid item xs={12} sm={3}>
                        <FormControl variant="filled" fullWidth sx={{ mt: 1}}>
                            <InputLabel id="acrobacia-select-label" color="secondary">Acrobacia</InputLabel>
                            <Select
                                labelId="acrobacia-select-label"
                                id="acrobacia-select"
                                value={acrobacia}
                                color="secondary"
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
                </Grid>
                <Grid container sx={{ alignItems: 'end', mt: 1}}>
                    <Grid item xs={12}>
                        <LoadingButton 
                            onClick={handleUpdateSkills} 
                            color="secondary" 
                            variant='text' 
                            endIcon={<SaveAsIcon/>} 
                            fullWidth
                            // loading={updateLoading}
                        >
                                Atualizar Perícia
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}
