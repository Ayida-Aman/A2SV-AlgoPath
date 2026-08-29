/**
 * Maps Firebase Authentication error codes to user-friendly messages.
 */
export function getAuthErrorMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "An unexpected error occurred. Please try again.";
  }

  const err = error as { code?: string; message?: string };
  const errorCode = err.code || "";

  switch (errorCode) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
      return "Incorrect email or password. Please verify your credentials and try again.";
    case "auth/email-already-in-use":
      return "An account with this email address already exists. Please sign in instead.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters with a combination of letters and numbers.";
    case "auth/operation-not-allowed":
      return "Email and password authentication is currently not enabled in Firebase.";
    case "auth/too-many-requests":
      return "Access to this service has been temporarily restricted due to many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again.";
    case "auth/account-exists-with-different-credential":
      return "This email is already registered with email and password. Please sign in with your password first.";
    case "auth/credential-already-in-use":
      return "This Google account is already linked to another scholar profile.";
    case "auth/popup-closed-by-user":
      return "The Google sign-in window was closed before completing.";
    case "auth/popup-blocked":
      return "The Google sign-in popup was blocked by your browser. Please enable popups and try again.";
    case "auth/cancelled-popup-request":
      return "Only one sign-in request can be processed at a time.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized for OAuth in Firebase Console. Please check authorized domains.";
    case "auth/requires-recent-login":
      return "This action requires recent authentication. Please log in again.";
    case "auth/user-token-expired":
      return "Your session has expired. Please sign in again.";
    case "auth/expired-action-code":
      return "This password reset link has expired. Please request a new one.";
    case "auth/invalid-action-code":
      return "This password reset link is invalid or has already been used. Please request a new one.";
    default:
      if (err.message && !err.message.includes("Firebase:")) {
        return err.message;
      }
      return "An unexpected authentication error occurred. Please try again.";
  }
}
