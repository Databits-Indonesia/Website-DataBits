import { usePathname } from 'next/navigation'
import { useI18n } from '@/components/i18n-provider'
import { getCurrentLocale, localizePath } from '@/lib/i18n'

const Footer = () => {
  const pathname = usePathname()
  const { t } = useI18n()
  const locale = getCurrentLocale(pathname)
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-200 bg-background-light py-12 dark:border-gray-800 dark:bg-background-dark">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
             <img src="/logo.jpeg" alt="DataBits Logo" className="h-7" />
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('footer.copyright').replace('{year}', String(year))}</p>
          </div>
          <div className="flex items-center gap-6">
            <a href={localizePath(locale, '/privacy')} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">{t('footer.privacyPolicy')}</a>
            <a href={localizePath(locale, '/terms')} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">{t('footer.termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;