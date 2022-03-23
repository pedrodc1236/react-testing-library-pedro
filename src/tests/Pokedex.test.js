import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente <Pokedex.js />', () => {
  test('Testando se página contém um h2 com o texto Encountered pokémons', () => {
    reactWithRouter(<App />);
    const headingPage = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(headingPage).toBeInTheDocument();
  });

  test('Teste se é exibido o prox Poke quando o btn "Próximo pokémon" é clicado', () => {
    reactWithRouter(<App />);
    const btnNextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnNextPoke).toHaveTextContent('Próximo pokémon');
    const imgPokemon = screen.getByRole('img');
    const arrayImgURLS = ['https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png', 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png', 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png', 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png', 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png', 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'];

    arrayImgURLS.forEach((element) => {
      userEvent.click(btnNextPoke);
      expect(imgPokemon).toHaveAttribute('src', element);
    });
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId('pokemon-type')).toHaveLength(1);
    expect(screen.getAllByTestId('pokemon-weight')).toHaveLength(1);
    const btnNextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnNextPoke);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
    expect(screen.getAllByTestId('pokemon-type')).toHaveLength(1);
    expect(screen.getAllByTestId('pokemon-weight')).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const nextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    const arrayFilterType = ['All', 'Electric', 'Fire',
      'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    arrayFilterType.forEach((element) => {
      const btnFilterType = screen.getByRole('button', { name: element });
      expect(btnAll).toBeInTheDocument();
      expect(btnFilterType).toBeInTheDocument();
      expect(btnFilterType).toHaveTextContent(element);
      userEvent.click(nextPoke);
      expect(btnAll).toBeInTheDocument();
    });

    const testId = 'data-testid';
    const pokeType = 'pokemon-type-button';

    const btnElectric = screen.getByRole('button', { name: 'Electric' });
    expect(btnElectric).toHaveAttribute(testId, pokeType);
    userEvent.click(btnElectric);
    expect(nextPoke).toBeDisabled();
    expect(btnAll).toBeInTheDocument();

    const btnFire = screen.getByRole('button', { name: 'Fire' });
    expect(btnFire).toHaveAttribute(testId, pokeType);
    userEvent.click(btnFire);
    expect(nextPoke).toBeEnabled();
    expect(btnAll).toBeInTheDocument();

    const btnBug = screen.getByRole('button', { name: 'Bug' });
    expect(btnBug).toHaveAttribute(testId, pokeType);
    userEvent.click(btnBug);
    expect(nextPoke).toBeDisabled();
    expect(btnAll).toBeInTheDocument();

    const btnPoison = screen.getByRole('button', { name: 'Poison' });
    expect(btnPoison).toHaveAttribute(testId, pokeType);
    userEvent.click(btnPoison);
    expect(nextPoke).toBeDisabled();
    expect(btnAll).toBeInTheDocument();

    const btnPsychic = screen.getByRole('button', { name: 'Psychic' });
    expect(btnPsychic).toHaveAttribute(testId, pokeType);
    userEvent.click(btnPsychic);
    expect(nextPoke).toBeEnabled();
    expect(btnAll).toBeInTheDocument();

    const btnNormal = screen.getByRole('button', { name: 'Normal' });
    expect(btnNormal).toHaveAttribute(testId, pokeType);
    userEvent.click(btnNormal);
    expect(nextPoke).toBeDisabled();
    expect(btnAll).toBeInTheDocument();

    const btnDragon = screen.getByRole('button', { name: 'Dragon' });
    expect(btnDragon).toHaveAttribute(testId, pokeType);
    userEvent.click(btnDragon);
    expect(nextPoke).toBeDisabled();
    expect(btnAll).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toHaveTextContent('All');
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(btnAll);
    expect(nextBtn).toBeEnabled();
    expect(btnAll).toBeInTheDocument();
  });
});
