import type { NextPage } from 'next';

import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Image from 'next/image';
// import logoImg from './logo-nlw-esports.svg';
import { CreateAdBanner } from '../components/CreateAdBanner';
import { CreateAdModal } from '../components/CreateAdModal';
import { GameBanner } from '../components/GameBanner';

import styles from '../styles/home.module.scss';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

const Home: NextPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) =>
      setGames(response.data),
    );
  }, []);

  return (
    <div className={styles.container}>
      <Image src="/logo-nlw-esports.svg" width={200} height={200} />

      <h1 className={styles.heading}>
        Seu <span className={styles.gradient}>duo</span> está aqui
      </h1>

      <div className={styles.gamesContainer}>
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
            title={game.title}
            id={game.id}
          />
        ))}
      </div>

      <Dialog.Root
        onOpenChange={(open) => {
          setIsDialogOpen(open);
        }}
        open={isDialogOpen}
      >
        <CreateAdBanner />

        <CreateAdModal setIsDialogOpen={setIsDialogOpen} />
      </Dialog.Root>
    </div>
  );
};

export default Home;
