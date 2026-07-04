export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PR-MIND',
    alternateName: 'PR-MIND Reputation Agency',
    url: 'https://prmind.example',
    // TODO: logo — add once a real graphic asset exists (brand brief specifies text-only logo for now);
    // a dangling image URL fails Google's Organization logo fetch check, so omit rather than fabricate.
    description:
      'PR-MIND helps founders, executives, and public figures control how they are seen online through reputation strategy and discreet communications.',
    // TODO: sameAs — add PR-MIND's own verified profile URLs once created (LinkedIn/X company pages).
    // Generic homepage links were removed: they identify no entity and make sameAs actively misleading.
    knowsLanguage: ['en', 'uk'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@prmind.example',
      telephone: '+380000000000',
      availableLanguage: ['English', 'Ukrainian'],
    },
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@type': 'Organization', name: 'PR-MIND', url: 'https://prmind.example' },
    publisher: { '@type': 'Organization', name: 'PR-MIND' },
  };
}

export function buildFaqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@type': 'Organization', name: 'PR-MIND' },
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PR-MIND',
    url: 'https://prmind.example',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://prmind.example/en/insights?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}
