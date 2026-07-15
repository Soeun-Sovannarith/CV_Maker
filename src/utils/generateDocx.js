import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  VerticalAlign, ImageRun
} from 'docx';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode';

export const generateDocx = async (cvData, template = 'template2') => {
  let doc;

  if (template === 'template3') {
    doc = await generateTemplate3(cvData);
  } else if (template === 'template2') {
    doc = await generateTemplate2(cvData);
  } else {
    doc = await generateTemplate1(cvData);
  }

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${cvData.personal.name.replace(/\s+/g, '_')}_CV.docx`);
};

// Helper for fetching image as base64
const getImageData = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    return null;
  }
};

// Helper for QR code
const getQRCodeData = async (text) => {
  if (!text || typeof text !== 'string' || text.trim() === '') return null;
  try {
    const url = await QRCode.toDataURL(text, { width: 50, margin: 1 });
    return url.split(',')[1];
  } catch(e) {
    return null;
  }
};

const createSectionHeader = (text, isLeft = false, icon = '') => {
  const children = [];
  if (icon) {
    children.push(new TextRun({ text: `${icon}  `, size: 26, color: isLeft ? '333333' : '323b4c' }));
  }
  children.push(new TextRun({
    text: text.toUpperCase(),
    bold: true,
    size: 26, // 13pt
    color: '333333',
    font: 'Arial'
  }));

  return new Paragraph({
    children,
    border: isLeft ? {
      bottom: { color: '333333', space: 1, style: BorderStyle.SINGLE, size: 12 }
    } : undefined,
    spacing: { after: 250, before: 350 },
  });
};

const generateTemplate2 = async (cvData) => {
  const innerLeftCells = [];
  
  // Profile Photo with White Frame block
  const photoUrl = cvData.personal.photo || `${import.meta.env.BASE_URL}me.JPG`;
  const photoBase64 = await getImageData(photoUrl);

  let photoTable = new Paragraph({ text: '' }); // spacer if no photo
  if (photoBase64) {
    photoTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
              padding: { top: 600, bottom: 400, left: 100, right: 100 }, // Creates the top white box area
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new ImageRun({
                      data: photoBase64,
                      transformation: { width: 150, height: 150 },
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  }
  
  // Contact
  innerLeftCells.push(new Paragraph({ text: '', spacing: { before: 200 } }));
  innerLeftCells.push(createSectionHeader('CONTACT', true));
  if (cvData.personal.phone) innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: `📞 ${cvData.personal.phone}`, size: 18 })], spacing: { after: 100 } }));
  if (cvData.personal.email) innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: `✉️ ${cvData.personal.email}`, size: 18 })], spacing: { after: 100 } }));
  if (cvData.personal.address) innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: `📍 ${cvData.personal.address}`, size: 18 })], spacing: { after: 100 } }));
  if (cvData.personal.website) innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: `🌐 ${cvData.personal.website}`, size: 18 })], spacing: { after: 100 } }));
  if (cvData.personal.linkedin) innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: `🔗 ${cvData.personal.linkedin}`, size: 18 })], spacing: { after: 100 } }));
  if (cvData.personal.github) innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: `💻 ${cvData.personal.github}`, size: 18 })], spacing: { after: 100 } }));

  // Skills
  if (cvData.skills?.length > 0) {
    innerLeftCells.push(createSectionHeader('SKILLS', true));
    cvData.skills.forEach(skill => {
      innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: `• ${skill}`, size: 18 })], spacing: { after: 80 } }));
    });
  }

  // Certifications with QR Codes (Grid)
  if (cvData.certifications?.length > 0) {
    innerLeftCells.push(createSectionHeader('CERTIFICATIONS', true));
    
    const certCells = [];
    for (const cert of cvData.certifications) {
      const name = typeof cert === 'object' ? cert.name : cert;
      const link = typeof cert === 'object' ? cert.link : null;
      
      const children = [];
      if (link) {
         const qrBase64 = await getQRCodeData(link);
         if (qrBase64) {
             children.push(new ImageRun({
                 data: qrBase64,
                 transformation: { width: 45, height: 45 }
             }));
         }
      }
      
      certCells.push(
        new TableCell({
          borders: {
            top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
          },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children, spacing: { after: 40 } }),
            new Paragraph({ children: [new TextRun({ text: name, size: 14, bold: true })], alignment: AlignmentType.CENTER })
          ]
        })
      );
    }

    // Pair into rows of 2
    const certRows = [];
    for (let i = 0; i < certCells.length; i += 2) {
      const rowCells = [certCells[i]];
      if (certCells[i + 1]) rowCells.push(certCells[i + 1]);
      else rowCells.push(new TableCell({ borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }, children: [] }));
      certRows.push(new TableRow({ children: rowCells }));
    }

    innerLeftCells.push(new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: certRows
    }));
    innerLeftCells.push(new Paragraph({ text: '', spacing: { after: 200 } }));
  }

  // Languages
  if (cvData.languages?.length > 0) {
    innerLeftCells.push(createSectionHeader('LANGUAGES', true));
    cvData.languages.forEach(lang => {
      innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: `• ${lang.language} (${lang.proficiency})`, size: 18 })], spacing: { after: 80 } }));
    });
  }

  // References
  if (cvData.references?.length > 0) {
    innerLeftCells.push(createSectionHeader('REFERENCES', true));
    cvData.references.forEach(ref => {
      innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: ref.name, bold: true, size: 18 })], spacing: { after: 40 } }));
      innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: ref.title, size: 16, color: '555555' })], spacing: { after: 40 } }));
      if (ref.phone) innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: `Phone: ${ref.phone}`, size: 16 })], spacing: { after: 40 } }));
      if (ref.email) innerLeftCells.push(new Paragraph({ children: [new TextRun({ text: `Email: ${ref.email}`, size: 16 })], spacing: { after: 100 } }));
    });
  }
  
  // Wrap innerLeftCells in a table for padding
  const innerLeftTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
          top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
          new TableRow({
              children: [
                  new TableCell({
                      padding: { top: 0, bottom: 400, left: 300, right: 200 },
                      children: innerLeftCells,
                  })
              ]
          })
      ]
  });

  // Right Column Content
  const rightCells = [];
  
  // Header Table for Background Color (Name & Title)
  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: "323b4c", type: ShadingType.CLEAR },
            padding: { top: 800, bottom: 800, left: 400, right: 400 },
            children: [
              new Paragraph({
                children: [new TextRun({ text: cvData.personal.name.toUpperCase(), color: 'FFFFFF', size: 54, bold: true, font: 'Arial' })],
                spacing: { after: 150 }
              }),
              new Paragraph({
                children: [new TextRun({ text: cvData.personal.title.toUpperCase(), color: 'E6E6EA', size: 28, font: 'Arial', bold: true })],
              })
            ]
          })
        ]
      })
    ]
  });
  
  rightCells.push(headerTable);
  rightCells.push(new Paragraph({ text: '', spacing: { before: 200 } })); // Spacer

  // Helper for timeline item
  const createTimelineItem = (title, subtitle, date, description) => {
    const table = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
            top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
        },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: { size: 8, type: WidthType.PERCENTAGE },
                        borders: { right: { style: BorderStyle.SINGLE, size: 12, color: '999999' } },
                        children: [new Paragraph({ children: [new TextRun({ text: '●', color: '323b4c', size: 24 })], alignment: AlignmentType.RIGHT })],
                        padding: { right: 100 }
                    }),
                    new TableCell({
                        width: { size: 92, type: WidthType.PERCENTAGE },
                        padding: { left: 250, bottom: 250 },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: title, bold: true, size: 24, color: '111111' }),
                                    new TextRun({ text: `   |   ${date}`, size: 18, color: '666666' }),
                                ],
                                spacing: { after: 80 }
                            }),
                            new Paragraph({ children: [new TextRun({ text: subtitle, italics: true, size: 22, color: '333333' })], spacing: { after: 120 } }),
                            new Paragraph({ children: [new TextRun({ text: description, size: 20, color: '222222' })] })
                        ]
                    })
                ]
            })
        ]
    });
    return table;
  }

  // Profile
  const innerRightCells = [];
  if (cvData.summary) {
    innerRightCells.push(createSectionHeader('PROFILE', false, '👤'));
    innerRightCells.push(new Paragraph({ children: [new TextRun({ text: cvData.summary, size: 20 })], spacing: { after: 300 } }));
  }

  // Work Experience
  if (cvData.experience?.length > 0) {
    innerRightCells.push(createSectionHeader('WORK EXPERIENCE', false, '💼'));
    cvData.experience.forEach(exp => {
      innerRightCells.push(createTimelineItem(exp.company, exp.role, `${exp.start}${exp.end ? ` - ${exp.end}` : ''}`, exp.description));
    });
  }

  // Education
  if (cvData.education?.length > 0) {
    innerRightCells.push(createSectionHeader('EDUCATION', false, '🎓'));
    cvData.education.forEach(edu => {
      innerRightCells.push(createTimelineItem(edu.degree, edu.school, `${edu.start}${edu.end ? ` - ${edu.end}` : ''}`, edu.description || ''));
    });
  }

  // Projects with QR Codes (Grid)
  if (cvData.projects?.length > 0) {
    innerRightCells.push(createSectionHeader('PROJECTS', false, '💻'));
    
    const projCells = [];
    for (const proj of cvData.projects) {
        const link = proj.link;
        let qrImage = null;
        if (link) {
            const qrBase64 = await getQRCodeData(link);
            if (qrBase64) {
                qrImage = new ImageRun({ data: qrBase64, transformation: { width: 60, height: 60 } });
            }
        }
        
        const children = [];
        if (qrImage) children.push(qrImage);
        
        projCells.push(
          new TableCell({
            borders: {
              top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
            },
            padding: { right: 100, bottom: 200 },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children, spacing: { after: 60 } }),
              new Paragraph({ children: [new TextRun({ text: proj.name, bold: true, size: 18 })], alignment: AlignmentType.CENTER })
            ]
          })
        );
    }

    // Pair into rows of 3 for Projects
    const projRows = [];
    for (let i = 0; i < projCells.length; i += 3) {
      const rowCells = [projCells[i]];
      if (projCells[i + 1]) rowCells.push(projCells[i + 1]);
      else rowCells.push(new TableCell({ borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }, children: [] }));
      
      if (projCells[i + 2]) rowCells.push(projCells[i + 2]);
      else rowCells.push(new TableCell({ borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }, children: [] }));
      
      projRows.push(new TableRow({ children: rowCells }));
    }

    innerRightCells.push(new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: projRows
    }));
  }

  // Wrap right content in another table to give padding without affecting the header width
  const innerRightTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
          top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
          new TableRow({
              children: [
                  new TableCell({
                      padding: { top: 200, bottom: 400, left: 300, right: 300 },
                      children: innerRightCells,
                  })
              ]
          })
      ]
  });
  
  rightCells.push(innerRightTable);

  // Main Layout Table
  const layoutTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          // Left Column
          new TableCell({
            width: { size: 35, type: WidthType.PERCENTAGE },
            shading: { fill: "e6e6ea", type: ShadingType.CLEAR },
            padding: { top: 0, bottom: 0, left: 0, right: 0 },
            children: [photoTable, innerLeftTable],
            verticalAlign: VerticalAlign.TOP,
          }),
          // Right Column
          new TableCell({
            width: { size: 65, type: WidthType.PERCENTAGE },
            padding: { top: 0, bottom: 400, left: 400, right: 0 },
            children: rightCells,
            verticalAlign: VerticalAlign.TOP,
          }),
        ]
      })
    ]
  });

  return new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Arial',
            color: '333333',
          },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 0, right: 0, bottom: 0, left: 0 } // No margins to allow full background color bleed
        }
      },
      children: [layoutTable],
    }]
  });
};

const generateTemplate1 = async (cvData) => {
  // Classic 1-column or 2-column layout similar to Template 1
  const children = [];
  
  children.push(
    new Paragraph({
      children: [new TextRun({ text: cvData.personal.name.toUpperCase(), bold: true, size: 52 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100, before: 400 }
    }),
    new Paragraph({
      children: [new TextRun({ text: cvData.personal.title.toUpperCase(), size: 28, color: '666666' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),
    new Paragraph({
      border: { bottom: { color: "CCCCCC", space: 1, size: 6, style: BorderStyle.SINGLE } },
      spacing: { after: 200 }
    })
  );

  const leftCells = [];
  // Contact
  leftCells.push(new Paragraph({ text: 'CONTACT', heading: HeadingLevel.HEADING_3, spacing: { after: 100 } }));
  if (cvData.personal.phone) leftCells.push(new Paragraph({ text: `📞 ${cvData.personal.phone}`, spacing: { after: 50 } }));
  if (cvData.personal.email) leftCells.push(new Paragraph({ text: `✉️ ${cvData.personal.email}`, spacing: { after: 50 } }));
  if (cvData.personal.address) leftCells.push(new Paragraph({ text: `📍 ${cvData.personal.address}`, spacing: { after: 50 } }));
  if (cvData.personal.linkedin) leftCells.push(new Paragraph({ text: `🔗 ${cvData.personal.linkedin}`, spacing: { after: 50 } }));
  if (cvData.personal.github) leftCells.push(new Paragraph({ text: `💻 ${cvData.personal.github}`, spacing: { after: 100 } }));

  // Education
  leftCells.push(new Paragraph({ text: 'EDUCATION', heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } }));
  cvData.education.forEach(edu => {
    leftCells.push(new Paragraph({ text: `${edu.start} - ${edu.end || 'Present'}`, bold: true }));
    leftCells.push(new Paragraph({ text: edu.school, bold: true }));
    leftCells.push(new Paragraph({ text: edu.degree, spacing: { after: 100 } }));
  });

  // Skills
  leftCells.push(new Paragraph({ text: 'SKILLS', heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } }));
  cvData.skills.forEach(skill => leftCells.push(new Paragraph({ text: `• ${skill}`, spacing: { after: 50 } })));

  const rightCells = [];
  // Profile
  rightCells.push(new Paragraph({ text: 'PROFILE SUMMARY', heading: HeadingLevel.HEADING_3, spacing: { after: 100 } }));
  rightCells.push(new Paragraph({ text: cvData.summary, spacing: { after: 200 } }));

  // Experience
  rightCells.push(new Paragraph({ text: 'WORK EXPERIENCE', heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } }));
  cvData.experience.forEach(exp => {
    rightCells.push(new Paragraph({
      children: [
        new TextRun({ text: exp.company, bold: true }),
        new TextRun({ text: `  |  ${exp.start} - ${exp.end || 'Present'}` })
      ],
      spacing: { after: 50 }
    }));
    rightCells.push(new Paragraph({ text: exp.role, italics: true, spacing: { after: 50 } }));
    rightCells.push(new Paragraph({ text: exp.description, spacing: { after: 200 } }));
  });

  const mainTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.SINGLE, color: 'CCCCCC', size: 6 }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: 35, type: WidthType.PERCENTAGE }, padding: { right: 300, left: 300 }, children: leftCells, verticalAlign: VerticalAlign.TOP }),
          new TableCell({ width: { size: 65, type: WidthType.PERCENTAGE }, padding: { left: 300, right: 300 }, children: rightCells, verticalAlign: VerticalAlign.TOP })
        ]
      })
    ]
  });

  children.push(mainTable);

  return new Document({
    sections: [{
      properties: {
        page: { margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 } }
      },
      children: children
    }]
  });
};

const generateTemplate3 = async (cvData) => {
  const children = [];

  // Helper for Section Header
  const createSectionHeader3 = (text) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: text.toUpperCase(),
          bold: true,
          size: 20, // 10pt
          color: '1e293b',
          font: 'Arial'
        })
      ],
      border: {
        bottom: { color: '1e293b', space: 1, style: BorderStyle.SINGLE, size: 12 }
      },
      spacing: { after: 150, before: 300 },
    });
  };

  // Header Area (Navy Blue)
  const headerLeftCells = [];
  const photoUrl = cvData.personal.photo || `${import.meta.env.BASE_URL}me.JPG`;
  const photoBase64 = await getImageData(photoUrl);
  if (photoBase64) {
    headerLeftCells.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          data: photoBase64,
          transformation: { width: 100, height: 100 },
        })
      ]
    }));
  } else {
    headerLeftCells.push(new Paragraph({ text: '' }));
  }

  const headerRightCells = [];
  headerRightCells.push(new Paragraph({
    children: [new TextRun({ text: cvData.personal.name.toUpperCase(), bold: true, size: 48, color: 'FFFFFF' })],
    spacing: { after: 100 }
  }));
  headerRightCells.push(new Paragraph({
    children: [new TextRun({ text: cvData.personal.title.toUpperCase(), size: 24, color: '94a3b8' })],
    spacing: { after: 200 }
  }));

  // Contact Info Row
  const contactText = [
    cvData.personal.email ? `✉️ ${cvData.personal.email}` : '',
    cvData.personal.phone ? `📞 ${cvData.personal.phone}` : '',
    cvData.personal.address ? `📍 ${cvData.personal.address}` : '',
  ].filter(Boolean).join('   |   ');
  
  if (contactText) {
      headerRightCells.push(new Paragraph({
        children: [new TextRun({ text: contactText, size: 18, color: 'cbd5e1' })],
        spacing: { after: 100 }
      }));
  }
  
  const socialText = [
    cvData.personal.website ? `🌐 ${cvData.personal.website}` : '',
    cvData.personal.linkedin ? `🔗 ${cvData.personal.linkedin}` : '',
    cvData.personal.github ? `💻 ${cvData.personal.github}` : ''
  ].filter(Boolean).join('   |   ');

  if (socialText) {
      headerRightCells.push(new Paragraph({
        children: [new TextRun({ text: socialText, size: 18, color: 'cbd5e1' })],
        spacing: { after: 100 }
      }));
  }

  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: "1e293b", type: ShadingType.CLEAR },
            padding: { top: 400, bottom: 400, left: 400, right: 200 },
            verticalAlign: VerticalAlign.CENTER,
            children: headerLeftCells
          }),
          new TableCell({
            width: { size: 75, type: WidthType.PERCENTAGE },
            shading: { fill: "1e293b", type: ShadingType.CLEAR },
            padding: { top: 400, bottom: 400, left: 200, right: 400 },
            verticalAlign: VerticalAlign.CENTER,
            children: headerRightCells
          })
        ]
      })
    ]
  });
  
  children.push(headerTable);

  // Body Layout
  const leftCells = [];
  
  // Skills
  if (cvData.skills?.length > 0) {
    leftCells.push(createSectionHeader3('SKILLS'));
    cvData.skills.forEach(skill => {
      leftCells.push(new Paragraph({ children: [new TextRun({ text: `• ${skill}`, size: 18 })], spacing: { after: 100 } }));
    });
  }

  // Languages
  if (cvData.languages?.length > 0) {
    leftCells.push(createSectionHeader3('LANGUAGES'));
    cvData.languages.forEach(lang => {
      leftCells.push(new Paragraph({
        children: [
          new TextRun({ text: lang.language, bold: true, size: 18 }),
          new TextRun({ text: ` (${lang.proficiency})`, size: 18, color: '64748b' })
        ],
        spacing: { after: 100 }
      }));
    });
  }

  // Certifications
  if (cvData.certifications?.length > 0) {
    leftCells.push(createSectionHeader3('CERTIFICATIONS'));
    for (const cert of cvData.certifications) {
      const name = typeof cert === 'object' ? cert.name : cert;
      const link = typeof cert === 'object' ? cert.link : null;
      const certContent = [];
      
      if (link) {
         const qrBase64 = await getQRCodeData(link);
         if (qrBase64) {
             certContent.push(new ImageRun({ data: qrBase64, transformation: { width: 40, height: 40 } }));
         }
      }
      if (certContent.length > 0) {
          leftCells.push(new Paragraph({ alignment: AlignmentType.LEFT, children: certContent, spacing: { after: 50 } }));
      }
      leftCells.push(new Paragraph({ children: [new TextRun({ text: name, size: 18, bold: true })], spacing: { after: 200 } }));
    }
  }

  const rightCells = [];
  
  // Profile Summary
  if (cvData.summary) {
    rightCells.push(createSectionHeader3('PROFILE SUMMARY'));
    rightCells.push(new Paragraph({
      children: [new TextRun({ text: cvData.summary, size: 18 })],
      spacing: { after: 200 },
      alignment: AlignmentType.JUSTIFIED
    }));
  }

  // Experience
  if (cvData.experience?.length > 0) {
    rightCells.push(createSectionHeader3('WORK EXPERIENCE'));
    cvData.experience.forEach(exp => {
      // Company and Date Row
      const expHeaderTable = new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
              top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
          },
          rows: [
              new TableRow({
                  children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: exp.company, bold: true, size: 20, color: '1e293b' })] })] }),
                      new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `${exp.start} - ${exp.end || 'Present'}`, bold: true, size: 18, color: '64748b' })] })] })
                  ]
              })
          ]
      });
      rightCells.push(expHeaderTable);
      rightCells.push(new Paragraph({ children: [new TextRun({ text: exp.role, italics: true, size: 18, color: '475569' })], spacing: { before: 50, after: 100 } }));
      rightCells.push(new Paragraph({ children: [new TextRun({ text: exp.description, size: 18 })], spacing: { after: 200 } }));
    });
  }

  // Education
  if (cvData.education?.length > 0) {
    rightCells.push(createSectionHeader3('EDUCATION'));
    cvData.education.forEach(edu => {
      const eduHeaderTable = new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
              top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
          },
          rows: [
              new TableRow({
                  children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: edu.school, bold: true, size: 20, color: '1e293b' })] })] }),
                      new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `${edu.start} - ${edu.end || 'Present'}`, bold: true, size: 18, color: '64748b' })] })] })
                  ]
              })
          ]
      });
      rightCells.push(eduHeaderTable);
      rightCells.push(new Paragraph({ children: [new TextRun({ text: edu.degree, size: 18 })], spacing: { before: 50, after: 50 } }));
      if (edu.description) rightCells.push(new Paragraph({ children: [new TextRun({ text: edu.description, size: 18, color: '475569' })], spacing: { after: 150 } }));
      else rightCells.push(new Paragraph({ text: '', spacing: { after: 150 } }));
    });
  }

  // Projects
  if (cvData.projects?.length > 0) {
    rightCells.push(createSectionHeader3('PROJECTS'));
    for (const proj of cvData.projects) {
        const link = proj.link;
        let qrImage = null;
        if (link) {
            const qrBase64 = await getQRCodeData(link);
            if (qrBase64) {
                qrImage = new ImageRun({ data: qrBase64, transformation: { width: 50, height: 50 } });
            }
        }
        
        const projTable = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
                top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
                insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            width: { size: 15, type: WidthType.PERCENTAGE },
                            children: qrImage ? [new Paragraph({ children: [qrImage] })] : [new Paragraph({ text: '' })]
                        }),
                        new TableCell({
                            width: { size: 85, type: WidthType.PERCENTAGE },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: proj.name, bold: true, size: 20, color: '1e293b' })], spacing: { after: 50 } }),
                                new Paragraph({ children: [new TextRun({ text: proj.description || '', size: 18, color: '475569' })] })
                            ]
                        })
                    ]
                })
            ]
        });
        rightCells.push(projTable);
        rightCells.push(new Paragraph({ text: '', spacing: { after: 150 } }));
    }
  }

  // References
  if (cvData.references?.length > 0) {
    rightCells.push(createSectionHeader3('REFERENCES'));
    cvData.references.forEach(ref => {
      rightCells.push(new Paragraph({ children: [new TextRun({ text: ref.name, bold: true, size: 18, color: '1e293b' })], spacing: { after: 50 } }));
      rightCells.push(new Paragraph({ children: [new TextRun({ text: ref.title, size: 18, color: '64748b' })], spacing: { after: 50 } }));
      if (ref.phone) rightCells.push(new Paragraph({ children: [new TextRun({ text: `📞 ${ref.phone}`, size: 16 })], spacing: { after: 50 } }));
      if (ref.email) rightCells.push(new Paragraph({ children: [new TextRun({ text: `✉️ ${ref.email}`, size: 16 })], spacing: { after: 150 } }));
    });
  }

  const bodyTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: 35, type: WidthType.PERCENTAGE }, shading: { fill: "f8fafc", type: ShadingType.CLEAR }, padding: { top: 300, bottom: 300, left: 400, right: 300 }, children: leftCells, verticalAlign: VerticalAlign.TOP }),
          new TableCell({ width: { size: 65, type: WidthType.PERCENTAGE }, shading: { fill: "FFFFFF", type: ShadingType.CLEAR }, padding: { top: 300, bottom: 300, left: 300, right: 400 }, children: rightCells, verticalAlign: VerticalAlign.TOP })
        ]
      })
    ]
  });
  
  children.push(bodyTable);

  return new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Arial',
            color: '334155',
          },
        },
      },
    },
    sections: [{
      properties: {
        page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } }
      },
      children: children
    }]
  });
};
