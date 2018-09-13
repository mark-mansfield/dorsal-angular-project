## install angular
1. create new angular project
cd into project directory

```
ng new [app-name]
ng new dorsal-angular
```

2.  Get predesigned componets
```
ng add @angular/material
```

3. bring up dev server ## no backend capabilites
```
ng serve -0
```

4.  Add node express backend

new folder called "backend" on root level


5. add server.js file to root level


6. download a tool to help with restarting the node server
 it watches our node.js files and of we change something it automatically restarts the server
```npm install --save-dev nodemon```

## IF not global install  register nodemon inside package.json
```
"start:server" : "nodemon server.js"
```

7. now run the node server with
```
npm run start:server
```

8. install node body parser - node express package used as a middlewaer allows access to the body of a REquest
```
npm install --save-dev body-parser
```


9. Start node server
```
node server.js
```

10. MULTER to exract incomming file on node js/ express install package
```
npm install --save multer
```


# Start Up
``` javascript
ng serve -o
npm run start:server
```