interface Props {
  category: { nome: string; icon: string; cor: string; bg: string };
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryChip({ category, active, onClick }: Props) {
  return (
    <button
      className={`chip ${active ? 'active' : ''}`}
      onClick={onClick}
      style={active ? {} : { background: category.bg, color: category.cor, borderColor: category.bg }}
    >
      <span style={{ marginRight: '4px' }}>{category.icon}</span>
      {category.nome}
    </button>
  );
}
