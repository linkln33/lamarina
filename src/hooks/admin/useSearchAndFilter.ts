// Shared search and filter hook for admin components
import { useState, useMemo } from 'react';

interface FilterOptions {
  category?: string;
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

interface UseSearchAndFilterProps<T> {
  items: T[];
  searchFields: (keyof T)[];
  filterOptions?: FilterOptions;
}

export function useSearchAndFilter<T>({
  items,
  searchFields
}: UseSearchAndFilterProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  // Memoized filtered items
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => {
        return searchFields.some(field => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          if (Array.isArray(value)) {
            return value.some(v => 
              typeof v === 'string' && 
              v.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          return false;
        });
      });
    }

    // Apply category filter
    if (activeFilters.category && activeFilters.category !== 'all') {
      filtered = filtered.filter(item => 
        (item as Record<string, unknown>).category === activeFilters.category
      );
    }

    // Apply status filter
    if (activeFilters.status && activeFilters.status !== 'all') {
      filtered = filtered.filter(item => 
        (item as Record<string, unknown>).status === activeFilters.status
      );
    }

    // Apply date range filter
    if (activeFilters.dateRange) {
      filtered = filtered.filter(item => {
        const itemRecord = item as Record<string, unknown>;
        const itemDate = new Date((itemRecord.createdAt as string) || (itemRecord.updatedAt as string));
        return itemDate >= activeFilters.dateRange!.start && 
               itemDate <= activeFilters.dateRange!.end;
      });
    }

    return filtered;
  }, [items, searchTerm, activeFilters, searchFields]);

  // Get unique categories from items
  const categories = useMemo(() => {
    const uniqueCategories = new Set(items.map(item => (item as Record<string, unknown>).category).filter(Boolean));
    return ['all', ...Array.from(uniqueCategories)];
  }, [items]);

  // Get unique statuses from items
  const statuses = useMemo(() => {
    const uniqueStatuses = new Set(items.map(item => (item as Record<string, unknown>).status).filter(Boolean));
    return ['all', ...Array.from(uniqueStatuses)];
  }, [items]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setActiveFilters({});
  };

  // Update specific filter
  const updateFilter = (key: keyof FilterOptions, value: string | FilterOptions['dateRange']) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return {
    searchTerm,
    setSearchTerm,
    activeFilters,
    updateFilter,
    clearFilters,
    filteredItems,
    categories,
    statuses,
    totalItems: items.length,
    filteredCount: filteredItems.length
  };
}
