import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const CVForm = ({ data, onChange, onAddItem, onRemoveItem }) => {

    const handleChange = (section, field, value, index = null) => {
        onChange(section, field, value, index);
    };

    return (
        <div className="cv-form">
            <h2 className="title" style={{ fontSize: '1.5rem', textAlign: 'left', marginTop: 0 }}>Editor</h2>

            {/* Personal Details */}
            <section className="form-group">
                <h3 className="section-title">Personal Details</h3>
                <label>Full Name</label>
                <input
                    type="text"
                    value={data.personal.name}
                    onChange={(e) => handleChange('personal', 'name', e.target.value)}
                    placeholder="e.g. Olivia Wilson"
                />
                <label>Job Title</label>
                <input
                    type="text"
                    value={data.personal.title}
                    onChange={(e) => handleChange('personal', 'title', e.target.value)}
                    placeholder="e.g. Marketing Manager"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                        <label>Phone</label>
                        <input
                            type="text"
                            value={data.personal.phone}
                            onChange={(e) => handleChange('personal', 'phone', e.target.value)}
                            placeholder="+1 234 567 890"
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            value={data.personal.email}
                            onChange={(e) => handleChange('personal', 'email', e.target.value)}
                            placeholder="hello@reallygreatsite.com"
                        />
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                        <label>Address</label>
                        <input
                            type="text"
                            value={data.personal.address}
                            onChange={(e) => handleChange('personal', 'address', e.target.value)}
                            placeholder="123 Anywhere St., Any City"
                        />
                    </div>
                    <div>
                        <label>Website</label>
                        <input
                            type="text"
                            value={data.personal.website}
                            onChange={(e) => handleChange('personal', 'website', e.target.value)}
                            placeholder="www.reallygreatsite.com"
                        />
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    <div>
                        <label>LinkedIn</label>
                        <input
                            type="text"
                            value={data.personal.linkedin || ''}
                            onChange={(e) => handleChange('personal', 'linkedin', e.target.value)}
                            placeholder="LinkedIn URL"
                        />
                    </div>
                    <div>
                        <label>GitHub</label>
                        <input
                            type="text"
                            value={data.personal.github || ''}
                            onChange={(e) => handleChange('personal', 'github', e.target.value)}
                            placeholder="GitHub URL"
                        />
                    </div>
                </div>

            </section>

            {/* Profile Summary */}
            <section className="form-group">
                <h3 className="section-title">Profile Summary</h3>
                <textarea
                    rows="4"
                    value={data.summary}
                    onChange={(e) => handleChange('summary', null, e.target.value)}
                    placeholder="Brief summary of your professional background..."
                />
            </section>

            {/* Work Experience */}
            <section className="form-group">
                <h3 className="section-title">Work Experience</h3>
                {data.experience.map((exp, index) => (
                    <div key={exp.id} className="item-group">
                        <label>Company</label>
                        <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleChange('experience', 'company', e.target.value, index)}
                        />
                        <label>Position</label>
                        <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleChange('experience', 'role', e.target.value, index)}
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <label>Start Year</label>
                                <input
                                    type="text"
                                    value={exp.start}
                                    onChange={(e) => handleChange('experience', 'start', e.target.value, index)}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>End Year</label>
                                <input
                                    type="text"
                                    value={exp.end}
                                    onChange={(e) => handleChange('experience', 'end', e.target.value, index)}
                                />
                            </div>
                        </div>
                        <label>Description</label>
                        <textarea
                            rows="3"
                            value={exp.description}
                            onChange={(e) => handleChange('experience', 'description', e.target.value, index)}
                            placeholder="List achievements..."
                        />
                        <button className="remove-btn" onClick={() => onRemoveItem('experience', index)}>
                            <Trash2 size={12} style={{ display: 'inline', marginRight: '4px' }} /> Remove
                        </button>
                    </div>
                ))}
                <button className="add-btn" onClick={() => onAddItem('experience')}>
                    <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} /> Add Experience
                </button>
            </section>

            {/* Education */}
            <section className="form-group">
                <h3 className="section-title">Education</h3>
                {data.education.map((edu, index) => (
                    <div key={edu.id} className="item-group">
                        <label>School / University</label>
                        <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => handleChange('education', 'school', e.target.value, index)}
                        />
                        <label>Degree</label>
                        <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <label>Start Year</label>
                                <input
                                    type="text"
                                    value={edu.start}
                                    onChange={(e) => handleChange('education', 'start', e.target.value, index)}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>End Year</label>
                                <input
                                    type="text"
                                    value={edu.end}
                                    onChange={(e) => handleChange('education', 'end', e.target.value, index)}
                                />
                            </div>
                        </div>
                        <label>Description / GPA</label>
                        <input
                            type="text"
                            value={edu.description}
                            onChange={(e) => handleChange('education', 'description', e.target.value, index)}
                        />
                        <button className="remove-btn" onClick={() => onRemoveItem('education', index)}>
                            <Trash2 size={12} style={{ display: 'inline', marginRight: '4px' }} /> Remove
                        </button>
                    </div>
                ))}
                <button className="add-btn" onClick={() => onAddItem('education')}>
                    <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} /> Add Education
                </button>
            </section>

            {/* Skills */}
            <section className="form-group">
                <h3 className="section-title">Skills</h3>
                {data.skills.map((skill, index) => (
                    <div key={index} style={{ display: 'flex', marginBottom: '8px' }}>
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleChange('skills', null, e.target.value, index)}
                            style={{ marginBottom: 0 }}
                        />
                        <button className="remove-btn" onClick={() => onRemoveItem('skills', index)}>X</button>
                    </div>
                ))}
                <button className="add-btn" onClick={() => onAddItem('skills')}>
                    <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} /> Add Skill
                </button>
            </section>

            {/* Certifications */}
            {data.certifications && (
                <section className="form-group">
                    <h3 className="section-title">Certifications</h3>
                    {data.certifications.map((cert, index) => (
                        <div key={index} style={{ display: 'flex', marginBottom: '8px' }}>
                            <input
                                type="text"
                                value={cert}
                                onChange={(e) => handleChange('certifications', null, e.target.value, index)}
                                style={{ marginBottom: 0 }}
                            />
                            <button className="remove-btn" onClick={() => onRemoveItem('certifications', index)}>X</button>
                        </div>
                    ))}
                    <button className="add-btn" onClick={() => onAddItem('certifications')}>
                        <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} /> Add Certification
                    </button>
                </section>
            )}

            {/* Languages */}
            <section className="form-group">
                <h3 className="section-title">Languages</h3>
                {data.languages.map((lang, index) => (
                    <div key={index} className="item-group">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input
                                type="text"
                                placeholder="Language"
                                value={lang.language}
                                onChange={(e) => handleChange('languages', 'language', e.target.value, index)}
                            />
                            <input
                                type="text"
                                placeholder="Proficiency"
                                value={lang.proficiency}
                                onChange={(e) => handleChange('languages', 'proficiency', e.target.value, index)}
                            />
                        </div>
                        <button className="remove-btn" onClick={() => onRemoveItem('languages', index)} style={{ marginLeft: 0 }}>
                            <Trash2 size={12} style={{ display: 'inline', marginRight: '4px' }} /> Remove
                        </button>
                    </div>
                ))}
                <button className="add-btn" onClick={() => onAddItem('languages')}>
                    <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} /> Add Language
                </button>
            </section>

            {/* References */}
            {data.references && (
                <section className="form-group">
                    <h3 className="section-title">References</h3>
                    {data.references.map((ref, index) => (
                        <div key={ref.id} className="item-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={ref.name}
                                onChange={(e) => handleChange('references', 'name', e.target.value, index)}
                            />
                            <label>Title</label>
                            <input
                                type="text"
                                value={ref.title}
                                onChange={(e) => handleChange('references', 'title', e.target.value, index)}
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div>
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        value={ref.phone}
                                        onChange={(e) => handleChange('references', 'phone', e.target.value, index)}
                                    />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        value={ref.email}
                                        onChange={(e) => handleChange('references', 'email', e.target.value, index)}
                                    />
                                </div>
                            </div>
                            <button className="remove-btn" onClick={() => onRemoveItem('references', index)}>
                                <Trash2 size={12} style={{ display: 'inline', marginRight: '4px' }} /> Remove
                            </button>
                        </div>
                    ))}
                    <button className="add-btn" onClick={() => onAddItem('references')}>
                        <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} /> Add Reference
                    </button>
                </section>
            )}
        </div>
    );
};

export default CVForm;
