import * as blockstack from 'blockstack'
import { Connect, SimpleSigner } from 'uport-connect'

const uport = new Connect('Graphite', {
  clientId: '2ojeGNVVThAej2cTpnpvDKSF8Rd7mx16nn6',
  network: 'rinkeby',
  signer: SimpleSigner('6e2558a04b41124f19bfefd2248ce7aaf585c5222ca856f6a426e47bc8c09697') //This will need to be protected as an imported variable
})

export const checkAuth = () => {
  console.log(blockstack.isUserSignedIn())
  if(blockstack.isUserSignedIn()) {
    return "blockstack"
  } else if(JSON.parse(localStorage.getItem('uPort-identity')) !== null) {
    if(JSON.parse(localStorage.getItem('uPort-identity')).address !== undefined) {
      return "uPort"
    }
  }
}

export const userSignedIn = () => {
  // console.log(JSON.parse(localStorage.getItem('uPort-identity')))
  if(checkAuth() === "blockstack" || checkAuth() === "uPort") {
    return true;
  } else {
    return false
  }

}

export const blockstackSignIn = (e) => {
  console.log("signing in...")
  e.preventDefault();
    const origin = window.location.origin;
    blockstack.redirectToSignIn(origin, origin + "/manifest.json", [
      "store_write",
      "publish_data"
    ])
}

export const uPortSignIn = () => {
  // Request credentials to login
    uport.requestCredentials({
      requested: ['name', 'phone', 'country'],
      verified: ['ORBIT'],
      notifications: true // We want this if we want to recieve credentials
    })
    .then((userProfile) => {
      // console.log(credentials);
      localStorage.setItem('uPort-identity', JSON.stringify(userProfile))
    })
    .then(() => {
      window.location.reload();
    })

    // Attest specific credentials
    // uport.attestCredentials({
    //   sub: THE_RECEIVING_UPORT_ADDRESS,
    //   claim: {
    //     CREDENTIAL_NAME: CREDENTIAL_VALUE
    //   },
    //   exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    // })


  // uport.requestCredentials()
  //   .then((userProfile) => {
  //     console.log("setting local storage")
  //     localStorage.setItem('uPort-identity', JSON.stringify(userProfile))
  //     console.log(userProfile)
  //   })
}

export function handleSignOut(e) {
  console.log("signing out...")
  if(checkAuth() === "blockstack") {
    if(blockstack.isUserSignedIn()) {
      e.preventDefault();
      blockstack.signUserOut(window.location.origin);
    }
  } else if(checkAuth() === "uPort") {
    localStorage.setItem('uPort-identity', JSON.stringify({}));
    localStorage.setItem('orbitDBAddress', JSON.stringify(""));
    window.location.replace('/')
  }

}

export function testCred() {
  uport.attestCredentials({
    sub: '2oqr8GRieBS2ouP22DLVnMsHY2ftXh4pge2',
    claim: { TESTING: "Heyo" },
  })
}
