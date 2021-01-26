import styled from 'styled-components';
import Image from 'next/image'
import React from 'react';
import PropTypes from 'prop-types';

function Logo() {
  return (
    <Image
        src="/Pokemon-Logo.svg"
        alt="Pokémon Quiz!"
        width={350}
        height={164}
      />
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;