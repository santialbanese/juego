import React, { useState } from 'react';
import { Card, CardMedia, Stack, Typography, Chip, Rating, Switch  } from '@mui/material';

const MyCardComponent = () => {
  const [active, setActive] = useState(false);

  const handleSwitchChange = (event) => {
    setActive(event.target.checked);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt="Yosemite National Park"
        image="/static/images/cards/yosemite.jpeg"
      />
      <Stack direction="row" alignItems="center" spacing={3} p={2} useFlexGap>
        <Stack direction="column" spacing={0.5} useFlexGap>
          <Typography>Yosemite National Park, California, USA</Typography>
          <Stack direction="row" spacing={1} useFlexGap>
            <Chip
              size="small"
              label={active ? 'Active' : 'Inactive'}
              color={active ? 'success' : 'default'}
            />
            <Rating defaultValue={4} size="small" />
          </Stack>
        </Stack>
        <Switch checked={active} onChange={handleSwitchChange} />
      </Stack>
    </Card>
  );
};


export default MyCardComponent;
