import { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import { api } from "../../services/api";
import TextField from '@mui/material/TextField';
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

export function EditBonusDialog({ onClose, open, characterSkills, fetchCharacter }) {
    const [acrobacia, setAcrobacia] = useState(0); 
    const [adestramento, setAdestramento] = useState(0); 
    const [artes, setArtes] = useState(0); 
    const [atletismo, setAtletismo] = useState(0); 
    const [atualidades, setAtualidades] = useState(0); 
    const [ciencias, setCiencias] = useState(0); 
    const [crime, setCrime] = useState(0); 
    const [diplomacia, setDiplomacia] = useState(0); 
    const [enganacao, setEnganacao] = useState(0); 
    const [fortitude, setFortitude] = useState(0); 
    const [furtividade, setFurtividade] = useState(0); 
    const [iniciativa, setIniciativa] = useState(0); 
    const [intimidacao, setIntimidacao] = useState(0); 
    const [intuicao, setIntuicao] = useState(0); 
    const [investigacao, setInvestigacao] = useState(0); 
    const [luta, setLuta] = useState(0); 
    const [medicina, setMedicina] = useState(0); 
    const [ocultismo, setOcultismo] = useState(0); 
    const [percepcao, setPercepcao] = useState(0); 
    const [pilotagem, setPilotagem] = useState(0); 
    const [pontaria, setPontaria] = useState(0); 
    const [profissao, setProfissao] = useState(0); 
    const [reflexos, setReflexos] = useState(0); 
    const [religiao, setReligiao] = useState(0); 
    const [sobrevivencia, setSobrevivencia] = useState(0); 
    const [tatica, setTatica] = useState(0); 
    const [tecnologia, setTecnologia] = useState(0); 
    const [vontade, setVontade] = useState(0); 
    const [updateLoading, setUpdateLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setAcrobacia(characterSkills.bonuses?.acrobacia);
        setAdestramento(characterSkills.bonuses?.adestramento);
        setArtes(characterSkills.bonuses?.artes);
        setAtletismo(characterSkills.bonuses?.atletismo);
        setAtualidades(characterSkills.bonuses?.atualidades);
        setCiencias(characterSkills.bonuses?.ciencias);
        setCrime(characterSkills.bonuses?.crime);
        setDiplomacia(characterSkills.bonuses?.diplomacia);
        setEnganacao(characterSkills.bonuses?.enganacao);
        setFortitude(characterSkills.bonuses?.fortitude);
        setFurtividade(characterSkills.bonuses?.furtividade);
        setIniciativa(characterSkills.bonuses?.iniciativa);
        setIntimidacao(characterSkills.bonuses?.intimidacao);
        setIntuicao(characterSkills.bonuses?.intuicao);
        setInvestigacao(characterSkills.bonuses?.investigacao);
        setLuta(characterSkills.bonuses?.luta);
        setMedicina(characterSkills.bonuses?.medicina);
        setOcultismo(characterSkills.bonuses?.ocultismo);
        setPercepcao(characterSkills.bonuses?.percepcao);
        setPilotagem(characterSkills.bonuses?.pilotagem);
        setPontaria(characterSkills.bonuses?.pontaria);
        setProfissao(characterSkills.bonuses?.profissao);
        setReflexos(characterSkills.bonuses?.reflexos);
        setReligiao(characterSkills.bonuses?.religiao);
        setSobrevivencia(characterSkills.bonuses?.sobrevivencia);
        setTatica(characterSkills.bonuses?.tatica);
        setTecnologia(characterSkills.bonuses?.tecnologia);
        setVontade(characterSkills.bonuses?.vontade);
    }, [characterSkills]);

    const handleClose = () => {
        onClose();
    };
    
    const handleUpdateBonus = async () => {
        try {
            await api.put(`/characters/${characterSkills.id}/bonus`, {
                acrobacia: parseInt(acrobacia), 
                adestramento: parseInt(adestramento), 
                artes: parseInt(artes), 
                atletismo: parseInt(atletismo), 
                atualidades: parseInt(atualidades), 
                ciencias: parseInt(ciencias), 
                crime: parseInt(crime), 
                diplomacia: parseInt(diplomacia), 
                enganacao: parseInt(enganacao), 
                fortitude: parseInt(fortitude), 
                furtividade: parseInt(furtividade), 
                iniciativa: parseInt(iniciativa), 
                intimidacao: parseInt(intimidacao), 
                intuicao: parseInt(intuicao), 
                investigacao: parseInt(investigacao), 
                luta: parseInt(luta), 
                medicina: parseInt(medicina), 
                ocultismo: parseInt(ocultismo), 
                percepcao: parseInt(percepcao), 
                pilotagem: parseInt(pilotagem), 
                pontaria: parseInt(pontaria), 
                profissao: parseInt(profissao), 
                reflexos: parseInt(reflexos), 
                religiao: parseInt(religiao), 
                sobrevivencia: parseInt(sobrevivencia), 
                tatica: parseInt(tatica), 
                tecnologia: parseInt(tecnologia), 
                vontade: parseInt(vontade), 
            });

            onClose();
            enqueueSnackbar("Bonus atualizados.", { 
                variant: "info"
            });

            fetchCharacter();
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar os bonus.", { 
                variant: "error"
            });
        }
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='lg'>
            <Typography component="h1" variant="h5" color="inherit" sx={{ paddingLeft: 2, paddingTop: 2}}>Editar Bônus</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container spacing={{ xs: 0.5, sm: 1}}>
                    <Grid item xs={12} sm={3}>
                        <TextField 
                            id="acrobacia-input"
                            label="Bônus em Acrobacia"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={acrobacia}
                            onChange={(event) => setAcrobacia(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="adestramento-input"
                            label="Bônus em Adestramento"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={adestramento}
                            onChange={(event) => setAdestramento(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="artes-input"
                            label="Bônus em Artes"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={artes}
                            onChange={(event) => setArtes(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="atletismo-input"
                            label="Bônus em Atletismo"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={atletismo}
                            onChange={(event) => setAtletismo(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="atualidades-input"
                            label="Bônus em Atualidades"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={atualidades}
                            onChange={(event) => setAtualidades(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="ciencias-input"
                            label="Bônus em Ciencias"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={ciencias}
                            onChange={(event) => setCiencias(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="crime-input"
                            label="Bônus em Crime"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={crime}
                            onChange={(event) => setCrime(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField 
                            id="diplomacia-input"
                            label="Bônus em Diplomacia"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={diplomacia}
                            onChange={(event) => setDiplomacia(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="enganacao-input"
                            label="Bônus em Enganação"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={enganacao}
                            onChange={(event) => setEnganacao(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="fortitude-input"
                            label="Bônus em Fortitude"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={fortitude}
                            onChange={(event) => setFortitude(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="furtividade-input"
                            label="Bônus em Furtividade"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={furtividade}
                            onChange={(event) => setFurtividade(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="iniciativa-input"
                            label="Bônus em Iniciativa"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={iniciativa}
                            onChange={(event) => setIniciativa(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="intimidacao-input"
                            label="Bônus em Intimidação"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={intimidacao}
                            onChange={(event) => setIntimidacao(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="intuicao-input"
                            label="Bônus em Intuição"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={intuicao}
                            onChange={(event) => setIntuicao(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField 
                            id="investigacao-input"
                            label="Bônus em Investigação"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={investigacao}
                            onChange={(event) => setInvestigacao(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="luta-input"
                            label="Bônus em Luta"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={luta}
                            onChange={(event) => setLuta(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="medicina-input"
                            label="Bônus em Medicina"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={medicina}
                            onChange={(event) => setMedicina(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="ocultismo-input"
                            label="Bônus em Ocultismo"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={ocultismo}
                            onChange={(event) => setOcultismo(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="percepcao-input"
                            label="Bônus em Percepção"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={percepcao}
                            onChange={(event) => setPercepcao(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="pilotagem-input"
                            label="Bônus em Pilotagem"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={pilotagem}
                            onChange={(event) => setPilotagem(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="pontaria-input"
                            label="Bônus em Pontaria"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={pontaria}
                            onChange={(event) => setPontaria(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField 
                            id="profissao-input"
                            label="Bônus em Profissão"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={profissao}
                            onChange={(event) => setProfissao(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="reflexos-input"
                            label="Bônus em Reflexos"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={reflexos}
                            onChange={(event) => setReflexos(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="religiao-input"
                            label="Bônus em Religião"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={religiao}
                            onChange={(event) => setReligiao(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="sobrevivencia-input"
                            label="Bônus em Sobrevivencia"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={sobrevivencia}
                            onChange={(event) => setSobrevivencia(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="tatica-input"
                            label="Bônus em Tática"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={tatica}
                            onChange={(event) => setTatica(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="tecnologia-input"
                            label="Bônus em Tecnologia"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={tecnologia}
                            onChange={(event) => setTecnologia(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <TextField 
                            id="vontade-input"
                            label="Bônus em Vontade"
                            variant="filled"    
                            size='large'
                            color="secondary"
                            fullWidth
                            type="number"
                            inputProps={{ min: "0", max: "100", step: "1" }}
                            value={vontade}
                            onChange={(event) => setVontade(event.target.value)}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingButton 
                            onClick={handleUpdateBonus} 
                            color="secondary" 
                            variant='text' 
                            endIcon={<SaveAsIcon/>} 
                            fullWidth
                        >
                            Atualizar
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}