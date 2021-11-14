const assert = require('assert')
const firebase = require('@firebase/testing')

const MY_PROJECT_ID = "schedulemester"

const myId = "user_abc";
const theirId= "user_xyz";
const myAuth = {uid: myId, email: "abc@gmail.com"};

function getFirestore(authentication){
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: authentication}).firestore();
}

function getAdminFirestore(){
    return firebase.initializeAdminApp({projectId: MY_PROJECT_ID}).firestore();
}


beforeEach( async() =>{
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID });
});

describe("Firebase  Unit testing" , () => {

    // Userlevel
    it("Can read items in the read-only collection", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get());
    })

    it("Can't write to items in read only collections", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection("readonly").doc("testDoc2");
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    })

    it("Can write to a user doc", async ()=>{
        const db =  getFirestore(myAuth);
        const testDoc = db.collection("users").doc(myId);
        await firebase.assertSucceeds(testDoc.set({foo:"bar"}));
    })

    it("Can't write to a user doc with different user", async ()=>{
        const db =  getFirestore(myAuth);
        const testDoc = db.collection("users").doc(theirId);
        await firebase.assertFails(testDoc.set({foo:"bar"}));
    });

    //Post Testing

    // it("can read posts marked public", async() =>{
    //     const db = getFirestore(null);
    //     const testQuery = db.collection("posts").where("visibility", "==", "public");
    //     await firebase.assertSucceeds(testQuery.get())
    // })

    it("read a single public user", async() =>{
        const admin = getAdminFirestore();
        const email = "mitchellmui17@gmail.com";
        const setupDoc = admin.collection("users").doc(email);
        await setupDoc.set({authorId: theirId, Homeworks: 0});

        const db = getFirestore(null);
        const testRead = db.collection("users").doc(email);
        await firebase.assertFails(testRead.get());
    })
    
} )

// after( async() =>{
//     await firebase.clearFirestoreData({projectId: MY_PROJECT_ID });
// });