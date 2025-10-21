"use client";

import { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  className?: string;
  marker?: {
    position: {
      lat: number;
      lng: number;
    };
    title?: string;
    info?: string;
  };
}

export function GoogleMap({ 
  center, 
  zoom = 15, 
  className = "w-full h-96",
  marker 
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        // Check if Google Maps is already loaded
        if (typeof window !== 'undefined' && window.google && window.google.maps) {
          const map = new window.google.maps.Map(mapRef.current, {
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
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            zoomControlOptions: {
              position: window.google.maps.ControlPosition.RIGHT_BOTTOM
            }
          });

          // Add marker if provided
          if (marker) {
            const mapMarker = new window.google.maps.Marker({
              position: marker.position,
              map: map,
              title: marker.title || 'Location',
              animation: window.google.maps.Animation.DROP
            });

            // Add info window if info is provided
            if (marker.info) {
              const infoWindow = new window.google.maps.InfoWindow({
                content: marker.info
              });

              mapMarker.addListener('click', () => {
                infoWindow.open(map, mapMarker);
              });
            }
          }

          setIsLoaded(true);
        } else {
          setError('Google Maps not loaded. Please check your API key.');
        }
      } catch (err) {
        console.error('Error initializing Google Maps:', err);
        setError('Failed to load Google Maps. Please check your API key.');
      }
    };

    initMap();
  }, [center, zoom, marker]);

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg`}>
        <div className="text-center p-4">
          <p className="text-gray-600 mb-2">Failed to load Google Maps</p>
          <p className="text-sm text-gray-500">Please check your API key</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg border border-gray-200"
        style={{ minHeight: '300px' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}