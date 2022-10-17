import { Characters } from '../../components/Characters';
import { Header } from "../../components/Header";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export function Home() {
    return (
        <>
            <Header variant="home"/>
            <Container component="main" sx={{ my: 5}}>
                <Characters/>
            </Container>
        </>
    )
}