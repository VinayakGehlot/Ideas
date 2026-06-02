import React, { useEffect, useState } from 'react';
import { ShieldAlert, RefreshCw, CheckCircle } from 'lucide-react';

export function AdBlockerOverlay() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  const checkAdBlocker = () => {
    // Standard test using common adblock blockable flags
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox pub_300x250 ad-unit text-ads text-ad google-ads-slot';
    testAd.style.position = 'absolute';
    testAd.style.top = '-9999px';
    testAd.style.left = '-9999px';
    testAd.style.width = '1px';
    testAd.style.height = '1px';
    document.body.appendChild(testAd);
    
    window.setTimeout(() => {
      // If styled box has 0 height or isn't shown, blocker is filtering elements
      if (testAd.offsetHeight === 0 || testAd.style.display === 'none' || !testAd.parentNode) {
        setAdBlockDetected(true);
      } else {
        setAdBlockDetected(false);
      }
      if (testAd.parentNode) {
        document.body.removeChild(testAd);
      }
    }, 150);
  };

  useEffect(() => {
    checkAdBlocker();
    
    // Periodic polling to make sure it is not enabled midway
    const interval = setInterval(checkAdBlocker, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!adBlockDetected) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <div className="bg-white max-w-sm w-full rounded-2xl p-6 border border-rose-100 shadow-2xl text-center select-none animate-in fade-in zoom-in-95 duration-200">
        <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
          <ShieldAlert className="w-7 h-7" />
        </div>
        
        <h3 className="text-lg font-black text-slate-800 tracking-tight mb-2">
          Ad blocker detected.
        </h3>
        
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto mb-5">
          This website is supported by ads.<br />
          Please disable your ad blocker to continue viewing our premium earning blueprints.
        </p>

        <div className="space-y-2.5">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs tracking-wider uppercase py-3 px-5 rounded-xl transition-all shadow active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Website
          </button>
          
          <p className="text-[10px] text-slate-400 font-medium">
            Disable ad blocker & click refresh to unlock instant access. Thank you!
          </p>
        </div>
      </div>
    </div>
  );
}
