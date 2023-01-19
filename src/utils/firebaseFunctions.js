import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firbase.config";

// save new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};
