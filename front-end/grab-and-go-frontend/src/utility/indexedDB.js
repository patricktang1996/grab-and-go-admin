import { openDB } from 'idb';

export async function initDB() {
    const db = await openDB('myAppDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('contacts')) {
                db.createObjectStore('contacts', { keyPath: 'ID' });
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
