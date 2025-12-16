# GameHat - A Game Library

GameHat is an engaging online game library for discovering and supporting game developers. Users can browse games, view detailed information, and install/download from official sources.

## Live URL
https://gamerhat.netlify.app/

## Key Features
- Urban / neon themed responsive UI (mobile, tablet, desktop)
- Home page with banner slider (3 slides), popular games (sorted by rating), and newsletter section
- Games list with cards and navigation to details
- Protected Game Details page (redirects to login if not authenticated)
- Firebase Authentication:
  - Email/Password login & registration
  - Google sign-in
  - Logout button + conditional navbar (profile picture shown when logged in)
- Forgot Password feature (prefilled email + redirect to Gmail)
- My Profile + Update Information (name + photo URL)
- Dynamic document title (GameHat style per route)
- SPA routing support on Netlify (reload doesn’t break routes)

## NPM Packages Used
- react
- react-router-dom
- firebase
- framer-motion
- tailwindcss
