# A CRUD App using React and MongoDB

*MERN* Stack: Mongo, Express, React, Node.

## Usage

View this application in production at https://react-robots.herokuapp.com/.

## Contributing

### Installation

Get source code.

```` sh
git clone git@github.com:s2t2/react-robots.git
cd react-robots/
npm install
````

### Development

Seed a mongo database.

```` sh
npm run db-seed
````

Start the web server.

```` sh
npm start
````

### Testing

Run tests.

```` sh
npm run test --silent # runs all tests
npm run test-api --silent # runs only server-side api tests
npm run test-components --silent # runs only client-side react component tests. requires the server to be running
````

### Deploying

Deploy master branch to production.

```` sh
git push heroku master
````

<hr />




Commands used to make this repo:

```` sh
express react-robots --ejs
cd react-robots/
npm install --save webpack
npm install --save-dev webpack-dev-middleware webpack-hot-middleware
npm install --save babel-core babel-loader babel-preset-react babel-preset-es2015 style-loader css-loader
npm install --save react react-dom react-router
npm install --save jquery bootstrap file-loader url-loader
npm install --save moment-timezone json-loader
npm install --save mongoose
npm install --save-dev mocha expect supertest zombie
````

Commands used to administer and deploy to production the first time:

```` sh
heroku create react-robots
heroku addons:create mongolab:sandbox
heroku addons:create scheduler
heroku addons:open scheduler # then add a new job for `NODE_ENV=production npm run db-seed` to run hourly
````
