import { Box, SxProps } from '@mui/material';

interface CircleAvatarProps {
  image?: Uint8Array;
  nickname: string;
  sx: SxProps;
}

const CircleAvatar = ({ image, nickname, sx }: CircleAvatarProps) => {
  return (
    <Box sx={sx}>
      <img
        src={`data:image/jpeg;base64,${image}`}
        alt={nickname}
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
};

export default CircleAvatar;
