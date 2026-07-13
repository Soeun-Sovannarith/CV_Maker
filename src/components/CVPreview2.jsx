import React, { forwardRef } from 'react';
import { Phone, Mail, MapPin, Globe, Linkedin, Github, User, Briefcase, GraduationCap, Code } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const CVPreview2 = forwardRef(({ data }, ref) => {
    const { personal, summary, experience, education, skills, languages, references, certifications } = data;

    const LeftSectionHeader = ({ title }) => (
        <h3 style={{
            fontSize: '13px',
            fontWeight: 'bold',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            borderBottom: '2px solid #333',
            paddingBottom: '6px',
            marginBottom: '10px',
            color: '#333'
        }}>
            {title}
        </h3>
    );

    const RightSection = ({ title, icon: Icon, children }) => (
        <div style={{ display: 'flex', marginBottom: '0px' }}>
            {/* Timeline Column */}
            <div style={{ width: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '15px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#323b4c', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                    <Icon size={16} color="white" />
                </div>
                <div style={{ flex: 1, width: '1px', backgroundColor: '#999', marginTop: '-5px', marginBottom: '-5px', zIndex: 1 }}></div>
            </div>
            {/* Content Column */}
            <div style={{ flex: 1, paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', letterSpacing: '2px', marginTop: '4px', marginBottom: '8px', color: '#333', textTransform: 'uppercase' }}>
                    {title}
                </h3>
                {children}
            </div>
        </div>
    );

    const TimelineItem = ({ title, subtitle, date, children }) => (
        <div style={{ position: 'relative', marginBottom: '10px' }}>
            {/* Small dot on the timeline */}
            <div style={{ position: 'absolute', left: '-35.5px', top: '5px', width: '7px', height: '7px', borderRadius: '50%', border: '1.5px solid #666', backgroundColor: 'white', zIndex: 3 }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: 0, color: '#333' }}>{title}</h4>
                <span style={{ fontSize: '11px', color: '#555' }}>{date}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#555', marginBottom: '3px' }}>{subtitle}</div>
            <div style={{ fontSize: '11px', lineHeight: '1.45', color: '#444', whiteSpace: 'pre-line' }}>{children}</div>
        </div>
    );

    return (
        <div ref={ref} className="cv-preview2" style={{
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            fontFamily: "'Inter', sans-serif",
            color: '#333',
            backgroundColor: 'white'
        }}>
            {/* Left Column */}
            <div style={{ width: '35%', backgroundColor: '#e6e6ea', display: 'flex', flexDirection: 'column' }}>
                {/* Top White Area for Photo */}
                <div style={{ height: '140px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <div style={{
                        width: '180px',
                        position: 'absolute',
                        top: '20px',
                        left: 0,
                        right: 0,
                        margin: '0 auto',
                        border: '4px solid white',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        backgroundColor: '#e6e6ea'
                    }}>
                        <img
                            src={`${import.meta.env.BASE_URL}me.JPG`}
                            alt="Profile"
                            style={{
                                width: '100%',
                                display: 'block'
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150";
                            }}
                        />
                    </div>
                </div>

                <div style={{ padding: '125px 25px 15px 25px' }}>
                    {/* Contact */}
                    <div style={{ marginBottom: '12px' }}>
                        <LeftSectionHeader title="CONTACT" />
                        <div style={{ fontSize: '11px', lineHeight: '2' }}>
                            {personal.phone && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                                    <Phone size={11} fill="#333" strokeWidth={0} />
                                    <span>{personal.phone}</span>
                                </div>
                            )}
                            {personal.email && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <Mail size={12} fill="#333" strokeWidth={0} />
                                    <span>{personal.email}</span>
                                </div>
                            )}
                            {personal.address && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <MapPin size={12} fill="#333" strokeWidth={0} />
                                    <span>{personal.address}</span>
                                </div>
                            )}
                            {personal.website && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <Globe size={12} fill="#333" strokeWidth={0} />
                                    <span>{personal.website}</span>
                                </div>
                            )}
                            {personal.linkedin && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <Linkedin size={12} fill="#333" strokeWidth={0} />
                                    <span>{personal.linkedin}</span>
                                </div>
                            )}
                            {personal.github && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <Github size={12} fill="#333" strokeWidth={0} />
                                    <span>{personal.github}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    <div style={{ marginBottom: '15px' }}>
                        <LeftSectionHeader title="SKILLS" />
                        <ul style={{ paddingLeft: '15px', margin: 0 }}>
                            {skills.map((skill, index) => (
                                <li key={index} style={{ fontSize: '11px', lineHeight: '1.6', marginBottom: '6px' }}>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <div style={{ marginBottom: '15px' }}>
                            <LeftSectionHeader title="CERTIFICATIONS" />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {certifications.map((cert, index) => {
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

                    {/* Languages */}
                    <div style={{ marginBottom: '15px' }}>
                        <LeftSectionHeader title="LANGUAGES" />
                        <ul style={{ paddingLeft: '15px', margin: 0 }}>
                            {languages.map((lang, index) => (
                                <li key={index} style={{ fontSize: '11px', lineHeight: '1.6', marginBottom: '6px' }}>
                                    {lang.language} ({lang.proficiency})
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* References */}
                    {references && references.length > 0 && (
                        <div>
                            <LeftSectionHeader title="REFERENCES" />
                            {references.map((ref) => (
                                <div key={ref.id} style={{ marginBottom: '12px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{ref.name}</div>
                                    <div style={{ fontSize: '11px', color: '#555', marginBottom: '2px' }}>{ref.title}</div>
                                    <div style={{ fontSize: '11px', color: '#333' }}>Phone: {ref.phone}</div>
                                    <div style={{ fontSize: '11px', color: '#333' }}>Email: {ref.email}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column */}
            <div style={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{ height: '140px', backgroundColor: '#323b4c', padding: '0 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', letterSpacing: '1px', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
                        {personal.name}
                    </h1>
                    <h2 style={{ color: '#e6e6ea', fontSize: '16px', fontWeight: '300', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' }}>
                        {personal.title}
                    </h2>
                </div>

                {/* Content */}
                <div style={{ padding: '15px 35px', flex: 1, backgroundColor: 'white' }}>

                    {/* Profile */}
                    <RightSection title="PROFILE" icon={User}>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-35.5px', top: '5px', width: '7px', height: '7px', borderRadius: '50%', border: '1.5px solid #666', backgroundColor: 'white', zIndex: 3 }}></div>
                            <p style={{ fontSize: '11px', lineHeight: '1.45', color: '#444', whiteSpace: 'pre-line', margin: 0 }}>
                                {summary}
                            </p>
                        </div>
                    </RightSection>

                    {/* Work Experience */}
                    <RightSection title="WORK EXPERIENCE" icon={Briefcase}>
                        {experience.map((exp) => (
                            <TimelineItem
                                key={exp.id}
                                title={exp.company}
                                subtitle={exp.role}
                                date={`${exp.start}${exp.end ? ` - ${exp.end}` : ''}`}
                            >
                                {exp.description}
                            </TimelineItem>
                        ))}
                    </RightSection>

                    {/* Education */}
                    <RightSection title="EDUCATION" icon={GraduationCap}>
                        {education.map((edu) => (
                            <TimelineItem
                                key={edu.id}
                                title={edu.degree}
                                subtitle={edu.school}
                                date={`${edu.start}${edu.end ? ` - ${edu.end}` : ''}`}
                            >
                                {edu.description}
                            </TimelineItem>
                        ))}
                    </RightSection>

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <RightSection title="PROJECTS" icon={Code}>
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
                        </RightSection>
                    )}

                </div>
            </div>
        </div>
    );
});

export default CVPreview2;
