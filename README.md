# amp4email

A step by step guide on how to send dynamic email to end users.

### Step 1: Setting up this project

1. Clone/Download this repo- `git clone https://github.com/varunon9/amp4email.git`
2. Install dependencies `yarn install`
3. Create `config.js` file from `configStructure.js` file or just rename it to `config.js`

### Step 2: Configure sender details

1. Edit your gmail accoint details in `config.js` file (create in step 1)
2. Make sure that you have enabled less secure settings to your gmail account details (you can disable it after testing)
3. Visit https://myaccount.google.com/lesssecureapps?utm_source=google-account&utm_medium=web for enabling less secure apps settings

### Step3: Enabling dynamic email on receiver's gmail account

1. You must enable dynamic email settings on receiver's gmail account.
2. Whitelist your (sender) gmail account in Gmail Settings > General > Dynamic email > Dynamic email development


### Step4: Run the application

1. `yarn start`
2. Enter receiver's email id (where you whitelisted your gmail id)
