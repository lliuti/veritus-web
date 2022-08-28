import * as React from 'react';
import { useState } from 'react';
import { AttacksTable } from "../../../components/attack/AttacksTable";
import { InventoryTable } from "../../../components/inventory/InventoryTable";
import { PowersTable } from "../../../components/power/PowersTable";
import { RitualsTable } from '../../../components/ritual/RitualsTable';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 1 }}>
                {children}
            </Box>
        )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function Equipment({characterEquipment, fetchCharacter}) {
    const [tabValue, setTabValue] = useState(0);

    const handleTabsChange = (e, newTabValue) => {
        setTabValue(newTabValue);
    }

    return (
        <Grid item xs={12} md={8} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5" color="inherit" sx={{ mb: 1}}>Equipamento</Typography>
            <Tabs
                value={tabValue}
                onChange={handleTabsChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="equipment tabs"
                scrollButtons
                allowScrollButtonsMobile
                variant="scrollable"
            >
                <Tab label="Ataques / Armas" {...a11yProps(0)} />
                <Tab label="Inventário" {...a11yProps(1)} />
                <Tab label="Habilidades / Poderes" {...a11yProps(2)} />
                <Tab label="Rituais" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <AttacksTable characterEquipment={characterEquipment} fetchCharacter={fetchCharacter}/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <InventoryTable characterEquipment={characterEquipment} fetchCharacter={fetchCharacter}/>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <PowersTable characterEquipment={characterEquipment} fetchCharacter={fetchCharacter}/>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <RitualsTable characterEquipment={characterEquipment} fetchCharacter={fetchCharacter}/>
            </TabPanel>
        </Grid>
    )
}
