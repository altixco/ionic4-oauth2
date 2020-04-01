# Ionic v4 + OAuth2

> Ionic v4 sidemenu template plus authentication logic with OAuth2 including login page

## How to install the template ##

### Clone the repository
```
git clone https://github.com/altixco/ionic4-oauth2.git project_name
cd project_name
```

### Select branches to include
This repository currently contains a branch that you can use if push notifications are required in the project.

To add support for push notifications use:
```
git merge origin/push-notifications
```

After adding support for push notifications you need to add the configurations files (`google-services.json` for android and `GoogleService-Info.plist` for iOS) to the root of the project. You can generate this files from firebase console.

For more information see the [Plugin repository](https://github.com/dpa99c/cordova-plugin-firebasex "Cordova FirebaseX Plugin")

### Remove the git directory
```
rm -r ./.git
```

The command before will remove the `.git` folder so you will have to initialize git:
```
git init
git remote add origin <repository-url>
```

## Build Setup ##

``` bash
# Install Ionic
npm install -g ionic

# Install dependecies
npm install

# Serve the application
ionic serve

# Run app on Android device
ionic cordova run android

# Build dev app for Android
ionic cordova build android

# Run unit tests
npm run test

# Run e2e tests
npm run e2e

```
