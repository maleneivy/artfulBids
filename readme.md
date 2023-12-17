# Artful Bids - an auction site

### Semester Project 2 - Noroff Education

This is a semester project I had at Noroff. The assignment was to launch a website where users can add items to be bid on and add bids on other users listings.
When a new user joins the auction site, they are given 1000 credits to use on the site. Credits are earned by selling items and used for buying.

### User Stories

- A user with a stud.noroff.no email may register
- A registered user may:
  - log in and log out
  - update their avatar
  - view their total credits
  - create a listing with title, deadline date, media gallery and description.
  - add a bid to another user´s listing.
    view bids made on a listing.
- A unregistered user may search through listings.

### Static Host

[![Netlify Status](https://api.netlify.com/api/v1/badges/1f62a0b0-4890-4f93-9429-056680a6ccae/deploy-status)](https://app.netlify.com/sites/artful-bids-sm2/deploys)

This site is deployed by [Netlify](https://artful-bids-sm2.netlify.).

### Install

1. Open terminal and clone repo

```sh
git clone https://github.com/maleneivy/artfulBids.git
```

2. Initialize git

```sh
git init
```

3. Install dependencies

```sh
npm install
```

4. Sass Watch

```sh
npm watch
```

### CSS Frameworks

- "bootstrap": "^5.3.2"

### Testing

The project is set up to run esLint and prettier with husky pre-commit.
This execute lint-stage and will check the files you´ve changed on this commit.

To run it manually:

### Eslint

```sh
npm run linit
```

### Prettier

```sh
npm run format
```

## Contributing

If you want to contribute to the project, follow these steps:

1. Fork the project.
2. Create a new branch "git switch -c name-of-your-branch".
3. Make your changes and commit them "git commit -m "Your commit message".
4. Push to the branch "git push --set-upstream origin name-of-your-branch".
5. Submit a pull request.
