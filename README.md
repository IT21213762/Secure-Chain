Project done by:
  1. Bandara H.M.H.M - IT21213762
  2. Kumari M.M.P.M - IT21220074

Features
  1. Google Authentication: Log in securely with your Google account.
  2. Password Encryption: Encrypt your private RSA key with a password for added security.
  3. Decentralized File Sharing: Share files using blockchain and IPFS.
  4. Malware Detection: Automatically detect malware in uploaded files.

Prerequisites
  1. Create a project in firebase and setup the firebase authentication, firebase database and firebase storage.
  2. Add the neccessary keys and IDs to the .env file and firebase.js file.
  3. Install IPFS and start Daemon by entering "ipfs daemon" in your command prompt.
  4. Open http://127.0.0.1:5001/ in your browser and check the ipfs is running.
  5. Install MetaMask in your browser.
  6. Install Ganache and set up the Ganache network in MetaMask and add a wallet.

Functions
  1. Log In:
    Click the "Log In with Google" button.
    Authorize the application to use your Google account.

  2. Registering:
    If you are a new user, you will be prompted to create a password.
    This password will be used to encrypt your RSA private key.
    If you are an existing user, enter your password to decrypt your RSA private key.

  3. File Upload:
    Click the "Upload" button to select a file.
    Ensure the file size is less than 50MB.
    The file will be encrypted and uploaded to Firebase Storage.

  4. File Sharing:
    Click the "Share Files" button to select a file to share.
    Enter the recipient's address.
    The file will be uploaded to IPFS and the CID will be shared via the blockchain.

Technical Details
  1. Password Encryption:
    When you register, a new RSA key pair is generated.
    Your private RSA key is encrypted using AES with your password.
    The encrypted private key is stored in Firebase Firestore.
    Your password is never stored, ensuring maximum security.
  
  2. Blockchain File Sharing:
    Files are uploaded to IPFS, generating a unique CID.
    The CID is shared with the recipient via a blockchain transaction.
    The recipient retrieves the CID from the blockchain and downloads the file from IPFS.
    The file is decrypted using the recipient's private key.
  
  3. Malware Detection:
    Uploaded files are analyzed using a trained machine learning model.
    The model detects potential malware in the files.
    Users are alerted if malware is detected, and the file upload is prevented.
