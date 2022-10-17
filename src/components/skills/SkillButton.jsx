import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const SkillButton = ({ skillShort, skillFull, skill, handleSkillRollOpen, skillRollEnabled }) => {
    return (
        <Button 
            onClick={handleSkillRollOpen} 
            disabled={skillRollEnabled}
            color="secondary" 
            variant='outlined' 
            fullWidth
            size="small"
            sx={{ mb: 0.8, px: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Typography component="span" variant="inherit">{skillShort}</Typography>
                <Typography component="span" variant="inherit">{skillFull}</Typography>
                <Typography component="span" variant="inherit">{skill != "0" ? `+${skill}` : "0"}</Typography>
        </Button>
    )
}
