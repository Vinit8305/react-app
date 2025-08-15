import React, { useState, useEffect } from "react";
import PageHeaderContent from "../../components/pageHeaderContainer";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaDownload, FaFilePdf, FaCalendarAlt, FaUser } from "react-icons/fa";
import { resumeAPI } from "../../services/api";
import { Animate } from "react-simple-animate";
import "./styles.scss";

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const response = await resumeAPI.getResume();
      setResume(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching resume:", err);
      setError("No resume available at the moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resume) return;

    try {
      setDownloading(true);
      const response = await resumeAPI.downloadResume(resume.id);

      // Create blob and download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resume.originalName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading resume:", err);
      alert("Failed to download resume. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section id="resume" className="resume">
        <PageHeaderContent
          headerText="My Resume"
          icone={<BsInfoCircleFill size={40} />}
        />
        <div className="resume__loading">
          <div className="resume__loading-spinner"></div>
          <p>Loading resume...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="resume" className="resume">
        <PageHeaderContent
          headerText="My Resume"
          icone={<BsInfoCircleFill size={40} />}
        />
        <div className="resume__error">
          <FaFilePdf size={60} />
          <h3>No Resume Available</h3>
          <p>{error}</p>
          <p>Please check back later or contact me directly.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="resume" className="resume">
      <PageHeaderContent
        headerText="My Resume"
        icone={<BsInfoCircleFill size={40} />}
      />

      <div className="resume__content">
        <Animate
          play
          duration={1}
          delay={0.3}
          start={{ transform: "translateY(50px)", opacity: 0 }}
          end={{ transform: "translateY(0px)", opacity: 1 }}
        >
          <div className="resume__card">
            <div className="resume__header">
              <div className="resume__icon">
                <FaFilePdf size={40} />
              </div>
              <div className="resume__info">
                <h2>{resume.originalName}</h2>
                <div className="resume__details">
                  <span className="resume__detail">
                    <FaCalendarAlt /> Updated: {formatDate(resume.updatedAt)}
                  </span>
                  <span className="resume__detail">
                    <FaUser /> Size: {formatFileSize(resume.fileSize)}
                  </span>
                </div>
              </div>
            </div>

            <div className="resume__description">
              <p>
                This is my current professional resume. It contains my work
                experience, education, skills, and achievements. Feel free to
                download it to learn more about my background and
                qualifications.
              </p>
            </div>

            <div className="resume__actions">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="resume__download-btn"
              >
                <FaDownload />
                {downloading ? "Downloading..." : "Download Resume"}
              </button>
            </div>
          </div>
        </Animate>

        <Animate
          play
          duration={1}
          delay={0.5}
          start={{ transform: "translateY(50px)", opacity: 0 }}
          end={{ transform: "translateY(0px)", opacity: 1 }}
        >
          <div className="resume__additional-info">
            <h3>About My Resume</h3>
            <div className="resume__info-grid">
              <div className="resume__info-item">
                <h4>Professional Experience</h4>
                <p>
                  Detailed work history with responsibilities and achievements
                </p>
              </div>
              <div className="resume__info-item">
                <h4>Education</h4>
                <p>Academic background, degrees, and certifications</p>
              </div>
              <div className="resume__info-item">
                <h4>Skills</h4>
                <p>Technical skills, programming languages, and tools</p>
              </div>
              <div className="resume__info-item">
                <h4>Projects</h4>
                <p>Key projects and contributions to showcase expertise</p>
              </div>
            </div>
          </div>
        </Animate>
      </div>
    </section>
  );
};

export default Resume;
