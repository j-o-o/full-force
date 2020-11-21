import React, { memo, useState, useEffect } from "react";
import { useSpring, a } from "react-spring";
import { request } from "graphql-request";
import GraphImg from "graphcms-image";
import ReactMarkdown from "react-markdown";

import { useMeasure, usePrevious } from "./helpers";
import { Global, Frame, Title, Content, Container, toggle } from "./styles";

const Tree = memo(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);

  const previous = usePrevious(isOpen);

  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform, fontVariationSettings } = useSpring({
    from: {
      height: 0,
      opacity: 0,
      transform: "translateX(90px)",
    },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translateX(${isOpen ? 0 : 90}px)`,
    },
  });
  return (
    <Frame>
      <Title
        style={
          (style,
          isOpen
            ? { borderBottom: "1px solid #eeeeee" }
            : { borderBottom: "1px solid #dbdbdb" })
        }
        onClick={() => setOpen(!isOpen)}
      >
        {name}
      </Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height,
        }}
      >
        <a.div style={{ transform, opacity }} {...bind} children={children} />
      </Content>
    </Frame>
  );
});

export default function App() {
  const [phones, setPhones] = useState(null);
  const [websites, setWebsites] = useState(null);
  const [portraits, setPortraits] = useState(null);
  const [graphics, setGraphics] = useState(null);

  useEffect(() => {
    const fetchPhones = async () => {
      const { phones } = await request(
        "https://api-eu-central-1.graphcms.com/v2/ckhovyxp92oqe01xig25d93j2/master",
        `
          {
            phones(orderBy: id_DESC) {


              id
              title
              image {
                handle
                width
                height
              }
            }
          }
          
      `
      );
      setPhones(phones);
    };
    fetchPhones();

    const fetchPortraits = async () => {
      const { portraits } = await request(
        "https://api-eu-central-1.graphcms.com/v2/ckhovyxp92oqe01xig25d93j2/master",
        `
          {
            portraits{
              pic{
                handle
                width
                height
              }
            }  
          }      
          `
      );
      setPortraits(portraits);
    };
    fetchPortraits(portraits);

    const fetchWebsites = async () => {
      const { websites } = await request(
        "https://api-eu-central-1.graphcms.com/v2/ckhovyxp92oqe01xig25d93j2/master",
        `
          {
            websites {
              id
              title
              markdown
              url
              image {
                handle
                width
                height
              }
            }
          }
          
      `
      );
      setWebsites(websites);
    };
    fetchWebsites();

    const fetchGraphics = async () => {
      const { graphics } = await request(
        "https://api-eu-central-1.graphcms.com/v2/ckhovyxp92oqe01xig25d93j2/master",
        `
          {
            graphics {
              id
              title
              markdown
              image {
                handle
                width
                height
              }
            }
          }
          
      `
      );
      setGraphics(graphics);
    };
    fetchGraphics();
  }, []);
  return (
    <>
      <Global />
      <Tree name="Napoleon Services">
        {/* <Container>Under Construction 👀</Container> */}

        <Tree name="About">
          <Container>
            Napoleon is the alias to publish my works online. <br />
            I wanted to show my work to the public without using my real name
            and just went on with it. <br />
            Napoleon grew over my work and nowadays I use it for all my creative
            output. I'm currently living in Weimar, germany.
          </Container>
          <Tree name="Teaching">
            <Container>
              In 2020 I'm teaching the class "Haha HTML go br br br" at the
              Bauhaus-University Weimar.
              <br />
              We discussed the current state of webdesign and build our own
              websites.
              <br />
              More soon…
            </Container>
          </Tree>
          <Tree name="Experience">
            <Container>
              Selam-X (2019) <br />
              Knoth & Renner (2018) <br />
              Projektil (2017)
            </Container>
          </Tree>
          <Tree name="Mentions">
            <Container>
              It'sNiceThat{" "}
              <a href="https://www.itsnicethat.com/articles/erik-sachse-napoleon-typefaces-graphic-design-010419">
                External link
              </a>
              <br />
              Hoverstat.es (Grove Journal){" "}
              <a href="https://www.hoverstat.es/features/grove-journal">
                External link
              </a>
              <br />
              Hallointern.net (IRRE){" "}
              <a href="http://hallointer.net/irrebauhaus">External link</a>
            </Container>
          </Tree>

          {!portraits ? (
            <Tree cotnent="Loading" />
          ) : (
            <Tree name="Portrait">
              <React.Fragment>
                <Container>
                  {portraits.map(({ pic }, i) => (
                    <GraphImg
                      key={i}
                      image={pic}
                      maxWidth={400}
                      style={{
                        width: "calc(100vw - 100px)",
                        maxWidth: "400px",
                        filter: "grayscale(1)",
                      }}
                    />
                  ))}
                </Container>
              </React.Fragment>
            </Tree>
          )}
        </Tree>
        <Tree name="Works">
          {!websites ? (
            <Tree cotnent="Loading" />
          ) : (
            <Tree name="Websites">
              <React.Fragment>
                {websites.map(({ id, title, markdown, url, image }) => (
                  <Tree key={id} name={title}>
                    <Container>
                      {/* <p>{title}</p> */}
                      <GraphImg
                        image={image}
                        maxWidth={400}
                        style={{
                          width: "calc(100vw - 100px)",
                          maxWidth: "400px",
                        }}
                        title={title}
                      />
                      <ReactMarkdown>{markdown}</ReactMarkdown>
                      {url && (
                        <p>
                          <a href={url}>External link</a>
                        </p>
                      )}
                    </Container>
                  </Tree>
                ))}
              </React.Fragment>
            </Tree>
          )}

          {!graphics ? (
            <Tree cotnent="Loading" />
          ) : (
            <Tree name="Graphics">
              <React.Fragment>
                {graphics.map(({ id, title, markdown, image }) => (
                  <Tree key={id} name={title}>
                    <Container>
                      {/* <p>{title}</p> */}
                      <GraphImg
                        image={image}
                        maxWidth={400}
                        style={{
                          width: "calc(100vw - 100px)",
                          maxWidth: "400px",
                        }}
                        title={title}
                      />
                      <ReactMarkdown>{markdown}</ReactMarkdown>
                    </Container>
                  </Tree>
                ))}
              </React.Fragment>
            </Tree>
          )}
        </Tree>
        {!phones ? (
          <Tree cotnent="Loading" />
        ) : (
          <Tree name="Phone uploads">
            <React.Fragment>
              {phones.map(({ id, title, image }) => (
                <Tree key={id} name={title}>
                  <Container>
                    <GraphImg
                      image={image}
                      maxWidth={400}
                      style={{
                        width: "calc(100vw - 100px)",
                        maxWidth: "400px",
                      }}
                      title={title}
                    />
                  </Container>
                </Tree>
              ))}
            </React.Fragment>
          </Tree>
        )}
        <Tree name="Contact">
          <Container>
            <a href="mailto:erik@napoleon.services">erik@napoleon.services</a>{" "}
            <br />
            <a href="https://www.instagram.com/napoleon.services/">Instagram</a>
            <br />
            <a href="https://www.are.na/napoleon-services">Are.na</a>
          </Container>
        </Tree>
        <Tree name="Website details">
          <Container>
            This website uses <a href="https://reactjs.org/">React</a> as
            framework. <br />
            The code is entirely hosted to{" "}
            <a href="https://github.com/j-o-o/full-force">GitHub</a>, which
            makes it very reliable in combination with Vercel as CDN.
            <br />
            It also uses a headless CMS called{" "}
            <a href="https://graphcms.com/">GraphCMS</a>.<br />
          </Container>
        </Tree>
      </Tree>
      <div style={{ height: "200px" }} />
    </>
  );
}
