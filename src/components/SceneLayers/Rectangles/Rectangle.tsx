import React from 'react';
import { useScene } from 'src/hooks/useScene';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { getColorVariant } from 'src/utils';
import { useColor } from 'src/hooks/useColor';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from 'src/components/IconButton/IconButton';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Box } from '@mui/material';

type Props = ReturnType<typeof useScene>['rectangles'][0];

export const Rectangle = ({ from, to, color: colorId, id }: Props & { id: string }) => {
  const color = useColor(colorId);
  const uiStateActions = useUiStateStore((state) => state.actions);

  if (!color) {
    return null;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', right: 0, top: 0, zIndex: 10 }}>
        <IconButton
          name="Show controls"
          Icon={<MoreVertIcon />}
          onClick={() => uiStateActions.setItemControls({ type: 'RECTANGLE', id })}
        />
      </Box>
      <IsoTileArea
        from={from}
        to={to}
        fill={color.value}
        cornerRadius={22}
        stroke={{
          color: getColorVariant(color.value, 'dark', { grade: 2 }),
          width: 1
        }}
      />
    </Box>
  );
};
