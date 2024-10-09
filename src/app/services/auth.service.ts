import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private auth: Auth) {}

  async register(email: string, password: string, displayName: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      localStorage.setItem(this.tokenKey, await userCredential.user.getIdToken());
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      localStorage.setItem(this.tokenKey, await userCredential.user.getIdToken());
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem(this.tokenKey);
      await signOut(this.auth);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  /* loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  */

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
