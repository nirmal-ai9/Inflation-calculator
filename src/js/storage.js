import { STORAGE_KEYS } from './config.js';

export function loadModel() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.model) || 'null');
  } catch {
    return null;
  }
}

export function saveModel(model) {
  localStorage.setItem(STORAGE_KEYS.model, JSON.stringify(model));
}

export function loadTheme() {
  return localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
}

export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}
