// components/runs/runs-header.tsx
import AddRideModal from '@/components/add-ride-modal';

interface RunsHeaderProps {
  onSuccess: () => void;
}

export function RunsHeader({ onSuccess }: RunsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Time Trials</h1>
      <AddRideModal onSuccess={onSuccess} />
    </div>
  );
}