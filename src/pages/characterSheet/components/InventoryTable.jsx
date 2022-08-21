import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export function InventoryTable({ characterInventory }) {
    return (
        <Container component="div">
            <Grid container spacing={2} sx={{ borderBottom: '1px solid #333' }}>
                <Grid item sm={4}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Item</Typography>
                </Grid>
                <Grid item sm={5}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Descrição</Typography>
                </Grid>
                <Grid item sm={1}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Categoria</Typography>
                </Grid>
                <Grid item sm={1}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Espaço</Typography>
                </Grid>
                <Grid item sm={1}>
                    <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>Editar</Typography>
                </Grid>
            </Grid>

            {
                characterInventory?.map((item) => (
                    <Grid container spacing={2} sx={{ mt: 0.05, alignItems: 'center' }} key={item.id}>
                        <Grid item sm={4}>
                            <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>{item.item}</Typography>
                        </Grid>
                        <Grid item sm={5}>
                            <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>{item.description}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>{item.category}</Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <Typography component="p" variant="body2" color="inherit" sx={{ mb: 1}}>{item.weight}</Typography>
                        </Grid>
                        <Grid item sm={1}>
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