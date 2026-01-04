import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import { Download } from 'lucide-react';

function App() {
  const [cvData, setCvData] = useState({
    personal: {
      name: 'OLIVIA WILSON',
      title: 'MARKETING MANAGER',
      phone: '+123-456-7890',
      email: 'hello@reallygreatsite.com',
      address: '123 Anywhere St., Any City',
      website: 'www.reallygreatsite.com'
    },
    summary: 'Experienced and results-driven Marketing Manager with a proven track record in developing and executing successful marketing strategies. I am seeking a challenging role where I can contribute my skills in strategic planning, team leadership, and creative problem-solving to achieve business objectives.',
    experience: [
      {
        id: 1,
        company: 'Borcelle Studio',
        role: 'Marketing Manager & Specialist',
        start: '2030',
        end: 'PRESENT',
        description: '• Led the development and implementation of comprehensive marketing strategies that resulted in a 20% increase in brand visibility.\n• Successfully launched and managed multiple cross-channel campaigns, including digital marketing, social media.'
      },
      {
        id: 2,
        company: 'Fauget Studio',
        role: 'Marketing Manager & Specialist',
        start: '2025',
        end: '2029',
        description: '• Conducted market research to identify emerging trends and consumer preferences, providing valuable insights for product development.\n• Oversaw the creation of engaging content for various platforms, collaborating with internal teams.'
      },
      {
        id: 3,
        company: 'Studio Shodwe',
        role: 'Marketing Manager & Specialist',
        start: '2024',
        end: '2025',
        description: '• Developed and executed targeted marketing campaigns, resulting in a 25% increase in lead generation.\n• Implemented SEO strategies that improved website traffic by 30%.'
      }
    ],
    education: [
      {
        id: 1,
        school: 'BORCELLE UNIVERSITY',
        degree: 'Master of Business Management',
        start: '2029',
        end: '2030',
        description: ''
      },
      {
        id: 2,
        school: 'BORCELLE UNIVERSITY',
        degree: 'Bachelor of Business Management',
        start: '2025',
        end: '2029',
        description: 'GPA: 3.8 / 4.0'
      }
    ],
    skills: [
      'Project Management',
      'Public Relations',
      'Teamwork',
      'Time Management',
      'Leadership',
      'Effective Communication',
      'Critical Thinking'
    ],
    languages: [
      { language: 'English', proficiency: 'Fluent' },
      { language: 'French', proficiency: 'Fluent' },
      { language: 'German', proficiency: 'Basics' },
      { language: 'Spanish', proficiency: 'Intermediate' }
    ]
  });

  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

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
      if (['experience', 'education', 'languages'].includes(section)) {
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
      if (section === 'languages') {
        return { ...prev, languages: [...prev.languages, { language: 'Language', proficiency: 'Level' }] };
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
        <div className="toolbar">
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
          <CVPreview ref={printRef} data={cvData} />
        </div>
      </div>
    </div>
  );
}

export default App;
