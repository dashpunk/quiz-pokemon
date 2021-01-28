import React from 'react';
import styled from 'styled-components'
import axios from 'axios';

function GitAlura({ _topics }) {
    
  return (
    
      'SS'
  );
}

GitAlura.getInitialProps = async ({ query }) => {
  const _topics = await axios
    .get(`https://api.github.com/search/repositories?q=topic:alura+quiz&sort=created&order=desc`)
    .then((response) => response.data);

    console.log("sd");
    console.log(_topics);
  return { _topics };
};

export default GitAlura