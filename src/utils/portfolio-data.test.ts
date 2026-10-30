import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PORTFOLIO_PROJECTS,
  filterProjects,
  calculatePortfolioStats,
  validateContactForm
} from './portfolio-data';

test('PORTFOLIO_PROJECTS includes all 7 specified projects', () => {
  assert.equal(PORTFOLIO_PROJECTS.length, 7);
  const titles = PORTFOLIO_PROJECTS.map(p => p.title);
  assert.ok(titles.includes('NEXUS'));
  assert.ok(titles.includes('QUASER'));
  assert.ok(titles.includes('Mental Health Support Chatbot'));
  assert.ok(titles.includes('TeamConnect'));
  assert.ok(titles.includes('TasteTable'));
  assert.ok(titles.includes('Food Ordering System'));
  assert.ok(titles.includes('SYNAPTIC'));
});

test('calculatePortfolioStats returns correct project metrics', () => {
  const stats = calculatePortfolioStats(PORTFOLIO_PROJECTS);
  assert.equal(stats.totalProjects, 7);
  assert.ok(stats.technologiesCount > 10);
  assert.equal(stats.featuredCount, 2); // NEXUS and QUASER
  assert.equal(stats.primaryInstitution, 'REVA University, Bengaluru');
});

test('filterProjects correctly filters by category', () => {
  const aiProjects = filterProjects(PORTFOLIO_PROJECTS, 'AI & Graph Intelligence', '');
  assert.equal(aiProjects.length, 1);
  assert.equal(aiProjects[0].title, 'NEXUS');

  const webProjects = filterProjects(PORTFOLIO_PROJECTS, 'Web Development', '');
  assert.equal(webProjects.length, 4);

  const allProjects = filterProjects(PORTFOLIO_PROJECTS, 'all', '');
  assert.equal(allProjects.length, 7);
});

test('filterProjects filters by search query matching title or tech', () => {
  const nexusSearch = filterProjects(PORTFOLIO_PROJECTS, 'all', 'nexus');
  assert.equal(nexusSearch.length, 1);
  assert.equal(nexusSearch[0].title, 'NEXUS');

  const whisperSearch = filterProjects(PORTFOLIO_PROJECTS, 'all', 'whisper');
  assert.equal(whisperSearch.length, 1);
  assert.equal(whisperSearch[0].title, 'QUASER');

  const nonExistent = filterProjects(PORTFOLIO_PROJECTS, 'all', 'quantum_supercollider_xyz');
  assert.equal(nonExistent.length, 0);
});

test('validateContactForm enforces valid email and field constraints', () => {
  // Empty data
  const emptyRes = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.name);
  assert.ok(emptyRes.errors.email);
  assert.ok(emptyRes.errors.subject);
  assert.ok(emptyRes.errors.message);

  // Invalid email
  const badEmailRes = validateContactForm({
    name: 'Ada Lovelace',
    email: 'not-an-email',
    subject: 'Project inquiry',
    message: 'Hello, I want to discuss your research on graph neural networks.'
  });
  assert.equal(badEmailRes.isValid, false);
  assert.ok(badEmailRes.errors.email);

  // Valid submission
  const validRes = validateContactForm({
    name: 'Dr. Alan Turing',
    email: 'alan@reva.edu',
    subject: 'Graph AI Collaboration',
    message: 'Let us discuss collaborating on the NEXUS intelligence system.'
  });
  assert.equal(validRes.isValid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);
});
