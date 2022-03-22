import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o component <About.js />', () => {
  test('Testando se a página contém um h2 com o texto "About Pokédex"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const headingAbout = screen.getByRole('heading',
      { name: /about pokédex/i, level: 2 });
    expect(headingAbout).toBeInTheDocument();
  });

  test('Testando se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const paragraphAbout1 = screen.getByText(/encyclopedia containing all pokémons/i);
    const paragraphAbout2 = screen.getByText(/one can filter pokémons by type/i);
    expect(paragraphAbout1).toBeInTheDocument();
    expect(paragraphAbout2).toBeInTheDocument();
  });

  test('Testando se a página contém a imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const imgPokedex = screen.getByRole('img', { name: /pokédex/i });
    expect(imgPokedex).toBeInTheDocument();
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
