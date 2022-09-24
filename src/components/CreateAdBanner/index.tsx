import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlassPlus } from 'phosphor-react';

import styles from './styles.module.scss';

export function CreateAdBanner() {
  return (
    <div className={styles.containerBorder}>
      <div className={styles.container}>
        <div>
          <strong className={styles.title}>Não encontrou seu duo?</strong>
          <span className={styles.description}>
            Publique um anúncio para encontrar novos players
          </span>
        </div>

        <Dialog.Trigger className={styles.button}>
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
