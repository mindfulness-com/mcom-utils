# Mindfulness.com API

> A GraphQL api written in Typescript talking to a Postgres db.

## Principles

**Development:**

1. Avoid complexity
1. Use functional programming to reduce complexity
1. Use strict typing where possible
1. Peer review where possible
1. Test application logic

**DB:**

1. Following [these naming](https://launchbylunch.com/posts/2014/Feb/16/sql-naming-conventions/#naming-conventions) conventions.

## Setup

### Pre-requirements (SKIP if you have Node, Postgres & NPM installed)

**1. Brew** – This assumes you have Homebrew installed on your mac.

If not try the below or check [Homebrew installation](https://brew.sh/):

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

If you do have brew installed, now would be a good time to make sure it's up to date:

```
brew doctor
brew update
```

**2. Postgres** – Run the below or see [here](https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3) for details.

```
brew install postgresql
```

To make PSQL launch on system startup (so you don't have to do it yourself every time):

```
mkdir -p ~/Library/LaunchAgents

ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents

launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

**3. Node & NPM** – Will need NodeJs and NPM installed on your machine to run the server.

The best way to manage NPM and node versions is through NVM (Node Version Manager). You can follow [this tutorial](http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/), which esssentially says:

```
brew install nvm
mkdir ~/.nvm
nano ~/.bash_profile
```

Then add the below into your `~/.bash_profile`:

```
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

Then try install node (which includes NPM):

```
nvm install --lts
nvm use node
```

### Application setup

**1. Create an 'mcom' database** – Createa a database in your postgresql installation and seed it with data.

```
npm run db:create
```

**2. NPM install + environment variables** – Run the setup script to copy environment variables (any of this setup section for you:

```
npm run setup;
```

Add your sql username to the `.env` file that was created in the root directory. You can find our what your username is by running:

```
psql -a -c "select current_user"
```

```
LOCAL_DB_USERNAME=<insert username from above>
```

**3. Seed data & migrations** – Get your database up to date.

```
npm run db:setup
```

**4. Start your engines** – Run the server in dev mode using ts-node. (Any changes to the code will restart the server.)

```
npm start
```

Alternatively you can build and run the server with node:

```
npm run build; npm run serve;
```

To run tests once:

```
npm run test
```

Or as you're developing you can have tests running continuously in another terminal and watch for any file changes.

```
npm run start-tests
```
