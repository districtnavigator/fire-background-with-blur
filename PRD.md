# Planning Guide

A visually striking lorem ipsum text showcase featuring an animated pixelated gradient fire effect background with semi-transparent content containers that allow the fire animation to show through.

**Experience Qualities**: 
1. **Mesmerizing** - The pixelated fire animation should captivate and hold attention through dynamic movement
2. **Bold** - Strong contrast between dark/warm fire colors and readable content creates visual impact
3. **Ethereal** - Semi-transparent content areas create a floating, layered depth effect

**Complexity Level**: Content Showcase (information-focused)
  - Primary focus is presenting lorem ipsum text beautifully over an animated background with minimal interaction required

## Essential Features

### Pixelated Fire Background Animation
- **Functionality**: Canvas-based animated gradient fire effect using black, red, orange, and yellow pixels
- **Purpose**: Creates a unique, eye-catching visual foundation that sets the mood
- **Trigger**: Automatically starts on page load
- **Progression**: Page loads → Canvas initializes → Fire simulation begins → Continuous animation loop
- **Success criteria**: Smooth 60fps animation with convincing fire movement and color transitions

### Semi-Transparent Content Containers
- **Functionality**: Glass-morphic cards containing lorem ipsum text that overlay the fire background
- **Purpose**: Maintains readability while showcasing the animated background effect
- **Trigger**: Rendered on page load
- **Progression**: Page loads → Cards render with backdrop blur → Content is readable against fire
- **Success criteria**: Text remains clearly readable while background is visible through transparency

## Edge Case Handling
- **Performance degradation**: Reduce canvas resolution on slower devices to maintain smooth animation
- **Small viewports**: Stack cards vertically on mobile, adjust canvas size responsively
- **Reduced motion preference**: Respect prefers-reduced-motion to slow or disable animation
- **Canvas support**: Provide solid gradient fallback if canvas is unsupported

## Design Direction

The design should feel dramatic and hypnotic, evoking warmth and energy through the fire animation while maintaining elegant readability through refined typography and glassmorphic containers. A rich interface serves the purpose - the fire effect is the star, with content designed to complement rather than compete.

## Color Selection

Custom palette - Drawing from natural fire colors to create an organic, warm-to-hot gradient effect that feels alive and dynamic.

- **Primary Color**: Deep charcoal black (oklch(0.15 0 0)) - The foundation representing unburned fuel and deep shadows
- **Secondary Colors**: Fire red (oklch(0.55 0.25 25)) and bright orange (oklch(0.70 0.20 50)) - The heart of the flames
- **Accent Color**: Brilliant yellow (oklch(0.90 0.18 90)) - The hottest points and highlights
- **Foreground/Background Pairings**: 
  - Background (Canvas Black oklch(0.1 0 0)): N/A - Canvas element
  - Card (Semi-transparent white oklch(1 0 0 / 0.08)): White text (oklch(0.98 0 0)) - Enhanced by backdrop blur
  - Muted (Semi-transparent gray oklch(0.5 0 0 / 0.5)): White text (oklch(0.98 0 0)) - Ratio 7.2:1 ✓

## Font Selection

Typography should feel modern and refined to contrast with the organic fire effect, with Inter providing excellent readability against the dynamic background.

- **Typographic Hierarchy**: 
  - H1 (Page Title): Inter Bold/48px/tight letter spacing/-0.02em
  - H2 (Section Headers): Inter SemiBold/32px/normal letter spacing
  - Body (Lorem Ipsum): Inter Regular/16px/relaxed line height/1.7
  - Small (Captions): Inter Medium/14px/normal/tracking-wide

## Animations

The primary animation is the fire effect itself - fluid, organic, and continuous. UI elements should be subtle and supportive, never competing with the background spectacle.

- **Purposeful Meaning**: Fire animation creates energy and warmth; gentle card reveals on scroll add polish without distraction
- **Hierarchy of Movement**: Fire background is constant movement; content cards enter with soft fade-in; no other competing animations

## Component Selection

- **Components**: Card (for semi-transparent content containers with glassmorphic styling)
- **Customizations**: 
  - Custom canvas component for pixelated fire simulation
  - Modified Card component with backdrop-blur-md and semi-transparent backgrounds
  - Custom pixel fire algorithm using cellular automata or perlin noise
- **States**: Cards have subtle hover state with increased opacity/glow
- **Icon Selection**: Minimal icons needed - possibly Flame icon from phosphor-icons for branding
- **Spacing**: Generous padding (p-8/p-12) within cards, large gaps (gap-8) between cards for breathing room
- **Mobile**: Single column stack, reduce canvas resolution for performance, smaller text sizes (H1: 36px, Body: 15px)
