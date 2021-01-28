import React from 'react';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from "next/head";
import Link from "next/link";
import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input';
import Button from '../src/components/Button';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

function Pokemon({ _pokemon }) {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <QuizLogo srcImage={db.logo}></QuizLogo>
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
            <Input
              name="nomeDoUsuario"
              onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
              placeholder="Nome do Caçador"
              value={name}
            />
            <Button type="submit" disabled={name.length === 0}>
                {`Capturar`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
          <h1>Quizes da Galera</h1>
          <p></p>
            {_pokemon.items.slice(0,5).map((alternative, alternativeIndex) => {
                  return(
                    <Widget.Git>
                      <img width='30' height='30' src={_pokemon.items[alternativeIndex].owner.avatar_url}></img>
                      <a href={_pokemon.items[0].homepage}>{_pokemon.items[alternativeIndex].name}</a>
                    </Widget.Git>
                  );
                }
              )
            }
            

            
            {/* <p>{_pokemon.items[0].owner.avatar_url}</p>
            <p>{_pokemon.items[0].name}</p>
            <p>{_pokemon.items[0].homepage}</p> */}
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/dashpunk" />
    </QuizBackground>
  );
}

Pokemon.getInitialProps = async ({ query }) => {
  const number = query.name;
  const randomNumber = Math.floor(Math.random() * 100);
  const _pokemon = await axios
    //.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    .get(`https://api.github.com/search/repositories?q=topic:alura+quiz&sort=created&order=desc`)
    .then((response) => response.data);
  return { _pokemon };
};

export default Pokemon;