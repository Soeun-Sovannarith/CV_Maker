import React, { forwardRef } from 'react';
import { Phone, Mail, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const CVPreview = forwardRef(({ data }, ref) => {
    const { personal, summary, experience, education, skills, languages } = data;

    const SectionHeader = ({ title, letter }) => (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', position: 'relative' }}>
            <div style={{
                position: 'absolute',
                left: '0',
                top: '-5px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#e6e6e6',
                zIndex: 0
            }}></div>
            <h3 style={{
                position: 'relative',
                zIndex: 1,
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                margin: 0,
                paddingLeft: '10px'
            }}>
                {title}
            </h3>
        </div>
    );

    return (
        <div ref={ref} className="cv-preview" style={{
            width: '100%',
            minHeight: '100%',
            padding: '30px 40px',
            fontFamily: "'Inter', sans-serif",
            color: '#444'
        }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '15px' }}>
                <h1 style={{
                    fontSize: '42px',
                    fontWeight: '300',
                    textTransform: 'uppercase',
                    letterSpacing: '5px',
                    margin: '0 0 10px 0',
                    color: '#333'
                }}>
                    {personal.name}
                </h1>
                <h2 style={{
                    fontSize: '14px',
                    fontWeight: '300',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    margin: 0,
                    color: '#666'
                }}>
                    {personal.title}
                </h2>
            </header>

            <hr style={{ border: 'none', borderTop: '1px solid #ccc', marginBottom: '15px' }} />

            <div style={{ display: 'flex', gap: '40px' }}>
                {/* Left Column */}
                <div style={{ width: '35%', borderRight: '1px solid #ccc', paddingRight: '20px' }}>

                    {/* Contact */}
                    <div style={{ marginBottom: '15px' }}>
                        <SectionHeader title="CONTACT" />
                        <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
                            {personal.phone && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Phone size={12} fill="#555" strokeWidth={0} />
                                    <span>{personal.phone}</span>
                                </div>
                            )}
                            {personal.email && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Mail size={12} fill="#555" strokeWidth={0} />
                                    <span>{personal.email}</span>
                                </div>
                            )}
                            {personal.address && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <MapPin size={12} fill="#555" strokeWidth={0} />
                                    <span>{personal.address}</span>
                                </div>
                            )}
                            {personal.website && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Globe size={12} fill="#555" strokeWidth={0} style={{ flexShrink: 0 }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>{personal.website}</span>
                                </div>
                            )}
                            {personal.linkedin && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Linkedin size={12} fill="#555" strokeWidth={0} style={{ flexShrink: 0 }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>{personal.linkedin}</span>
                                </div>
                            )}
                            {personal.github && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Github size={12} fill="#555" strokeWidth={0} style={{ flexShrink: 0 }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>{personal.github}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Education */}
                    <div style={{ marginBottom: '15px' }}>
                        <SectionHeader title="EDUCATION" />
                        {education.map((edu) => (
                            <div key={edu.id} style={{ marginBottom: '10px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{edu.start}{edu.end ? ` - ${edu.end}` : ''}</div>
                                <div style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '2px' }}>{edu.school}</div>
                                <div style={{ fontSize: '12px', color: '#555' }}>• {edu.degree}</div>
                                {edu.description && <div style={{ fontSize: '12px', color: '#555' }}>• {edu.description}</div>}
                            </div>
                        ))}
                    </div>

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <div style={{ marginBottom: '15px' }}>
                            <SectionHeader title="PROJECTS" />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between' }}>
                                {data.projects.map((proj) => (
                                    <div key={proj.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '76px' }}>
                                        <div style={{ padding: '3px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '4px' }}>
                                            <QRCodeSVG value={proj.link || ' '} size={68} />
                                        </div>
                                        <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#333', textAlign: 'center', lineHeight: '1.2' }}>
                                            {proj.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications (Added dynamically from data if it exists) */}
                    {data.certifications && data.certifications.length > 0 && (
                        <div style={{ marginBottom: '15px' }}>
                            <SectionHeader title="CERTIFICATIONS" />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {data.certifications.map((cert, index) => {
                                    const isObject = typeof cert === 'object' && cert !== null;
                                    const link = isObject ? cert.link : '';
                                    const name = isObject ? cert.name : cert;
                                    const id = isObject ? cert.id : index;
                                    return (
                                        <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                                            <div style={{ padding: '3px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '4px' }}>
                                                <QRCodeSVG value={link || ' '} size={52} />
                                            </div>
                                            <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#333', textAlign: 'center', lineHeight: '1.2' }}>
                                                {name}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    <div style={{ marginBottom: '15px' }}>
                        <SectionHeader title="SKILLS" />
                        <ul style={{ paddingLeft: '15px', margin: 0 }}>
                            {skills.map((skill, index) => (
                                <li key={index} style={{ fontSize: '12px', lineHeight: '1.6', marginBottom: '4px' }}>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Languages */}
                    <div>
                        <SectionHeader title="LANGUAGES" />
                        <ul style={{ paddingLeft: '15px', margin: 0 }}>
                            {languages.map((lang, index) => (
                                <li key={index} style={{ fontSize: '12px', lineHeight: '1.6', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: 600 }}>{lang.language}:</span> {lang.proficiency}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Right Column */}
                <div style={{ width: '65%' }}>

                    {/* Profile Summary */}
                    <div style={{ marginBottom: '20px' }}>
                        <SectionHeader title="PROFILE SUMMARY" />
                        <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#555', whiteSpace: 'pre-line' }}>
                            {summary}
                        </p>
                    </div>

                    {/* Work Experience */}
                    <div style={{ marginBottom: '20px' }}>
                        <SectionHeader title="WORK EXPERIENCE" />
                        {experience.map((exp) => (
                            <div key={exp.id} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                    <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: 0 }}>{exp.company}</h4>
                                    <span style={{ fontSize: '12px', color: '#666' }}>{exp.start}{exp.end ? ` - ${exp.end}` : ''}</span>
                                </div>
                                <div style={{ fontSize: '12px', fontStyle: 'italic', marginBottom: '8px', color: '#444' }}>{exp.role}</div>
                                <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#555', whiteSpace: 'pre-line' }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* References */}
                    {data.references && data.references.length > 0 && (
                        <div>
                            <SectionHeader title="REFERENCES" />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                {data.references.map((ref) => (
                                    <div key={ref.id}>
                                        <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>{ref.name}</div>
                                        <div style={{ fontSize: '12px', color: '#444', marginBottom: '2px' }}>{ref.title}</div>
                                        <div style={{ fontSize: '12px', color: '#555' }}>{ref.phone}</div>
                                        <div style={{ fontSize: '12px', color: '#555' }}>{ref.email}</div>
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

export default CVPreview;
