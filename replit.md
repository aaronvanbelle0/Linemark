# LineMark Striping - Professional Line Striping Services

## Overview

LineMark Striping is a professional line striping and parking lot marking service website serving Northwestern Washington. The company specializes in parking lot striping and road marking services for commercial and residential clients across Whatcom County, Skagit County, Snohomish County, San Juan County, and Island County. The website serves as a marketing platform to showcase services, provide pricing information, display a portfolio gallery, and facilitate customer contact and quote requests.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 2025)

### Image Update - August 17, 2025
- **Replaced all website images** with high-quality, directly relevant line striping and parking lot images
- **Removed pricing section** completely from navigation and content per user request
- **Removed hamburger menu** functionality to simplify navigation
- **Added professional logo** integration in both header navigation and footer sections
- **Removed road marking service** from services section, quote form, and footer to focus on core parking lot striping
- **Replaced all website images** with client's actual line striping project photos showing real work examples
- All images now showcase authentic LineMark Striping projects including ADA compliance, equipment in action, warehouse marking, and commercial parking lots

## System Architecture

### Frontend Architecture
The application uses a traditional static website architecture built with vanilla HTML, CSS, and JavaScript. This approach was chosen for its simplicity, fast loading times, and ease of maintenance for a small business website.

**Key Design Decisions:**
- **Single Page Application (SPA) Style**: Uses anchor-based navigation with smooth scrolling between sections rather than multiple pages, providing a modern user experience while maintaining simplicity
- **Responsive Design**: Mobile-first approach with hamburger navigation and responsive layouts to serve customers on all devices
- **Modern CSS Architecture**: Utilizes CSS custom properties (variables) for consistent theming and easy maintenance of the color scheme
- **Progressive Enhancement**: Core functionality works without JavaScript, with JavaScript enhancing the user experience through smooth scrolling and mobile navigation

### Styling and Design System
- **CSS Custom Properties**: Centralized color scheme management with variables for primary (yellow #f4d03f), secondary (dark blue-gray #2c3e50), and accent colors
- **Typography System**: Uses Inter font family with multiple weights for professional appearance
- **Component-Based CSS**: Modular approach with reusable button styles, navigation components, and section layouts
- **Box Shadow System**: Consistent elevation hierarchy using predefined shadow values

### JavaScript Functionality
- **Navigation Management**: Mobile hamburger menu toggle and smooth scrolling navigation
- **Dynamic Navbar**: Background opacity changes on scroll for better visual hierarchy
- **Form Handling**: Contact form submission with client-side data collection (prepared for backend integration)
- **Event-Driven Architecture**: Uses modern event listeners for user interactions

### Content Structure
The website follows a logical information hierarchy:
1. Hero section with clear value proposition
2. About section for company credibility
3. Services showcase with detailed offerings
4. Pricing transparency
5. Portfolio gallery for social proof
6. Service area coverage
7. Contact and quote request functionality

## External Dependencies

### CDN Dependencies
- **Font Awesome 6.0.0**: Icon library for visual elements and UI enhancements
- **Google Fonts (Inter)**: Typography system providing multiple font weights (300, 400, 500, 600, 700)
- **Pixabay**: Image hosting for hero section imagery

### Browser APIs
- **Scroll API**: For navbar styling changes and smooth scrolling functionality
- **FormData API**: For contact form data collection and processing
- **DOM APIs**: For interactive navigation and dynamic content management

### Future Integration Points
The contact form is structured to easily integrate with:
- Email services (SendGrid, Mailgun, etc.)
- CRM systems for lead management
- Analytics platforms (Google Analytics, Facebook Pixel)
- Payment processing for quote deposits