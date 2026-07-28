type Listener = () => void;

const listeners = new Set<Listener>();

/** theme / font-size / progress બદલાય ત્યારે બધા subscriber ને જાણ કરે */
export function emitClientStoreChange(): void {
  for (const listener of listeners) listener();
}

/**
 * useSyncExternalStore માટેનું subscribe —
 * બીજા ટૅબમાં થયેલા ફેરફાર (storage event) પણ પકડે છે.
 */
export function subscribeClientStore(listener: Listener): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/** hydration પછી જ true — client-only UI માટે */
export const getMountedSnapshot = () => true;
export const getMountedServerSnapshot = () => false;
