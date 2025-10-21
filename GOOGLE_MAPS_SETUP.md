# Google Maps Integration Setup

This document explains how to set up Google Maps integration for the LAMARINA BG website.

## 🗺️ Features

- **Interactive Google Maps**: Real Google Maps with satellite/road view
- **Location Marker**: Custom marker for LAMARINA BG location
- **Info Window**: Clickable marker with company information
- **Directions Button**: Direct link to Google Maps directions
- **Responsive Design**: Works on all device sizes
- **Fallback**: Graceful fallback if API key is missing

## 🔧 Setup Instructions

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Places API** (optional, for enhanced features)
   - **Geocoding API** (optional, for address lookup)
4. Create credentials → API Key
5. Restrict the API key to your domain for security

### 2. Configure Environment Variables

Add your Google Maps API key to your environment variables:

```bash
# Add to your .env.local file
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. API Key Restrictions (Recommended)

For security, restrict your API key:

1. **HTTP referrers**: Add your domains
   - `localhost:3000/*` (for development)
   - `your-domain.com/*` (for production)
   - `*.netlify.app/*` (if using Netlify)

2. **API restrictions**: Limit to:
   - Maps JavaScript API
   - Places API (if enabled)
   - Geocoding API (if enabled)

## 📍 Location Configuration

The map is configured with LAMARINA BG's location:

- **Address**: С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово
- **Coordinates**: 42.0710533, 24.9521083
- **Zoom Level**: 15 (street level)
- **Map Type**: Roadmap (can be changed to satellite)

## 🎨 Customization

### Map Styling

The map uses custom styling to hide POI labels for a cleaner look. You can modify the styles in `src/components/ui/google-map.tsx`:

```typescript
styles: [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  }
]
```

### Marker Customization

You can customize the marker by modifying the `GoogleMap` component props:

```tsx
<GoogleMap
  center={{ lat: 42.0710533, lng: 24.9521083 }}
  zoom={15}
  height="400px"
  showMarker={true}
  markerTitle="LAMARINA BG"
  markerContent="Your custom content here"
/>
```

## 🚀 Usage

The Google Maps component is automatically used in the Contact section. It includes:

1. **Loading State**: Shows loading spinner while map loads
2. **Error Handling**: Graceful fallback if API key is missing
3. **Directions Button**: "Get Directions" button for navigation
4. **Info Window**: Clickable marker with company details

## 🔒 Security Best Practices

1. **Restrict API Key**: Always restrict your API key to specific domains
2. **Monitor Usage**: Check Google Cloud Console for usage and billing
3. **Rotate Keys**: Regularly rotate API keys for security
4. **Environment Variables**: Never commit API keys to version control

## 💰 Billing

Google Maps API has usage-based pricing:

- **Maps Load**: $7 per 1,000 loads
- **Places API**: $17 per 1,000 requests
- **Geocoding**: $5 per 1,000 requests

For a typical business website, costs are usually very low (under $10/month).

## 🐛 Troubleshooting

### Map Not Loading

1. Check if API key is set correctly
2. Verify API key restrictions allow your domain
3. Check browser console for errors
4. Ensure Maps JavaScript API is enabled

### CORS Errors

1. Add your domain to API key restrictions
2. Check if API key is properly configured
3. Verify the API key has correct permissions

### Performance Issues

1. Implement lazy loading for the map component
2. Use appropriate zoom levels
3. Consider caching map tiles

## 📱 Mobile Optimization

The map is fully responsive and includes:

- Touch gestures for pan/zoom
- Mobile-optimized controls
- Responsive sizing
- Touch-friendly directions button

## 🔄 Updates

To update the map location or settings:

1. Modify the coordinates in `src/components/sections/contact.tsx`
2. Update marker title and content
3. Adjust zoom level as needed
4. Test on different devices

## 📞 Support

For Google Maps API issues:
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Google Cloud Support](https://cloud.google.com/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-maps)

For LAMARINA BG website issues:
- Check the console for error messages
- Verify environment variables
- Test with different browsers
