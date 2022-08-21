import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';

export function Dashboard() {
    const [sheets, setSheets] = useState([]);
    const [data, setData] = useState();
    const navigate = useNavigate();    

    const socket = io("http://localhost:3333");

    useEffect(() => {
        fetchConciseSheets();
    }, [data]);

    socket.on("statChange", (data) => {
        setData(data);
    });

    const fetchConciseSheets = async () => {
        const response = await api.get("/dashboard/sheets");
        setSheets(response.data);
    };

    

    return (
        <>
            <AppBar 
                position="static"
                elevation={0}
                color='secondary'
                sx={{ backgroundColor: '#000' }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
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

            <Container component="main" sx={{ mt: 5}}>
                <Grid container spacing={2}>
                    {sheets?.map((sheet) => (
                        <Grid item md={3} key={sheet.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                                        {sheet.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">
                                        {sheet.characterClass} {bull} {sheet.archetype}
                                    </Typography>
                                    <Grid container sx={{ mb: 1 }}>
                                        <Grid item md={4}>
                                            <Typography variant="body" component="p" color="error" sx={{ mb: 1 }}>
                                                {sheet.characterStatus.currentHp} / {sheet.characterStatus.maxHp}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={4}>
                                            <Typography variant="body" component="p" color="primary" sx={{ mb: 1 }}>
                                                {sheet.characterStatus.currentSp} / {sheet.characterStatus.maxSp}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={4}>
                                            <Typography variant="body" component="p" color="orange" sx={{ mb: 1 }}>
                                                {sheet.characterStatus.currentEp} / {sheet.characterStatus.maxEp}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography color="text.secondary">
                                        {sheet.background} {bull} {sheet.nex}%
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => navigate(`/personagens/${sheet.id}`)} size="small" color="secondary" variant="outlined">
                                        Visualizar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
);