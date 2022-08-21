// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import { useEffect, useState } from 'react';

// export function QuickNotes({ characterQuickNotes }) {
//     const [quickNotes, setQuickNotes] = useState("");

//     useEffect(() => {
//         setQuickNotes(characterQuickNotes);
//     }, [characterQuickNotes]);

//     return (
//         <Grid item xs={12} sm={6} md={3} sx={{ p: 2 }}>
//             <Typography component="h1" variant="h5" color="inherit" sx={{ mb: 1}}>Notas Rápidas</Typography>
//             <TextField
//                 id="filled-multiline-static"
//                 label="ex: Iniciei 1 turno morrendo..."
//                 multiline
//                 rows={4}
//                 variant="filled"    
//                 size='large'
//                 color="secondary"
//                 fullWidth
//                 value={quickNotes}
//                 onChange={(event) => setQuickNotes(event.target.value)}
//             />
//         </Grid>
//     )
// }