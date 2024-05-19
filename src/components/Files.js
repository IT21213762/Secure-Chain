import { useState, useEffect } from "react";
import { Header, Icon } from "semantic-ui-react";
import { Button, Alert, Form } from "react-bootstrap";
import Web3 from "web3";
import { create } from 'ipfs-http-client';
import DeleteModal from "../components/DeleteModal";
import {
  addUserFile,
  getUserFiles,
  deleteFile,
  downloadFile,
} from "../api/Calls";

const Files = ({ email, keys }) => {
  const maxfilesize = 50;
  const [files, setFiles] = useState([]);
  const [flag, setFlag] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tooLarge, setTooLarge] = useState(false);
  const [deleteModalShow, setDeleteShow] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [recipient, setRecipient] = useState('');

  const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

  const handleDeleteShow = (file) => {
    setCurrentFile(file);
    setDeleteShow(true);
  };

  useEffect(() => {
    updateData();
    initBlockchain();
    // eslint-disable-next-line
  }, [flag, keys]);

  const updateData = async () => {
    let userfiles = await getUserFiles(email);
    let fileArr = [];
    if (userfiles) {
      userfiles.forEach((f) => {
        fileArr.push(f);
      });
    }
    setFiles(fileArr);
  };

  const isDuplicate = (passed) => {
    let flag = false;
    files.forEach((f) => {
      if (f.filename === email + "&^%" + passed) flag = f;
    });
    return flag;
  };

  const handleUpload = (e) => {
    setUploading(true);
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      if (file.size < maxfilesize * 1024 * 1024) {
        let dupe = isDuplicate(file.name);
        addUserFile(file, email, keys.public, dupe).then(() => {
          setFlag(!flag);
          setUploading(false);
        });
      } else {
        setUploading(false);
        setTooLarge(true);
        setTimeout(() => setTooLarge(false), 3000);
      }
    }
    e.target.value = null;
  };

  // const handleUpload = async (e) => {
  //   setUploading(true);
  //   if (e.target.files.length > 0) {
  //     let file = e.target.files[0];
  //     if (file.size < maxfilesize * 1024 * 1024) {
  //       try {
  //         // Upload the file to Firebase Storage
  //         const storageRef = firebase.storage().ref();
  //         const fileRef = storageRef.child(`uploads/${file.name}`);
  //         await fileRef.put(file);
  //         const fileUrl = await fileRef.getDownloadURL();
  
  //         // Call the Azure endpoint
  //         const analyzeFile = firebase.functions().httpsCallable('analyzeFile');
  //         const result = await analyzeFile({ url: fileUrl });
  
  //         if (result.data.isMalware) {
  //           alert('The file is malware!');
  //         } else {
  //           alert('The file is not malware.');
  //         }
  
  //         setFlag(!flag);
  //       } catch (error) {
  //         console.error("Error uploading or analyzing file:", error);
  //       } finally {
  //         setUploading(false);
  //       }
  //     } else {
  //       setUploading(false);
  //       setTooLarge(true);
  //       setTimeout(() => setTooLarge(false), 3000);
  //     }
  //   }
  //   e.target.value = null;
  // };
  

  const handleDownload = async (file) => {
    setDownloading(true);
    downloadFile(file, keys.private).then(() => setDownloading(false));
  };

  const handleDelete = async (file) => {
    setDeleteShow(false);
    deleteFile(file).then(() => setFlag(!flag));
  };

  const FileButton = ({ file }) => {
    let displayname = file.filename.split("&^%")[1];
    return (
      <div className="py-1 d-flex align-items-center">
        <div className="overflow-hidden mr-3 text-truncate">{displayname}</div>
        <div className="ml-auto">
          <Button variant="outline-info" onClick={() => handleDownload(file)}>
            Download
          </Button>
        </div>
        <div className="pl-2">
          <Button variant="danger" onClick={() => handleDeleteShow(file)}>
            Delete
          </Button>
        </div>
      </div>
    );
  };

  const DisplayFiles = () => {
    return (
      <div className="h-100 col">
        {files.length > 0 ? (
          files.map((f, index) => <FileButton file={f} key={index} />)
        ) : (
          <div className="h-100 d-flex flex-column justify-content-center align-items-center">
            <Header icon>
              <Icon name="file outline" />
              No Files
            </Header>
            Add some with the button above
          </div>
        )}
      </div>
    );
  };

  const initBlockchain = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWeb3(web3);

        const contractAddress = '0x729f4A4eCB5a114143D18f399b6049E5F13E615F'; 
        const abi = [
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "string",
                "name": "fileHash",
                "type": "string"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              }
            ],
            "name": "FileShared",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "fileHash",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              }
            ],
            "name": "shareFile",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "name": "files",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];

        const contract = new web3.eth.Contract(abi, contractAddress);
        setContract(contract);
        console.log("Blockchain initialized successfully.");
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const handleFileChange = async (event) => {
    console.log("File selected.");
    const file = event.target.files[0];
    if (!file) {
      alert('Please select a file to share.');
      return;
    }

    console.log("Uploading file to IPFS.");
    try {
      const added = await ipfs.add(file);
      const fileHash = added.path;
      console.log("File hash generated (IPFS CID):", fileHash);

      if (!web3 || !contract) {
        alert('Blockchain is not initialized.');
        return;
      }

      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        alert('No accounts found. Please check MetaMask.');
        return;
      }

      if (!recipient) {
        alert('Please enter a recipient address.');
        return;
      }

      console.log("Attempting to share file on blockchain.");
      try {
        const receipt = await contract.methods.shareFile(fileHash, recipient).send({ from: accounts[0] });
        console.log('File shared successfully:', receipt);
      } catch (error) {
        console.error('Error sharing file:', error);
      }
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("share-file-input").click();
  };

  return (
    <div className="vh col py-4">
      <DeleteModal
        deleteModalShow={deleteModalShow}
        setDeleteShow={setDeleteShow}
        handleDelete={handleDelete}
        file={currentFile}
      />
      <Alert show={downloading} variant="info">
        Downloading...
      </Alert>
      <Alert show={uploading} variant="info">
        Uploading...
      </Alert>
      <Alert show={tooLarge} variant="danger">
        File too large! We currently only support files less than {maxfilesize}{" "}
        MB
      </Alert>
      <div className="h-100 d-flex flex-column">
        <div className="row px-3 pt-2">
          <div className="col-6 d-flex align-items-center">
            <Header className="text-dark">My Files</Header>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <div className="ml-auto">
              <input
                type="file"
                id="upload"
                className="d-none"
                onChange={handleUpload}
              />
              <Button
                className="widebtn"
                variant="info"
                onClick={triggerFileInput}
              >
                Analyze Files
              </Button>
              <Button
                className="widebtn"
                variant="info"
                onClick={() => document.getElementById("upload").click()}
              >
                Upload
              </Button>
              
              <input
                type="file"
                id="share-file-input"
                className="d-none"
                onChange={handleFileChange}
              />
              <Form.Control style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              
              <Button style={{  marginLeft: '150px', marginTop: '10px' }}
                className="widebtn"
                variant="info"
                onClick={triggerFileInput}
              >
                Share Files
              </Button>
            </div>
          </div>
        </div>
        <div className="grow scroll mt-4">
          <DisplayFiles />
        </div>
      </div>
    </div>
  );
};

export default Files;