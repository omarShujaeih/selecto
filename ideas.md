# Selecto Design Brainstorm

## Selected Design Approach: **Modern Sustainability Minimalism**

### Design Movement
Contemporary sustainability-focused design with influences from modern fintech apps and eco-conscious brands. Clean, purposeful, and values-driven.

### Core Principles
1. **Intentional Simplicity**: Every element serves a purpose. Remove visual noise to focus on the core action (finding and buying surplus food).
2. **Sustainability First**: Green as the primary color system reflects environmental values. Visual hierarchy emphasizes impact metrics.
3. **Trust Through Clarity**: Clear typography, generous spacing, and consistent patterns build confidence in the platform.
4. **Mobile-First Elegance**: Optimized for thumb-friendly interactions with thoughtful touch targets and readable text at all sizes.

### Color Philosophy
- **Primary Green (#2F9E57)**: Represents growth, sustainability, and positive environmental action. Used for primary CTAs, active states, and headers.
- **Dark Green (#1F7A43)**: Depth and trust. Used in gradients and secondary elements.
- **Light Green (#EAF7EE)**: Soft, approachable background for cards and sections. Feels fresh and organic.
- **White (#FFFFFF)**: Clean, premium. Card backgrounds and primary text areas.
- **Light Gray (#F5F6F8)**: Neutral page background. Subtle and non-intrusive.
- **Orange (#F2994A)**: Discount and urgency. Draws attention to savings and special offers.
- **Blue (#4A90E2)**: Revenue and metrics. Used in data visualization and secondary stats.
- **Purple (#7B61FF)**: Performance and impact. Used for waste reduction and achievement metrics.

### Layout Paradigm
- **Card-based composition**: Meal cards, order cards, and stat cards create visual rhythm and modularity.
- **Asymmetric hero sections**: Splash screen uses full-bleed gradient with centered content for impact.
- **Bottom navigation**: Mobile-first with persistent bottom nav for easy access to Home, Orders, Favorites, Profile.
- **Header consistency**: Green headers with search/action elements create visual anchoring.
- **Whitespace breathing room**: 16-24px padding between sections prevents visual clutter.

### Signature Elements
1. **Green gradient backgrounds**: Used on splash, headers, and hero sections to reinforce brand identity.
2. **Rounded cards with soft shadows**: 16-24px border radius and subtle shadows (0 2px 8px rgba) create depth without harshness.
3. **Price comparison visual**: Original price crossed out in gray, discounted price in bold orange—immediately communicates value.

### Interaction Philosophy
- **Immediate feedback**: Buttons and interactive elements respond instantly with color changes and subtle scale transforms.
- **Progressive disclosure**: Details appear on demand (tap meal card → see full details).
- **Contextual actions**: Reserve, add to cart, checkout flows are always one tap away.
- **Status clarity**: Order status, meal availability, and action states are visually distinct.

### Animation
- **Page transitions**: Subtle fade-in (200ms) when navigating between pages.
- **Button interactions**: Hover state with slight scale (1.02) and shadow increase.
- **Loading states**: Gentle spinner animation for async operations.
- **Scroll animations**: Cards fade in as user scrolls through meal listings.
- **Micro-interactions**: Checkboxes and toggles have smooth transitions (150ms).

### Typography System
- **Display Font**: System fonts (SF Pro Display on iOS, Segoe UI on Windows) for headings—modern and accessible.
- **Body Font**: System fonts for body text—ensures readability and fast rendering.
- **Hierarchy**:
  - **H1**: 28px, bold (700), used for page titles and splash screen text.
  - **H2**: 24px, bold (700), used for section headers.
  - **H3**: 18px, semibold (600), used for card titles and meal names.
  - **Body**: 16px, regular (400), used for descriptions and body text.
  - **Small**: 14px, regular (400), used for secondary text and metadata.
  - **Tiny**: 12px, regular (400), used for labels and badges.

---

## Implementation Notes
- All components use Tailwind CSS utility classes for consistency.
- Color variables are defined in `client/src/index.css` using CSS custom properties.
- Responsive breakpoints: mobile (320px), tablet (768px), desktop (1024px+).
- All interactive elements have visible focus states for accessibility.
- Bottom navigation is persistent across all customer pages.
- Admin and restaurant interfaces use similar design language for consistency.
