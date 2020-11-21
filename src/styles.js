import styled, { createGlobalStyle } from "styled-components";
import { animated } from "react-spring";

import Dia from "./ABCDiatypeVariable.ttf";

const Global = createGlobalStyle`
  @font-face {
    font-family: 'Dia';
    src: url(${Dia});
  }
  * {
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Helvetica, Arial, sans-serif;
    font-family: 'Dia';
    font-variation-settings: 'wght' 400 'itlc' 100;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    line-height: 20px;
  }

  #root {
    padding: 12px 20px;
  }
  a{
    color: black;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    transition: border-bottom .4s;
  }
  a:hover{
    border-bottom: 1px solid rgba(0, 0, 0, 1);

  }
`;

const Frame = styled("div")`
  position: relative;
  padding: 4px 0px;
  margin: 0px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
`;

const Title = styled("span")`
  vertical-align: middle;
  cursor: pointer;

  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
`;

const Content = styled(animated.div)`
  will-change: transform, opacity, height, font-variation-settings;
  ${"" /* margin-left: 6px; */}
  padding: 0px 10px 0px 20px;
  border-left: 1px solid #eeeeee;
`;

const Container = styled("div")`
  position: relative;
  width: 100%;
  height: auto;
  padding: 16px 0px;
`;

const toggle = {
  width: "1em",
  height: "1em",
  marginRight: 10,
  cursor: "pointer",
  verticalAlign: "middle",
};

export { Global, Frame, Content, toggle, Container, Title };
