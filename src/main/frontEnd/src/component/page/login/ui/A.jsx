/*eslint-disable*/
import styled from "styled-components";
import React from 'react';

const StyledA = styled.a`
  font-weight: bold;
  color: black;
  text-decoration: none;

  &:hover{
    animation: twinkling infinite;
  }

  @keyframes twinkling{
    0% { opacity: 1; }
    50% { opacity : 0.5; }
    100% { opacity : 1; }
  }
`

function A(props){
  const { href, content } = props;
  return <StyledA href={href}>{content}</StyledA>
}

export default A;