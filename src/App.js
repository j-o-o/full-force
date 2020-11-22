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
  const { height, opacity, transform } = useSpring({
    from: {
      height: 0,
      opacity: 0,
      overflow: "hidden",
      transform: "translateX(90px)",
    },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      overflow: isOpen ? "inherit" : "hidden",
      transform: `translateX(${isOpen ? 0 : 90}px)`,
    },
  });
  return (
    <Frame>
      <Title
        style={
          style
          // ,
          // isOpen
          //   ? { borderBottom: "1px solid rgb(180, 180, 180)" }
          //   : { borderBottom: "1px solid rgb(200, 200, 200)" }
        }
        onClick={() => setOpen(!isOpen)}
      >
        {isOpen ? "" : ""} {name}
      </Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height,
        }}
      >
        <a.div style={{ transform }} {...bind} children={children} />
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
      <Tree name="Napoleon Services" defaultOpen>
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
            <Tree name="Datenschutzerklärung / Data privacy">
              <Container>
                <p>Datenschutzerklärung</p>
                <p>
                  Personenbezogene Daten (nachfolgend zumeist nur „Daten“
                  genannt) werden von uns nur im Rahmen der Erforderlichkeit
                  sowie zum Zwecke der Bereitstellung eines funktionsfähigen und
                  nutzerfreundlichen Internetauftritts, inklusive seiner Inhalte
                  und der dort angebotenen Leistungen, verarbeitet.
                </p>
                <p>
                  Gemäß Art. 4 Ziffer 1. der Verordnung (EU) 2016/679, also der
                  Datenschutz-Grundverordnung (nachfolgend nur „DSGVO“ genannt),
                  gilt als „Verarbeitung“ jeder mit oder ohne Hilfe
                  automatisierter Verfahren ausgeführter Vorgang oder jede
                  solche Vorgangsreihe im Zusammenhang mit personenbezogenen
                  Daten, wie das Erheben, das Erfassen, die Organisation, das
                  Ordnen, die Speicherung, die Anpassung oder Veränderung, das
                  Auslesen, das Abfragen, die Verwendung, die Offenlegung durch
                  Übermittlung, Verbreitung oder eine andere Form der
                  Bereitstellung, den Abgleich oder die Verknüpfung, die
                  Einschränkung, das Löschen oder die Vernichtung.
                </p>
                <p>
                  Mit der nachfolgenden Datenschutzerklärung informieren wir Sie
                  insbesondere über Art, Umfang, Zweck, Dauer und
                  Rechtsgrundlage der Verarbeitung personenbezogener Daten,
                  soweit wir entweder allein oder gemeinsam mit anderen über die
                  Zwecke und Mittel der Verarbeitung entscheiden. Zudem
                  informieren wir Sie nachfolgend über die von uns zu
                  Optimierungszwecken sowie zur Steigerung der Nutzungsqualität
                  eingesetzten Fremdkomponenten, soweit hierdurch Dritte Daten
                  in wiederum eigener Verantwortung verarbeiten.
                </p>
                <p>Unsere Datenschutzerklärung ist wie folgt gegliedert:</p>
                <p>
                  I. Informationen über uns als Verantwortliche
                  <br />
                  II. Rechte der Nutzer und Betroffenen
                  <br />
                  III. Informationen zur Datenverarbeitung
                </p>
                <p>I. Informationen über uns als Verantwortliche</p>
                <p>
                  Verantwortlicher Anbieter dieses Internetauftritts im
                  datenschutzrechtlichen Sinne ist:
                </p>
                <p>
                  Erik Sachse
                  <br />
                  Trierer Straße 62
                  <br />
                  99423 Weimar
                  <br />
                  Deutschland
                  <br />
                </p>
                <p>II. Rechte der Nutzer und Betroffenen</p>
                <p>
                  Mit Blick auf die nachfolgend noch näher beschriebene
                  Datenverarbeitung haben die Nutzer und Betroffenen das Recht
                </p>
                <ul>
                  <li>
                    auf Bestätigung, ob sie betreffende Daten verarbeitet
                    werden, auf Auskunft über die verarbeiteten Daten, auf
                    weitere Informationen über die Datenverarbeitung sowie auf
                    Kopien der Daten (vgl. auch Art. 15 DSGVO);
                  </li>
                  <li>
                    auf Berichtigung oder Vervollständigung unrichtiger bzw.
                    unvollständiger Daten (vgl. auch Art. 16 DSGVO);
                  </li>
                  <li>
                    auf unverzügliche Löschung der sie betreffenden Daten (vgl.
                    auch Art. 17 DSGVO), oder, alternativ, soweit eine weitere
                    Verarbeitung gemäß Art. 17 Abs. 3 DSGVO erforderlich ist,
                    auf Einschränkung der Verarbeitung nach Maßgabe von Art. 18
                    DSGVO;
                  </li>
                  <li>
                    auf Erhalt der sie betreffenden und von ihnen
                    bereitgestellten Daten und auf Übermittlung dieser Daten an
                    andere Anbieter/Verantwortliche (vgl. auch Art. 20 DSGVO);
                  </li>
                  <li>
                    auf Beschwerde gegenüber der Aufsichtsbehörde, sofern sie
                    der Ansicht sind, dass die sie betreffenden Daten durch den
                    Anbieter unter Verstoß gegen datenschutzrechtliche
                    Bestimmungen verarbeitet werden (vgl. auch Art. 77 DSGVO).
                  </li>
                </ul>
                <p>
                  Darüber hinaus ist der Anbieter dazu verpflichtet, alle
                  Empfänger, denen gegenüber Daten durch den Anbieter
                  offengelegt worden sind, über jedwede Berichtigung oder
                  Löschung von Daten oder die Einschränkung der Verarbeitung,
                  die aufgrund der Artikel 16, 17 Abs. 1, 18 DSGVO erfolgt, zu
                  unterrichten. Diese Verpflichtung besteht jedoch nicht, soweit
                  diese Mitteilung unmöglich oder mit einem unverhältnismäßigen
                  Aufwand verbunden ist. Unbeschadet dessen hat der Nutzer ein
                  Recht auf Auskunft über diese Empfänger.
                </p>
                <p>
                  Ebenfalls haben die Nutzer und Betroffenen nach Art. 21 DSGVO
                  das Recht auf Widerspruch gegen die künftige Verarbeitung der
                  sie betreffenden Daten, sofern die Daten durch den Anbieter
                  nach Maßgabe von Art. 6 Abs. 1 lit. f) DSGVO verarbeitet
                  werden. Insbesondere ist ein Widerspruch gegen die
                  Datenverarbeitung zum Zwecke der Direktwerbung statthaft.
                </p>
                <p>III. Informationen zur Datenverarbeitung</p>
                <p>
                  Ihre bei Nutzung unseres Internetauftritts verarbeiteten Daten
                  werden gelöscht oder gesperrt, sobald der Zweck der
                  Speicherung entfällt, der Löschung der Daten keine
                  gesetzlichen Aufbewahrungspflichten entgegenstehen und
                  nachfolgend keine anderslautenden Angaben zu einzelnen
                  Verarbeitungsverfahren gemacht werden.
                </p>
                <p>
                  <a
                    href="https://www.ratgeberrecht.eu/leistungen/muster-datenschutzerklaerung.html"
                    target="_blank"
                    rel="noopener"
                  >
                    Muster-Datenschutzerklärung
                  </a>{" "}
                  der{" "}
                  <a
                    href="https://www.ratgeberrecht.eu/datenschutz/datenschutzerklaerung-generator-dsgvo.html"
                    target="_blank"
                    rel="noopener"
                  >
                    Anwaltskanzlei Weiß &amp; Partner
                  </a>
                </p>
                ————
                <p>Privacy Policy</p>
                <p>
                  Personal data (usually referred to just as "data" below) will
                  only be processed by us to the extent necessary and for the
                  purpose of providing a functional and user-friendly website,
                  including its contents, and the services offered there.
                </p>
                <p>
                  Per Art. 4 No. 1 of Regulation (EU) 2016/679, i.e. the General
                  Data Protection Regulation (hereinafter referred to as the
                  "GDPR"), "processing" refers to any operation or set of
                  operations such as collection, recording, organization,
                  structuring, storage, adaptation, alteration, retrieval,
                  consultation, use, disclosure by transmission, dissemination,
                  or otherwise making available, alignment, or combination,
                  restriction, erasure, or destruction performed on personal
                  data, whether by automated means or not.
                </p>
                <p>
                  The following privacy policy is intended to inform you in
                  particular about the type, scope, purpose, duration, and legal
                  basis for the processing of such data either under our own
                  control or in conjunction with others. We also inform you
                  below about the third-party components we use to optimize our
                  website and improve the user experience which may result in
                  said third parties also processing data they collect and
                  control.
                </p>
                <p>Our privacy policy is structured as follows:</p>
                <p>
                  I. Information about us as controllers of your data
                  <br />
                  II. The rights of users and data subjects
                  <br />
                  III. Information about the data processing
                </p>
                <p>I. Information about us as controllers of your data</p>
                <p>
                  The party responsible for this website (the "controller") for
                  purposes of data protection law is:
                </p>
                <p>
                  Erik Sachse
                  <br />
                  Trierer Straße 62
                  <br />
                  99423 Weimar
                  <br />
                  Germany
                </p>
                <p>II. The rights of users and data subjects</p>
                <p>
                  With regard to the data processing to be described in more
                  detail below, users and data subjects have the right
                </p>
                <ul type="disc">
                  <li>
                    to confirmation of whether data concerning them is being
                    processed, information about the data being processed,
                    further information about the nature of the data processing,
                    and copies of the data (cf. also Art. 15 GDPR);
                  </li>
                  <li>
                    to correct or complete incorrect or incomplete data (cf.
                    also Art. 16 GDPR);
                  </li>
                  <li>
                    to the immediate deletion of data concerning them (cf. also
                    Art. 17 DSGVO), or, alternatively, if further processing is
                    necessary as stipulated in Art. 17 Para. 3 GDPR, to restrict
                    said processing per Art. 18 GDPR;
                  </li>
                  <li>
                    to receive copies of the data concerning them and/or
                    provided by them and to have the same transmitted to other
                    providers/controllers (cf. also Art. 20 GDPR);
                  </li>
                  <li>
                    to file complaints with the supervisory authority if they
                    believe that data concerning them is being processed by the
                    controller in breach of data protection provisions (see also
                    Art. 77 GDPR).
                  </li>
                </ul>
                <p>
                  In addition, the controller is obliged to inform all
                  recipients to whom it discloses data of any such corrections,
                  deletions, or restrictions placed on processing the same per
                  Art. 16, 17 Para. 1, 18 GDPR. However, this obligation does
                  not apply if such notification is impossible or involves a
                  disproportionate effort. Nevertheless, users have a right to
                  information about these recipients.
                </p>
                <p>
                  Likewise, under Art. 21 GDPR, users and data subjects have the
                  right to object to the controller's future processing of their
                  data pursuant to Art. 6 Para. 1 lit. f) GDPR. In particular,
                  an objection to data processing for the purpose of direct
                  advertising is permissible.
                </p>
                <p>III. Information about the data processing</p>
                <p>
                  Your data processed when using our website will be deleted or
                  blocked as soon as the purpose for its storage ceases to
                  apply, provided the deletion of the same is not in breach of
                  any statutory storage obligations or unless otherwise
                  stipulated below.
                </p>
                <p>
                  <a
                    href="https://www.ratgeberrecht.eu/leistungen/muster-datenschutzerklaerung.html"
                    target="_blank"
                    rel="noopener"
                  >
                    Model Data Protection Statement
                  </a>{" "}
                  for{" "}
                  <a
                    href="https://www.ratgeberrecht.eu/"
                    target="_blank"
                    rel="noopener"
                  >
                    Anwaltskanzlei Weiß &amp; Partner
                  </a>
                </p>
              </Container>
            </Tree>
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
    </>
  );
}
