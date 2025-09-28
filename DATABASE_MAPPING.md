# LAMARINA BG - Database Features Mapping

## 🗄️ **ADMIN PAGES & FEATURES**

### **1. HOMEPAGE EDITOR** (`/admin/homepage`)
**Current Storage:** Local Storage (CMS)
**Needs Database:** ✅ YES

**Data Types:**
- **Hero Section**
  - Title, subtitle, description
  - **Images:** Carousel images (multiple)
  - **Videos:** Background videos
  - Stats (projects, experience, clients)
  - Features (equipment, quality, speed)

- **Services Section**
  - Service items with icons
  - **Images:** Service images
  - Features and descriptions

- **Portfolio Section**
  - Portfolio items
  - **Images:** Project images
  - Categories and counts

- **Blog Section**
  - Featured articles
  - **Images:** Article thumbnails

- **Contact Section**
  - Contact information
  - **Images:** Location images

---

### **2. LISTINGS MANAGEMENT** (`/admin/listings`)
**Current Storage:** Local Database
**Needs Database:** ✅ YES

**Data Types:**
- **Listing Entity**
  - Basic info (title, description, category, tags)
  - Status (draft/published/archived)
  - **Images:** Multiple images with primary flag
  - **Videos:** Product videos with thumbnails
  - Specifications (technical details)
  - Features (product benefits)
  - Pricing (base price, bulk pricing, size variants)
  - SEO (meta title, description, keywords, slug)
  - Contact info (name, phone, email, website, address)
  - Analytics (views, likes, created/updated dates)

---

### **3. BLOG MANAGEMENT** (`/admin/blog`)
**Current Storage:** None
**Needs Database:** ✅ YES

**Data Types:**
- **Blog Posts**
  - Title, content, excerpt
  - **Images:** Featured images, content images
  - **Videos:** Embedded videos
  - Author, publish date, status
  - Categories, tags
  - SEO metadata
  - Analytics (views, likes, comments)

---

### **4. PORTFOLIO MANAGEMENT** (`/admin/portfolio`)
**Current Storage:** None
**Needs Database:** ✅ YES

**Data Types:**
- **Portfolio Items**
  - Title, description, category
  - **Images:** Project images (multiple)
  - **Videos:** Project videos
  - Client information
  - Project details, completion date
  - Tags, featured status
  - External links

---

### **5. USERS MANAGEMENT** (`/admin/users`)
**Current Storage:** None
**Needs Database:** ✅ YES

**Data Types:**
- **User Profiles**
  - Basic info (name, email, phone)
  - **Images:** Profile pictures, avatars
  - Role, permissions
  - Login credentials
  - Activity logs
  - Preferences

---

### **6. PAGES MANAGEMENT** (`/admin/pages`)
**Current Storage:** None
**Needs Database:** ✅ YES

**Data Types:**
- **Custom Pages**
  - Page content (title, body)
  - **Images:** Page images, banners
  - **Videos:** Page videos
  - SEO metadata
  - Page settings, templates
  - Navigation settings

---

### **7. ANALYTICS** (`/admin/analytics`)
**Current Storage:** None
**Needs Database:** ✅ YES

**Data Types:**
- **Analytics Events**
  - Event type, entity type, entity ID
  - User interactions
  - Page views, clicks
  - Conversion tracking
  - Performance metrics

---

### **8. MESSAGES** (`/admin/messages`)
**Current Storage:** None
**Needs Database:** ✅ YES

**Data Types:**
- **Contact Messages**
  - Sender info (name, email, phone)
  - Message content
  - **Attachments:** Files, images
  - Status (new/read/replied/closed)
  - Timestamps, priority

---

### **9. SETTINGS** (`/admin/settings`)
**Current Storage:** None
**Needs Database:** ✅ YES

**Data Types:**
- **Site Settings**
  - General configuration
  - **Images:** Site logo, favicon
  - **Videos:** Site intro videos
  - Email settings
  - Social media links
  - Backup settings

---

## 📸 **MEDIA & FILE UPLOAD FEATURES**

### **Image Upload Requirements:**
1. **Hero Carousel Images** - Multiple images with ordering
2. **Listing Images** - Product photos with primary flag
3. **Blog Images** - Featured images, content images
4. **Portfolio Images** - Project galleries
5. **User Avatars** - Profile pictures
6. **Page Images** - Banner images, content images
7. **Service Images** - Service icons and photos

### **Video Upload Requirements:**
1. **Hero Background Videos** - Background videos
2. **Listing Videos** - Product demonstration videos
3. **Blog Videos** - Embedded content videos
4. **Portfolio Videos** - Project showcase videos
5. **Page Videos** - Page content videos

---

## 🗃️ **DATABASE SCHEMA REQUIREMENTS**

### **Core Tables Needed:**
1. **users** - User management
2. **listings** - Product/service listings
3. **blog_posts** - Blog content
4. **portfolio_items** - Portfolio projects
5. **pages** - Custom pages
6. **messages** - Contact messages
7. **analytics** - Tracking data
8. **settings** - Site configuration
9. **homepage_content** - Homepage sections

### **Media Tables Needed:**
1. **images** - Image metadata and URLs
2. **videos** - Video metadata and URLs
3. **attachments** - File attachments

### **Relationship Tables:**
1. **listing_images** - Listing to images
2. **listing_videos** - Listing to videos
3. **blog_images** - Blog post images
4. **portfolio_images** - Portfolio images
5. **user_avatars** - User profile images

---

## 🔧 **IMPLEMENTATION PRIORITY**

### **Phase 1 - Core Functionality:**
1. ✅ Listings (already implemented with local storage)
2. 🔄 Homepage content (needs database migration)
3. 📝 Blog posts
4. 📁 Portfolio items

### **Phase 2 - User Management:**
1. 👥 User accounts
2. 🔐 Authentication
3. 👤 User profiles

### **Phase 3 - Advanced Features:**
1. 📊 Analytics
2. 💬 Messages
3. ⚙️ Settings
4. 📄 Custom pages

### **Phase 4 - Media Management:**
1. 🖼️ Image galleries
2. 🎥 Video management
3. 📎 File attachments
4. 🗂️ Media organization

---

## 📊 **STORAGE REQUIREMENTS**

### **File Storage Needs:**
- **Images:** ~50MB per listing, ~10MB per blog post
- **Videos:** ~500MB per video (compressed)
- **Documents:** ~5MB per attachment
- **Total Estimated:** 10-50GB for full site

### **Database Storage:**
- **Text Content:** ~1MB per 1000 listings
- **Metadata:** ~100KB per 1000 images
- **Analytics:** ~1MB per 10,000 events
- **Total Estimated:** 100MB - 1GB for full site

---

## 🚀 **NEXT STEPS**

1. **Set up Netlify database** using the schema from `supabase-schema.sql`
2. **Migrate local storage** to database
3. **Implement image/video upload** with Netlify Functions
4. **Connect all admin pages** to database
5. **Add media management** features
6. **Implement analytics** tracking
7. **Set up user authentication**


