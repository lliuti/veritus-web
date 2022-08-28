import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import SaveAsIcon from '@mui/icons-material/SaveAs';

export const DamageRollDialog = (props) => {
    const { onClose, open, damageRollInfo } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Typography component="h1" variant="h5" color="inherit" sx={{ px: 2, paddingTop: 2 }}>Rolagem de dano com {damageRollInfo.attack}</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }}>
                    <Grid item xs={12}>
                        <Typography 
                            component="p" 
                            variant="body1" 
                            color="inherit"
                        >
                            {/* Teste: {damageRollInfo.diceAmount == 0 ? "-1" : damageRollInfo.diceAmount}d20 + {damageRollInfo.testModifier} */}
                            Teste: {damageRollInfo.damage}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="p" variant="body1" color="inherit">Rolagens: {damageRollInfo.diceRolls}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="p" variant="body" color="inherit" sx={{ fontWeight: 'bold'}}>Resultado: {damageRollInfo.testResult}</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'end', mt: 1}}>
                    <Grid item xs={12}>
                        <Button onClick={handleClose} color="secondary" variant='text' endIcon={<SaveAsIcon/>} fullWidth>Fechar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}