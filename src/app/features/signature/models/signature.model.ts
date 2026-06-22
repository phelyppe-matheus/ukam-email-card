export interface SignatureData {
  name: string;
  position: string;
  department: string;
  phone: string;
  email: string;
  site: string;
  photoUrl: string;
}

export const DEFAULT_SIGNATURE: SignatureData = {
  name: '',
  position: '',
  department: '',
  phone: '',
  email: '',
  site: 'www.ukamsoft.com.br',
  photoUrl: '',
};
