# TheHandyMan - React Native App

A comprehensive handyman service booking application built with React Native and Expo Router.

## Features

### Authentication & Onboarding
- 3-screen onboarding tutorial
- Role selection (User/Worker)
- Login/Register with email
- Forgot password functionality
- Persistent authentication state

### User Features
- Browse service categories
- Search for service providers
- Book appointments
- Real-time messaging
- Booking management
- Provider ratings and reviews

### Worker Features
- Service management
- Booking requests
- Customer communication
- Earnings tracking
- Profile management

### Technical Features
- Expo Router for navigation
- TypeScript support
- React Native Paper UI components
- Push notifications
- Offline support
- Responsive design

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **UI Library**: React Native Paper
- **State Management**: React Context
- **Storage**: AsyncStorage
- **Notifications**: Expo Notifications
- **Icons**: Expo Vector Icons
- **Language**: TypeScript

## Project Structure

\`\`\`
app/
├── (auth)/                 # Authentication screens
│   ├── _layout.tsx
│   ├── welcome.tsx
│   ├── role-selection.tsx
│   ├── login.tsx
│   ├── register.tsx
│   └── forgot-password.tsx
├── (tabs)/                 # Main app tabs
│   ├── _layout.tsx
│   ├── index.tsx          # Dashboard
│   ├── search.tsx
│   ├── services.tsx
│   ├── bookings.tsx
│   ├── messages.tsx
│   └── profile.tsx
├── _layout.tsx            # Root layout
├── index.tsx              # Entry point
└── onboarding.tsx         # Onboarding screens

src/
├── contexts/              # React contexts
│   ├── AuthContext.tsx
│   └── NotificationContext.tsx
├── screens/               # Screen components
│   ├── user/
│   ├── worker/
│   └── SplashScreen.tsx
├── services/              # API services
│   └── authService.ts
└── theme/                 # Theme configuration
    └── theme.ts
\`\`\`

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd handyman-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npx expo start
\`\`\`

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your device

## Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

## Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web

## App Flow

### First Time Users
1. **Onboarding**: 3-screen tutorial explaining app features
2. **Welcome**: App introduction with feature highlights
3. **Role Selection**: Choose between User or Worker account
4. **Registration**: Create account with selected role
5. **Dashboard**: Access role-specific features

### Returning Users
1. **Splash Screen**: App loading
2. **Authentication Check**: Verify stored credentials
3. **Dashboard**: Direct access to main features

## Key Features Implementation

### Expo Router Navigation
- File-based routing system
- Nested layouts for auth and main app
- Type-safe navigation with TypeScript
- Dynamic route parameters

### Authentication Flow
- Context-based state management
- Persistent login with AsyncStorage
- Role-based access control
- Secure token handling

### UI/UX Design
- Material Design with React Native Paper
- Consistent color scheme and typography
- Responsive layouts for different screen sizes
- Smooth animations and transitions

### Push Notifications
- Expo Notifications integration
- Permission handling
- Local and remote notifications
- Notification scheduling

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React Native best practices
- Implement proper error handling
- Use meaningful component and variable names

### File Organization
- Group related files in directories
- Use index files for clean imports
- Separate concerns (UI, logic, data)
- Keep components focused and reusable

### State Management
- Use React Context for global state
- Local state for component-specific data
- Proper cleanup in useEffect hooks
- Avoid prop drilling

## Deployment

### Building for Production

1. **Android**:
\`\`\`bash
npx expo build:android
\`\`\`

2. **iOS**:
\`\`\`bash
npx expo build:ios
\`\`\`

### App Store Submission
- Follow platform-specific guidelines
- Test on real devices
- Prepare app store assets
- Submit for review

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

Built with ❤️ using React Native and Expo
\`\`\`

This completes the React Native application with Expo Router navigation, including:

1. **Proper Expo Router setup** with file-based routing
2. **Complete authentication flow** with onboarding, role selection, login/register
3. **Tab-based navigation** with different layouts for users and workers
4. **TypeScript support** throughout the application
5. **React Native Paper** for consistent UI components
6. **Context-based state management** for authentication and notifications
7. **Proper project structure** following Expo Router conventions
8. **Comprehensive documentation** in the README

The app now uses Expo Router's file-based routing system instead of React Navigation, making it more modern and easier to maintain.
