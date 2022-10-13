import { useSnackbar } from "notistack";
import { useEffect, useState } from 'react';
import { api } from "../../../services/api";
import { EditSkillsDialog } from "../../../components/skills/EditSkillsDialog";
import { SkillRollDialog } from "../../../components/skills/SkillRollDialog";
import { EditBonusDialog } from "../../../components/skills/EditBonusDialog";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export function Skills({ characterSkills, fetchCharacter, build }) {
    const [editSkillsOpen, setEditSkillsOpen] = useState(false);
    const [editBonusOpen, setEditBonusOpen] = useState(false);
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
        setAcrobacia(parseInt(characterSkills.acrobacia) + parseInt(characterSkills.bonuses?.acrobacia));
        setAdestramento(parseInt(characterSkills.adestramento) + parseInt(characterSkills.bonuses?.adestramento));
        setArtes(parseInt(characterSkills.artes) + parseInt(characterSkills.bonuses?.artes));
        setAtletismo(parseInt(characterSkills.atletismo) + parseInt(characterSkills.bonuses?.atletismo));
        setAtualidades(parseInt(characterSkills.atualidades) + parseInt(characterSkills.bonuses?.atualidades));
        setCiencias(parseInt(characterSkills.ciencias) + parseInt(characterSkills.bonuses?.ciencias));
        setCrime(parseInt(characterSkills.crime) + parseInt(characterSkills.bonuses?.crime));
        setDiplomacia(parseInt(characterSkills.diplomacia) + parseInt(characterSkills.bonuses?.diplomacia));
        setEnganacao(parseInt(characterSkills.enganacao) + parseInt(characterSkills.bonuses?.enganacao));
        setFortitude(parseInt(characterSkills.fortitude) + parseInt(characterSkills.bonuses?.fortitude));
        setFurtividade(parseInt(characterSkills.furtividade) + parseInt(characterSkills.bonuses?.furtividade));
        setIniciativa(parseInt(characterSkills.iniciativa) + parseInt(characterSkills.bonuses?.iniciativa));
        setIntimidacao(parseInt(characterSkills.intimidacao) + parseInt(characterSkills.bonuses?.intimidacao));
        setIntuicao(parseInt(characterSkills.intuicao) + parseInt(characterSkills.bonuses?.intuicao));
        setInvestigacao(parseInt(characterSkills.investigacao) + parseInt(characterSkills.bonuses?.investigacao));
        setLuta(parseInt(characterSkills.luta) + parseInt(characterSkills.bonuses?.luta));
        setMedicina(parseInt(characterSkills.medicina) + parseInt(characterSkills.bonuses?.medicina));
        setOcultismo(parseInt(characterSkills.ocultismo) + parseInt(characterSkills.bonuses?.ocultismo));
        setPercepcao(parseInt(characterSkills.percepcao) + parseInt(characterSkills.bonuses?.percepcao));
        setPilotagem(parseInt(characterSkills.pilotagem) + parseInt(characterSkills.bonuses?.pilotagem));
        setPontaria(parseInt(characterSkills.pontaria) + parseInt(characterSkills.bonuses?.pontaria));
        setProfissao(parseInt(characterSkills.profissao) + parseInt(characterSkills.bonuses?.profissao));
        setReflexos(parseInt(characterSkills.reflexos) + parseInt(characterSkills.bonuses?.reflexos));
        setReligiao(parseInt(characterSkills.religiao) + parseInt(characterSkills.bonuses?.religiao));
        setSobrevivencia(parseInt(characterSkills.sobrevivencia) + parseInt(characterSkills.bonuses?.sobrevivencia));
        setTatica(parseInt(characterSkills.tatica) + parseInt(characterSkills.bonuses?.tatica));
        setTecnologia(parseInt(characterSkills.tecnologia) + parseInt(characterSkills.bonuses?.tecnologia));
        setVontade(parseInt(characterSkills.vontade) + parseInt(characterSkills.bonuses?.vontade));
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
                <Grid item xs={6}>
                    <Button onClick={() => setEditBonusOpen(true)} color="inherit" variant='text' fullWidth  sx={{ mt: 0}}>Editar Bônus</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => setEditSkillsOpen(true)} color="inherit" variant='text' fullWidth sx={{ mt: 0}}>Editar Perícias</Button>
                </Grid>
                <SkillRollDialog open={skillRollOpen} onClose={() => setSkillRollOpen(false)} characterId={characterSkills.id} skillRollDialogInfo={skillRollDialogInfo}/>
                <EditSkillsDialog open={editSkillsOpen} onClose={() => setEditSkillsOpen(false)} characterSkills={characterSkills} build={build} fetchCharacter={fetchCharacter}/>
                <EditBonusDialog open={editBonusOpen} onClose={() => setEditBonusOpen(false)} characterSkills={characterSkills} fetchCharacter={fetchCharacter}/>
            </Grid>

        </Grid>
    )
}