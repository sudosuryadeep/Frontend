# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




src/
 ├─ App.jsx                 # Main App component (wraps layout)
 ├─ index.jsx               # React DOM entry
 ├─ api/
 │    ├─ index.js           # All API calls (ratings, courses, auth)
 │    └─ ratings.js
 │
 ├─ components/
 │    ├─ Header/
 │    │    ├─ Header.jsx
 │    │    ├─ Logo.jsx
 │    │    ├─ NavLinks.jsx
 │    │    └─ UserMenu.jsx
 │    │
 │    ├─ Footer/
 │    │    └─ Footer.jsx
 │    │
 │    ├─ CourseFilterBar/
 │    │    └─ CourseFilterBar.jsx
 │    │
 │    ├─ CourseList/
 │    │    ├─ CourseList.jsx
 │    │    └─ CourseCard.jsx
 │    │
 │    ├─ Rating/
 │    │    ├─ RatingForm.jsx
 │    │    └─ ReviewsModal.jsx
 │    │
 │    ├─ ScrollToTopButton.jsx
 │    └─ ProtectedRoute.jsx    # Optional: restrict access for guest users
 │
 ├─ context/
 │    └─ AuthContext.jsx      # user login state, role
 │
 ├─ pages/
 │    ├─ Home.jsx
 │    ├─ Trending.jsx
 │    ├─ Dashboard.jsx
 │    ├─ Login.jsx
 │    └─ CoursePage.jsx        # iframe view for logged-in users
 │
 ├─ utils/
 │    └─ helpers.js           # reusable helpers (formatTime, avgRating, etc.)
 │
 └─ styles/
      └─ globals.css          # Tailwind + custom styles



isko directly command run krke bnna hai can you create .sh file or anothing jisse ye directly bna jaye sab