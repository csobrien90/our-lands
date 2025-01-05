import { Grid } from './Grid.js';

/**
 * SyncManager
 * @class
 * @classdesc Manages syncing with IndexedDB.
*/
export class SyncManager {
  /**
   * @param {Grid} grid - The Grid
  */
  constructor(grid) {
	this.grid = grid;
	// Check if IndexedDB is supported
	if (!('indexedDB' in window)) {
	  alert('This browser doesn\'t support IndexedDB - data will not be saved.');
	  return;
	}
  }

  loadGrid() {
	return new Promise((resolve, reject) => {
		this.connectToDB().then((db) => {
			const transaction = db.transaction('gridSections', 'readonly');
			const store = transaction.objectStore('gridSections');
			const request = store.getAll();

			request.onsuccess = () => {
				resolve(request.result);
			}

			request.onerror = (event) => {
				console.error('Error loading grid:', event.target.error);
				reject();
			}
		})
	})
  }

  onUpgradeNeeded(event) {
	const db = event.target.result;
	const store = db.createObjectStore('gridSections', { keyPath: 'id' });
	store.createIndex('id', 'id', { unique: true });
	store.createIndex('x', 'x', { unique: false });
	store.createIndex('y', 'y', { unique: false });
	store.createIndex('comments', 'comments', { unique: false });
  }

  connectToDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open('our-lands', 1);
		request.onupgradeneeded = this.onUpgradeNeeded;
		request.onsuccess = () => {
			resolve(request.result);
		}
		request.onerror = (event) => {
			console.error('Error connecting to database:', event.target.error);
			reject();
		}
	})
  }

  createGridRecord() {
	return new Promise((resolve, reject) => {
		this.connectToDB().then((db) => {
			const transaction = db.transaction('gridSections', 'readwrite');
			const store = transaction.objectStore('gridSections');
			Object.keys(this.grid.gridToLot).forEach((xy) => {
				const [x, y] = xy.split('');
				const record = {
					id: xy,
					x: parseInt(x),
					y: parseInt(y),
					comments: []
				}
				const request = store.add(record);
				request.onsuccess = () => {
					resolve();
				}
	
				request.onerror = (event) => {
					console.error('Error creating grid record:', event.target.error);
					reject();
				}
			})
		})
	})
  }
}