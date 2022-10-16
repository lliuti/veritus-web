import { useSnackbar } from "notistack";
import { useEffect, useState } from 'react';
import { api } from "../../../services/api";
import { EditSkillsDialog } from "../../../components/skills/EditSkillsDialog";
import { SkillRollDialog } from "../../../components/skills/SkillRollDialog";
import { EditBonusDialog } from "../../../components/skills/EditBonusDialog";
import { FaPencilAlt } from "react-icons/fa";
import { SkillButton } from "../../../components/skills/SkillButton";
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
        <Grid item xs={12} md={4} sx={{ mt: 5 }}>
            <Typography component="h1" variant="h6" color="inherit" sx={{ mb: 1}}>Perícias</Typography>
            <Grid container spacing={{ xs: 0.8, sm: 1 }}>
                <Grid item xs={12} lg={6}>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("acrobacia")} skillShort="AGI" skillFull="Acrobacia" skill={acrobacia}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("adestramento")} skillShort="PRE" skillFull="Adestramento" skill={adestramento}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("artes")} skillShort="PRE" skillFull="Artes" skill={artes}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("atletismo")} skillShort="FOR" skillFull="Atletismo" skill={atletismo}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("atualidades")} skillShort="INT" skillFull="Atualidades" skill={atualidades}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("ciencias")} skillShort="INT" skillFull="Ciencias" skill={ciencias}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("crime")} skillShort="AGI" skillFull="Crime" skill={crime}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("diplomacia")} skillShort="PRE" skillFull="Diplomacia" skill={diplomacia}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("enganacao")} skillShort="PRE" skillFull="Enganação" skill={enganacao}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("fortitude")} skillShort="VIG" skillFull="Fortitude" skill={fortitude}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("furtividade")} skillShort="AGI" skillFull="Furtividade" skill={furtividade}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("iniciativa")} skillShort="AGI" skillFull="Iniciativa" skill={iniciativa}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("intimidacao")} skillShort="PRE" skillFull="Intimidação" skill={intimidacao}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("intuicao")} skillShort="PRE" skillFull="Intuição" skill={intuicao}/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("investigacao")} skillShort="INT" skillFull="Investigação" skill={investigacao}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("luta")} skillShort="FOR" skillFull="Luta" skill={luta}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("medicina")} skillShort="INT" skillFull="Medicina" skill={medicina}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("ocultismo")} skillShort="INT" skillFull="Ocultismo" skill={ocultismo}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("percepcao")} skillShort="PRE" skillFull="Percepção" skill={percepcao}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("pilotagem")} skillShort="AGI" skillFull="Pilotagem" skill={pilotagem}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("pontaria")} skillShort="AGI" skillFull="Pontaria" skill={pontaria}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("profissao")} skillShort="INT" skillFull="Profissão" skill={profissao}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("reflexos")} skillShort="AGI" skillFull="Reflexos" skill={reflexos}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("religiao")} skillShort="PRE" skillFull="Religião" skill={religiao}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("sobrevivencia")} skillShort="INT" skillFull="Sobrevivência" skill={sobrevivencia}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("tatica")} skillShort="INT" skillFull="Tática" skill={tatica}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("tecnologia")} skillShort="INT" skillFull="Tecnologia" skill={tecnologia}/>
                    <SkillButton skillRollEnabled={skillRollEnabled} handleSkillRollOpen={() => handleSkillRollOpen("vontade")} skillShort="PRE" skillFull="Vontade" skill={vontade}/>

                </Grid>
                <Grid item xs={6}>
                    <Button 
                        onClick={() => setEditBonusOpen(true)} 
                        color="inherit" 
                        variant='text' 
                        fullWidth  
                        sx={{ mt: 0}}
                        endIcon={<FaPencilAlt size={14}/>}
                    >
                        Editar Bônus
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        onClick={() => setEditSkillsOpen(true)} 
                        color="inherit" 
                        variant='text' 
                        fullWidth 
                        sx={{ mt: 0}}
                        endIcon={<FaPencilAlt size={14}/>}
                    >
                        Editar Perícias
                    </Button>
                </Grid>
                <SkillRollDialog 
                    open={skillRollOpen} 
                    onClose={() => setSkillRollOpen(false)} 
                    characte 
                    skillRollDialogInfo={skillRollDialogInfo}
                />
                <EditSkillsDialog 
                    open={editSkillsOpen} 
                    onClose={() => setEditSkillsOpen(false)} 
                    characterSkills={characterSkills} 
                    build={build} fetchCharacter={fetchCharacter}
                />
                <EditBonusDialog 
                    open={editBonusOpen} 
                    onClose={() => setEditBonusOpen(false)} 
                    characterSkills={characterSkills} 
                    fetchCharacter={fetchCharacter}
                />
            </Grid>
        </Grid>
    )
}