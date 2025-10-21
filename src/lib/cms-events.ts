// CMS Event System for real-time updates
class CMSEventManager {
  private listeners: Map<string, Set<() => void>> = new Map();

  // Subscribe to CMS updates
  subscribe(event: string, callback: () => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    this.listeners.get(event)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  // Emit CMS update event
  emit(event: string): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback());
    }
  }

  // Subscribe to hero updates specifically
  subscribeToHeroUpdates(callback: () => void): () => void {
    return this.subscribe('hero-updated', callback);
  }

  // Emit hero update
  emitHeroUpdate(): void {
    this.emit('hero-updated');
  }

  // Subscribe to all CMS updates
  subscribeToAllUpdates(callback: () => void): () => void {
    return this.subscribe('cms-updated', callback);
  }

  // Emit general CMS update
  emitCMSUpdate(): void {
    this.emit('cms-updated');
  }
}

// Export singleton instance
export const cmsEvents = new CMSEventManager();
