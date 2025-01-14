export const countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'NZ', name: 'New Zealand' },
  // Add more countries as needed
].sort((a, b) => {
  if (a.code === 'IN') return -1;
  if (b.code === 'IN') return 1;
  return a.name.localeCompare(b.name);
});