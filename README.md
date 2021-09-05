# Webapp Template

I've tested this workflow on Windows 11 and Ubuntu.

## Prerequistites

- [Node](https://nodejs.org/en/download/)
- [Python](https://www.python.org/downloads/)
- [Git](https://git-scm.com/downloads)

Optional:

- [Heroku](https://devcenter.heroku.com/articles/heroku-cli)
- [Docker](https://hub.docker.com/)
- [VSCode](https://code.visualstudio.com/#alt-downloads)

Ensure everything is up to date.

## Setup

A template for webapps containing the technologies I generally use.

1. `sudo apt-get install python3-venv`
2. `python -m pip install --upgrade pip`
3. `python -m venv .venv`
4. Activate the virtual environment:
   - Linux: `source .venv/bin/activate`
   - Windows: `.\.venv\Scripts\python.exe`
5. `pip install -r requirements.txt`
6. `npm install`
7. To deactivate the virtual environment: `deactivate`

## Running Locally

1. To start the flask server, run `python run.py` or `python -m flask run`
2. To run webpack and generate the `bundle.js`, run `npm run watch`. The bundle
   will automatically regenerate when changes are made to frontend files.

## Development

### Directory Structure

### Debugging with VSCode

Everyone has their preferences when it comes to IDEs and debuggers, but I find
VSCode to work well for me. I use the following `launch.json` configuration in
the VSCode debugger:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "command": "npm run watch",
      "name": "webpack",
      "request": "launch",
      "type": "node-terminal"
    },
    {
      "name": "flask",
      "type": "python",
      "request": "launch",
      "module": "flask",
      "env": {
        "FLASK_APP": "app.webapp",
        "FLASK_ENV": "development"
      },
      "args": ["run", "--no-debugger"],
      "jinja": true
    }
  ],
  "compounds": [
    {
      "name": "flask/webpack",
      "configurations": ["webpack", "flask"]
    }
  ]
}
```

The compound rule `flask/webpack` will start the flask server and run
`npm run watch`, all with one click!

### Technologies

- Backend:
  - Python/Flask, making heavy use of flask blueprints
- Frontend:
  - Javascript
  - Webpack for bundling static files
  - Babel for transpiling JSX/SASS/CSS etc
  - React (JSX) for modularizing the interface
  - npm for managing dependencies
- Local Development:
  - VSCode
  - Redis via a docker image
- Deployment:
  - Heroku for hosting
  - The Heroku Redis addon for the deployed database
  - Cloudflare for DNS management

### Managing Dependencies

To record any additional Python libraries that you may have installed, run
`pip freeze > requirements.txt` to update the requirements file. Ensure you are
working within your virtual environment, otherwise this command with include all
of the packages installed globally on your system!

Node modules are stored in the `/node_modules` directory, which is created when
you run `npm install`. To install a new node module, run
`npm install modulename --save`. The `--save` flag will save the module as a
production dependency, and `--save-dev` will save it as a development
dependency.

## Deployment

I've included a procfile for deployment via Heroku. The command to start the app
once deployed on Heroku is contained in the `Procfile`.

I have deployed this app on Heroku. There are a few gotchas: Ensure that the
appropriate buildpacks are added. Heroku will automatically detect and use the
python buildpack, but the nodejs buildpack needs to run first in order to call
"npm run build" (specified in the package.json postinstall script) and create
the bundle.js file. To push a build to Heroku, run `git push heroku main`. To
then open the app in browser, run `heroku open`.

I bought the domain `planager.xyz` through GoDaddy, and redirected it to use
Cloudflare's DNS servers. In Cloudflare I pointed any requests for
`planager.xyz` to the heroku app.
