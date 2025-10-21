"use client";

import { useState, useEffect } from 'react';
import { CMS } from '@/lib/cms';
import { cmsEvents } from '@/lib/cms-events';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CMSDebug() {
  const [cmsData, setCmsData] = useState(CMS.getHomepageContent());

  useEffect(() => {
    const updateData = () => {
      const newData = CMS.getHomepageContent();
      console.log('CMS Debug: Data updated:', newData);
      setCmsData(newData);
    };

    // Initial load
    updateData();

    // Subscribe to updates
    const unsubscribe = cmsEvents.subscribeToAllUpdates(updateData);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Card className="fixed bottom-4 right-4 w-80 max-h-96 overflow-y-auto z-50 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm">CMS Debug</CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-2">
        <div>
          <strong>Hero Carousel Images:</strong> {cmsData.hero.carousel?.images?.length || 0}
        </div>
        {cmsData.hero.carousel?.images?.map((img, index) => (
          <div key={img.id} className="border p-2 rounded">
            <div><strong>Image {index + 1}:</strong></div>
            <div>ID: {img.id}</div>
            <div>URL: {img.url.substring(0, 50)}...</div>
            <div>Alt: {img.alt}</div>
            <div>Title: {img.title}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
