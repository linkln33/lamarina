// Shared CRUD operations hook for admin components
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { DatabaseService } from '@/lib/database-service';

interface UseCrudOperationsProps<T> {
  entityType: 'listings' | 'blogPosts' | 'portfolioItems' | 'users' | 'pages';
  onSuccess?: () => void;
}

export function useCrudOperations<T extends { id: string }>({
  entityType,
  onSuccess
}: UseCrudOperationsProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Load items based on entity type
  const loadItems = () => {
    setLoading(true);
    try {
      let data: T[] = [];
      switch (entityType) {
        case 'listings':
          data = DatabaseService.getListings() as T[];
          break;
        case 'blogPosts':
          data = DatabaseService.getBlogPosts() as T[];
          break;
        case 'portfolioItems':
          data = DatabaseService.getPortfolioItems() as T[];
          break;
        case 'users':
          data = DatabaseService.getUsers() as T[];
          break;
        case 'pages':
          data = DatabaseService.getPages() as T[];
          break;
      }
      setItems(data);
    } catch (error) {
      console.error(`Error loading ${entityType}:`, error);
      toast.error(`Грешка при зареждане на ${entityType}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [entityType]);

  // Create new item
  const createItem = async (itemData: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      let newItem: T;
      switch (entityType) {
        case 'listings':
          newItem = DatabaseService.createListing(itemData as any) as T;
          break;
        case 'blogPosts':
          newItem = DatabaseService.createBlogPost(itemData as any) as T;
          break;
        case 'portfolioItems':
          newItem = DatabaseService.createPortfolioItem(itemData as any) as T;
          break;
        case 'users':
          newItem = DatabaseService.createUser(itemData as any) as T;
          break;
        case 'pages':
          newItem = DatabaseService.createPage(itemData as any) as T;
          break;
        default:
          throw new Error(`Unknown entity type: ${entityType}`);
      }
      
      setItems(prev => [newItem, ...prev]);
      toast.success('Записът беше създаден успешно');
      onSuccess?.();
      return newItem;
    } catch (error) {
      console.error(`Error creating ${entityType}:`, error);
      toast.error(`Грешка при създаване на ${entityType}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update existing item
  const updateItem = async (id: string, updates: Partial<T>) => {
    setLoading(true);
    try {
      switch (entityType) {
        case 'listings':
          DatabaseService.updateListing(id, updates as any);
          break;
        case 'blogPosts':
          DatabaseService.updateBlogPost(id, updates as any);
          break;
        case 'portfolioItems':
          DatabaseService.updatePortfolioItem(id, updates as any);
          break;
        case 'users':
          DatabaseService.updateUser(id, updates as any);
          break;
        case 'pages':
          DatabaseService.updatePage(id, updates as any);
          break;
        default:
          throw new Error(`Unknown entity type: ${entityType}`);
      }
      
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ));
      toast.success('Записът беше обновен успешно');
      onSuccess?.();
    } catch (error) {
      console.error(`Error updating ${entityType}:`, error);
      toast.error(`Грешка при обновяване на ${entityType}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    if (!confirm('Сигурни ли сте, че искате да изтриете този запис?')) {
      return;
    }

    setLoading(true);
    try {
      switch (entityType) {
        case 'listings':
          DatabaseService.deleteListing(id);
          break;
        case 'blogPosts':
          DatabaseService.deleteBlogPost(id);
          break;
        case 'portfolioItems':
          DatabaseService.deletePortfolioItem(id);
          break;
        case 'users':
          DatabaseService.deleteUser(id);
          break;
        case 'pages':
          DatabaseService.deletePage(id);
          break;
        default:
          throw new Error(`Unknown entity type: ${entityType}`);
      }
      
      setItems(prev => prev.filter(item => item.id !== id));
      toast.success('Записът беше изтрит успешно');
      onSuccess?.();
    } catch (error) {
      console.error(`Error deleting ${entityType}:`, error);
      toast.error(`Грешка при изтриване на ${entityType}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Filter items based on search term
  const filteredItems = items.filter(item => {
    const searchableText = JSON.stringify(item).toLowerCase();
    return searchableText.includes(searchTerm.toLowerCase());
  });

  return {
    items: filteredItems,
    loading,
    searchTerm,
    setSearchTerm,
    createItem,
    updateItem,
    deleteItem,
    refresh: loadItems
  };
}
