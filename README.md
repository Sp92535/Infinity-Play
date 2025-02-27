# InfinityPlay - Play Classic Flash Games Online  

InfinityPlay is a web platform that brings back the nostalgia of classic Flash games using the **Ruffle** emulator. It provides a seamless experience to play old Flash games directly in the browser. The platform features an admin panel for managing game additions, while a **super user** has advanced control over admins and game management.

## Features ✨
- 🎮 **Play Classic Flash Games**: Enjoy old Flash games without needing Flash Player.
- 🔑 **Admin Panel**: Secure login for administrators to add new games.
- 🏆 **Super User Controls**: 
  - Add and manage **admins**.
  - Add and delete **games**.
  - Remove **admins** when necessary.
- 🔄 **Integrated with Ruffle**: Enables seamless Flash game emulation.
- 📦 **MongoDB Storage with GridFS**: Stores game files and thumbnails efficiently.

## Tech Stack 🛠️
- **Frontend**: Next.js
- **Backend**: Next.js API routes (App Router)
- **Database**: MongoDB with GridFS for file storage
- **Authentication**: JWT-based authentication for the **super user** and **admins**.
- **File Storage**: GridFS for SWF game files and thumbnails
- **Deployment**: Vercel ([Live Site](https://infinityplay.vercel.app/))

## Overview of Directory Structure 📂
```
.
├── public/                 # Static assets
├── src/
│   ├── app/               # Application logic (API, Admin, Game, Category)
│   ├── components/        # UI Components
│   ├── lib/               # Helper functions (DB, authentication, file handling)
├── .env                   # Environment Variables
├── package.json           # Dependencies
└── README.md              # Documentation
```

## API Routes 📡
### Authentication
- `POST /api/login` → Admin/Super User login

### Game Management
- `POST /api/upload-game` → Upload a new game
- `GET /api/game-data/[game_name]` → Fetch game details
- `GET /api/game-img/[game_image_id]` → Fetch game image
- `GET /api/game-file/[game_file_id]` → Fetch game file
- `DELETE /api/delete-game/[game_name]` → **Super user only**: Delete a game

### Admin Management
- `POST /api/register` → **Super user only**: Add an admin
- `GET /api/search-admin` → **Super user only**:Search admins
- `DELETE /api/delete-admin` → **Super user only**: Delete an admin

### Miscellaneous
- `GET /api/category-all/[category]` → Fetch all games in a category
- `GET /api/category-latest/[category]` → Fetch latest games in a category
- `POST /api/vote/[game_name]` → Vote for a game
- `POST /api/report` → Report a game issue

## Environment Variables 🌍
Create a `.env` file with the following fields:
```
DB_URL="<mongodb_url>"
SUPER_USERNAME="<super_admin_username>"
SUPER_PASSWORD="<super_admin_password>"
JWT_SECRET="<jwt_secret_key>"
```

## Setup ⚙️
1. Clone the repository:  
   ```sh
   git clone https://github.com/yourrepo/infinityplay.git
   cd infinityplay
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Configure environment variables in `.env`.
4. Start the development server:  
   ```sh
   npm run dev
   ```

## Contribution 🤝
Contributions are welcome! If you’d like to improve the platform, feel free to fork the repo and submit a pull request.

---
Enjoy playing your favorite Flash games! 🚀

