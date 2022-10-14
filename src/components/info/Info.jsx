import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../services/api';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

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
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setName(characterInfo.name);
        // setAge(characterInfo.age);
    }, [characterInfo]);

    const handleUpdateCharacterInfo = async () => {
        try {
            await api.put(`/characters/${characterInfo.id}/info`, { name });
            enqueueSnackbar("Informações atualizadas.", { 
                variant: "info"
            });
        } catch (err) {
            console.log(err);
            enqueueSnackbar("Não foi possível atualizar as informações.", { 
                variant: "error"
            });
        }
    };

    return (
        <Grid item xs={12} sm={6} md={12} sx={{ mt: 3}}>
            <Typography component="h1" variant="h5" color="inherit">Características</Typography>
            <Grid container columnSpacing={1}>
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        size="small"
                        margin="normal"
                        id="name"
                        label="Nome"
                        name="name"
                        fullWidth
                        variant="filled"
                        color='secondary'
                        value={name || ''}
                        onChange={(event) => setName(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        size="small"
                        margin="normal"
                        id="nickname"
                        label="Apelido(s)"
                        name="nickname"
                        fullWidth
                        variant="filled"
                        color='secondary'
                        value={nickname || ''}
                        onChange={(event) => setNickname(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        size="small"
                        margin="normal"
                        id="age"
                        label="Idade"
                        name="age"
                        fullWidth
                        variant="filled"
                        type="number"
                        color='secondary'
                        value={age || 0}
                        onChange={(event) => setAge(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        size="small"
                        margin="normal"
                        id="height"
                        label="Altura"
                        name="height"
                        fullWidth
                        variant="filled"
                        type="text"
                        color='secondary'
                        value={height || ''}
                        onChange={(event) => setHeight(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        size="small"
                        margin="normal"
                        id="body-type"
                        label="Porte Físico"
                        name="bodyType"
                        fullWidth
                        variant="filled"
                        type="text"
                        color='secondary'
                        value={bodyType || ''}
                        onChange={(event) => setBodyType(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        size="small"
                        margin="normal"
                        id="hair"
                        label="Cabelo"
                        name="hair"
                        fullWidth
                        variant="filled"
                        type="text"
                        color='secondary'
                        value={hair || ''}
                        onChange={(event) => setHair(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        size="small"
                        margin="normal"
                        id="gender"
                        label="Genero"
                        name="gender"
                        fullWidth
                        variant="filled"
                        type="text"
                        color='secondary'
                        value={gender || ''}
                        onChange={(event) => setGender(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        size="small"
                        margin="normal"
                        id="belief"
                        label="Crença"
                        name="belief"
                        fullWidth
                        variant="filled"
                        type="text"
                        color='secondary'
                        value={belief || ''}
                        onChange={(event) => setBelief(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        size="small"
                        margin="normal"
                        id="greatest-quality"
                        label="Maior Qualidade"
                        name="hair"
                        fullWidth
                        variant="filled"
                        type="text"
                        color='secondary'
                        value={greatestQuality || ''}
                        onChange={(event) => setGreatestQuality(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={2.4}>
                    <TextField
                        size="small"
                        margin="normal"
                        id="worst-flaw"
                        label="Pior Defeito"
                        name="worst-flaw"
                        fullWidth
                        variant="filled"
                        type="text"
                        color='secondary'
                        value={worstFlaw || ''}
                        onChange={(event) => setWorstFlaw(event.target.value)}
                        onBlur={handleUpdateCharacterInfo}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}