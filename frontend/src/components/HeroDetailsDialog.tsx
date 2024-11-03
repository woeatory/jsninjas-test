import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { HeroDto } from '../api/dto/hero.dto';
import { HeroService } from '../api/services/hero.service';
import CircleAvatar from './CircleAvatar';

interface HeroDetailsDialogProps {
  heroId: number;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const setHeroState = (): HeroDto => ({
  id: 0,
  nickname: '',
  realName: '',
  originDescription: '',
  superpowers: '',
  catchPhrase: '',
  images: [],
});

const HeroDetailsDialog = ({
  heroId,
  open,
  onClose,
}: HeroDetailsDialogProps) => {
  const [hero, setHero] = useState<HeroDto>(() => setHeroState());

  useEffect(() => {
    if (!open) return;

    const loadHero = async () => {
      const heroService = new HeroService();
      const heroDetails = await heroService.getHeroDetails(heroId);
      setHero(heroDetails);
    };

    loadHero();
  }, [open, heroId]);

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: { width: '50vw', height: '70vh', maxWidth: '100vw' },
      }}
    >
      <DialogTitle
        sx={{ display: 'flex', justifyContent: 'center', fontSize: '2.25rem' }}
      >{`${hero.nickname}`}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <CircleAvatar
              image={hero.images?.[0]?.image}
              nickname={hero.nickname}
              sx={{
                width: '160px',
                height: '160px',
                border: '1px solid #88bdea',
                overflow: 'hidden',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Typography>{`Real name: ${hero.realName}`}</Typography>
              <Typography>{`Origin description: ${hero.originDescription}`}</Typography>
              <Typography>{`Superpowers: ${hero.superpowers}`}</Typography>
              <Typography>{`Catch phrase: ${hero.catchPhrase}`}</Typography>
            </Box>
          </Box>
          <Box
            sx={{ maxWidth: '100%', display: 'flex', gap: 2, overflow: 'auto' }}
          >
            <Typography sx={{}}>Images</Typography>
            {hero.images?.map((image) => (
              <Box sx={{ maxWidth: '70px', maxHeight: '70px' }}>
                <img
                  src={`data:image/jpeg;base64,${mydecode(image.image)}`}
                  alt={hero.nickname}
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

function mydecode(buff: Buffer) {
  const res = buff.toString('base64');
  console.log(res);
  return res;
}
export default HeroDetailsDialog;
