"use client"
import { useState, useRef } from 'react';
import { Download } from 'lucide-react';

export default function ResumeBuilder() {
  const resumeRef = useRef(null);

  const [formData, setFormData] = useState({
    personalInfo: {
      name: 'John Doe',
      location: 'San Francisco, CA',
      phone: '+1-555-123-4567',
      email: 'johndoe@example.com',
      linkedin: 'https://www.linkedin.com/in/johndoe',
      dob: '01/01/1990',
      languages: 'English, Spanish',
    },
    objective: 'Dedicated software engineer with expertise in full-stack development and cloud technologies. Eager to leverage technical skills and problem-solving abilities to create innovative solutions that enhance user experience and drive business growth. Committed to continuous learning and staying current with emerging technologies.',
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science, Computer Science',
        date: 'August 2016 - May 2020',
        cgpa: '3.8',
      }
    ],
    skills: {
      languages: 'JavaScript, TypeScript, Python, Java, SQL, HTML, CSS',
      technologies: 'React, Node.js, Express, MongoDB, PostgreSQL',
      tools: 'Git, Docker, AWS, VS Code, Figma, Jira',
      frameworks: 'Next.js, Redux, Jest, Agile, Scrum',
      softSkills: 'Communication, Teamwork, Problem-Solving, Time Management',
    },
    experience: [
      {
        company: 'Tech Solutions Inc.',
        position: 'Software Engineer',
        duration: 'June 2020 - Present',
        responsibilities: [
          {
            title: 'Full Stack Development',
            points: [
              'Developed responsive web applications using React and Node.js, resulting in a 40% improvement in user engagement.',
              'Implemented RESTful APIs following best practices, enhancing system performance by 25%.',
              'Optimized database queries and implemented caching solutions, reducing load times by 35%.',
              'Collaborated in cross-functional teams to deliver features on time in two-week sprint cycles.'
            ]
          },
          {
            title: 'DevOps',
            points: [
              'Established CI/CD pipelines using GitHub Actions, reducing deployment time by 50%.',
              'Containerized applications using Docker for consistent development and production environments.',
              'Implemented automated testing, achieving 85% code coverage and reducing bug reports by 30%.',
              'Managed cloud infrastructure on AWS, ensuring 99.9% uptime for critical services.'
            ]
          }
        ]
      }
    ],
    internships: [
      {
        company: 'Innovative Startups LLC',
        duration: 'May 2019 - August 2019',
        description: 'Contributed to the development of a mobile application using React Native. Implemented key features and fixed bugs, resulting in a successful product launch with 10,000+ downloads in the first month.'
      },
      {
        company: 'Data Analytics Corp',
        duration: 'January 2019 - April 2019',
        description: 'Assisted in data analysis projects using Python and SQL. Created visualization dashboards to help clients understand complex datasets and make data-driven decisions.'
      }
    ],
    certifications: [
      'AWS Certified Developer - Associate',
      'MongoDB Certified Developer',
      'Certified Scrum Master',
      'Google Cloud Professional Developer'
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        technology: 'React, Node.js, MongoDB',
        date: 'January 2023',
        description: [
          'Built a full-stack e-commerce platform with user authentication, product catalog, and payment processing.',
          'Implemented responsive design principles ensuring optimal user experience across all devices.',
          'Integrated with Stripe API for secure payment processing and order management.',
          'Deployed the application to AWS, setting up load balancing and auto-scaling for high availability.'
        ]
      },
      {
        name: 'Community Event Planner',
        technology: 'Next.js, PostgreSQL, Tailwind CSS',
        date: 'October 2022',
        link: 'https://event-planner-demo.example.com',
        description: [
          'Developed a community event planning application allowing users to create, join and manage local events.',
          'Implemented real-time notifications using WebSockets, enhancing user engagement by 45%.',
          'Created an admin dashboard with analytics to track event participation and user growth.',
          'Optimized for SEO, resulting in a 60% increase in organic traffic.'
        ]
      }
    ],
    achievements: [
      'Received the "Innovator of the Year" award for developing an internal tool that automated reporting processes.',
      'Published a technical article on medium.com that has been viewed over 50,000 times and featured in weekly digests.',
      'Contributed to open-source projects with 10+ accepted pull requests to popular repositories.'
    ]
  });

  const ensureString = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const handlePrint = () => {
    document.body.classList.add('print-resume');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('print-resume');
    }, 500);
  };


  const handleNestedChange = (section, field, value) => {
    // Convert any non-string values to strings to avoid React child errors
    const safeValue = typeof value === 'object' ? ensureString(value) : value;

    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: safeValue
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const newArray = [...formData[section]];
    newArray[index] = {
      ...newArray[index],
      [field]: value
    };

    setFormData(prevData => ({
      ...prevData,
      [section]: newArray
    }));
  };

  const handleArrayItemChange = (section, index, subfield, subindex, value) => {
    const newArray = [...formData[section]];

    if (!newArray[index][subfield]) {
      newArray[index][subfield] = [];
    }

    const newSubArray = [...newArray[index][subfield]];
    newSubArray[subindex] = value;

    newArray[index] = {
      ...newArray[index],
      [subfield]: newSubArray
    };

    setFormData(prevData => ({
      ...prevData,
      [section]: newArray
    }));
  };

  const handleResponsibilityPointChange = (expIndex, respIndex, pointIndex, value) => {
    const newExperience = [...formData.experience];

    if (!newExperience[expIndex].responsibilities) {
      newExperience[expIndex].responsibilities = [];
    }

    if (!newExperience[expIndex].responsibilities[respIndex]) {
      newExperience[expIndex].responsibilities[respIndex] = { points: [] };
    }

    if (!newExperience[expIndex].responsibilities[respIndex].points) {
      newExperience[expIndex].responsibilities[respIndex].points = [];
    }

    newExperience[expIndex].responsibilities[respIndex].points[pointIndex] = value;

    setFormData({
      ...formData,
      experience: newExperience
    });
  };

  const addItem = (section) => {
    let newItem;

    switch (section) {
      case 'education':
        newItem = { institution: '', degree: '', date: '', cgpa: '' };
        break;
      case 'experience':
        newItem = {
          company: '',
          position: '',
          duration: '',
          responsibilities: [
            { title: '', points: [''] }
          ]
        };
        break;
      case 'internships':
        newItem = { company: '', duration: '', description: '' };
        break;
      case 'certifications':
        setFormData({
          ...formData,
          certifications: [...formData.certifications, '']
        });
        return;
      case 'projects':
        newItem = { name: '', technology: '', date: '', link: '', description: [''] };
        break;
      case 'achievements':
        setFormData({
          ...formData,
          achievements: [...formData.achievements, '']
        });
        return;
      default:
        return;
    }

    setFormData({
      ...formData,
      [section]: [...formData[section], newItem]
    });
  };

  const addResponsibilityPoint = (expIndex, respIndex) => {
    const newExperience = [...formData.experience];
    newExperience[expIndex].responsibilities[respIndex].points.push('');

    setFormData({
      ...formData,
      experience: newExperience
    });
  };

  const addProjectPoint = (projectIndex) => {
    const newProjects = [...formData.projects];
    newProjects[projectIndex].description.push('');

    setFormData({
      ...formData,
      projects: newProjects
    });
  };

  const removeItem = (section, index) => {
    const newArray = [...formData[section]];
    newArray.splice(index, 1);

    setFormData({
      ...formData,
      [section]: newArray
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Form Section */}
        <div className="w-full md:w-2/5 bg-white shadow rounded-lg p-6 h-full overflow-y-auto">
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.personalInfo.name}
                    onChange={(e) => handleNestedChange('personalInfo', 'name', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={formData.personalInfo.location}
                    onChange={(e) => handleNestedChange('personalInfo', 'location', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleNestedChange('personalInfo', 'phone', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleNestedChange('personalInfo', 'email', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                  <input
                    type="text"
                    value={formData.personalInfo.linkedin}
                    onChange={(e) => handleNestedChange('personalInfo', 'linkedin', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="text"
                    value={formData.personalInfo.dob}
                    onChange={(e) => handleNestedChange('personalInfo', 'dob', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Languages</label>
                  <input
                    type="text"
                    value={formData.personalInfo.languages}
                    onChange={(e) => handleNestedChange('personalInfo', 'languages', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Objective */}
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-4">Objective</h2>
              <textarea
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md h-32"
              />
            </div>

            {/* Education */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Education</h2>
                <button
                  onClick={() => addItem('education')}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Add Education
                </button>
              </div>

              {formData.education.map((edu, index) => (
                <div key={index} className="mb-6 p-4 border rounded-md relative">
                  <button
                    onClick={() => removeItem('education', index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="text"
                        value={edu.date}
                        onChange={(e) => handleArrayChange('education', index, 'date', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CGPA/Percentage</label>
                      <input
                        type="text"
                        value={edu.cgpa}
                        onChange={(e) => handleArrayChange('education', index, 'cgpa', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold mb-4">Skills</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Languages</label>
                  <input
                    type="text"
                    value={formData.skills.languages}
                    onChange={(e) => handleNestedChange('skills', 'languages', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Technologies</label>
                  <input
                    type="text"
                    value={formData.skills.technologies}
                    onChange={(e) => handleNestedChange('skills', 'technologies', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tools</label>
                  <input
                    type="text"
                    value={formData.skills.tools}
                    onChange={(e) => handleNestedChange('skills', 'tools', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Frameworks & Methodologies</label>
                  <input
                    type="text"
                    value={formData.skills.frameworks}
                    onChange={(e) => handleNestedChange('skills', 'frameworks', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Soft Skills</label>
                  <input
                    type="text"
                    value={formData.skills.softSkills}
                    onChange={(e) => handleNestedChange('skills', 'softSkills', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Professional Experience</h2>
                <button
                  onClick={() => addItem('experience')}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Add Experience
                </button>
              </div>

              {formData.experience.map((exp, expIndex) => (
                <div key={expIndex} className="mb-6 p-4 border rounded-md relative">
                  <button
                    onClick={() => removeItem('experience', expIndex)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleArrayChange('experience', expIndex, 'company', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleArrayChange('experience', expIndex, 'position', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => handleArrayChange('experience', expIndex, 'duration', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                  </div>

                  <h3 className="text-md font-medium mb-2">Responsibilities</h3>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="mb-4 p-3 border rounded-md bg-gray-50">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={resp.title}
                          onChange={(e) => {
                            const newExp = [...formData.experience];
                            newExp[expIndex].responsibilities[respIndex].title = e.target.value;
                            setFormData({ ...formData, experience: newExp });
                          }}
                          className="mt-1 p-2 w-full border rounded-md"
                        />
                      </div>

                      <h4 className="text-sm font-medium mt-3 mb-2">Points</h4>
                      {resp.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="mb-2">
                          <textarea
                            value={point}
                            onChange={(e) => {
                              const newExp = [...formData.experience];
                              newExp[expIndex].responsibilities[respIndex].points[pointIndex] = e.target.value;
                              setFormData({ ...formData, experience: newExp });
                            }}
                            className="mt-1 p-2 w-full border rounded-md"
                            rows="2"
                          />
                        </div>
                      ))}

                      <button
                        onClick={() => addResponsibilityPoint(expIndex, respIndex)}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-xs"
                      >
                        Add Point
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Internships */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Internships</h2>
                <button
                  onClick={() => addItem('internships')}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Add Internship
                </button>
              </div>

              {formData.internships.map((intern, index) => (
                <div key={index} className="mb-6 p-4 border rounded-md relative">
                  <button
                    onClick={() => removeItem('internships', index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <input
                        type="text"
                        value={intern.company}
                        onChange={(e) => handleArrayChange('internships', index, 'company', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input
                        type="text"
                        value={intern.duration}
                        onChange={(e) => handleArrayChange('internships', index, 'duration', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={intern.description}
                        onChange={(e) => handleArrayChange('internships', index, 'description', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Certifications</h2>
                <button
                  onClick={() => addItem('certifications')}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Add Certification
                </button>
              </div>

              {formData.certifications.map((cert, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) => {
                      const newCerts = [...formData.certifications];
                      newCerts[index] = e.target.value;
                      setFormData({ ...formData, certifications: newCerts });
                    }}
                    className="p-2 flex-grow border rounded-md"
                  />
                  <button
                    onClick={() => removeItem('certifications', index)}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* After Experience section and before Projects section */}
            <div className="page-break"></div>

            {/* Projects */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Projects</h2>
                <button
                  onClick={() => addItem('projects')}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Add Project
                </button>
              </div>

              {formData.projects.map((proj, projIndex) => (
                <div key={projIndex} className="mb-6 p-4 border rounded-md relative">
                  <button
                    onClick={() => removeItem('projects', projIndex)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => handleArrayChange('projects', projIndex, 'name', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Technology</label>
                      <input
                        type="text"
                        value={proj.technology}
                        onChange={(e) => handleArrayChange('projects', projIndex, 'technology', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="text"
                        value={proj.date}
                        onChange={(e) => handleArrayChange('projects', projIndex, 'date', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Link (optional)</label>
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => handleArrayChange('projects', projIndex, 'link', e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                  </div>

                  <h3 className="text-md font-medium mb-2">Description Points</h3>
                  {proj.description.map((point, pointIndex) => (
                    <div key={pointIndex} className="mb-2">
                      <textarea
                        value={point}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[projIndex].description[pointIndex] = e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="mt-1 p-2 w-full border rounded-md"
                        rows="2"
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => addProjectPoint(projIndex)}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-xs"
                  >
                    Add Description Point
                  </button>

                  {proj.link && (
                    <p className="text-sm mb-1">
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {proj.link}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Achievements</h2>
                <button
                  onClick={() => addItem('achievements')}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Add Achievement
                </button>
              </div>

              {formData.achievements.map((achievement, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <textarea
                    value={achievement}
                    onChange={(e) => {
                      const newAchievements = [...formData.achievements];
                      newAchievements[index] = e.target.value;
                      setFormData({ ...formData, achievements: newAchievements });
                    }}
                    className="p-2 flex-grow border rounded-md"
                    rows="2"
                  />
                  <button
                    onClick={() => removeItem('achievements', index)}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full md:w-3/5">
          <div
            ref={resumeRef}
            id="resumeContainer"
            className="bg-white shadow rounded-lg p-8"
            style={{
              width: "800px",
              margin: "0 auto",
              backgroundColor: "white"
            }}
          >
            {/* Resume Preview */}
            <div className="mb-6 border-b pb-4">
              <h1 className="text-2xl font-bold text-center">{formData.personalInfo.name}</h1>
              <div className="text-center text-gray-600 mt-2">
                <p>
                  {ensureString(formData.personalInfo.location)} | {ensureString(formData.personalInfo.phone)} |
                  <a
                    href={`mailto:${ensureString(formData.personalInfo.email)}`}
                    className="email-link"
                  >
                    {ensureString(formData.personalInfo.email)}
                  </a>
                </p>
                <p>
                  <a
                    href={ensureString(formData.personalInfo.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ensureString(formData.personalInfo.linkedin)}
                  </a>
                </p>
              </div>
            </div>

            {/* Objective */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Objective</h2>
              <p className="text-sm">{formData.objective}</p>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Education</h2>
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <span className="text-sm">{edu.date}</span>
                  </div>
                  <p>{edu.degree}</p>
                  <p className="text-sm">CGPA: {edu.cgpa}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Skills</h2>
              <ul className="text-sm">
                <li className="mb-1"><span className="font-semibold">Languages:</span> {formData.skills.languages}</li>
                <li className="mb-1"><span className="font-semibold">Technologies:</span> {formData.skills.technologies}</li>
                <li className="mb-1"><span className="font-semibold">Tools:</span> {formData.skills.tools}</li>
                <li className="mb-1"><span className="font-semibold">Frameworks & Methodologies:</span> {formData.skills.frameworks}</li>
                <li className="mb-1"><span className="font-semibold">Soft Skills:</span> {formData.skills.softSkills}</li>
              </ul>
            </div>

            {/* Professional Experience */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Professional Experience</h2>
              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{exp.company}</h3>
                    <span className="text-sm">{exp.duration}</span>
                  </div>
                  <p className="italic mb-2">{exp.position}</p>

                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="mb-3">
                      <p className="font-medium text-sm">{resp.title}</p>
                      <ul className="list-disc ml-5 text-sm">
                        {resp.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="mb-1">{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Internships */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Internships</h2>
              {formData.internships.map((intern, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{intern.company}</h3>
                    <span className="text-sm">{intern.duration}</span>
                  </div>
                  <p className="text-sm">{intern.description}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Certifications</h2>
              <ul className="list-disc ml-5 text-sm">
                {formData.certifications.map((cert, index) => (
                  <li key={index} className="mb-1">{cert}</li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Projects</h2>
              {formData.projects.map((proj, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{proj.name} | {proj.technology}</h3>
                    <span className="text-sm">{proj.date}</span>
                  </div>
                  {proj.link && (
                    <p className="text-sm mb-1">
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {proj.link}
                      </a>
                    </p>
                  )}
                  <ul className="list-disc ml-5 text-sm">
                    {proj.description.map((desc, descIndex) => (
                      <li key={descIndex} className="mb-1">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Personal Achievements</h2>
              <ul className="list-disc ml-5 text-sm">
                {formData.achievements.map((achievement, index) => (
                  <li key={index} className="mb-1">{achievement}</li>
                ))}
              </ul>
            </div>

            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Personal Information</h2>
              <ul className="text-sm">
                <li className="mb-1">
                  <span className="font-semibold">Date of Birth:</span> {ensureString(formData.personalInfo.dob)}
                </li>
                <li className="mb-1">
                  <span className="font-semibold">Languages Known:</span> {ensureString(formData.personalInfo.languages)}
                </li>
              </ul>
            </div>

            {/* Add this right before the "Personal Information" section */}
            <div className="page-break"></div>
          </div>
        </div>
      </main>
    </div>
  );
}