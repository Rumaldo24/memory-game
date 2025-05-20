// "use client";

// import { useEffect, useRef } from "react";

// interface AdBannerProps {
//   adSlot: string;
//   adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
//   style?: React.CSSProperties;
//   className?: string;
// }

// export function AdBanner({
//   adSlot,
//   adFormat = "auto",
//   style,
//   className,
// }: AdBannerProps) {
//   const adRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Solo ejecutar en el cliente
//     if (typeof window === "undefined") return;

//     try {
//       // Asegurarse de que AdSense está cargado
//       if (window.adsbygoogle) {
//         // @ts-ignore
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//       }
//     } catch (error) {
//       console.error("Error al cargar el anuncio:", error);
//     }
//   }, []);

//   return (
//     <div
//       ref={adRef}
//       className={`ad-container ${className || ""}`}
//       style={style}
//     >
//       <ins
//         className="adsbygoogle"
//         style={{
//           display: "block",
//           textAlign: "center",
//           ...style,
//         }}
//         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Reemplaza con tu ID de cliente de AdSense
//         data-ad-slot={adSlot}
//         data-ad-format={adFormat}
//         data-full-width-responsive="true"
//       />
//       <small className="text-xs text-gray-400 text-center block mt-1">
//         Publicidad
//       </small>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  style?: React.CSSProperties;
  className?: string;
}

export function AdBanner({
  adSlot,
  adFormat = "auto",
  style,
  className,
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;

    try {
      // Verificar si adsbygoogle está disponible de manera segura
      const adsenseScript = document.createElement("script");
      adsenseScript.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7441679162161349";
      adsenseScript.async = true;
      adsenseScript.crossOrigin = "anonymous";
      document.head.appendChild(adsenseScript);

      // Esperar a que adsbygoogle esté disponible
      const pushAd = () => {
        try {
          // Usar una verificación segura para adsbygoogle
          if (window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (error) {
          console.error("Error al cargar el anuncio:", error);
        }
      };

      // Intentar cargar el anuncio después de que el script se haya cargado
      adsenseScript.onload = pushAd;

      return () => {
        // Limpiar el script si el componente se desmonta
        document.head.removeChild(adsenseScript);
      };
    } catch (error) {
      console.error("Error al configurar AdSense:", error);
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={`ad-container ${className || ""}`}
      style={style}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          ...style,
        }}
        data-ad-client="ca-pub-7441679162161349" // Reemplaza con tu ID de cliente de AdSense
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
      <small className="text-xs text-gray-400 text-center block mt-1">
        Publicidad
      </small>
    </div>
  );
}
