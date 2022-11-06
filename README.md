# UQ data visualization platform

## Technology Stack
vue/cli 5.0.8
vue 3.2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


#### Project structure
```
|- dataview
    |- node_modules                  // store packages downloaded and installed
    |- public
        |- model3d                   // integrate with model and store it locally (model resources)
            |- .vscode               // adapting to browser
            |- Build                 // store model packages 
            |- TemplateData          // store the icons (expand button) 
            |- index.html            // render the canvas to show the model
        |- index.html
    |- src 
        |- api                       // make request for getting data 
            |- request.js            // encapsulated global interfaces
        |- assets                    // store images and icons
            |- icons                 // question icons
            |- images                // images on home page
            |- logo.png              // logo of vue (unimportant)
        |- components
            |- BaseView.vue          // manage common elements
            |- Model3D.vue           // manage model
        |- router                    // navigation system
            |- index.js              // switch from different interfaces
        |- store                     // state manager
            |- index.js              // Vuex is a state management pattern
        |- utils                     // make unique tools (methods)
            |- constants.js          // rename common elments
            |- tool.js               // methods to (re)format 
        |- views                     // three interfaces
            |- chart.vue             // third interface
            |- Home.vue              // first interface
            |- LiveData.vue          // second interface 
        |- App.vue                   // main component (file for entrying pages)
        |- main.js                   // main entrance to the project (instantiating vue)
```