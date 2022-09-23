import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '~/Firebase/config';
import propTypes from 'prop-types';
export function useFireStore(path, conditions) {
    const [doc, setDoc] = useState([]);
    useEffect(() => {
        // get 
        let q = query(collection(db, path));
        if (conditions) {
            if (!conditions.fieldNames || !conditions.compareValues.length) return;
            q = query(collection(db, path),
                where(
                    conditions.fieldNames,
                    conditions.operator,
                    conditions.compareValues
                )
            );
        }
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const cities = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            })
            setDoc(cities)
        })
        return unsubscribe;
    }, [path, conditions]);
    return doc;
}
useFireStore.prototype = {
    path: propTypes.string.isRequired,
    conditions: propTypes.object,
}

