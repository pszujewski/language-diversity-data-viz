# Visualizing Linguistic Diversity in the U.S.
![Heat Map](https://github.com/pszujewski/language-diversity-data-viz/blob/master/src/images/heat-map.png)

## Description

The purpose of this project is to visualize census data on linguistic diversity in the United States. To that end, this project uses D3.js, a popular JavaScript library for creating data visualizations on the web. This project does not aim to draw conclusions or analyze the presented data in any meaningful way. The goal is simply to create interesting charts, graphs, and maps that bring the data to life. 

[View the Deployed Site](https://pszujewski.github.io/d3-language-diversity/)

## Learning Resources and Credits
The U.S. heat map visualization was made possible by modifying code provided by Bill Morris at this [bl.ock post](https://bl.ocks.org/wboykinm/dbbe50d1023f90d4e241712395c27fb3). The post demonstrates, first, how to generate a U.S. map using only SVG and JSON, and second, how to implement the color scale. 

![Pie Chart Example](https://github.com/pszujewski/language-diversity-data-viz/blob/master/src/images/color-wheel.png)

# Getting Started with the project

### Set up

* Move into your projects directory: `cd ~/YOUR_PROJECTS_DIRECTORY`
* Clone this repository: `https://github.com/pszujewski/language-diversity-data-viz.git`

#### Install the dependencies

```bash
> npm install
```

#### Install Webpack and the Webpack dev server

```bash
> npm install -g webpack
> npm install webpack-dev-server -g
```
Webpack is also installed as a local dependency for your convenience, so the first part of this step is not strictly necessary. The second step is, since the webpack dev-server is not included as a local dev dependency in the package.json. If you prefer to install the dev server locally instead, you can run: 

```bash
> npm install webpack-dev-server --save-dev
```

#### Run the webpack dev server

```bash
> npm run dev
```
Which will run the following script from package.json: 

```bash
> dev: webpack-dev-server --content-base public
```
The 'content-base' flag identifies the directory from which webpack should run the dev server. We run it from the public directory because that is where our index.html file lives. By default, the dev server will listen port 8080. Navigate to http://localhost:8080/ to view the project in dev mode. 

#### Run the build script

```bash
> npm run build
```
Which will run the following script identified in the package.json:

```bash
> build: webpack && cd public && mv index.html ../build && mv data ../build 
```
Note: only run this script if you want to create a production bundle of the JS files. It will do a few things: first, it will create the production bundle thanks to the webpack command, and then it will move the index.html file to the newly created build directory. 

## Built With
* CSS
* D3.js
* jQuery
* jQueryUI
* Webpack

## Author

* Peter Szujewski



