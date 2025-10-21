// Font loader for Cyrillic support in jsPDF
// This utility loads a web font that supports Cyrillic characters

export class FontLoader {
  private static loaded = false
  private static loading = false

  static async loadCyrillicFont(): Promise<void> {
    if (this.loaded || this.loading) {
      return Promise.resolve()
    }

    this.loading = true

    return new Promise((resolve, reject) => {
      // Load Roboto font from Google Fonts
      const link = document.createElement('link')
      link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
      link.rel = 'stylesheet'
      
      link.onload = () => {
        // Wait for font to be available
        document.fonts.ready.then(() => {
          this.loaded = true
          this.loading = false
          resolve()
        })
      }
      
      link.onerror = () => {
        this.loading = false
        reject(new Error('Failed to load Cyrillic font'))
      }
      
      document.head.appendChild(link)
    })
  }

  static isLoaded(): boolean {
    return this.loaded
  }
}

// Alternative: Use a base64 encoded font
export const ROBOTO_FONT_BASE64 = `data:font/woff2;base64,` // This would contain the actual font data

// For now, we'll use a fallback approach with character mapping
export const CYRILLIC_TO_LATIN_MAP: { [key: string]: string } = {
  // Uppercase
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ж': 'Zh', 'З': 'Z',
  'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
  'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch',
  'Ш': 'Sh', 'Щ': 'Sht', 'Ъ': 'A', 'Ь': 'Y', 'Ю': 'Yu', 'Я': 'Ya',
  // Lowercase
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh', 'з': 'z',
  'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
  'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
  'ш': 'sh', 'щ': 'sht', 'ъ': 'a', 'ь': 'y', 'ю': 'yu', 'я': 'ya',
  // Special characters
  '№': 'No.', '€': 'EUR', '£': 'GBP', '¥': 'JPY'
}

export function convertCyrillicToLatin(text: string): string {
  return text
    .split('')
    .map(char => CYRILLIC_TO_LATIN_MAP[char] || char)
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
}
