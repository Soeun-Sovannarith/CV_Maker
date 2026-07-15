import React, { forwardRef } from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const CVPreview3 = forwardRef(({ cvData }, ref) => {
    const { personal, summary, experience, education, skills, languages, certifications, projects, references } = cvData;

    const SectionHeader = ({ title }) => (
        <div style={{
            borderBottom: '2px solid #1e293b',
            paddingBottom: '4px',
            marginBottom: '16px',
            marginTop: '24px'
        }}>
            <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1e293b',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                margin: 0
            }}>
                {title}
            </h3>
        </div>
    );

    return (
        <div ref={ref} style={{
            width: '210mm',
            minHeight: '297mm',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
            fontFamily: '"Arial", sans-serif',
            color: '#334155',
            boxSizing: 'border-box'
        }}>
            {/* Header Area */}
            <div style={{
                backgroundColor: '#1e293b',
                padding: '40px 40px',
                display: 'flex',
                alignItems: 'center',
                color: 'white'
            }}>
                {personal.photo && (
                    <div style={{ marginRight: '32px' }}>
                        <img 
                            src={personal.photo || `${import.meta.env.BASE_URL}me.JPG`} 
                            alt="Profile" 
                            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white' }} 
                        />
                    </div>
                )}
                <div style={{ flex: 1 }}>
                    <h1 style={{ margin: '0 0 8px 0', fontSize: '36px', fontWeight: 'bold', letterSpacing: '1px' }}>
                        {personal.name.toUpperCase()}
                    </h1>
                    <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'normal', color: '#94a3b8' }}>
                        {personal.title.toUpperCase()}
                    </h2>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#cbd5e1' }}>
                        {personal.email && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Mail size={14} /> {personal.email}
                            </span>
                        )}
                        {personal.phone && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Phone size={14} /> {personal.phone}
                            </span>
                        )}
                        {personal.address && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <MapPin size={14} /> {personal.address}
                            </span>
                        )}
                        {personal.website && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Globe size={14} /> {personal.website}
                            </span>
                        )}
                        {personal.linkedin && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Linkedin size={14} /> {personal.linkedin}
                            </span>
                        )}
                        {personal.github && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Github size={14} /> {personal.github}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Body */}
            <div style={{ display: 'flex' }}>
                {/* Left Column */}
                <div style={{ width: '35%', padding: '24px 24px 24px 40px', backgroundColor: '#f8fafc', minHeight: 'calc(297mm - 200px)' }}>
                    
                    {skills?.length > 0 && (
                        <div>
                            <SectionHeader title="Skills" />
                            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                                {skills.map((skill, index) => (
                                    <li key={index} style={{ marginBottom: '8px' }}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {languages?.length > 0 && (
                        <div>
                            <SectionHeader title="Languages" />
                            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                                {languages.map((lang, index) => (
                                    <div key={index} style={{ marginBottom: '8px' }}>
                                        <strong>{lang.language}</strong> <span style={{ color: '#64748b' }}>({lang.proficiency})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {certifications?.length > 0 && (
                        <div>
                            <SectionHeader title="Certifications" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {certifications.map((cert, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        {cert.link && (
                                            <QRCodeSVG value={cert.link} size={48} />
                                        )}
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{cert.name || cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div style={{ width: '65%', padding: '24px 40px 24px 32px' }}>
                    
                    {summary && (
                        <div>
                            <SectionHeader title="Profile Summary" />
                            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>
                                {summary}
                            </p>
                        </div>
                    )}

                    {experience?.length > 0 && (
                        <div>
                            <SectionHeader title="Work Experience" />
                            {experience.map((exp, index) => (
                                <div key={index} style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>{exp.company}</h4>
                                        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>
                                            {exp.start} - {exp.end || 'Present'}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '15px', fontStyle: 'italic', color: '#475569', marginBottom: '8px' }}>{exp.role}</div>
                                    <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {education?.length > 0 && (
                        <div>
                            <SectionHeader title="Education" />
                            {education.map((edu, index) => (
                                <div key={index} style={{ marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>{edu.school}</h4>
                                        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>
                                            {edu.start} - {edu.end || 'Present'}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '14px', margin: 0 }}>{edu.degree}</div>
                                    {edu.description && (
                                        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '4px 0 0 0', color: '#475569' }}>
                                            {edu.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {projects?.length > 0 && (
                        <div>
                            <SectionHeader title="Projects" />
                            {projects.map((proj, index) => (
                                <div key={index} style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    {proj.link && (
                                        <div>
                                            <QRCodeSVG value={proj.link} size={64} />
                                        </div>
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>{proj.name}</h4>
                                        {proj.description && <p style={{ fontSize: '14px', margin: 0, color: '#475569' }}>{proj.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {references?.length > 0 && (
                        <div>
                            <SectionHeader title="References" />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {references.map((ref, index) => (
                                    <div key={index}>
                                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1e293b' }}>{ref.name}</div>
                                        <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>{ref.title}</div>
                                        {ref.phone && <div style={{ fontSize: '13px' }}>📞 {ref.phone}</div>}
                                        {ref.email && <div style={{ fontSize: '13px' }}>✉️ {ref.email}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
});

export default CVPreview3;
