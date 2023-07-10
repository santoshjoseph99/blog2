---
title: "Steps for App Development in React Native"
date: "2023-07-09"
description: "React Native"
---

## Intro

Mobile app dev is hard:

- You have to release the app to the Apple and Google stores
- You have to work in multiple languages (Swift & Kotlin, probably Objective-C and Java)
- You need to work in two different IDEs
- You need to test in two different emulators and devices.

[React Native](https://reactnative.dev/) is a great development environment for mobile app development because it simplifies the development process. But its not as simple as it seems. I'm going to list a few steps that I think every developer needs to follow if they are **serious** about releasing the app.

Also I'm assuming you are using `Typescript` and have decent knowledge of `React`.

## Steps

I would after each step, build & test and commit the changes.

0. Developer accounts!

- https://developer.apple.com/help/account/get-started/sign-in-to-your-developer-account
- https://play.google.com/console/u/0/signup

1. Change app name

- Open `app.json` and change the `displayName`.

2. Change the icons

- Try https://icon.kitchen/

3. Add navigation

- [React Navigation](https://reactnavigation.org/)

4. Add a splash screen

- Most apps need a splash screen: https://github.com/zoontek/react-native-bootsplash

5. Don't use the current stylesheets. tailwindcss is great, but it doesn't work for mobile.

- try https://www.nativewind.dev/

6. Each app needs permissions. Of course it depends on the scope of your app.

- good info here: https://rossbulat.medium.com/react-native-managing-app-permissions-for-ios-4204e2286598
- use https://github.com/zoontek/react-native-permissions
  Some examples of libraries you will probably need:
  - notifications: use https://notifee.app/react-native/docs/overview
  - GPS: use https://github.com/Agontuk/react-native-geolocation-service

7. Add State management

- I'm using https://legendapp.com/open-source/state/

8. Add Animation

- Give https://legendapp.com/open-source/motion/ a try

9. Observability: You need to know how your app is being used and what errors it is generating.

- Logging (https://logrocket.com/)

10. Does your app need to play videos?

- Use https://github.com/react-native-video/react-native-video

11. Publishing

- Google: https://reactnative.dev/docs/signed-apk-android
- Apple: https://reactnative.dev/docs/publishing-to-app-store

## Conclusion

So its not that easy even with React Native. Some of these steps may take a considerable amount of time. I'll create a follow up post if I'm missing something or if I find something interesting...
