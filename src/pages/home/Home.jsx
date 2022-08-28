import { Characters } from '../../components/Characters';
import { Header } from "../../components/Header";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export function Home() {
    return (
        <>
            <Header variant="home"/>
            <Container component="main" sx={{ mt: 5}}>
                <Typography component="h2" variant="h6" color="inherit" sx={{ mb: 2}}>
                    Meus personagens
                </Typography>
                <Characters/>
            </Container>
        </>
    )
}