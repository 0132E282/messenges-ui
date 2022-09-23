import { db } from './config';
import { storage } from '~/Firebase/config';
import { ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
const AddDocument = async (collectionName, docData) => {
    const newCityRef = doc(collection(db, collectionName))
    await setDoc(newCityRef, docData);
}
const uploadFile = async (file, type) => {
    const storageRef = ref(storage, `${type}/${file.name}`);
    const metadata = {
        contentType: file.type,
    };

    await uploadBytes(storageRef, file, metadata.contentType)
}
const updateDates = async (collectionName, id, data) => {
    const q = doc(db, collectionName, id)
    await updateDoc(q, data);
}
// tao keywords cho displayName, su dung cho search
const generateKeywords = (displayName) => {
    // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
    // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
    const name = displayName.split(' ').filter((word) => word);

    const length = name.length;
    let flagArray = [];
    let result = [];
    let stringArray = [];

    /**
     * khoi tao mang flag false
     * dung de danh dau xem gia tri
     * tai vi tri nay da duoc su dung
     * hay chua
     **/
    for (let i = 0; i < length; i++) {
        flagArray[i] = false;
    }

    const createKeywords = (name) => {
        const arrName = [];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        });
        return arrName;
    };

    function findPermutation(k) {
        for (let i = 0; i < length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                if (k === length - 1) {
                    stringArray.push(result.join(' '));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }

    findPermutation(0);

    const keywords = stringArray.reduce((acc, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);

    return keywords;
};
export { AddDocument, uploadFile, generateKeywords, updateDates };