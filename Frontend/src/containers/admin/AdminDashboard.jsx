import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { skillsAPI, authAPI, resumeAPI } from "../../services/api";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaFileUpload,
  FaFilePdf,
} from "react-icons/fa";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const [skills, setSkills] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    skillName: "",
    percentage: "",
    category: "FRONT END",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
    fetchResumes();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      await authAPI.getCurrentUser();
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/admin/login");
    }
  };

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillsAPI.getAdminSkills();
      setSkills(response.data);
    } catch (err) {
      setError("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getAdminResumes();
      setResumes(response.data);
    } catch (err) {
      console.error("Failed to load resumes:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await skillsAPI.createSkill(formData);
      setSuccess("Skill added successfully!");
      setShowAddForm(false);
      setFormData({ skillName: "", percentage: "", category: "FRONT END" });
      fetchSkills();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add skill");
    }
  };

  const handleEditSkill = async (e) => {
    e.preventDefault();
    try {
      await skillsAPI.updateSkill(editingSkill._id, formData);
      setSuccess("Skill updated successfully!");
      setEditingSkill(null);
      setFormData({ skillName: "", percentage: "", category: "FRONT END" });
      fetchSkills();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update skill");
    }
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await skillsAPI.deleteSkill(id);
        setSuccess("Skill deleted successfully!");
        fetchSkills();
      } catch (err) {
        setError("Failed to delete skill");
      }
    }
  };

  const startEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      skillName: skill.skillName,
      percentage: skill.percentage.toString(),
      category: skill.category,
    });
  };

  const cancelEdit = () => {
    setEditingSkill(null);
    setFormData({ skillName: "", percentage: "", category: "FRONT END" });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setError("Please select a valid PDF file");
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a PDF file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);

      await resumeAPI.uploadResume(formData);
      setSuccess("Resume uploaded successfully!");
      setShowResumeUpload(false);
      setSelectedFile(null);
      fetchResumes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload resume");
    }
  };

  const handleDeleteResume = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await resumeAPI.deleteResume(id);
        setSuccess("Resume deleted successfully!");
        fetchResumes();
      } catch (err) {
        setError("Failed to delete resume");
      }
    }
  };

  const handleActivateResume = async (id) => {
    try {
      await resumeAPI.activateResume(id);
      setSuccess("Resume activated successfully!");
      fetchResumes();
    } catch (err) {
      setError("Failed to activate resume");
    }
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    const timer = setTimeout(clearMessages, 5000);
    return () => clearTimeout(timer);
  }, [error, success]);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-dashboard__loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="admin-dashboard__logout">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {error && <div className="admin-dashboard__error">{error}</div>}
      {success && <div className="admin-dashboard__success">{success}</div>}

      <div className="admin-dashboard__content">
        {/* Skills Management */}
        <div className="admin-dashboard__section">
          <div className="admin-dashboard__section-header">
            <h2>Manage Skills</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="admin-dashboard__add-btn"
            >
              <FaPlus /> Add New Skill
            </button>
          </div>
          <div className="admin-dashboard__skills-grid">
            {skills.map((skill) => (
              <div key={skill._id} className="admin-dashboard__skill-card">
                <div className="admin-dashboard__skill-info">
                  <h3>{skill.skillName}</h3>
                  <p className="admin-dashboard__skill-category">
                    {skill.category}
                  </p>
                  <div className="admin-dashboard__skill-percentage">
                    <div
                      className="admin-dashboard__skill-bar"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                    <span>{skill.percentage}%</span>
                  </div>
                </div>
                <div className="admin-dashboard__skill-actions">
                  <button
                    onClick={() => startEdit(skill)}
                    className="admin-dashboard__edit-btn"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill._id)}
                    className="admin-dashboard__delete-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Management */}
        <div className="admin-dashboard__section">
          <div className="admin-dashboard__section-header">
            <h2>Manage Resume</h2>
            <button
              onClick={() => setShowResumeUpload(true)}
              className="admin-dashboard__add-btn"
            >
              <FaFileUpload /> Upload New Resume
            </button>
          </div>
          <div className="admin-dashboard__resumes-grid">
            {resumes.map((resume) => (
              <div key={resume._id} className="admin-dashboard__resume-card">
                <div className="admin-dashboard__resume-info">
                  <div className="admin-dashboard__resume-icon">
                    <FaFilePdf />
                  </div>
                  <div className="admin-dashboard__resume-details">
                    <h3>{resume.originalName}</h3>
                    <p>Size: {(resume.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                    <p>
                      Uploaded:{" "}
                      {new Date(resume.uploadedAt).toLocaleDateString()}
                    </p>
                    {resume.isActive && (
                      <span className="admin-dashboard__active-badge">
                        Active
                      </span>
                    )}
                  </div>
                </div>
                <div className="admin-dashboard__resume-actions">
                  {!resume.isActive && (
                    <button
                      onClick={() => handleActivateResume(resume._id)}
                      className="admin-dashboard__activate-btn"
                    >
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteResume(resume._id)}
                    className="admin-dashboard__delete-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            {resumes.length === 0 && (
              <div className="admin-dashboard__no-resumes">
                <FaFilePdf size={40} />
                <p>No resumes uploaded yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Skill Modal */}
      {(showAddForm || editingSkill) && (
        <div className="admin-dashboard__modal">
          <div className="admin-dashboard__modal-content">
            <h2>{editingSkill ? "Edit Skill" : "Add New Skill"}</h2>
            <form onSubmit={editingSkill ? handleEditSkill : handleAddSkill}>
              <div className="admin-dashboard__form-group">
                <label>Skill Name</label>
                <input
                  type="text"
                  value={formData.skillName}
                  onChange={(e) =>
                    setFormData({ ...formData, skillName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="admin-dashboard__form-group">
                <label>Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.percentage}
                  onChange={(e) =>
                    setFormData({ ...formData, percentage: e.target.value })
                  }
                  required
                />
              </div>
              <div className="admin-dashboard__form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="FRONT END">Front End</option>
                  <option value="BACK END">Back End</option>
                  <option value="DATABASE">Database</option>
                  <option value="TOOLS">Tools</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="admin-dashboard__form-actions">
                <button type="submit" className="admin-dashboard__save-btn">
                  {editingSkill ? "Update" : "Add"} Skill
                </button>
                <button
                  type="button"
                  onClick={
                    editingSkill ? cancelEdit : () => setShowAddForm(false)
                  }
                  className="admin-dashboard__cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resume Upload Modal */}
      {showResumeUpload && (
        <div className="admin-dashboard__modal">
          <div className="admin-dashboard__modal-content">
            <h2>Upload New Resume</h2>
            <form onSubmit={handleResumeUpload}>
              <div className="admin-dashboard__form-group">
                <label>Select PDF File</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  required
                />
                {selectedFile && (
                  <p className="admin-dashboard__file-info">
                    Selected: {selectedFile.name} (
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              <div className="admin-dashboard__form-actions">
                <button type="submit" className="admin-dashboard__save-btn">
                  Upload Resume
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowResumeUpload(false);
                    setSelectedFile(null);
                  }}
                  className="admin-dashboard__cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
