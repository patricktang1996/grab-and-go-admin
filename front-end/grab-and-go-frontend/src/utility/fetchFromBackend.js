import {clearData, initDB, saveData} from "./indexedDB";

export const fetchAllContacts = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'getAllContacts';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data);
        const db = await initDB();
        await clearData(db, 'contacts');
        await saveData(db, 'contacts', data);
    } catch (error) {
        console.error('Failed to fetch and save contacts:', error);
    }
};