import styled, { createGlobalStyle } from "styled-components";
import { animated } from "react-spring";

import Int from "./Inter-Regular-slnt=0.ttf";
const Global = createGlobalStyle`
   @font-face {
    font-family: 'Int';
    src: url(${Int});
  }
  * {
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    font-family: 'Int', Helvetica, Arial, sans-serif;
    font-feature-settings: "ss01";

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    line-height: 24px;
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
  padding: 6px 0px 0px 0px;
  margin: 0px 0;
  text-overflow: ellipsis;
  overflow: visible;
  overflow: hidden;
  vertical-align: middle;
`;

const Title = styled("span")`
  vertical-align: middle;
  cursor: pointer;
  /* border-bottom: 1px solid rgb(180, 180, 180); */
`;

const Content = styled(animated.div)`
  will-change: transform, opacity, height, font-variation-settings;
  margin: 6px 0px 0px 6px;
  padding: 0px 10px 0px 20px;
  border-left: 1px solid rgb(220, 220, 220);
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
