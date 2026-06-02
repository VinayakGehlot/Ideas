import React, { useEffect, useRef } from 'react';

interface Props {
  format?: 'banner' | 'rectangle';
}

export function AdPlacement({ format = 'banner' }: Props) {
  return (
    <div className={`my-4 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex flex-col justify-center items-center w-full ${format === 'banner' ? 'h-24' : 'h-64'}`}>
      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1 w-full text-left">Ad Placement (Yahan Ad Dikhega)</p>
      <div className="flex-1 w-full bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">
        Google Ad Slot (Ad Dekhein)
      </div>
    </div>
  );
}
