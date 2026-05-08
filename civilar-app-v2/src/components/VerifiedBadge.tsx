import { ShieldCheck } from 'lucide-react';

interface Props {
  verified: boolean;
}

export default function VerifiedBadge({ verified }: Props) {
  if (!verified) return null;
  return (
    <span className="badge badge-verified">
      <ShieldCheck size={14} />
      Validado pela equipe CiviLar
    </span>
  );
}
