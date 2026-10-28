import { FiBriefcase, FiClipboard, FiGlobe, FiMonitor, FiPackage, FiRepeat, FiSend, FiShoppingBag } from 'react-icons/fi';
import type { IconType } from 'react-icons';

// One icon per service slug.
export const serviceIcons: Record<string, IconType> = {
  'cargo-chine-afrique': FiPackage,
  'fret-cameroun-canada': FiSend,
  'douane-transit': FiClipboard,
  'achats-chine': FiShoppingBag,
  'change-devises': FiRepeat,
  'visas-immigration': FiGlobe,
  'creation-entreprise': FiBriefcase,
  'solutions-informatiques': FiMonitor,
};
