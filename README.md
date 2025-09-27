# StackHubs - IT Services Website

A modern, responsive, and bilingual (English/Arabic) IT services website built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Modern Design**: Clean, professional UI with blue theme and premium corporate look
- **Bilingual Support**: Full English/Arabic support with RTL layout
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Theme**: Theme toggle with persistent preferences
- **Smooth Animations**: Framer Motion animations and transitions
- **Service Hubs**: Comprehensive IT service offerings organized by hubs
- **Contact System**: Professional contact forms and information display
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Internationalization**: i18next with React integration
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📱 Pages & Features

### Home Page

- Hero section with company slogan and CTA
- Service hubs icon grid (8 different hubs)
- "Our Service Hubs" section with detailed descriptions

### Services Page

- Detailed service cards for each hub:
  - **Network Hub**: Consultation, Managed Service, Implementation, Auditing, Modernization
  - **InfoSec Hub**: Vulnerability Testing, Incident Response, Compliance, Monitoring
  - **IoT Hub**: Device Management, Edge Computing, IoT Security, Predictive Maintenance
  - **Automation Hub**: Process automation and AI integration
  - **SAP ERP Hub**: Implementation, Consultation, Support, Data Migration, Security, Optimization
  - **Training Hub**: Technical training and certification programs

### Contact Page

- Professional contact form
- Contact information cards (email, phone, address)
- Responsive layout with contact info sidebar

### Loyalty Program Page

- Program benefits and tiers (Bronze, Silver, Gold)
- Exclusive member benefits display

### Partner Program Page

- Partnership types and benefits
- Strategic partnership opportunities
- Call-to-action for potential partners

## 🌍 Internationalization

### Supported Languages

- **English** (default)
- **Arabic** with full RTL support

### Features

- Dynamic language switching
- RTL layout for Arabic
- Persistent language preference
- Proper typography for both languages

## 🎨 Design System

### Brand Colors

- **Primary Blue**: #3B82F6
- **Success Green**: #10B981
- **Warning Orange**: #F59E0B
- **Error Red**: #EF4444
- **Purple**: #8B5CF6
- **Cyan**: #06B6D4

### Typography

- **English**: Clean sans-serif fonts
- **Arabic**: DIN Next LT Arabic support
- Responsive font scaling
- Proper line heights and spacing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd stackhubs-website
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── service-card.tsx
│       ├── contact-form.tsx
│       └── [shadcn/ui components]
├── contexts/
│   └── ThemeContext.tsx
├── i18n/
│   ├── i18n.ts
│   └── locales/
│       ├── en.json
│       └── ar.json
├── pages/
│   ├── HomePage.tsx
│   ├── ServicesPage.tsx
│   ├── ContactPage.tsx
│   ├── LoyalProgramPage.tsx
│   └── PartnerProgramPage.tsx
├── lib/
│   └── utils.ts
└── App.tsx
```

## 🔧 Configuration

### Theme Configuration

The theme system supports both light and dark modes with persistent storage. Theme preferences are automatically saved to localStorage.

### Language Configuration

Language detection follows this priority:

1. localStorage preference
2. Browser language
3. Default to English

### Styling Configuration

- Tailwind CSS with custom design system
- shadcn/ui components with consistent theming
- 8px spacing system
- Responsive breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)

## 📞 Contact Information

- **email**: info@stackhubs.com
- **Phone**: +1 (555) 123-4567
- **Address**: 123 Business District, Tech City, TC 12345

## 📄 License

© 2025 StackHubs. All rights reserved.

## 🤝 Contributing

This is a proprietary project for StackHubs. For internal development inquiries, please contact the development team.

---

Built with ❤️ by the StackHubs development team.
