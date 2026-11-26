/* ==========================================================
   YOUR CONTENT LIVES HERE. Edit this file to change the site.
   Everything is plain text between quotes.
   ========================================================== */

const SITE = {
  name: "Yul Kim",
  // Where visitor notes get sent (they open in the visitor's email app).
  // Put your email between the quotes, e.g. "you@gmail.com"
  email: "",
  github: "https://github.com/hiyuly1128",
  linkedin: "" // paste your LinkedIn URL here, or leave empty to hide it
};

/* ----------------------------------------------------------
   BOOKS. Each one opens full screen when clicked.
   id must match the data-book name in index.html.
   color = book color, ink = text color on that color.
   Leave a link empty ("") to hide it.
   ---------------------------------------------------------- */
const BOOKS = {
  about: {
    title: "About",
    subtitle: "Who I am and where I'm from",
    color: "#4a43ff",
    ink: "#ffffff",
    sections: [
      {
        heading: "Hi, I'm Yul",
        text:
          "I'm a sophomore at UW–Madison studying Information Science, with certificates in History and Consulting. I grew up in the Greater Chicago Area and spent my high school years living in Seoul, so I move between English and Korean every day and I'm working toward professional proficiency in Mandarin."
      },
      {
        heading: "What I'm into",
        text:
          "I'm drawn to marketing, storytelling, and the way people use technology. I like projects where I get to translate between people, ideas, and cultures."
      }
    ]
  },

  experience: {
    title: "Experience",
    subtitle: "Jobs, internships, and leadership",
    color: "#ff7f0a",
    ink: "#ffffff",
    sections: [
      {
        heading: "Now",
        items: [
          {
            title: "Lead Tutor, Badger Volunteers (Educate)",
            meta: "Madison, WI · Fall 2026 to present",
            text: "Teaching English as a lead tutor."
          },
          {
            title: "Marketing Intern, Badger Challenge",
            meta: "via Wisconsin Marketing Organization · Fall 2026 to present",
            text:
              "Campus outreach to young adults for UW's cancer research fundraising event, plus merch and planning for the spring marathon and April banquet."
          }
        ]
      },
      {
        heading: "Before",
        items: [
          {
            title: "Marketing Analyst, LZ Management (Java Den Café)",
            meta: "via Wisconsin Marketing Organization · Spring 2026",
            text: ""
          },
          {
            title: "Student Barista, Four Lakes Market",
            meta: "Madison, WI · Aug 2025 to Mar 2026",
            text: ""
          },
          {
            title: "AI Marketing & Content Strategy Intern, Double ME / The CAVE",
            meta: "Seoul · Summer 2024",
            text: ""
          },
          {
            title: "President of Student Government",
            meta: "Seoul · 2024 to 2025",
            text:
              "Secured $10,000+ in funding to preserve student programs. Received the Seoul City Teachers' Association Board President's Award (2025)."
          },
          {
            title: "Tour Guide & Translator, CIEE South Korea Study Abroad",
            meta: "Seoul · Summer 2022",
            text: "Translated between local businesses and students."
          }
        ]
      }
    ]
  },

  projects: {
    title: "Projects",
    subtitle: "Things I've built and started",
    color: "#e5a95c",
    ink: "#3a2a14",
    sections: [
      {
        heading: "Selected work",
        items: [
          {
            title: "ToDo Amor",
            meta: "Founder · Volunteer initiative",
            text: "A volunteer initiative I founded.",
            link: "",
            linkText: ""
          },
          {
            title: "VR Art Exhibitions",
            meta: "AR/VR startup · Seoul",
            text: "Worked on VR art exhibition projects for an AR/VR startup in Seoul.",
            link: ""
          },
          {
            title: "This library",
            meta: "Personal website · GitHub Pages",
            text: "The site you're standing in. Built as a personal library you can wander through.",
            link: "https://github.com/hiyuly1128",
            linkText: "See it on GitHub"
          }
        ]
      }
    ]
  },

  writing: {
    title: "Writing",
    subtitle: "Papers, essays, and ideas",
    color: "#e35454",
    ink: "#ffffff",
    sections: [
      {
        heading: "Shelved for now",
        text:
          "Papers and essays will be added here as I finish them. Leave me a note on the open book below if there's something you'd like to read."
      }
    ]
  },

  skills: {
    title: "Skills",
    subtitle: "Languages and tools",
    color: "#f5479b",
    ink: "#ffffff",
    sections: [
      {
        heading: "Languages",
        items: [
          { title: "English", meta: "Native", text: "" },
          { title: "Korean", meta: "Native", text: "" },
          { title: "Mandarin", meta: "HSK 3 · working toward professional proficiency", text: "" }
        ]
      },
      {
        heading: "Tools",
        text: "Adobe InDesign, Illustrator, Photoshop, and Canva."
      }
    ]
  },

  contact: {
    title: "Contact",
    subtitle: "Say hello",
    color: "#04783c",
    ink: "#ffffff",
    sections: [
      {
        heading: "Find me",
        // "email", "github" and "linkedin" are pulled from SITE above.
        links: ["email", "github", "linkedin"]
      }
    ]
  }
};

/* ----------------------------------------------------------
   PUBLISHED NOTES. When someone sends you a note and you
   want to show it, copy the pattern below into this list.
   ---------------------------------------------------------- */
const NOTES = [
  // { name: "Alex", text: "Love the library idea!", date: "2026-11-26" },
];
