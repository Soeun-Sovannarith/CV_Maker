import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import CVPreview2 from './components/CVPreview2';
import CVPreview3 from './components/CVPreview3';
import { Download } from 'lucide-react';
import { supabase } from './utils/supabase';
import { generateDocx } from './utils/generateDocx';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('todos').select();

      if (todos) {
        setTodos(todos);
        console.log('Fetched todos:', todos);
      }
    }

    getTodos();
  }, []);

  const [selectedTemplate, setSelectedTemplate] = useState('template2');
  const [cvData, setCvData] = useState({
    personal: {
      name: 'SOEUN SOVANNARITH',
      title: 'BACKEND DEVELOPER - JAVA',
      phone: '+855 16992144',
      email: 'soeunsovannarith64@gmail.com',
      address: 'Prek Eng District, Chbar Ampov Commune, Phnom Penh City',
      website: 'https://portfolio.rith.codes',
      linkedin: 'linkedin.com/in/soeun-sovannarith-116858291',
      github: 'github.com/Soeun-Sovannarith'
    },
    summary: 'Backend Developer specializing in Java and the Spring framework, with proven experience developing robust RESTful for internal and external usage. Strong foundation in Object-Oriented Programming (OOP) and comprehensive knowledge of SQL, RDBMS, and database design. Adept at cross-functional collaboration to solve complex problems, maintain backend applications, and assist in creating system designs and functional specifications for new projects. Skilled in supporting seamless system integrations with third-party partners.',
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
        start: 'Feb 2026',
        end: 'Jul 2026',
        description: 'Basic Course : February 02nd - July 09th, 2026, Mon-Fri, 7.5 hours per day, 810 hours\n- JAVA : J2SE (Basic Java and OOP concepts), J2EE (Maven and MVC pattern)\n- WEB : HTML, CSS, JavaScript, CSS Flexbox, Tailwind CSS, JSON, Next.js,\n- SPRING : Spring Boot, MyBatis Data Access, Spring RESTful Web Service, Spring Security, JSON Web Token, Thymeleaf Engine\n- Database : Data Modeling, PostgreSQL, SQL(Basic SQL)\n- Additional Courses : Linux, Docker, Version Control (GitHub) and UI/UX, AI Coding tool (Cursor, Claude Code, Codex, etc.)'
      },
      {
        id: 2,
        school: 'ABOVE AND BEYOND',
        degree: 'Prompt Engineering',
        start: 'Oct 2025',
        end: 'Nov 2025',
        description: 'Gained practical knowledge in designing, optimizing, and structuring effective prompts for large language models (LLMs). Learned techniques to improve AI output quality, handle complex tasks, and integrate prompt engineering into real-world applications.\nSkills: Prompt Engineering, Prompting techniques, AI Agents, Generative AI Tools, Promoting best practices'
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
    certifications: [
      { id: 1, name: 'AWS Certified Developer', link: 'https://aws.amazon.com' },
      { id: 2, name: 'Prompt Engineering Course - ABOVE AND BEYOND (PE2025011)', link: '' }
    ],
    projects: [
      { id: 1, name: 'Portfolio Website', link: 'https://portfolio.rith.codes' }
    ],
    skills: [
      'Backend Development: Java, Spring Framework (Spring Boot), Object-Oriented Programming (OOP), System Design',
      'API & Integration: RESTful API Development, Third-Party System Integration, Middleware Solutions',
      'Database & Architecture: SQL, PostgreSQL, RDBMS, Database Design, Performance Optimization',
      'Software Engineering: Cross-Functional Team Collaboration, Bug Fixing & Maintenance, SDLC Methodologies, Git',
      'App Security & Infrastructure: Spring Security, JWT/OAuth2, Linux OS Administration, Docker, CI/CD'
    ],
    languages: [
      { language: 'Khmer', proficiency: 'Native' },
      { language: 'English', proficiency: 'Fluent' }
    ],
    references: [
      {
        id: 4,
        name: 'POLEN SOK',
        title: 'Student Affairs Manager, KSHRD Center',
        phone: '',
        email: 'polen.hrd@gmail.com'
      },
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
      }
    ]
  });

  const printRef = useRef();

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleDownloadDocx = async () => {
    try {
      await generateDocx(cvData, selectedTemplate);
    } catch (error) {
      console.error('Error generating DOCX:', error);
      alert('Failed to generate DOCX file.');
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
      if (['experience', 'education', 'languages', 'references', 'projects', 'certifications'].includes(section)) {
        const newItems = [...prev[section]];
        if (field) {
          const oldItem = newItems[index];
          const itemObject = typeof oldItem === 'string' ? { id: Date.now(), name: oldItem, link: '' } : oldItem;
          newItems[index] = { ...itemObject, [field]: value };
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
      if (section === 'projects') {
        return {
          ...prev,
          projects: [...prev.projects, { id: Date.now(), name: 'New Project', link: 'https://example.com' }]
        };
      }
      if (section === 'skills') {
        return { ...prev, skills: [...prev.skills, 'New Skill'] };
      }
      if (section === 'certifications') {
        return { ...prev, certifications: [...prev.certifications, { id: Date.now(), name: 'New Certification', link: 'https://example.com' }] };
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
            <option value="template3">Template 3 (Executive / Word-Friendly)</option>
          </select>
          <button className="download-btn" onClick={handleDownloadPdf}>
            <Download size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Download PDF
          </button>
          <button className="download-btn" onClick={handleDownloadDocx}>
            <Download size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Download DOCX
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
          ) : selectedTemplate === 'template2' ? (
            <CVPreview2 ref={printRef} data={cvData} />
          ) : (
            <CVPreview3 ref={printRef} cvData={cvData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
