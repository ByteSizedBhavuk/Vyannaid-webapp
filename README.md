# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.










Vyannaid-webapp/
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ api/
│  │  └─ authApi.js
│  ├─ assets/
│  │  ├─ hero-image.png
│  │  └─ react.svg
│  ├─ auth/
│  │  ├─ AuthContext.jsx
│  │  └─ ProtectedRoute.jsx
│  ├─ components/
│  │  ├─ CoreConnections.css
│  │  ├─ CoreConnections.jsx
│  │  ├─ CTA.jsx
│  │  ├─ Footer.jsx
│  │  ├─ GentleInsights.jsx
│  │  ├─ Hero.jsx
│  │  ├─ Navbar.css
│  │  └─ Navbar.jsx
│  ├─ pages/
│  │  ├─ Dashboard.css
│  │  ├─ Dashboard.jsx
│  │  ├─ Login.css
│  │  ├─ Login.jsx
│  │  └─ Register.jsx
│  ├─ utils/
│  │  └─ validators.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .gitignore
├─ demo.tree
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js



curl \
	-H "Authorization: Bearer 885e2ef67f847596c36b01086ea6b2894d8a459dc1545412d0894fbcfe71c569" \
	-H "Content-Type: application/json" -d '{"ttl": 86400}' \
	https://rtc.live.cloudflare.com/v1/turn/keys/93435d43a28ad371b37e6e6961dff98b/credentials/generate-ice-servers




    {
	"iceServers": [
    {
      "urls": [
        "stun:stun.cloudflare.com:3478",
        "turn:turn.cloudflare.com:3478?transport=udp",
        "turn:turn.cloudflare.com:3478?transport=tcp",
        "turns:turn.cloudflare.com:5349?transport=tcp"
      ],
      "username": "xxxx",
      "credential": "yyyy",
    }
  ]
}