import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import SaveAsIcon from '@mui/icons-material/SaveAs';

export function SkillRollDialog(props) {
    const { onClose, open, skillRollDialogInfo } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Typography component="h1" variant="h5" color="inherit" sx={{ px: 2, paddingTop: 2 }}>Rolagem de {skillRollDialogInfo.skill} com {skillRollDialogInfo.attributeName}</Typography>
            <Box component="div" sx={{ p: 2 }}>
                <Grid container sx={{ alignItems: 'center' }}>
                    <Grid item xs={12}>
                        <Typography 
                            component="p" 
                            variant="body1" 
                            color="inherit"
                        >
                            Teste {skillRollDialogInfo.diceAmount == 0 ? "-1" : skillRollDialogInfo.diceAmount}d20{skillRollDialogInfo.skillModifier !== 0 ? ` + ${skillRollDialogInfo.skillModifier}` : ""} {skillRollDialogInfo.bonusModifier !== 0 ? `+ ${skillRollDialogInfo.bonusModifier}` : ""}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography 
                            component="p" 
                            variant="body1" 
                            color="inherit"
                        >
                            Rolagens {skillRollDialogInfo.diceRolls}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography 
                            component="p" 
                            variant="body" 
                            color="inherit" 
                            sx={{ fontWeight: 'bold'}}
                        >
                            Resultado {skillRollDialogInfo.testResult}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'end', mt: 1}}>
                    <Grid item md={12}>
                        <Button onClick={handleClose} color="secondary" variant='text' endIcon={<SaveAsIcon/>} fullWidth>Fechar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}