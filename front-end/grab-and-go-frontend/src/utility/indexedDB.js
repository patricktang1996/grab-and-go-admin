import { openDB } from 'idb';

export async function initDB() {
    const dbName = 'myAppDB';
    const version = 2; // Increment the version number when making structural changes
    const db = await openDB(dbName, version, {
        upgrade(db, oldVersion, newVersion, transaction) {
            // Create 'contacts' object store if it doesn't exist
            if (!db.objectStoreNames.contains('contacts')) {
                db.createObjectStore('contacts', { keyPath: 'id' });
            }
            // Create 'orders' object store if it doesn't exist
            if (!db.objectStoreNames.contains('orders')) {
                db.createObjectStore('orders', { keyPath: 'job_number' });
            }
            if (!db.objectStoreNames.contains('products')) {
                db.createObjectStore('products', { keyPath: 'id' });
            }
        },
    });
    return db;
}

export async function clearData(db, storeName) {
    const tx = db.transaction(storeName, 'readwrite');
    await tx.store.clear();
    await tx.done;
}

export async function saveData(db, storeName, data) {
    const tx = db.transaction(storeName, 'readwrite');
    for (const item of data) {
        await tx.store.put(item);
    }
    await tx.done;
}


export async function loadData(db, storeName) {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const data = await store.getAll();
    await tx.done;
    return data;
}
