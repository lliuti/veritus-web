import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Veritus from "../../assets/veritus.png";
import { FaDiscord, FaUserPlus, FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="xl">
            <Grid container spacing={1} sx={{ mt: 10 }}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Typography 
                                component="h1" 
                                variant="h3" 
                                sx={{ fontFamily: "Holtwood One SC, serif" }}
                            >
                                VERITUS
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography 
                                component="h1" 
                                variant="h5"
                            >
                                Jogar Ordem Paranormal nunca foi tão simples
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography 
                                component="p" 
                                variant="body1"
                            >
                                Crie fichas de personagem com cálculos automatizados, adicione ataques rituais ou poderes pré-cadastrados. Participe de múltiplas mesas para jogar com seus amigos.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography 
                                component="p" 
                                variant="body1"
                            >
                                Utilize o painel do mestre com atualizações de Vida, Sanidade, Esforço e rolagens de dado em tempo real.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 4 }}>
                            <Button onClick={() => navigate("/conta/criar")} color="warning" variant="contained" size="large" endIcon={<FaUserPlus/>}>Crie sua conta ou faça login</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography 
                                component="h1" 
                                variant="h5"
                            >
                                Feedbacks da comunidade
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography 
                                component="p" 
                                variant="body1"
                            >
                                Participe ativamente da comunidade no discord do Veritus e veja as suas sugestões virando realidade. Estamos sempre trabalhando em melhorias e novas funcionalidades para tornar a plataforma cada vez melhor.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 4 }}>
                            <Button onClick={() => window.location.href = "https://discord.gg/2pfaCd48"} color="inherit" variant="text" size="large" endIcon={<FaDiscord/>}>Entrar no Servidor do discord</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography 
                                component="h1" 
                                variant="h5"
                            >
                                Manutenção confiável
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 4 }}>
                            <Typography 
                                component="p" 
                                variant="body1"
                            >
                                Não se preocupe com manutenções acontecendo enquanto voce está jogando. O discord será avisado do horário que o servidor entrará em manutenção. Além disso, as manutenções acontecerão nos horários em que a plataforma não estiver sendo utilizada.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography 
                                component="h1" 
                                variant="h5"
                            >
                                Segurança garantida
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 4 }}>
                            <Typography 
                                component="p" 
                                variant="body1"
                            >
                                Apesar de recomendar um gerador de senhas e não compartilhar suas informações com ninguém, todas as senhas cadastradas são criptografadas antes de serem armazenadas.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography 
                                component="h1" 
                                variant="h5"
                            >
                                Livro de Regras 
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography 
                                component="p" 
                                variant="body1"
                            >
                                Veritus é uma ferramenta para auxiliar os mestres e os jogadores de Ordem Paranormal. Porém, ele <strong>não substitui</strong> o Livro de Regras. Com o Veritus voce não terá acesso às regras de jogo, ao bestiário e diversas outras informações essenciais para jogar.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => window.location.href = "https://jamboeditora.com.br/produto/ordem-paranormal-rpg-digital/"} color="inherit" variant="text" size="large" endIcon={<FaBook/>}>Compre o Livro de Regras</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: "center" }} display={{ xs: "none", md: "block" }}>
                    <img src={Veritus}/>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: "center" }} display={{ xs: "block", md: "none" }}>
                    <img src={Veritus} height="480px"/>
                </Grid>
            </Grid>
        </Container>
    )
}