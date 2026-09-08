// Plain module: a "use server" file may only export async functions, so the
// form's initial state and its type live here instead of in contact.ts.
export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; error: string };

export const initialContactState: ContactState = { status: 'idle' };
