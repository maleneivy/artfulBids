# Artful Bids - an auction site

### Semester Project 2 - Noroff Education

This is a semester project I had at Noroff. The assignment was to launch a website where users can add items to be bid on and add bids on other users listings.
When a new user joins the auction site, they are given 1000 credits to use on the site. Credits are earned by selling items and used for buying.

### Repo is deployed on Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/1f62a0b0-4890-4f93-9429-056680a6ccae/deploy-status)](https://app.netlify.com/sites/artful-bids-sm2/deploys)

[Netlify](https://artful-bids-sm2.netlify.app/).

### Install

1. Open terminal and clone repo

```
git clone https://github.com/maleneivy/artfulBids.git
```

2. Initialize git

```
git init
```

3. Install dependencies

```
npm install
```

### Testing

The repo is set up to run esLint and prettier with husky pre-commit.
This execute lint-stage and will check the files you´ve changed on this commit.

To run it manually:

### Eslint

```
npm run linit
```

### Prettier

```
npm run format
```

## Contributing

If you want to contribute to the project, follow these steps:

1. Fork the project.
2. Create a new branch "git checkout -b name-on-your-branch".
3. Make your changes and commit them "git commit -m "Your commit message".
4. Push to the branch "git push --set-upstream origin name-of-your-branch".
5. Submit a pull request.
