# Sample Medication Insurance Checker Implementation

This repository provides a **Next.js** web app for collecting patient and insurance data, then sending that data to the [Develop Health](https://api.develophealth.io) benefit-verification endpoint **on the server side**. It uses **Tailwind CSS** for styling and **Formidable** to handle file uploads (front/back of insurance cards). By calling the external API on the server, we ensure that sensitive tokens and credentials are never exposed in client-side code.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Route (`/api/submit-bv`)](#api-route-apisubmit-bv)
- [Customization](#customization)
- [License](#license)

---

## Features

1. **Next.js 13** project with server-side calls to `https://api.develophealth.io/benefit-verification`.
2. **Tailwind CSS** integration for utility-based styling.
3. **Formidable** used in a Next.js API Route to parse `multipart/form-data` and file uploads.
4. Basic form capturing:
   - Patient info (name, DOB, phone, address, etc.)
   - Basic health info (height, weight, T2DM status)
   - Insurance info (provider, group #, member ID, Rx BIN, etc.)
5. **File Upload** support (front and back of insurance card) converted to base64 strings on the server side.
6. **Password** + Terms & Privacy checkboxes for demonstration (not actually creating user accounts in this app).

---

## Tech Stack

- **Next.js**: React-based framework for server-rendered or hybrid web apps.
- **React**: The underlying library for building the UI.
- **Tailwind CSS**: Utility-first CSS framework.
- **Formidable**: Node.js module for parsing form data, especially file uploads.
- **Node Fetch (built-in in Next.js)**: Used to call external APIs from our server route.

---

## Project Structure

A simplified view of the most relevant files:

```
insurance-checker-example/
│
├─ pages/
│   ├─ index.js          # The main form page
│   └─ api/
│       └─ submit-bv.js  # The server route for handling form submissions
│
├─ styles/
│   └─ globals.css       # Where Tailwind imports (@tailwind base, etc.) live
│
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
└─ README.md             # This file
```

---

## Setup & Installation

1. **Clone** the repository:
   ```bash
   git clone https://github.com/develop-health/insurance-checker-example.git
   cd insurance-checker-example
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn
   ```

3. **Configure environment variables** *(optional)*:
   - If you want to store the Develop Health API token in an `.env.local` file, do something like:
     ```env
     NEXT_PUBLIC_API_BASE_URL=https://api.develophealth.io
     DEVHEALTH_BENEFIT_VERIFICATION_TOKEN=some-secret-token
     ```
   - Then, in `pages/api/submit-bv.js`, reference it as:
     ```js
     const token = process.env.DEVHEALTH_BENEFIT_VERIFICATION_TOKEN;
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. **Open the app** in your browser at [http://localhost:3000](http://localhost:3000).  
2. **Fill out** the patient/insurance form.  
3. **Attach** (optional) front/back images of the insurance card.  
4. **Submit**. The form data (and images) is posted to `/api/submit-bv`.  
5. The server route:
   - Parses the `multipart/form-data` (including images).
   - Builds a JSON payload with the base64-encoded images.
   - Submits the final payload to `https://api.develophealth.io/benefit-verification`.

Check your browser’s dev tools or the server logs to see success/failure responses.

---

## API Route (`/api/submit-bv`)

- **Location**: `pages/api/submit-bv.js`
- **Method**: `POST` only
- **Logic**:
  1. Disables Next.js body parsing (`config.api.bodyParser = false`).
  2. Uses **Formidable** to parse files + fields (named import `IncomingForm`).
  3. Converts images to base64 strings.
  4. Builds the JSON object:
     ```js
     {
       drugs: [...],
       diagnoses: [...],
       insurance: [...],
       patient: { ... },
       provider: { ... },
       entity: { ... },
       ...
     }
     ```
  5. Calls `https://api.develophealth.io/benefit-verification` with an **Authorization** header.

You can edit or extend the logic to match your own data model or environment variables.

---

## Customization

- **Add real logic** for storing the user’s password or creating an account. Currently, the `accountPassword` is only captured in the form and never used for anything.
- **Extend** the `payload` to add or remove certain fields (e.g. Type 2 diabetes code, internal references, or additional drug info).
- **Tailwind** classes can be customized or extended in `tailwind.config.js`.
- **Change** the default GLP-1 drug list, dosage, or quantity.  
- Move the `Authorization: "Bearer <token>"` string to an environment variable for safety.

---

## License

This project is provided “as is” without warranty of any kind. Please see [LICENSE](LICENSE) (if you have a license file) or otherwise assume it is private/personal code not intended for public distribution, unless you specify an open-source license.

**Enjoy building your GLP-1 benefit verification flow with Next.js and Tailwind!**

