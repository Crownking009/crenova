# CRENOVA STUDIO Website

A modern, fully responsive website for CRENOVA STUDIO - A leading creative business in Nigeria.

## 🎨 Features

- **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern Hero Carousel** - Auto-playing carousel with manual controls and touch/swipe support
- **Smooth Animations** - AOS (Animate On Scroll) library integration
- **Interactive Elements** - Hover effects, animated counters, and carousels
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Accessibility Ready** - ARIA labels, keyboard navigation, and semantic markup
- **Performance Optimized** - Lazy loading, debounced events, and efficient code

## 📁 File Structure
```
crenova-studio/
│
├── index.html              # Homepage
├── services.html           # Services page
├── about.html              # About Us page
├── portfolio.html          # Portfolio page
├── blog.html               # Blog page
├── contact.html            # Contact page
│
├── css/
│   └── styles.css         # Main stylesheet
│
├── js/
│   └── main.js            # Main JavaScript file
│
├── images/
│   ├── logo.png           # Company logo
│   ├── hero/              # Hero carousel images
│   ├── services/          # Service images
│   ├── portfolio/         # Portfolio project images
│   └── team/              # Team member photos
│
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. **Download all files** and organize them according to the file structure above

2. **Add your logo**:
   - Place your logo image in the `images/` folder
   - Update the logo reference in `index.html`:
```html
   <img src="images/logo.png" alt="CRENOVA STUDIO Logo">
```

3. **Customize content**:
   - Update company information in `index.html`
   - Change phone numbers, email addresses, and social media links
   - Replace placeholder images with your own

4. **Open in browser**:
   - Simply double-click `index.html` or open it in your browser
   - Or use a local server (recommended):
```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
```

## 🎨 Customization

### Colors
Update the CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #0a3d62;      /* Royal Blue */
    --accent-color: #f39c12;       /* Orange */
    --secondary-accent: #e74c3c;   /* Red */
    --text-dark: #2c3e50;          /* Dark text */
    --text-light: #7f8c8d;         /* Light text */
}
```

### Fonts
The website uses Google Fonts (Poppins and Playfair Display). To change fonts:
1. Visit [Google Fonts](https://fonts.google.com)
2. Select your preferred fonts
3. Replace the font link in `index.html`
4. Update font-family in `css/styles.css`

### Images
Replace the placeholder Unsplash images with your own:
- Update `src` attributes in HTML files
- Place images in the `images/` folder
- Maintain aspect ratios for best results

### Content
- **Hero Section**: Edit slide titles and descriptions in `index.html`
- **Services**: Update service cards with your offerings
- **Portfolio**: Add your own project images and descriptions
- **Testimonials**: Replace with real client feedback
- **Contact Info**: Update footer with your actual contact details

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔧 Features Explained

### Hero Carousel
- Auto-plays every 5 seconds
- Manual navigation with prev/next buttons
- Touch/swipe support on mobile
- Indicator dots for quick navigation
- Pauses on hover

### Services Grid
- Responsive grid layout
- Hover effects with icon rotation
- Links to detailed service pages

### Portfolio Showcase
- Carousel on desktop (3 columns)
- Auto-scrolls on mobile
- Hover overlay with project details

### Statistics Counter
- Animates when section comes into view
- Counts up to target numbers
- Only runs once per page load

### Testimonials
- Rotating carousel
- Manual navigation buttons
- Touch/swipe support
- Auto-rotates every 7 seconds

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## ⚡ Performance Tips

1. **Optimize Images**:
   - Compress images before uploading
   - Use WebP format when possible
   - Implement lazy loading for images below the fold

2. **Minify Files**:
   - Minify CSS and JavaScript for production
   - Use tools like [CSS Minifier](https://cssminifier.com/) and [JS Minifier](https://javascript-minifier.com/)

3. **CDN Usage**:
   - Consider hosting Font Awesome and AOS locally
   - Use CDN for better caching

4. **Caching**:
   - Implement browser caching
   - Use service workers for offline support

## 📝 Adding New Pages

To create additional pages (Services, About, Portfolio, Blog, Contact):

1. Duplicate `index.html`
2. Rename to desired page name (e.g., `services.html`)
3. Update the hero section with page-specific content
4. Remove unnecessary sections
5. Add page-specific content
6. Update navigation to highlight the active page

## 🔒 Security Best Practices

- Always validate form inputs
- Sanitize user data before processing
- Use HTTPS when deployed
- Keep dependencies updated
- Implement CSRF protection for forms

## 📧 Contact Form Setup

The contact form requires backend setup:

1. **Using PHP** (contact.php):
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);
    
    $to = "info@crenovastudio.com";
    $subject = "New Contact Form Submission";
    $body = "Name: $name\n\nEmail: $email\n\nMessage:\n$message";
    
    if (mail($to, $subject, $body)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
```

2. **Using FormSpree** (No backend required):
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- form fields -->
</form>
```

3. **Using Netlify Forms** (If hosted on Netlify):
```html
<form name="contact" method="POST" data-netlify="true">
    <!-- form fields -->
</form>
```

## 🚀 Deployment

### GitHub Pages
1. Create a GitHub repository
2. Push your files
3. Go to Settings > Pages
4. Select main branch
5. Your site will be live at `username.github.io/repo-name`

### Netlify
1. Create account at [Netlify](https://www.netlify.com)
2. Drag and drop your folder
3. Site goes live instantly
4. Custom domain available

### Traditional Hosting
1. Purchase hosting and domain
2. Upload files via FTP/SFTP
3. Point domain to hosting
4. Configure SSL certificate

## 📚 Resources

- [Google Fonts](https://fonts.google.com)
- [Font Awesome Icons](https://fontawesome.com)
- [AOS Animation Library](https://michalsnik.github.io/aos/)
- [Unsplash (Free Images)](https://unsplash.com)
- [CSS Tricks](https://css-tricks.com)
- [MDN Web Docs](https://developer.mozilla.org)

## 🐛 Troubleshooting

### Carousel not working
- Ensure AOS library is loaded
- Check browser console for errors
- Verify JavaScript file is properly linked

### Mobile menu not opening
- Check JavaScript console for errors
- Ensure main.js is loaded after HTML
- Verify mobile-toggle ID matches

### Images not loading
- Check file paths
- Ensure images are in correct folder
- Verify image file extensions

### Animations not showing
- Clear browser cache
- Check AOS library is loaded
- Verify data-aos attributes are correct

## 📄 License

This project is free to use for CRENOVA STUDIO. All rights reserved.

## 👨‍💻 Support

For questions or issues:
- Email: info@crenovastudio.com
- Phone: +234 XXX XXX XXXX

## 🎉 Credits

- Design: CRENOVA STUDIO
- Development: Claude AI Assistant
- Images: Unsplash
- Icons: Font Awesome
- Fonts: Google Fonts

---

**Made with ❤️ in Nigeria 🇳🇬**