import * as SQLite from 'expo-sqlite'

import type { Container } from '@/types/storage'

export const db = SQLite.openDatabaseSync('app.db')

// Section: Setup
export function setupDatabase() {
  db.execSync(
    `CREATE TABLE IF NOT EXISTS containers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );`
  );
  db.execSync(
    `CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      container_id INTEGER,
      name TEXT NOT NULL,
      FOREIGN KEY(container_id) REFERENCES containers(id)
    );`
  );
}
// End of Section: Setup

// Section: Container
export function addContainer(name: string) {
    db.runSync(
        'INSERT INTO containers (name) VALUES (?);',
        [name]
    );
}

export function removeContainer(id: string) {
    db.runSync('DELETE FROM containers WHERE id = ?;', [id])
}

export function getContainers() {
  const result = db.getAllSync('SELECT * FROM containers;')
  return result
}

export function getContainerById(id: string) {
    const result = db.getFirstSync('SELECT * FROM containers WHERE id = ?;', [id])
    return result as Container
}

export function updateContainer(id: string, name: string) {
    db.runSync('UPDATE containers SET name = ? WHERE id = ?;', [name, id])
}
// End of Section: Container

// Section: Item
export function addItem(container_id: number, name: string) {
  db.runSync(
    'INSERT INTO items (container_id, name) VALUES (?, ?);',
    [container_id, name]
  );
}

export function removeItem(id: number) {
  db.runSync('DELETE FROM items WHERE id = ?;', [id]);
}

export function getItems() {
  const result = db.getAllSync('SELECT * FROM items;');
  return result;
}

export function getItemById(id: number) {
  const result = db.getFirstSync('SELECT * FROM items WHERE id = ?;', [id]);
  return result;
}

export function getItemsByContainerId(container_id: number) {
  const result = db.getAllSync('SELECT * FROM items WHERE container_id = ?;', [container_id]);
  return result;
}

export function updateItem(id: number, name: string, container_id?: number) {
  if (container_id !== undefined) {
    db.runSync(
      'UPDATE items SET name = ?, container_id = ? WHERE id = ?;',
      [name, container_id, id]
    );
  } else {
    db.runSync(
      'UPDATE items SET name = ? WHERE id = ?;',
      [name, id]
    );
  }
}
// End of Section: Item