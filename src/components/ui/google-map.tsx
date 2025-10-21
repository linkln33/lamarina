"use client";

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  height?: string;
  className?: string;
  showMarker?: boolean;
  markerTitle?: string;
  markerContent?: string;
}

export function GoogleMap({
  center,
  zoom = 15,
  height = "400px",
  className = "",
  showMarker = true,
  markerTitle = "LAMARINA BG",
  markerContent = "С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово"
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Check if Google Maps API key is available
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        console.log('Google Maps API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT FOUND');
        
        if (!apiKey) {
          setError('Google Maps API key not found. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.');
          return;
        }

        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places']
        });

        const { Map } = await loader.importLibrary('maps');
        const { Marker } = await loader.importLibrary('marker');
        const { InfoWindow } = await loader.importLibrary('maps');

        if (mapRef.current) {
          const mapInstance = new Map(mapRef.current, {
            center: center,
            zoom: zoom,
            mapTypeId: 'roadmap',
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ],
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
          });

          setMap(mapInstance);

          // Add marker if requested
          if (showMarker) {
            const markerInstance = new Marker({
              position: center,
              map: mapInstance,
              title: markerTitle,
              animation: google.maps.Animation.DROP,
            });

            setMarker(markerInstance);

            // Add info window
            const infoWindow = new InfoWindow({
              content: `
                <div style="padding: 10px; max-width: 200px;">
                  <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${markerTitle}</h3>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">${markerContent}</p>
                </div>
              `,
            });

            markerInstance.addListener('click', () => {
              infoWindow.open(mapInstance, markerInstance);
            });
          }

          setIsLoaded(true);
        }
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        console.error('API Key being used:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
        setError(`Failed to load Google Maps. Error: ${err instanceof Error ? err.message : 'Unknown error'}. Please check your API key and internet connection.`);
      }
    };

    initMap();
  }, [center, zoom, showMarker, markerTitle, markerContent]);

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(url, '_blank');
  };

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden shadow-lg ${className}`} style={{ height }}>
        <div className="h-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10" />
          <div className="text-center z-10 p-6">
            <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">{markerTitle}</h3>
            <p className="text-muted-foreground mb-4">{markerContent}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <span>GPS: N {center.lat}, E {center.lng}</span>
            </div>
            <Button onClick={handleGetDirections} className="mt-4">
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <p className="text-xs text-red-500 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-xl overflow-hidden shadow-lg"
        style={{ height }}
      />
      
      {isLoaded && (
        <div className="absolute top-4 right-4 z-10">
          <Button 
            onClick={handleGetDirections}
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-800 shadow-lg"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Directions
          </Button>
        </div>
      )}
    </div>
  );
}
