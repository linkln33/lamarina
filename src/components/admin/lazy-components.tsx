// Lazy-loaded admin components for better performance
import { lazy } from 'react';

// Lazy load heavy admin components
export const LazyHeroEditor = lazy(() => import('./hero-editor').then(module => ({ default: module.HeroEditor })));
export const LazyServicesEditor = lazy(() => import('./services-editor').then(module => ({ default: module.ServicesEditor })));
export const LazyPortfolioEditor = lazy(() => import('./portfolio-editor').then(module => ({ default: module.PortfolioEditor })));
export const LazyBlogEditor = lazy(() => import('./blog-editor').then(module => ({ default: module.BlogEditor })));
export const LazyListingBuilder = lazy(() => import('./listing-builder-refactored').then(module => ({ default: module.ListingBuilderRefactored })));

// Lazy load form components
export const LazyBasicInfoForm = lazy(() => import('./listing-forms/basic-info-form').then(module => ({ default: module.BasicInfoForm })));
export const LazyMediaForm = lazy(() => import('./listing-forms/media-form').then(module => ({ default: module.MediaForm })));
export const LazySpecificationsForm = lazy(() => import('./listing-forms/specifications-form').then(module => ({ default: module.SpecificationsForm })));
export const LazyPricingForm = lazy(() => import('./listing-forms/pricing-form').then(module => ({ default: module.PricingForm })));
export const LazySeoForm = lazy(() => import('./listing-forms/seo-form').then(module => ({ default: module.SeoForm })));
export const LazyContactForm = lazy(() => import('./listing-forms/contact-form').then(module => ({ default: module.ContactForm })));
