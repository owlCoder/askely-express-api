import { RezultatValidacije } from '../../../Domain/types/ValidationResult';

export function ValidateNewQuestionEntry(pitanje?: string, tezina?: number): RezultatValidacije {
  if (!pitanje || !tezina) {
    return { uspesno: false, poruka: 'Nisu uneti svi neophodni podaci.' };
  }

  if (pitanje.length < 10) {
    return { uspesno: false, poruka: 'Pitanje mora imati najmanje 10 karaktera.' };
  }

  if (pitanje.length > 500) {
    return { uspesno: false, poruka: 'Pitanje mora imati najviše 500 karaktera.' };
  }
  return { uspesno: true };
}
