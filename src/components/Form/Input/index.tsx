/* eslint-disable prettier/prettier */
import { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={styles.input}
    />
  );
}
