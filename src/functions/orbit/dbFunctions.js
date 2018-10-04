import {
  checkAuth
} from '../identity/authentication';
import {
  getFile
} from 'blockstack';
// const uuidv4 = require('uuid/v4');
import { Connect, SimpleSigner } from 'uport-connect'

const uport = new Connect('Graphite', {
  clientId: '2ojeGNVVThAej2cTpnpvDKSF8Rd7mx16nn6',
  network: 'rinkeby',
  signer: SimpleSigner('6e2558a04b41124f19bfefd2248ce7aaf585c5222ca856f6a426e47bc8c09697') //This will need to be protected as an imported variable
})
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const ipfsOptions = {
  EXPERIMENTAL: {
        pubsub: true
      },
      config: {
        Addresses: {
          // ...And supply a swarm address to announce on to find other peers
          Swarm: [
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
          ]
        }
      }
}
const ipfs = new IPFS(ipfsOptions)
let db;
// let dbType, dbAddress;

export function loadDB() {
  // let address;
  ipfs.on('ready', async () => {
    const orbitdb = new OrbitDB(ipfs)
    // if(checkAuth() === "uPort") {
    //   address = JSON.parse(localStorage.getItem('uPort-identity')).address;
    // }

    //Here we will check if a db exists and if not, we'll create one based on the DID public key
    //TODO write function to check if db exists
    if(checkAuth() === "uPort") {
      if(JSON.parse(localStorage.getItem('uPort-identity')).verified !== undefined && JSON.parse(localStorage.getItem('uPort-identity')).verified.length > 0 ) {
        //this is where we'd load the db from the uPort attestation
        console.log("DB previously created");
        const address = JSON.parse(localStorage.getItem('uPort-identity')).verified[0].claim.ORBIT;
        db = await orbitdb.open(address, {
          sync: true,
          create: true,
          overwrite: true,
          localOnly: false,
          type: 'keyvalue',
          write: ["*"]
        });
        db.load().then(() => {
          this.handleGet(db);
        })

      } else {
        console.log("Checking for local DB instance...")
        const address = JSON.parse(localStorage.getItem('orbitDBAddress'));
        if(address !==undefined && address !==null && address !== "") {
          db = await orbitdb.open(address, {
            sync: true,
            create: true,
            overwrite: true,
            localOnly: false,
            type: 'keyvalue',
            write: ["*"]
          });
          db.load().then(() => {
            this.handleGet(db);
          })
        } else {
          console.log("No db yet, creating one...")
          const access = {
            // Give write access to ourselves
            write: ["*"],
          }
          db = await orbitdb.keyvalue('heyo', access);
          console.log(db.address.toString());
          localStorage.setItem('orbitDBAddress', JSON.stringify(db.address.toString()));
          const address = db.address.toString();
          db.load()
            .then(() => {
              uport.attestCredentials({
                sub: JSON.parse(localStorage.getItem('uPort-identity')).address,
                claim: { ORBIT: address },
              })
            })
            .then(() => {
              // window.location.reload()
            })
        }
      }
    } else if(checkAuth() === "blockstack") {
      getFile('orbit.json', {decrypt: true})
        .then((fileContents) => {
          if(fileContents) {
            console.log("bang")
            const address = "";
            db = orbitdb.open(address, {
              sync: true,
              create: true,
              overwrite: true,
              // Load only the local version of the database,
              // don't load the latest from the network yet
              localOnly: false,
              type: 'keyvalue',
              // If "Public" flag is set, allow anyone to write to the database,
              // otherwise only the creator of the database can write
              write: ['*']
            });
          } else {
            db = orbitdb.keyvalue('bang', {
              sync: true,
              create: true,
              overwrite: true,
              // Load only the local version of the database,
              // don't load the latest from the network yet
              localOnly: false,
              type: 'keyvalue',
              // If "Public" flag is set, allow anyone to write to the database,
              // otherwise only the creator of the database can write
              write: ['*']
            })
            .then(() => {
              //TODO store db address here
            })
          }
        })
    }

    // db.load().then(() => {
    //   this.handleGet(db);
    // })
    // await db.load(db)
    // .then(() => {
    //   this.handleGet(db);
    // });
  })
}

export function handleAdd() {
  console.log("adding")
  db.put('documents', this.state.docs);
  db.put(this.state.singleDoc.id, this.state.singleDoc)
    .then(() => {
      window.location.replace('/documents/' + this.state.singleDoc.id)
    })
}

export function handleGet() {
  console.log("got it")
  console.log(db)
  console.log(db.all());
  // const docsObject = db._index._index;
  // console.log(docsObject);
  console.log(db.get('documents'));
  if(db.get('documents') !== undefined && db.get('documents') !== {}) {
    console.log("here they are")
    this.setState({ docs: db.get('documents')}, () => {
      var elems = document.querySelectorAll('.modal');
      window.M.Modal.init(elems);
    })
  } else {
    this.setState({ docs: [] }, () => {
      var elems = document.querySelectorAll('.modal');
      window.M.Modal.init(elems);
    });
  }

}

export function deleteDoc(props) {
     let value = this.state.docs;
     const thisDoc = value.find((doc) => { return doc.id.toString() === props.id}); //comparing strings
     let index = thisDoc && thisDoc.id;
     function findObjectIndex(doc) {
         return doc.id === index; //comparing numbers
     }
     this.setState({ index: value.findIndex(findObjectIndex) }, () => {
        const file = props.id;
        console.log(this.state.index);
        console.log(this.state.docs);
        // let updatedArray = value.splice(this.state.index, 1)
        // this.setState({ docs: updatedArray }, () => {
        //   db.put('documents', this.state.docs)
        //   db.put(JSON.stringify(props.id), {})
        // })
     })
}
