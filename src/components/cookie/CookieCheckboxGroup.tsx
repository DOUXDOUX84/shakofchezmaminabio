import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CookieCheckboxGroupProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const CookieCheckboxGroup = ({
  id,
  label,
  description,
  checked,
  disabled = false,
  onCheckedChange
}: CookieCheckboxGroupProps) => {
  return (
    <div className="flex items-start space-x-4">
      <Checkbox 
        id={id} 
        checked={checked}
        disabled={disabled}
        onCheckedChange={(checked) => onCheckedChange?.(checked as boolean)}
      />
      <div className="space-y-1">
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};