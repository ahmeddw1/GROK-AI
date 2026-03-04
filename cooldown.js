const map = new Map();

function cooldown(userId, seconds) {
  const now = Date.now();
  const last = map.get(userId) || 0;

  if (now - last < seconds * 1000) return true;
  map.set(userId, now);
  return false;
}

module.exports = cooldown;
