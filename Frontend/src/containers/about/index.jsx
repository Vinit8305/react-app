import React from "react";
import PageHeaderContent from "../../components/pageHeaderContainer";
import { BsInfoCircleFill } from "react-icons/bs";
import { Animate } from "react-simple-animate";
import "./styles.scss";
import { DiJava,DiReact,DiGithubBadge,DiDatabase } from "react-icons/di";


const personalDetails = [
  {
    label: "Name",
    value: "Vinit Pawar",
  },
  {
    label: "Age",
    value: "23",
  },
  {
    label: "Address",
    value: "Indore,Madhya Pradesh,India",
  },
  {
    label: "Email",
    value: "vinitpawar8305@gmail.com",
  },
  {
    label: "Contact No",
    value: "+91 8305621926",
  },
];

const exprince =
  "I'm a passionate Full-Stack Developer with expertise in building scalable web applications. I specialize in React, Node.js, and modern JavaScript frameworks. My journey in software development started with a curiosity about how things work behind the scenes, which evolved into a career focused on creating efficient, user-friendly solutions. I enjoy solving complex problems and continuously learning new technologies to stay at the forefront of web development.";
const About = () => {
  return (
    <section id="about" className="about">
      <PageHeaderContent
        headerText="About Me"
        icone={<BsInfoCircleFill size={40} />}
      />
      <div className="about__content">
        <div className="about__content__personalWrapper">
          <Animate
            play
            duration={1.5}
            delay={1}
            start={{
              transform: "translateX(-900px)",
            }}
            end={{
              transform: "translatex(0px)",
            }}
          >
            <h3>Full-Stack Developer</h3>
            <p>{exprince}</p>
          </Animate>

          <Animate
            play
            duration={1.5}
            delay={1}
            start={{
              transform: "translateX(500px)",
            }}
            end={{
              transform: "translatex(0px)",
            }}
          >
            <h3 className="personalInformationHeaderText">Persnal Information</h3>
            <ul>
              {personalDetails.map((item, i) => (
                <li key={i}>
                  <span className="title">{item.label}</span>
                  <span className="value">{item.value}</span>
                </li>
              ))}
            </ul>
          </Animate>
        </div>
        <div className="about__content__servicesWrapper">
        <Animate
            play
            duration={1.5}
            delay={1}
            start={{
              transform: "translateX(600px)",
            }}
            end={{
              transform: "translatex(0px)",
            }}
          >
          <div className="about__content__servicesWrapper__innerContent">
            <div>
              <DiJava size={60} color="var(--yellow-theme-main-color)" />
            </div>
            <div>
              <DiDatabase size={60} color="var(--yellow-theme-main-color)" />
            </div>
            <div>
              <DiGithubBadge size={60} color="var(--yellow-theme-main-color)" />
            </div>
            <div>
              <DiReact size={60} color="var(--yellow-theme-main-color)" />
            </div>
          </div>
          </Animate>
        </div>
      </div>
    </section>
  );
};

export default About;
