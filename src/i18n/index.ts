import enUS from './en-US';
import fr from './fr';

//Edit when adding new languages
const languages = {
  [enUS.key]: enUS,
  [fr.key]: fr,
};

//Do not touch further lines
interface LanguageOption {
  value: string;
  label: string;
}

export const languageOptions: Array<LanguageOption> = Object.keys(
  languages
).map((key: string) => {
  return {
    value: languages[key].key,
    label: languages[key].label,
  };
});

export default languages;
