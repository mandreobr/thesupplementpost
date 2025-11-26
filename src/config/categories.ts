export const CATEGORY_CONFIG = {
  'Weight Loss and Fat Burn': {
    slug: 'weight-loss',
    description:
      'Supplements designed to support fat burning, metabolism, appetite control, and overall weight management.'
  },

  'Brain and Neuro Health': {
    slug: 'brain-and-neuro',
    description:
      'Formulas that support cognitive performance, focus, memory, neurotransmitters, and long-term brain health.'
  },

  "Men´s Health": {
    slug: 'men-health',
    description:
      'Supplements designed for prostate health, hormones, vitality, performance, and male wellness.'
  },

  "Women´s Health": {
    slug: 'women-health',
    description:
      'Supplements that support hormonal balance, metabolism, energy, and women’s long-term health.'
  },

  'Circulation and Heart Health': {
    slug: 'heart-and-circulation',
    description:
      'Products that support cardiovascular health, nitric oxide production, circulation, and healthy blood flow.'
  },

  'Liver and Gut Health': {
    slug: 'liver-and-gut',
    description:
      'Detox, digestion, microbiome, and liver-supporting supplements for healthier metabolism and nutrient absorption.'
  },

  'Dental Health': {
    slug: 'dental-health',
    description:
      'Oral microbiome support, gum health, enamel-strengthening formulas, and natural dental wellness.'
  },

  'Hearing and Vision': {
    slug: 'hearing-and-vision',
    description:
      'Supplements designed to support eyesight, retinal health, tinnitus management, and hearing clarity.'
  },

  'Pain, Joint and Muscle': {
    slug: 'pain-joint-muscle',
    description:
      'Formulas supporting joint comfort, flexibility, inflammation modulation, and muscle recovery.'
  },

  'Blood Sugar Control': {
    slug: 'blood-sugar',
    description:
      'Supplements that help balance blood sugar levels, insulin function, and metabolic health.'
  },

  'Skin, Hair and Anti-Aging': {
    slug: 'skin-hair-aging',
    description:
      'Anti-aging support, collagen, skin elasticity, hair strength, and healthy cellular regeneration.'
  },

  'Other / Miscellaneous': {
    slug: 'other',
    description:
      'Supplements that do not fit into a specific category but still offer meaningful health benefits.'
  }
} as const;

export type CategoryKey = keyof typeof CATEGORY_CONFIG;
