import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente <Pokemon.js />', () => {
  test('Teste se há um card com as informações de um determinado pokemon', () => {
    renderWithRouter(<App />);
    const img = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/pikachu/i);

    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/electric/i);

    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Teste o link de navegação que exibe os detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('Teste se clicar no link de nav, é direcionado para pagina de detalhes', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const summaryPoke = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summaryPoke).toBeInTheDocument();
  });

  test('Teste se a URL exibida no navegador muda para /pokemons/id', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const favCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favCheckbox);
    const starFavPoke = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(starFavPoke).toBeInTheDocument();
    expect(starFavPoke).toHaveAttribute('src', '/star-icon.svg');
    expect(starFavPoke).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
