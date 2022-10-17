import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../services/api';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';

export const Info = ({ characterInfo }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [hair, setHair] = useState('');
    const [greatestQuality, setGreatestQuality] = useState('');
    const [worstFlaw, setWorstFlaw] = useState('');
    const [belief, setBelief] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [updatePictureDialog, setUpdatePictureDialog] = useState(false);
    const [previousData, setPreviousData] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setName(characterInfo.name);
        setAge(characterInfo.age);
        setNickname(characterInfo.nickname);
        setGender(characterInfo.gender);
        setHeight(characterInfo.height);
        setBodyType(characterInfo.bodyType);
        setHair(characterInfo.hair);
        setGreatestQuality(characterInfo.greatestQuality);
        setWorstFlaw(characterInfo.worstFlaw);
        setBelief(characterInfo.belief);
        setPictureUrl(characterInfo.pictureUrl);
    }, [characterInfo]);

    const handleUpdateCharacterInfo = async () => {
        
        try {
            await api.put(`/characters/${characterInfo.id}/info`, { 
                name,
                age: parseInt(age),
                nickname,
                gender,
                height,
                bodyType,
                hair,
                greatestQuality,
                worstFlaw,
                belief,
            });
            enqueueSnackbar("Informações atualizadas.", { 
                variant: "info"
            });
        } catch (err) {
            enqueueSnackbar("Não foi possível atualizar as informações.", { 
                variant: "error"
            });
        }
    };

    return (
        <Grid item xs={12} sm={6} md={12} sx={{ mt: 5 }}>
            <Typography component="h1" variant="h6" color="inherit" sx={{ mb: 1 }}>Características</Typography>
            <Grid container spacing={1}>
                <Grid onClick={() => setUpdatePictureDialog(true)} item xs={12} md={1} display={{ xs: "flex", sm: "none" }}>
                    <Card sx={{ borderRadius: "0%", mt: 1 }}>
                        <CardMedia
                            component="img"
                            image={pictureUrl}
                            alt="Character picture"
                        />
                    </Card>
                </Grid>
                <Grid onClick={() => setUpdatePictureDialog(true)} item xs={12} md={1} display={{ xs: "none", sm: "flex" }} sx={{
                    ":hover": {
                        cursor: "pointer",
                        opacity: 0.9,
                    }
                }}>
                    <img src={pictureUrl} alt="Character picture" height="104px" width="104px" style={{"objectFit": "cover"}}/>
                </Grid>
                <Grid item xs={12} md={11}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={2.4}>
                            <TextField
                                size="small"
                                id="name"
                                label="Nome"
                                name="name"
                                fullWidth
                                variant="filled"
                                color='secondary'
                                value={name || ''}
                                onChange={(event) => setName(event.target.value)}
                                onFocus={() => setPreviousData(name)}
                                onBlur={() => {
                                    if (previousData == name) { return };
                                    handleUpdateCharacterInfo();
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={2.4}>
                            <TextField
                                size="small"
                                id="nickname"
                                label="Apelido(s)"
                                name="nickname"
                                fullWidth
                                variant="filled"
                                color='secondary'
                                value={nickname || ''}
                                onChange={(event) => setNickname(event.target.value)}
                                onFocus={() => setPreviousData(nickname)}
                                onBlur={() => {
                                    if (previousData == nickname) { return };
                                    handleUpdateCharacterInfo();
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={2.4}>
                            <TextField
                                size="small"
                                id="age"
                                label="Idade"
                                name="age"
                                fullWidth
                                variant="filled"
                                type="number"
                                color='secondary'
                                value={age || 0}
                                onChange={(event) => setAge(event.target.value)}
                                onFocus={() => setPreviousData(age)}
                                onBlur={() => {
                                    if (previousData == age) { return };
                                    handleUpdateCharacterInfo();
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={2.4}>
                            <TextField
                                size="small"
                                id="height"
                                label="Altura"
                                name="height"
                                fullWidth
                                variant="filled"
                                type="text"
                                color='secondary'
                                value={height || ''}
                                onChange={(event) => setHeight(event.target.value)}
                                onFocus={() => setPreviousData(height)}
                                onBlur={() => {
                                    if (previousData == height) { return };
                                    handleUpdateCharacterInfo();
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={2.4}>
                            <TextField
                                size="small"
                                id="body-type"
                                label="Porte Físico"
                                name="bodyType"
                                fullWidth
                                variant="filled"
                                type="text"
                                color='secondary'
                                value={bodyType || ''}
                                onChange={(event) => setBodyType(event.target.value)}
                                onFocus={() => setPreviousData(bodyType)}
                                onBlur={() => {
                                    if (previousData == bodyType) { return };
                                    handleUpdateCharacterInfo();
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={2.4}>
                            <TextField
                                size="small"
                                id="hair"
                                label="Cabelo"
                                name="hair"
                                fullWidth
                                variant="filled"
                                type="text"
                                color='secondary'
                                value={hair || ''}
                                onChange={(event) => setHair(event.target.value)}
                                onFocus={() => setPreviousData(hair)}
                                onBlur={() => {
                                    if (previousData == hair) { return };
                                    handleUpdateCharacterInfo();
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={2.4}>
                            <TextField
                                size="small"
                                id="gender"
                                label="Genero"
                                name="gender"
                                fullWidth
                                variant="filled"
                                type="text"
                                color='secondary'
                                value={gender || ''}
                                onChange={(event) => setGender(event.target.value)}
                                onFocus={() => setPreviousData(gender)}
                                onBlur={() => {
                                    if (previousData == gender) { return };
                                    handleUpdateCharacterInfo();
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={2.4}>
                            <TextField
                                size="small"
                                id="belief"
                                label="Crença"
                                name="belief"
                                fullWidth
                                variant="filled"
                                type="text"
                                color='secondary'
                                value={belief || ''}
                                onChange={(event) => setBelief(event.target.value)}
                                onFocus={() => setPreviousData(belief)}
                                onBlur={() => {
                                    if (previousData == belief) { return };
                                    handleUpdateCharacterInfo();
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={2.4}>
                            <TextField
                                size="small"
                                id="greatest-quality"
                                label="Maior Qualidade"
                                name="hair"
                                fullWidth
                                variant="filled"
                                type="text"
                                color='secondary'
                                value={greatestQuality || ''}
                                onChange={(event) => setGreatestQuality(event.target.value)}
                                onFocus={() => setPreviousData(greatestQuality)}
                                onBlur={() => {
                                    if (previousData == greatestQuality) { return };
                                    handleUpdateCharacterInfo();
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={2.4}>
                            <TextField
                                size="small"
                                id="worst-flaw"
                                label="Pior Defeito"
                                name="worst-flaw"
                                fullWidth
                                variant="filled"
                                type="text"
                                color='secondary'
                                value={worstFlaw || ''}
                                onChange={(event) => setWorstFlaw(event.target.value)}
                                onFocus={() => setPreviousData(worstFlaw)}
                                onBlur={() => {
                                    if (previousData == worstFlaw) { return };
                                    handleUpdateCharacterInfo();
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <UpdatePicture 
                onClose={() => setUpdatePictureDialog(false)} 
                open={updatePictureDialog} 
                pictureUrl={pictureUrl} 
                setPictureUrl={setPictureUrl}
                enqueueSnackbar={enqueueSnackbar}
                id={characterInfo.id}
            />
        </Grid>
    )
}

const UpdatePicture = ({ onClose, open, pictureUrl, setPictureUrl, enqueueSnackbar, id }) => {
    const handleClose = () => {
        onClose();;
    };

    const handleUpdatePicture = async () => {
        try {
            await api.put(`/characters/${id}/info`, { pictureUrl });
            enqueueSnackbar("Imagem atualizada.", { 
                variant: "info"
            });
            handleClose();
        } catch (err) {
            console.log(err);
            enqueueSnackbar("Não foi possível atualizar a imagem.", { 
                variant: "error"
            });
        }
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='sm'>
            <Grid container sx={{ p: 2}} spacing={1}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h6" color="inherit">Imagem</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="p" variant="body2" color="text.secondary">Note que alguns formatos de imagem ou servidores de hospedagem podem não ser suportados.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        size="small"
                        id="picture"
                        label="Link da imagem"
                        name="picture"
                        fullWidth
                        variant="filled"
                        color='secondary'
                        value={pictureUrl}
                        onChange={(event) => setPictureUrl(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleUpdatePicture} fullWidth color="secondary">Atualizar imagem</Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}