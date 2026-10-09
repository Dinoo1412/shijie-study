CREATE TABLE users (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE oauth_attempts (
  state_hash TEXT PRIMARY KEY,
  verifier TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX oauth_attempts_ip ON oauth_attempts(ip_hash, created_at);
CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE INDEX sessions_user ON sessions(user_id);
CREATE TABLE progress (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  data TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
