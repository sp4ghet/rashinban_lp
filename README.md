# Rashinban Landing Page

A modern, responsive static webpage built with HTML, LESS, and JavaScript. This project features a clean design with smooth animations, mobile-first responsive layout, and interactive elements.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **LESS Preprocessing**: Organized stylesheets with variables and mixins
- **Interactive Elements**: Smooth scrolling, mobile navigation, form handling
- **Build System**: Simple Node.js build process for development
- **Development Server**: Built-in HTTP server for local development

## 📁 Project Structure

```
rashinban_lp/
├── src/                          # Source files
│   ├── index.html               # Main HTML file
│   ├── styles/                  # LESS stylesheets
│   │   ├── main.less           # Main stylesheet
│   │   └── variables.less      # LESS variables
│   ├── scripts/                # JavaScript files
│   │   └── main.js            # Main JavaScript
│   └── assets/                 # Static assets
│       └── images/            # Image files
├── dist/                       # Compiled output (generated)
├── build-tools/               # Build scripts
│   └── compile.js            # LESS compiler and file processor
├── package.json              # Project configuration
└── README.md                # This file
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

#### Build the project:
```bash
npm run build
```

This command will:
- Compile LESS files to CSS
- Copy HTML and JavaScript files to the `dist` directory
- Copy assets to the `dist` directory
- Generate source maps for debugging

#### Start the development server:
```bash
npm run serve
```

This will start a local HTTP server at `http://localhost:8080` and automatically open your browser.

#### Development workflow:
```bash
npm run dev
```

This command combines build and serve - it builds the project and starts the development server.

## 🎨 Customization

### Colors and Typography

Edit `src/styles/variables.less` to customize:
- Color scheme
- Typography (fonts, sizes, weights)
- Spacing and layout values
- Breakpoints for responsive design
- Shadows and border radius

### Content

Edit `src/index.html` to modify:
- Page content and structure
- Meta tags and SEO information
- Navigation links
- Contact information

### Styling

Edit `src/styles/main.less` to customize:
- Layout and positioning
- Component styles
- Responsive behavior
- Animations and transitions

### JavaScript Functionality

Edit `src/scripts/main.js` to modify:
- Navigation behavior
- Form handling
- Scroll effects
- Interactive elements

## 📱 Responsive Design

The website is built with a mobile-first approach and includes:

- **Mobile (< 640px)**: Single column layout, hamburger menu
- **Tablet (640px - 1024px)**: Adapted layouts, visible navigation
- **Desktop (> 1024px)**: Full layout with side-by-side sections

## 🔧 Build System

The build system (`build-tools/compile.js`) handles:

- **LESS Compilation**: Converts LESS files to minified CSS
- **File Copying**: Moves HTML, JS, and assets to dist directory
- **Source Maps**: Generates source maps for debugging
- **Directory Management**: Cleans and creates necessary directories

## 📦 Dependencies

### Runtime Dependencies
- `http-server`: Local development server

### Development Dependencies
- `less`: LESS CSS preprocessor

## 🌐 Browser Support

This website supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help with this project, please open an issue in the repository.

---

**Happy coding! 🚀**
