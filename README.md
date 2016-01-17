# Nucleus-Player

[![Join the chat at https://gitter.im/Nucleus-Player/Nucleus-Player](https://badges.gitter.im/Nucleus-Player/Nucleus-Player.svg)](https://gitter.im/Nucleus-Player/Nucleus-Player?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
**Mac OSX** [![Build Status](https://travis-ci.org/MarshallOfSound/Nucleus-Player.svg?branch=master)](https://travis-ci.org/MarshallOfSound/Nucleus-Player)
**Windows** [![Build status](https://ci.appveyor.com/api/projects/status/aq2pyi185dfkhytu/branch/master?svg=true)](https://ci.appveyor.com/project/MarshallOfSound/nucleus-player/branch/master)


A beautiful cross platform Desktop Player for Google Play Music

## WARNING

This repository is not usable in it's current state, it is currently in rapid
development and therefore I can not guarantee the stability of master, force
pushes may occur and breaking changes may happen all the time.  Stay on your
toes :)

## FAQ

### So what is this???

This project is designed to close the gap between the existing Desktop Player
options for Google Play Music.  At the moment they are fragments, different,
support a plethora of different features and are extremely prone to bugs.  This
repo is designed to be as low maintenance and as cross-platform as possible.

### What OS's do you support?

All the major ones, we have automatic CI running for [Mac OSX (Travis CI)][1]
and [Windows (Appveyor)][2].  The application can also be built for Linux
platforms but we do
not currently have CI set up targeting those platforms.

[1]: https://travis-ci.org/MarshallOfSound/Nucleus-Player
[2]: https://ci.appveyor.com/project/MarshallOfSound/nucleus-player

### When will this hit a proper release target?

There is currently an [issue][3] that outlines the tasks left to complete before
a minimum first release can be reached.

[3]: https://github.com/MarshallOfSound/Nucleus-Player/issues/1

### How can I get involved?

Fork the repo, take a look at the issue mentioned above and tackle one of the
release criteria. When you get it working, write some epic tests and PR it in
to the main repo.

## Development Guide

### Getting Started

So to get started we need to clone the repo and install all the dependencies

```bash
git clone https://github.com/[Your Username Here]/Nucleus-Player.git
npm install
```

From there to run the app for development you simply run in two separate
terminals.

```bash
npm run watch
```

**AND**

```bash
npm start
```

The first command runs an initial build of the source code and then starts a
watch task to rebuild it on change.  The second command starts the app.
