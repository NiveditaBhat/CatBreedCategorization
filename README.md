# Cat Breed Categorization

This is a [Next.js](https://nextjs.org/) application bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It interacts with the [Cat API](https://thecatapi.com/) to fetch cat breeds. It displays the cat images, allows users to search for breeds, and filters results based on selected breeds.

## Table of Contents

- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Usage](#usage)
- [Features](#features)

## Installation

Instructions for installing the project.

```bash
git clone https://github.com/NiveditaBhat/CatBreedCategorization.git
cd your-repository
npm install
```

## Environment variables

Create .env.local file for local environment. Add the following environment variables,

- API_KEY = API key from CAT API
- API_BASE = CAT API url

Please refer to [Cat API](https://thecatapi.com/) for more info

## Usage

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open http://localhost:3000 with your browser to see the result.

Run tests:

```bash
npm run test
```

## Features

1. The cat images are displayed in ascending order from the Cat images API.
2. Initial load is server side and loads 10 cat images.
3. A responsive grid layout is used to display the cat images.
4. A Loading skeleton is shown until the images are loaded from the server the first time.
5. When the user scrolls down the page, 10 more images are loaded each time until there are no more images to load. 
6. Search is performed on the total number of images and returns the cat images of the chosen breed.
7. The selected cat breed is added as search params to the url.
8. Reloading the page with search params, preserves the search state.
9. An error page is shown when there are server-side errors. 
