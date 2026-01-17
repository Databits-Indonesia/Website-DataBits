'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              layout: number;
              autoDisplay: boolean;
            },
            elementId: string
          ): void;
          InlineLayout: {
            SIMPLE: number;
            HORIZONTAL: number;
            VERTICAL: number;
          };
        };
      };
    };
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,id,es,fr,de,ja,ko,zh-CN,zh-TW,ar,pt,ru,hi,it,nl,pl,tr,vi,th',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Load Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="google-translate-wrapper">
      <div id="google_translate_element"></div>
      <style jsx>{`
        .google-translate-wrapper {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0.5rem 0;
        }
        
        :global(.goog-te-banner-frame.skiptranslate) {
          display: none !important;
        }
        
        :global(body) {
          top: 0 !important;
        }
        
        :global(.goog-te-gadget) {
          font-family: inherit !important;
          font-size: 0.875rem !important;
        }
        
        :global(.goog-te-gadget-simple) {
          background-color: transparent !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 0.5rem !important;
          padding: 0.5rem 0.75rem !important;
          font-size: 0.875rem !important;
          transition: all 0.2s ease !important;
        }
        
        :global(.goog-te-gadget-simple:hover) {
          border-color: #9ca3af !important;
        }
        
        :global(.dark .goog-te-gadget-simple) {
          border-color: #374151 !important;
          color: #fff !important;
        }
        
        :global(.dark .goog-te-gadget-simple:hover) {
          border-color: #4b5563 !important;
        }
        
        :global(.goog-te-gadget-icon) {
          display: none !important;
        }
        
        :global(.goog-te-menu-value span) {
          color: inherit !important;
        }
        
        :global(.dark .goog-te-menu-value span) {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
