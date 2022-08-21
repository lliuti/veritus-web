import { useNavigate, useParams  } from "react-router-dom";
import { useState, useEffect } from "react";
import { CharacterInfo } from "./components/CharacterInfo";
import { Stats } from "./components/Stats";
import { Attributes } from "./components/Attributes";
import { Defenses } from "./components/Defenses";
import { Skills } from "./components/Skills";
import { Equipment } from "./components/Equipment";
import { Notes } from "./components/Notes";
import { Tiptap } from "../../components/Tiptap";
import { api } from "../../services/api";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { FaDiceD20, FaDiceD6 } from 'react-icons/fa';
import { GiDiceEightFacesEight, GiD12, GiD10, GiD4 } from 'react-icons/gi';

export function CharacterSheet() {
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [characterInfo, setCharacterInfo] = useState([]);
    const [characterStatus, setCharacterStatus] = useState([]);
    const [characterAttributes, setCharacterAttributes] = useState([]);
    const [characterDefenses, setCharacterDefenses] = useState([]);
    const [characterNotes, setCharacterNotes] = useState([]);
    const [characterSkills, setCharacterSkills] = useState([]);
    const [characterEquipment, setCharacterEquipment] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    // const actions = [
    //     { icon: <GiD4 size={22}/>, name: 'D4' },
    //     { icon: <FaDiceD6 size={22}/>, name: 'D6' },
    //     { icon: <GiDiceEightFacesEight size={22}/>, name: 'D8' },
    //     { icon: <GiD10 size={22}/>, name: 'D10' },
    //     { icon: <GiD12 size={22}/>, name: 'D12' },
    //     { icon: <FaDiceD20 size={18}/>, name: 'D20' },
    // ];

    useEffect(() => {
        setOpenBackdrop(true);
        fetchCharacter();
    }, [id]);

    const fetchCharacter = async () => {
        const response = await api.get(`/characters/${id}/sheet`);

        const info = {
            id: response.data.id,
            name: response.data.name,
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
        };

        const equipment = {
            id: response.data.id,
            attacks: response.data.characterAttacks,
            inventory: response.data.characterItems,
        }

        setCharacterInfo(info);
        setCharacterStatus(status);
        setCharacterAttributes(attributes);
        setCharacterDefenses(defenses);
        setCharacterNotes(notes);
        setCharacterSkills(skills);
        setCharacterEquipment(equipment);
        setOpenBackdrop(false);
    };

    return (
        <>
            <AppBar 
                position="static"
                elevation={0}
                color='secondary'
                sx={{ backgroundColor: '#000' }}
            >
                <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Link
                        variant="button"
                        color="inherit"
                        onClick={() => navigate("/")}
                        sx={{ 
                            my: 1, 
                            mx: 2, 
                            transition: "200ms all",
                            textDecoration: "none", 
                            ":hover": {
                                cursor: "pointer",
                                opacity: 0.90,
                            }
                        }}
                    >
                        Voltar
                    </Link>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ my: 5}}>
                <CharacterInfo characterInfo={characterInfo} fetchCharacter={fetchCharacter}/>
                <Grid container spacing={3}>
                    <Stats characterStatus={characterStatus} fetchCharacter={fetchCharacter}/>
                    <Attributes characterAttributes={characterAttributes} fetchCharacter={fetchCharacter}/>
                    <Defenses characterDefenses={characterDefenses} fetchCharacter={fetchCharacter}/>
                    <Notes characterNotes={characterNotes} fetchCharacter={fetchCharacter}/>
                </Grid>
                <Grid container spacing={3}>
                    <Skills characterSkills={characterSkills} fetchCharacter={fetchCharacter}/>
                    <Equipment characterEquipment={characterEquipment} fetchCharacter={fetchCharacter}/>
                </Grid>
                {/* <Grid container>
                    <Tiptap/>
                </Grid> */}
            </Container>
            {/* <SpeedDial
                ariaLabel="quickDice"
                sx={{ position: 'fixed', bottom: 24, right: 16 }}
                icon={<FaDiceD20 size={32}/>}
            >
                {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                />
                ))}
            </SpeedDial> */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}