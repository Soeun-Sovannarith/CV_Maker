import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import CVPreview2 from './components/CVPreview2';
import { Download } from 'lucide-react';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('template2');
  const [cvData, setCvData] = useState({
    personal: {
      name: 'SOEUN SOVANNARITH',
      title: 'SYSTEM INTEGRATION OFFICER',
      phone: '+855 16992144',
      email: 'soeunsovannarith64@gmail.com',
      address: 'Prek Eng District, Chbar Ampov Commune, Phnom Penh City',
      website: 'https://portfolio.rith.codes',
      linkedin: 'linkedin.com/in/soeun-sovannarith-116858291',
      github: 'github.com/Soeun-Sovannarith'
    },
    summary: 'System Integration Officer specializing in Java, Spring Boot, and enterprise middleware, with proven experience designing and developing secure RESTful and SOAP web services. Deeply familiar with SDLC methodologies, OOP principles, and rigorous banking IT policies. Skilled in implementing robust security frameworks (JWT/OAuth2) and administering Linux/SQL Server infrastructure. Highly adaptable and ready to master ESB platforms like Fiorano to ensure seamless, risk-mitigated cross-system integrations.',
    experience: [
      {
        id: 1,
        company: 'KSHRD Center - SnapPOS Full-Stack POS Platform',
        role: 'Full-Stack Developer (Group Final Project)',
        start: 'Jan 2026',
        end: 'Jul 2026',
        description: '• Developed and integrated applications based on agreed design and architecture using Java (Spring Boot) and OOP principles, implementing role-based access control with Spring Security across POS endpoints.\n• Designed and documented comprehensive RESTful APIs, facilitating seamless integration with third-party systems like the Bakong KHQR gateway via reverse proxies and middleware.\n• Administered deployment environments on Linux servers, configuring Nginx, Docker, and dual CI/CD pipelines (GitHub Actions) while strictly adhering to SDLC methodologies.\n• Tested patches and conducted root-cause analysis on production APIs to resolve vulnerabilities and ensure high system integrity in alignment with risk policies.'
      },
      {
        id: 2,
        company: 'Self-Employed',
        role: 'Freelance Backend Developer (Independent Projects)',
        start: '2023',
        end: 'PRESENT',
        description: '• Analyzed, designed, and developed robust RESTful and SOAP web services using Java and Spring Boot, strictly following SDLC practices and IT risk control guidelines.\n• Integrated diverse backend systems and administered Linux environments, providing comprehensive support for seamless system operations.\n• Implemented robust security frameworks (JWT/OAuth2) and patched misconfigurations, actively identifying and mitigating risks in day-to-day operations.\n• Managed source code using Git and collaborated closely with external software providers to ensure API integrations aligned with the overall program architecture.'
      }
    ],
    education: [
      {
        id: 1,
        school: 'KSHRD CENTER',
        degree: 'Full-Stack Development',
        start: 'Jan 2026',
        end: 'Jul 2026',
        description: ''
      },
      {
        id: 2,
        school: 'ABOVE AND BEYOND',
        degree: 'Prompt Engineering',
        start: 'Dec 2025',
        end: '',
        description: ''
      },
      {
        id: 3,
        school: 'THE UNIVERSITY OF CAMBODIA',
        degree: 'Bachelor of Information Technology',
        start: '2022',
        end: 'PRESENT',
        description: 'GPA: 3.85'
      },
      {
        id: 4,
        school: 'INSTITUTE OF FOREIGN LANGUAGES',
        degree: 'Bachelor of Education (TEFL)',
        start: '2022',
        end: 'PRESENT',
        description: 'GPA: 3.07'
      }
    ],
    certifications: [],
    skills: [
      'Middleware & Integration: Web Services (SOAP/REST), API Documentation, ESB Platforms (Fiorano, WS02 Familiarity)',
      'Software Development: Java, OOP, Spring Boot,SDLC Methodologies, Git/SVN',
      'App Security & Risk: Spring Security, JWT/OAuth2, Vulnerability Mitigation, IT Policy Compliance',
      'Infrastructure & Admin: Linux/Sun Solaris OS Administration, SQL Server/DBs, Docker, CI/CD'
    ],
    languages: [
      { language: 'Khmer', proficiency: 'Native' },
      { language: 'English', proficiency: 'Fluent' }
    ],
    references: [
      {
        id: 1,
        name: 'VICHHAIY SEREY',
        title: 'DevSecOps Team Lead, ABA BANK',
        phone: '+855 15370170',
        email: 'vichhaiyserey@gmail.com'
      },
      {
        id: 2,
        name: 'YOULAY HANG',
        title: 'Senior Project Manager, FTB BANK',
        phone: '+855 968650464',
        email: 'Youlayhang.com'
      },
      {
        id: 3,
        name: 'PHANNARITH DUY',
        title: 'Human Resource Director and Admin, Aqua Lagoon Real Estate',
        phone: '+855 61858838',
        email: 'hayashimotomori@gmail.com'
      }
    ]
  });

  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 4, // Increased scale for much sharper text
        useCORS: true,
        logging: false,
      });

      // Use PNG instead of JPEG to prevent text compression artifacts
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();

      // Calculate height to maintain aspect ratio
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleChange = (section, field, value, index = null) => {
    setCvData(prev => {
      if (section === 'personal') {
        return { ...prev, personal: { ...prev.personal, [field]: value } };
      }
      if (section === 'summary') {
        return { ...prev, summary: value };
      }
      if (section === 'skills') {
        const newSkills = [...prev.skills];
        newSkills[index] = value;
        return { ...prev, skills: newSkills };
      }
      if (section === 'certifications') {
        const newCerts = [...prev.certifications];
        newCerts[index] = value;
        return { ...prev, certifications: newCerts };
      }
      if (['experience', 'education', 'languages', 'references'].includes(section)) {
        const newItems = [...prev[section]];
        if (field) {
          newItems[index] = { ...newItems[index], [field]: value };
        }
        return { ...prev, [section]: newItems };
      }
      return prev;
    });
  };

  const handleAddItem = (section) => {
    setCvData(prev => {
      if (section === 'experience') {
        return {
          ...prev,
          experience: [...prev.experience, { id: Date.now(), company: 'New Company', role: 'Position', start: '2024', end: 'Present', description: 'Description...' }]
        };
      }
      if (section === 'education') {
        return {
          ...prev,
          education: [...prev.education, { id: Date.now(), school: 'University', degree: 'Degree', start: '2020', end: '2024', description: '' }]
        };
      }
      if (section === 'skills') {
        return { ...prev, skills: [...prev.skills, 'New Skill'] };
      }
      if (section === 'certifications') {
        return { ...prev, certifications: [...prev.certifications, 'New Certification'] };
      }
      if (section === 'languages') {
        return { ...prev, languages: [...prev.languages, { language: 'Language', proficiency: 'Level' }] };
      }
      if (section === 'references') {
        return { ...prev, references: [...prev.references, { id: Date.now(), name: 'Name', title: 'Title', phone: 'Phone', email: 'Email' }] };
      }
      return prev;
    });
  };

  const handleRemoveItem = (section, index) => {
    setCvData(prev => {
      if (section === 'skills') {
        return { ...prev, skills: prev.skills.filter((_, i) => i !== index) };
      }
      if (section === 'certifications') {
        return { ...prev, certifications: prev.certifications.filter((_, i) => i !== index) };
      }
      return { ...prev, [section]: prev[section].filter((_, i) => i !== index) };
    });
  };

  return (
    <div className="app-container">
      <div className="editor-section">
        <div className="toolbar" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="template1">Template 1 (Classic)</option>
            <option value="template2">Template 2 (Modern Timeline)</option>
          </select>
          <button className="download-btn" onClick={handleDownloadPdf}>
            <Download size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Download PDF
          </button>
        </div>
        <CVForm
          data={cvData}
          onChange={handleChange}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />
      </div>
      <div className="preview-section">
        <div className="preview-container">
          {selectedTemplate === 'template1' ? (
            <CVPreview ref={printRef} data={cvData} />
          ) : (
            <CVPreview2 ref={printRef} data={cvData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
