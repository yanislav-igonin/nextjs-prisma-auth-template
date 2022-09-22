const cookieEncryptionKey = process.env.COOKIE_ENCRYPTION_KEY || 'complex_password_at_least_32_characters_long';

export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  cookieEncryptionKey,
};
