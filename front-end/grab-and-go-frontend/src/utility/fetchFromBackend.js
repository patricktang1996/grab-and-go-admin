import {clearData, initDB, initOrderDB, saveData} from "./indexedDB";

export const fetchAllContacts = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'getAllContacts';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetchAllContacts: ", data);
        const db = await initDB();
        await clearData(db, 'contacts');
        await saveData(db, 'contacts', data);
    } catch (error) {
        console.error('Failed to fetch and save contacts:', error);
    }
};

export const fetchAllOrders = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'getAllOrders';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetchAllOrders: ", data);
        const db = await initDB();
        await clearData(db, 'orders');
        await saveData(db, 'orders', data);
    } catch (error) {
        console.error('Failed to fetch and save contacts:', error);
    }
};


export const fetchAllTags = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'getAllTags';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetchAllTags: ", data);
        // const db = await initDB();
        // await clearData(db, 'contacts');
        // await saveData(db, 'contacts', data);
    } catch (error) {
        console.error('Failed to fetch and save contacts:', error);
    }
};

export const fetchAllPrices = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'getAllPrices';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetchAllPrices: ", data);
        // const db = await initDB();
        // await clearData(db, 'contacts');
        // await saveData(db, 'contacts', data);
    } catch (error) {
        console.error('Failed to fetch and save contacts:', error);
    }
};

export const fetchAllPriceCategories = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'getAllPriceCategories';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetchAllPriceCategories: ", data);
        // const db = await initDB();
        // await clearData(db, 'contacts');
        // await saveData(db, 'contacts', data);
    } catch (error) {
        console.error('Failed to fetch and save contacts:', error);
    }
};

export const fetchAllProducts = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'getAllProducts';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetchAllProducts: ", data);
        const db = await initDB();
        await clearData(db, 'products');
        await saveData(db, 'products', data);
    } catch (error) {
        console.error('Failed to fetch and save contacts:', error);
    }
};


export const fetchExistingOrder = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'getExistingOrder';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetchExistingOrder: ", data);
        // const db = await initDB();
        // await clearData(db, 'contacts');
        // await saveData(db, 'contacts', data);
    } catch (error) {
        console.error('Failed to fetch and save contacts:', error);
    }
};


export const fetchExistingOrderProduct = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'getExistingOrderProduct';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetchExistingOrderProduct: ", data);
        // const db = await initDB();
        // await clearData(db, 'contacts');
        // await saveData(db, 'contacts', data);
    } catch (error) {
        console.error('Failed to fetch and save contacts:', error);
    }
};

export const fetchSearchCompanyOrders = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'searchCompanyOrders';
        const searchParams = {
            organisation_name: 'Organisation 0',
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchParams),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetchSearchCompanyOrders: ", data);
    } catch (error) {
        console.error('Failed to fetch and save company orders:', error);
    }
};


export const fetchAddNewOrder = async () => {
    try {
        const apiUrl = process.env.REACT_APP_EXPRESSJS_API_URL + 'addNewOrder';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("fetchAddNewOrder: ", data);
        // const db = await initDB();
        // await clearData(db, 'contacts');
        // await saveData(db, 'contacts', data);
    } catch (error) {
        console.error('Failed to fetch and save contacts:', error);
    }
};