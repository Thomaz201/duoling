import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

interface GameBannerProps {
  title: string;
  adsCount: number;
  bannerUrl: string;
  id: string;
}

export function GameBanner({
  adsCount,
  title,
  bannerUrl,
  id,
}: GameBannerProps) {
  return (
    <Link href={`/games/${id}`}>
      <div className={styles.container}>
        <Image
          src={bannerUrl}
          alt={title}
          className={styles.image}
          width={204}
          height={272}
        />

        <div className={styles.gameInfoContainer}>
          <strong className={styles.title}>{title}</strong>
          <span className={styles.ads}>{adsCount} anúncio(s)</span>
        </div>
      </div>
    </Link>
  );
}
