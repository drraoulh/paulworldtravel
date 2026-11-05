import { LEGAL_VERSION } from '@/content/legal';
export interface LegalAcceptance { accepted: boolean; version: string }
export function hasAcceptedTerms(value: unknown): value is LegalAcceptance {
  return !!value && typeof value === 'object' && 'accepted' in value && value.accepted === true && 'version' in value && value.version === LEGAL_VERSION;
}
