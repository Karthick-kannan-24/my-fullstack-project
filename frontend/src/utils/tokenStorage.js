const STORAGE_KEY = "encrypted_token";
const SECRET = "default-secret-change-me";
const SALT = "token-storage-salt";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const toBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const fromBase64 = (base64) => {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

const getKey = async () => {
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode(SALT),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

export const saveToken = async (token) => {
  const key = await getKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(token)
  );

  const payload = {
    iv: Array.from(iv),
    value: toBase64(encrypted),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const getToken = async () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const { iv, value } = JSON.parse(raw);
    const key = await getKey();
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      key,
      fromBase64(value)
    );

    return decoder.decode(decrypted);
  } catch (error) {
    console.error("Failed to decrypt auth token", error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const hasToken = () => {
  return !!localStorage.getItem(STORAGE_KEY);
};
