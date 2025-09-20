# ElevatePrep: AI-Powered Interview Preparation

ElevatePrep is an innovative AI-powered platform designed to help users master their interview skills through practice sessions, real-time feedback, and personalized coaching. Whether you're preparing for a technical role, product management, or data science, ElevatePrep provides the tools and insights you need to succeed.

## Features

- **AI-Powered Practice:** Engage with intelligent AI interviewers that adapt to your skill level and provide realistic interview scenarios.
- **Real-Time Feedback:** Receive instant, detailed feedback on your responses, communication skills, and technical knowledge.
- **Actionable Insights:** Gain clear, actionable insights and recommendations to continuously improve your performance.
- **User Authentication:** Secure user registration and login powered by Firebase.
- **Interview Tracking:** Keep track of your past interviews and review your progress over time.
- **Dynamic Interview Cards:** Visually appealing cards displaying interview details like role, type, tech stack, and creation date.
- **Responsive UI:** A modern and responsive user interface built with Next.js, React, and Tailwind CSS.
- **FAQ Section:** A dedicated section to answer common user questions.

## Technologies Used

ElevatePrep is built with a robust and modern technology stack:

-   **Frontend:**
    -   [Next.js 15](https://nextjs.org/) (React framework)
    -   [React 19](https://react.dev/)
    -   [Tailwind CSS](https://tailwindcss.com/) (for styling)
    -   [Shadcn UI](https://ui.shadcn.com/) (for UI components)
    -   [Mona Sans](https://github.com/mona-sans) (font)
-   **Backend:**
    -   Next.js API Routes
    -   [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) (for backend authentication and database interactions)
-   **Authentication:**
    -   [Firebase](https://firebase.google.com/) (for user authentication)
-   **AI Integration:**
    -   [@ai-sdk/google](https://ai.google.dev/): SDK for integrating with Google's AI models.
    -   [@vapi-ai/web](https://www.vapi.ai/): Web SDK for Vapi.ai, likely used for real-time voice AI interactions during interviews.
-   **State Management & Forms:**
    -   [React Hook Form](https://react-hook-form.com/) (for form management)
    -   [Zod](https://zod.dev/) (for schema validation)
-   **Utilities & Others:**
    -   [Day.js](https://day.js.org/) (for date manipulation)
    -   [Lucide React](https://lucide.dev/) (for icons)
    -   [PDF-Lib](https://pdf-lib.js.org/) (for PDF generation, likely for feedback downloads)
    -   [Sonner](https://sonner.emilkowal.ski/) (for toast notifications)
    -   [Slick Carousel](https://react-slick.neostack.com/) (for carousels/sliders)
    -   [Class Variance Authority](https://www.npmjs.com/package/class-variance-authority), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate) (for enhanced Tailwind CSS functionalities)
    -   `next-themes` (for theme management, e.g., dark/light mode)

## Project Structure

The project follows a standard Next.js application structure with additional directories for Firebase integration, utility functions, and custom components.

```
AI_Interviewer/
├── app/
│   ├── (auth)/             # Authentication related routes (sign-in, sign-up)
│   ├── (root)/             # Main application routes (dashboard, interview, profile, etc.)
│   ├── api/                # Next.js API routes for backend logic (conversations, feedback, interviews, vapi)
│   ├── favicon.ico
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout for the application
├── components/
│   ├── ui/                 # Reusable UI components (buttons, forms, input, etc. from shadcn/ui)
│   ├── Agent.tsx           # Likely related to AI agent interaction
│   ├── AnalyticsChart.tsx
│   ├── AuthForm.tsx        # Authentication forms
│   ├── DisplayTechIcons.tsx
│   ├── Footer.tsx
│   ├── FormField.tsx
│   ├── Header.tsx
│   ├── InterviewCard.tsx   # Card component for displaying interview details
│   └── RecentInterviewItem.tsx
├── constants/              # Global constants
│   └── index.ts
├── firebase/               # Firebase configuration and initialization
│   ├── admin.ts
│   └── client.ts
├── lib/                    # Utility functions and actions
│   ├── actions/            # Server actions for authentication and general logic
│   ├── utils.ts
│   └── vapi.sdk.ts         # Vapi.ai SDK integration
├── public/                 # Static assets (images, svgs)
├── types/                  # TypeScript type definitions
│   ├── index.d.ts
│   └── vapi.d.ts
├── .env.example            # Environment variables example
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs
├── README.md               # Project documentation (this file)
├── tsconfig.json           # TypeScript configuration
└── ... other config files
```
## Application Architecture and Flow

### High-Level Architecture

The application adopts a **client-server architecture** with a strong emphasis on server-side capabilities provided by **Next.js** and **Firebase**.

*   **Client (Frontend):** Built with React and Next.js, handling user interface, real-time voice interactions, and presenting data.
*   **Server (Backend/API Layer):** Utilizes Next.js API Routes and Server Actions for handling requests, interacting with Firebase services, and orchestrating AI model calls.
*   **Database (Backend):** Firebase Firestore for persistent data storage.
*   **Authentication (Backend):** Firebase Authentication for user identity management.
*   **AI Services (External):** Google Gemini for natural language processing (question generation, feedback analysis) and Vapi AI for real-time voice synthesis and speech-to-text.

```
+------------------+       +-------------------+       +--------------------+
|  User (Browser)  | <---> | Next.js Frontend  | <---> | Next.js API Routes |
|                  |       | (React Components)|       |  / Server Actions  |
+------------------+       +-------------------+       +--------------------+
         ^                            ^    |                      |
         |                            |    |                      |
         |  Real-time Voice (Vapi AI) |    |  Data & Auth Requests|
         |                            |    |                      |
         v                            v    v                      v
+------------------+       +-------------------+       +--------------------+
|  Vapi AI Service | <---> | Firebase Auth     | <---> | Firebase Firestore |
| (Voice Interac.) |       | (User Management) |       | (Data Storage)     |
+------------------+       +-------------------+       +--------------------+
         ^                                              ^
         |                                              |
         |         AI Model Prompts / Responses         |
         |                                              |
         +----------------------------------------------+
         |
+----------------------+
| Google Gemini AI     |
| (NLP: Questions/Fb)  |
+----------------------+
```

## Contributing

We welcome contributions to ElevatePrep!

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and ensure they adhere to the project's coding standards.
4.  Write clear and concise commit messages.
5.  Submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
