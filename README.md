# Call-Nexus 📅

![Call-Nexus Banner](https://drive.google.com/uc?export=view&id=1Yi3MDzOog1eBjRdcS9ypJ6Xk4AS4viJI)

Call-Nexus is a modern scheduling platform inspired by Cal.com. It is built with Next.js and integrated with the Nylas API. By providing a seamless interface for users, Call-Nexus simplifies the process of managing appointments and scheduling meetings.

## ✨ Features

- **Smart Scheduling** - Effortlessly manage your calendar and appointments
- **Multi-Platform Authentication** - Secure login via Google and GitHub
- **Real-time Calendar Integration** - Powered by Nylas API
- **Responsive Design** - Works seamlessly across all devices
- **Modern UI** - Built with Tailwind CSS and Radix UI components

## 🚀 Tech Stack

- **Framework:** Next.js 14
- **Authentication:** NextAuth.js
- **Database:** Prisma
- **Styling:** Tailwind CSS
- **UI Components:** 
  - Radix UI
  - React Day Picker
- **API Integration:** Nylas
- **Type Safety:** TypeScript
- **Form Handling:** Zod
- **File Upload:** Uploadthing

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/priyanshu-gupta07/call-nexus.git
```
2. Install dependencies:
```bash
cd CalNexus
npm install
```
3. Set up environment variables:
```text
# Create a .env file with the following
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NYLAS_CLIENT_ID=
NYLAS_API_KEY=
```
4. Run the Development Server
   ```bash
   npm run dev
   ```
📚 Database Schema
The application uses PostgreSQL with the following main models:

User
Account
Session
EventType
Availability
Key features of the schema:

UUID-based IDs
Timestamp tracking (createdAt/updatedAt)
Relational data modeling
Enum support for days of week
🎨 Styling
Call-Nexus uses a custom theme system with:

Tailwind CSS for utility-first styling
CSS variables for theming
Custom color palette support
Dark/Light mode toggle
Custom Geist font family integration
🔐 Authentication Flow
Users can sign in using:
Google OAuth
GitHub OAuth
Session management via NextAuth.js
Secure token handling
Database-backed session persistence
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Nylas API for calendar integration
Radix UI for accessible components
Tailwind CSS for styling
NextAuth.js for authentication

