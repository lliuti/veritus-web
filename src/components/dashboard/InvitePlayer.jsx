import { api } from "../../services/api";
import { useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const InvitePlayer = () => {
    const [playerUsername, setPlayerUsername] = useState("");
    const [parties, setParties] = useState([]);
    const [party, setParty] = useState("");
    const [invitePlayerLoading, setInvitePlayerLoading] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchParties();
    }, []);

    const fetchParties = async () => {
        try {
            setOpenBackdrop(true);
            const response = await api.get("/parties/list/created");
            setParties(response.data);
        } catch (err) {
            enqueueSnackbar("Não foi possível carregar as mesas.", { 
                variant: "error"
            });
        }
        setOpenBackdrop(false);
    };

    const handleInvitePlayer = async () => {
        setInvitePlayerLoading(true);

        try {
            const response = await api.post(`/parties/${party}/invite`, {
                username: playerUsername
            });
            
            enqueueSnackbar("Convite enviado.", { 
                variant: "info"
            });
        } catch (err) {
            if (err.response.data.error == "User still have pending invitations or already accepted it.") {
                enqueueSnackbar("Esse usuário ainda possui convites pendentes para essa mesa ou já faz parte dela.", { 
                    variant: "error"
                });
            } else {
                enqueueSnackbar("Não foi possível enviar esse convite.", { 
                    variant: "error"
                });
            }
        }
        
        setInvitePlayerLoading(false);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h6" color="inherit">Convidar jogador</Typography>
                <Typography component="p" variant="body" color="inherit">Quando o convite for enviado, ele aparecerá no Perfil do jogador.</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    variant="filled"
                    fullWidth
                    color="secondary"
                    id="playerUsername"
                    label="Nome de usuário ou e-mail do jogador"
                    type="text"
                    name="playerUsername"
                    value={playerUsername}
                    onChange={(event) => setPlayerUsername(event.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="party-select-label" color="secondary">Mesa: </InputLabel>
                        <Select
                            labelId="party-select-label"
                            id="party-select"
                            value={party}
                            color="secondary"
                            fullWidth
                            label="Convidar para mesa: "
                            onChange={(event) => setParty(event.target.value)}
                            >
                                {parties?.map((party) => (
                                    <MenuItem key={party.id} value={party.id}>{party.name}</MenuItem>
                                ))}
                        </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <LoadingButton
                        loading={invitePlayerLoading}
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        onClick={handleInvitePlayer}
                        size="large"
                    >
                        Enviar convite
                </LoadingButton>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
};