import { useTranslation } from 'react-i18next';
import { collections } from '../../data/collections';
import CollectionCard from './CollectionCard';

export default function CollectionsGrid() {
  const { t } = useTranslation();

  // Saffron first (the wedge), then Amber, Professional, Fragrant, Natural, Accessories
  const sorted = [...collections].sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <section className="bg-background relative">
      <div className="container-page section-padding">
        <div className="text-center section-header max-w-2xl mx-auto">
          <span className="eyebrow mb-5">Collections</span>
          <h2 className="font-serif text-h1 text-textPrimary mb-5 mt-3">
            {t('sections.collectionsTitle')}
          </h2>
          <p className="text-body text-textSecondary">
            {t('sections.collectionsSub')}
          </p>
          <div className="ornament-divider mt-8 max-w-xs mx-auto">
            <span className="dot" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {sorted.map((c, i) => (
            <CollectionCard key={c.id} collection={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
