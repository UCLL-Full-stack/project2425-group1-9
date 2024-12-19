// components/LanguageSwitcher.tsx
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div>
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        {/* Add more languages as needed */}
      </select>
    </div>
  );
};

export default LanguageSwitcher;