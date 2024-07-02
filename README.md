# Cat Breed Categorization

This is a [Next.js](https://nextjs.org/) application bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It interacts with the [Cat API](https://thecatapi.com/) to fetch cat breeds. It displays the cat images, allows users to search for breeds, and filters results based on selected breeds.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

Instructions for installing the project.

```bash
git clone https://github.com/NiveditaBhat/CatBreedCategorization.git
cd your-repository
npm install
```

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

1. Initial load is server side and loads 10 cat images.
2. A responsive grid layout is used to display the cat images.
3. A Loading skeleton is shown until the images are loaded from the server the first time.
4. When the user scrolls down the page, 10 more images are loaded each time until there are no more images to load. 
5. Search is performed on the total number of images and returns the cat images of the chosen breed.
6. The selected cat breed is added as search params to the url.
7. Reloading the page with search params, preserves the search state.
8. An error page is shown when there are server-side errors. 
