import { BrowserRouter, Routes, Route, HashRouter, useNavigate } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Landing } from "./pages/landing/Landing";
import { Login } from "./pages/account/login/Login";
import { CreateAccount } from "./pages/account/createAccount/CreateAccount";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { CharacterSheet } from "./pages/characterSheet/CharacterSheet";
import { Profile } from "./pages/account/profile/Profile";
import { useAuth } from "./contexts/useAuth";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const Router = () => {
    return (
        <HashRouter>
            <Routes>
                {/* <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/conta/entrar"/>}/> */}
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/conta/criar" element={<CreateAccount />} />
                <Route path="/conta/entrar" element={<Login />} />
                <Route path="/conta/:id/perfil" element={<ProtectedProfile />} />
                <Route path="/home" element={<ProtectedMain/>}/>
                <Route path="/mestre/dashboard" element={<ProtectedDashboard />} />
                <Route path="/personagens/:id" element={<ProtectedCharacterSheet />} />
                <Route path='*' exact={true} element={<PageNotFound/>} />
            </Routes>
        </HashRouter>
    )
}

const LandingPage = () => {
  const context = useAuth();
  return context.signed ? <Home/> : <Landing/>
}

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <Container component="main" maxWidth="xl" sx={{ mt: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography component="h1" variant="h3" color="inherit" sx={{ mb: 1}}>Página não encontrada!</Typography>
            <Button onClick={() => navigate("/home")} color="secondary" variant='outlined' sx={{ mt: 2 }}>Voltar para página inicial</Button>
        </Container>
    )
}

const ProtectedMain = () => {
  const context = useAuth();
  return context.signed ? <Home /> : <Landing />;
}

const ProtectedDashboard = () => {
  const context = useAuth();
  if (context.signed) {
    return <Dashboard/>;
  } else {
    return <Landing />;
  }
}

const ProtectedCharacterSheet = () => {
  const context = useAuth();
  return context.signed ? <CharacterSheet /> : <Login />;
}

const ProtectedProfile = () => {
  const context = useAuth();
  return context.signed ? <Profile /> : <Login />;
}