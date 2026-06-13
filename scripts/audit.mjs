// scripts/audit.mjs
// Run: node scripts/audit.mjs
// Checks that all SEO and performance requirements are met before launch.
import fs from 'fs';

const checks = [];
const pass = (msg) => checks.push({ ok: true,  msg });
const fail = (msg) => checks.push({ ok: false, msg });

// OG image
if (fs.existsSync('app/opengraph-image.tsx')) {
  pass('OG image file exists (app/opengraph-image.tsx)');
} else {
  fail('MISSING: app/opengraph-image.tsx');
}

// Sitemap
if (fs.existsSync('app/sitemap.ts')) {
  pass('Sitemap exists (app/sitemap.ts)');
} else {
  fail('MISSING: app/sitemap.ts');
}

// Robots
if (fs.existsSync('app/robots.ts')) {
  pass('robots.ts exists');
} else {
  fail('MISSING: app/robots.ts');
}

// Analytics config
if (fs.existsSync('lib/analytics-config.ts')) {
  const content = fs.readFileSync('lib/analytics-config.ts', 'utf8');
  if (content.includes('G-PLACEHOLDER')) {
    fail('TODO: Replace GA4_ID placeholder in lib/analytics-config.ts');
  } else {
    pass('GA4 ID configured');
  }
  if (content.includes('0000000000000')) {
    fail('TODO: Replace META_PIXEL_ID placeholder in lib/analytics-config.ts');
  } else {
    pass('Meta Pixel ID configured');
  }
} else {
  fail('MISSING: lib/analytics-config.ts');
}

// SEO config placeholders
if (fs.existsSync('lib/seo-config.ts')) {
  const content = fs.readFileSync('lib/seo-config.ts', 'utf8');
  if (content.includes('[DOMAIN]')) {
    fail('TODO: Replace [DOMAIN] in lib/seo-config.ts');
  } else {
    pass('Domain configured in SEO config');
  }
  if (content.includes('[COMPANY_NAME]')) {
    fail('TODO: Replace [COMPANY_NAME] in lib/seo-config.ts');
  } else {
    pass('Company name configured in SEO config');
  }
} else {
  fail('MISSING: lib/seo-config.ts');
}

// Blog posts
const blogDir = 'content/blog';
if (fs.existsSync(blogDir)) {
  const posts = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'));
  if (posts.length > 0) {
    pass(`Blog posts found: ${posts.length} .mdx files`);
  } else {
    fail('No blog posts found in content/blog/');
  }
} else {
  fail('MISSING: content/blog/ directory');
}

// .env.local
if (fs.existsSync('.env.local')) {
  pass('.env.local exists');
} else {
  fail('MISSING: .env.local — copy from .env.local.example');
}

// .env.local.example
if (fs.existsSync('.env.local.example')) {
  pass('.env.local.example exists (committed)');
} else {
  fail('MISSING: .env.local.example — create for team onboarding');
}

// Summary
console.log('\n── SEO & Performance Audit ────────────────────────────\n');
checks.forEach((c) => console.log(`${c.ok ? '✅' : '❌'} ${c.msg}`));
const failures = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failures.length}/${checks.length} checks passed`);
if (failures.length > 0) {
  console.log(`\n${failures.length} item(s) need attention before launch.\n`);
  process.exit(1);
} else {
  console.log('\nAll checks passed. Ready to launch.\n');
}
