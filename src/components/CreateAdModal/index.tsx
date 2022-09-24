/* eslint-disable prettier/prettier */
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';
import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';

import { Input } from '../Form/Input';

import styles from './styles.module.scss';

interface Game {
  id: string;
  title: string;
}

interface CreateAdModalProps {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateAdModal({ setIsDialogOpen }: CreateAdModalProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => setGames(response.data));
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    //  TODO: validate form

    if (!data.name || !data.game || !data.discord || !data.hourStart || !data.hourEnd || weekDays.length === 0) {
      return;
    }

    const body = {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel,
    };

    try {
      await axios.post(`http://localhost:3333/games/${selectedGame}/ads`, body);

      setUseVoiceChannel(false);
      setWeekDays([]);
      setIsDialogOpen(false);

      // TODO: Colocar um toast
      // alert('Anúncio criado com sucesso!');
    } catch (err) {
      // alert('Erro ao criar o anúncio!');
      // console.log(err);
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay}>
        <Dialog.Content className={styles.modalContent}>
          <Dialog.Title className={styles.title}>
            Publique um anúncio
          </Dialog.Title>

          <form onSubmit={handleCreateAd} className={styles.form}>
            <div className={styles.selectGameContainer}>
              <label htmlFor="game" className={styles.label}>
                Qual o game?
              </label>
              <Select.Root name='game' onValueChange={setSelectedGame}>
                <Select.Trigger
                  className={`${selectedGame ? styles.whiteText : styles.zinc500Text
                    } ${styles.selectTrigger}`}
                >
                  <Select.Value placeholder="Selecione o game que deseja jogar" />

                  <Select.Icon>
                    <CaretDown size={24} className={styles.zinc400Text} />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className={styles.selectContent}>
                    <Select.ScrollUpButton>
                      <CaretUp size={24} className={styles.zinc400Text} />
                    </Select.ScrollUpButton>

                    <Select.Viewport>
                      <Select.Group>
                        <Select.Label className={styles.selectLabel}>
                          Jogos disponíveis
                        </Select.Label>
                        {games.map((game) => (
                          <Select.Item
                            key={game.id}
                            value={game.id}
                            className={styles.selectItem}
                          >
                            <Select.ItemIndicator className={styles.selectItemIndicator}>
                              <Check size={20} />
                            </Select.ItemIndicator>
                            <Select.ItemText>{game.title}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>

                    <Select.ScrollDownButton>
                      <CaretDown size={24} className={styles.zinc400Text} />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className={styles.singleInputContainer}>
              <label htmlFor="name" className={styles.label}>Seu nome (ou nickname)</label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className={styles.doubleInputContainer}>
              <div className={styles.singleInputContainer}>
                <label htmlFor="yearsPlaying" className={styles.label}>Joga a quantos anos?</label>
                <Input
                  id="yearsPlaying"
                  name="yearsPlaying"
                  type="text"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>

              <div className={styles.singleInputContainer}>
                <label htmlFor="discord" className={styles.label}>Qual seu Discord?</label>
                <Input id="discord"
                  name="discord" type="text" placeholder="Usuário#0000" />
              </div>
            </div>

            <div className={styles.weekDaysContainer}>
              <div className={styles.singleInputContainer}>
                <label htmlFor="weekDays" className={styles.label}>Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  className={styles.toggleGroupContainer}
                  onValueChange={(value) => setWeekDays(value)}
                  value={weekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    className={`${styles.toggleGroupItem} ${weekDays.includes('0') ? styles.violetBackground : styles.zinc900background
                      }`}
                    title="Domingo"
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    className={`${styles.toggleGroupItem} ${weekDays.includes('1') ? styles.violetBackground : styles.zinc900background
                      }`}
                    title="Segunda"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    className={`${styles.toggleGroupItem} ${weekDays.includes('2') ? styles.violetBackground : styles.zinc900background
                      }`}
                    title="Terça"
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    className={`${styles.toggleGroupItem} ${weekDays.includes('3') ? styles.violetBackground : styles.zinc900background
                      }`}
                    title="Quarta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    className={`${styles.toggleGroupItem} ${weekDays.includes('4') ? styles.violetBackground : styles.zinc900background
                      }`}
                    title="Quinta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    className={`${styles.toggleGroupItem} ${weekDays.includes('5') ? styles.violetBackground : styles.zinc900background
                      }`}
                    title="Sexta"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    className={`${styles.toggleGroupItem} ${weekDays.includes('6') ? styles.violetBackground : styles.zinc900background
                      }`}
                    title="Sábado"
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>

              <div className={styles.hoursOnDayContainer}>
                <label htmlFor="hourStart" className={styles.label}>Qual horario do dia?</label>
                <div className={styles.hoursOnDayInputsContainer}>
                  <Input name="hourStart" id="hourStart" type="time" placeholder="De" />

                  <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                </div>
              </div>
            </div>

            <label className={styles.checkboxLabel}>
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true);
                  } else {
                    setUseVoiceChannel(false);
                  }
                }}
                className={styles.checkboxContainer}
              >
                <Checkbox.Indicator>
                  <Check size={16} className={styles.checkMark} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className={styles.footer}>
              <Dialog.Close
                type="button"
                className={styles.cancelButton}
              >
                Cancelar
              </Dialog.Close>

              <button
                type="submit"
                className={styles.submitButton}
              >
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
