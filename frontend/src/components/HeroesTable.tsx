import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircleAvatar from './CircleAvatar';
import PersonIcon from '@mui/icons-material/Person';
import HeroDetailsDialog from './HeroDetailsDialog';
import { HeroService } from '../api/services/hero.service';
import { HeroListDto } from '../api/dto/hero-preview.dto';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const MAX_HEROES_PER_PAGE = 5;

interface HeroesTableState {
  pageNumber: number;
  pagesCount: number;
  heroes: HeroListDto[];
  heroId: number;
}

const newTableState = (): HeroesTableState => {
  return { pageNumber: 1, pagesCount: 0, heroes: [], heroId: 0 };
};

const HeroesTable = () => {
  const [tableState, setTableState] = useState(() => newTableState());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadHeroes = async () => {
      const service = new HeroService();
      const skip = (tableState.pageNumber - 1) * MAX_HEROES_PER_PAGE;
      const result = await service.getHeroList(skip, MAX_HEROES_PER_PAGE);
      const pagesCount = Math.ceil(result.totalCount / MAX_HEROES_PER_PAGE);

      setTableState((ps) => ({
        ...ps,
        pagesCount: pagesCount,
        heroes: result.heroes,
      }));
    };

    loadHeroes();
  }, [tableState.pageNumber]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          id="heroes-header"
          sx={{ display: 'flex', justifyContent: 'center', height: '20%' }}
        >
          <Typography variant="h2">Heroes List</Typography>
        </Box>

        <Box
          id="heroes-content"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '80%',
          }}
        >
          {tableState.heroes.map((hero, index) => (
            <>
              <Box
                sx={{
                  display: 'flex',
                  border: '1px solid #e1e1e1',
                  ...(index !== 0 && { borderTop: 'none' }),
                }}
              >
                <Box
                  sx={{
                    width: '50%',
                  }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2 }}
                  >
                    <CircleAvatar
                      image={hero?.image}
                      nickname={hero.nickname}
                      sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '100%',
                        border: '1px solid #88bdea',
                        overflow: 'hidden',
                      }}
                    />
                    <Typography>{hero.nickname}</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                    gap: 2,
                    width: '50%',
                  }}
                >
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="view details"
                    onClick={() => {
                      setTableState((ps) => ({ ...ps, heroId: hero.id }));
                      setOpen(true);
                    }}
                  >
                    <PersonIcon />
                  </IconButton>
                </Box>
              </Box>
            </>
          ))}
        </Box>
        <Box
          id="heroes-footer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <IconButton
              disabled={tableState.pageNumber === 0}
              onClick={() =>
                setTableState((ps) => ({
                  ...ps,
                  pageNumber: ps.pageNumber - 1,
                }))
              }
            >
              <ChevronLeft />
            </IconButton>
            <Typography>{`Page ${tableState.pageNumber} of ${tableState.pagesCount}`}</Typography>
            <IconButton
              disabled={tableState.pageNumber === tableState.pagesCount}
              onClick={() =>
                setTableState((ps) => ({
                  ...ps,
                  pageNumber: ps.pageNumber + 1,
                }))
              }
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <HeroDetailsDialog
        heroId={tableState.heroId}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </>
  );
};

export default HeroesTable;
