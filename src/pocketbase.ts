// src/pocketbase.ts
import PocketBase from 'pocketbase';

const url = import.meta.env.VITE_POCKETBASE_URL;

const pb = new PocketBase(url); // Ersetzen Sie die URL durch Ihre PocketBase-Instanz

export default pb;
