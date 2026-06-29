import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export interface BrandedSelectOption {
  value: string;
  label: string;
}

interface BrandedSelectProps {
  id?: string;
  value: string;
  options: BrandedSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
}

const sizeStyles = {
  sm: {
    button: 'min-h-[42px] rounded-xl px-3 py-2.5 text-xs',
    menu: 'rounded-xl',
    option: 'px-3 py-2.5 text-xs'
  },
  md: {
    button: 'min-h-[52px] rounded-2xl px-4 py-3.5 text-sm',
    menu: 'rounded-2xl',
    option: 'px-4 py-3 text-sm'
  }
};

export const BrandedSelect: React.FC<BrandedSelectProps> = ({
  id,
  value,
  options,
  onChange,
  placeholder = 'Select...',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const generatedId = useId();
  const selectId = id || `branded-select-${generatedId}`;
  const listboxId = `${selectId}-listbox`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value === value),
    [options, value]
  );
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;
  const [activeIndex, setActiveIndex] = useState(selectedIndex >= 0 ? selectedIndex : 0);
  const styles = sizeStyles[size];

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [isOpen, selectedIndex]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  const selectOption = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setIsOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || options.length === 0) return;

    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, options.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectOption(activeIndex);
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        id={selectId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={isOpen ? `${listboxId}-${activeIndex}` : undefined}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleKeyDown}
        className={`group flex w-full items-center justify-between gap-3 border border-white/10 bg-navy-deep/70 text-left text-white shadow-inner shadow-black/10 outline-none transition-all duration-200 hover:border-coral/60 hover:bg-navy-deep focus-visible:border-coral focus-visible:ring-2 focus-visible:ring-coral/35 disabled:cursor-not-allowed disabled:opacity-60 ${styles.button}`}
      >
        <span className={`block min-w-0 truncate ${selectedOption ? 'text-white' : 'text-white/50'}`}>
          {selectedOption?.label || placeholder}
        </span>
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-coral transition-colors group-hover:bg-coral group-hover:text-navy-deep">
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={selectId}
          className={`branded-scrollbar absolute left-0 right-0 top-full z-[70] mt-2 max-h-64 overflow-y-auto border border-coral/30 bg-navy shadow-2xl shadow-black/30 outline-none ${styles.menu}`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <button
                key={option.value}
                id={`${listboxId}-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(index)}
                className={`flex w-full items-center justify-between gap-3 text-left font-medium transition-colors ${styles.option} ${
                  isActive ? 'bg-coral/15 text-white' : 'text-white/75 hover:bg-white/5 hover:text-white'
                } ${isSelected ? 'text-coral' : ''}`}
              >
                <span className="min-w-0 truncate">{option.label}</span>
                {isSelected && <Check className="h-4 w-4 flex-shrink-0 text-coral" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
