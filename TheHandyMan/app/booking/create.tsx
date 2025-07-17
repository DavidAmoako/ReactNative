To create a new React Native Expo application called "TheHandyMan" with features for connecting homeowners with skilled professionals for household services, you can start by setting up the main application structure. Below is the content for the `app.json` file, which is essential for configuring your Expo application.

File path: c:\Users\Escobar\Documents\Programing\ReactNative\TheHandyMan\app.json

{
  "expo": {
    "name": "TheHandyMan",
    "slug": "thehandyman",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "thehandyman",
    "userInterfaceStyle": "automatic",
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "extra": {
      "router": {},
      "eas": {
        "projectId": "your-project-id"
      }
    },
    "owner": "your-github-username"
  }
}