import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CreateParty } from "../../components/dashboard/CreateParty";
import { InvitePlayer } from "../../components/dashboard/InvitePlayer";
import { Header } from "../../components/Header";
import { Bull } from "../../components/Bull";
import { useSnackbar } from 'notistack';
import { GiRollingDices } from "react-icons/gi";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Drawer from '@mui/material/Drawer';

export function Dashboard() {
    const [sheets, setSheets] = useState([]);
    // const [data, setData] = useState();
    const [rollsLog, setRollsLog] = useState([]);
    const [party, setParty] = useState("");
    const [parties, setParties] = useState([]);
    const [dashboardTabValue, setDashboardTabValue] = useState(0);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [deletePartyLoading, setDeletePartyLoading] = useState(false);
    const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
    const navigate = useNavigate(); 
    const { enqueueSnackbar } = useSnackbar();

    // const socket = io("http://localhost:3000");
    const socket = io("https://veritus-api.herokuapp.com");

    useEffect(() => {
        fetchParties();
    }, []);

    useEffect(() => {
        socket.on("statChange", () => {
            fetchPartyCharacters();
        });
    
        socket.on("roll", (data) => {
            if (data.activeParty == party) {
                setRollsLog(rollsLog => [...rollsLog, data]);
            }
        });

        return () => {
            socket.off('statChange');
            socket.off('roll');
        };
    }, [party])


    const fetchParties = async () => {
        try {
            setOpenBackdrop(true);
            const response = await api.get("/parties/list/created");
            setParties(response.data);
            setOpenBackdrop(false);
        } catch (err) {
            enqueueSnackbar("N??o foi poss??vel carregar as mesas.", { 
                variant: "error"
            });
        }
    };

    const fetchPartyCharacters = async () => {
        try {
            setOpenBackdrop(true);
            const response = await api.get(`/parties/${party}`);
            setSheets(response.data);
            setOpenBackdrop(false);
        } catch (err) {
            enqueueSnackbar("N??o foi poss??vel carregar os personagens da mesa.", { 
                variant: "error"
            });
        }
    }

    const handleDeleteParty = async () => {
        setDeletePartyLoading(true);
        try {
            await api.delete(`/parties/${party}`)
            enqueueSnackbar("Mesa deletada.", { 
                variant: "info"
            });
            fetchParties(); 
        } catch (err) {
            enqueueSnackbar("N??o foi poss??vel deletar essa mesa.", { 
                variant: "error"
            });
        }
        setDeletePartyLoading(false);
    };

    useEffect(() => {
        if (party) {
            fetchPartyCharacters();
        } 
    }, [party]);

    return (
        <>
            <Header variant="dashboard"/>
            <Container component="main" maxWidth="xl" sx={{ mt: 2}}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                            value={dashboardTabValue} 
                            onChange={(event, newValue) => setDashboardTabValue(newValue)}
                            aria-label="dashboard tabs"
                            scrollButtons
                            allowScrollButtonsMobile
                            variant="scrollable"
                        >
                            <Tab label="Dashboard" {...a11yProps(0)} />
                            <Tab label="Criar uma nova mesa" {...a11yProps(1)} />
                            <Tab label="Convidar jogador para mesa" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={dashboardTabValue} index={0}>
                        <Grid container spacing={1}>
                            {parties.length > 0 ? 
                                <>
                                    <Grid item xs={12}>
                                        <FormControl variant="filled" fullWidth>
                                            <InputLabel id="party-select-label" color="secondary">Mostrar personagens da mesa</InputLabel>
                                            <Select
                                                labelId="party-select-label"
                                                id="party-select"
                                                value={party}
                                                color="secondary"
                                                label="Mostrar personagens da mesa"
                                                onChange={(event) => setParty(event.target.value)}
                                                // onBlur={fetchPartyCharacters}
                                                key={party.id}
                                            >
                                            {parties?.map((party) => (
                                                <MenuItem key={party.id} value={party.id}>{party.name}</MenuItem>
                                            ))}
                                            </Select>
                                        </FormControl> 
                                    </Grid>
                                    {party !== "" ? 
                                        <Grid item xs={12}>
                                            <LoadingButton 
                                                onClick={handleDeleteParty} 
                                                // loading={deletePartyLoading}
                                                size="small" 
                                                color="error" 
                                                variant="text"
                                                startIcon={<DeleteForeverIcon/>}
                                                sx={{ alignItems: "center"}}
                                            >
                                                Deletar mesa
                                            </LoadingButton>
                                            <Button startIcon={<GiRollingDices/>} onClick={() => setBottomDrawerOpen(true)} size="small" color="inherit" sx={{ ml: 2 }}>
                                                Dados
                                            </Button>
                                        </Grid>
                                    : <></>}
                                </>
                            : 
                                <Grid item xs={12}>
                                    <Typography variant="body" component="p" color="inherit" sx={{ mb: 1 }}>
                                        Crie uma mesa para visualizar o dashboard.
                                    </Typography>
                                </Grid>
                            }

                            {sheets?.map((sheet) => (
                                <Grid item xs={12} sm={6} md={3} key={sheet.id}>
                                    <Paper elevation={3} sx={{ p: 2 }}>
                                        <Grid container rowSpacing={1}>
                                            <Grid item xs={12}>
                                                <Typography variant="h5" component="p" sx={{ textAlign: "center"}}>
                                                    {sheet.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography color="text.secondary" fontSize={14} sx={{ textAlign: "center"}}>
                                                    {sheet.background} <Bull/> {sheet.nex}%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="body" component="p" fontSize={14} color="text.secondary" sx={{ textAlign: "center"}}>
                                                    {sheet.characterClass} <Bull/> {sheet.archetype}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="body" component="p" color="error" sx={{ textAlign: "center"}}>
                                                    PV {sheet.characterStatus.currentHp}/{sheet.characterStatus.maxHp}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="body" component="p" color="primary" sx={{ textAlign: "center"}}>
                                                    PS {sheet.characterStatus.currentSp}/{sheet.characterStatus.maxSp}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="body" component="p" color="orange" sx={{ textAlign: "center"}}>
                                                    PE {sheet.characterStatus.currentEp}/{sheet.characterStatus.maxEp}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Link style={{ textDecoration: "none" }} target={"_blank"} to={`/personagens/${sheet.id}`}>
                                                    <Button 
                                                        fullWidth 
                                                        // onClick={() => navigate(`/personagens/${sheet.id}`)} 
                                                        size="large" 
                                                        color="secondary" 
                                                        variant="outlined" 
                                                        sx={{ alignItems: "center"}}
                                                    >
                                                        <VisibilityIcon sx={{ mr: 1 }}/>
                                                        Visualizar
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={dashboardTabValue} index={1}>
                        <CreateParty fetchParties={fetchParties}/>
                    </TabPanel>
                    <TabPanel value={dashboardTabValue} index={2}>
                        <InvitePlayer/>
                    </TabPanel>
                </Box>
                <Drawer
                    anchor={"bottom"}
                    open={bottomDrawerOpen}
                    onClose={() => setBottomDrawerOpen(false)}
                >
                    <Box sx={{ py: 2, px: 3, maxHeight: "440px", overflowY: "auto" }}>
                        <Grid container spacing={3}>
                            {rollsLog.length < 1 && (
                                <Grid item xs={12}>
                                    <Typography 
                                    sx={{ textTransform: "uppercase" }} 
                                    component="h3" 
                                    variant="h6" 
                                    color="inherit"
                                    >
                                        Nenhum teste foi realizado.
                                    </Typography>
                                </Grid>
                            )}
                            {rollsLog.slice(0).reverse().map((roll, index) => (
                                <Grid item xs={12} key={index}>
                                    <Typography 
                                        sx={{ textTransform: "uppercase" }} 
                                        component="h3" 
                                        variant="h6" 
                                        color={index === 0 ? "secondary" : "inherit"}
                                    >
                                        {roll.name}: 
                                    </Typography>
                                    
                                        {(() => {
                                            if (roll.type == "skill") {
                                                return (
                                                    <>
                                                        <Typography 
                                                            sx={{ textTransform: "uppercase" }} 
                                                            component="p" 
                                                            variant="body1" 
                                                            color="text.secondary"
                                                        >
                                                            Teste de {roll.skill} com {roll.attributeName}
                                                        </Typography>
                                                        <Typography 
                                                            sx={{ textTransform: "uppercase" }} 
                                                            component="p" 
                                                            variant="body1" 
                                                            color="inherit"
                                                        >
                                                            {roll.diceAmount == 0 ? "-1" : roll.diceAmount}
                                                            d20
                                                            {roll.skillModifier !== 0 ? `+${roll.skillModifier}` : ""} 
                                                            {roll.bonusModifier !== 0 ? `+${roll.bonusModifier}` : ""} 
                                                            &nbsp; 
                                                            <Bull/>
                                                            &nbsp;  
                                                            [{roll.diceRolls.trim()}]
                                                            &nbsp; 
                                                            &rarr;
                                                            &nbsp; 
                                                            <strong>{roll.testResult}</strong>
                                                        </Typography>
                                                    </>
                                                )
                                            } else if (roll.type == "attribute") {
                                                return (
                                                    <>
                                                        <Typography 
                                                            sx={{ textTransform: "uppercase" }} 
                                                            component="p" 
                                                            variant="body1" 
                                                            color="text.secondary"
                                                        >
                                                            Teste de {roll.attributeName}
                                                        </Typography>
                                                        <Typography 
                                                            sx={{ textTransform: "uppercase" }} 
                                                            component="p" 
                                                            variant="body1" 
                                                            color="inherit"
                                                        >
                                                            {roll.diceAmount == 0 ? "-1" : roll.diceAmount}
                                                            d20
                                                            &nbsp; 
                                                            <Bull/>
                                                            &nbsp;  
                                                            [{roll.diceRolls.trim()}]
                                                            &nbsp; 
                                                            &rarr;
                                                            &nbsp; 
                                                            <strong>{roll.testResult}</strong>
                                                        </Typography>
                                                    </>
                                                )
                                            } else if (roll.type === "check") {
                                                return (
                                                    <>
                                                        <Typography 
                                                            sx={{ textTransform: "uppercase" }} 
                                                            component="p" 
                                                            variant="body1" 
                                                            color="text.secondary"
                                                        >
                                                            Rolagem de teste customizada
                                                        </Typography>
                                                        <Typography 
                                                            sx={{ textTransform: "uppercase" }} 
                                                            component="p" 
                                                            variant="body1" 
                                                            color="inherit"
                                                        > 
                                                            {roll.input.trim()}
                                                            &nbsp; 
                                                            <Bull/>
                                                            &nbsp;
                                                            [{roll.diceRolls.trim()}]
                                                            &nbsp; 
                                                            &rarr;
                                                            &nbsp; 
                                                            <strong>{roll.testResult}</strong>
                                                        </Typography>
                                                    </>
                                                )
                                            } else {
                                                return (
                                                    <>
                                                        <Typography 
                                                            sx={{ textTransform: "uppercase" }} 
                                                            component="p" 
                                                            variant="body1" 
                                                            color="text.secondary"
                                                        >
                                                            Rolagem de dano: {roll.attack}
                                                        </Typography>
                                                        {/* [{roll.diceRolls.trim()}] */}
                                                        {roll.resultValues.map((result, index) => (
                                                            <Typography 
                                                                // sx={{ textTransform: "uppercase" }} 
                                                                component="p" 
                                                                variant="body1" 
                                                                color="inherit"
                                                                key={index}
                                                            > 
                                                                {result.damageRoll}
                                                                &nbsp; 
                                                                &rarr;
                                                                &nbsp; 
                                                                [{result.diceRolls.trim()}]
                                                                &nbsp; 
                                                                &rarr;
                                                                &nbsp; 
                                                                <strong>{result.testResult}</strong>
                                                                &nbsp; 
                                                                ({result.type})
                                                            </Typography>
                                                        ))}
                                                    </>
                                                )
                                            }
                                        })()}
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Drawer>
            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}