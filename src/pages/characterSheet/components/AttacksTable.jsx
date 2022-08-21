import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { api } from '../../../services/api';

import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SaveAsIcon from '@mui/icons-material/SaveAs';

export function AttacksTable({ characterAttacks, fetchCharacter }) {
    const [attackRollDialogOpen, setAttackRollDialogOpen] = useState(false);

    return (
        <Container component="div">
            <Grid container spacing={2} sx={{ borderBottom: '1px solid #333' }}>
                <Grid item xs={2}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Ataque/Arma</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Teste</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Dano</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Crítico</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Multiplicador</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Alcance</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Tipo</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Editar</Typography>
                </Grid>
            </Grid>

            {
                characterAttacks?.map((attack) => (
                    <Grid container spacing={2} sx={{ mt: 0.05, alignItems: 'center' }} key={attack.id}>
                        <Grid item xs={2}>
                            <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>{attack.attack}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button 
                                variant="outlined" 
                                color="secondary"
                                size="small"
                                sx={{ mt: -1.5, ml: -1.5}}
                            >
                                {attack.test}
                            </Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button 
                                variant="outlined" 
                                color="secondary"
                                size="small"
                                sx={{ mt: -1.5, ml: -1.5}}
                            >
                                {attack.damage}
                            </Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>{attack.margin}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>{attack.multiplier}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>{attack.range}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>{attack.damageType}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Button 
                                variant="outlined" 
                                color="secondary"
                                size="small"
                                sx={{ mt: -1.5, ml: -1.5}}
                            >
                                Editar
                            </Button>
                        </Grid>
                    </Grid>
                ))
            }
        </Container>
    )
}

// function AttackRollDialog(props) {
//     const { onClose, open, attackRollDialogInfo } = props;

//     const handleClose = () => {
//         onClose();
//     };

//     return (
//         <Dialog onClose={handleClose} open={open}>
//             <Typography component="h1" variant="h5" color="inherit" sx={{ px: 2, paddingTop: 2 }}>Rolagem de ataque</Typography>
//             <Box component="div" sx={{ p: 2 }}>
//                 <Grid container sx={{ alignItems: 'center' }}>
//                     <Grid item xs={12}>
//                         <Typography 
//                             component="p" 
//                             variant="body1" 
//                             color="inherit"
//                         >
//                             Teste: {attackRollDialogInfo.diceAmount == 0 ? "-1" : attackRollDialogInfo.diceAmount}d20
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Typography component="p" variant="body1" color="inherit">Rolagens: {attackRollDialogInfo.diceRolls}</Typography>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Typography component="p" variant="body" color="inherit" sx={{ fontWeight: 'bold'}}>Resultado: {attackRollDialogInfo.testResult}</Typography>
//                     </Grid>
//                 </Grid>
//                 <Grid container sx={{ alignItems: 'end', mt: 1}}>
//                     <Grid item xs={12}>
//                         <Button onClick={handleClose} color="secondary" variant='text' endIcon={<SaveAsIcon/>} fullWidth>Fechar</Button>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </Dialog>
//     )
// }