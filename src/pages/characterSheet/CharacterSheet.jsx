import { useNavigate, useParams  } from "react-router-dom";
import { useState, useEffect } from "react";
import { Build } from "./components/Build";
import { Stats } from "./components/Stats";
import { Attributes } from "./components/Attributes";
import { Defenses } from "./components/Defenses";
import { Skills } from "./components/Skills";
import { Equipment } from "./components/Equipment";
import { Notes } from "./components/Notes";
// import { ActiveParty } from "./components/ActiveParty";
import { Tiptap } from "../../components/Tiptap";
import Fab from '@mui/material/Fab';
import { CustomRollDialog } from "../../components/CustomRollDialog";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { useSnackbar } from 'notistack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FaDiceD20 } from "react-icons/fa";
import { Info } from "../../components/info/Info";

export function CharacterSheet() {
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [characterInfo, setCharacterInfo] = useState([]);
    const [characterStatus, setCharacterStatus] = useState([]);
    const [characterAttributes, setCharacterAttributes] = useState([]);
    const [characterDefenses, setCharacterDefenses] = useState([]);
    const [characterNotes, setCharacterNotes] = useState([]);
    const [characterSkills, setCharacterSkills] = useState([]);
    const [characterEquipment, setCharacterEquipment] = useState([]);
    const [characterSettings, setCharacterSettings] = useState([]);
    const [customRollDialogOpen, setCustomRollDialogOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();

    useEffect(() => {
        fetchCharacter();
    }, [id]);

    const fetchCharacter = async () => {
        setOpenBackdrop(true);
        try {
            const response = await api.get(`/characters/${id}/sheet`);
            console.log(response.data.id);

            const info = {
                id: response.data.id,
                name: response.data.name,
                age: response.data.age,
                nickname: response.data.nickname,
                gender: response.data.gender,
                height: response.data.height,
                bodyType: response.data.bodyType,
                hair: response.data.hair,
                greatestQuality: response.data.greatestQuality,
                worstFlaw: response.data.worstFlaw,
                belief: response.data.belief,
                pictureUrl: response.data.pictureUrl,
                rank: response.data.rank,
                nex: response.data.nex,
                affinity: response.data.affinity,
                background: response.data.background,
                characterClass: response.data.characterClass,
                archetype: response.data.archetype,
                movement: response.data.movement,
                hpModByNex: response.data.characterModifiers.hpModByNex,
                epModByNex: response.data.characterModifiers.epModByNex,
                spModByNex: response.data.characterModifiers.spModByNex,
                hpMod: response.data.characterModifiers.hpMod,
                epMod: response.data.characterModifiers.epMod,
                spMod: response.data.characterModifiers.spMod,
                transcendences: response.data.characterModifiers.transcendences,
                enableRecalculate: response.data.characterModifiers.recalculationEnabled,
                activeParty: response.data.activeParty
            };
    
            const status = {
                id: response.data.id,
                currentHp: response.data.characterStatus.currentHp,
                currentEp: response.data.characterStatus.currentEp,
                currentSp: response.data.characterStatus.currentSp,
                maxHp: response.data.characterStatus.maxHp,
                maxEp: response.data.characterStatus.maxEp,
                maxSp: response.data.characterStatus.maxSp,
            };
            const attributes = {
                id: response.data.id,
                str: response.data.characterAttributes.str,
                vig: response.data.characterAttributes.vig,
                dex: response.data.characterAttributes.dex,
                int: response.data.characterAttributes.int,
                cha: response.data.characterAttributes.cha,
                nex: response.data.nex,
            };
            const defenses = {
                id: response.data.id,
                dodging: response.data.characterDefenses.dodging,
                passive: response.data.characterDefenses.passive,
            };
            const notes = {
                id: response.data.id,
                resistances: response.data.characterNotes.resistances,
                quickNotes: response.data.characterNotes.quickNotes,
                text: response.data.characterNotes.text,
            }

            const skills = {
                id: response.data.id,
                acrobacia: response.data.characterSkills.acrobacia,
                adestramento: response.data.characterSkills.adestramento,
                artes: response.data.characterSkills.artes,
                atletismo: response.data.characterSkills.atletismo,
                atualidades: response.data.characterSkills.atualidades,
                ciencias: response.data.characterSkills.ciencias,
                crime: response.data.characterSkills.crime,
                diplomacia: response.data.characterSkills.diplomacia,
                enganacao: response.data.characterSkills.enganacao,
                fortitude: response.data.characterSkills.fortitude,
                furtividade: response.data.characterSkills.furtividade,
                iniciativa: response.data.characterSkills.iniciativa,
                intimidacao: response.data.characterSkills.intimidacao,
                intuicao: response.data.characterSkills.intuicao,
                investigacao: response.data.characterSkills.investigacao,
                luta: response.data.characterSkills.luta,
                medicina: response.data.characterSkills.medicina,
                ocultismo: response.data.characterSkills.ocultismo,
                percepcao: response.data.characterSkills.percepcao,
                pilotagem: response.data.characterSkills.pilotagem,
                pontaria: response.data.characterSkills.pontaria,
                profissao: response.data.characterSkills.profissao,
                reflexos: response.data.characterSkills.reflexos,
                religiao: response.data.characterSkills.religiao,
                sobrevivencia: response.data.characterSkills.sobrevivencia,
                tatica: response.data.characterSkills.tatica,
                tecnologia: response.data.characterSkills.tecnologia,
                vontade: response.data.characterSkills.vontade,
                bonuses: {
                    acrobacia: response.data.characterBonuses.acrobacia,
                    adestramento: response.data.characterBonuses.adestramento,
                    artes: response.data.characterBonuses.artes,
                    atletismo: response.data.characterBonuses.atletismo,
                    atualidades: response.data.characterBonuses.atualidades,
                    ciencias: response.data.characterBonuses.ciencias,
                    crime: response.data.characterBonuses.crime,
                    diplomacia: response.data.characterBonuses.diplomacia,
                    enganacao: response.data.characterBonuses.enganacao,
                    fortitude: response.data.characterBonuses.fortitude,
                    furtividade: response.data.characterBonuses.furtividade,
                    iniciativa: response.data.characterBonuses.iniciativa,
                    intimidacao: response.data.characterBonuses.intimidacao,
                    intuicao: response.data.characterBonuses.intuicao,
                    investigacao: response.data.characterBonuses.investigacao,
                    luta: response.data.characterBonuses.luta,
                    medicina: response.data.characterBonuses.medicina,
                    ocultismo: response.data.characterBonuses.ocultismo,
                    percepcao: response.data.characterBonuses.percepcao,
                    pilotagem: response.data.characterBonuses.pilotagem,
                    pontaria: response.data.characterBonuses.pontaria,
                    profissao: response.data.characterBonuses.profissao,
                    reflexos: response.data.characterBonuses.reflexos,
                    religiao: response.data.characterBonuses.religiao,
                    sobrevivencia: response.data.characterBonuses.sobrevivencia,
                    tatica: response.data.characterBonuses.tatica,
                    tecnologia: response.data.characterBonuses.tecnologia,
                    vontade: response.data.characterBonuses.vontade,
                }
            };
            let weightCapacity = 0;

            if (parseInt(response.data.nex) >= 10 && response.data.archetype === "Técnico") {
                weightCapacity = (parseInt(response.data.characterAttributes.str) + parseInt(response.data.characterAttributes.int)) * 5;
            } else if (parseInt(response.data.characterAttributes.str) < 1 && response.data.archetype !== "Técnico") {
                weightCapacity = 2;   
            } else {
                weightCapacity = response.data.characterAttributes.str * 5;
            }
            
            response.data.characterItems.map((i) => {
                if (i.item.toLowerCase() == "mochila militar") {
                    weightCapacity += 2
                }
            })

            const equipment = {
                id: response.data.id,
                attacks: response.data.characterAttacks,
                inventory: response.data.characterItems,
                powers: response.data.characterPowers,
                rituals: response.data.characterRituals,
                weightCapacity,
                rank: response.data.rank,
            }
            const settings = {
                id: response.data.id,
                // activeParty: response.data.activeParty,
            }
    
            setCharacterInfo(info);
            setCharacterStatus(status);
            setCharacterAttributes(attributes);
            setCharacterDefenses(defenses);
            setCharacterNotes(notes);
            setCharacterSkills(skills);
            setCharacterEquipment(equipment);
            setCharacterSettings(settings);
        } catch (err) {
            enqueueSnackbar("Não foi possível carregar a ficha.", { 
                variant: "error"
            });
        }
        setOpenBackdrop(false);
    };

    return (
        <>
            <Header variant="sheet"/>
            <Container maxWidth="xl" sx={{ mt: 5, mb: 10 }}>
                <Info characterInfo={characterInfo}/>
                <Build characterInfo={characterInfo} fetchCharacter={fetchCharacter}/>
                <Grid container spacing={1}>
                    <Stats characterStatus={characterStatus} fetchCharacter={fetchCharacter}/>
                    <Attributes characterAttributes={characterAttributes} fetchCharacter={fetchCharacter}/>
                    <Defenses characterDefenses={characterDefenses} fetchCharacter={fetchCharacter}/>
                    <Notes characterNotes={characterNotes} fetchCharacter={fetchCharacter}/>
                </Grid>
                <Grid container spacing={{ xs: 1, md: 3}}>
                    <Skills characterSkills={characterSkills} build={{ class: characterInfo.characterClass, background: characterInfo.background }} fetchCharacter={fetchCharacter}/>
                    <Equipment characterEquipment={characterEquipment} fetchCharacter={fetchCharacter}/>
                </Grid>
                {/* <Grid container>
                    <Tiptap characterNotes={characterNotes}/>
                </Grid> */}
                {/* <ActiveParty characterSettings={characterSettings} fetchCharacter={fetchCharacter}/> */}
            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CustomRollDialog
                onClose={() => setCustomRollDialogOpen(false)}
                open={customRollDialogOpen}
                characterId={characterAttributes.id}
            />
            <Fab onClick={() => setCustomRollDialogOpen(true)} color="inherit" aria-label="dice" sx={{ position: 'fixed', bottom: 25, right: 25}} size="medium">
                <FaDiceD20 fontSize={24} color="black"/>
            </Fab>
        </>
    )
}