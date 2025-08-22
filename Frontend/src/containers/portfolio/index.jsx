import React, { useState } from "react";
import PageHeaderContent from "../../components/pageHeaderContainer";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaGithub, FaExternalLinkAlt, FaEye } from "react-icons/fa";
import { Animate } from "react-simple-animate";
import "./styles.scss";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    "ALL",
    "WEB APP",
    "MOBILE APP",
    "FULL-STACK",
    "UI/UX",
    "OPEN SOURCE",
  ];

  const projects = [
    {
      id: 1,
      title: "Election-AI Dashbord",
      description:
        "Developed an Election-AI app that helps politicians improve election strategies by gathering survey responses from users on government facilities.",
      image:
        "/Election.png",
      category: "WEB APP",
      technologies: ["React", "Firebase", "Material-UI", "Redux","Node.js","Express.js","MongoDB"],
      githubUrl: "https://github.com/Vinit8305/Election-Ai",
      liveUrl: "https://election-ai.onrender.com",
      featured: true,
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform built with Anguler, Node.js, and MySQL. Features include user authentication, product management, shopping cart, and payment integration.",
      image:
        "/wedbazar.png",
      category: "FULL-STACK",
      technologies: ["Angular", "Node.js", "MySQL", "Express", "Stripe"],
      githubUrl: "https://github.com/rajeshpal53/wedbazar_web/tree/vinit",
      liveUrl: "http://localhost:4200",
      featured: true,
    },
    
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "This very portfolio website with dynamic content management and admin panel.",
      image:
        "/portfolio.png",
      category: "FULL-STACK",
      technologies: ["React", "Node.js", "MongoDB", "SCSS", "JWT"],
      githubUrl: "https://github.com/Vinit8305/react-app",
      liveUrl: "https://react-app-frontend-leac.onrender.com",
      featured: true,
    },
    {
      id: 4,
      title: "QwikBill App",
      description:
        " A billing software designed to help shop owners efficiently manage GST and provisional bills, along with employee-related billing tasks, providing a streamlined solution for day-to-day retail operations",
      image:
        "/qwikbil.png",
      category: "MOBILE APP",
      technologies: ["React Native", "Firebase", "Redux", "Native Base"],
      githubUrl: "https://github.com/rajeshpal53/qwikbill_mobile",
      liveUrl: "https://drive.google.com/file/d/1n_zUye5tWBJh2ow6NAopFeh0aOlGaBCW/view?usp=drive_link",
      featured: false,
    },
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className="portfolio">
      <PageHeaderContent
        headerText="My Portfolio"
        icone={<BsInfoCircleFill size={40} />}
      />

      <div className="portfolio__content">
        {/* Category Filter */}
        <div className="portfolio__filter">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`portfolio__filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="portfolio__projects">
          {filteredProjects.map((project, index) => (
            <Animate
              key={project.id}
              play
              duration={0.5}
              delay={index * 0.1}
              start={{
                transform: "translateY(50px)",
                opacity: 0,
              }}
              end={{
                transform: "translateY(0px)",
                opacity: 1,
              }}
            >
              <div className="portfolio__project-card">
                <div className="portfolio__project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="portfolio__project-overlay">
                    <button
                      className="portfolio__project-btn"
                      onClick={() => openProjectModal(project)}
                    >
                      <FaEye size={20} />
                    </button>
                  </div>
                  {project.featured && (
                    <div className="portfolio__featured-badge">Featured</div>
                  )}
                </div>

                <div className="portfolio__project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description.substring(0, 100)}...</p>

                  <div className="portfolio__project-tech">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="portfolio__tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="portfolio__tech-tag">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="portfolio__project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio__link-btn"
                      >
                        <FaGithub size={16} />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio__link-btn"
                      >
                        <FaExternalLinkAlt size={16} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Animate>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="portfolio__no-projects">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="portfolio__modal" onClick={closeProjectModal}>
          <div
            className="portfolio__modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="portfolio__modal-close"
              onClick={closeProjectModal}
            >
              
            </button>

            <div className="portfolio__modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="portfolio__modal-info">
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>

              <div className="portfolio__modal-tech">
                <h4>Technologies Used:</h4>
                <div className="portfolio__tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="portfolio__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="portfolio__modal-links">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio__modal-btn"
                  >
                    <FaGithub size={18} />
                    View Code
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio__modal-btn primary"
                  >
                    <FaExternalLinkAlt size={18} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
