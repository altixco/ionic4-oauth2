# Ionic v4 + OAuth2

> Ionic v4 sidemenu template plus authentication logic with OAuth2 including login page

## How to install the template ##

Clone the repository
```
git clone https://github.com/altixco/django-mysql-nginx-docker-productionready project_name
cd project_name
```

Remove the git directory
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
