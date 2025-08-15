import React, { useState, useEffect } from "react";
import PageHeaderContent from "../../components/pageHeaderContainer";
import { BsInfoCircleFill } from "react-icons/bs";
import { skillsAPI } from "../../services/api";
import { Animate, AnimateKeyframes } from "react-simple-animate";
import { Line } from "rc-progress";
import "./styles.scss";

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillsAPI.getSkills();
      setSkillsData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching skills:", err);
      setError("Failed to load skills. Please try again later.");
      // Fallback to static data if API fails
      setSkillsData([
        {
          label: "FRONT END",
          data: [
            { skillName: "HTML", percentage: "90" },
            { skillName: "CSS", percentage: "70" },
            { skillName: "JavaScript", percentage: "80" },
          ],
        },
        {
          label: "BACK END",
          data: [
            { skillName: "JAVA", percentage: "90" },
            { skillName: "PYTHON", percentage: "60" },
            { skillName: "JAVA-SCRIPT", percentage: "80" },
          ],
        },
        {
          label: "DATABASE",
          data: [
            { skillName: "MONGODB", percentage: "90" },
            { skillName: "SQL", percentage: "80" },
            { skillName: "MY-SQL", percentage: "70" },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="skills" className="skills">
        <PageHeaderContent
          headerText="My Skills"
          icone={<BsInfoCircleFill size={40} />}
        />
        <div className="skills__content-wrapper">
          <div className="loading">Loading skills...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="skills">
        <PageHeaderContent
          headerText="My Skills"
          icone={<BsInfoCircleFill size={40} />}
        />
        <div className="skills__content-wrapper">
          <div className="error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="skills">
      <PageHeaderContent
        headerText="My Skills"
        icone={<BsInfoCircleFill size={40} />}
      />
      <div className="skills__content-wrapper">
        {skillsData.map((item, i) => (
          <div key={i} className="skills__content-wrapper__inner-content">
            <Animate
              play
              duration={1}
              delay={0.3}
              start={{
                transform: "translateX(-200px)",
              }}
              end={{
                transform: "translateX(0px)",
              }}
            >
              <h3 className="skills__content-wrapper__inner-content__category-text">
                {item.label}
              </h3>
              <div>
                {item.data.map((skillItem, j) => (
                  <AnimateKeyframes
                    play
                    duration={1}
                    keyframes={["opacity : 1", "opacity : 0"]}
                    iterationCount="1"
                  >
                    <div className="progressbar-wrapper" key={j}>
                      <p>{skillItem.skillName}</p>
                      <Line
                        percent={skillItem.percentage}
                        strokeWidth="2"
                        strokeColor="var(--yellow-theme-main-color)"
                        trailWidth="2"
                        strokeLinecap="square"
                      />
                    </div>
                  </AnimateKeyframes>
                ))}
              </div>
            </Animate>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
