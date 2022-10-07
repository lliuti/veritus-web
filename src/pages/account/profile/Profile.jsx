import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/useAuth";
import { api } from "../../../services/api";
import { useSnackbar } from 'notistack';
import { Header } from "../../../components/Header";

import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const Profile = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [updateButtonLoading, setUpdateButtonLoading] = useState(false);
    const [deleteUserLoading, setDeleteUserLoading] = useState(false);
    const [invites, setInvites] = useState([]);
    const [acceptedInvites, setAcceptedInvites] = useState([]);
    const [acceptInviteLoading, setAcceptInviteLoading] = useState(false);
    const [declineInviteLoading, setDeclineInviteLoading] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const navigate = useNavigate();
    const context = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setOpenBackdrop(true);
        fetchUser();
        fetchInvites();
        setOpenBackdrop(false);
    }, [context]);

    const fetchUser = async () => {
        // CARREGAR DIALOG 
        try {
            const response = await api.get(`/users/${context.userId}`);
            setName(response.data.name);
            setUsername(response.data.username);
            setEmail(response.data.email);
        } catch (err) {
            enqueueSnackbar("Não foi possível carregar o perfil.", { 
                variant: "error"
            });
        }
    }

    const fetchInvites = async () => {
        try {
            const pendingInvites = await api.get("/parties/list/invited", {
                params: {
                    status: "pending"
                }
            });

            const acceptedInvites = await api.get("/parties/list/invited", {
                params: {
                    status: "accepted"
                }
            })            
    
            setInvites(pendingInvites.data);
            setAcceptedInvites(acceptedInvites.data);
        } catch (err) {
            enqueueSnackbar("Não foi possível carregar os convites.", { 
                variant: "error"
            });
        }
    }

    const handleUpdateUser = async () => {
        setUpdateButtonLoading(true);

        if (username == "" || email == "" || name == "") {
            enqueueSnackbar("Preencha os campos.", { 
                variant: "error"
            });
            setUpdateButtonLoading(false);
            return;
        }

        try {
            if (password !== "") {
                await api.put(`/users/${context.userId}`, {
                    name: name,
                    username: username,
                    email: email,
                    newPassword: password
                });
            } else {
                await api.put(`/users/${context.userId}`, {
                    name: name,
                    username: username,
                    email: email,
                });
            }
    
            enqueueSnackbar("Perfil atualizado.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar o perfil.", { 
                variant: "error"
            });
        }

        setUpdateButtonLoading(false);
    }

    const handleDeleteUser = async () => {
        setDeleteUserLoading(true);
        try {
            await api.delete(`/users/${context.userId}`);
            context.Logout();
            navigate("/conta/entrar");
        } catch (err) {
            enqueueSnackbar("Não foi possível deletar o perfil.", { 
                variant: "error"
            });
        }
        setDeleteUserLoading(false);
    }

    const handleAnswerInvite = async (answer, inviteId, partyId) => {
        answer == "accepted" ? setAcceptInviteLoading(true) : setDeclineInviteLoading(true)

        try {
            await api.put(`/parties/${partyId}/invite/${inviteId}`, {
                answer
            });
    
            if (answer == "accepted") {
                setAcceptInviteLoading(false);
                enqueueSnackbar("Convite aceito.", { 
                    variant: "info"
                });
            } else {
                setDeclineInviteLoading(false);
                enqueueSnackbar("Convite recusado.", { 
                    variant: "info"
                });
            };
    
            fetchInvites();
        } catch (err) {
            enqueueSnackbar("Não foi possível responder o convite.", { 
                variant: "error"
            });
        }

        return;
    }

    return (
        <>
            <Header variant="profile"/>
            <Container component="main" sx={{ my: 5}}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h6" color="inherit">
                            Informações de usuário
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            color="secondary"
                            variant="filled"
                            fullWidth
                            id="name"
                            label="Alterar nome do jogador"
                            name="name"
                            autoFocus
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            variant="filled"
                            id="username"
                            color="secondary"
                            label="Alterar nome de usuário"
                            name="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            variant="filled"
                            color="secondary"
                            id="email"
                            label="Alterar e-mail"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            variant="filled"
                            color="secondary"
                            id="password"
                            label="Alterar senha"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            loading={deleteUserLoading}
                            fullWidth
                            color="error"
                            variant="text"
                            onClick={handleDeleteUser}
                        >
                            Deletar perfil
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            loading={updateButtonLoading}
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={handleUpdateUser}
                        >
                            Atualizar
                        </LoadingButton>
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                    {acceptedInvites.length > 0 ? 
                        <Grid item xs={12}>
                            <Typography component="h2" variant="h6" color="inherit">
                                Mesas que participo 
                            </Typography>
                        </Grid>
                    : <></>}
                    {acceptedInvites?.map((invite) => (
                        <Grid item xs={6} md={4} key={invite.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                                        {invite.party.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">
                                        Modelo: {invite.party.type}
                                    </Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">
                                        Resumo: {invite.party.description}
                                    </Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">
                                        Mestre: @{invite.party.user[0].username}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <LoadingButton 
                                        onClick={() => handleAnswerInvite("declined", invite.id, invite.party.id)} 
                                        size="small" 
                                        color="error" 
                                        variant="text"
                                        loading={declineInviteLoading}
                                    >
                                        Sair dessa mesa
                                    </LoadingButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h6" color="inherit">
                            {invites.length < 1 ? "Nenhum convite de mesa pendente" : "Convites para mesas"}
                        </Typography>
                    </Grid>
                    {invites?.map((invite) => (
                        <Grid item xs={6} md={4} key={invite.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                                        {invite.party.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">
                                        Modelo: {invite.party.type}
                                    </Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">
                                        Resumo: {invite.party.description}
                                    </Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">
                                        Mestre: @{invite.party.user[0].username}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <LoadingButton 
                                        onClick={() => handleAnswerInvite("declined", invite.id, invite.party.id)} 
                                        size="small" 
                                        color="error" 
                                        variant="text"
                                        loading={declineInviteLoading}
                                    >
                                        Recusar
                                    </LoadingButton>
                                    <LoadingButton 
                                        onClick={() => handleAnswerInvite("accepted", invite.id, invite.party.id)} 
                                        size="small" 
                                        color="secondary" 
                                        variant="outlined"
                                        loading={acceptInviteLoading}
                                    >
                                        Aceitar
                                    </LoadingButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
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